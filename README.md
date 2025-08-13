# Diamate Backend

Backend API for the **Diamate** project, an early detection application for diabetes. This backend is built using Node.js version 21 with pnpm as the package manager, and uses Docker for easy running across different environments.


---

## Technologies Used

* Node.js 21 (Debian Bullseye-based)
* pnpm as package manager
* Supabase (backend-as-a-service)
* TensorFlow\.js with native addons (@tensorflow/tfjs-node)
* Docker for containerization and deployment

---

## Environment Setup

Create a `.env` file in the root of the project with the following content:

```
PORT=5000
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=your-jwt-secret
GROQ_API_KEY=your-groq-api-key
```

---

## How to Build and Run Using Docker

1. **Build the Docker Image**

```bash
docker build -t diamate-backend .
```

2. **Run the Docker Container**

```bash
docker run --env-file .env -p 5000:5000 diamate-backend
```

* The `--env-file .env` option injects environment variables from the `.env` file.
* Port 5000 inside the container is mapped to port 5000 on the host machine.

---

## Dockerfile Explanation

```
FROM node:21-bullseye

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

# Rebuild TensorFlow native addon so it works properly inside the container  
RUN pnpm exec npm rebuild @tensorflow/tfjs-node --build-addon-from-source

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]
```

* The base image `node:21-bullseye` is chosen for compatibility with native modules.
* Corepack is enabled to manage pnpm versions.
* Dependencies are installed consistently with the frozen lockfile flag.
* TensorFlow native addon is rebuilt inside the container to avoid runtime errors.
* Source code is copied and built.
* Port 5000 is exposed for the app.
* The app is started with `pnpm run start`.

---

## Important Notes

* If you use other native modules, add rebuild commands in the Dockerfile to prevent runtime errors.
* Supabase URL and Anon Key must be valid for the backend to connect to Supabase services.
* The port in `.env` should match the exposed port in the Dockerfile and the port mapped when running the container.

---

## Contributing

Here’s a brief guide:

1. Fork this repository on GitHub.
2. Create a new branch from main, e.g. `feature/your-feature` or `fix/bug-description`.
3. Make your changes.
4. Run all tests and ensure there are no errors (if available).
5. Commit changes with clear and descriptive messages.
6. Push your branch to GitHub.
7. Open a Pull Request (PR) to the main branch of this repository.
8. Wait for review and discussion from the project maintainers.
9. Once your PR is approved and merged, you’ve officially contributed! 🎉

---

## License

This project using MIT License. please look [LICENSE](./LICENSE) for further informations.
