// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO QUEVI — MEDICINA ESTÉTICA
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'QUEVI Wellness Clinic',
  tagline: 'Tu nueva historia de vida de piel',
  description:
    'No analizamos datos, entendemos tu historia clínica para diseñar tu mejor versión con tecnología de precisión.',
  phone: '+34 900 000 000',
  email: 'info@quevi.com',
  address: 'Málaga, España',
  bookingUrl: '#booking',
}

export const NAV_LINKS = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Diagnóstico',  href: '#about' },
  { label: 'Tratamientos', href: '#services' },
  { label: 'Tecnología',   href: '#treatments' },
  { label: 'Testimonios',  href: '#testimonials' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contacto',     href: '#booking' },
]

export const HERO = {
  badge: 'QUEVI BIO-SCAN SKIN · Diagnóstico 360°',
  headline: 'Tu nueva historia\nde vida de piel',
  subheadline:
    'No analizamos datos, entendemos tu historia clínica para diseñar tu mejor versión. Medicina estética de precisión con tecnología diagnóstica única.',
  cta1: { label: 'Solicitar diagnóstico', href: '#booking' },
  cta2: { label: 'Ver tratamientos',      href: '#services' },
  stats: [
    { value: '360°',  label: 'Diagnóstico personalizado' },
    { value: '4',     label: 'Tecnologías de precisión' },
    { value: '100%',  label: 'Medicina individualizada' },
  ],
}

export const SERVICES = [
  {
    id: 'shield',
    icon: '🛡',
    title: 'SHIELD — Bio-Protección',
    description:
      'El seguro de vida de tu piel contra el daño ambiental. Prevención activa antes de que el daño sea visible.',
    href: '#treatments',
  },
  {
    id: 'repair',
    icon: '✦',
    title: 'REPAIR — Regeneración',
    description:
      'Restauramos la capacidad biológica de la piel para sanarse. Células madre, PRP y bioestimuladores de colágeno.',
    href: '#treatments',
  },
  {
    id: 'boost',
    icon: '◈',
    title: 'BOOST — Optimización',
    description:
      'Biohacking y máximo rendimiento celular. Exosomas, fotobiomodulación LED y optimización del sueño y energía vital.',
    href: '#treatments',
  },
  {
    id: 'reset',
    icon: '◉',
    title: 'RESET / SOUL — Equilibrio',
    description:
      'Armonía para una belleza consciente. Cortamos el cortisol, enemigo principal del colágeno, con rituales médico-estéticos.',
    href: '#treatments',
  },
]

export const ABOUT = {
  badge: 'QUEVI BIO-SCAN SKIN',
  headline: 'No analizamos datos,\nentendemos tu historia',
  description:
    'El diagnóstico más completo de medicina estética. Cruzamos tu historial clínico con tres tecnologías de precisión para prescribir una rutina médica única, diseñada exclusivamente para tu piel y tu salud interna.',
  features: [
    'Anamnesis y consulta médica personalizada',
    'Trilogía tecnológica: AURA (3D facial) + N-GENE (ADN) + OLIGOCHECK (minerales)',
    'Valoración del informe médico con juicio clínico experto',
    "Prescripción de cosmética Dall'O Skin con fórmula médica exclusiva",
  ],
  doctor: {
    name: 'Equipo Médico QUEVI',
    title: 'Medicina Estética Avanzada · Diagnóstico 360°',
    bio: 'Especialistas en medicina estética con diagnóstico de precisión. Formados en las últimas tecnologías de análisis dérmico genético y molecular.',
  },
}

export const STATS = [
  { value: 4,    suffix: '',   label: 'Tecnologías de diagnóstico' },
  { value: 360,  suffix: '°',  label: 'Diagnóstico personalizado' },
  { value: 7,    suffix: '+',  label: 'Terapias ProAging' },
  { value: 0,    suffix: '',   label: 'Protocolos genéricos' },
]

export const TREATMENTS = [
  {
    category: 'Terapias ProAging',
    items: [
      {
        name: 'Neuromoduladores',
        desc: 'Atenuación de arrugas dinámicas para una expresión serena. Efecto 3–4 meses, sesión cada 3–6 meses.',
      },
      {
        name: 'DallÒ LIPS',
        desc: 'Labios definidos con ácido hialurónico reticulado. Volumen natural, efecto glow inmediato. Durabilidad 6–12 meses.',
      },
      {
        name: 'Arquitectura Face',
        desc: 'Ácido hialurónico y bioestimuladores de colágeno para restaurar el contorno facial con naturalidad y precisión.',
      },
      {
        name: 'PRP Photoativa',
        desc: 'Concentrado plaquetario activado por luz para mejorar textura facial y densidad capilar. Regeneración desde adentro.',
      },
      {
        name: 'PDRN — Polinucleótidos',
        desc: 'Revitaliza desde el ADN. Derivados de salmón que actúan sobre inflamación, pigmentación y regeneración celular.',
      },
      {
        name: 'Peelings',
        desc: 'Fórmulas adaptadas a tu tipo de piel. Exfoliación profunda, luminosidad, suavidad y uniformidad cutánea.',
      },
      {
        name: 'SEFFILLER — Células Madre',
        desc: 'Tejido adiposo propio para auxiliar la producción de colágeno y vitalidad cutánea duradera. Mantenimiento cada 24 meses.',
      },
    ],
  },
  {
    category: 'Tecnologías High-Tech',
    items: [
      {
        name: 'Fototerapia LED',
        desc: 'Biohacking lumínico. Luz roja (660 nm) e infrarroja (850 nm) para estimular el metabolismo celular y autorregulación.',
      },
      {
        name: 'Ellegance — Infrarrojo Vibracional',
        desc: 'Calor infrarrojo con vibración hipertérmica para circulación, drenaje linfático y detox celular profundo.',
      },
      {
        name: 'Radiofrecuencia con Microagujas',
        desc: 'Energía térmica en dermis profunda. Textura uniforme, poros reducidos, tratamiento de cicatrices de acné.',
      },
      {
        name: 'Láser CO₂',
        desc: 'Pulsos de luz infrarroja de alta energía que estimulan colágeno y tratan cicatrices, manchas y queratosis.',
      },
      {
        name: 'Fotorejuvenecimiento IPL',
        desc: 'Piel uniforme. Atenúa manchas solares y microvasos desde capas superficiales hasta profundas.',
      },
    ],
  },
]

export const TESTIMONIALS = [
  {
    name: 'María G.',
    role: 'Paciente QUEVI',
    rating: 5,
    text: 'El diagnóstico BIO-SCAN fue revelador. Por primera vez un médico entendió el origen real de mis problemas de piel. Los resultados hablan solos.',
  },
  {
    name: 'Carlos M.',
    role: 'Paciente QUEVI',
    rating: 5,
    text: 'Vine escéptico y salí convencido. El cruce de mi genética N-Gene con el análisis AURA fue algo que nunca había vivido. Totalmente personalizado.',
  },
  {
    name: 'Ana L.',
    role: 'Paciente QUEVI',
    rating: 5,
    text: 'La rutina de cosmética prescrita por el médico transformó mi piel en 6 semanas. No es una recomendación comercial, es una fórmula médica real.',
  },
  {
    name: 'Laura S.',
    role: 'Paciente QUEVI',
    rating: 5,
    text: 'Desde la sesión LED hasta el protocolo REPAIR, todo tiene un fundamento clínico. Se nota que es medicina de verdad, no solo estética.',
  },
]

export const BLOG_POSTS = [
  {
    date: 'Abr 2025',
    category: 'Diagnóstico',
    title: '¿Qué revela el análisis N-GENE sobre tu piel?',
    excerpt:
      'Tu ADN determina predisposiciones que ningún espejo puede ver. Descubrí cómo el análisis genético cambia la medicina estética.',
    href: '#blog',
  },
  {
    date: 'Mar 2025',
    category: 'Biohacking',
    title: 'Fototerapia LED: ciencia detrás de la luz que rejuvenece',
    excerpt:
      'La luz roja e infrarroja no es magia. Es fotobiología celular. Te explicamos el mecanismo real detrás de los resultados.',
    href: '#blog',
  },
  {
    date: 'Feb 2025',
    category: 'Cortisol & Piel',
    title: 'Por qué el estrés destruye tu colágeno más rápido que el sol',
    excerpt:
      'El cortisol es el enemigo silencioso de tu piel. Así actúa nuestro protocolo RESET para cortarlo desde la raíz.',
    href: '#blog',
  },
  {
    date: 'Ene 2025',
    category: 'ProAging',
    title: 'SEFFILLER: células madre de tu propio cuerpo para tu piel',
    excerpt:
      'Usamos tu tejido adiposo para estimular colágeno. Sin materiales externos. La regeneración más natural y duradera.',
    href: '#blog',
  },
]

export const FAQS = [
  {
    question: '¿Qué es el diagnóstico BIO-SCAN SKIN 360°?',
    answer:
      'Es nuestro proceso diagnóstico exclusivo en 4 fases: anamnesis médica, análisis tecnológico con AURA + N-GENE + OLIGOCHECK, valoración del informe por un médico especialista y prescripción de cosmética médica personalizada.',
  },
  {
    question: '¿Qué diferencia a QUEVI de una clínica estética convencional?',
    answer:
      'Cada protocolo en QUEVI parte de un diagnóstico clínico real, no de una consulta estándar. Cruzamos tu historial, tu genética y tu bioquímica antes de tocar tu piel. El resultado es una prescripción médica, no una recomendación comercial.',
  },
  {
    question: '¿Cuántas sesiones necesito?',
    answer:
      'Depende del protocolo y de tu diagnóstico. Los neuromoduladores y rellenos pueden ser sesión única. Tecnologías como LED o Ellegance pueden requerir entre 1 y 15 sesiones. El médico lo define tras el BIO-SCAN.',
  },
  {
    question: '¿Son dolorosos los procedimientos?',
    answer:
      'La mayoría son muy bien tolerados. Aplicamos anestesia tópica o infiltrativa cuando es necesario. Tecnologías como la fototerapia LED o el infrarrojo vibracional son completamente indoloras.',
  },
  {
    question: '¿Qué es el protocolo RESET/SOUL?',
    answer:
      'Es nuestra aproximación al bienestar mental como parte del cuidado de la piel. El cortisol crónico degrada el colágeno. RESET combina masajes y aromaterapia clínica, meditación guiada y mindfulness estético para reducir el cortisol desde adentro.',
  },
  {
    question: '¿Puedo empezar sin haber hecho el diagnóstico?',
    answer:
      'Recomendamos siempre comenzar con el BIO-SCAN SKIN para garantizar resultados óptimos. Sin embargo, podés consultar por tratamientos específicos. En todos los casos, la primera consulta médica es el primer paso.',
  },
]

export const FOOTER_LINKS = {
  servicios: [
    { label: 'SHIELD — Bio-Protección',  href: '#services' },
    { label: 'REPAIR — Regeneración',    href: '#services' },
    { label: 'BOOST — Optimización',     href: '#services' },
    { label: 'RESET / SOUL',             href: '#services' },
  ],
  empresa: [
    { label: 'Diagnóstico BIO-SCAN', href: '#about' },
    { label: 'Terapias ProAging',    href: '#treatments' },
    { label: 'Tecnología High-Tech', href: '#treatments' },
    { label: 'Contacto',             href: '#booking' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Aviso Legal',            href: '#' },
    { label: 'Cookies',                href: '#' },
  ],
}
