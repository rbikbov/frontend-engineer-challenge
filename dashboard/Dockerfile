FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app

# 1. Сборка приложения
FROM base AS builder
ARG NEXT_PUBLIC_AUTH_BACKEND_TYPE
ARG NEXT_PUBLIC_AUTH_BACKEND_URL
ARG INTERNAL_DASHBOARD_URL

ENV NEXT_PUBLIC_AUTH_BACKEND_TYPE=$NEXT_PUBLIC_AUTH_BACKEND_TYPE
ENV NEXT_PUBLIC_AUTH_BACKEND_URL=$NEXT_PUBLIC_AUTH_BACKEND_URL
ENV INTERNAL_DASHBOARD_URL=$INTERNAL_DASHBOARD_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NX_DAEMON=false
ENV CI=true

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/main/package.json ./apps/main/
COPY apps/dashboard/package.json ./apps/dashboard/
COPY libs/shared/api/package.json ./libs/shared/api/
COPY libs/shared/config/package.json ./libs/shared/config/
COPY libs/shared/constants/package.json ./libs/shared/constants/
COPY libs/shared/lib/package.json ./libs/shared/lib/
COPY libs/shared/ui/package.json ./libs/shared/ui/
COPY libs/eslint-config/package.json ./libs/eslint-config/
COPY libs/typescript-config/package.json ./libs/typescript-config/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN find . -name "vitest.config.ts" -exec mv {} {}.bak \;

RUN pnpm exec nx run-many -t generate
RUN pnpm exec nx run dashboard:build --prod

# 2. Финальный образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next/static ./apps/dashboard/.next/static

USER nextjs
EXPOSE 3001
CMD ["node", "apps/dashboard/server.js"]
