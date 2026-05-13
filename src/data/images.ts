export type SiteImage = {
  src: string;
  alt: string;
  caption: string;
  frame: 'vertical' | 'horizontal' | 'square' | 'wide';
};

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const imagePath = (fileName: string) => asset(`images/${fileName}`);

export const images = {
  instructor: {
    src: imagePath('ChatGPT Image 12 мая 2026 г., 22_28_07.png'),
    alt: 'SUP для новичков с инструктором в Лазаревском',
    caption: 'SUP для новичков с инструктором',
    frame: 'vertical',
  },
  evening: {
    src: imagePath('ChatGPT Image 12 мая 2026 г., 22_39_13.png'),
    alt: 'Вечерняя прогулка на сапборде у моря',
    caption: 'Вечерняя прогулка на сапборде у моря',
    frame: 'vertical',
  },
  morning: {
    src: imagePath('ChatGPT Image 12 мая 2026 г., 22_44_35.png'),
    alt: 'Утренняя SUP-прогулка в Лазаревском',
    caption: 'Утренняя SUP-прогулка в Лазаревском',
    frame: 'vertical',
  },
  hero: {
    src: imagePath('ChatGPT Image 12 мая 2026 г., 23_33_48.png'),
    alt: 'SUP-доски на пляже Морской бриз у Чёрного моря',
    caption: 'SUP-доски у пляжа Морской бриз',
    frame: 'wide',
  },
  family: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 00_22_44.png'),
    alt: 'Семейная прогулка на сапбордах',
    caption: 'Семейная прогулка на сапбордах',
    frame: 'vertical',
  },
  groupFriends: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 00_32_54.png'),
    alt: 'Групповая сап-прогулка на море для друзей',
    caption: 'Групповая прогулка для друзей',
    frame: 'vertical',
  },
  familyLegacy: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 00_36_24.png'),
    alt: 'Поколение на волне — художественный образ семейной связи с морем',
    caption: 'Поколение на волне',
    frame: 'vertical',
  },
  familyPet: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 00_53_09.png'),
    alt: 'Семейная прогулка на сапбордах с ребёнком и питомцем',
    caption: 'Семейная прогулка с ребёнком и питомцем',
    frame: 'vertical',
  },
  map: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 01_06_57.png'),
    alt: 'Как нас найти — пляж Морской бриз в Лазаревском',
    caption: 'Как нас найти — пляж Морской бриз',
    frame: 'vertical',
  },
  logo: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 01_13_05.png'),
    alt: 'Логотип MY SUPSUN с орлом на SUP-доске',
    caption: 'Логотип MY SUPSUN',
    frame: 'square',
  },
  rental: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 01_31_54.png'),
    alt: 'Прокат SUP-досок в Лазаревском у пляжа Морской бриз',
    caption: 'Прокат SUP-досок в Лазаревском',
    frame: 'vertical',
  },
  romantic: {
    src: imagePath('ChatGPT Image 13 мая 2026 г., 01_39_57.png'),
    alt: 'Романтическая прогулка на сапборде у моря',
    caption: 'Романтическая прогулка на сапборде',
    frame: 'vertical',
  },
  groupReal: {
    src: imagePath('Без названия (1).png'),
    alt: 'Группа на SUP-досках у побережья Лазаревского',
    caption: 'Групповая прогулка у Лазаревского',
    frame: 'horizontal',
  },
  yoga: {
    src: imagePath('cards/card-yoga.jpg'),
    alt: 'Йога на SUP на Чёрном море',
    caption: 'Йога на SUP на Чёрном море',
    frame: 'square',
  },
} as const satisfies Record<string, SiteImage>;

export const serviceImages = {
  morning: images.morning,
  evening: images.evening,
  rental: images.rental,
  instructor: images.instructor,
  romantic: images.romantic,
  yoga: images.yoga,
} as const;

export const galleryImages = [
  images.instructor,
  images.evening,
  images.morning,
  images.hero,
  images.family,
  images.groupFriends,
  images.familyLegacy,
  images.familyPet,
  images.map,
  images.logo,
  images.rental,
  images.romantic,
  images.groupReal,
  images.yoga,
] as const;
