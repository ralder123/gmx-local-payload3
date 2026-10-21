# Payload 3 Deployment Runbook

## Local Development and Remote VPS Architecture Distinction

Your project separates concerns cleanly between your local laptop development environment and your remote production infrastructure. Your local workspace (`prj-gmx-payload`) handles code editing, local testing via Colima, container building, and version control. Conversely, your remote development VPS (`2.24.222.86`) runs the production-grade Docker Compose stack (`payload3`, PostgreSQL, and MinIO) using pre-built images pulled directly from the GitHub Container Registry.

```bash
colima status
colima start
docker compose up -d

```

## Git Repository Initialization and Version Control

Initialize your Git repository from the project root to track your infrastructure and application code. Stage all configuration files, commit your baseline checkpoint, and link your local workspace to your remote GitHub repository before pushing the main branch upstream.

```bash
git init
git add .
git commit -m "Initial commit for payload3 deployment"
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main

```

## Docker Build and GHCR Authentication

Navigate into your payload directory to ensure your Dockerfile is present, then return to the root workspace to run your local build wrapper script. Authenticate your local Docker daemon with your GitHub Personal Access Token and build a multi-architecture production image to push directly to the GitHub Container Registry.

```bash
cd payload3
touch Dockerfile
cd /Users/Open/projects/prj-gmx-payload
./fix-docker-build.sh && docker build --no-cache -t payload3 ./payload3
echo "ghp_YourActualGitHubPersonalAccessTokenHere" | docker login ghcr.io -u ralder123 --password-stdin
./fix-docker-build.sh && cd ./payload3 && docker buildx build --platform linux/amd64 -t ghcr.io/ralder123/gmx-payload/payload3:latest --push .

```

## Ansible Environment and Python Dependencies

Verify your Ansible installation and install the required Docker collection on your control node. Ensure that the Python Docker SDK is properly linked inside your isolated Homebrew Ansible Python environment to avoid execution errors during playbook runs.

```bash
ansible --version
ansible-galaxy collection install community.docker
ansible-galaxy collection list
python3 -c "import docker; print(docker.__version__)"
pip3 install docker
python3 -m pip install docker
brew install python-docker
/usr/local/Cellar/ansible/6.6.0/libexec/bin/pip install docker
/usr/local/Cellar/ansible/6.6.0/libexec/bin/python3 -c "import docker; print(docker.__version__)"

```

## Inventory Verification and Connectivity Test

Inspect your inventory configuration file to ensure your remote development VPS connection parameters and SSH keys are correctly mapped. Run an Ansible ping command against your host group to confirm successful SSH authentication and operational readiness.

```bash
cat ./payload3-infra-minio-postgres/inventory.ini
ansible vps_dev -m ping -i ./payload3-infra-minio-postgres/inventory.ini

```

## Automated Deployment Script Execution & Breakdown

Review the contents of your root-level deployment wrapper script to confirm that your environment variables, directory navigation, and Ansible playbook execution sequence are properly structured.

* **Authenticates with GHCR:** Exports your GitHub username and Personal Access Token so Docker can securely pull your private container images.
* **Navigates to Infrastructure:** Changes directory into `payload3-infra-minio-postgres` where your deployment configuration lives.
* **Executes Ansible Automation:** Runs `ansible-playbook` using your `inventory.ini` and `deploy.yml` script to automatically connect to your remote VPS (`2.24.222.86`), copy the latest `docker-compose.yml`, pull the newest Payload image from GitHub Container Registry, ensure persistent data volumes exist, and restart the container stack.

```bash
cat fix-deploy.sh
chmod +x fix-deploy.sh
./fix-deploy.sh

```

## Post-Deployment Verification and Next Steps

Add your actual GitHub Personal Access Token with `read:packages` permissions into `fix-deploy.sh` replacing the placeholder string. Execute the deployment script from your project root, then verify container health and app responsiveness directly from your terminal and browser.

```bash
nano fix-deploy.sh
./fix-deploy.sh
ssh root@2.24.222.86
docker ps
curl http://2.24.222.86:3000

```
