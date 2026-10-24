// About page copy for EN/DE/ES (template: components/pages/AboutPage.astro). Every figure and
// statement comes from the UA/RU About page (5,000+ projects, 50,000+ m², 10+ years, since 2014,
// Kyiv · Odesa · Lviv, projects in Ukraine and Europe). No career form: vacancies are in Ukraine.
import type { AboutContent } from '../pages/about';
import type { IntlLocale } from '../../../i18n/intl-routes';

const timelineImages = ['2014', '2016', '2018', '2020', '2022', '2024', '2026'].map((year) => `/images/about/history/${year}-400.webp`);
const timeline = (texts: string[]) => texts.map((text, index) => ({ year: ['2014', '2016', '2018', '2020', '2022', '2024', '2026'][index], text, image: timelineImages[index] }));
const teamImages = ['/images/team/Олександр-450.webp', '/images/team/Мстислав-450.webp', '/images/team/Микола-450.webp', '/images/team/yuliia-content-450.webp', '/images/team/Анастасія-450.webp', '/images/team/Євген-450.webp', '/images/team/Марія Акаунт-менеджер-450.webp', '/images/team/Юлія - організатор-450.webp', '/images/team/Мілана-450.webp', '/images/team/Артур-450.webp', '/images/team/Петя-450.webp', '/images/team/Максим-450.webp'];
const teamNames = { en: ['Oleksandr', 'Mstyslav', 'Mykola', 'Yuliia', 'Anastasiia', 'Yevhen', 'Mariia', 'Yuliia', 'Milana', 'Artur', 'Petro', 'Maksym'], de: ['Oleksandr', 'Mstyslaw', 'Mykola', 'Julija', 'Anastasija', 'Jewhen', 'Marija', 'Julija', 'Milana', 'Artur', 'Petro', 'Maksym'], es: ['Oleksandr', 'Mstyslav', 'Mykola', 'Yuliia', 'Anastasiia', 'Yevhen', 'Mariia', 'Yuliia', 'Milana', 'Artur', 'Petro', 'Maksym'] };
const team = (locale: IntlLocale, roles: string[], linkLabel: string) => roles.map((role, index) => ({
  name: teamNames[locale][index],
  role,
  img: teamImages[index],
  ...(index === 1 ? { link: { href: `https://mstyslavhrabko.com/${locale === 'en' ? '' : `${locale}/`}`, label: linkLabel } } : {})
}));

export const intlAboutContent: Record<IntlLocale, AboutContent> = {
  en: {
    meta: {
      title: 'About Space Glass — Team, Experience, 5,000+ Projects',
      description: 'Space Glass designs, manufactures and installs glass and aluminium structures: in-house production, an experienced team, 5,000+ completed projects.'
    },
    hero: {
      eyebrow: 'SPACE GLASS · ABOUT US',
      h1: ['Glass structures', 'and aluminium systems', 'by Space Glass'],
      subtitle: 'We design, manufacture and install glass partitions, loft partitions, glass railings, shower enclosures, glass doors, facade and frameless glazing, aluminium windows and doors, pergolas and sun protection systems. We work across Ukraine and deliver projects in Europe.',
      imageAlt: 'The Space Glass team at a completed project with a glass railing'
    },
    statsAriaLabel: 'Space Glass in figures',
    stats: [
      ['5,000+', 'completed projects for homes and businesses in Ukraine and Europe'],
      ['50,000+', 'm² of glazing in residential and commercial buildings of varying complexity'],
      ['10+', 'years of hands-on experience with glass and aluminium structures'],
      ['3+', 'Kyiv · Odesa · Lviv — projects of every scale across Ukraine']
    ],
    directions: {
      eyebrow: 'WHAT WE DO',
      title: 'What we design, manufacture and install',
      intro: 'Space Glass designs, manufactures and installs glass partitions, loft partitions, glass doors, shower enclosures, glass railings and canopies, frameless and facade glazing, aluminium windows and doors, pergolas, bioclimatic pergolas and sun protection systems for residential, commercial and architectural projects.',
      navAriaLabel: 'Space Glass product areas',
      items: []
    },
    story: {
      eyebrow: 'Our story',
      title: 'Experience that shapes the future',
      paragraphs: [
        'Space Glass grew out of hands-on experience with glass and hardware. Since 2014 we have built up our technical expertise, formed our team, set up our own processes and moved step by step from individual products to complete glass and aluminium solutions.',
        'Today Space Glass works on private, commercial and architectural projects in Ukraine and Europe. We design, manufacture and install glass and aluminium structures — from partitions, doors, showers and railings to facade glazing, aluminium windows, pergolas and complete architectural systems — and stay with every project through to handover.'
      ],
      timelineAriaLabel: 'How Space Glass has grown'
    },
    timeline: timeline([
      'Our professional journey in glass begins',
      'New product areas and a growing team',
      'First large private and commercial projects',
      'Stronger production and installation processes',
      'A new stage of growth and large-scale projects',
      'Wider geography and complete solutions',
      'Space Glass develops in Europe'
    ]),
    values: {
      eyebrow: 'Our values',
      title: 'We build trust as precisely as we build structures',
      items: [
        ['Quality', 'Proven materials, certified glass and reliable hardware.'],
        ['Professionalism', 'Experience, technical precision and attention to detail at every stage.'],
        ['Reliability', 'We plan the schedule, record every decision and take responsibility for the result.'],
        ['Individual approach', 'Every project is adapted to its architecture, dimensions and purpose.']
      ]
    },
    team: {
      eyebrow: 'Our team',
      title: 'The people who shape your space',
      intro: 'From the first consultation to logistics and installation, a real person is responsible for every stage.',
      careerLinkLabel: '',
      members: team('en', ['Co-owner, co-founder', 'Co-owner, co-founder', 'Head of sales', 'Content creator', 'SMM specialist', 'Installation technician', 'Account manager', 'Coordinator', 'Project manager', 'Installation technician', 'Installation assistant', 'Warehouse and logistics'], 'Personal website')
    },
    trust: {
      eyebrow: 'Trusted by',
      titleHtml: 'Companies and projects<br />we have worked with',
      linkLabel: 'View our projects'
    },
    systems: {
      eyebrow: 'Systems and brands',
      title: 'We work with proven systems',
      linkLabel: 'Products and services →'
    },
    finalCta: {
      eyebrow: 'Your project',
      title: 'Planning a demanding glass project?',
      text: 'Send us photos, dimensions or drawings — we will select the right structure and prepare a preliminary quote.',
      buttonLabel: 'Discuss your project →'
    }
  },
  de: {
    meta: {
      title: 'Über Space Glass — Team, Erfahrung, 5.000+ Projekte',
      description: 'Space Glass: Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Erfahrenes Team, über 5.000 umgesetzte Projekte, Planung bis Montage.'
    },
    hero: {
      eyebrow: 'SPACE GLASS · ÜBER UNS',
      h1: ['Glaskonstruktionen', 'und Aluminiumsysteme', 'von Space Glass'],
      subtitle: 'Space Glass: Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Wir planen, fertigen und montieren Glastrennwände, Loft-Trennwände, Glasgeländer, Glasduschen, Glastüren, Fassaden- und rahmenlose Verglasungen, Aluminiumfenster und -türen, Pergolen und Sonnenschutzsysteme. Das Unternehmen hat seinen Sitz in der Ukraine.',
      imageAlt: 'Das Team von Space Glass an einem fertigen Objekt mit Glasgeländer'
    },
    statsAriaLabel: 'Space Glass in Zahlen',
    stats: [
      ['5.000+', 'umgesetzte Projekte für Wohnen und Gewerbe in der Ukraine und in Europa'],
      ['50.000+', 'm² Verglasung in Wohn- und Gewerbebauten unterschiedlicher Komplexität'],
      ['10+', 'Jahre Praxiserfahrung mit Glas- und Aluminiumkonstruktionen'],
      ['3', 'Standorte in der Ukraine: Kyjiw · Odesa · Lwiw']
    ],
    directions: {
      eyebrow: 'UNSERE BEREICHE',
      title: 'Was wir planen, fertigen und montieren',
      intro: 'Space Glass plant, fertigt und montiert Glastrennwände, Loft-Trennwände, Glastüren, Glasduschen, Glasgeländer und Vordächer, rahmenlose und Fassadenverglasungen, Aluminiumfenster und -türen, Pergolen, bioklimatische Pergolen und Sonnenschutzsysteme für Wohn-, Gewerbe- und Architekturprojekte.',
      navAriaLabel: 'Produktbereiche von Space Glass',
      items: []
    },
    story: {
      eyebrow: 'Unsere Geschichte',
      title: 'Erfahrung, die Zukunft gestaltet',
      paragraphs: [
        'Space Glass ist aus praktischer Erfahrung mit Glas und Beschlägen entstanden. Seit 2014 haben wir unser technisches Know-how ausgebaut, unser Team aufgebaut, eigene Abläufe eingeführt und uns Schritt für Schritt von Einzelprodukten zu kompletten Glas- und Aluminiumlösungen entwickelt.',
        'Heute arbeitet Space Glass an privaten, gewerblichen und architektonischen Projekten — mit Sitz in der Ukraine und Projekten in Europa. Wir planen, fertigen und montieren Glas- und Aluminiumkonstruktionen — von Trennwänden, Türen, Duschen und Geländern bis zu Fassadenverglasung, Aluminiumfenstern, Pergolen und kompletten Architektursystemen — und begleiten jedes Projekt bis zur Übergabe.'
      ],
      timelineAriaLabel: 'Die Entwicklung von Space Glass'
    },
    timeline: timeline([
      'Beginn des beruflichen Wegs mit Glas',
      'Neue Bereiche und ein wachsendes Team',
      'Erste große Privat- und Gewerbeprojekte',
      'Stärkere Fertigungs- und Montageprozesse',
      'Neue Wachstumsphase und Großprojekte',
      'Größerer Wirkungskreis und Komplettlösungen',
      'Space Glass entwickelt sich in Europa'
    ]),
    values: {
      eyebrow: 'Unsere Werte',
      title: 'Vertrauen bauen wir so präzise wie Konstruktionen',
      items: [
        ['Qualität', 'Bewährte Materialien, zertifiziertes Glas und zuverlässige Beschläge.'],
        ['Professionalität', 'Erfahrung, technische Präzision und Sorgfalt in jeder Phase.'],
        ['Verlässlichkeit', 'Wir planen Termine, dokumentieren Entscheidungen und stehen für das Ergebnis ein.'],
        ['Individuelle Lösungen', 'Jedes Projekt wird an Architektur, Maße und Aufgabe angepasst.']
      ]
    },
    team: {
      eyebrow: 'Unser Team',
      title: 'Die Menschen hinter Ihrem Raum',
      intro: 'Von der ersten Beratung bis zu Logistik und Montage steht hinter jeder Phase eine konkrete Person.',
      careerLinkLabel: '',
      members: team('de', ['Mitinhaber, Mitgründer', 'Mitinhaber, Mitgründer', 'Vertriebsleitung', 'Content-Erstellung', 'Social Media', 'Montage', 'Kundenbetreuung', 'Organisation', 'Projektmanagement', 'Montage', 'Montagehilfe', 'Lager und Logistik'], 'Persönliche Website')
    },
    trust: {
      eyebrow: 'Referenzen',
      titleHtml: 'Unternehmen und Projekte,<br />mit denen wir gearbeitet haben',
      linkLabel: 'Unsere Projekte ansehen'
    },
    systems: {
      eyebrow: 'Systeme und Marken',
      title: 'Wir arbeiten mit bewährten Systemen',
      linkLabel: 'Produkte und Leistungen →'
    },
    finalCta: {
      eyebrow: 'Ihr Projekt',
      title: 'Sie planen ein anspruchsvolles Glasprojekt?',
      text: 'Senden Sie uns Fotos, Maße oder Zeichnungen — wir wählen die passende Konstruktion und erstellen eine unverbindliche Kostenschätzung.',
      buttonLabel: 'Projekt besprechen →'
    }
  },
  es: {
    meta: {
      title: 'Sobre Space Glass — equipo, experiencia y 5000+ proyectos',
      description: 'Space Glass diseña, fabrica e instala estructuras de vidrio y aluminio: fabricación propia, un equipo con experiencia y más de 5000 proyectos realizados.'
    },
    hero: {
      eyebrow: 'SPACE GLASS · SOBRE NOSOTROS',
      h1: ['Estructuras de vidrio', 'y sistemas de aluminio', 'de Space Glass'],
      subtitle: 'Diseñamos, fabricamos e instalamos tabiques de vidrio, tabiques de estilo loft, barandillas de vidrio, mamparas de ducha, puertas de vidrio, fachadas y cortinas de cristal, ventanas y puertas de aluminio, pérgolas y sistemas de protección solar. Trabajamos en toda Ucrania y realizamos proyectos en Europa.',
      imageAlt: 'El equipo de Space Glass en un proyecto terminado con barandilla de vidrio'
    },
    statsAriaLabel: 'Space Glass en cifras',
    stats: [
      ['5000+', 'proyectos realizados para viviendas y empresas en Ucrania y Europa'],
      ['50 000+', 'm² de acristalamiento en edificios residenciales y comerciales de distinta complejidad'],
      ['10+', 'años de experiencia práctica con estructuras de vidrio y aluminio'],
      ['3+', 'Kyiv · Odesa · Lviv — proyectos de todo tipo en toda Ucrania']
    ],
    directions: {
      eyebrow: 'QUÉ HACEMOS',
      title: 'Lo que diseñamos, fabricamos e instalamos',
      intro: 'Space Glass diseña, fabrica e instala tabiques de vidrio, tabiques loft, puertas de vidrio, mamparas de ducha, barandillas y marquesinas de vidrio, cortinas de cristal y fachadas acristaladas, ventanas y puertas de aluminio, pérgolas, pérgolas bioclimáticas y sistemas de protección solar para proyectos residenciales, comerciales y de arquitectura.',
      navAriaLabel: 'Áreas de producto de Space Glass',
      items: []
    },
    story: {
      eyebrow: 'Nuestra historia',
      title: 'Experiencia que construye el futuro',
      paragraphs: [
        'Space Glass nació de la experiencia práctica con el vidrio y los herrajes. Desde 2014 hemos desarrollado nuestro conocimiento técnico, formado el equipo, creado procesos propios y pasado poco a poco de productos sueltos a soluciones completas de vidrio y aluminio.',
        'Hoy Space Glass trabaja en proyectos privados, comerciales y de arquitectura en Ucrania y Europa. Diseñamos, fabricamos e instalamos estructuras de vidrio y aluminio —desde tabiques, puertas, duchas y barandillas hasta fachadas, ventanas de aluminio, pérgolas y sistemas arquitectónicos completos— y acompañamos cada proyecto hasta la entrega.'
      ],
      timelineAriaLabel: 'La evolución de Space Glass'
    },
    timeline: timeline([
      'Inicio de nuestra trayectoria profesional en el vidrio',
      'Nuevas áreas de trabajo y un equipo que crece',
      'Primeros grandes proyectos privados y comerciales',
      'Procesos de fabricación e instalación más sólidos',
      'Una nueva etapa de crecimiento y proyectos de gran escala',
      'Más alcance geográfico y soluciones integrales',
      'Space Glass crece en Europa'
    ]),
    values: {
      eyebrow: 'Nuestros valores',
      title: 'Construimos la confianza con la misma precisión que las estructuras',
      items: [
        ['Calidad', 'Materiales probados, vidrio certificado y herrajes fiables.'],
        ['Profesionalidad', 'Experiencia, precisión técnica y control del detalle en cada fase.'],
        ['Fiabilidad', 'Planificamos los plazos, dejamos constancia de cada decisión y respondemos del resultado.'],
        ['Enfoque individual', 'Adaptamos cada proyecto a su arquitectura, sus medidas y su uso.']
      ]
    },
    team: {
      eyebrow: 'Nuestro equipo',
      title: 'Las personas que dan forma a su espacio',
      intro: 'Desde la primera consulta hasta la logística y la instalación, detrás de cada fase hay una persona concreta.',
      careerLinkLabel: '',
      members: team('es', ['Copropietario, cofundador', 'Copropietario, cofundador', 'Dirección comercial', 'Creación de contenidos', 'Redes sociales', 'Instalación', 'Gestión de cuentas', 'Coordinación', 'Gestión de proyectos', 'Instalación', 'Ayudante de instalación', 'Almacén y logística'], 'Web personal')
    },
    trust: {
      eyebrow: 'Confían en nosotros',
      titleHtml: 'Empresas y proyectos<br />con los que hemos trabajado',
      linkLabel: 'Ver nuestros proyectos'
    },
    systems: {
      eyebrow: 'Sistemas y marcas',
      title: 'Trabajamos con sistemas de eficacia probada',
      linkLabel: 'Productos y servicios →'
    },
    finalCta: {
      eyebrow: 'Su proyecto',
      title: '¿Prepara un proyecto exigente en vidrio?',
      text: 'Envíenos fotos, medidas o planos: elegiremos la estructura adecuada y le prepararemos un presupuesto orientativo.',
      buttonLabel: 'Hablemos de su proyecto →'
    }
  }
};
