const firstMessage =
  'Здравствуйте, Егине Левоновна! Я увидел(а) ваш сайт и хочу записаться на первичную консультацию. Мне нужна помощь в решении моей проблемы.';

const encodedMessage = encodeURIComponent(firstMessage);

export const contacts = {
  // TODO: replace with the real Telegram username or direct invite link.
  telegram: `https://t.me/TODO_YEGINE?text=${encodedMessage}`,
  // TODO: replace TODO_PHONE with the real WhatsApp phone in international format, digits only.
  whatsapp: `https://wa.me/TODO_PHONE?text=${encodedMessage}`,
  // TODO: replace with the real VK profile, page, or community link.
  vk: 'https://vk.com/TODO_YEGINE',
  firstMessage,
};
