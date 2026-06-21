# Мой солнечный SUP

Лендинг SUP-прогулок, проката сапбордов, занятий с инструктором, йоги на SUP, семейных прогулок и фотосъёмки в Лазаревском / Сочи у пляжа “Морской бриз”.

## Контакты

- Основной телефон и Telegram: `8 (963) 692-83-78`
- MAX: `8 (999) 655-80-43`
- VK: `https://vk.com/my_sup_sun_lazarevskoye`
- Адрес для такси: `ул. Одоевского, 93А`

## Стек

- Vite
- React
- TypeScript
- CSS без UI-библиотек
- Cloudflare Pages Functions для `/api/lead`

## Запуск локально

```bash
npm install
npm run dev
```

Обычно Vite откроется на:

```text
http://127.0.0.1:5173/
```

## Сборка и проверка

```bash
npm run typecheck
npm run lint
npm run build
```

Preview:

```bash
npm run preview
```

Результат сборки:

```text
dist/
```

## Структура сайта

1. Header и контакты.
2. Hero с живым CSS-солнцем.
3. Карточки услуг.
4. Групповые прогулки с инструктором.
5. Раздел для новичков.
6. Утренняя и вечерняя прогулки.
7. Прокат SUP-досок.
8. Занятие с инструктором.
9. Йога на SUP с отдельной карточкой.
10. Безопасность.
11. Семейный формат.
12. “Поколение на волне” как художественный образ.
13. Фото на море.
14. Цены.
15. Галерея всех изображений.
16. Как нас найти.
17. Форма заявки.
18. Footer.

## Изображения

Все изображения лежат в:

```text
public/images/
```

Правило проекта: изображения нельзя резать. Важные карточки, карта, логотип и галерея показываются полностью через `object-fit: contain` и `.image-frame`.

Подробный манифест:

```text
IMAGE_MANIFEST.md
```

Сейчас используется 14 изображений, включая `public/images/cards/card-yoga.jpg`.

## Форма заявки

Форма отправляет `POST /api/lead`. Серверная функция:

```text
functions/api/lead.ts
```

Функция:

- валидирует имя, телефон, услугу и количество человек;
- проверяет honeypot-поле `website`;
- отправляет заявку в Telegram Bot API;
- возвращает `ok:true` только если Telegram API вернул `ok:true`;
- добавляет контакты проекта в Telegram-сообщение;
- не показывает пользователю технические детали ошибки.

## Секреты

Секреты не хранятся в репозитории. Для примера см. `.env.example`.

В Cloudflare Pages настройте:

```text
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Путь:

```text
Cloudflare Pages → Settings → Environment variables
```

## Деплой на Cloudflare Pages

1. Запушьте проект в GitHub.
2. Создайте Cloudflare Pages project из GitHub-репозитория.
3. Укажите:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
```

4. Добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
5. Запустите deploy.

Cloudflare автоматически подхватит Pages Function из `functions/api/lead.ts`.

## Первый push в GitHub

```bash
git add .
git commit -m "Initial My Sunny SUP landing"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

## GitHub Pages

GitHub Pages serves this repository under `/my-sunny-sup-landing/`.
The default Vite build uses `base: /my-sunny-sup-landing/`.

Deploy is handled by `.github/workflows/deploy-pages.yml`: after push to `main`,
GitHub Actions runs `npm ci`, `npm run build`, uploads `dist/`, and deploys it to Pages.

Public assets from `public/images` are referenced through `import.meta.env.BASE_URL`,
so image URLs also receive the GitHub Pages prefix.

For GitHub Pages, the lead form posts to the Cloudflare Worker endpoint:

```text
https://sup-vk-cloudflare-bot.pavel-galkin-1985.workers.dev/public-site-lead
```

The Worker uses the existing VK bot Telegram secrets and returns `ok:true` only after Telegram accepts the message.

## Cloudflare Pages Base Path

Cloudflare Pages normally serves the site from the domain root. For Cloudflare, set:

```text
VITE_BASE_PATH=/
```

or use:

```bash
npm run build:cloudflare
```

The Pages Function `functions/api/lead.ts` can also use the relay mode with:

```text
SITE_LEAD_RELAY_URL=
SITE_LEAD_RELAY_SECRET=
```
