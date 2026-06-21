import { contacts } from './data/contacts';
import {
  aboutParagraphs,
  formats,
  heroFacts,
  images,
  navItems,
  paymentRules,
  preparationSteps,
  requestCards,
  specialist,
  trustCards,
} from './data/siteContent';

type ImageKey = keyof typeof images;

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function ContactButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'contact-actions contact-actions--compact' : 'contact-actions'}>
      <a className="button button--primary" href={contacts.telegram} target="_blank" rel="noreferrer">
        Написать в Telegram
      </a>
      <a className="button" href={contacts.whatsapp} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <a className="button button--ghost" href={contacts.vk} target="_blank" rel="noreferrer">
        VK
      </a>
    </div>
  );
}

function FramedImage({ image, className = '' }: { image: ImageKey; className?: string }) {
  const current = images[image];

  return (
    <figure className={`image-frame ${className}`.trim()}>
      <img src={assetUrl(current.src)} alt={current.alt} loading={image === 'hero' ? 'eager' : 'lazy'} />
    </figure>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function App() {
  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={specialist.shortName}>
          <span className="brand-mark">ЕУ</span>
          <span>{specialist.shortName}</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={contacts.telegram} target="_blank" rel="noreferrer">
          Написать
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Комплексная медицинская и психологическая помощь</p>
            <h1 id="hero-title">{specialist.fullName}</h1>
            <p className="hero-role">{specialist.role}</p>
            <p className="hero-lead">
              Бережная комплексная помощь на стыке доказательной медицины, психиатрии и психотерапии. Стаж —{' '}
              <strong className="experience-years">11 лет</strong>. Индивидуальный маршрут и конфиденциальное пространство для восстановления внутренней опоры.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href={contacts.telegram} target="_blank" rel="noreferrer">
                Начать конфиденциальный диалог
              </a>
              <a className="button button--ghost" href="#requests">
                Узнать, с чем можно обратиться
              </a>
            </div>
            <ul className="fact-list" aria-label="Ключевые факты">
              {heroFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="hero-visual">
            <FramedImage image="hero" />
          </div>
        </section>

        <section className="section about-section" id="about">
          <FramedImage image="about" className="image-frame--soft" />
          <div className="about-copy">
            <SectionHeading
              eyebrow="Обо мне"
              title="Когда земля уходит из-под ног, важно не просто выстоять. Важно найти себя настоящего."
            />
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section" id="requests">
          <SectionHeading
            eyebrow="Направления работы"
            title="С какими запросами я работаю"
          />
          <div className="request-grid">
            {requestCards.map((card, index) => (
              <article className="content-card content-card--large" key={card.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{card.title}</h3>
                <ul className="request-points">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section trust-section">
          <SectionHeading eyebrow="Профессиональный подход" title="Почему выбирают меня?" />
          <div className="trust-grid">
            {trustCards.map((item) => (
              <article className="content-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section formats-section" id="formats">
          <div>
            <SectionHeading eyebrow="Как проходит работа" title="Формат подбирается после первого контакта" />
            <div className="format-list">
              {formats.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section video-section" aria-labelledby="video-title">
          <div className="video-placeholder">
            <span className="play-icon" aria-hidden="true" />
            <div>
              <p className="eyebrow">Видеоотзыв</p>
              <h2 id="video-title">Видеоотзыв пациента</h2>
              <p>Скоро здесь появится короткий видеоотзыв о результате работы. Сейчас блок подготовлен для будущей публикации.</p>
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <SectionHeading
            eyebrow="Отзывы"
            title="Отзывы готовятся к публикации"
            text="Мы размещаем отзывы только с разрешения пациентов и бережно относимся к приватности каждой истории."
          />
          <div className="review-grid" aria-label="Места для будущих отзывов">
            {[1, 2, 3].map((item) => (
              <article className="review-card" key={item}>
                <span>Отзыв {item}</span>
                <p>Будет опубликован после согласования текста и разрешения пациента.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section safety-section">
          <SectionHeading eyebrow="Конфиденциальность" title="Конфиденциальность и безопасное пространство" />
          <p className="large-copy">
            Работа проходит в атмосфере принятия, без осуждения и с соблюдением врачебной тайны и профессиональной этики. Обсуждаемые темы, личные обстоятельства и сам факт обращения рассматриваются как конфиденциальная информация в рамках действующих правил и закона.
          </p>
        </section>

        <section className="section steps-section">
          <SectionHeading eyebrow="Первая встреча" title="Как подготовиться" />
          <ol className="steps-list">
            {preparationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="section policy-section">
          <SectionHeading eyebrow="Организационные правила" title="Оплата, перенос и отмена" />
          <ul className="policy-list">
            {paymentRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="final-cta" id="contacts">
          <p className="eyebrow">Первый шаг</p>
          <h2>Сделайте первый шаг к решению проблемы уже сегодня</h2>
          <p>
            Это может быть короткое сообщение. Не нужно заранее идеально формулировать запрос - достаточно написать, что вы хотите записаться на первичную консультацию.
          </p>
          <ContactButtons />
          <div className="message-hint">
            <span>Подсказка первого сообщения</span>
            <p>{contacts.firstMessage}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="brand" href="#top">
            <span className="brand-mark">ЕУ</span>
            <span>{specialist.shortName}</span>
          </a>
          <p>{specialist.role}</p>
        </div>
        <ContactButtons compact />
      </footer>

      <a className="mobile-sticky-cta" href={contacts.telegram} target="_blank" rel="noreferrer">
        Написать Егине Левоновне
      </a>
    </div>
  );
}

export default App;
