import { FormEvent, useMemo, useRef, useState } from 'react';
import { galleryImages, images, serviceImages, SiteImage } from './data/images';

type LeadStatus = 'idle' | 'sending' | 'success' | 'error';

type LeadForm = {
  name: string;
  phone: string;
  messenger: string;
  service: string;
  date: string;
  time: string;
  people: string;
  comment: string;
  website: string;
};

const PHONE_DISPLAY = '8 (963) 692-83-78';
const PHONE_HREF = 'tel:+79636928378';
const MAX_PHONE_DISPLAY = '8 (999) 655-80-43';
const MAX_PHONE_HREF = 'tel:+79996558043';
const VK_URL = 'https://vk.com/my_sup_sun_lazarevskoye';
const TELEGRAM_CONTACT_HREF =
  'https://t.me/share/url?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20SUP-%D0%BF%D1%80%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D1%83.';

const initialForm: LeadForm = {
  name: '',
  phone: '',
  messenger: 'Telegram',
  service: 'Утренняя прогулка',
  date: '',
  time: 'Утро',
  people: '2',
  comment: '',
  website: '',
};

const navItems = [
  ['Прогулки', '#walks'],
  ['Новичкам', '#beginners'],
  ['Прокат', '#rental'],
  ['Инструктор', '#instructor'],
  ['Йога', '#yoga'],
  ['Цены', '#prices'],
  ['Как нас найти', '#location'],
  ['Заявка', '#lead'],
] as const;

const services = [
  {
    title: 'Утренняя прогулка',
    service: 'Утренняя прогулка',
    price: '1500 ₽ / 1,5 часа',
    text: 'SUP-прогулка в Лазаревском утром: море обычно тише, свет мягче, новичкам проще почувствовать баланс.',
    cta: 'Хочу утром',
    image: serviceImages.morning,
  },
  {
    title: 'Вечерняя прогулка',
    service: 'Вечерняя прогулка',
    price: '1500 ₽ / 1,5 часа',
    text: 'Вечерняя прогулка на сапборде у моря: закат, спокойный темп и атмосфера Чёрного моря.',
    cta: 'Хочу вечером',
    image: serviceImages.evening,
  },
  {
    title: 'Прокат SUP',
    service: 'Прокат SUP',
    price: '1000 ₽ / 1 час',
    text: 'Прокат SUP-досок в Лазаревском для тех, кто уже уверенно держится на воде.',
    cta: 'Забронировать прокат',
    image: serviceImages.rental,
  },
  {
    title: 'Занятие с инструктором',
    service: 'Занятие с инструктором',
    price: '2000 ₽ / 1 час',
    text: 'SUP для новичков: инструктор объяснит стойку, весло, баланс и безопасный маршрут у берега.',
    cta: 'Хочу занятие',
    image: serviceImages.instructor,
  },
  {
    title: 'Фото на море',
    service: 'Фото на море',
    price: '2500 ₽ / по договорённости',
    text: 'Красивые кадры на воде для пары, семьи, контента или подарка. Можно добавить к прогулке.',
    cta: 'Хочу фото',
    image: serviceImages.romantic,
  },
  {
    title: 'Йога на SUP',
    service: 'Йога на SUP',
    price: 'Цена уточняется',
    text: 'Йога на SUP на Чёрном море: баланс, дыхание, мягкая практика и перезагрузка без спешки.',
    cta: 'Уточнить по йоге',
    image: serviceImages.yoga,
  },
] as const;

const beginnerCards = [
  {
    fear: 'Я никогда не стоял на SUP',
    answer:
      'Это нормально. Перед выходом инструктор объясняет базовую стойку, показывает, как держать весло, как вставать на доску и как спокойно двигаться по воде.',
  },
  {
    fear: 'А если я упаду?',
    answer:
      'SUP — это водный формат, поэтому падение не страшно. Вы в жилете, рядом инструктор, а маршрут подбирается спокойно, без гонки и сложных участков.',
  },
  {
    fear: 'Я не спортивный',
    answer:
      'Для первого выхода не нужна специальная подготовка. Главное — спокойный темп, внимательность и понятные подсказки инструктора.',
  },
  {
    fear: 'Боюсь за ребёнка',
    answer:
      'Для детей выдаются жилеты, темп выбирается спокойный, а формат подбирается под возраст и уверенность ребёнка. Детям — от 7 лет.',
  },
  {
    fear: 'Не знаю, когда лучше идти',
    answer:
      'Лучшее время для новичков — утро. Обычно море спокойнее, меньше волн, мягче солнце и проще почувствовать баланс.',
  },
  {
    fear: 'Вдруг я отплыву далеко?',
    answer:
      'Новички не уходят далеко одни. Инструктор объясняет безопасную зону, сопровождает выход на воду и помогает держать спокойный маршрут.',
  },
] as const;

const priceRows = [
  ['Прокат SUP-доски', '1000 ₽', '1 час'],
  ['Утренняя прогулка', '1500 ₽', '1,5 часа'],
  ['Вечерняя прогулка', '1500 ₽', '1,5 часа'],
  ['Занятие с инструктором', '2000 ₽', '1 час'],
  ['Фотосъёмка на море', '2500 ₽', 'по договорённости'],
  ['Йога на SUP', 'Уточняется', 'индивидуально'],
] as const;

const serviceOptions = [
  'Утренняя прогулка',
  'Вечерняя прогулка',
  'Прокат SUP',
  'Занятие с инструктором',
  'Первый выход на SUP',
  'Йога на SUP',
  'Семейная прогулка',
  'Фото на море',
  'Пока не знаю, нужна консультация',
] as const;

function ImageFrame({ image, className = '' }: { image: SiteImage; className?: string }) {
  return (
    <figure className={`image-frame image-frame--${image.frame} ${className}`.trim()}>
      <img src={image.src} alt={image.alt} loading="lazy" />
    </figure>
  );
}

function App() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLElement | null>(null);
  const logo = images.logo;

  const selectService = (service: string) => {
    setForm((current) => ({ ...current, service }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const requiredFilled = useMemo(
    () => Boolean(form.name.trim() && form.phone.trim() && form.service.trim() && form.people.trim()),
    [form.name, form.people, form.phone, form.service],
  );

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (response.ok && data.ok === true) {
        setStatus('success');
        setMessage('Заявка отправлена. Мы скоро свяжемся с вами.');
        setForm(initialForm);
        return;
      }

      setStatus('error');
      setMessage(data.message ?? 'Не удалось отправить заявку.');
    } catch {
      setStatus('error');
      setMessage('Не удалось отправить заявку.');
    }
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Мой солнечный SUP">
          <img src={logo.src} alt="Логотип MY SUPSUN с орлом на SUP-доске" />
          <span>Мой солнечный SUP</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-contact">
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={VK_URL}>VK</a>
        </div>
        <button className="header-cta" type="button" onClick={() => selectService('Пока не знаю, нужна консультация')}>
          Забронировать
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-bg" src={images.hero.src} alt={images.hero.alt} fetchPriority="high" />
          <div className="hero-shade" />
          <div className="living-sun" aria-hidden="true">
            <span className="sun-core" />
            <span className="sun-reflection" />
          </div>
          <div className="hero-content">
            <img className="hero-logo" src={logo.src} alt="" aria-hidden="true" />
            <p className="eyebrow">Лазаревское / Сочи / Чёрное море</p>
            <h1 id="hero-title">Мой солнечный SUP</h1>
            <p className="hero-lead">SUP-прогулки в Лазаревском, прокат сапбордов и туры у пляжа Морской бриз</p>
            <p className="hero-copy">
              Утренние и вечерние прогулки на сапборде с инструктором, прокат SUP-досок в Лазаревском,
              SUP для новичков, йога на SUP, семейные прогулки и фото на Чёрном море.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => selectService('Утренняя прогулка')}>
                Забронировать прогулку
              </button>
              <a href="#prices">Посмотреть цены</a>
              <a href="#location">Как нас найти</a>
            </div>
            <ul className="quick-facts" aria-label="Преимущества">
              <li>SUP Лазаревское</li>
              <li>Инструктор рядом</li>
              <li>Жилеты выдаём</li>
              <li>Лучшее время для новичков — утро</li>
              <li>Telegram по основному номеру</li>
            </ul>
          </div>
        </section>

        <section className="section section-tight" id="walks">
          <div className="section-heading">
            <p className="eyebrow">Форматы на воде</p>
            <h2>Что можно выбрать</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <ImageFrame image={service.image} />
                <div className="service-card-body">
                  <p className="service-price">{service.price}</p>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button type="button" onClick={() => selectService(service.service)}>
                    {service.cta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-band feature-band-split">
          <div>
            <p className="eyebrow">С инструктором</p>
            <h2>Групповые SUP-прогулки с инструктором</h2>
            <p>
              Вы выходите на воду вместе с инструктором: перед стартом он проводит инструктаж, помогает
              с посадкой на доску и сопровождает прогулку. Это спокойная сап-прогулка на море для новичков,
              пары, семьи или компании.
            </p>
          </div>
          <ImageFrame image={images.groupReal} />
        </section>

        <section className="beginners-section" id="beginners">
          <div className="section-heading">
            <p className="eyebrow">SUP для новичков</p>
            <h2>Первый раз на SUP? Мы всё спокойно объясним</h2>
          </div>
          <p className="section-lead">
            SUP для новичков в Лазаревском — безопасный первый выход на воду с инструктором. Если вы никогда
            не стояли на сапборде, это нормально. Мы начинаем не с “катания”, а с простого и понятного
            инструктажа: как встать, как держать весло, как сохранять баланс и как безопасно вернуться к берегу.
          </p>
          <div className="fear-grid">
            {beginnerCards.map((card) => (
              <article className="fear-card" key={card.fear}>
                <span>Страх</span>
                <h3>{card.fear}</h3>
                <p>{card.answer}</p>
              </article>
            ))}
          </div>
          <button type="button" onClick={() => selectService('Первый выход на SUP')}>
            Хочу попробовать впервые
          </button>
        </section>

        <section className="section dual-walks">
          <article>
            <ImageFrame image={images.morning} />
            <div>
              <h3>Утренняя прогулка</h3>
              <ul>
                <li>1,5 часа</li>
                <li>1500 ₽</li>
                <li>море обычно спокойнее</li>
                <li>мягкий рассветный свет</li>
                <li>лучшее время для новичков — утро</li>
                <li>возможны красивые фото</li>
              </ul>
              <button type="button" onClick={() => selectService('Утренняя прогулка')}>
                Хочу утром
              </button>
            </div>
          </article>
          <article>
            <ImageFrame image={images.evening} />
            <div>
              <h3>Вечерняя прогулка</h3>
              <ul>
                <li>1,5 часа</li>
                <li>1500 ₽</li>
                <li>закатная атмосфера</li>
                <li>красивый свет</li>
                <li>спокойный темп</li>
                <li>для пары, семьи или компании</li>
              </ul>
              <button type="button" onClick={() => selectService('Вечерняя прогулка')}>
                Хочу вечером
              </button>
            </div>
          </article>
        </section>

        <section className="story-section" id="rental">
          <ImageFrame image={images.rental} />
          <div>
            <p className="eyebrow">Прокат сапов Лазаревское</p>
            <h2>Прокат SUP-доски</h2>
            <p className="big-price">1000 ₽ / 1 час</p>
            <p>
              Прокат SUP-досок в Лазаревском подходит тем, кто уже пробовал сапборд и уверенно чувствует себя
              на воде. Мы подскажем безопасную зону у пляжа Морской бриз, выдадим жилет и объясним базовые правила.
            </p>
            <p className="honest-note">
              Если вы выходите впервые, лучше выбрать занятие с инструктором. Утром море обычно спокойнее,
              поэтому новичкам проще начать без лишнего напряжения.
            </p>
            <button type="button" onClick={() => selectService('Прокат SUP')}>
              Забронировать прокат
            </button>
          </div>
        </section>

        <section className="story-section story-reverse" id="instructor">
          <ImageFrame image={images.instructor} />
          <div>
            <p className="eyebrow">Первый старт</p>
            <h2>Индивидуальное занятие с инструктором</h2>
            <p className="big-price">2000 ₽ / 1 час</p>
            <p>
              Прогулка на сапборде с инструктором — лучший старт, если вы впервые пробуете SUP. Инструктор
              объяснит, как вставать, держать весло, сохранять баланс, разворачиваться и безопасно возвращаться к берегу.
            </p>
            <ul className="check-list">
              <li>подходит с нуля;</li>
              <li>можно взрослым и детям от 7 лет;</li>
              <li>жилет входит;</li>
              <li>чехол для телефона можно выдать;</li>
              <li>фото в процессе можно добавить;</li>
              <li>лучшее время для новичков — утро.</li>
            </ul>
            <button type="button" onClick={() => selectService('Занятие с инструктором')}>
              Хочу занятие
            </button>
          </div>
        </section>

        <section className="feature-band yoga-band" id="yoga">
          <ImageFrame image={images.yoga} />
          <div>
            <p className="eyebrow">Йога на SUP</p>
            <h2>Йога на сапборде в Лазаревском — спокойная практика на воде у моря</h2>
            <p>
              Йога на SUP — это мягкая практика на воде для баланса, дыхания и перезагрузки. Формат подходит
              новичкам, проходит в спокойном темпе и помогает почувствовать море без спешки и лишнего напряжения.
            </p>
            <ul className="pill-list">
              <li>подходит новичкам</li>
              <li>спокойная практика на воде</li>
              <li>лучшее время — утро, когда море тише</li>
              <li>перезагрузка для тела и ума</li>
              <li>красивые фото и атмосфера</li>
              <li>индивидуально или мини-группой</li>
            </ul>
            <button type="button" onClick={() => selectService('Йога на SUP')}>
              Уточнить по йоге
            </button>
          </div>
        </section>

        <section className="section assurance" id="safety">
          <div className="section-heading">
            <p className="eyebrow">Безопасность</p>
            <h2>Спокойно, понятно, безопасно</h2>
          </div>
          <div className="assurance-grid">
            {[
              'перед выходом объясняем правила',
              'показываем, как держать весло',
              'выдаём жилеты',
              'подбираем формат под уровень',
              'инструктор сопровождает групповые прогулки',
              'новичкам рекомендуем утреннее время',
              'при плохой погоде выход переносится',
            ].map((item, index) => (
              <div className="assurance-item" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="story-section family-section">
          <ImageFrame image={images.familyPet} />
          <div>
            <p className="eyebrow">Семейная SUP-прогулка</p>
            <h2>Можно с семьёй, ребёнком и питомцем</h2>
            <p>
              Семейная SUP-прогулка — это спокойная морская прогулка на Чёрном море, где можно провести время
              вместе, сделать фото и получить общее летнее воспоминание.
            </p>
            <ul className="check-list">
              <li>детям от 7 лет;</li>
              <li>жилеты для детей и взрослых;</li>
              <li>спокойный темп;</li>
              <li>можно с собакой по согласованию;</li>
              <li>инструктор подскажет безопасный формат.</li>
            </ul>
            <button type="button" onClick={() => selectService('Семейная прогулка')}>
              Хочу семейную прогулку
            </button>
          </div>
        </section>

        <section className="story-section legacy-section">
          <ImageFrame image={images.familyLegacy} />
          <div>
            <p className="eyebrow">Художественный образ</p>
            <h2>Поколение на волне</h2>
            <p className="hero-lead">Море, семья и воспоминания, которые передаются дальше</p>
            <p>
              Этот образ — не про отдельную услугу, а про настроение “Мой солнечный SUP”. Мы хотим, чтобы прогулка
              на сапборде была не просто активностью на море, а тёплым воспоминанием: для семьи, ребёнка, пары
              или человека, который впервые выходит на воду.
            </p>
          </div>
        </section>

        <section className="feature-band photo-band">
          <ImageFrame image={images.romantic} />
          <div>
            <p className="eyebrow">Фото на море</p>
            <h2>Фото на память</h2>
            <p className="big-price">2500 ₽ / по договорённости</p>
            <p>
              Можно добавить фотосъёмку во время SUP-прогулки в Лазаревском или сделать отдельный съёмочный
              формат на море. Это подойдёт для пары, семьи, контента, подарка или красивых летних кадров.
            </p>
            <button type="button" onClick={() => selectService('Фото на море')}>
              Хочу фото
            </button>
          </div>
        </section>

        <section className="section prices" id="prices">
          <div className="section-heading">
            <p className="eyebrow">Стоимость</p>
            <h2>Цены без сюрпризов</h2>
          </div>
          <div className="price-table" role="table" aria-label="Цены SUP-прогулок">
            {priceRows.map(([name, price, duration]) => (
              <div role="row" className="price-row" key={name}>
                <span role="cell">{name}</span>
                <strong role="cell">{price}</strong>
                <span role="cell">{duration}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section gallery" aria-labelledby="gallery-title">
          <div className="section-heading">
            <p className="eyebrow">Галерея</p>
            <h2 id="gallery-title">Атмосфера Мой солнечный SUP</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <figure className={`image-frame image-frame--${image.frame}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="location-section" id="location">
          <div className="location-copy">
            <p className="eyebrow">Лазаревское / пляж Морской бриз</p>
            <h2>Как нас найти</h2>
            <p className="hero-lead">SUP-прокат и прогулки в Лазаревском у пляжа “Морской бриз”</p>
            <p>
              Мы находимся в Лазаревском, рядом с пляжем “Морской бриз”. Для такси удобно указывать адрес:
              ул. Одоевского, 93А. Такси довозит до основной дороги в районе ул. Лазарева / ул. Одоевского,
              дальше нужно пройти пешком по набережной к морю.
            </p>
            <div className="contact-list">
              <p>Телефон: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
              <p>Telegram и заявки: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
              <p>VK: <a href={VK_URL}>{VK_URL}</a></p>
              <p>MAX: доступен по номеру {MAX_PHONE_DISPLAY}</p>
            </div>
            <div className="hero-actions location-actions">
              <a href={PHONE_HREF}>Позвонить</a>
              <a href={VK_URL}>Открыть VK</a>
              <button type="button" onClick={() => selectService('Пока не знаю, нужна консультация')}>
                Оставить заявку
              </button>
            </div>
          </div>
          <ImageFrame image={images.map} />
        </section>

        <section className="lead-section" id="lead" ref={formRef}>
          <div className="lead-intro">
            <img src={logo.src} alt="" aria-hidden="true" />
            <p className="eyebrow">Заявка</p>
            <h2>Оставить заявку</h2>
            <p>
              Выберите формат, дату и количество человек — мы свяжемся с вами по телефону, Telegram, MAX, VK
              или WhatsApp и подскажем лучший вариант выхода на воду.
            </p>
            <div className="contact-list">
              <p>Основной телефон и Telegram: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
              <p>VK: <a href={VK_URL}>{VK_URL}</a></p>
              <p>MAX: <a href={MAX_PHONE_HREF}>{MAX_PHONE_DISPLAY}</a></p>
            </div>
          </div>
          <form className="lead-form" onSubmit={submitLead}>
            <input
              className="spam-field"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField('website', event.target.value)}
              aria-hidden="true"
            />
            <label>
              Имя *
              <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" />
            </label>
            <label>
              Телефон *
              <input
                required
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                autoComplete="tel"
                inputMode="tel"
              />
            </label>
            <label>
              Предпочтительный мессенджер
              <select value={form.messenger} onChange={(event) => updateField('messenger', event.target.value)}>
                <option>Telegram</option>
                <option>WhatsApp</option>
                <option>MAX</option>
                <option>VK</option>
                <option>Телефонный звонок</option>
              </select>
            </label>
            <label>
              Что хотите выбрать *
              <select required value={form.service} onChange={(event) => updateField('service', event.target.value)}>
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              Дата
              <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
            </label>
            <label>
              Время
              <select value={form.time} onChange={(event) => updateField('time', event.target.value)}>
                <option>Утро</option>
                <option>День</option>
                <option>Вечер</option>
                <option>Пока не знаю</option>
              </select>
            </label>
            <label>
              Количество человек *
              <input
                required
                min="1"
                type="number"
                value={form.people}
                onChange={(event) => updateField('people', event.target.value)}
              />
            </label>
            <label className="wide-field">
              Комментарий
              <textarea value={form.comment} onChange={(event) => updateField('comment', event.target.value)} rows={4} />
            </label>
            <button className="submit-button" type="submit" disabled={status === 'sending' || !requiredFilled}>
              {status === 'sending' ? 'Отправляем...' : 'Отправить заявку'}
            </button>
            {message ? (
              <p className={`form-message ${status}`}>
                {status === 'error'
                  ? `${message} Пожалуйста, напишите нам напрямую или позвоните: ${PHONE_DISPLAY}. VK: ${VK_URL}`
                  : message}
              </p>
            ) : null}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand-mark" href="#top">
          <img src={logo.src} alt="" aria-hidden="true" />
          <span>Мой солнечный SUP</span>
        </a>
        <p>Мой солнечный SUP — SUP-прогулки, прокат сапбордов и морские впечатления в Лазаревском.</p>
        <address>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <span>ул. Одоевского, 93А · пляж “Морской бриз” · MAX: {MAX_PHONE_DISPLAY}</span>
          <a href={VK_URL}>VK: my_sup_sun_lazarevskoye</a>
        </address>
        <div className="footer-actions">
          <a href={PHONE_HREF}>Позвонить</a>
          <a href={TELEGRAM_CONTACT_HREF}>Telegram</a>
          <a href={MAX_PHONE_HREF}>MAX</a>
          <a href={VK_URL}>VK</a>
          <a href="#top">Наверх</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
