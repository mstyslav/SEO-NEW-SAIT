// Homepage copy for /en/, /de/ and /es/ (same template as UA/RU: components/pages/HomePage.astro).
// Facts only from the UA/RU homepage and the site: in-house production in Ukraine, installation teams
// in Kyiv, Odesa and Lviv, delivery of selected products and structures to European countries,
// warranty 5 / 2 / 1 years. Category icons are added in ../pages/home.ts (same as UA).
import type { HomeContent } from '../pages/home';
import type { IntlLocale } from '../../../i18n/intl-routes';

export type IntlHomeContent = Omit<HomeContent, 'categories'> & { categories: [string, string, string][] };

const solutionImages: Array<[string, string, number, number]> = [
  ['/dushovi-kabiny/', '/images/catalog/dushovi-kabiny/dushovi-kabiny-480.webp', 480, 360],
  ['/sklyani-perehorodky/', '/images/catalog/sklyani-perehorodky/hero-hub-480.webp', 480, 343],
  ['/bezramne-sklinnya/', '/images/catalog/bezramne/cat-sklyani-rozsuvni-systemy-480.webp', 960, 1280],
  ['/sklyani-ohorozhi/', '/images/catalog/sklyani-ohorozhi/hero-hub-480.webp', 480, 853],
  ['/sklyani-kozyrky/', '/images/catalog/sklyani-kozyrky/hero-hub-480.webp', 480, 343],
  ['/sklyani-dveri/', '/images/catalog/sklyani-dveri/hero5-hub-480.webp', 480, 640],
  ['/alyuminiyevi-konstrukcziyi/zymovi-sady/', '/images/catalog/profile-systems/cat-alu-zymovi-sady-480.webp', 480, 480],
  ['/dzerkala/', '/images/catalog/dzerkala/sg-moon-480.webp', 480, 480],
  ['/poslugy/sklyani-fasady/', '/images/catalog/profile-systems/cat-fas2-hub-480.webp', 480, 480],
  ['/alyuminiyevi-konstrukcziyi/', '/images/catalog/profile-systems/cat-alu-rozsuvni-480.webp', 480, 480]
];
const solutions = (texts: [string, string][]) => texts.map(([title, text], index) => {
  const [href, image, width, height] = solutionImages[index];
  return [title, text, href, image, width, height] as [string, string, string, string, number, number];
});

export const intlHomeContent: Record<IntlLocale, IntlHomeContent> = {
  en: {
    meta: {
      title: 'Space Glass — Custom Glass and Aluminium Structures',
      description: 'Glass partitions, shower enclosures, doors, railings, frameless and facade glazing made to measure. In-house production in Ukraine, delivery to Europe.'
    },
    hero: {
      eyebrow: 'Premium glass structures',
      h1Line1: 'Glass structures',
      h1Line2: 'for homes and businesses',
      lead: 'Made-to-measure glass and aluminium structures: frameless and loft partitions, shower enclosures, railings, doors, windows, facade and frameless glazing, winter gardens and canopies. We design, manufacture and install — with our own production in Ukraine and selected products delivered to Europe.',
      ctaPrimary: 'Get a quote',
      ctaSecondary: 'Explore our products',
      imageAlt: 'Glass partition by Space Glass'
    },
    categories: [
      ['Glass shower enclosures', 'Walk-in screens, corner, niche, sliding and bifold showers, shower doors and bath screens — made to the exact size of your bathroom.', '/dushovi-kabiny/'],
      ['Glass partitions', 'Loft, frameless, sliding, telescopic and folding partitions with or without doors. Divide homes and offices without losing daylight.', '/sklyani-perehorodky/'],
      ['Glass doors', 'Hinged, sliding and pivot glass doors, frameless or in slim aluminium frames, for homes, offices and commercial spaces.', '/sklyani-dveri/'],
      ['Glass railings', 'Railings for stairs, balconies, terraces and pools: frameless systems in a base channel or post-mounted railings with laminated safety glass.', '/sklyani-ohorozhi/'],
      ['Custom mirrors', 'LED, framed and wall mirrors and mirror panels made to measure for bathrooms, beauty salons, gyms and hotels.', '/dzerkala/'],
      ['Glass facades', 'Stick and structural glazing, shopfronts and glass entrances for private and commercial buildings — from design to installation.', '/poslugy/sklyani-fasady/'],
      ['Glass canopies', 'Entrance canopies for houses, offices and shops: cantilevered, with tension rods, on brackets or in a frame. German-engineered systems.', '/sklyani-kozyrky/'],
      ['Frameless glazing', 'Folding, sliding and guillotine glass systems for terraces, balconies and gazebos. The panels open fully and park against the wall.', '/bezramne-sklinnya/'],
      ['Aluminium windows and doors', 'Thermally broken aluminium windows, doors and lift-and-slide systems, office and facade glazing, pergolas and insect screens.', '/alyuminiyevi-konstrukcziyi/'],
      ['Winter gardens', 'Glazed aluminium extensions and terraces with glass roofs and sliding doors — heated for all-year use or seasonal.', '/alyuminiyevi-konstrukcziyi/zymovi-sady/'],
      ['Commercial glazing', 'Glass solutions for hotels, restaurants, offices, shops, beauty salons, clinics and residential developments.', '/dlya-biznesu/']
    ],
    categoriesAllLink: 'View all products and services →',
    products: {
      title: 'Popular solutions',
      controlsAriaLabel: 'Popular solutions controls',
      prevLabel: 'Previous solutions',
      nextLabel: 'Next solutions',
      viewLabel: 'View solution →',
      allLink: 'View all glass solutions →'
    },
    popularSolutions: solutions([
      ['Glass shower enclosures', 'Walk-in, corner, sliding and fully custom glass showers.'],
      ['Glass partitions', 'Frameless and framed glass partitions for apartments, offices and commercial spaces.'],
      ['Frameless glazing', 'Sliding and folding frameless glass for terraces and large openings.'],
      ['Glass railings', 'Frameless and post-mounted glass railings for stairs, balconies and terraces.'],
      ['Glass canopies', 'Entrance canopies — cantilevered, with tension rods or in a frame.'],
      ['Glass doors', 'Hinged, sliding and pivot glass doors for homes and commercial interiors.'],
      ['Winter gardens', 'Glazed terraces and aluminium winter gardens for year-round use.'],
      ['Custom mirrors', 'Mirrors made to size for bathrooms, homes and commercial interiors.'],
      ['Glass facades', 'Facade glazing for private and commercial buildings with aluminium systems.'],
      ['Aluminium windows and doors', 'Aluminium windows, doors and sliding systems for homes and businesses.']
    ]),
    projects: {
      title: 'Our projects',
      intro: 'Completed solutions for homes, offices, restaurants, hotels and beauty salons.',
      controlsAriaLabel: 'Project carousel controls',
      prevLabel: 'Previous projects',
      nextLabel: 'Next projects',
      carouselAriaLabel: 'Completed Space Glass projects',
      viewProjectPrefix: 'View project:',
      allLink: 'View all projects →'
    },
    finalBenefits: [
      ['Made to measure', 'Designed for your project and dimensions', '◇'],
      ['Quality materials', 'Toughened safety glass and premium hardware', '▱'],
      ['Professional installation', 'Experienced installation crews', '⚒'],
      ['Warranty and service', 'Support after installation', '◇']
    ],
    faq: {
      title: 'Frequently asked questions',
      intro: 'Answers about quotes, site surveys, manufacturing, delivery, installation, warranty and service.',
      items: [
        ['How do I get a preliminary quote?', 'Send us photos, approximate dimensions or a drawing. We clarify the details and prepare a preliminary estimate.'],
        ['Where do you install?', 'Our installation teams work in Kyiv, Lviv and Odesa and the surrounding regions. Other locations are agreed individually for each project.'],
        ['Do you deliver to other European countries?', 'Yes, selected products and structures can be delivered to European countries. Delivery and installation abroad are agreed individually for each project.'],
        ['Do you work on commercial projects?', 'Yes, we deliver projects for offices, shops, restaurants, hotels and clinics.'],
        ['Can I order a structure to custom dimensions?', 'Yes, most structures are made individually after a technical check of the site.'],
        ['Do you carry out site surveys?', 'Yes, a professional site survey is available in the cities where we install.'],
        ['How long does manufacturing take?', 'It depends on the type of structure, the materials, the complexity and the production schedule. We confirm the lead time once the drawing is approved.'],
        ['Do you give a warranty?', 'Yes: 5 years on the glass, 2 years on the hardware and 1 year on the installation.'],
        ['Can I order manufacturing only, without installation?', 'Yes, for some products and structures we offer manufacturing with delivery.'],
        ['Do you prepare technical drawings?', 'Yes, for complex items we prepare drawings and agree them with you before production.'],
        ['What glass do you use?', 'Toughened glass, laminated safety glass, insulating glass units and special glass types, depending on the task.'],
        ['Can I choose the colour of the profiles and hardware?', 'Yes, standard and custom colours are available depending on the system.'],
        ['Do you work with interior designers and architects?', 'Yes, we provide consultations, technical documentation and support throughout the project.'],
        ['Can a large project be delivered in stages?', 'Yes, large projects can be split into stages according to an agreed schedule.'],
        ['What should I send for a quote?', 'Photos, approximate dimensions, the location and a short description of the structure you need.'],
        ['What affects the price?', 'The dimensions, type of glass, profiles, hardware, installation complexity and logistics.']
      ]
    },
    quote: {
      eyebrow: 'Request',
      title: 'Show us your space',
      intro: 'Send photos, dimensions or a drawing and we will prepare a preliminary quote.',
      messagePlaceholder: 'For example: walk-in shower screen'
    }
  },
  de: {
    meta: {
      title: 'Space Glass — Glas- und Aluminiumkonstruktionen nach Maß',
      description: 'Glastrennwände, Glasduschen, Glastüren, Geländer, rahmenlose Verglasung und Glasfassaden nach Maß. Eigene Fertigung in der Ukraine, Lieferung nach Europa.'
    },
    hero: {
      eyebrow: 'Hochwertige Glaskonstruktionen',
      h1Line1: 'Glaskonstruktionen',
      h1Line2: 'für Wohnen und Gewerbe',
      lead: 'Glas- und Aluminiumkonstruktionen nach Maß: Ganzglas- und Loft-Trennwände, Glasduschen, Geländer, Glastüren, Fenster, Fassaden- und rahmenlose Verglasung, Wintergärten und Vordächer. Wir planen, fertigen und montieren — mit eigener Produktion in der Ukraine und Lieferung ausgewählter Produkte nach Europa.',
      ctaPrimary: 'Angebot anfragen',
      ctaSecondary: 'Produkte ansehen',
      imageAlt: 'Glastrennwand von Space Glass'
    },
    categories: [
      ['Glasduschen', 'Walk-in-Duschwände, Eck-, Nischen-, Schiebe- und Falttürduschen, Duschtüren und Badewannenaufsätze — exakt nach Maß Ihres Bades.', '/dushovi-kabiny/'],
      ['Glastrennwände', 'Loft-, Ganzglas-, Schiebe-, Teleskop- und Falttrennwände mit oder ohne Tür. Räume gliedern, ohne Tageslicht zu verlieren.', '/sklyani-perehorodky/'],
      ['Glastüren', 'Dreh-, Schiebe- und Pendeltüren aus Glas, rahmenlos oder in schlanken Aluminiumprofilen — für Wohnung, Büro und Gewerbe.', '/sklyani-dveri/'],
      ['Glasgeländer', 'Geländer für Treppen, Balkone, Terrassen und Pools: rahmenlos im Bodenprofil oder mit Pfosten, stets mit Verbundsicherheitsglas.', '/sklyani-ohorozhi/'],
      ['Spiegel nach Maß', 'LED-, Rahmen- und Wandspiegel sowie Spiegelwände nach Maß für Bad, Salon, Fitnessstudio und Hotel.', '/dzerkala/'],
      ['Glasfassaden', 'Pfosten-Riegel- und Structural-Glazing-Fassaden, Schaufenster und Eingangsanlagen für Wohn- und Gewerbebauten — von der Planung bis zur Montage.', '/poslugy/sklyani-fasady/'],
      ['Glasvordächer', 'Vordächer für Haus-, Büro- und Ladeneingänge: freitragend, mit Zugstangen, auf Konsolen oder im Rahmen. Systeme aus deutscher Entwicklung.', '/sklyani-kozyrky/'],
      ['Rahmenlose Verglasung', 'Falt-, Schiebe- und Guillotinesysteme für Terrassen, Balkone und Pavillons. Die Flügel öffnen vollständig und parken an der Wand.', '/bezramne-sklinnya/'],
      ['Aluminium-Fenster und -Türen', 'Wärmegedämmte Aluminiumfenster, -türen und Hebe-Schiebe-Systeme, Büro- und Fassadenverglasung, Pergolen und Insektenschutz.', '/alyuminiyevi-konstrukcziyi/'],
      ['Wintergärten', 'Verglaste Anbauten und Terrassen aus Aluminium mit Glasdach und Schiebetüren — beheizt für ganzjährige Nutzung oder als Sommergarten.', '/alyuminiyevi-konstrukcziyi/zymovi-sady/'],
      ['Glaslösungen für Gewerbe', 'Glas für Hotels, Gastronomie, Büros, Handel, Kosmetiksalons, Praxen und Wohnanlagen.', '/dlya-biznesu/']
    ],
    categoriesAllLink: 'Alle Produkte und Leistungen ansehen →',
    products: {
      title: 'Beliebte Lösungen',
      controlsAriaLabel: 'Steuerung der beliebten Lösungen',
      prevLabel: 'Vorherige Lösungen',
      nextLabel: 'Nächste Lösungen',
      viewLabel: 'Lösung ansehen →',
      allLink: 'Alle Glaslösungen ansehen →'
    },
    popularSolutions: solutions([
      ['Glasduschen', 'Walk-in-, Eck-, Schiebeduschen und individuelle Duschabtrennungen aus Glas.'],
      ['Glastrennwände', 'Rahmenlose und gerahmte Glastrennwände für Wohnungen, Büros und Gewerbeflächen.'],
      ['Rahmenlose Verglasung', 'Schiebe- und Faltsysteme aus Glas für Terrassen und große Öffnungen.'],
      ['Glasgeländer', 'Rahmenlose Glasgeländer und Pfostengeländer für Treppen, Balkone und Terrassen.'],
      ['Glasvordächer', 'Vordächer über dem Eingang — freitragend, mit Zugstangen oder im Rahmen.'],
      ['Glastüren', 'Dreh-, Schiebe- und Pendeltüren aus Glas für Wohn- und Gewerberäume.'],
      ['Wintergärten', 'Verglaste Terrassen und Wintergärten aus Aluminium für die ganzjährige Nutzung.'],
      ['Spiegel nach Maß', 'Spiegel in Sondermaßen für Bad, Wohnbereich und Gewerbe.'],
      ['Glasfassaden', 'Fassadenverglasung für Wohn- und Gewerbebauten mit Aluminiumsystemen.'],
      ['Aluminium-Fenster und -Türen', 'Aluminiumfenster, -türen und Schiebesysteme für Wohnen und Gewerbe.']
    ]),
    projects: {
      title: 'Unsere Projekte',
      intro: 'Umgesetzte Lösungen für Wohnungen, Büros, Restaurants, Hotels und Kosmetiksalons.',
      controlsAriaLabel: 'Steuerung der Projektgalerie',
      prevLabel: 'Vorherige Projekte',
      nextLabel: 'Nächste Projekte',
      carouselAriaLabel: 'Umgesetzte Projekte von Space Glass',
      viewProjectPrefix: 'Projekt ansehen:',
      allLink: 'Alle Projekte ansehen →'
    },
    finalBenefits: [
      ['Maßanfertigung', 'Geplant für Ihr Projekt und Ihre Maße', '◇'],
      ['Hochwertige Materialien', 'Sicherheitsglas und hochwertige Beschläge', '▱'],
      ['Fachgerechte Montage', 'Erfahrene Montageteams', '⚒'],
      ['Garantie und Service', 'Betreuung nach der Montage', '◇']
    ],
    faq: {
      title: 'Häufige Fragen',
      intro: 'Antworten zu Angebot, Aufmaß, Fertigung, Lieferung, Montage, Garantie und Service.',
      items: [
        ['Wie erhalte ich eine Kostenschätzung?', 'Senden Sie uns Fotos, ungefähre Maße oder eine Zeichnung. Wir klären die Details und erstellen eine unverbindliche Kostenschätzung.'],
        ['Wo montieren Sie?', 'Unsere Montageteams arbeiten in Kyjiw, Lwiw und Odesa sowie in den umliegenden Regionen. Andere Standorte stimmen wir projektbezogen ab.'],
        ['Liefern Sie in andere europäische Länder?', 'Ja, ausgewählte Produkte und Konstruktionen können in europäische Länder geliefert werden. Lieferung und Montage im Ausland werden für jedes Projekt individuell vereinbart.'],
        ['Arbeiten Sie für Gewerbekunden?', 'Ja, wir setzen Projekte für Büros, Läden, Restaurants, Hotels und Praxen um.'],
        ['Sind Sondermaße möglich?', 'Ja, die meisten Konstruktionen fertigen wir nach einer technischen Prüfung des Objekts individuell.'],
        ['Führen Sie ein Aufmaß vor Ort durch?', 'Ja, ein professionelles Aufmaß ist in den Städten möglich, in denen wir montieren.'],
        ['Wie lange dauert die Fertigung?', 'Das hängt von Konstruktion, Material, Komplexität und Auslastung ab. Die Lieferzeit bestätigen wir nach Freigabe der Zeichnung.'],
        ['Welche Garantie geben Sie?', '5 Jahre auf das Glas, 2 Jahre auf die Beschläge und 1 Jahr auf die Montage.'],
        ['Kann ich nur die Fertigung ohne Montage bestellen?', 'Ja, für einen Teil der Produkte und Konstruktionen bieten wir Fertigung mit Lieferung an.'],
        ['Erstellen Sie technische Zeichnungen?', 'Ja, für komplexe Elemente erstellen wir Zeichnungen und stimmen sie vor der Produktion mit Ihnen ab.'],
        ['Welches Glas verwenden Sie?', 'Einscheibensicherheitsglas (ESG), Verbundsicherheitsglas (VSG), Isolierglas und Spezialgläser — je nach Aufgabe.'],
        ['Kann ich die Farbe von Profilen und Beschlägen wählen?', 'Ja, je nach System stehen Standard- und Sonderfarben zur Verfügung.'],
        ['Arbeiten Sie mit Architekten und Innenarchitekten?', 'Ja, wir beraten, liefern technische Unterlagen und begleiten das Projekt.'],
        ['Kann ein großes Projekt in Etappen umgesetzt werden?', 'Ja, große Projekte lassen sich nach einem abgestimmten Zeitplan in Bauabschnitte teilen.'],
        ['Was brauchen Sie für ein Angebot?', 'Fotos, ungefähre Maße, den Standort und eine kurze Beschreibung der gewünschten Konstruktion.'],
        ['Wovon hängt der Preis ab?', 'Von Maßen, Glasart, Profilen, Beschlägen, Montageaufwand und Logistik.']
      ]
    },
    quote: {
      eyebrow: 'Anfrage',
      title: 'Zeigen Sie uns Ihren Raum',
      intro: 'Senden Sie Fotos, Maße oder eine Zeichnung — wir erstellen eine unverbindliche Kostenschätzung.',
      messagePlaceholder: 'Zum Beispiel: Walk-in-Duschwand'
    }
  },
  es: {
    meta: {
      title: 'Space Glass — Estructuras de vidrio y aluminio a medida',
      description: 'Tabiques de vidrio, mamparas de ducha, puertas, barandillas, cortinas de cristal y fachadas a medida. Fabricación propia en Ucrania y envíos a Europa.'
    },
    hero: {
      eyebrow: 'Estructuras de vidrio de alta gama',
      h1Line1: 'Estructuras de vidrio',
      h1Line2: 'para viviendas y empresas',
      lead: 'Estructuras de vidrio y aluminio a medida: tabiques sin perfiles y de estilo loft, mamparas de ducha, barandillas, puertas, ventanas, fachadas, cortinas de cristal, jardines de invierno y marquesinas. Diseñamos, fabricamos e instalamos, con producción propia en Ucrania y envío de productos seleccionados a Europa.',
      ctaPrimary: 'Pedir presupuesto',
      ctaSecondary: 'Ver productos',
      imageAlt: 'Tabique de vidrio de Space Glass'
    },
    categories: [
      ['Mamparas de ducha', 'Mamparas walk-in, de esquina, en hornacina, correderas y plegables, puertas de ducha y mamparas de bañera, a la medida exacta de su baño.', '/dushovi-kabiny/'],
      ['Tabiques de vidrio', 'Tabiques loft, sin perfiles, correderos, telescópicos y plegables, con o sin puerta. Divida viviendas y oficinas sin perder luz natural.', '/sklyani-perehorodky/'],
      ['Puertas de vidrio', 'Puertas abatibles, correderas y pivotantes de vidrio, sin marco o con perfiles finos de aluminio, para viviendas, oficinas y locales.', '/sklyani-dveri/'],
      ['Barandillas de vidrio', 'Barandillas para escaleras, balcones, terrazas y piscinas: sistemas sin postes en perfil de base o con postes, siempre con vidrio laminado.', '/sklyani-ohorozhi/'],
      ['Espejos a medida', 'Espejos LED, con marco y de pared y paneles de espejo a medida para baños, salones de belleza, gimnasios y hoteles.', '/dzerkala/'],
      ['Fachadas de vidrio', 'Muro cortina, vidrio estructural, escaparates y accesos acristalados para edificios residenciales y comerciales, del proyecto a la instalación.', '/poslugy/sklyani-fasady/'],
      ['Marquesinas de vidrio', 'Marquesinas para viviendas, oficinas y comercios: en voladizo, con tirantes, sobre soportes o con marco. Sistemas de ingeniería alemana.', '/sklyani-kozyrky/'],
      ['Cortinas de cristal', 'Sistemas plegables, correderos y guillotina para terrazas, balcones y pérgolas. Las hojas se abren por completo y se recogen junto a la pared.', '/bezramne-sklinnya/'],
      ['Ventanas y puertas de aluminio', 'Ventanas, puertas y correderas elevables de aluminio con rotura de puente térmico, acristalamiento de oficinas y fachadas, pérgolas y mosquiteras.', '/alyuminiyevi-konstrukcziyi/'],
      ['Jardines de invierno', 'Ampliaciones y porches acristalados de aluminio con techo de vidrio y puertas correderas, para todo el año o de temporada.', '/alyuminiyevi-konstrukcziyi/zymovi-sady/'],
      ['Vidrio para empresas', 'Soluciones de vidrio para hoteles, restaurantes, oficinas, comercios, salones de belleza, clínicas y promociones residenciales.', '/dlya-biznesu/']
    ],
    categoriesAllLink: 'Ver todos los productos y servicios →',
    products: {
      title: 'Soluciones más solicitadas',
      controlsAriaLabel: 'Controles de soluciones destacadas',
      prevLabel: 'Soluciones anteriores',
      nextLabel: 'Soluciones siguientes',
      viewLabel: 'Ver solución →',
      allLink: 'Ver todas las soluciones de vidrio →'
    },
    popularSolutions: solutions([
      ['Mamparas de ducha', 'Mamparas walk-in, de esquina, correderas y totalmente a medida.'],
      ['Tabiques de vidrio', 'Tabiques de vidrio sin perfiles y con perfil para viviendas, oficinas y locales.'],
      ['Cortinas de cristal', 'Sistemas correderos y plegables de vidrio para terrazas y grandes huecos.'],
      ['Barandillas de vidrio', 'Barandillas sin postes y con postes para escaleras, balcones y terrazas.'],
      ['Marquesinas de vidrio', 'Marquesinas de entrada en voladizo, con tirantes o con marco.'],
      ['Puertas de vidrio', 'Puertas abatibles, correderas y pivotantes para viviendas y locales.'],
      ['Jardines de invierno', 'Terrazas acristaladas y jardines de invierno de aluminio para todo el año.'],
      ['Espejos a medida', 'Espejos a medida para baños, viviendas e interiores comerciales.'],
      ['Fachadas de vidrio', 'Fachadas acristaladas para edificios residenciales y comerciales con sistemas de aluminio.'],
      ['Ventanas y puertas de aluminio', 'Ventanas, puertas y correderas de aluminio para viviendas y empresas.']
    ]),
    projects: {
      title: 'Nuestros proyectos',
      intro: 'Soluciones realizadas para viviendas, oficinas, restaurantes, hoteles y salones de belleza.',
      controlsAriaLabel: 'Controles del carrusel de proyectos',
      prevLabel: 'Proyectos anteriores',
      nextLabel: 'Proyectos siguientes',
      carouselAriaLabel: 'Proyectos realizados por Space Glass',
      viewProjectPrefix: 'Ver proyecto:',
      allLink: 'Ver todos los proyectos →'
    },
    finalBenefits: [
      ['A medida', 'Diseñado para su proyecto y sus medidas', '◇'],
      ['Materiales de calidad', 'Vidrio templado de seguridad y herrajes de alta gama', '▱'],
      ['Instalación profesional', 'Equipos de montaje con experiencia', '⚒'],
      ['Garantía y servicio', 'Asistencia después de la instalación', '◇']
    ],
    faq: {
      title: 'Preguntas frecuentes',
      intro: 'Respuestas sobre presupuestos, mediciones, fabricación, envío, instalación, garantía y servicio.',
      items: [
        ['¿Cómo obtengo un presupuesto orientativo?', 'Envíenos fotos, medidas aproximadas o un plano. Aclaramos los detalles y preparamos una estimación.'],
        ['¿Dónde instalan?', 'Nuestros equipos de instalación trabajan en Kiev, Leópolis y Odesa y sus regiones. Otras ubicaciones se acuerdan para cada proyecto.'],
        ['¿Envían a otros países de Europa?', 'Sí, podemos enviar productos y estructuras seleccionados a países europeos. El envío y la instalación en el extranjero se acuerdan de forma individual para cada proyecto.'],
        ['¿Trabajan con proyectos comerciales?', 'Sí, realizamos proyectos para oficinas, comercios, restaurantes, hoteles y clínicas.'],
        ['¿Se pueden pedir estructuras a medida?', 'Sí, la mayoría de las estructuras se fabrican a medida tras una revisión técnica de la obra.'],
        ['¿Hacen mediciones en obra?', 'Sí, la medición profesional está disponible en las ciudades donde instalamos.'],
        ['¿Cuánto tarda la fabricación?', 'Depende del tipo de estructura, los materiales, la complejidad y la carga de producción. Confirmamos el plazo al aprobar el plano.'],
        ['¿Ofrecen garantía?', 'Sí: 5 años en el vidrio, 2 años en los herrajes y 1 año en la instalación.'],
        ['¿Puedo encargar solo la fabricación, sin instalación?', 'Sí, para parte de los productos y estructuras ofrecemos fabricación con envío.'],
        ['¿Preparan planos técnicos?', 'Sí, para los elementos complejos preparamos planos y los acordamos con usted antes de fabricar.'],
        ['¿Qué vidrio utilizan?', 'Vidrio templado, vidrio laminado de seguridad, doble acristalamiento y vidrios especiales, según el caso.'],
        ['¿Puedo elegir el color de perfiles y herrajes?', 'Sí, hay colores estándar y personalizados según el sistema.'],
        ['¿Trabajan con arquitectos e interioristas?', 'Sí, ofrecemos asesoramiento, documentación técnica y acompañamiento durante todo el proyecto.'],
        ['¿Se puede realizar un proyecto grande por fases?', 'Sí, los proyectos grandes pueden dividirse en fases según un calendario acordado.'],
        ['¿Qué necesitan para el presupuesto?', 'Fotos, medidas aproximadas, la ubicación y una breve descripción de la estructura que necesita.'],
        ['¿De qué depende el precio?', 'De las medidas, el tipo de vidrio, los perfiles, los herrajes, la complejidad del montaje y la logística.']
      ]
    },
    quote: {
      eyebrow: 'Solicitud',
      title: 'Muéstrenos su espacio',
      intro: 'Envíe fotos, medidas o un plano y le prepararemos un presupuesto orientativo.',
      messagePlaceholder: 'Por ejemplo: mampara walk-in'
    }
  }
};
