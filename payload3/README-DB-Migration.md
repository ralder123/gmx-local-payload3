To initialize your tables cleanly on the VPS for this workflow, the standard pattern in production is to generate and run database migrations.
1.Source Node Environment:Load Node via NVM.If you use NVM, initialize it in your current terminal session:

>export NVM_DIR="${XDG_CONFIG_HOME:-$HOME/.nvm}"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

1. **Create Migration Files:** Generate Migration Locally.
On your local machine (where your source code, `pnpm`, and Payload CLI are available), generate a migration script based on your current collections (`Users`, `Posts`, etc.):

```bash
pnpm payload migrate:create init

```

*Verification:* Check that a new migration file appears in your local `src/migrations` (or `migrations`) directory.


2. **Buildx and Push:** Rebuild and Push Container Image.
Commit your new migration files, then rebuild and push your updated image using your `buildx` command:

```bash
docker buildx build --platform linux/amd64 -t ghcr.io/ralder123/gmx-payload/payload3:latest --push .

```

*Verification:* Ensure the build and push complete successfully.


3. **Execute Migration Container/Command:** Run Migrations on VPS.
Update your deployment script or run a temporary container run on your VPS to apply the migration files to PostgreSQL:

```bash
docker run --rm --env-file .env ghcr.io/ralder123/gmx-payload/payload3:latest pnpm payload migrate

```

*(Alternatively, you can add `pnpm payload migrate` into a startup script before launching Next.js).*
