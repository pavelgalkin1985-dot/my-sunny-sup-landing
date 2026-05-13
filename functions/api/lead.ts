type Env = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  messenger?: unknown;
  service?: unknown;
  date?: unknown;
  time?: unknown;
  people?: unknown;
  comment?: unknown;
  website?: unknown;
};

const json = (body: { ok: boolean; message: string }, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const projectContacts =
  'основной телефон и Telegram: 8 (963) 692-83-78; MAX: 8 (999) 655-80-43; VK: https://vk.com/my_sup_sun_lazarevskoye';

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });

export const onRequestPost = async ({ request, env }: PagesContext) => {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ ok: false, message: 'Некорректная заявка.' }, 400);
  }

  if (asText(payload.website)) {
    return json({ ok: false, message: 'Не удалось отправить заявку.' }, 400);
  }

  const lead = {
    service: asText(payload.service),
    name: asText(payload.name),
    phone: asText(payload.phone),
    messenger: asText(payload.messenger) || 'Не указан',
    date: asText(payload.date) || 'Не указана',
    time: asText(payload.time) || 'Не указано',
    people: asText(payload.people),
    comment: asText(payload.comment) || 'Без комментария',
  };

  if (!lead.name || !lead.phone || !lead.service || !lead.people) {
    return json({ ok: false, message: 'Заполните имя, телефон, услугу и количество человек.' }, 400);
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, message: 'Не удалось отправить заявку.' }, 500);
  }

  const text = [
    '🌊 <b>Новая заявка: Мой солнечный SUP</b>',
    '',
    `<b>Услуга:</b> ${escapeHtml(lead.service)}`,
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `<b>Мессенджер:</b> ${escapeHtml(lead.messenger)}`,
    `<b>Дата:</b> ${escapeHtml(lead.date)}`,
    `<b>Время:</b> ${escapeHtml(lead.time)}`,
    `<b>Количество человек:</b> ${escapeHtml(lead.people)}`,
    `<b>Комментарий:</b> ${escapeHtml(lead.comment)}`,
    '',
    '<b>Источник:</b> сайт',
    `<b>Контакты проекта:</b> ${escapeHtml(projectContacts)}`,
  ].join('\n');

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    );
    const telegramData = (await telegramResponse.json()) as { ok?: boolean };

    if (!telegramResponse.ok || telegramData.ok !== true) {
      return json({ ok: false, message: 'Не удалось отправить заявку.' }, 502);
    }

    return json({ ok: true, message: 'Заявка отправлена.' });
  } catch {
    return json({ ok: false, message: 'Не удалось отправить заявку.' }, 502);
  }
};
