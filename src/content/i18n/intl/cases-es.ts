// Casos ES. Datos solo de las fichas de proyecto (src/content/projects/*.json) y, para Nofilters, del
// caso premium verificado (src/data/project-cases/nofilters.ts). «Información general» = cómo trabaja
// Space Glass habitualmente, no datos de este proyecto.
import type { CaseCopy, CaseLabels } from './types';

export const caseLabelsEs: CaseLabels = {
  home: 'Inicio', projects: 'Proyectos', breadcrumbs: 'Ruta de navegación', photos: 'Ver fotos', openPhoto: 'Abrir foto', factsLabel: 'Datos del proyecto',
  about: 'Sobre el proyecto', task: 'Encargo', solution: 'Nuestra solución', tech: 'Detalles técnicos', process: 'Ejecución', projectFact: 'En este proyecto', result: 'Resultado',
  benefits: 'Ventajas', gallery: 'Galería', generalTag: 'Información general', service: 'Servicio',
  faqIntro: 'Respuestas sobre presupuestos, medidas a medida, materiales, instalación y cuidado.', relatedEyebrow: 'Más proyectos', relatedTitle: 'Otros proyectos realizados', back: 'Todos los proyectos',
  lbLabel: 'Visor de fotos del proyecto', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente', of: 'de', viewProject: 'Ver proyecto'
};

const generalGlassSteps = [
  { title: 'Medición', text: 'Medimos los huecos y revisamos soportes y niveles en obra.' },
  { title: 'Plano', text: 'Medidas, vidrio, herrajes y anclajes se aprueban antes de fabricar.' },
  { title: 'Fabricación', text: 'El vidrio se corta, se mecaniza y se templa según las medidas aprobadas.' },
  { title: 'Instalación', text: 'Instalamos, ajustamos y entregamos la estructura terminada.' }
];

export const casesEs: Record<string, CaseCopy> = {
  osocor: {
    seo: { title: 'Cortinas de cristal en terraza, OSOCOR RESIDENCE, Kiev', description: 'Cortinas de cristal en terraza, barandillas y puertas de vidrio para OSOCOR RESIDENCE en Kiev: el proyecto terminado, los detalles clave y la instalación.' },
    h1: 'Cortinas de cristal y barandillas de vidrio en una terraza de Kiev',
    cardTitle: 'Cortinas de cristal en una terraza de Kiev',
    city: 'Kiev',
    objectType: 'OSOCOR RESIDENCE',
    constructionType: 'Cortinas de cristal, barandillas y puertas de vidrio',
    shortDescription: 'Cortinas de cristal, barandillas y puertas de vidrio para OSOCOR RESIDENCE en Kiev: protección del viento y la lluvia sin perder las vistas.',
    categoryLabel: 'Cortinas de cristal',
    facts: [
      { label: 'Tipo', value: 'Cortinas de cristal, barandillas y puertas de vidrio' },
      { label: 'Proyecto', value: 'OSOCOR RESIDENCE' },
      { label: 'Ciudad', value: 'Kiev' },
      { label: 'Ejecución', value: 'A medida' }
    ],
    coverAlt: 'Cortinas de cristal en la terraza de OSOCOR RESIDENCE en Kiev, un proyecto realizado por Space Glass',
    galleryAlts: ['Vista panorámica del acristalamiento sin perfiles', 'Frente de vidrio de la terraza', 'Barandilla de vidrio transparente', 'Sistema de acristalamiento sin perfiles visto de lado', 'Acristalamiento de la terraza tras la instalación'],
    galleryTitle: 'La terraza tras la instalación',
    task: { title: 'Una solución para OSOCOR RESIDENCE', text: 'El cliente necesitaba un acristalamiento acorde con la geometría de la terraza, su uso diario y los acabados existentes: un resultado cuidado en lugar de una solución estándar.' },
    solution: { title: 'Cortinas de cristal, barandillas y puertas de vidrio', paragraphs: ['El acristalamiento se diseñó para proteger el espacio de la lluvia y el viento sin tapar las vistas ni la luz natural.', 'Las proporciones y la configuración del acristalamiento, las barandillas y las puertas se ajustaron a la arquitectura del espacio terminado.'] },
    tech: { title: 'Materiales', items: [{ label: 'Vidrio', value: 'Vidrio de seguridad' }, { label: 'Sistema', value: 'Sistema de guías de aluminio' }, { label: 'Sellado', value: 'Elementos de estanqueidad' }, { label: 'Ejecución', value: 'A medida' }] },
    process: { title: 'Instalación en un espacio terminado', fact: 'Las guías y las hojas de vidrio se instalaron según la geometría real de los huecos, comprobando el movimiento de cada hoja y la uniformidad de los encuentros.', general: { label: 'Cómo realizamos las cortinas de cristal', steps: generalGlassSteps } },
    result: { title: 'Resultado', text: 'El acristalamiento cumple su función, encaja con las proporciones de la terraza y acompaña el estilo de OSOCOR RESIDENCE.' },
    benefits: { title: 'Por qué las cortinas de cristal funcionan en terrazas', note: 'Ventajas de las cortinas de cristal en general, no datos de este proyecto.', items: [{ title: 'Vistas abiertas', text: 'Sin marcos verticales entre las hojas de vidrio.' }, { title: 'Apertura total', text: 'Con buen tiempo, las hojas se deslizan o se pliegan.' }, { title: 'Protección del clima', text: 'Juntas y desagüe frenan el viento, la lluvia y el polvo.' }, { title: 'Temporada más larga', text: 'La terraza se usa más meses al año.' }] },
    service: { hubId: 'frameless', title: 'Servicio relacionado', text: 'Sistemas, vidrios y forma de trabajo, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Diseñaremos cortinas de cristal para su terraza o balcón.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Se puede adaptar una solución similar a otra obra?', 'Sí. Diseñamos cada estructura según las medidas reales, la geometría del hueco, las condiciones de anclaje y sus preferencias de vidrio y herrajes.'],
      ['¿Qué necesitan para un presupuesto orientativo?', 'Envíenos la ubicación, medidas aproximadas y fotos de la zona y describa brevemente el resultado que busca. Después concretamos la configuración.'],
      ['¿Está incluida la instalación?', 'Sí, Space Glass puede encargarse de la medición, la fabricación, el envío y la instalación profesional. El alcance final figura en la oferta.']
    ],
    requestExample: 'cortinas de cristal para una terraza de unos 6 m de ancho, ubicación'
  },
  'stair-railing': {
    seo: { title: 'Barandilla de vidrio con acabado de nitruro de titanio | Space Glass', description: 'Escalera y barandilla de vidrio en una vivienda: piezas metálicas con acabado dorado de nitruro de titanio y vidrio a lo largo del tramo y de la galería.' },
    h1: 'Escalera y barandilla de vidrio con acabado de nitruro de titanio en una vivienda',
    cardTitle: 'Barandilla de escalera con nitruro de titanio',
    objectType: 'Vivienda unifamiliar',
    constructionType: 'Escalera y barandilla de vidrio',
    shortDescription: 'Escalera y barandilla de vidrio en una vivienda: las piezas metálicas llevan acabado de nitruro de titanio y el vidrio acompaña el tramo y el borde abierto de la planta superior.',
    categoryLabel: 'Barandillas de vidrio',
    facts: [
      { label: 'Estructura', value: 'Escalera y barandilla de vidrio' },
      { label: 'Proyecto', value: 'Vivienda unifamiliar' },
      { label: 'Acabado del metal', value: 'Nitruro de titanio' }
    ],
    coverAlt: 'Barandilla de vidrio en una escalera con pasamanos dorado de nitruro de titanio en una vivienda',
    heroCaption: 'Tramo con barandilla de vidrio y pasamanos de nitruro de titanio',
    galleryAlts: [
      'El tramo visto desde abajo: vidrio a ambos lados y pasamanos de nitruro de titanio',
      'Barandilla de vidrio en el borde abierto de la planta superior con remate dorado',
      'Pasamanos de nitruro de titanio sobre el tramo junto a una ventana',
      'Vista desde arriba del giro de la escalera con barandilla de vidrio',
      'Barandilla de vidrio del tramo con el salón y los sofás al fondo',
      'Barandilla de vidrio a lo largo del hueco de la escalera hacia la planta inferior',
      'Pasamanos dorado en el giro del tramo',
      'Poste de sujeción del vidrio con nitruro de titanio en el borde del forjado'
    ],
    galleryTitle: 'La escalera y la barandilla en la casa',
    about: { title: 'Escalera y barandilla de vidrio', paragraphs: ['El proyecto es una vivienda unifamiliar. Space Glass realizó la escalera y la barandilla de vidrio; las piezas metálicas llevan un acabado de nitruro de titanio.', 'Las fotos muestran cómo el pasamanos dorado y el remate del tramo recorren la escalera y continúan como barandilla en la planta superior, mientras el vidrio mantiene el espacio luminoso y abierto.'] },
    tech: { title: 'Lo que se sabe del proyecto', items: [{ label: 'Proyecto', value: 'Vivienda unifamiliar' }, { label: 'Estructura', value: 'Escalera y barandilla de vidrio' }, { label: 'Acabado del metal', value: 'Nitruro de titanio (tono dorado)' }, { label: 'Barandilla', value: 'En el tramo y en el borde de la galería' }] },
    result: { title: 'Resultado', text: 'La escalera se convirtió en el protagonista del interior: el vidrio no cierra el espacio y el metal con nitruro de titanio acompaña la paleta cálida de la casa.' },
    benefits: { title: 'Por qué una barandilla de vidrio en la escalera', note: 'Ventajas de las barandillas de vidrio en general, no datos de este proyecto.', items: [{ title: 'Deja pasar la luz', text: 'El vidrio no oscurece la escalera ni la galería.' }, { title: 'Vidrio laminado', text: 'Si una luna se rompe, la barandilla sigue en su sitio.' }, { title: 'Una sola línea', text: 'El tramo y la galería pueden hacerse con el mismo estilo.' }, { title: 'Color del metal a juego', text: 'Pasamanos y soportes siguen la paleta del interior.' }] },
    service: { hubId: 'railings', title: 'Servicio relacionado', text: 'Sistemas de barandillas, vidrio y alturas, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Diseñaremos una barandilla de vidrio para su escalera.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Qué es el acabado de nitruro de titanio?', 'Un recubrimiento fino, decorativo y protector, que da al metal un tono dorado. Se usa en pasamanos, perfiles y herrajes cuando se quiere un color latón u oro.'],
      ['¿Se puede combinar la barandilla de la escalera con la de la planta superior?', 'Sí. La barandilla del tramo y la del borde del forjado pueden hacerse con el mismo estilo, para que la línea del pasamanos y del vidrio continúe sin cambiar de material.'],
      ['¿Puede hacerse en otro color de metal?', 'Sí. El color de las piezas metálicas se elige junto con el vidrio según el interior; las opciones se acuerdan al preparar el presupuesto.']
    ],
    requestExample: 'barandilla de vidrio para escalera y galería, color del metal, ubicación'
  },
  'coffee-ocean': {
    seo: { title: 'Fachada de vidrio de cafetería con ventanilla, Odesa | Space Glass', description: 'Acristalamiento de fachada y ventanilla de venta para la cafetería Coffee Ocean en la alameda de Arcadia de Odesa: el proyecto terminado y su instalación.' },
    h1: 'Fachada de vidrio de una cafetería con ventanilla de venta en Odesa',
    cardTitle: 'Fachada de vidrio de una cafetería en Odesa',
    city: 'Odesa',
    objectType: 'Cafetería Coffee Ocean',
    constructionType: 'Acristalamiento de fachada y ventanilla',
    shortDescription: 'Acristalamiento de fachada, ventanilla de venta y acceso de vidrio para la cafetería Coffee Ocean en la alameda de Arcadia de Odesa.',
    categoryLabel: 'Fachadas de vidrio',
    facts: [
      { label: 'Tipo', value: 'Acristalamiento de fachada y ventanilla' },
      { label: 'Proyecto', value: 'Cafetería Coffee Ocean' },
      { label: 'Ciudad', value: 'Odesa' },
      { label: 'Ejecución', value: 'A medida' }
    ],
    coverAlt: 'Fachada de vidrio de la cafetería Coffee Ocean en Odesa, un proyecto realizado por Space Glass',
    galleryAlts: ['Fachada de vidrio de la cafetería Coffee Ocean en la alameda de Arcadia de Odesa', 'Ventanilla de venta en la fachada de vidrio de Coffee Ocean', 'Acceso de vidrio de la cafetería Coffee Ocean en Odesa'],
    galleryTitle: 'La fachada de la cafetería',
    task: { title: 'Una fachada para la cafetería Coffee Ocean', text: 'La cafetería necesitaba una fachada acorde con la geometría del edificio, su uso diario y los acabados existentes, con una ventanilla para atender a los clientes en el exterior.' },
    solution: { title: 'Acristalamiento de fachada y ventanilla', paragraphs: ['La fachada se adaptó a la arquitectura del edificio, a la función de la cafetería y a la posición de los accesos y las zonas de servicio.', 'Las proporciones y la configuración se ajustaron al espacio terminado.'] },
    tech: { title: 'Materiales', items: [{ label: 'Acristalamiento', value: 'Vidrio o doble acristalamiento' }, { label: 'Sistema', value: 'Sistema de fachada de aluminio' }, { label: 'Sellado', value: 'Materiales de sellado' }, { label: 'Ejecución', value: 'A medida' }] },
    process: { title: 'Instalación por fases', fact: 'La fachada se instaló por fases, controlando la geometría de los perfiles, las juntas, el sellado y el funcionamiento de las puertas y ventanas integradas.' },
    result: { title: 'Resultado', text: 'La fachada cumple su función, encaja con las proporciones del edificio y acompaña el estilo de la cafetería.' },
    benefits: { title: 'Por qué las fachadas de vidrio convienen a cafeterías y tiendas', note: 'Ventajas de las fachadas y escaparates de vidrio en general, no datos de este proyecto.', items: [{ title: 'Visibilidad', text: 'Quien pasa ve el interior y la barra.' }, { title: 'Luz natural', text: 'El local se mantiene luminoso todo el día.' }, { title: 'Ventanilla', text: 'Se puede atender directamente a la calle.' }, { title: 'Sistema duradero', text: 'Los perfiles de aluminio no se corroen y requieren poco mantenimiento.' }] },
    service: { hubId: 'facades', title: 'Servicio relacionado', text: 'Sistemas de fachada, escaparates y accesos, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Diseñaremos la fachada o el escaparate de su cafetería o tienda.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Se puede adaptar una solución similar a otro edificio?', 'Sí. Diseñamos cada estructura según las medidas reales, la geometría de los huecos, las condiciones de anclaje y sus preferencias de vidrio y herrajes.'],
      ['¿Qué necesitan para un presupuesto orientativo?', 'Envíenos la ubicación, medidas aproximadas y fotos de la fachada y describa brevemente el resultado que busca. Después concretamos la configuración.'],
      ['¿Está incluida la instalación?', 'Sí, Space Glass puede encargarse de la medición, la fabricación, el envío y la instalación profesional. El alcance final figura en la oferta.']
    ],
    requestExample: 'escaparate con ventanilla de venta para una cafetería, tamaño aproximado, ubicación'
  },
  'office-odesa': {
    seo: { title: 'Tabiques de vidrio con puertas para oficina en Odesa | Space Glass', description: 'Tabiques de vidrio con puertas para una oficina del centro de negocios Morskyi en Odesa: el proyecto terminado, los detalles clave y la instalación.' },
    h1: 'Tabiques de vidrio con puertas para una oficina en Odesa',
    cardTitle: 'Tabiques de vidrio para oficina en Odesa',
    city: 'Odesa',
    objectType: 'Oficina, centro de negocios Morskyi',
    constructionType: 'Mamparas de oficina de vidrio',
    shortDescription: 'Tabiques de vidrio con puertas para una oficina del centro de negocios Morskyi en Odesa: zonas separadas sin sensación de pared maciza.',
    categoryLabel: 'Tabiques de vidrio',
    facts: [
      { label: 'Tipo', value: 'Mamparas de oficina de vidrio' },
      { label: 'Proyecto', value: 'Oficina, centro de negocios Morskyi' },
      { label: 'Ciudad', value: 'Odesa' },
      { label: 'Ejecución', value: 'A medida' }
    ],
    coverAlt: 'Tabiques de vidrio con puertas en una oficina del centro de negocios Morskyi en Odesa',
    galleryAlts: ['Vista general del tabique de vidrio', 'Zonificación de la oficina con vidrio', 'Perfil del tabique de vidrio', 'Hoja de vidrio y herrajes', 'El tabique visto desde la sala'],
    galleryTitle: 'Los tabiques en la oficina',
    task: { title: 'Tabiques para una oficina del centro de negocios Morskyi', text: 'El cliente necesitaba tabiques acordes con la geometría de la oficina, su uso diario y los acabados existentes: un resultado cuidado en lugar de una solución estándar.' },
    solution: { title: 'Tabiques de vidrio con puertas', paragraphs: ['El tabique se diseñó según la geometría real del hueco y el uso del espacio, para dividir la oficina sin la sensación de una pared pesada.', 'Las proporciones y la configuración se ajustaron al interior terminado.'] },
    tech: { title: 'Materiales', items: [{ label: 'Vidrio', value: 'Vidrio de seguridad' }, { label: 'Sistema', value: 'Sistema de perfiles' }, { label: 'Herrajes', value: 'Herrajes de puerta y encuentros' }, { label: 'Ejecución', value: 'A medida' }] },
    process: { title: 'Instalación en una oficina terminada', fact: 'Los tabiques se instalaron sobre las superficies acabadas. Después se comprobaron el nivel, los encuentros y el funcionamiento de las puertas.', general: { label: 'Cómo realizamos los tabiques de vidrio', steps: generalGlassSteps } },
    result: { title: 'Resultado', text: 'Los tabiques cumplen su función, encajan con las proporciones de la oficina y acompañan su estilo.' },
    benefits: { title: 'Por qué tabiques de vidrio en oficinas', note: 'Ventajas de las mamparas de oficina en general, no datos de este proyecto.', items: [{ title: 'Luz natural', text: 'La luz llega a todos los puestos.' }, { title: 'Instalación limpia', text: 'Sin obra húmeda, normalmente 1–3 días en una oficina.' }, { title: 'Menos ruido', text: 'El vidrio laminado y las juntas reducen el ruido.' }, { title: 'Privacidad cuando hace falta', text: 'Vidrio mate o franjas al ácido donde se necesiten.' }] },
    service: { hubId: 'partitions', title: 'Servicio relacionado', text: 'Tipos de tabiques, vidrio y puertas, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Diseñaremos tabiques de vidrio para su oficina.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Se puede adaptar una solución similar a otra oficina?', 'Sí. Diseñamos cada estructura según las medidas reales, la geometría del hueco, las condiciones de anclaje y sus preferencias de vidrio y herrajes.'],
      ['¿Qué necesitan para un presupuesto orientativo?', 'Envíenos la ubicación, medidas aproximadas o un plano de la oficina y fotos, y describa brevemente el resultado que busca. Después concretamos la configuración.'],
      ['¿Está incluida la instalación?', 'Sí, Space Glass puede encargarse de la medición, la fabricación, el envío y la instalación profesional. El alcance final figura en la oferta.']
    ],
    requestExample: 'tabiques de vidrio con puertas para una oficina, medidas de las salas, ubicación'
  },
  'hotel-showers': {
    seo: { title: 'Mamparas de ducha y bañera para un hotel en Odesa | Space Glass', description: 'Mamparas de ducha y de bañera de vidrio para el hotel Dvorianskyi en Odesa: un mismo estándar para todas las habitaciones, instaladas sin cerrar el hotel.' },
    h1: 'Mamparas de ducha de vidrio para un hotel en Odesa',
    cardTitle: 'Mamparas de ducha para un hotel en Odesa',
    city: 'Odesa',
    objectType: 'Hotel Dvorianskyi',
    constructionType: 'Mamparas de ducha y de bañera',
    shortDescription: 'Mamparas de ducha y de bañera de vidrio para el hotel Dvorianskyi en Odesa, con un mismo estándar de calidad en todas las habitaciones.',
    categoryLabel: 'Mamparas de ducha',
    facts: [
      { label: 'Tipo', value: 'Mamparas de ducha y de bañera' },
      { label: 'Proyecto', value: 'Hotel Dvorianskyi' },
      { label: 'Ciudad', value: 'Odesa' },
      { label: 'Ejecución', value: 'A medida' }
    ],
    coverAlt: 'Mamparas de ducha de vidrio en el hotel Dvorianskyi de Odesa, un proyecto realizado por Space Glass',
    galleryAlts: ['Vista general de la zona de ducha', 'Vidrio de seguridad de la mampara', 'Herrajes y fijación del vidrio', 'Encuentro del vidrio con el revestimiento', 'Mampara terminada tras la instalación'],
    galleryTitle: 'Duchas en las habitaciones del hotel',
    task: { title: 'Estructuras iguales para varias habitaciones', text: 'Los baños del hotel Dvorianskyi tenían distinto equipamiento: unas habitaciones con ducha y otras con bañera. Hacía falta un solo proveedor que fabricara mamparas de ducha y de bañera con el mismo estándar de calidad para todas las habitaciones a la vez.' },
    solution: { title: 'Mamparas de ducha y de bañera', paragraphs: ['Las habitaciones con zona de ducha recibieron mamparas de vidrio; las habitaciones con bañera, mamparas de bañera.', 'Los herrajes y el tipo de vidrio se unificaron en todo el hotel para que el mantenimiento y una futura sustitución de piezas sean iguales en todas las habitaciones.'] },
    tech: { title: 'Materiales', items: [{ label: 'Vidrio', value: 'Vidrio de seguridad' }, { label: 'Herrajes', value: 'Herrajes resistentes a la humedad' }, { label: 'Sellado', value: 'Elementos de estanqueidad' }, { label: 'Ejecución', value: 'A medida' }] },
    process: { title: 'Habitación por habitación, sin cerrar el hotel', fact: 'La medición y la instalación se hicieron habitación por habitación según un calendario acordado con el hotel, para no detener la entrada de huéspedes. Aun con un equipamiento unificado, se comprobó por separado la geometría de cada baño.' },
    result: { title: 'Resultado', text: 'El hotel tiene mamparas de ducha y de bañera de la misma calidad en todas las habitaciones, lo que simplifica el mantenimiento y la sustitución de piezas.' },
    benefits: { title: 'Por qué los hoteles eligen duchas de vidrio', note: 'Ventajas de las duchas de vidrio para hoteles en general, no datos de este proyecto.', items: [{ title: 'Un mismo estándar', text: 'El mismo vidrio y los mismos herrajes en cada habitación.' }, { title: 'Mantenimiento sencillo', text: 'Las piezas iguales se revisan y sustituyen con facilidad.' }, { title: 'Superficies higiénicas', text: 'El vidrio liso se limpia rápido entre huéspedes.' }, { title: 'Sin interrupciones', text: 'La instalación sigue el calendario de ocupación del hotel.' }] },
    service: { hubId: 'showers', title: 'Servicio relacionado', text: 'Tipos de mampara, vidrio y herrajes, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Fabricaremos mamparas de vidrio para su hotel o su casa.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Se puede adaptar una solución similar a otro hotel?', 'Sí. Diseñamos cada estructura según las medidas reales, la geometría de cada baño, las condiciones de anclaje y sus preferencias de vidrio y herrajes.'],
      ['¿Qué necesitan para un presupuesto orientativo?', 'Envíenos la ubicación, el número de habitaciones, medidas aproximadas y fotos de los baños tipo. Después concretamos la configuración.'],
      ['¿Está incluida la instalación?', 'Sí, Space Glass puede encargarse de la medición, la fabricación, el envío y la instalación profesional. El alcance final figura en la oferta.']
    ],
    requestExample: 'mamparas de ducha y de bañera para 20 habitaciones de hotel, ubicación'
  },
  nofilters: {
    seo: { title: 'Espejos para el salón de belleza Nofilters en Odesa | Space Glass', description: 'Espejos ovalados de diseño individual para los puestos del salón de belleza Nofilters en Odesa: el encargo, la solución y el interior terminado.' },
    h1: 'Espejos para el salón de belleza Nofilters en Odesa',
    cardTitle: 'Espejos para un salón de belleza en Odesa',
    city: 'Odesa',
    objectType: 'Salón de belleza Nofilters',
    constructionType: 'Espejos para un salón de belleza',
    shortDescription: 'Espejos ovalados de diseño individual con canto acabado para los puestos de trabajo del salón de belleza Nofilters en Odesa.',
    categoryLabel: 'Espejos',
    facts: [
      { label: 'Proyecto', value: 'Salón de belleza Nofilters' },
      { label: 'Ciudad', value: 'Odesa' },
      { label: 'Productos', value: 'Espejos para puestos de trabajo' },
      { label: 'Forma', value: 'Ovalada, diseño individual' },
      { label: 'Canto', value: 'Acabado' }
    ],
    coverAlt: 'Tres espejos ovalados en fila sobre la pared verde oscuro del salón Nofilters, cada uno frente a un sillón',
    heroCaption: 'Una fila de espejos ovalados en los puestos de trabajo',
    galleryAlts: ['Espejo ovalado con contorno oscuro junto a un sillón del salón Nofilters'],
    galleryTitle: 'Espejos en el interior del salón',
    about: { title: 'Espejos como parte del concepto del salón', paragraphs: ['Nofilters es un salón de belleza en Odesa. Space Glass fabricó los espejos para los puestos de trabajo: espejos de forma individual con canto acabado.', 'En un salón, el espejo es herramienta de trabajo y a la vez el elemento más visible de la sala, por eso se fabricaron con un diseño individual acorde con el concepto del interior.'] },
    task: { title: 'El encargo del cliente', text: 'El salón buscaba espejos que crearan un interior moderno y con estilo, acorde con el concepto del local. Los espejos eran para los puestos de trabajo.' },
    solution: { title: 'Un espejo ovalado para cada puesto', paragraphs: ['Para cada puesto se fabricó un espejo de diseño individual. La foto muestra una fila de tres espejos ovalados sobre una pared verde oscuro, cada uno frente a su sillón y con la misma separación entre ellos.', 'Un contorno oscuro en el borde separa cada espejo de la pared y une los tres espejos en una sola composición.', 'Otro espejo ovalado está instalado junto a un puesto independiente.'] },
    tech: { title: 'Detalles técnicos', items: [{ label: 'Forma', value: 'Ovalada, diseño individual' }, { label: 'Canto', value: 'Acabado' }, { label: 'Uso', value: 'Puestos de trabajo' }, { label: 'Fabricación', value: 'Por separado para cada puesto' }] },
    process: { title: 'Cómo se realizó', fact: 'Los espejos se instalaron una vez terminados los acabados del salón, sobre paredes ya acabadas.', general: { label: 'Cómo trabajamos los espejos para locales comerciales', steps: [{ title: 'Medición', text: 'Medimos las paredes y marcamos la posición de los puestos.' }, { title: 'Forma y distribución', text: 'Acordamos la forma de los espejos y su posición en la pared.' }, { title: 'Fabricación', text: 'Los espejos se cortan con la forma acordada.' }, { title: 'Instalación', text: 'Instalamos los espejos en las paredes preparadas.' }] } },
    result: { title: 'Resultado', text: 'El salón tiene un interior coherente: los espejos de los puestos comparten estilo y refuerzan el concepto del local.' },
    benefits: { title: 'Por qué esta solución conviene a los salones', note: 'Ventajas de este tipo de espejo en general, no datos de este proyecto.', items: [{ title: 'Un espejo por puesto', text: 'Profesional y cliente trabajan con su propio espejo; los puestos vecinos no distraen.' }, { title: 'Sin esquinas', text: 'El óvalo resulta más suave que un rectángulo y no tiene esquinas con las que tropezar.' }, { title: 'A la medida del espacio', text: 'El espejo se fabrica según la altura del sillón y el ancho del puesto.' }, { title: 'Canto acabado', text: 'Un canto liso queda limpio y no necesita un marco pesado.' }] },
    service: { hubId: 'mirrors', title: 'Servicio relacionado', text: 'Tipos de espejos, cantos e iluminación, en la página del servicio.' },
    cta: { title: '¿Le gusta este proyecto?', text: 'Fabricaremos espejos a sus medidas.', button: 'Pedir presupuesto' },
    faqTitle: 'Preguntas sobre el proyecto y el pedido',
    faq: [
      ['¿Pueden hacer espejos a mis medidas?', 'Sí. Definimos el tamaño y la forma tras la medición, según la pared, el mobiliario y la posición de los puestos.'],
      ['¿Puedo pedir un espejo de otra forma?', 'Sí. Además de ovalados, hacemos espejos redondos, rectangulares y de contorno personalizado a partir de un boceto o proyecto.'],
      ['¿Pueden tener todos los puestos el mismo espejo?', 'Sí, elegimos una forma y un tamaño para todos los puestos para que la sala resulte coherente.'],
      ['¿Cuánto dura la instalación de los espejos?', 'Depende del número de espejos, su tamaño y el método de fijación. Acordamos el calendario después de la medición.'],
      ['¿Se pueden instalar sin cerrar el salón?', 'Sí, la instalación puede hacerse en un día de cierre o fuera del horario del salón.']
    ],
    requestExample: 'espejos para 4 puestos de un salón, forma, ubicación'
  }
};
