export interface ServiceItem {
  title: string;
  description: string;
}

export interface GalleryItem {
  imageSrc?: string;
  beforeSrc?: string;
  afterSrc?: string;
  caption: string;
}

export interface ClientConfig {
  companyName: string;
  niche: string;

  colors: {
    primary: string;
    accent: string;
    dark: string;
    light: string;
    bg: string;
  };

  logoSrc?: string;

  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    photoSrc?: string;
    baseImage?: string;
    wrapImage?: string;
    blurData?: string;
  };

  services: ServiceItem[];
  gallery: GalleryItem[];
  advantages: string[];

  booking: {
    heading: string;
    subheading: string;
    note: string;
  };

  contacts: {
    phone: string;
    city: string;
    telegram?: string;
    whatsapp?: string;
    instagram?: string;
    vk?: string;
  };

  seo: {
    title: string;
    description: string;
  };
}

export const clientConfig: ClientConfig = {
  companyName: "Detail Studio",
  niche: "детейлинг",

  colors: {
    primary: "#0f1720",
    accent: "#a9b7c2",
    dark: "#080b0f",
    light: "#f5f3ee",
    bg: "#0a0d11",
  },

  logoSrc: undefined,

  hero: {
    title: "Измените цвет автомобиля — без покраски",
    subtitle:
      "Профессиональный детейлинг в Челябинске: полировка кузова, керамическое покрытие, оклейка плёнкой и химчистка салона. Более 200 автомобилей в работе и гарантия на все виды покрытий.",
    ctaText: "Оставить заявку на оклейку",
    photoSrc: undefined,
    baseImage: "/car/base.webp",
    wrapImage: "/car/wrap.webp",
    blurData:
      "data:image/webp;base64,UklGRlIBAABXRUJQVlA4WAoAAAAQAAAAEwAACQAAQUxQSJsAAAABgFpt2/Lm+SCK0fEMsTnZIS4DpOBpgMoqxglyOgQPgI6ryDF98D7lrhARiR8W0MVqs14GtAKgrAEKM0fX908Pt3tDAKAB6KFj/l7LaYVkf3BE+hhFYgxvXIFqn5AMkaSISHTh2GKDrz6ICEWcj2TYM/aSIXjnXIhC8uqck8DA8ff6WCdT7qYAVW/1RqcXZnfvpvC/rsAkjFJWAQBWUDggkAAAAPADAJ0BKhQACgA+0VSjS6gkoyGwCAEAGglpAAPh4dlzlGOg7ALU0AAA/lqnhUz3eSucNJ6VkIGjdvFgAj1C3SmUaPTaIuvxNdkzzBrMphZ8t1m9ng6fdzYX1QYqP4gtqsOCj2rJ+/d72sCjTTb6wIk9ikzifis25/6Ocfg6/5/xMfYuc7z4Xrf/KFPj2wEAAA==",
  },

  services: [
    {
      title: "Комплексная полировка",
      description: "Удаляем царапины и голограммы, возвращаем глубину цвета.",
    },
    {
      title: "Керамическое покрытие",
      description: "Защита кузова на 2-5 лет, гидрофобный эффект и блеск.",
    },
    {
      title: "Химчистка салона",
      description: "Полная чистка обивки, пластика и кожи как с завода.",
    },
    {
      title: "Оклейка антигравийной плёнкой",
      description: "Защита кузова от сколов и мелких повреждений.",
    },
  ],

  gallery: [
    { caption: "До / После — капот" },
    {
      caption: "До / После — кузов",
      beforeSrc: "/car/base.webp",
      afterSrc: "/car/wrap.webp",
    },
    { caption: "Салон после химчистки" },
    { caption: "Керамика в работе" },
    { caption: "Полировка фар" },
    { caption: "Финальная подача" },
  ],

  advantages: [
    "Более 200 автомобилей в работе",
    "Гарантия на все виды покрытий",
    "Работаем на профессиональной химии",
    "Забор и доставка автомобиля",
  ],

  booking: {
    heading: "Запишитесь на бесплатную диагностику",
    subheading: "Оценим состояние кузова и подберём подходящий пакет услуг",
    note: "Заявки будут падать вам прямо в Telegram",
  },

  contacts: {
    phone: "+7 (900) 000-00-00",
    city: "Челябинск",
    telegram: "https://t.me/",
    whatsapp: "https://wa.me/",
    instagram: undefined,
    vk: "https://vk.com/",
  },

  seo: {
    title: "Detail Studio — детейлинг премиум-класса",
    description:
      "Полировка, керамическое покрытие и химчистка салона. Записывайтесь на диагностику.",
  },
};
