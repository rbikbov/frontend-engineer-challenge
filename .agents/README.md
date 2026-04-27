# 🧠 Журнал разработки (Agent Logs)

Добро пожаловать в историю создания Orbitto Service. Здесь зафиксированы все ключевые этапы: от настройки первой конфигурации до внедрения сложных систем безопасности.

## Хронология

| Этап   | Тема                                                         | Описание                                                |
| :----- | :----------------------------------------------------------- | :------------------------------------------------------ |
| **00** | [AI Collaboration](00-ai-collaboration.md)                   | Принципы работы с ИИ-агентом в этом проекте.            |
| **01** | [Setup Monorepo](01-setup-monorepo.md)                       | Инициализация Nx и базовой структуры.                   |
| **02** | [Main App & UI Lib](02-add-main-app-and-ui-lib.md)           | Добавление первого приложения и библиотеки компонентов. |
| **03** | [Consolidate Deps](03-relocate-ui-and-consolidate-deps.md)   | Оптимизация зависимостей и путей импорта.               |
| **04** | [Git Hooks](04-setup-git-hooks.md)                           | Настройка Husky и автоматизации качества кода.          |
| **05** | [Modularize Configs](05-modularize-configs.md)               | Вынос конфигураций (TS, ESLint) в отдельные пакеты.     |
| **06** | [Storybook](06-setup-storybook.md)                           | Визуальная песочница для разработки компонентов.        |
| **07** | [Modernize UI](07-modernize-ui-components.md)                | Переход на Tailwind v4 и обновление визуала.            |
| **08** | [FSD Architecture](08-fsd-architecture-enforcement.md)       | Внедрение методологии Feature-Slicing.                  |
| **09** | [Multi-Zones](09-monorepo-optimization-and-multi-zones.md)   | Масштабирование через объединение Next.js приложений.   |
| **10** | [Secure Auth](10-secure-auth-and-architecture-refinement.md) | Внедрение BFF, HttpOnly кук и инверсии зависимостей.    |

| **11** | [Testing Strategy](11-testing-strategy-and-quality-assurance.md) | Пирамида тестов: Vitest, JSDOM, Playwright. |
| **12** | [Observability](12-observability-and-logging.md) | Паттерны логирования и перехват ошибок. |

---

## Зачем это нужно?

Мы верим в прозрачность процесса. Эти логи позволяют увидеть не только финальный результат, но и **процесс принятия решений**, исправление ошибок и архитектурные маневры, которые обычно остаются «за кадром» коммитов.
