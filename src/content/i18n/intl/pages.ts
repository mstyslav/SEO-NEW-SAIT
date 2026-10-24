// Contact page and projects page copy for EN/DE/ES. Contact data are the site's own: one phone and
// e-mail, three offices in Ukraine (addresses as on /contacts/, written in Latin script), Mon–Fri 9–19.
import type { IntlLocale } from '../../../i18n/intl-routes';
import type { Pair, ProjectsPageCopy } from './types';

export interface ContactsCopy {
  title: string; description: string; eyebrow: string; heading: string; intro: string; quickLinksAria: string;
  name: string; namePlaceholder: string; phone: string; city: string; cityPlaceholder: string; need: string; needPlaceholder: string;
  file: string; chooseFile: string; noFile: string; consent: string; privacy: string; consentAfter?: string; submit: string;
  calcEyebrow: string; calcTitle: string; calculationItems: Pair[];
  offices: string; chooseCity: string; officeList: Array<{ id: 'odesa' | 'kyiv' | 'lviv'; city: string; address: string }>;
  schedule: string; hours: string; route: string; map: string; socialAria: string; mapTitle: string;
  geoEyebrow: string; geoTitle: string; geoText: string[]; geoCitiesAria: string;
  /** Markets row under the geography text (src/data/markets.ts): aria label, kind of the offices card, kind of the service-area card, CTA. */
  marketsAria: string; marketOffices: string; marketArea: string; marketRequest: string;
  b2bEyebrow: string; b2bTitle: string; b2bText: string; b2bLine: string; b2bCta: string;
  faqTitle: string; faqIntro: string; faq: Pair[];
}

export const contactsCopy: Record<IntlLocale, ContactsCopy> = {
  en: {
    title: 'Contact Space Glass — Offices in Kyiv, Odesa and Lviv',
    description: 'Contact Space Glass: phone, e-mail and offices in Kyiv, Odesa and Lviv. Send photos, dimensions or drawings and we will prepare a quote for your project.',
    eyebrow: 'Contact',
    heading: 'Let’s discuss your project',
    intro: 'Send us approximate dimensions and describe what you need — we will prepare a preliminary estimate.',
    quickLinksAria: 'Quick contacts',
    name: 'Name', namePlaceholder: 'Your name', phone: 'Phone', city: 'City / country', cityPlaceholder: 'City, country',
    need: 'What do you need', needPlaceholder: 'Briefly describe the structure',
    file: 'Photo or drawing', chooseFile: 'Choose file', noFile: 'No file chosen',
    consent: 'I agree to the', privacy: 'privacy policy', submit: 'Send request',
    calcEyebrow: 'For a quote',
    calcTitle: 'What to send for a preliminary estimate',
    calculationItems: [
      ['Photos of the site', 'They show us the type of structure, the opening and the conditions for installation.'],
      ['Approximate dimensions', 'The main overall dimensions are enough for a preliminary quote.'],
      ['Drawing / PDF / DWG', 'If your project is already designed, send the drawing or technical documentation for review.']
    ],
    offices: 'Our offices',
    chooseCity: 'Choose a city',
    officeList: [
      { id: 'odesa', city: 'Odesa', address: '5 Hlyniana Street' },
      { id: 'kyiv', city: 'Kyiv', address: '8 Laureatska Street' },
      { id: 'lviv', city: 'Lviv', address: '144 Kulparkivska Street' }
    ],
    schedule: 'Opening hours', hours: 'Mon–Fri: 09:00–19:00 (Kyiv time)', route: 'Get directions', map: 'Open map',
    socialAria: 'Space Glass on social media', mapTitle: 'Map of the Space Glass office',
    geoEyebrow: 'Where we work',
    geoTitle: 'Based in Ukraine, open to projects abroad',
    geoText: [
      'Our production and installation teams are based in Kyiv, Odesa and Lviv, and we carry out projects across Ukraine depending on the type of structure, the scope of work and logistics.',
      'Selected products and structures can also be delivered to European countries. For a project outside Ukraine, send us the drawings or photos and the location — we will tell you what can be supplied and how delivery and installation can be organised.'
    ],
    geoCitiesAria: 'Space Glass offices',
    marketsAria: 'Space Glass markets', marketOffices: 'Offices', marketArea: 'Service area', marketRequest: 'Send a request',
    b2bEyebrow: 'For businesses',
    b2bTitle: 'Working on a commercial project?',
    b2bText: 'We work with architects, interior designers, developers and general contractors, and with drawings, specifications and project documentation.',
    b2bLine: 'Offices · shops · restaurants · hotels · residential developments · private homes',
    b2bCta: 'Send your project',
    faqTitle: 'Frequently asked questions',
    faqIntro: 'Answers about quotes, site surveys, files, production, installation and where we work.',
    faq: [
      ['Can I get a preliminary quote remotely?', 'Yes. Send photos, approximate dimensions or a drawing — we will prepare a preliminary estimate and explain the next steps.'],
      ['What should I send for a preliminary quote?', 'Photos of the site, approximate dimensions, the location and a short description of the structure you need are enough to start.'],
      ['Can I send PDF or DWG files?', 'Yes. Attach PDF, DWG or other technical documentation — it speeds up the review and the quote.'],
      ['Do I need a finished drawing?', 'No. Photos and approximate dimensions are enough to start; if needed, we will work out the technical solution and the drawing together.'],
      ['How quickly will I get a preliminary quote?', 'It depends on the complexity of the request and how complete the information is. Our manager will tell you the expected time after receiving your request.'],
      ['Can I book a site survey?', 'Yes, in Kyiv, Odesa and Lviv and the surrounding regions. We arrange it once the task is clear and a convenient time for access to the site is agreed.'],
      ['Do you work outside Ukraine?', 'Selected products and structures can be delivered to European countries. Delivery and installation abroad are agreed individually for each project.'],
      ['Can I order manufacturing only, without installation?', 'Yes, for some structures we offer manufacturing with delivery. The conditions depend on the system and configuration.'],
      ['Do you install the structures yourselves?', 'Yes. Our experienced crews install after the technical solution is approved and the site is ready.'],
      ['Do you work with businesses and developers?', 'Yes. We work with architects, designers, developers and companies on commercial and architectural projects.'],
      ['Do you make structures in non-standard sizes?', 'Yes. Most of our glass and aluminium structures are designed to the actual geometry of each site.'],
      ['Can materials and hardware be agreed before ordering?', 'Yes. Before production we agree the glass, the colour and type of hardware, the profiles and other important details.'],
      ['How do payment and production start?', 'Once the specification and price are agreed, we confirm the payment terms. Production starts after the order is confirmed.'],
      ['How will you contact me after I send a request?', 'A Space Glass manager will call or write to you during business hours to clarify the details and suggest the next step.']
    ]
  },
  de: {
    title: 'Kontakt Space Glass — Projekte in Wien und Österreich',
    description: 'Anfrage für ein Projekt in Wien oder Österreich: Fotos, Maße oder Pläne senden — wir erstellen eine unverbindliche Kostenschätzung.',
    eyebrow: 'Kontakt',
    heading: 'Anfrage für Ihr Projekt in Wien oder Österreich',
    intro: 'Senden Sie uns Fotos, ungefähre Maße oder Pläne und beschreiben Sie Ihr Vorhaben — wir erstellen eine unverbindliche Kostenschätzung. Lieferung und Montage stimmen wir je nach Produkt und Projekt individuell ab.',
    quickLinksAria: 'Schnellkontakt',
    name: 'Name', namePlaceholder: 'Ihr Name', phone: 'Telefon', city: 'Ort / Land', cityPlaceholder: 'Ort, Land',
    need: 'Ihr Vorhaben', needPlaceholder: 'Beschreiben Sie kurz die gewünschte Konstruktion',
    file: 'Foto oder Zeichnung', chooseFile: 'Datei wählen', noFile: 'Keine Datei ausgewählt',
    consent: 'Ich stimme der', privacy: 'Datenschutzerklärung', consentAfter: ' zu', submit: 'Anfrage senden',
    calcEyebrow: 'Für die Kostenschätzung',
    calcTitle: 'Was wir für eine erste Einschätzung brauchen',
    calculationItems: [
      ['Fotos vom Objekt', 'Sie zeigen uns die Art der Konstruktion, die Öffnung und die Bedingungen für die Montage.'],
      ['Ungefähre Maße', 'Für eine erste Kostenschätzung genügen die wichtigsten Außenmaße.'],
      ['Zeichnung / PDF / DWG', 'Liegt bereits eine Planung vor, senden Sie uns die Zeichnung oder die technischen Unterlagen zur Prüfung.']
    ],
    offices: 'Unsere Standorte in der Ukraine',
    chooseCity: 'Standort wählen',
    officeList: [
      { id: 'odesa', city: 'Odesa', address: 'Hlyniana-Straße 5' },
      { id: 'kyiv', city: 'Kyjiw', address: 'Laureatska-Straße 8' },
      { id: 'lviv', city: 'Lwiw', address: 'Kulparkivska-Straße 144' }
    ],
    schedule: 'Öffnungszeiten', hours: 'Mo–Fr: 09:00–19:00 (Kyjiwer Zeit)', route: 'Route planen', map: 'Karte öffnen',
    socialAria: 'Space Glass in sozialen Netzwerken', mapTitle: 'Karte des Büros von Space Glass',
    geoEyebrow: 'Einsatzgebiet',
    geoTitle: 'Projekte in Wien und Österreich',
    geoText: [
      'Wir realisieren Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Aufmaß, Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.',
      'Das Unternehmen hat seinen Sitz in der Ukraine; Fertigung und Montageteams sitzen in Kyjiw, Odesa und Lwiw. Senden Sie uns Pläne oder Fotos und den Standort Ihres Objekts — wir sagen Ihnen, was geliefert werden kann und wie der Ablauf für Ihr Projekt aussieht.'
    ],
    geoCitiesAria: 'Standorte von Space Glass in der Ukraine',
    marketsAria: 'Märkte von Space Glass', marketOffices: 'Standorte', marketArea: 'Einsatzgebiet', marketRequest: 'Anfrage senden',
    b2bEyebrow: 'Für Unternehmen',
    b2bTitle: 'Sie arbeiten an einem Gewerbeprojekt?',
    b2bText: 'Wir arbeiten mit Architekten, Innenarchitekten, Bauträgern und Generalunternehmern zusammen — auf Basis von Zeichnungen, Leistungsverzeichnissen und Projektunterlagen.',
    b2bLine: 'Büros · Ladenlokale · Restaurants · Hotels · Wohnanlagen · Privathäuser',
    b2bCta: 'Projekt senden',
    faqTitle: 'Häufige Fragen',
    faqIntro: 'Antworten zu Angebot, Aufmaß, Dateien, Fertigung, Montage und Einsatzgebiet.',
    faq: [
      ['Ist eine erste Kostenschätzung aus der Ferne möglich?', 'Ja. Senden Sie Fotos, ungefähre Maße oder eine Zeichnung — wir erstellen eine unverbindliche Kostenschätzung und erklären die nächsten Schritte.'],
      ['Was brauchen Sie für eine Kostenschätzung?', 'Fotos vom Objekt, ungefähre Maße, den Standort und eine kurze Beschreibung der gewünschten Konstruktion — das genügt für den Anfang.'],
      ['Kann ich PDF- oder DWG-Dateien senden?', 'Ja. Hängen Sie PDF, DWG oder andere technische Unterlagen an — das beschleunigt Prüfung und Kalkulation.'],
      ['Brauche ich eine fertige Zeichnung?', 'Nein. Für den Start reichen Fotos und ungefähre Maße; die technische Lösung und die Zeichnung erarbeiten wir bei Bedarf gemeinsam.'],
      ['Wie schnell erhalte ich die Kostenschätzung?', 'Das hängt von der Komplexität und der Vollständigkeit der Angaben ab. Nach Eingang der Anfrage nennen wir Ihnen den voraussichtlichen Zeitraum.'],
      ['Kann ich ein Aufmaß vor Ort vereinbaren?', 'Das stimmen wir je nach Projekt und Objekt individuell ab. Für die erste Kostenschätzung genügen Fotos und ungefähre Maße.'],
      ['Arbeiten Sie an Projekten in Österreich?', 'Ja, wir nehmen Anfragen für Projekte in Wien und Österreich an. Lieferung und Montage werden für jedes Projekt individuell vereinbart.'],
      ['Kann ich nur die Fertigung ohne Montage bestellen?', 'Ja, für einen Teil der Konstruktionen ist Fertigung mit Lieferung möglich. Die Bedingungen hängen von System und Ausführung ab.'],
      ['Übernehmen Sie die Montage selbst?', 'Ja. Unsere erfahrenen Teams montieren, sobald die technische Lösung freigegeben und das Objekt vorbereitet ist.'],
      ['Arbeiten Sie mit Unternehmen und Bauträgern?', 'Ja. Wir arbeiten mit Architekten, Planern, Bauträgern und Unternehmen an Gewerbe- und Architekturprojekten.'],
      ['Fertigen Sie Sondermaße?', 'Ja. Die meisten Glas- und Aluminiumkonstruktionen planen wir nach der tatsächlichen Geometrie des Objekts.'],
      ['Können Material und Beschläge vorab abgestimmt werden?', 'Ja. Vor der Fertigung stimmen wir Glas, Farbe und Art der Beschläge, Profile und weitere Details ab.'],
      ['Wie laufen Zahlung und Fertigungsstart ab?', 'Nach Abstimmung von Ausführung und Preis legen wir die Zahlungsbedingungen fest. Die Fertigung beginnt nach der Auftragsbestätigung.'],
      ['Wie melden Sie sich nach meiner Anfrage?', 'Ein Mitarbeiter von Space Glass ruft Sie während der Geschäftszeiten an oder schreibt Ihnen, um die Details zu klären und den nächsten Schritt vorzuschlagen.']
    ]
  },
  es: {
    title: 'Contacto Space Glass — oficinas en Kyiv, Odesa y Lviv',
    description: 'Contacte con Space Glass: teléfono, correo y nuestras oficinas en Kyiv, Odesa y Lviv. Envíe fotos, medidas o planos y le prepararemos un presupuesto.',
    eyebrow: 'Contacto',
    heading: 'Hablemos de su proyecto',
    intro: 'Envíenos medidas aproximadas y cuéntenos qué necesita: le prepararemos una estimación orientativa.',
    quickLinksAria: 'Contacto rápido',
    name: 'Nombre', namePlaceholder: 'Su nombre', phone: 'Teléfono', city: 'Ciudad / país', cityPlaceholder: 'Ciudad, país',
    need: 'Qué necesita', needPlaceholder: 'Describa brevemente la estructura',
    file: 'Foto o plano', chooseFile: 'Elegir archivo', noFile: 'Ningún archivo seleccionado',
    consent: 'Acepto la', privacy: 'política de privacidad', submit: 'Enviar solicitud',
    calcEyebrow: 'Para el presupuesto',
    calcTitle: 'Qué enviar para una estimación orientativa',
    calculationItems: [
      ['Fotos de la obra', 'Nos ayudan a entender el tipo de estructura, el hueco y las condiciones de instalación.'],
      ['Medidas aproximadas', 'Para un presupuesto orientativo bastan las dimensiones generales de la estructura.'],
      ['Plano / PDF / DWG', 'Si el proyecto ya está diseñado, envíe el plano o la documentación técnica para revisarla.']
    ],
    offices: 'Nuestras oficinas',
    chooseCity: 'Elija una ciudad',
    officeList: [
      { id: 'odesa', city: 'Odesa', address: 'Calle Hlyniana, 5' },
      { id: 'kyiv', city: 'Kyiv', address: 'Calle Laureatska, 8' },
      { id: 'lviv', city: 'Lviv', address: 'Calle Kulparkivska, 144' }
    ],
    schedule: 'Horario', hours: 'Lun–Vie: 09:00–19:00 (hora de Kyiv)', route: 'Cómo llegar', map: 'Abrir mapa',
    socialAria: 'Space Glass en redes sociales', mapTitle: 'Mapa de la oficina de Space Glass',
    geoEyebrow: 'Dónde trabajamos',
    geoTitle: 'Con sede en Ucrania y abiertos a proyectos en el extranjero',
    geoText: [
      'Nuestra producción y nuestros equipos de instalación están en Kyiv, Odesa y Lviv, y realizamos proyectos en toda Ucrania según el tipo de estructura, el volumen de trabajo y la logística.',
      'También podemos enviar productos y estructuras seleccionados a países europeos. Para un proyecto fuera de Ucrania, envíenos los planos o las fotos y la ubicación: le diremos qué podemos suministrar y cómo organizar el envío y la instalación.'
    ],
    geoCitiesAria: 'Oficinas de Space Glass',
    marketsAria: 'Mercados de Space Glass', marketOffices: 'Oficinas', marketArea: 'Zona de servicio', marketRequest: 'Enviar solicitud',
    b2bEyebrow: 'Para empresas',
    b2bTitle: '¿Trabaja en un proyecto comercial?',
    b2bText: 'Colaboramos con arquitectos, interioristas, promotores y contratistas generales, y trabajamos con planos, mediciones y documentación de proyecto.',
    b2bLine: 'Oficinas · comercios · restaurantes · hoteles · promociones residenciales · viviendas',
    b2bCta: 'Enviar proyecto',
    faqTitle: 'Preguntas frecuentes',
    faqIntro: 'Respuestas sobre presupuestos, mediciones, archivos, fabricación, instalación y zonas de trabajo.',
    faq: [
      ['¿Puedo obtener un presupuesto a distancia?', 'Sí. Envíe fotos, medidas aproximadas o un plano: le prepararemos una estimación orientativa y le explicaremos los siguientes pasos.'],
      ['¿Qué debo enviar para un presupuesto orientativo?', 'Fotos de la obra, medidas aproximadas, la ubicación y una breve descripción de la estructura son suficientes para empezar.'],
      ['¿Puedo enviar archivos PDF o DWG?', 'Sí. Adjunte PDF, DWG u otra documentación técnica: así la revisión y el presupuesto son más rápidos.'],
      ['¿Necesito un plano terminado?', 'No. Para empezar bastan fotos y medidas aproximadas; si hace falta, desarrollaremos juntos la solución técnica y el plano.'],
      ['¿Cuánto tardan en preparar el presupuesto?', 'Depende de la complejidad de la solicitud y de la información disponible. Al recibirla, le indicaremos el plazo aproximado.'],
      ['¿Puedo pedir una medición en obra?', 'Sí, en Kyiv, Odesa y Lviv y sus regiones, una vez definida la tarea y acordado un horario de acceso a la obra.'],
      ['¿Trabajan fuera de Ucrania?', 'Podemos enviar productos y estructuras seleccionados a países europeos. El envío y la instalación en el extranjero se acuerdan de forma individual para cada proyecto.'],
      ['¿Puedo encargar solo la fabricación, sin instalación?', 'Sí, para parte de las estructuras ofrecemos fabricación con envío. Las condiciones dependen del sistema y la configuración.'],
      ['¿Instalan ustedes las estructuras?', 'Sí. Nuestros equipos con experiencia instalan una vez aprobada la solución técnica y preparada la obra.'],
      ['¿Trabajan con empresas y promotores?', 'Sí. Colaboramos con arquitectos, diseñadores, promotores y empresas en proyectos comerciales y de arquitectura.'],
      ['¿Fabrican en medidas no estándar?', 'Sí. Diseñamos la mayoría de las estructuras de vidrio y aluminio según la geometría real de cada obra.'],
      ['¿Se pueden acordar los materiales y herrajes antes del pedido?', 'Sí. Antes de fabricar acordamos el vidrio, el color y el tipo de herrajes, los perfiles y otros detalles importantes.'],
      ['¿Cómo se realiza el pago y el inicio de la fabricación?', 'Una vez acordados la configuración y el precio, fijamos las condiciones de pago. La fabricación empieza tras confirmar el pedido.'],
      ['¿Cómo me contactarán después de enviar la solicitud?', 'Un gestor de Space Glass le llamará o le escribirá en horario laboral para aclarar los detalles y proponerle el siguiente paso.']
    ]
  }
};

export const projectsPageCopy: Record<IntlLocale, ProjectsPageCopy> = {
  en: {
    meta: {
      title: 'Space Glass Projects — Glass Partitions, Showers, Facades',
      description: 'Selected Space Glass projects: frameless terrace glazing, a glass stair railing, a café facade, office partitions, hotel showers and salon mirrors.'
    },
    eyebrow: 'Our projects',
    h1: 'Completed Space Glass projects',
    lead: 'A selection of projects for homes, hotels, restaurants, offices and salons: frameless glazing, glass railings, facades, partitions, shower enclosures and mirrors. Each case shows the brief, the solution, the materials and the finished result.',
    heroAlt: 'Glass stair railing with a brass-coloured profile in a bright modern interior',
    intro: [
      'Every structure on this page was designed, manufactured and installed by Space Glass to the dimensions of a real site — most of them in Odesa and Kyiv, where our teams work every day.',
      'Here you will find only cases that are fully described in English. If you are planning something similar, send us photos or drawings and we will suggest a solution and prepare a preliminary quote.'
    ],
    gridTitle: 'Selected projects',
    more: { title: 'Planning a similar project?', text: 'Send us photos, dimensions or drawings — we will select the right system and prepare a preliminary quote.', button: 'Request a quote' }
  },
  de: {
    meta: {
      title: 'Projekte von Space Glass — Glastrennwände, Duschen, Fassaden',
      description: 'Ausgewählte Projekte von Space Glass: rahmenlose Terrassenverglasung, Glasgeländer, Café-Fassade, Bürotrennwände, Hotelduschen und Salonspiegel.'
    },
    eyebrow: 'Unsere Projekte',
    h1: 'Umgesetzte Projekte von Space Glass',
    lead: 'Eine Auswahl an Projekten für Wohnhäuser, Hotels, Gastronomie, Büros und Salons: rahmenlose Verglasung, Glasgeländer, Fassaden, Trennwände, Glasduschen und Spiegel. Jede Referenz zeigt Aufgabe, Lösung, Materialien und Ergebnis.',
    heroAlt: 'Glasgeländer an einer Treppe mit messingfarbenem Profil in einem hellen, modernen Interieur',
    intro: [
      'Jede Konstruktion auf dieser Seite wurde von Space Glass nach den Maßen eines realen Objekts geplant, gefertigt und montiert — die meisten davon in Odesa und Kyjiw, wo unsere Teams täglich arbeiten.',
      'Hier finden Sie nur Referenzen, die vollständig auf Deutsch beschrieben sind. Planen Sie etwas Ähnliches? Senden Sie uns Fotos oder Pläne — wir schlagen eine Lösung vor und erstellen eine unverbindliche Kostenschätzung.'
    ],
    gridTitle: 'Ausgewählte Referenzen',
    more: { title: 'Sie planen ein ähnliches Projekt?', text: 'Senden Sie uns Fotos, Maße oder Pläne — wir wählen das passende System und erstellen eine unverbindliche Kostenschätzung.', button: 'Angebot anfragen' }
  },
  es: {
    meta: {
      title: 'Proyectos de Space Glass — tabiques, duchas y fachadas',
      description: 'Proyectos de Space Glass: cortinas de cristal en terraza, barandilla de escalera, fachada de cafetería, tabiques de oficina, duchas de hotel y espejos.'
    },
    eyebrow: 'Nuestros proyectos',
    h1: 'Proyectos realizados por Space Glass',
    lead: 'Una selección de proyectos para viviendas, hoteles, restaurantes, oficinas y salones: cortinas de cristal, barandillas, fachadas, tabiques, mamparas de ducha y espejos. Cada caso muestra el encargo, la solución, los materiales y el resultado.',
    heroAlt: 'Barandilla de vidrio en una escalera con perfil color latón en un interior moderno y luminoso',
    intro: [
      'Cada estructura de esta página fue diseñada, fabricada e instalada por Space Glass según las medidas de una obra real, la mayoría en Odesa y Kyiv, donde nuestros equipos trabajan a diario.',
      'Aquí solo encontrará los casos descritos por completo en español. Si planea algo parecido, envíenos fotos o planos y le propondremos una solución con un presupuesto orientativo.'
    ],
    gridTitle: 'Proyectos seleccionados',
    more: { title: '¿Planea un proyecto similar?', text: 'Envíenos fotos, medidas o planos: elegiremos el sistema adecuado y le prepararemos un presupuesto orientativo.', button: 'Pedir presupuesto' }
  }
};
