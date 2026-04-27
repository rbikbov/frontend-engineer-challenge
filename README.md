# 🌌 Orbitto Service: Advanced Frontend Challenge

Искренне благодарю вас за время, уделенное изучению этого решения. Данный репозиторий демонстрирует не просто верстку макетов, а комплексный инженерный подход к построению масштабируемой и безопасной фронтенд-архитектуры.

---

## 🏗 Архитектурные столпы

Проект построен на трех фундаментальных решениях, которые подробно описаны в наших **Architecture Decision Records (ADR)**:

1.  **[BFF & Secure Auth (ADR-002)](docs/adr/002-secure-auth-strategy.md)**: Полный отказ от хранения токенов в среде доступной клиенту. Внедрен паттерн Backend-for-Frontend с использованием `HttpOnly` кук и пробросом IP клиента (`X-Forwarded-For`) для корректного Rate Limiting. Проксируем только запросы связанные с токенами, вместо проксирования всех запросов.
2.  **[Multi-Zones Scalability (ADR-001)](docs/adr/001-multi-zones-architecture.md)**: Использование Next.js Multi-Zones для разделения Auth-флоу и Dashboard на независимые приложения. Это позволяет командам работать автономно, сохраняя единый домен и общую дизайн-систему.
3.  **[FSD & Dependency Inversion (ADR-003)](docs/adr/003-fsd-and-dependency-inversion.md)**: Строгое следование Feature-Slicing Methodology с использованием паттерна `deps` для инверсии зависимостей. Это гарантирует отсутствие циклических импортов и легкое тестирование компонентов.

---

## 🛠 Технологический стек

- **Framework**: Next.js 15 (App Router + Pages Router в разных зонах)
- **Monorepo**: Nx + PNPM
- **Styling**: Tailwind CSS v4 (Native CSS-first approach)
- **State Management**: TanStack Query v5 (React Query)
- **Contract**: GraphQL (через типизированный SDK)
- **Architecture**: Feature-Slicing Methodology (FSD)

---

## 📂 Структура проекта

```text
├── apps/
│   ├── main/           # Зона 1: Auth flow, Landing (BFF Gatekeeper)
│   └── dashboard/      # Зона 2: Внутренняя панель (User protected area)
├── libs/
│   ├── shared/
│   │   ├── ui/         # Дизайн-система (Tailwind v4, Headless UI)
│   │   └── api/        # Контракты, SDK и логика аутентификации
├── docs/
│   └── adr/            # Architecture Decision Records
└── .agents/            # Логи разработки (Инженерный путь)
```

---

## 🚀 Как запустить

1.  **Установка зависимостей**:
    ```bash
    pnpm install
    ```
2.  **Настройка окружения**:
    Скопируйте `.env.example` в корень и приложения:
    ```bash
    cp .env.example .env
    ```
3.  **Запуск в режиме разработки**:
    ```bash
    pnpm dev
    ```
    _Приложение будет доступно на `localhost:3000` (Main) и `localhost:3001` (Dashboard через прокси)._

---

## 🧠 Инженерный путь (Agent Logs)

Весь процесс разработки был задокументирован:

- **[01: Setup Monorepo](.agents/01-setup-monorepo.md)** — про настройку стилей и зон.
- **[02: Main App & UI Lib](.agents/02-add-main-app-and-ui-lib.md)** — про настройку стилей и зон.
- **[03: Relocate UI & Consolidate Deps](.agents/03-relocate-ui-and-consolidate-deps.md)** — про настройку стилей и зон.
- **[04: Setup Git Hooks](.agents/04-setup-git-hooks.md)** — про настройку стилей и зон.
- **[05: Setup Commitizen](.agents/05-setup-commitizen.md)** — про настройку стилей и зон.
- **[06: Setup ESLint](.agents/06-setup-eslint.md)** — про настройку стилей и зон.
- **[07: Setup stylelint](.agents/07-setup-stylelint.md)** — про настройку стилей и зон.
- **[08: Setup Prettier](.agents/08-setup-prettier.md)** — про настройку стилей и зон.
- **[09: Monorepo Optimization and Multi-Zones](.agents/09-monorepo-optimization-and-multi-zones.md)** — про настройку стилей и зон.
- **[10: Secure Auth & Architecture Refinement](.agents/10-secure-auth-and-architecture-refinement.md)** — реализация безопасной авторизации, внедрение BFF и инверсии зависимостей.
- **[11: Testing Strategy & QA](.agents/11-testing-strategy-and-quality-assurance.md)** — описание уровней тестирования (Unit, Integration, E2E) и инструментов.
- **[12: Observability & Logging](.agents/12-observability-and-logging.md)** — архитектура логирования и мониторинга.

---

## Тестирование

В проекте реализовано три уровня тестирования для обеспечения надежности критических сценариев.

### 1. Unit-тесты (Логика и Схемы)

Проверка валидации данных и бизнес-логики в `libs/shared/api`.

```bash
npx nx test api
# или запуск напрямую через vitest
npx vitest run -c libs/shared/api/vitest.config.ts
```

### 2. Integration-тесты (UI-компоненты)

Проверка взаимодействия React-компонентов с формами и валидацией (JSDOM).

```bash
npx nx test main
# или запуск конкретных тестов
npx vitest run -c apps/main/vitest.config.ts
```

### 3. E2E-тесты (Браузерные сценарии)

Полная проверка путей пользователя через Playwright.

```bash
# Для запуска требуется работающий dev-сервер
npx nx e2e main-e2e
```

---

**Ссылка на оригинальный челендж**: [README_challenge.md](README_challenge.md)  
**Ссылка на бекенд**: [rbikbov/engineer-challenge](https://github.com/rbikbov/engineer-challenge)
