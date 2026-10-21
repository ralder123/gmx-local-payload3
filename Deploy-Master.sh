#!/bin/bash
set -e

DIR="$(dirname "$0")"

# Define script paths in an indexed array
steps=(
    "" # placeholder for index 0 so step numbers align (0-5)
    "$DIR/Deploy-0-Git-Commit.sh"
    "$DIR/Deploy-1-Generate-TypeScript-Types.sh"
    "$DIR/Deploy-2-Build-Docker-Image.sh"
    "$DIR/Deploy-3-Push-Build-Image-to-GHCR.sh"
    "$DIR/Deploy-4-Ansible-Deployment-to-VPS.sh"
    "$DIR/Deploy-5-Run-Remote-Migrations-Restart.sh"
)

# Default to 'all' if no arguments are provided
if [ $# -eq 0 ]; then
    args="all"
else
    args="$*"
fi

# Normalize input: replace commas with spaces so both "1,2" and "1 2" work
normalized_args=$(echo "$args" | tr ',' ' ')

run_step() {
    local step_num="$1"
    if [ "$step_num" -ge 1 ] && [ "$step_num" -le 5 ]; then
        local script_path="${steps[$step_num]}"
        echo "=============================================="
        echo "==> Executing Step $step_num..."
        echo "=============================================="
        "$script_path"
    else
        echo "Error: Invalid step number '$step_num'. Valid steps are 1 through 5."
        exit 1
    fi
}

# Parse and execute requested steps
for arg in $normalized_args; do
    # Convert to lowercase for checking 'all'
    arg_lower=$(echo "$arg" | tr '[:upper:]' '[:lower:]')
    
    if [ "$arg_lower" == "all" ]; then
        for i in 1 2 3 4 5; do
            run_step "$i"
        done
        exit 0
    elif [[ "$arg" =~ ^[1-5]$ ]]; then
        run_step "$arg"
    else
        echo "Error: Invalid argument '$arg'. Use 'all', or step numbers like 1, 2, 3,4 etc."
        exit 1
    fi
done

echo "==> Requested deployment steps completed successfully!"
