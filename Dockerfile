FROM node:21-bullseye

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

RUN pnpm exec npm rebuild @tensorflow/tfjs-node --build-addon-from-source

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]
