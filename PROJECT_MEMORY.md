# PROJECT_MEMORY.md

## Brand

- Name: `Мой солнечный SUP`.
- Allowed UI variant: `Мой солнечный САП`.
- Visual identity: dark marine background, deep teal, turquoise water, orange sun, cream headlines, orange CTA buttons, sunset/sunrise atmosphere, SUP boards, eagle-on-board MY SUPSUN logo, bold poster typography.
- Signature effect: hero has a CSS-only living sun that moves from sunrise to sunset with a water reflection. Motion is disabled for `prefers-reduced-motion`.

## Contacts

- Main phone and Telegram: `8 (963) 692-83-78`.
- MAX phone: `8 (999) 655-80-43`.
- VK: `https://vk.com/my_sup_sun_lazarevskoye`.
- MAX: use only `8 (999) 655-80-43`.
- Taxi address: `ул. Одоевского, 93А`.
- Landmark: beach `Морской бриз`.
- Geography: Lazarevskoye / Sochi / Black Sea.

## Offer

- SUP walks.
- Board rental.
- First-time SUP with instructor.
- Instructor lessons.
- SUP yoga.
- Family walks.
- Sea photoshoots.
- Group walks with instructor.

## Prices

- Прокат SUP-доски — 1000 ₽ / 1 час
- Утренняя прогулка — 1500 ₽ / 1,5 часа
- Вечерняя прогулка — 1500 ₽ / 1,5 часа
- Занятие с инструктором — 2000 ₽ / 1 час
- Фотосъёмка на море — 2500 ₽ / по договорённости
- Йога на SUP — цена уточняется

## Site Structure

1. Header
2. Hero
3. Service cards
4. Group walks with instructor
5. Beginners / first-time SUP section
6. Morning/evening walk details
7. SUP rental
8. Individual instructor lesson
9. SUP yoga
10. Safety and briefing
11. Family format
12. “Поколение на волне” as artistic brand image, not a separate service
13. Sea photoshoot
14. Prices
15. Gallery
16. How to find us
17. Lead form
18. Footer

## Telegram Lead Logic

- Endpoint: `POST /api/lead`.
- Implementation: `functions/api/lead.ts`.
- Secrets:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- Never hardcode secrets.
- Required fields: name, phone, service, people.
- Honeypot field: `website`.
- Show success to the user only when Telegram API returns `ok:true`.
- Telegram message includes project contacts: main phone/Telegram `8 (963) 692-83-78`, MAX `8 (999) 655-80-43`, VK community URL.

## Image Rule

Every image in `public/images` must be represented in `src/data/images.ts`, documented in `IMAGE_MANIFEST.md`, and displayed on the site at least once.

Important rule: photos and designed cards must not be cropped. Use `.image-frame` and `object-fit: contain` for service cards, gallery, map, logo, yoga card, and other important image content. Decorative hero background may use cover because the same image is also shown fully in the gallery.

Current count: 14 images, including `public/images/cards/card-yoga.jpg`.

## Yoga Card

Yoga uses `public/images/cards/card-yoga.jpg` in the service card, the yoga section, and the gallery. CTA must set service to `Йога на SUP`.

## Beginners Section

The beginners section answers common fears and has CTA `Хочу попробовать впервые`, which sets service to `Первый выход на SUP`.
