# 16: Code Review Fixes & Improvements

**Статус:** In Progress  
**Дата:** 2026-05-02  
**Автор:** Antigravity

**Контекст:** Данный отчет аккумулирует все исправления, внесенные по результатам Code Review, в хронологическом порядке их реализации.

---

## 🛠 Исправления по результатам Code Review

### 1. Стабилизация запуска E2E (Nx + Playwright)

**Проблема:** Команда `pnpm e2e` зависала: Nx ожидал завершения процесса dev-сервера, что блокировало выполнение тестов.  
**Решение:**

- Внедрен новый таргет `dev-e2e` на базе исполнителя `@nx/next:server`, умеющий сообщать о готовности сервера.
- Playwright перенастроен на работу с этим таргетом.

### 2. Защита от Open Redirect

**Проблема:** Параметр `callbackUrl` не валидировался, что позволяло проводить фишинговые атаки через внешние редиректы.  
**Решение:**

- Создана утилита `isSafeUrl` в `@workspace/lib`, разрешающая только внутренние пути или доверенный домен.
- Внедрена обязательная очистка URL перед редиректом в `signin.page.tsx`.

### 3. Проброс Client IP (X-Forwarded-For)

**Проблема:** Заявленный проброс IP не работал: заголовки терялись при мердже в GraphQL-клиенте, из-за чего бэкенд не видел реальный IP для Rate Limiting.  
**Решение:**

- Исправлен баг в методе `executeRequest` класса `GraphQLAuthApi`: теперь заголовки `X-Forwarded-For` и `Cookie` корректно прокидываются до бэкенда.
- Настроена экстракция IP из цепочки прокси в контроллерах BFF.

### 4. Реальный механизм Logout

**Проблема:** Мутация `logout` была заглушкой, сессия оставалась живой в базе данных.  
**Решение:**

- Бэкенд доработан для физического отзыва (revocation) сессии в Postgres.
- **Явные контракты**: В мутациях `logout` и `refresh` аргументы (токены) стали обязательными. Это осознанное решение: BFF (как владелец HttpOnly кук) берет на себя ответственность за извлечение секрета и его явную передачу в GraphQL-слой. Это делает взаимодействие прозрачным для отладки и исключает зависимость от «неявного» чтения кук бэкендом.

---

## 🚀 Архитектурные улучшения (Beyond Requirements)

Дополнительные улучшения, расширяющие надежность транспортного уровня:

### 1. Расширенная трансляция ошибок (ADR-004)

- **Rate Limit Detection**: Внедрен класс `RateLimitError` с поддержкой парсинга времени блокировки (`Retry-After`).
- **Семантизация статусов**: Все бизнес-ошибки переведены с 401 на корректный **400 Bad Request**.
- **Безопасность**: Добавлен проброс `User-Agent` для аудита сессий.

### 2. Формализация решений

- Создан **ADR-004**, фиксирующий стратегию обработки ошибок как стандарт проекта.

---

## 📦 Изменения в коде

- `apps/main/src/features/auth/ui/signin.page.tsx` (Open Redirect fix)
- `libs/shared/lib/src/utils/url.ts` (isSafeUrl)
- `apps/main/src/app/api/auth/_core/create-auth-client.ts` (Headers propagation)
- `libs/shared/api/src/contract/auth-api.interface.ts` (Logout & Refresh params made required)
- `libs/shared/api/src/infrastructure/graphql/auth/auth-api.graphql.ts` (Logout & Refresh params made required)
- `docs/adr/004-unified-error-handling-and-bff-translation.md` (ADR)
- `libs/shared/api/src/contract/auth.errors.ts` (Add RateLimitError class)
- `libs/shared/api/src/infrastructure/graphql/auth/auth-error-mapper.ts` (RateLimitError mapping)
- `apps/main/src/app/api/auth/_core/error-response.ts` (BFF rate-limit handling)
- `libs/shared/api/src/contract/auth-api.interface.ts` (Add RateLimitError to throws)
- `libs/shared/api/src/hooks/use-auth-queries.ts` (Add RateLimitError to queries and mutations error types)
- `libs/shared/api/src/utils/error.ts` (Add RateLimitError extraction as ROOT_FIELD)
