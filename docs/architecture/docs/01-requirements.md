# Requirements and drivers (from Business Architecture)

This document reflects the **Drivers/Goals/Objectives**, **Constraints**, and **Assumptions** from [Business Architecture](https://veryuniquename.atlassian.net/wiki/spaces/G/pages/229834764/Business+Architecture). Used for ADD 3.0 Part 1 (requirements, drivers, design concepts).

---

## Drivers / Goals / Objectives

| Driver | Goal | Key objectives |
|--------|------|----------------|
| Растущий интерес к онлайн-гемблингу | 5% рынков, на которые мы хотим войти | — |
| Меняющиеся регуляторные требования | Поддержка 15+ стран/регионов к концу 1-го года | Сформировать юридическую команду по 5 ключевым регионам за 12 месяцев |
| Опыт инвестора в Trading и Affiliate-бизнесе | Создать партнерскую программу | Внедрить аналитику поведения игроков за 12 мес.; привлечь 100+ активных партнеров-аффилиатов к концу года |
| Сеть потенциальных инвесторов | Привлечь $20M за 24 месяца с сохранением 51%+ доли основателей | Инвестиционный план с KPI за 3 мес.; прозрачная система управления с ежемесячной отчетностью через 3 мес. после MVP |
| Распространение интернета и мобильных устройств | Поддержка 50+ способов оплаты | 95% покрытие рынков за 3 мес.; время от инициации способа оплаты до прода &lt; 1 мес.; депозиты &lt; 30 сек.; каскадинг до MVP |
| Появление новых типов игр | Поддержка 10+ категорий игр с выводом новых | Универсальное API для интеграции за 3 мес.; подключение игрового провайдера за 1 день; A/B-тестирование геймификации за 12 мес. |
| Доступность готовых сервисов (KYC, AML) | Сократить разработку MVP на 50% и расходы на 40% (запуск за 12 мес.) | Выбрать решения для 8 ключевых компонентов; унифицированный интеграционный слой |
| Высокая маржинальность гемблинга | Маржа 30%, потери от сбоев &lt; 0,5% | Доступность 99,9% в первый год; автоматизация восстановления 90% типовых ошибок; раннее обнаружение аномалий до MVP |
| Запрос на прозрачные легальные решения | Сертификация 1 лицензии каждые 6 месяцев | Документация для сертификации за 3 мес.; отчетность регулятору; минимально достаточный уровень для аудитов |
| Разделение ответственности B2B/B2C | Распределить 100% регуляторных рисков за год | Зоны ответственности за 6 мес.; разделение данных между уровнями; типовые договоры |
| Разнообразие глобальных рынков | Выход на региональные рынки | Модульная архитектура под разные рынки за MVP; библиотека регуляторных шаблонов (новый рынок за 1 мес.); мультиязычность и мультивалютность |

---

## Constraints (stack and integrations)

| Area | Choice |
|------|--------|
| **Runtime** | Node.js |
| **Language** | TypeScript / JavaScript |
| **Backend** | Nest.js (API, microservices) |
| **Frontend** | Next.js, Refine (operator/platform UIs) |
| **DevOps** | Jenkins (CI), Digital Ocean (dev), AWS (prod), Cloudflare (DNS/CDN) |
| **Repo** | Bitbucket (monorepo) |
| **API** | REST + SSE |
| **Database** | PostgreSQL (ACID), TypeORM |
| **Caching** | Redis |
| **Integrations** | Seon (fraud), Praxis (payments), Softswiss (games), SendGrid (notifications), LiveChat (support), Google Analytics |
| **Secrets** | HashiCorp Vault |
| **CMS** | Payload |

---

## Assumptions (load and SLA)

| Parameter | Value |
|-----------|--------|
| Total Operators | 100 |
| Daily active Operators | 50% |
| Online casinos per Operator | 10 |
| Total End-users per casino | 100,000 |
| Daily active End-users | 20% |
| Requests peak ratio | 300% |

**SLA (summary):** Uptime 99.9% (web apps) / 99.95% (APIs); API response &lt; 200 ms (p95); critical transactions &lt; 100 ms; page load &lt; 3 s; support 24/7, critical response &lt; 1 h.

Full SLAs per application (Brand, Back-office Operator/Platform, APIs, CI/CD, Monitoring) are in Business Architecture.
