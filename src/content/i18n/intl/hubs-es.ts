// ES hub pages (español neutro profesional, con términos habituales en España: mampara, cortinas de
// cristal, muro cortina…). Datos como en las páginas UA de la misma sección.
import type { HubCommon, HubCopy } from './types';

export const hubCommonEs: HubCommon = {
  home: 'Inicio',
  request: 'Pedir presupuesto',
  typesLinkLabel: 'Ver',
  processEyebrow: 'Proceso',
  processTitle: 'De la solicitud a la instalación',
  processSteps: [
    ['Solicitud', 'Fotos, plano o medidas aproximadas'],
    ['Asesoramiento', 'Sistema, vidrio y herrajes'],
    ['Medición', 'Medidas exactas en obra'],
    ['Plano', 'Medidas y anclajes para aprobar'],
    ['Fabricación', 'Vidrio templado a medida'],
    ['Instalación', 'Montaje, ajuste y entrega']
  ],
  areaEyebrow: 'Dónde trabajamos',
  areaTitle: 'Medición e instalación en Kyiv, Odesa y Lviv',
  areaParagraphs: [
    'Nuestros equipos realizan la medición, la fabricación y la instalación en Kyiv, Odesa y Lviv y sus regiones. Los proyectos en otras partes de Ucrania se acuerdan de forma individual.',
    'También podemos enviar productos y estructuras seleccionados a otros países europeos: envíenos planos o fotos y la ubicación, y le diremos qué podemos suministrar y cómo.'
  ],
  offices: [['Kyiv', 'oficina e instalación'], ['Odesa', 'oficina e instalación'], ['Lviv', 'oficina e instalación']],
  projectsEyebrow: 'Portafolio',
  projectsTitle: 'Proyectos realizados',
  allProjects: 'Todos los proyectos',
  relatedEyebrow: 'Relacionado',
  relatedTitle: 'Más soluciones'
};

export const hubsEs: Record<string, HubCopy> = {
  services: {
    meta: { title: 'Productos y servicios en vidrio y aluminio | Space Glass', description: 'Diseño, medición, fabricación propia, envío, instalación y servicio de estructuras de vidrio y aluminio a medida para viviendas y proyectos comerciales.' },
    name: 'Productos y servicios',
    eyebrow: 'Productos y servicios de Space Glass',
    h1: 'Estructuras de vidrio y aluminio a medida, llave en mano',
    lead: 'Diseñamos, fabricamos e instalamos estructuras de vidrio y aluminio a medida: mamparas de ducha, tabiques de vidrio, barandillas, puertas, fachadas, cortinas de cristal, espejos, jardines de invierno y marquesinas. Un solo equipo del primer boceto a la instalación terminada.',
    heroAlt: 'Diseño de estructuras de vidrio en Space Glass: planos, muestras de vidrio y preparación de la instalación',
    explore: 'Ver productos',
    intro: {
      title: 'Todo lo que necesita su proyecto, en un solo equipo',
      paragraphs: [
        'Space Glass coordina todo el recorrido de una estructura para que la solución técnica, la fabricación y la instalación funcionen como un único proceso. Es clave allí donde el vidrio se encuentra con paredes, suelos y otros oficios: tolerancias, anclajes y secuencia se planifican antes de cortar.',
        'Medimos la obra, elegimos sistema, vidrio y herrajes, preparamos planos y especificaciones, fabricamos con nuestra maquinaria según las medidas aprobadas, enviamos e instalamos, y seguimos disponibles para ajustes y servicio.',
        'Desde 2014 hemos realizado más de 5000 proyectos para viviendas y empresas e instalado más de 50 000 m² de acristalamiento.'
      ],
      spec: [['5000+ proyectos', 'para viviendas y empresas'], ['50 000+ m²', 'de acristalamiento instalado'], ['10+ años', 'de experiencia práctica'], ['Kyiv · Odesa · Lviv', 'oficinas y equipos de instalación']]
    },
    types: {
      eyebrow: 'Productos',
      title: 'Qué fabricamos',
      intro: 'Elija un área: cada página explica los tipos, las opciones de vidrio y cómo trabajamos.',
      items: [
        ['Mamparas de ducha', 'Mamparas walk-in, de esquina, en hornacina, correderas y plegables, mamparas de bañera.'],
        ['Tabiques de vidrio', 'Tabiques loft, sin perfiles, correderos y plegables para viviendas y oficinas.'],
        ['Puertas de vidrio', 'Puertas abatibles, correderas, pivotantes y con marco de aluminio.'],
        ['Barandillas de vidrio', 'Barandillas sin postes y con postes para escaleras, balcones, terrazas y piscinas.'],
        ['Espejos a medida', 'Espejos LED, con marco y de pared, paredes de espejo para salones y gimnasios.'],
        ['Marquesinas de vidrio', 'Marquesinas de entrada en voladizo, con tirantes, sobre soportes o con marco.'],
        ['Cortinas de cristal', 'Sistemas plegables, correderos y guillotina para terrazas y balcones.'],
        ['Ventanas y puertas de aluminio', 'Ventanas, puertas y correderas elevables con rotura de puente térmico.'],
        ['Jardines de invierno', 'Ampliaciones acristaladas de aluminio con techo de vidrio y puertas correderas.'],
        ['Fachadas de vidrio', 'Muro cortina, vidrio estructural y fachadas modulares, escaparates y accesos.'],
        ['Vidrio para empresas', 'Soluciones para hoteles, restaurantes, oficinas, comercios y clínicas.']
      ]
    },
    benefits: {
      eyebrow: 'Servicio integral',
      title: 'Seis fases, un equipo responsable',
      items: [
        ['Medición y asesoramiento', 'Medidas exactas, evaluación de la obra y la solución técnica adecuada.'],
        ['Diseño', 'Planos, detalles de encuentro y elección de vidrio, perfiles, herrajes y anclajes.'],
        ['Fabricación', 'Estructuras fabricadas según el proyecto aprobado con maquinaria propia.'],
        ['Envío', 'Embalaje profesional y transporte seguro de las estructuras terminadas.'],
        ['Instalación', 'Montaje, ajuste, sellado y preparación para el uso diario.'],
        ['Garantía y servicio', '5 años en el vidrio, 2 en los herrajes y 1 en la instalación, y servicio posterior.']
      ]
    },
    faq: {
      title: 'Preguntas antes de empezar',
      intro: 'Presupuestos, mediciones, planos, envío, instalación, garantía y servicio.',
      items: [
        ['¿Cómo obtengo un presupuesto orientativo?', 'Envíe fotos de la obra, medidas aproximadas y una breve descripción a través del formulario. Valoramos el tipo de estructura y le respondemos con una propuesta y una estimación.'],
        ['¿Qué debo enviar para el presupuesto?', 'Fotos de la zona de instalación, medidas aproximadas y la ubicación. Si tiene planos, un proyecto de interiorismo o preferencias de vidrio y herrajes, añádalos.'],
        ['¿Hacen mediciones en obra?', 'Sí. Una medición profesional registra la geometría real y los soportes de anclaje, imprescindible para una fabricación precisa.'],
        ['¿Dónde ofrecen medición?', 'Nuestros equipos trabajan en Kyiv, Odesa y Lviv y sus regiones. Otras ubicaciones se acuerdan según la estructura y la logística.'],
        ['¿Trabajan con planos DWG o PDF?', 'Sí. Revisamos los planos de arquitectos y diseñadores, aclaramos los encuentros y adaptamos la solución a las condiciones reales.'],
        ['¿Preparan planos técnicos?', 'Sí. Antes de fabricar, nuestro equipo prepara planos, detalles de anclaje y una especificación de materiales para su aprobación.'],
        ['¿Puedo pedir la estructura sin instalación?', 'Sí, para algunos sistemas: si tiene instaladores propios, suministramos la estructura con documentación técnica y recomendaciones de montaje.'],
        ['¿Envían fuera de Ucrania?', 'Podemos enviar productos y estructuras seleccionados a países europeos. El envío y la instalación en el extranjero se acuerdan de forma individual para cada proyecto.'],
        ['¿Cuánto dura un proyecto?', 'Las estructuras de vidrio, hasta 20 días laborables, y las de aluminio, hasta 30 días laborables tras aprobar todos los detalles del proyecto.'],
        ['¿Qué garantía ofrecen?', '5 años en el vidrio, 2 años en los herrajes y 1 año en la instalación, además de servicio tras la entrega: ajustes y sustitución de piezas.']
      ]
    },
    form: { title: 'Cuéntenos su proyecto', text: 'Envíe fotos, un plano o medidas: elegiremos la solución adecuada y le prepararemos un presupuesto orientativo.', optionsLabel: 'Producto', options: ['Mampara de ducha', 'Tabique de vidrio', 'Puerta de vidrio', 'Barandilla de vidrio', 'Espejo', 'Marquesina de vidrio', 'Cortinas de cristal', 'Ventanas y puertas de aluminio', 'Jardín de invierno', 'Fachada de vidrio', 'Proyecto comercial'], commentPlaceholder: 'Tipo de estructura, medidas aproximadas, ubicación', product: 'Productos y servicios' }
  },

  showers: {
    meta: { title: 'Mamparas de ducha de vidrio a medida | Space Glass', description: 'Mamparas de ducha de vidrio a medida: walk-in, de esquina, en hornacina, correderas, plegables y de bañera. Vidrio templado de 8–10 mm.' },
    name: 'Mamparas de ducha',
    eyebrow: 'Mamparas de ducha',
    h1: 'Mamparas de ducha de vidrio a medida',
    lead: 'Mamparas walk-in, duchas de esquina y en hornacina, puertas correderas y plegables, mamparas de bañera y duchas pentagonales, en vidrio templado de seguridad a la medida exacta de su baño y con herrajes en el acabado que elija.',
    heroAlt: 'Mampara de ducha de vidrio sin perfiles en un baño moderno',
    explore: 'Ver tipos de mampara',
    intro: {
      title: 'Una ducha diseñada para su baño',
      paragraphs: [
        'Las cabinas estándar rara vez encajan en un baño real: las paredes no forman ángulos perfectos, las hornacinas tienen su propio ancho y el alicatado fija la geometría final. Por eso fabricamos cada mampara a medida, desde un panel walk-in hasta una ducha de esquina o pentagonal completa.',
        'La solución base es vidrio templado de 8 mm; usamos 10 mm cuando el tamaño y el diseño lo requieren. Usted elige el vidrio —transparente, extraclaro, mate, gris, bronce o acanalado— y el acabado de los herrajes: cromo, negro, acero cepillado, oro, latón o bronce.',
        'Tomamos las medidas definitivas con el alicatado y el suelo o el plato de ducha terminados, acordamos el plano con usted e instalamos la mampara con puertas selladas y ajustadas.'
      ],
      spec: [['Vidrio 8–10 mm', 'templado de seguridad'], ['6 tipos de vidrio', 'transparente, extraclaro, mate, tintado, acanalado'], ['6 acabados de herrajes', 'cromo, negro, acero, oro, latón, bronce'], ['Con o sin plato', 'también a ras de suelo']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Qué mamparas fabricamos',
      intro: 'Elija la distribución: adaptamos el vidrio, el tipo de puerta y los herrajes a su baño.',
      items: [
        ['Mamparas walk-in', 'Paneles fijos sin puerta: una solución minimalista a la medida de la zona de ducha.'],
        ['Puertas de ducha de vidrio', 'Una puerta para hornacina o entre pared y panel fijo, abatible o corredera.'],
        ['Mamparas de esquina', 'Dos lados de vidrio forman la ducha en la esquina, con la entrada donde la necesite.'],
        ['Mamparas correderas', 'Las hojas se deslizan por un carril y no necesitan espacio delante de la ducha.'],
        ['Mamparas para hornacina', 'Una puerta de vidrio, o puerta con fijo, para un hueco entre tres paredes.'],
        ['Puertas plegables', 'Puertas de vidrio plegables para duchas compactas, hornacinas y bañeras donde una abatible ocupa demasiado.'],
        ['Mamparas de bañera', 'Paneles fijos, abatibles o plegables sobre la bañera en lugar de una cortina.'],
        ['Duchas pentagonales', 'Duchas con frente achaflanado para la esquina, que ahorran espacio en el baño.']
      ]
    },
    options: {
      eyebrow: 'Vidrio y herrajes',
      title: 'Vidrio, herrajes y suelo de la ducha',
      intro: 'Los detalles que deciden el aspecto y el uso diario.',
      items: [
        ['Vidrio transparente y extraclaro', 'El transparente mantiene la luz; el extraclaro no tiene canto verde y reproduce mejor los colores.'],
        ['Mate, tintado y acanalado', 'El mate da privacidad y disimula las marcas de agua; el gris y el bronce aportan profundidad; el acanalado da textura sin quitar luz.'],
        ['Bisagras, barras y juntas', 'Las bisagras fijan el ángulo de apertura, las barras estabilizan paneles anchos y las juntas y perfiles magnéticos reducen las salpicaduras.'],
        ['Con plato o a ras de suelo', 'El plato simplifica el desagüe y la impermeabilización; la ducha a ras de suelo necesita pendiente, impermeabilización y sumidero: lo tenemos en cuenta antes de la medición final.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué una mampara de vidrio',
      items: [
        ['Ajuste exacto', 'A la medida real de la ducha, la hornacina o la esquina, sin tamaños estándar.'],
        ['Vidrio de seguridad', 'El vidrio templado se rompe en fragmentos romos si llega a dañarse.'],
        ['Luz y amplitud', 'El vidrio mantiene el baño abierto y visualmente más grande.'],
        ['Fácil de limpiar', 'Superficies lisas y pocos herrajes: secar tras la ducha reduce la cal.'],
        ['Su estilo', 'Seis vidrios y seis acabados para combinar con azulejos, grifería y muebles.'],
        ['Garantía', '5 años en el vidrio, 2 años en los herrajes y 1 año en la instalación.']
      ]
    },
    faq: {
      title: 'Mamparas de ducha: preguntas frecuentes',
      intro: 'Medidas, vidrio, herrajes, plato, estanqueidad y cuidado.',
      items: [
        ['¿Puedo encargar una mampara a medida?', 'Sí. Fabricamos las mamparas según las medidas reales de su baño. Antes de fabricar, medimos y acordamos con usted el diseño y el plano.'],
        ['¿Qué vidrio se usa en las mamparas?', 'Vidrio templado de seguridad. El tipo y el grosor se eligen según las medidas y el diseño de la ducha.'],
        ['¿Qué grosor de vidrio necesita una ducha?', 'Nuestro estándar es vidrio templado de 8 mm. Usamos 10 mm u otras soluciones cuando el tamaño y el diseño lo requieren.'],
        ['¿Cuándo se mide la ducha?', 'Recomendamos la medición final al terminar los trabajos que definen la geometría: alicatado, preparación del suelo o plato instalado.'],
        ['¿Se puede instalar sin plato de ducha?', 'Sí, sobre un suelo preparado con un desagüe bien resuelto. Tenemos en cuenta la geometría del suelo al medir.'],
        ['¿Se puede hacer con paredes torcidas?', 'Sí. Medimos las desviaciones de paredes y esquinas y las tenemos en cuenta en el plano y en el corte del vidrio.'],
        ['¿Qué acabados de herrajes hay?', 'Según el sistema: cromo, negro, acero cepillado, oro, latón y bronce. El acabado se acuerda antes de fabricar.'],
        ['¿Es estanca una mampara sin perfiles?', 'Depende del diseño, las juntas, la dirección del agua y la preparación de la zona. Una mampara sin perfiles no es una cabina totalmente cerrada: planificamos juntas y desagüe en consecuencia.'],
        ['¿De qué depende el precio?', 'Del ancho y el alto, el número de paneles, el tipo de apertura, el vidrio, los herrajes, la complejidad de fabricación, el envío y la instalación.'],
        ['¿Cómo se cuida el vidrio?', 'Retire el agua del vidrio después de ducharse y límpielo con productos adecuados: así se reduce la cal.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe fotos de su baño y medidas aproximadas: le propondremos una distribución y un presupuesto.', optionsLabel: 'Tipo de mampara', options: ['Mampara walk-in', 'Puerta de ducha', 'Mampara de esquina', 'Mampara corredera', 'Mampara para hornacina', 'Puerta plegable', 'Mampara de bañera', 'Ducha pentagonal'], commentPlaceholder: 'Ancho, alto y fondo de la ducha, plato o a ras de suelo, ubicación', product: 'Mamparas de ducha' }
  },

  partitions: {
    meta: { title: 'Tabiques de vidrio loft y correderos | Space Glass', description: 'Tabiques y mamparas divisorias de vidrio para viviendas y oficinas: loft, sin perfiles, correderos y plegables. Vidrio templado o laminado de 8–12 mm.' },
    name: 'Tabiques de vidrio',
    eyebrow: 'Tabiques de vidrio',
    h1: 'Tabiques de vidrio a medida',
    lead: 'Tabiques de vidrio para pisos, casas, oficinas, clínicas y salones: tabiques loft, paredes de vidrio sin perfiles, sistemas correderos, telescópicos y plegables y tabiques con puerta. Divida los espacios sin perder luz natural, con un solo equipo de principio a fin.',
    heroAlt: 'Tabique de vidrio entre un dormitorio y un vestidor',
    explore: 'Ver tipos de tabique',
    intro: {
      title: 'Zonificar sin paredes opacas',
      paragraphs: [
        'Un tabique de vidrio divide el espacio en zonas pero conserva la luz y la sensación de amplitud. Es más fino que una pared, suele instalarse en un día y no requiere obra húmeda, por eso funciona igual de bien en viviendas y en oficinas.',
        'Fabricamos tabiques fijos con perfil fino o con anclajes puntuales, tabiques loft negros con travesaños, tabiques con puertas abatibles, correderas o pivotantes y sistemas correderos colgados, guiados por el suelo, telescópicos y plegables.',
        'El vidrio es templado o laminado de 8–12 mm, transparente, mate, acanalado o tintado; los perfiles pueden ser de cualquier color.'
      ],
      spec: [['9 tipos', 'del loft a los plegables'], ['Vidrio 8–12 mm', 'templado o laminado'], ['Instalación en 1 día', 'en una vivienda típica, sin obra'], ['Hasta 20 días laborables', 'de fabricación tras la aprobación']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Qué tabiques de vidrio fabricamos',
      intro: 'Fijos, correderos o plegables, con o sin puerta, según el espacio y su uso.',
      items: [
        ['Tabiques loft', 'Vidrio con perfil fino negro de aluminio y travesaños: el clásico estilo industrial.'],
        ['Tabiques sin perfiles', 'Vidrio de suelo a techo con pinzas mínimas o perfil oculto: el mínimo marco posible.'],
        ['Tabiques correderos colgados', 'Las hojas cuelgan de un carril en el techo: sin carril ni umbral en el suelo.'],
        ['Tabiques correderos con guía inferior', 'El peso descansa en un carril de suelo, lo que permite hojas más grandes y pesadas.'],
        ['Tabiques telescópicos', 'Varias hojas correderas en carriles paralelos que se recogen una tras otra.'],
        ['Tabiques plegables', 'Las hojas se pliegan o giran y abren todo el hueco cuando se necesita una sola estancia.'],
        ['Tabiques con puerta', 'Puertas de vidrio abatibles, correderas o pivotantes alineadas con el tabique.'],
        ['Mamparas de oficina', 'Salas de reuniones, despachos y zonas abiertas con puertas y vidrio acústico.'],
        ['Tabiques para viviendas', 'Dormitorio y vestidor, cocina y salón, rincón de trabajo: luz en cada zona.']
      ]
    },
    options: {
      eyebrow: 'Funcionamiento',
      title: 'Fijo, corredero o plegable',
      intro: 'El tipo de tabique decide el paso, el espacio necesario y el aspecto.',
      items: [
        ['Fijo', 'Paneles fijos en perfil o con pinzas: tabiques loft y sin perfiles.'],
        ['Con puerta', 'Puertas abatibles, correderas o pivotantes alineadas con el tabique.'],
        ['Corredero', 'Colgado de un carril superior o guiado por el suelo, también telescópico.'],
        ['Plegable', 'Hojas plegables o pivotantes que liberan todo el hueco.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué un tabique de vidrio',
      items: [
        ['Luz natural', 'El vidrio divide el espacio sin quitar la luz.'],
        ['Rápido y limpio', 'Suele instalarse en un día, sin obra húmeda ni polvo.'],
        ['Seguridad', 'Vidrio templado y laminado: sin aristas cortantes.'],
        ['Menos ruido', 'Las juntas y el vidrio laminado reducen el ruido de forma notable.'],
        ['Acorde al interior', 'Vidrio transparente, mate o acanalado; perfiles de cualquier color.'],
        ['Garantía', '5 años en el vidrio, 2 en los herrajes y 1 en la instalación.']
      ]
    },
    faq: {
      title: 'Tabiques de vidrio: preguntas frecuentes',
      intro: 'Tipos, vidrio, puertas, aislamiento acústico e instalación.',
      items: [
        ['¿Qué tipos de tabiques de vidrio existen?', 'Fijos (loft y sin perfiles), con puerta, correderos —colgados, con guía inferior y telescópicos— y plegables.'],
        ['¿Qué vidrio se utiliza?', 'Vidrio templado de 8–12 mm o vidrio laminado de seguridad: ambos son seguros y resistentes.'],
        ['¿Qué tabique conviene en una vivienda?', 'Para un estilo industrial, un tabique loft con perfil negro; para un look minimalista, sin perfiles; si no hay sitio para una puerta abatible, un sistema corredero.'],
        ['¿Qué tabique conviene en una oficina?', 'Despachos: tabiques con puerta; salas de reuniones en espacios abiertos: cubos de vidrio; mucho tránsito: puertas pivotantes.'],
        ['¿Aísla del ruido un tabique de vidrio?', 'En parte; con vidrio laminado y juntas la diferencia es clara.'],
        ['¿Se puede usar vidrio mate o tintado?', 'Sí: vidrio mate, tintado y acanalado, además de franjas al ácido o un logotipo.'],
        ['¿Qué diferencia hay entre colgado y con guía inferior?', 'El colgado apoya su peso en el techo y no tiene umbral; el de guía inferior lo apoya en el suelo, por lo que admite hojas más grandes.'],
        ['¿Se puede instalar con la reforma terminada?', 'Sí, la instalación es limpia y no requiere obra húmeda.'],
        ['¿Cuánto tardan la fabricación y la instalación?', 'La fabricación, hasta 20 días laborables tras aprobar todos los detalles; la instalación suele llevar un día en una vivienda y 1–3 días en una oficina.'],
        ['¿Preparan planos?', 'Sí, acordamos con usted medidas, travesaños y puertas antes de fabricar.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe un plano o fotos del espacio con medidas: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Tipo de tabique', options: ['Tabique loft', 'Tabique sin perfiles', 'Tabique corredero colgado', 'Tabique corredero con guía inferior', 'Tabique telescópico', 'Tabique plegable', 'Tabique con puerta', 'Mampara de oficina'], commentPlaceholder: 'Espacio (vivienda, oficina), medidas, puertas, vidrio, ubicación', product: 'Tabiques de vidrio' }
  },

  doors: {
    meta: { title: 'Puertas de vidrio correderas y abatibles | Space Glass', description: 'Puertas de vidrio de interior a medida: abatibles, correderas, pivotantes, con marco de aluminio y al ácido. Vidrio templado o laminado de 8–10 mm.' },
    name: 'Puertas de vidrio',
    eyebrow: 'Puertas de vidrio',
    h1: 'Puertas de vidrio a medida',
    lead: 'Puertas de vidrio abatibles, correderas, pivotantes y con marco de aluminio, a la medida de su hueco, para viviendas, oficinas y clínicas. Vidrio templado o laminado, herrajes fiables, mateado y decoración según su diseño.',
    heroAlt: 'Puertas correderas de vidrio con marco de aluminio entre el salón y el dormitorio',
    explore: 'Ver tipos de puerta',
    intro: {
      title: 'Puertas que dejan pasar la luz',
      paragraphs: [
        'Las puertas de vidrio hacen el interior más luminoso: la luz natural llega a pasillos y estancias sin ventanas, y el espacio no se fragmenta con hojas opacas. El vidrio no se hincha, no se deforma ni se decolora, así que funciona igual de bien en baños y cocinas.',
        'Fabricamos las puertas según el hueco real: abatibles sin marco y puertas loft con perfil fino, correderas con rodamientos o con marco y pivotantes para entradas con mucho tránsito. Elegimos vidrio, decoración y herrajes para cada proyecto.',
        'Solo usamos vidrio templado (8–10 mm) o laminado; los taladros para los herrajes se hacen antes del templado.'
      ],
      spec: [['Vidrio 8–12 mm', 'templado o laminado'], ['A medida del hueco', 'sin tapajuntas ni precercos'], ['Decoración y logotipo', 'mateado según su diseño'], ['Kyiv · Odesa · Lviv', 'medición, instalación y servicio']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Qué puertas de vidrio fabricamos',
      intro: 'Elija el tipo de apertura: elegimos vidrio, herrajes y cerradura según el uso.',
      items: [
        ['Puertas abatibles de vidrio', 'Puertas sin marco con bisagras fijadas a la pared o a un panel de vidrio: el aspecto más limpio.'],
        ['Puertas correderas de vidrio', 'La hoja se desliza junto a la pared y no ocupa espacio delante del hueco.'],
        ['Puertas pivotantes', 'Puertas de vaivén con cierrapuertas de suelo para entradas con tránsito constante.'],
        ['Puertas con marco de aluminio', 'Vidrio en perfil fino de aluminio con travesaños: rígidas y con cerradura completa.'],
        ['Puertas de vidrio al ácido', 'Mateado total o parcial, franjas o motivos para dar privacidad.'],
        ['Puertas de vidrio para oficina', 'Puertas para despachos y salas de reuniones, a menudo integradas en un tabique.']
      ]
    },
    options: {
      eyebrow: 'Vidrio',
      title: 'Vidrio y decoración para puertas',
      intro: 'En las puertas solo se usa vidrio de seguridad. Usted elige la transparencia y el diseño.',
      items: [
        ['Vidrio templado', 'El material base: 8–10 mm, varias veces más resistente que el vidrio común, se rompe en fragmentos romos.'],
        ['Vidrio laminado', 'Dos lunas unidas con lámina: los fragmentos quedan adheridos y aísla mejor del ruido. Para habitaciones infantiles, clínicas y salas de reuniones.'],
        ['Mate y tintado', 'Mateado total o parcial; tintado en masa bronce o gris.'],
        ['Decoración', 'Motivos al chorro de arena, franjas, números de sala o un logotipo a partir de un vector.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué puertas de vidrio',
      items: [
        ['Luz en todas las estancias', 'El vidrio lleva la luz natural a pasillos y habitaciones sin ventanas.'],
        ['A medida del hueco', 'Se corta según la medida real, sin precercos ni tapajuntas.'],
        ['Seguridad', 'Solo vidrio templado o laminado: fragmentos romos o retenidos por la lámina.'],
        ['Resistente a la humedad', 'No se hincha, no se deforma ni se decolora: ideal para baños y cocinas.'],
        ['Privacidad a su gusto', 'Vidrio transparente, mate o tintado, con motivo o logotipo.'],
        ['Durabilidad', 'Herrajes de acero inoxidable y aluminio anodizado que duran años.']
      ]
    },
    faq: {
      title: 'Puertas de vidrio: preguntas frecuentes',
      intro: 'Tipos, vidrio, peso, cerraduras, aislamiento e instalación.',
      items: [
        ['¿Qué tipos de puertas de vidrio hay?', 'Abatibles, correderas y pivotantes, sin marco o con perfil de aluminio (loft). El vidrio puede ser transparente, mate, tintado o decorado.'],
        ['¿Qué vidrio se usa en las puertas?', 'Vidrio templado de seguridad de 8–10 mm o laminado. Los taladros para herrajes se hacen antes del templado.'],
        ['¿Cuánto pesan las puertas de vidrio?', 'Unos 20 kg/m² con vidrio de 8 mm y 25 kg/m² con 10 mm. Una hoja de 800 × 2200 mm en vidrio de 10 mm pesa unos 44 kg.'],
        ['¿Son seguras con niños en casa?', 'Sí. El vidrio templado se rompe en fragmentos romos y el laminado los retiene en la lámina. Se puede añadir una franja mate a la altura de los ojos.'],
        ['¿Hace falta un marco?', 'No: las puertas sin marco se fijan con bisagras directamente a la pared o a un panel de vidrio. Las puertas con perfil pueden llevar marco.'],
        ['¿Qué puerta conviene en un pasillo estrecho?', 'Una corredera: se desliza junto a la pared y no ocupa espacio delante del hueco.'],
        ['¿Puede llevar cerradura?', 'Sí: cerraduras con llave, condenas libre/ocupado, cerraduras magnéticas y electromecánicas.'],
        ['¿Aíslan del ruido?', 'Menos que una pared maciza. Para aislar mejor, vidrio laminado y juntas perimetrales.'],
        ['¿Sirve como puerta de entrada exterior?', 'Un vidrio simple no aísla del frío; para la entrada exterior recomendamos puertas de aluminio con rotura de puente térmico.'],
        ['¿Se puede combinar con un tabique de vidrio?', 'Sí, la puerta se integra en un tabique de vidrio o loft con el mismo estilo.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe una foto y las medidas del hueco: le propondremos el tipo de puerta, el vidrio y los herrajes.', optionsLabel: 'Tipo de puerta', options: ['Puerta abatible', 'Puerta corredera', 'Puerta pivotante', 'Puerta con marco de aluminio', 'Puerta al ácido', 'Puerta de oficina'], commentPlaceholder: 'Medidas del hueco, estancia, vidrio, cerradura, ubicación', product: 'Puertas de vidrio' }
  },

  railings: {
    meta: { title: 'Barandillas de vidrio: escaleras y balcones | Space Glass', description: 'Barandillas de vidrio para escaleras, balcones, terrazas y piscinas: sin postes, con anclajes puntuales o con postes. Siempre vidrio laminado.' },
    name: 'Barandillas de vidrio',
    eyebrow: 'Barandillas de vidrio',
    h1: 'Barandillas de vidrio a medida',
    lead: 'Barandillas para escaleras, balcones, terrazas y piscinas con sistemas de ingeniería alemana: vidrio sin postes en perfil de base, vidrio con anclajes puntuales, barandillas con postes y pasamanos y balcones franceses. Solo vidrio laminado de seguridad.',
    heroAlt: 'Escalera volada con barandilla de vidrio sin postes en una casa moderna',
    explore: 'Ver tipos de barandilla',
    intro: {
      title: 'Seguridad que no tapa las vistas',
      paragraphs: [
        'Una barandilla de vidrio protege de caídas, del viento y de los desniveles, pero deja pasar la luz y las vistas. Por eso se usa en escaleras y galerías, balcones, terrazas y alrededor de piscinas.',
        'Trabajamos con sistemas de barandillas de ingeniería alemana: perfiles de base sobre el forjado o en su canto, anclajes puntuales, postes de acero inoxidable y balcones franceses. Perfiles y soportes están ensayados para cargas horizontales de hasta 3 kN/m según el sistema.',
        'Toda barandilla lleva vidrio laminado de dos lunas templadas: si una se rompe, la barandilla sigue en su sitio.'
      ],
      spec: [['11 sistemas', 'perfiles, postes, anclajes puntuales, balcones franceses'], ['Vidrio laminado', '8,76–21,52 mm'], ['Hasta 3 kN/m', 'carga horizontal'], ['Hasta 20 días laborables', 'de fabricación tras la aprobación']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Dónde instalamos barandillas de vidrio',
      intro: 'Elija el lugar: elegimos el sistema, el vidrio y el pasamanos.',
      items: [
        ['Barandillas de escalera', 'Vidrio a lo largo de tramos y rellanos: sin postes, con anclajes puntuales o con postes y pasamanos.'],
        ['Barandillas de balcón', 'Una línea de fachada limpia con vidrio sobre el forjado o en su canto.'],
        ['Barandillas de terraza', 'Protección contra el viento sin tapar el jardín ni el paisaje.'],
        ['Vallas de piscina', 'Vidrio desde 1,2 m de altura con herrajes de acero AISI 316 y puerta con cierre automático opcional.'],
        ['Barandillas sin postes', 'Vidrio sujeto en un perfil de base continuo, sin ningún poste.'],
        ['Barandillas con postes', 'Vidrio sujeto con pinzas entre postes de acero inoxidable con pasamanos: una opción económica.']
      ]
    },
    options: {
      eyebrow: 'Vidrio',
      title: 'Vidrio para barandillas',
      intro: 'En las barandillas solo se usa vidrio laminado de seguridad.',
      items: [
        ['Laminado 17,52 y 21,52 mm', 'Dos lunas templadas de 8 o 10 mm con lámina resistente: para perfiles sin postes y anclajes puntuales.'],
        ['Laminado 8,76 y 12,76 mm', 'Dos lunas de 4 o 6 mm: para barandillas con postes, donde las pinzas sujetan el vidrio por ambos lados.'],
        ['Color del vidrio', 'Transparente, extraclaro (sin tono verde), gris y gris oscuro.'],
        ['Mateado y tratamientos', 'Mateado total o parcial para dar privacidad y un tratamiento que repele la suciedad y el agua.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué una barandilla de vidrio',
      items: [
        ['Vistas despejadas', 'El vidrio no tapa el paisaje, el jardín ni el interior.'],
        ['Seguridad', 'Solo vidrio laminado: si una luna se rompe, la barandilla sigue en pie.'],
        ['Ingeniería alemana', 'Perfiles, postes y soportes ensayados para cargas de hasta 3 kN/m.'],
        ['Sin mantenimiento', 'No hay que pintar; el aluminio y el acero inoxidable no se oxidan.'],
        ['Protección del viento', 'En terrazas y balcones el vidrio corta las corrientes y el ruido.'],
        ['A medida', 'Cualquier longitud y forma: recta, en L o en U, esquinas y desniveles.']
      ]
    },
    faq: {
      title: 'Barandillas de vidrio: preguntas frecuentes',
      intro: 'Sistemas, vidrio, altura, cargas e instalación.',
      items: [
        ['¿Qué tipos de barandillas de vidrio hay?', 'Sin postes en perfil de base (vidrio sujeto por abajo), con anclajes puntuales (soportes en el canto del forjado), con postes y pasamanos y balcones franceses.'],
        ['¿Qué vidrio se usa?', 'Solo laminado: 17,52 o 21,52 mm en los sistemas sin postes y 8,76 o 12,76 mm en las barandillas con postes.'],
        ['¿Qué altura debe tener una barandilla?', 'Normalmente desde 0,9 m en escaleras y 1,0–1,1 m en balcones y terrazas. Los perfiles sin postes sujetan vidrio de hasta 1,3 m. Comprobamos la altura según la normativa de edificación aplicable a su obra.'],
        ['¿Es segura una barandilla sin postes?', 'Sí. El perfil sujeta el vidrio en toda su longitud y está diseñado para cargas horizontales de 1–3 kN/m según el sistema.'],
        ['¿Qué es un balcón francés?', 'Una barandilla de vidrio en el hueco de una ventana de suelo a techo: la ventana se puede abrir y el vidrio impide caer. Se fija al marco o a las jambas.'],
        ['¿Sirve el vidrio para una piscina?', 'Sí. Recomendamos al menos 1,2 m de altura y herrajes de acero AISI 316; se puede añadir una puerta de vidrio con cierre.'],
        ['¿Puede el perfil tener el color de la fachada?', 'Sí: aspecto acero inoxidable, negro, antracita, blanco o cualquier color RAL.'],
        ['¿Hace falta pasamanos?', 'En las barandillas sin postes es opcional, pero protege el canto del vidrio y da apoyo. En las de postes forma parte del sistema.'],
        ['¿Resiste el vidrio la helada y el sol?', 'Sí. El laminado templado soporta los cambios de temperatura y la lámina protege de los rayos UV.'],
        ['¿Cuánto tarda la fabricación?', 'Hasta 20 días laborables tras aprobar todos los detalles: el vidrio y los perfiles se fabrican a su medida.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe fotos, la longitud y el tipo de soporte: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Lugar', options: ['Barandilla de escalera', 'Barandilla de balcón', 'Barandilla de terraza', 'Valla de piscina', 'Barandilla sin postes', 'Barandilla con postes', 'Balcón francés'], commentPlaceholder: 'Longitud, altura, soporte (hormigón, acero, madera), pasamanos, ubicación', product: 'Barandillas de vidrio' }
  },

  mirrors: {
    meta: { title: 'Espejos a medida — LED, con marco y de pared | Space Glass', description: 'Espejos a su medida: espejos LED, con marco y de pared, paneles y paredes de espejo para baños, salones de belleza, gimnasios y hoteles.' },
    name: 'Espejos a medida',
    eyebrow: 'Espejos a medida',
    h1: 'Espejos a medida',
    lead: 'Espejos a sus medidas: con iluminación LED, con marco, de pared, paneles y paredes de espejo para gimnasios y salones de belleza. Elegimos la luna, el canto, el marco y la iluminación, y nos encargamos de la medición, la fabricación y la instalación.',
    heroAlt: 'Espejo de pie semicircular Space Glass MOON con iluminación en un dormitorio',
    explore: 'Ver tipos de espejo',
    intro: {
      title: 'Espejos a la medida de su interior',
      paragraphs: [
        'Un espejo de serie rara vez encaja con la pared, el mueble de lavabo o la hornacina: cambian el ancho, la altura de montaje y la posición de luces y enchufes. Por eso fabricamos espejos a medida.',
        'El trabajo es integral: medición o comprobación de medidas, acuerdo de forma, canto, marco e iluminación, fabricación e instalación. La forma, los recortes y los taladros se definen antes de fabricar.',
        'Nuestros modelos LED usan luna de espejo Saint-Gobain MIRALITE PURE, resistente a la corrosión, y tienen protección IP44 para el baño.'
      ],
      spec: [['Medida y forma a elección', 'para la pared, el mueble o la hornacina'], ['Canto a elegir', 'pulido o biselado'], ['Luz LED y antivaho', 'según un esquema eléctrico acordado'], ['IP44', 'modelos LED para el baño']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Tipos de espejos',
      intro: 'Elija el tipo; después acordamos medida, forma, canto, marco, iluminación y montaje.',
      items: [
        ['Espejos LED', 'Luz frontal o perimetral, antivaho opcional y posición del interruptor acordada de antemano.'],
        ['Espejos con marco', 'Marcos de metal, aluminio o decorativos que rematan y protegen el canto.'],
        ['Espejos de pared', 'Espejos grandes para recibidores, salones y dormitorios, bien fijados a la pared.'],
        ['Paneles de espejo', 'Paredes de espejo de varios módulos con un despiece de juntas planificado.'],
        ['Espejos para gimnasios', 'Luna de 4–6 mm con lámina de seguridad y superficie continua para gimnasios y estudios de baile.'],
        ['Espejos para salones', 'Espejos para puestos de trabajo con luz frontal uniforme para salones de belleza y peluquerías.']
      ]
    },
    options: {
      eyebrow: 'Detalles',
      title: 'Canto, luz y montaje',
      intro: 'Lo que acordamos antes de fabricar.',
      items: [
        ['Canto pulido o biselado', 'El canto visto se pule; el bisel crea una refracción decorativa pero reduce algo la superficie útil.'],
        ['Iluminación LED', 'Luz perimetral o frontal, temperatura de color, interruptor y toma de corriente se acuerdan con el esquema eléctrico.'],
        ['Antivaho', 'La calefacción mantiene sin vaho la zona central tras la ducha; no sustituye a la ventilación.'],
        ['Recortes y fijación', 'Los huecos para enchufes o luces se fijan de antemano; la fijación depende del tamaño, el peso, la humedad y la pared.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué un espejo a medida',
      items: [
        ['Ajuste exacto', 'El espejo se adapta a la pared, el mueble o la hornacina, y no al revés.'],
        ['Cualquier forma', 'Rectangular, cuadrada, redonda o personalizada según plantilla.'],
        ['Preparado para el baño', 'Luna resistente a la corrosión e iluminación IP44 en nuestros modelos.'],
        ['Seguridad donde hace falta', 'Lámina de seguridad para gimnasios, estudios y espacios públicos.'],
        ['Proyectos comerciales', 'Despiece de módulos y fijaciones planificados para hoteles, restaurantes y salones.'],
        ['Servicio completo', 'Medición, fabricación, envío e instalación con un solo equipo.']
      ]
    },
    faq: {
      title: 'Espejos a medida: preguntas frecuentes',
      intro: 'Medidas, formas, cantos, iluminación, instalación y proyectos comerciales.',
      items: [
        ['¿De qué depende el precio de un espejo?', 'Del tamaño y la forma, el tipo de luna, el canto (pulido o biselado), la iluminación y el antivaho, los recortes, el marco, el envío y la instalación.'],
        ['¿Hacen espejos a medida?', 'Sí. La mayoría de los espejos se fabrican con medidas acordadas para una pared, un mueble de lavabo o una hornacina concretos.'],
        ['¿Qué formas son posibles?', 'Rectangulares, cuadradas, redondas y personalizadas según plantilla. Un contorno complejo requiere una plantilla precisa y fijaciones planificadas.'],
        ['¿Qué hay que tener en cuenta en un espejo LED?', 'El esquema eléctrico y de iluminación se acuerda antes de fabricar: luz perimetral o frontal, toma de corriente, interruptor y su posición.'],
        ['¿Qué espejo conviene para el baño?', 'Uno preparado para la humedad: tenemos en cuenta el material y el estado de la pared, la ventilación y la posición de la electricidad y la fontanería.'],
        ['¿Cómo se fija un espejo grande o pesado?', 'Según el tamaño, el peso, la humedad y el material de la pared; para el montaje pegado se usan adhesivos especiales para espejos.'],
        ['¿Qué es una pared de espejo?', 'Una superficie continua de espejo formada por varios módulos. El despiece, las medidas de los módulos y la planitud de la pared se planifican de antemano.'],
        ['¿Hacen espejos para gimnasios y salones?', 'Sí: espejos de gimnasio en luna de 4–6 mm con lámina de seguridad y espejos de salón con luz frontal uniforme y buena reproducción del color.'],
        ['¿Cuándo hace falta una medición profesional?', 'La medición final se hace con las superficies acabadas y conociendo la posición de la electricidad y los muebles.'],
        ['¿Puedo encargar el espejo sin instalación?', 'Sí, en parte de los pedidos es posible fabricar y enviar sin instalación, siempre que el transporte sea seguro.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe una foto de la pared y medidas aproximadas: le propondremos la forma, el canto y la iluminación.', optionsLabel: 'Tipo de espejo', options: ['Espejo LED', 'Espejo con marco', 'Espejo de pared', 'Panel / pared de espejo', 'Espejo para gimnasio', 'Espejo para salón'], commentPlaceholder: 'Medidas, forma, iluminación, estancia (baño, recibidor, salón), ubicación', product: 'Espejos a medida' }
  },

  canopies: {
    meta: { title: 'Marquesinas de vidrio para entradas a medida | Space Glass', description: 'Marquesinas de vidrio para viviendas, oficinas y comercios: en voladizo, con tirantes, sobre soportes o con marco. Vidrio laminado y vuelo de hasta 2 m.' },
    name: 'Marquesinas de vidrio',
    eyebrow: 'Marquesinas de vidrio',
    h1: 'Marquesinas de vidrio para entradas',
    lead: 'Marquesinas de vidrio para viviendas, oficinas, comercios y edificios residenciales: en voladizo, con tirantes, sobre soportes, con marco y con protección lateral contra el viento. Sistemas de ingeniería alemana, vidrio laminado y presupuesto a partir de sus fotos.',
    heroAlt: 'Marquesina de vidrio sobre soportes en la entrada de una vivienda',
    explore: 'Ver tipos de marquesina',
    intro: {
      title: 'Protección que deja ver la fachada',
      paragraphs: [
        'Una marquesina de vidrio protege la entrada de la lluvia y la nieve sin oscurecer la puerta ni recargar la fachada. Por eso se coloca sobre las entradas de viviendas, oficinas, comercios, restaurantes y edificios residenciales.',
        'Trabajamos con sistemas de marquesinas de ingeniería alemana: en voladizo con perfil de sujeción, con tirantes y soportes de acero inoxidable y con marcos de aluminio o acero con canalón e iluminación.',
        'Solo se usa vidrio laminado de lunas templadas: si se daña, los fragmentos quedan adheridos a la lámina.'
      ],
      spec: [['11 sistemas', 'voladizo, tirantes, soportes, marcos'], ['Vidrio laminado', 'los fragmentos quedan en la lámina'], ['Hasta 2 m', 'de vuelo'], ['Pocas horas', 'de instalación habitual']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Qué marquesinas de vidrio fabricamos',
      intro: 'El tipo de fijación determina el vuelo de la marquesina y el aspecto de la fachada.',
      items: [
        ['Marquesinas en voladizo', 'Fijadas solo a la pared, sin tirantes ni apoyos: el aspecto más limpio.'],
        ['Marquesinas con tirantes', 'Tirantes de acero inoxidable que llevan la carga a la pared superior, para vuelos mayores.'],
        ['Marquesinas sobre soportes', 'Soportes bajo el vidrio cuando sobre la puerta no hay sitio para tirantes.'],
        ['Marquesinas con marco', 'Marco de aluminio o acero con canalón e iluminación, para superficies grandes.'],
        ['Marquesinas con protección lateral', 'Un panel lateral de vidrio que protege la entrada del viento y la lluvia.'],
        ['Marquesinas para empresas', 'Marquesinas grandes para comercios, oficinas y restaurantes, también con logotipo o luz.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué una marquesina de vidrio',
      items: [
        ['Entrada seca', 'La marquesina protege la puerta y a las personas de la lluvia y la nieve.'],
        ['Luz natural', 'El vidrio no oscurece la entrada ni oculta la fachada.'],
        ['Seguridad', 'Solo vidrio laminado: los fragmentos quedan en la lámina.'],
        ['Ingeniería alemana', 'Cargas de nieve ensayadas y herrajes de acero inoxidable.'],
        ['Acorde a la fachada', 'Vidrio transparente, extraclaro o mate; soportes en cualquier color RAL.'],
        ['Montaje rápido', 'Normalmente unas pocas horas en obra.']
      ]
    },
    faq: {
      title: 'Marquesinas de vidrio: preguntas frecuentes',
      intro: 'Tipos, vidrio, carga de nieve, desagüe e instalación.',
      items: [
        ['¿Qué tipos de marquesinas de vidrio hay?', 'En voladizo (solo a la pared), con tirantes, sobre soportes, con marco y con panel lateral de vidrio contra el viento.'],
        ['¿Qué vidrio se usa en una marquesina?', 'Solo vidrio laminado de lunas templadas: si se daña, los fragmentos quedan adheridos a la lámina.'],
        ['¿Soporta la nieve?', 'Sí, los sistemas están calculados para cargas de nieve; el vuelo y el vidrio se eligen según la zona.'],
        ['¿Por dónde se evacua el agua?', 'La marquesina tiene pendiente hacia fuera; si hace falta, se añade canalón y bajante.'],
        ['¿Se puede colocar en una fachada aislada?', 'Sí, con fijaciones especiales a través del aislamiento.'],
        ['¿Qué vuelo puede tener?', 'De 50 cm a 2 m según el sistema.'],
        ['¿Puede llevar iluminación?', 'Sí, focos LED en un sistema con marco o iluminación independiente.'],
        ['¿Se oxidan los soportes?', 'No: acero inoxidable o aluminio con recubrimiento.'],
        ['¿Cuánto tardan la fabricación y la instalación?', 'La fabricación, hasta 20 días laborables tras la aprobación; la instalación suele llevar unas pocas horas.'],
        ['¿Cómo se cuida una marquesina de vidrio?', 'Límpiela con limpiacristales unas cuantas veces por temporada.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe una foto de la entrada y medidas aproximadas: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Tipo de marquesina', options: ['Marquesina en voladizo', 'Marquesina con tirantes', 'Marquesina sobre soportes', 'Marquesina con marco', 'Marquesina con protección lateral', 'Marquesina para empresa'], commentPlaceholder: 'Ancho y vuelo, tipo de pared, iluminación o canalón, ubicación', product: 'Marquesinas de vidrio' }
  },

  frameless: {
    meta: { title: 'Cortinas de cristal para terrazas y balcones | Space Glass', description: 'Cortinas de cristal y acristalamiento sin perfiles para terrazas, balcones, porches y restaurantes: sistemas plegables, correderos y guillotina.' },
    name: 'Cortinas de cristal',
    eyebrow: 'Cortinas de cristal',
    h1: 'Cortinas de cristal para terrazas y balcones',
    lead: 'Acristalamiento sin perfiles verticales para terrazas, porches, balcones, cenadores y restaurantes: sistemas plegables, correderos, guillotina y sin umbral con vidrio templado o doble acristalamiento. Las hojas se abren por completo y las vistas quedan libres de marcos.',
    heroAlt: 'Cortinas de cristal en una terraza con vistas al mar',
    explore: 'Ver sistemas',
    intro: {
      title: 'Vidrio en lugar de paredes, y espacio abierto los días buenos',
      paragraphs: [
        'Las cortinas de cristal protegen terrazas, porches, balcones y cenadores del viento, la lluvia y el polvo sin esconder las vistas tras marcos: entre las hojas de vidrio no hay perfiles verticales.',
        'Elegimos el sistema según el uso: terraza de temporada o salón adicional, paso frecuente o costa ventosa, apertura manual o con mando. Para las estaciones frías hay sistemas con doble acristalamiento.',
        'Nos ocupamos de todo: medición y revisión del forjado, despiece de hojas y zona de recogida, fabricación con vidrio templado, instalación y servicio.'
      ],
      spec: [['29 sistemas', 'plegables, correderos, guillotina, sin umbral'], ['Vidrio 8–10 mm', 'o doble acristalamiento 20–28 mm'], ['Hasta 4 m de alto', 'umbral desde 0 mm'], ['Kyiv · Odesa · Lviv', 'medición, instalación y servicio']]
    },
    types: {
      eyebrow: 'Sistemas',
      title: 'Sistemas y aplicaciones',
      intro: 'Por tipo de apertura o por lugar: adaptamos el sistema al tamaño y a la exposición de su hueco.',
      items: [
        ['Sistemas plegables', 'Las hojas se pliegan y se recogen junto a la pared, liberando todo el ancho.'],
        ['Sistemas correderos', 'Hojas anchas de hasta 1,3 m que se deslizan como un armario, umbral desde 7,5 mm.'],
        ['Sistemas guillotina', 'Las hojas se mueven en vertical con motor eléctrico: mando, pulsador o smartphone.'],
        ['Sistemas sin umbral', 'Las hojas cuelgan del carril superior y el suelo queda a nivel.'],
        ['Cortinas de cristal térmicas', 'Sistemas para doble acristalamiento, bastante más cálidos para usar fuera del verano.'],
        ['Acristalamiento de balcones', 'Acristalamiento panorámico de balcones y galerías, también en edificios de viviendas.'],
        ['Acristalamiento de terrazas', 'Para terrazas y porches que se abren por completo con buen tiempo.'],
        ['Acristalamiento de cenadores', 'Sistemas plegables para cenadores redondos, en L y en U con muchas esquinas.'],
        ['Acristalamiento panorámico', 'Paredes de vidrio de suelo a techo para viviendas y restaurantes.']
      ]
    },
    options: {
      eyebrow: 'Aperturas',
      title: 'Plegable, corredera, guillotina o sin umbral',
      intro: 'El tipo de apertura decide el umbral, la zona de recogida de las hojas y la comodidad de uso.',
      items: [
        ['Plegable', 'Las hojas se recogen en un paquete junto a la pared y abren el hueco por completo. Umbral de 7 a 61 mm.'],
        ['Corredera', 'Hojas anchas que se deslizan por carriles, con menos juntas. Umbral desde 7,5 mm.'],
        ['Guillotina', 'Las hojas suben y bajan con motor: ideal para terrazas de restaurantes y barras.'],
        ['Sin umbral', 'Las hojas colgadas por arriba dejan el suelo totalmente a nivel.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué cortinas de cristal',
      items: [
        ['Vistas sin marcos', 'Sin perfiles verticales entre hojas: solo vidrio de suelo a techo.'],
        ['Apertura total', 'Las hojas se pliegan, se deslizan o suben: la terraza vuelve a estar abierta en segundos.'],
        ['Vidrio de seguridad', 'Solo vidrio templado de 8–10 mm, doble acristalamiento o laminado.'],
        ['Protección del clima', 'Juntas entre hojas y evacuación de agua protegen del viento, la lluvia, la nieve y el polvo.'],
        ['Cualquier forma', 'Huecos rectos, en L, en U, curvos y cenadores con muchas esquinas.'],
        ['Temporada más larga', 'La terraza se disfruta meses más; con doble acristalamiento, casi todo el año.']
      ]
    },
    faq: {
      title: 'Cortinas de cristal: preguntas frecuentes',
      intro: 'Sistemas, vidrio, umbral, viento, aislamiento e instalación.',
      items: [
        ['¿Qué son las cortinas de cristal?', 'Un acristalamiento en el que las hojas de vidrio templado no tienen marcos verticales: el vidrio se sujeta solo en los perfiles superior e inferior.'],
        ['¿Qué es mejor para una terraza: plegable, corredera o guillotina?', 'La plegable abre todo el hueco, la corredera tiene hojas más anchas y menos juntas, y la guillotina se abre con motor y es ideal para barras y terrazas de restaurantes.'],
        ['¿Qué vidrio se usa?', 'Vidrio templado de 8 o 10 mm, doble acristalamiento templado de 20–28 mm o vidrio laminado: transparente, mate o tintado en masa.'],
        ['¿Aíslan del frío las cortinas de cristal?', 'Los sistemas con vidrio simple son para uso de temporada. Los de doble acristalamiento son mucho más cálidos y alargan la temporada.'],
        ['¿Se pueden instalar sin umbral?', 'Sí: los sistemas colgados no tienen umbral y algunos plegables sobresalen solo 7 mm del suelo.'],
        ['¿Resisten el viento?', 'Sí. Los sistemas plegables están diseñados para cargas de viento de unos 175 kg/m²; en zonas expuestas elegimos perfiles más altos y vidrio más grueso.'],
        ['¿Hace falta un techo?', 'Sí, el sistema se instala entre el suelo y un techo o una viga. Si no hay techo, se puede añadir un techo de vidrio o una pérgola.'],
        ['¿Se puede pintar el perfil?', 'Sí: aluminio anodizado, gris antracita o cualquier color RAL; en algunos sistemas, imitación madera.'],
        ['¿Entran corrientes de aire?', 'Las juntas entre hojas y en el perímetro —de fieltro, silicona o magnéticas según el sistema— evitan las corrientes.'],
        ['¿Cuánto dura la instalación?', 'Instalar una terraza, un balcón o un cenador suele llevar de uno a varios días una vez fabricado el vidrio.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe fotos del hueco con el ancho y el alto aproximados: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Sistema o lugar', options: ['Sistema plegable', 'Sistema corredero', 'Sistema guillotina', 'Sistema sin umbral', 'Cortinas de cristal térmicas', 'Balcón', 'Terraza o porche', 'Cenador', 'Acristalamiento panorámico'], commentPlaceholder: 'Ancho y alto del hueco, umbral, vidrio, ubicación', product: 'Cortinas de cristal' }
  },

  aluminium: {
    meta: { title: 'Ventanas, puertas y correderas de aluminio | Space Glass', description: 'Ventanas, puertas y correderas elevables de aluminio con rotura de puente térmico (Aluprof), además de oficinas, fachadas, jardines de invierno y pérgolas.' },
    name: 'Ventanas y puertas de aluminio',
    eyebrow: 'Sistemas de aluminio',
    h1: 'Ventanas, puertas y correderas de aluminio',
    lead: 'Ventanas y puertas de aluminio, sistemas correderos y elevables, acristalamiento de oficinas y fachadas, jardines de invierno, pérgolas y mosquiteras plisadas con sistemas de perfiles Aluprof. Diseñamos, fabricamos e instalamos.',
    heroAlt: 'Grandes puertas correderas de aluminio que se abren a una terraza',
    explore: 'Ver productos de aluminio',
    intro: {
      title: 'Aluminio para décadas, no para una temporada',
      paragraphs: [
        'El aluminio permite grandes superficies de vidrio, marcos finos y hojas correderas anchas, y no se pudre, no se deforma con el sol ni con la helada, no amarillea ni necesita pintura. Con rotura de puente térmico es además una opción cálida y eficiente.',
        'Nuestro sistema principal es Aluprof: ventanas, puertas, puertas pivotantes y plegables, correderas elevables y fachadas. Antes de fabricar, los ingenieros preparan el plano de huecos, la especificación y los detalles de encuentro.',
        'Los perfiles se mecanizan con maquinaria propia; instaladores con más de 10 años de experiencia montan con impermeabilización y barrera de vapor según la normativa técnica.'
      ],
      spec: [['Uw desde 0,62', 'W/(m²K) en ventanas'], ['Hasta RC4', 'acristalamiento antirrobo'], ['Cualquier color RAL', 'e imitación madera'], ['Hasta 30 días laborables', 'de fabricación tras la aprobación']]
    },
    types: {
      eyebrow: 'Productos',
      title: 'Estructuras de aluminio que fabricamos',
      intro: 'Ventanas, puertas y sistemas para viviendas y edificios comerciales.',
      items: [
        ['Ventanas de aluminio', 'Ventanas con rotura de puente térmico, marcos estrechos y herrajes ocultos.'],
        ['Puertas de aluminio', 'Puertas de entrada, de terraza y pivotantes con cierre multipunto.'],
        ['Correderas y elevables', 'Grandes hojas correderas para terrazas y huecos anchos, con rotura de puente térmico.'],
        ['Acristalamiento de oficinas', 'Acristalamiento interior y paredes de vidrio con perfiles de aluminio para oficinas.'],
        ['Fachadas acristaladas', 'Muro cortina y vidrio estructural para edificios residenciales y comerciales.'],
        ['Jardines de invierno', 'Ampliaciones y terrazas acristaladas con techo de vidrio.'],
        ['Pérgolas', 'Pérgolas de aluminio y protección solar para terrazas.'],
        ['Mosquiteras plisadas', 'Mosquiteras plisadas para ventanas grandes y puertas correderas.']
      ]
    },
    options: {
      eyebrow: 'Aislamiento',
      title: 'Lo cálida que puede ser una ventana de aluminio',
      intro: 'La rotura de puente térmico y la variante de aislamiento deciden la eficiencia energética.',
      items: [
        ['Rotura de puente térmico', 'Una pletina de poliamida entre la parte exterior e interior del perfil frena el frío, y la ventana de aluminio se vuelve cálida.'],
        ['Variantes de aislamiento', 'Básica, con junta bicomponente o con inserciones aislantes adicionales para casas de bajo consumo.'],
        ['Acristalamiento', 'Doble o triple acristalamiento, vidrio de seguridad y antirrobo hasta RC4.'],
        ['Automatización', 'Motores, cerraduras electrónicas y control de accesos, también desde el smartphone.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué aluminio',
      items: [
        ['Seguridad', 'Perfiles rígidos, cierres multipunto y acristalamiento antirrobo hasta RC4. El aluminio no arde.'],
        ['Eficiencia energética', 'La rotura de puente térmico y las juntas bicomponente dan valores Uw desde 0,62 W/(m²K).'],
        ['Sostenibilidad', 'El aluminio, la poliamida y el EPDM son totalmente reciclables.'],
        ['Durabilidad', 'El perfil no se pudre, no se deforma ni amarillea y no necesita pintura durante décadas.'],
        ['Diseño', 'Marcos estrechos, grandes superficies de vidrio, cualquier color RAL, bisagras y hojas ocultas.'],
        ['Servicio', 'Servicio en garantía y posterior: ajuste, juntas nuevas y reparación de herrajes.']
      ]
    },
    faq: {
      title: 'Ventanas y puertas de aluminio: preguntas frecuentes',
      intro: 'Sistemas, aislamiento, colores, diseño e instalación.',
      items: [
        ['¿Con qué sistemas de perfiles trabajan?', 'Nuestro sistema principal es Aluprof: ventanas, puertas, puertas pivotantes y plegables, correderas elevables y sistemas de fachada.'],
        ['¿Son cálidas las ventanas de aluminio?', 'Sí. Los sistemas con rotura de puente térmico alcanzan Uw desde 0,62 W/(m²K) en ventanas y desde 0,84 W/(m²K) en correderas elevables. El aluminio sin rotura solo se usa en espacios no calefactados.'],
        ['¿Aluminio o PVC?', 'El aluminio es más resistente y duradero y permite hojas grandes, marcos estrechos, correderas y fachadas. El PVC es más económico en ventanas estándar.'],
        ['¿Qué es la rotura de puente térmico?', 'Una pletina de poliamida entre la parte exterior e interior del perfil. Frena el frío y hace que la ventana de aluminio sea cálida.'],
        ['¿Puedo elegir el color del perfil?', 'Sí. Los perfiles se lacan en cualquier color RAL; también hay acabados texturizados e imitación madera.'],
        ['¿Hacen el proyecto?', 'Sí. Preparamos el plano de huecos, la especificación de productos y los detalles de encuentro: así se evitan costes imprevistos.'],
        ['¿Se pueden automatizar puertas y correderas?', 'Sí. Hay motores, cerraduras electrónicas y control de accesos, también desde el smartphone.'],
        ['¿Cuánto tarda la fabricación?', 'Según el sistema, el color y el acristalamiento; normalmente hasta 30 días laborables tras aprobar los planos.'],
        ['¿Trabajan con arquitectos y promotores?', 'Sí. Facilitamos documentación técnica, ayudamos a elegir el sistema y acompañamos el proyecto del plano a la instalación.'],
        ['¿Es necesaria la medición profesional?', 'Sí, en productos a medida es imprescindible: fija las medidas exactas y los detalles de encuentro.']
      ]
    },
    form: { title: '¿Necesita un presupuesto orientativo?', text: 'Envíe un plano, planos técnicos o fotos de los huecos con medidas: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Producto', options: ['Ventanas de aluminio', 'Puertas de aluminio', 'Correderas / elevables', 'Acristalamiento de oficinas', 'Fachada acristalada', 'Jardín de invierno', 'Pérgola', 'Mosquiteras plisadas'], commentPlaceholder: 'Número y medidas de huecos, aislamiento, color, ubicación', product: 'Ventanas y puertas de aluminio' }
  },

  wintergardens: {
    meta: { title: 'Jardines de invierno de aluminio | Space Glass', description: 'Jardines de invierno y porches acristalados de aluminio: perfiles con rotura de puente térmico, techo de vidrio y puertas correderas o plegables.' },
    name: 'Jardines de invierno',
    eyebrow: 'Sistemas de aluminio / Jardines de invierno',
    h1: 'Jardines de invierno y porches acristalados de aluminio',
    lead: 'Un espacio acristalado junto a la casa para disfrutar todo el año. Diseñamos jardines de invierno y terrazas con sistemas Aluprof: estructura aislada, techo de vidrio, puertas correderas o plegables panorámicas y protección solar.',
    heroAlt: 'Jardín de invierno de aluminio con puertas correderas junto a una vivienda',
    explore: 'Ver opciones',
    intro: {
      title: 'Disfrutar del exterior en cualquier estación',
      paragraphs: [
        'Un jardín de invierno es una ampliación o terraza acristalada en la que la estructura, el techo y las puertas correderas funcionan como un solo sistema. En verano las puertas se abren a todo lo ancho; en invierno el jardín se convierte en una estancia más.',
        'Para un jardín calefactado usamos perfiles con rotura de puente térmico y doble o triple acristalamiento. Para un porche de temporada basta un sistema más ligero con vidrio simple.',
        'Space Glass diseña el jardín completo: acristalamiento de fachada, techo, puertas correderas, evacuación de agua y encuentros con la casa.'
      ],
      spec: [['Pendiente 5°–45°', 'sistema de cubierta para jardines'], ['Vidrio de hasta 450 kg', 'en paredes y techo'], ['Hojas de 1,2 × 2,8 m', 'acristalamiento corredero sin perfiles'], ['Calefactado o de temporada', 'según el uso']]
    },
    types: {
      eyebrow: 'Opciones',
      title: 'De qué se compone un jardín de invierno',
      intro: 'Combinamos estos elementos en un sistema para su casa.',
      items: [
        ['Jardín de invierno calefactado', 'Estructura con rotura de puente térmico y doble acristalamiento para usar todo el año.'],
        ['Porche acristalado de temporada', 'Un sistema más ligero con vidrio simple para primavera, verano y otoño.'],
        ['Techo de vidrio', 'Cabios y correas aislados forman un techo de vidrio independiente con canalón en la viga de alero.'],
        ['Puertas correderas y plegables', 'Correderas elevables u hojas correderas sin perfiles que abren el jardín a la terraza.'],
        ['Pérgolas y protección solar', 'Pérgolas, persianas exteriores y sombreado para un jardín confortable en verano.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué un jardín de invierno de aluminio',
      items: [
        ['Una estancia más', 'Un espacio luminoso para comer, descansar o tener plantas, todo el año.'],
        ['Estructura cálida', 'Rotura de puente térmico en todo el techo y las paredes.'],
        ['Grandes vidrios', 'Perfiles finos de aluminio que soportan acristalamientos grandes y pesados.'],
        ['Techo de cualquier geometría', 'Pendientes de 5° a 45° y formas complejas.'],
        ['Ventilación', 'Hojas practicables y ventanas de techo ventilan con cualquier tiempo.'],
        ['Un solo proyectista', 'Estructura, techo, puertas, desagüe y encuentros con la casa, planificados juntos.']
      ]
    },
    faq: {
      title: 'Jardines de invierno: preguntas frecuentes',
      intro: 'Calefactado o de temporada, techo, puertas y proyecto.',
      items: [
        ['¿En qué se diferencia un jardín calefactado de uno de temporada?', 'El calefactado usa perfiles con rotura de puente térmico y doble acristalamiento y se usa todo el año. El de temporada usa un sistema más ligero con vidrio simple.'],
        ['¿Qué sistema utilizan?', 'Sistemas Aluprof: una cubierta específica para jardines de invierno, paredes de vidrio semiestructurales y acristalamiento corredero sin perfiles.'],
        ['¿Qué pendientes de techo son posibles?', 'El sistema de cubierta permite pendientes de 5° a 45°.'],
        ['¿Se puede abrir por completo en verano?', 'Sí, con correderas elevables u hojas correderas y plegables sin perfiles.'],
        ['¿Cómo se evacua el agua de lluvia?', 'Mediante un canalón integrado en la viga de alero del sistema de cubierta.'],
        ['¿Cómo se evita el sobrecalentamiento?', 'Con vidrio de control solar, sombreado exterior, pérgolas y hojas practicables para ventilar.'],
        ['¿Diseñan la unión con la casa?', 'Sí. Diseñamos el jardín completo: acristalamiento de fachada, techo, puertas correderas, evacuación de agua y encuentros con la casa.'],
        ['¿Qué necesitan para un presupuesto orientativo?', 'Un plano o fotos del lugar con medidas, el uso que quiere dar al jardín y la ubicación.']
      ]
    },
    form: { title: '¿Planea un jardín de invierno?', text: 'Envíe fotos del lugar y medidas aproximadas: le propondremos un sistema y un presupuesto.', optionsLabel: 'Tipo', options: ['Jardín de invierno calefactado', 'Porche de temporada', 'Techo de vidrio', 'Puertas correderas / plegables'], commentPlaceholder: 'Medidas, calefactado o de temporada, techo, puertas, ubicación', product: 'Jardines de invierno' }
  },

  facades: {
    meta: { title: 'Fachadas de vidrio y muro cortina | Space Glass', description: 'Fachadas de vidrio con sistemas Aluprof: muro cortina, vidrio estructural y fachadas modulares, acristalamiento eficiente, escaparates y accesos.' },
    name: 'Fachadas de vidrio',
    eyebrow: 'Fachadas de vidrio',
    h1: 'Fachadas de vidrio para edificios',
    lead: 'Muro cortina, vidrio estructural y fachadas modulares, fachadas de alta eficiencia, acristalamiento de viviendas, escaparates y accesos de vidrio con sistemas Aluprof. Partimos del encargo, calculamos las cargas e instalamos la fachada.',
    heroAlt: 'Manzana urbana con fachadas de vidrio de edificios de oficinas',
    explore: 'Ver tipos de fachada',
    intro: {
      title: 'Una fachada de vidrio pensada para su edificio',
      paragraphs: [
        'La fachada de vidrio define el aspecto del edificio, la luz natural en el interior y el gasto en calefacción y refrigeración. Por eso no empezamos por el perfil, sino por el encargo: una vivienda, un edificio de oficinas o un local comercial.',
        'Trabajamos con sistemas de fachada Aluprof —muro cortina de montantes y travesaños, fachadas semiestructurales con juntas finas, fachadas modulares y versiones de alta eficiencia— e integramos ventanas, puertas y protección solar.',
        'Para cada fachada calculamos las cargas de viento, el peso del vidrio y los anclajes a los forjados, y preparamos la especificación.'
      ],
      spec: [['Uf desde 0,55', 'W/(m²K) en sistemas cálidos'], ['Clase I5/E5', 'resistencia al impacto'], ['EI30–EI60', 'soluciones cortafuegos'], ['Cualquier color RAL', 'anodizado o imitación madera']]
    },
    types: {
      eyebrow: 'Tipos',
      title: 'Fachadas de vidrio que diseñamos e instalamos',
      intro: 'Del muro cortina a los escaparates y accesos.',
      items: [
        ['Muro cortina de montantes y travesaños', 'Una retícula de montantes y travesaños montada en obra; el vidrio se sujeta con tapetas.'],
        ['Vidrio estructural', 'Sin tapetas exteriores: desde fuera solo se ve vidrio y juntas finas.'],
        ['Fachadas de viviendas', 'Acristalamiento de salones, escaleras, dobles alturas y techos de vidrio.'],
        ['Fachadas de alta eficiencia', 'Sistemas cálidos con doble acristalamiento y control solar para gastos bajos.'],
        ['Escaparates', 'Grandes escaparates acristalados para tiendas, cafeterías y showrooms.'],
        ['Accesos de vidrio', 'Entradas con puertas pivotantes, correderas o de panel integradas en la fachada.']
      ]
    },
    options: {
      eyebrow: 'Construcción',
      title: 'Sistemas de fachada',
      intro: 'Cómo se construye y se instala la fachada.',
      items: [
        ['Montantes y travesaños', 'Se montan en el edificio y se acristalan en obra.'],
        ['Semiestructural', 'Desde fuera, una superficie continua de vidrio con juntas finas de 2 cm en lugar de tapetas.'],
        ['Modular', 'Los módulos se montan y acristalan en fábrica y en obra solo se cuelgan.'],
        ['Sobre subestructura', 'Perfiles de presión de aluminio sobre una estructura portante de madera o acero.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: 'Por qué una fachada de vidrio',
      items: [
        ['Luz y amplitud', 'Vidrio de forjado a forjado que llena las estancias de luz natural y abre las vistas.'],
        ['Eficiencia energética', 'Sistemas cálidos con Uf desde 0,55 W/(m²K), vidrio bajo emisivo y protección solar.'],
        ['Montaje rápido', 'Estructura ligera; las fachadas modulares se instalan en módulos fabricados en taller.'],
        ['Seguridad', 'Vidrio laminado, clase de impacto I5/E5 y soluciones cortafuegos EI30–EI60.'],
        ['Durabilidad', 'El aluminio no se corroe ni se deforma; las juntas de EPDM resisten los rayos UV.'],
        ['Libertad arquitectónica', 'Fachadas curvas y facetadas, cualquier color RAL, techos de vidrio.']
      ]
    },
    faq: {
      title: 'Fachadas de vidrio: preguntas frecuentes',
      intro: 'Sistemas, eficiencia energética, seguridad y proyecto.',
      items: [
        ['¿Qué es una fachada de vidrio?', 'Un muro cortina de estructura de aluminio y doble acristalamiento anclado a los forjados. Protege del clima, deja pasar la luz y puede incluir ventanas y puertas practicables.'],
        ['¿Qué tipos de fachadas de vidrio existen?', 'Muro cortina de montantes y travesaños, semiestructural, de vidrio estructural y modular, y fachadas sobre subestructura de madera o acero; todas con versiones de alta eficiencia.'],
        ['¿En qué se diferencia una fachada de las ventanas?', 'Una fachada es un muro cortina autoportante que abarca varias plantas y sostiene grandes vidrios. Las ventanas se colocan en huecos individuales del muro.'],
        ['¿Cuál es la fachada más cálida?', 'Nuestros sistemas más cálidos alcanzan Uf desde 0,55 W/(m²K); hay versiones certificadas para casas pasivas.'],
        ['¿Qué es el vidrio estructural?', 'Una fachada sin tapetas exteriores: los vidrios se sujetan con retenedores o adhesivo y desde fuera solo se ven el vidrio y las juntas finas.'],
        ['¿Se pueden integrar ventanas en la fachada?', 'Sí: proyectantes, oscilobatientes, de apertura paralela y ocultas, y ventanas de techo en cubiertas de vidrio.'],
        ['¿Cómo se evita el sobrecalentamiento?', 'Con vidrio de control solar, fachadas con lamas integradas o lamas exteriores.'],
        ['¿Es seguro el vidrio de la fachada?', 'Sí. Usamos vidrio templado y laminado y sistemas con clase de impacto I5/E5; hay fachadas cortafuegos EI30 y EI60.'],
        ['¿Diseñan la fachada?', 'Sí. Calculamos cargas de viento, peso del vidrio, anclajes y encuentros, y preparamos la especificación.'],
        ['¿Trabajan con arquitectos y promotores?', 'Sí, elegimos el sistema para el proyecto, preparamos las soluciones técnicas y acompañamos la obra hasta la entrega.']
      ]
    },
    form: { title: '¿Planea una fachada de vidrio?', text: 'Envíe planos o fotos del edificio con medidas: elegiremos el sistema y le prepararemos un presupuesto.', optionsLabel: 'Tipo de fachada', options: ['Muro cortina', 'Vidrio estructural', 'Fachada de vivienda', 'Fachada de alta eficiencia', 'Escaparate', 'Acceso de vidrio'], commentPlaceholder: 'Tipo de edificio, superficie de fachada, planos disponibles, ubicación', product: 'Fachadas de vidrio' }
  },

  business: {
    meta: { title: 'Vidrio para empresas: hoteles y oficinas | Space Glass', description: 'Soluciones de vidrio para hoteles, restaurantes, oficinas, comercios, salones y clínicas: tabiques, puertas, escaparates, barandillas y terrazas.' },
    name: 'Vidrio para empresas',
    eyebrow: 'Para empresas',
    h1: 'Soluciones de vidrio para empresas',
    lead: 'Vidrio para hoteles, restaurantes, oficinas, comercios, salones de belleza, clínicas, promociones residenciales y complejos turísticos: escaparates, tabiques, puertas, barandillas, cortinas de cristal en terrazas, duchas y espejos, con un solo equipo de la medición a la entrega.',
    heroAlt: 'Vestíbulo de hotel con estructuras de vidrio',
    explore: 'Elija su sector',
    intro: {
      title: 'Un solo proveedor para todas las zonas de vidrio',
      paragraphs: [
        'Los proyectos comerciales necesitan algo más que buen vidrio: un calendario que no pare el negocio, herrajes para uso intensivo y una sola especificación para todas las zonas, de la entrada a los aseos.',
        'Medimos todo el local una sola vez, preparamos una especificación, fabricamos e instalamos fuera de horario, en fin de semana o por fases, y seguimos disponibles para el servicio posterior.',
        'Trabajamos con empresas mediante contrato y con toda la documentación, y con diseñadores y arquitectos desde la fase de proyecto.'
      ],
      spec: [['Una medición', 'una especificación para todas las zonas'], ['Instalación fuera de horario', 'o por fases acordadas'], ['Hasta 20 / 30 días laborables', 'vidrio / aluminio'], ['5 · 2 · 1 años', 'garantía en vidrio, herrajes, instalación']]
    },
    types: {
      eyebrow: 'Sectores',
      title: 'Soluciones para su negocio',
      intro: 'Lo que solemos hacer para cada tipo de negocio.',
      items: [
        ['Hoteles', 'Duchas y mamparas de bañera para cada habitación, puertas de vidrio, barandillas, tabiques de vestíbulo y espejos.'],
        ['Restaurantes y cafeterías', 'Cortinas de cristal en terrazas, ventanas guillotina, escaparates, tabiques y paredes de espejo.'],
        ['Oficinas', 'Mamparas de oficina, salas de reuniones, puertas de vidrio y branding sobre vidrio.'],
        ['Comercios y showrooms', 'Escaparates, accesos de vidrio, estantes, podios expositores y marquesinas.'],
        ['Salones de belleza', 'Espejos para puestos de trabajo, tabiques y puertas de vidrio.'],
        ['Clínicas y dentistas', 'Tabiques y puertas con vidrio mate, fáciles de limpiar e higiénicos.'],
        ['Promociones residenciales', 'Barandillas de balcones y escaleras, marquesinas, acristalamiento de portales, en serie.'],
        ['Complejos turísticos', 'Acristalamiento de terrazas y cenadores, barandillas, duchas y marquesinas.']
      ]
    },
    benefits: {
      eyebrow: 'Ventajas',
      title: '5 años de garantía en el vidrio, 2 en los herrajes y 1 en la instalación',
      items: [
        ['Un proyecto para todo', 'Una medición y una especificación para todas las zonas del local.'],
        ['Sin interrupciones', 'Instalación fuera de horario, en fin de semana o por fases según un calendario acordado.'],
        ['Herrajes reforzados', 'Cierrapuertas, bisagras y carriles para uso intensivo y mucho tránsito.'],
        ['Branding en vidrio', 'Mateado, vinilo o impresión con su logotipo e imagen corporativa.'],
        ['Series y cadenas', 'Una solución tipo, desarrollada una vez y replicada en cada local o habitación.'],
        ['Servicio tras la entrega', 'Ajuste de herrajes, juntas nuevas y formación del personal.']
      ]
    },
    faq: {
      title: 'Vidrio para empresas: preguntas frecuentes',
      intro: 'Alcance, contrato, plazos, garantía e instalación.',
      items: [
        ['¿Para qué negocios fabrican estructuras de vidrio?', 'Hoteles, restaurantes y cafeterías, oficinas, comercios, salones de belleza, clínicas y dentistas, promociones residenciales y complejos turísticos.'],
        ['¿Qué fabrican exactamente para empresas?', 'Tabiques y puertas de vidrio, accesos, escaparates, cortinas de cristal, barandillas, duchas, espejos, marquesinas, estantes y mostradores.'],
        ['¿Trabajan con empresas mediante contrato?', 'Sí, con contrato y con toda la documentación.'],
        ['¿Se puede encargar todo un local como un solo proyecto?', 'Sí, hacemos una medición y una especificación para todas las zonas, de la entrada a los aseos.'],
        ['¿Pueden instalar sin parar el negocio?', 'Sí, fuera de horario, en fin de semana o por fases según lo acordado.'],
        ['¿Cuánto dura un proyecto?', 'Las estructuras de vidrio, hasta 20 días laborables, y las de aluminio, hasta 30, tras aprobar todos los detalles; el calendario de una serie se fija aparte.'],
        ['¿Se puede poner un logotipo en el vidrio?', 'Sí, mediante mateado, vinilo o impresión según su diseño.'],
        ['¿Trabajan con cadenas y series?', 'Sí, desarrollamos una solución tipo y la replicamos en cada local o habitación.'],
        ['¿Sirve el vidrio para mucho tránsito?', 'Sí, con herrajes reforzados: cierrapuertas, bisagras y carriles para uso intensivo.'],
        ['¿Dónde puedo ver sus trabajos?', 'En la sección Proyectos: hoteles, restaurantes, oficinas, clínicas y comercios.']
      ]
    },
    form: { title: '¿Hablamos de su proyecto?', text: 'Cuéntenos a qué se dedica y qué necesita: le propondremos una solución para cada zona y un presupuesto orientativo.', optionsLabel: 'Su negocio', options: ['Hotel', 'Restaurante o cafetería', 'Oficina', 'Comercio o showroom', 'Salón de belleza', 'Clínica o dentista', 'Promoción residencial', 'Complejo turístico'], commentPlaceholder: 'Tipo de local, superficie, qué necesita (tabiques, terraza, escaparate…), ubicación', product: 'Vidrio para empresas' }
  }
};
