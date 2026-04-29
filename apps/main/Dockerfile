FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline --frozen-lockfile

FROM deps AS builder
ENV NODE_ENV=production
RUN npx nx run main:build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/apps/main/.next/standalone ./
COPY --from=builder /app/apps/main/public ./apps/main/public
COPY --from=builder /app/apps/main/.next/static ./apps/main/.next/static

EXPOSE 4000

CMD ["node", "apps/main/server.js"]
