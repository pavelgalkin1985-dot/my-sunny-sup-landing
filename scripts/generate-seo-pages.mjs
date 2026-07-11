import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const site = 'https://mysupsun.ru';
const phone = '+79636928378';
const displayPhone = '8 (963) 692-83-78';
const logo = '/images/ChatGPT%20Image%2013%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2001_13_05.png';

const pages = [
  {
    slug: 'utrennie-sup-progulki-lazarevskoe',
    service: 'Утренняя прогулка',
    title: 'Утренняя SUP-прогулка в Лазаревском — 1500 ₽',
    description: 'Утренняя SUP-прогулка в Лазаревском у пляжа Морской бриз: 1,5 часа, инструктаж, жилет и сопровождение. Подходит новичкам и семьям.',
    eyebrow: 'Мягкий свет · спокойный темп · Лазаревское',
    h1: 'Утренняя SUP-прогулка в Лазаревском',
    lead: 'Выходим на воду утром, когда меньше жары и чаще спокойнее море. Перед стартом проверяем ветер и волну, выдаём жилеты и объясняем технику.',
    price: '1500 ₽ / 1,5 часа',
    image: '/images/ChatGPT%20Image%2012%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2022_44_35.png',
    imageAlt: 'Утренняя SUP-прогулка у моря в Лазаревском',
    cards: [
      ['Кому подходит', 'Новичкам, парам, семьям и тем, кто хочет начать день на море без спешки. Спортивная подготовка не требуется.'],
      ['Что входит', 'Подготовленная SUP-доска, весло, спасательный жилет, инструктаж на берегу и сопровождение по выбранному маршруту.'],
      ['Почему утром', 'Обычно мягче солнце, меньше людей на пляже и комфортнее вода. Точное решение о выходе принимаем по фактической погоде.'],
    ],
    faq: [
      ['Во сколько начинается прогулка?', 'Время зависит от сезона, рассвета и состояния моря. После заявки согласуем удобный утренний слот.'],
      ['Можно ли прийти впервые?', 'Да. Утро чаще всего рекомендуем для первого выхода: перед стартом спокойно отрабатываем стойку, весло и разворот.'],
      ['Что взять с собой?', 'Одежду для воды или купальник, полотенце, воду и солнцезащиту. Остальное уточним при подтверждении записи.'],
    ],
  },
  {
    slug: 'sup-na-zakate-lazarevskoe',
    service: 'Вечерняя прогулка',
    title: 'SUP на закате в Лазаревском — прогулка у моря',
    description: 'Вечерняя SUP-прогулка на закате в Лазаревском: 1,5 часа у пляжа Морской бриз, инструктаж, жилет и красивые виды Чёрного моря.',
    eyebrow: 'Закат · Чёрное море · пляж Морской бриз',
    h1: 'SUP-прогулка на закате в Лазаревском',
    lead: 'Вечерний выход на сапбордах для тех, кто хочет тёплый свет, морской горизонт и неспешную прогулку. Маршрут всегда зависит от ветра и волны.',
    price: '1500 ₽ / 1,5 часа',
    image: '/images/ChatGPT%20Image%2012%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2022_39_13.png',
    imageAlt: 'Вечерняя прогулка на SUP на закате в Лазаревском',
    cards: [
      ['Атмосферный формат', 'Подходит для пары, друзей и небольших компаний. Закатный свет особенно хорош для памятных кадров на воде.'],
      ['Безопасный старт', 'До выхода оцениваем условия у берега, проводим инструктаж и выдаём жилеты. При сильном ветре предлагаем перенос.'],
      ['Можно новичкам', 'Да, если море подходит. Тем, кто волнуется, рекомендуем индивидуальное занятие или более спокойное утреннее время.'],
    ],
    faq: [
      ['Увидим ли мы сам закат?', 'Старт подбираем с учётом времени захода солнца, но видимость зависит от облачности и погоды.'],
      ['Можно ли добавить фотосъёмку?', 'Да. Фотосессию можно согласовать отдельно или добавить к прогулке — стоимость от 2500 ₽.'],
      ['Что будет при плохой погоде?', 'Если ветер или волна делают выход небезопасным, согласуем другое время или день.'],
    ],
  },
  {
    slug: 'sup-s-detmi-lazarevskoe',
    service: 'Семейная прогулка',
    title: 'SUP с детьми в Лазаревском — семейная прогулка',
    description: 'Семейная SUP-прогулка с детьми от 7 лет в Лазаревском: жилеты, спокойный маршрут и инструктор у пляжа Морской бриз.',
    eyebrow: 'Семейный отдых · дети от 7 лет · жилеты',
    h1: 'SUP-прогулка с детьми в Лазаревском',
    lead: 'Подбираем спокойный семейный формат с учётом возраста ребёнка, погоды и уверенности на воде. Решение о маршруте принимаем только после проверки моря.',
    price: 'Формат и стоимость уточняем при записи',
    image: '/images/ChatGPT%20Image%2013%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2000_53_09.png',
    imageAlt: 'Семейная SUP-прогулка с ребёнком в Лазаревском',
    cards: [
      ['Возраст и формат', 'Принимаем детей от 7 лет. В зависимости от возраста ребёнок может идти с взрослым на одной доске или в другом согласованном формате.'],
      ['Безопасность', 'Выдаём жилеты, объясняем правила у берега и держим спокойную зону маршрута. При неподходящих условиях переносим прогулку.'],
      ['Лучшее время', 'Семьям и новичкам чаще советуем утро: меньше жары и обычно комфортнее море. Финальное решение зависит от погоды.'],
    ],
    faq: [
      ['Можно ли ребёнку на одну доску со взрослым?', 'Это зависит от возраста, веса, погоды и устойчивости взрослого. Подходящий вариант инструктор определит до выхода.'],
      ['Нужно ли уметь плавать?', 'Обязательно сообщите об уровне уверенности на воде. Жилеты выдаём всем, а формат подбираем индивидуально.'],
      ['Можно ли прийти всей семьёй?', 'Да. Укажите количество взрослых и детей в заявке, чтобы мы заранее подготовили доски и жилеты.'],
    ],
  },
  {
    slug: 'fotosessiya-na-sapah-lazarevskoe',
    service: 'Фото на море',
    title: 'Фотосессия на SUP в Лазаревском — фото на море',
    description: 'Фотосессия на сапах в Лазаревском для пары, семьи или личного контента. Съёмка на Чёрном море у пляжа Морской бриз — от 2500 ₽.',
    eyebrow: 'Фото на море · пара · семья · личный контент',
    h1: 'Фотосессия на SUP в Лазаревском',
    lead: 'Снимаем живые кадры на воде: прогулку пары, семейное утро, романтический закат или персональный морской образ. Поможем выбрать время и формат.',
    price: 'От 2500 ₽ / по договорённости',
    image: '/images/ChatGPT%20Image%2013%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2001_39_57.png',
    imageAlt: 'Романтическая фотосессия на SUP у моря',
    cards: [
      ['Выбор света', 'Утро даёт мягкий чистый свет и чаще спокойную воду. Закат — тёплую атмосферу и выразительный горизонт.'],
      ['Съёмка с прогулкой', 'Фотосессию можно добавить к SUP-прогулке или согласовать как отдельный формат. Детали обсуждаем до бронирования.'],
      ['Подготовка', 'Подскажем по одежде, времени и тому, что взять на берег. Безопасность и состояние моря важнее заранее выбранного сценария.'],
    ],
    faq: [
      ['Сколько длится съёмка?', 'Продолжительность и объём съёмки согласуем индивидуально в зависимости от задачи и погоды.'],
      ['Подходит ли для тех, кто впервые на SUP?', 'Да. Выберем спокойное время и начнём с короткого инструктажа, чтобы вы чувствовали себя увереннее.'],
      ['Можно ли фотографироваться вдвоём?', 'Да, снимаем пары, семьи и индивидуальные истории. Сообщите состав участников при записи.'],
    ],
  },
  {
    slug: 'sup-yoga-lazarevskoe',
    service: 'Йога на SUP',
    title: 'SUP-йога в Лазаревском — йога на воде у моря',
    description: 'SUP-йога в Лазаревском на Чёрном море: спокойная практика на воде, баланс и дыхание. Формат и время уточняются по погоде.',
    eyebrow: 'Баланс · дыхание · практика на воде',
    h1: 'SUP-йога в Лазаревском',
    lead: 'Практика на сапборде соединяет мягкое движение, дыхание и внимание к балансу. Занятие проходит только при подходящем состоянии моря.',
    price: 'Цена и формат уточняются',
    image: '/images/cards/card-yoga.jpg',
    imageAlt: 'Йога на SUP на Чёрном море в Лазаревском',
    cards: [
      ['Уровень подготовки', 'Формат согласуем заранее. Расскажите о своём опыте в йоге и на SUP, чтобы подобрать комфортную практику.'],
      ['Что входит', 'Подготовка доски, жилет, объяснение базовой безопасности и сама практика в согласованном темпе.'],
      ['Погода важна', 'Для йоги нужна особенно спокойная вода. При ветре или волне занятие переносим на подходящее время.'],
    ],
    faq: [
      ['Нужно ли уверенно стоять на SUP?', 'Не обязательно, но важно заранее рассказать о своём опыте. Инструктор предложит подходящий уровень упражнений.'],
      ['Когда проходит SUP-йога?', 'Дату и время согласуем индивидуально с учётом погоды, состояния моря и доступности инструктора.'],
      ['Что надеть?', 'Удобную одежду или купальник, которые не мешают движению и подходят для контакта с водой.'],
    ],
  },
  {
    slug: 'kak-dobratsya-morskoy-briz',
    service: 'Пока не знаю, нужна консультация',
    title: 'Как добраться до SUP у пляжа Морской бриз',
    description: 'Как найти Мой солнечный SUP в Лазаревском: пляж Морской бриз, ориентир для такси — ул. Одоевского, 93А, затем пешком к морю.',
    eyebrow: 'Лазаревское · ул. Одоевского, 93А · к морю пешком',
    h1: 'Как добраться до SUP у пляжа Морской бриз',
    lead: 'Для такси укажите ул. Одоевского, 93А. От основной дороги пройдите пешком по направлению к морю и пляжу “Морской бриз”. Перед выездом лучше связаться с нами.',
    price: 'Телефон и Telegram: 8 (963) 692-83-78',
    image: '/images/ChatGPT%20Image%2013%20%D0%BC%D0%B0%D1%8F%202026%20%D0%B3.,%2001_06_57.png',
    imageAlt: 'Схема маршрута к пляжу Морской бриз в Лазаревском',
    cards: [
      ['Ориентир для такси', 'Ул. Одоевского, 93А, Лазаревское. Машина довозит до района основной дороги, затем путь продолжается пешком к морю.'],
      ['Перед выходом', 'Напишите или позвоните: подтвердим точку встречи, время и подскажем актуальный проход к пляжу.'],
      ['Что искать на месте', 'Пляж “Морской бриз” и оборудование Мой солнечный SUP. Сохраните основной номер на случай, если понадобится подсказка.'],
    ],
    faq: [
      ['Есть ли парковка у самой воды?', 'Подъезд к самой точке на пляже ограничен. Уточните актуальное место остановки или парковки перед поездкой.'],
      ['Можно ли построить маршрут по адресу?', 'Да, используйте ул. Одоевского, 93А как ориентир, но финальный участок до моря нужно пройти пешком.'],
      ['Как связаться по дороге?', `Позвоните или напишите в Telegram по номеру ${displayPhone}. Также доступна группа во VK.`],
    ],
  },
];

const relatedLinks = pages.map((page) => `<a href="/${page.slug}/">${page.h1}</a>`).join('');

function render(page) {
  const url = `${site}/${page.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: page.h1, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: page.h1,
        description: page.description,
        url,
        areaServed: { '@type': 'Place', name: 'Лазаревское, Сочи' },
        provider: { '@id': `${site}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return `<!doctype html>
<html lang="ru"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index, follow, max-image-preview:large">
<title>${page.title}</title><meta name="description" content="${page.description}">
<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Мой солнечный SUP"><meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}${page.image}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<link rel="icon" href="${logo}"><script defer src="/analytics.js"></script>
<style>
:root{font-family:Inter,system-ui,sans-serif;color:#fff8ea;background:#061d24;--orange:#f47b14;--line:rgba(255,255,255,.14)}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 80% 10%,rgba(244,123,20,.2),transparent 30rem),#061d24}a{color:inherit;text-decoration:none}header,footer{padding:18px clamp(18px,6vw,80px);border-bottom:1px solid var(--line);display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap}header{position:sticky;top:0;z-index:4;background:rgba(6,29,36,.94)}.brand{font-weight:900}.nav,.links{display:flex;gap:15px;flex-wrap:wrap}.hero,.section{padding:clamp(54px,8vw,100px) clamp(18px,6vw,80px)}.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,6vw,80px);align-items:center;min-height:72vh}.eyebrow{color:#ffad35;font-weight:900;text-transform:uppercase;letter-spacing:.11em;font-size:12px}h1{font-size:clamp(42px,6vw,82px);line-height:.98;margin:12px 0 20px}h2{font-size:clamp(32px,4vw,56px);margin:0 0 30px}.lead{font-size:clamp(19px,2vw,27px);line-height:1.5;color:#d6efeb}.price{font-size:24px;color:#ffad35;font-weight:900}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;margin:10px 10px 0 0;background:linear-gradient(135deg,#f47b14,#ffad35);color:#111;font-weight:900;border-radius:8px}.ghost{background:transparent;color:#fff8ea;border:1px solid var(--line)}figure{margin:0;border:1px solid var(--line);background:rgba(255,255,255,.05);padding:14px;border-radius:10px}figure img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card{padding:24px;border:1px solid var(--line);background:rgba(255,255,255,.05);border-radius:9px}.card p{color:#c8e6e1;line-height:1.65}.section:nth-of-type(even){background:rgba(255,255,255,.025)}footer{border-top:1px solid var(--line);border-bottom:0;align-items:flex-start}.links{max-width:920px}.links a{text-decoration:underline;text-underline-offset:4px}@media(max-width:850px){.hero,.grid{grid-template-columns:1fr}.nav{display:none}}@media(max-width:520px){.button{width:100%;margin-right:0}}
</style></head><body>
<header><a class="brand" href="/">Мой солнечный SUP</a><nav class="nav" aria-label="Основная навигация"><a href="/sup-progulki-lazarevskoe/">Прогулки</a><a href="/prokat-sapbordov-lazarevskoe/">Прокат</a><a href="/sup-dlya-novichkov-lazarevskoe/">Новичкам</a><a href="/kak-dobratsya-morskoy-briz/">Как добраться</a></nav><a href="tel:${phone}" data-analytics-event="phone_click">${displayPhone}</a></header>
<main><section class="hero"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}</h1><p class="lead">${page.lead}</p><p class="price">${page.price}</p><a class="button" href="/?service=${encodeURIComponent(page.service)}#lead" data-analytics-event="booking_click" data-service="${page.service}">Оставить заявку</a><a class="button ghost" href="tel:${phone}" data-analytics-event="phone_click">Позвонить</a></div><figure><img src="${page.image}" alt="${page.imageAlt}" width="1000" height="1000"></figure></section>
<section class="section"><h2>Что важно знать</h2><div class="grid">${page.cards.map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
<section class="section"><h2>Частые вопросы</h2><div class="grid">${page.faq.map(([question, answer]) => `<article class="card"><h3>${question}</h3><p>${answer}</p></article>`).join('')}</div></section>
<section class="section"><p class="eyebrow">Запись у пляжа Морской бриз</p><h2>Уточнить погоду и свободное время</h2><p class="lead">Лазаревское, ориентир для такси — ул. Одоевского, 93А. Перед поездкой свяжитесь с нами: подтвердим точку встречи и условия на море.</p><a class="button" href="/?service=${encodeURIComponent(page.service)}#lead" data-analytics-event="booking_click" data-service="${page.service}">Записаться онлайн</a><a class="button ghost" href="https://vk.com/my_sup_sun_lazarevskoye" data-analytics-event="vk_click">Написать во VK</a></section></main>
<footer><div><strong>Мой солнечный SUP</strong><p>SUP-прогулки и прокат сапбордов в Лазаревском</p><p>${displayPhone} · ул. Одоевского, 93А · пляж “Морской бриз”</p></div><nav class="links" aria-label="Другие форматы"><a href="/">Главная</a>${relatedLinks}</nav></footer>
</body></html>`;
}

for (const page of pages) {
  const directory = resolve('public', page.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), render(page), 'utf8');
}
