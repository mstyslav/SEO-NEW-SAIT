// EN project cases. Facts only from the project records (src/content/projects/*.json) and, for
// Nofilters, the fact-checked premium case (src/data/project-cases/nofilters.ts). Blocks marked
// "general" describe how Space Glass usually works, never this project.
import type { CaseCopy, CaseLabels } from './types';

export const caseLabelsEn: CaseLabels = {
  home: 'Home', projects: 'Projects', breadcrumbs: 'Breadcrumbs', photos: 'View photos', openPhoto: 'Open photo', factsLabel: 'Project details',
  about: 'About the project', task: 'Brief', solution: 'Our solution', tech: 'Technical details', process: 'Delivery', projectFact: 'On this project', result: 'Result',
  benefits: 'Benefits', gallery: 'Gallery', generalTag: 'General information', service: 'Service',
  faqIntro: 'Answers about quotes, custom sizes, materials, installation and care.', relatedEyebrow: 'More projects', relatedTitle: 'Other completed projects', back: 'All projects',
  lbLabel: 'Project photo viewer', close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of', viewProject: 'View project'
};

const generalGlassSteps = [
  { title: 'Survey', text: 'We measure the openings and check the substrates and levels on site.' },
  { title: 'Drawing', text: 'Dimensions, glass, hardware and fixings are agreed before production.' },
  { title: 'Manufacturing', text: 'The glass is cut, processed and toughened to the approved dimensions.' },
  { title: 'Installation', text: 'We install, adjust and hand over the finished structure.' }
];

export const casesEn: Record<string, CaseCopy> = {
  osocor: {
    seo: { title: 'Frameless Terrace Glazing, OSOCOR RESIDENCE, Kyiv', description: 'Frameless terrace glazing, glass railings and glass doors for OSOCOR RESIDENCE in Kyiv: the finished project, key details and how it was installed.' },
    h1: 'Frameless terrace glazing and glass railings in Kyiv',
    cardTitle: 'Frameless terrace glazing in Kyiv',
    city: 'Kyiv',
    objectType: 'OSOCOR RESIDENCE',
    constructionType: 'Frameless glazing, railings and glass doors',
    shortDescription: 'Frameless glazing, glass railings and glass doors for OSOCOR RESIDENCE in Kyiv — protection from wind and rain without losing the view.',
    categoryLabel: 'Frameless glazing',
    facts: [
      { label: 'Type', value: 'Frameless glazing, railings and glass doors' },
      { label: 'Project', value: 'OSOCOR RESIDENCE' },
      { label: 'City', value: 'Kyiv' },
      { label: 'Made', value: 'To individual dimensions' }
    ],
    coverAlt: 'Frameless terrace glazing at OSOCOR RESIDENCE in Kyiv — a completed Space Glass project',
    galleryAlts: ['Panoramic view of the frameless glazing', 'Glass front of the terrace', 'Transparent glass railing', 'Frameless glazing system seen from the side', 'Terrace glazing after installation'],
    galleryTitle: 'The terrace after installation',
    task: { title: 'A solution for OSOCOR RESIDENCE', text: 'The client needed glazing that matched the geometry of the terrace, the way the space is used every day and the existing finishes — a neat result instead of a standard, off-the-shelf solution.' },
    solution: { title: 'Frameless glazing, railings and glass doors', paragraphs: ['The glazing was designed to protect the space from rain and wind without blocking the view or the daylight.', 'The proportions and the configuration of the glazing, railings and doors were matched to the architecture of the finished space.'] },
    tech: { title: 'Materials', items: [{ label: 'Glass', value: 'Safety glass' }, { label: 'System', value: 'Aluminium guide system' }, { label: 'Sealing', value: 'Sealing elements' }, { label: 'Made', value: 'To individual dimensions' }] },
    process: { title: 'Installation on a finished site', fact: 'The guide tracks and glass sections were installed to the actual geometry of the openings; the movement of every panel and the evenness of the junctions were checked.', general: { label: 'How we deliver frameless glazing', steps: generalGlassSteps } },
    result: { title: 'Result', text: 'The glazing does its practical job, fits the proportions of the terrace and supports the overall style of OSOCOR RESIDENCE.' },
    benefits: { title: 'Why frameless glazing works for terraces', note: 'Benefits of frameless glazing in general, not specifications of this project.', items: [{ title: 'Open view', text: 'No vertical frames between the glass panels.' }, { title: 'Opens fully', text: 'The panels slide or fold away when the weather is good.' }, { title: 'Weather protection', text: 'Seals and drainage keep out wind, rain and dust.' }, { title: 'Longer season', text: 'The terrace can be used for more months of the year.' }] },
    service: { hubId: 'frameless', title: 'Related service', text: 'Systems, glass options and how we work — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will design frameless glazing for your terrace or balcony.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['Can a similar solution be adapted to another site?', 'Yes. Every structure is designed to the actual dimensions, the geometry of the opening, the fixing conditions and your wishes for glass and hardware.'],
      ['What do you need for a preliminary quote?', 'Send us the location, approximate dimensions and photos of the installation area and briefly describe the result you want. We will then clarify the configuration.'],
      ['Is installation included?', 'Yes, Space Glass can carry out the survey, manufacturing, delivery and professional installation. The final scope is set out in the quotation.']
    ],
    requestExample: 'frameless glazing for a terrace about 6 m wide, location'
  },
  'stair-railing': {
    seo: { title: 'Glass Stair Railing with Titanium Nitride Finish | Space Glass', description: 'Staircase and glass railing in a private house: metal parts with a gold-toned titanium nitride finish, glass along the flight and the upper gallery.' },
    h1: 'Staircase and glass railing with a titanium nitride finish in a private house',
    cardTitle: 'Glass stair railing with titanium nitride finish',
    objectType: 'Private house',
    constructionType: 'Staircase and glass railing',
    shortDescription: 'A staircase and glass railing in a private house: the metal parts have a titanium nitride finish, and the glass follows the flight and the open edge of the upper floor.',
    categoryLabel: 'Glass railings',
    facts: [
      { label: 'Structure', value: 'Staircase and glass railing' },
      { label: 'Project', value: 'Private house' },
      { label: 'Metal finish', value: 'Titanium nitride' }
    ],
    coverAlt: 'Glass stair railing with a gold-toned titanium nitride handrail in a private house',
    heroCaption: 'Flight with a glass railing and a titanium nitride handrail',
    galleryAlts: [
      'The flight from below: glass on both sides of the stairs and titanium nitride handrails',
      'Glass railing along the open edge of the upper floor with gold-toned framing',
      'Titanium nitride handrail above the flight next to a window',
      'View from above of the turn of the stairs with a glass railing',
      'Glass railing of the flight with the living room and sofas behind',
      'Glass railing along the stairwell opening to the lower floor',
      'Gold-toned handrail of the railing at the turn of the flight',
      'Titanium nitride glass holder post at the edge of the floor slab'
    ],
    galleryTitle: 'The staircase and railing in the house',
    about: { title: 'Staircase and glass railing', paragraphs: ['The project is a private house. Space Glass made the staircase and the glass railing; the metal parts of the structure have a titanium nitride finish.', 'The photos show the gold-toned handrail and the framing of the flight running along the stairs and continuing as a railing on the upper floor, while the glass keeps the space bright and open.'] },
    tech: { title: 'What is known about the project', items: [{ label: 'Project', value: 'Private house' }, { label: 'Structure', value: 'Staircase and glass railing' }, { label: 'Metal finish', value: 'Titanium nitride (gold tone)' }, { label: 'Railing', value: 'Along the flight and the upper-floor edge' }] },
    result: { title: 'Result', text: 'The staircase became the main feature of the interior: the glass does not close off the space, and the titanium nitride metal supports the warm palette of the house.' },
    benefits: { title: 'Why choose a glass stair railing', note: 'Benefits of glass railings in general, not specifications of this project.', items: [{ title: 'Light passes through', text: 'Glass does not darken the stairwell or the gallery.' }, { title: 'Laminated safety glass', text: 'If one sheet breaks, the railing stays in place.' }, { title: 'One line', text: 'The flight and the upper-floor edge can be made in the same style.' }, { title: 'Metal colour to match', text: 'Handrails and holders can follow the interior palette.' }] },
    service: { hubId: 'railings', title: 'Related service', text: 'Railing systems, glass and heights — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will design a glass railing for your staircase.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['What is a titanium nitride finish?', 'A thin decorative and protective coating on metal that gives it a golden tone. It is used for handrails, profiles and hardware when a brass or gold colour is wanted on metal parts.'],
      ['Can the stair railing be combined with the upper-floor railing?', 'Yes. The railing along the flight and the open edge of the floor can be made in one style, so the line of the handrail and the glass continues without a change of material.'],
      ['Can the railing be made in a different metal colour?', 'Yes. The colour of the metal parts is chosen together with the glass to suit the interior; the available options are agreed when we prepare the quote.']
    ],
    requestExample: 'glass railing for a staircase and the upper-floor gallery, metal colour, location'
  },
  'coffee-ocean': {
    seo: { title: 'Café Glass Facade with Serving Window, Odesa | Space Glass', description: 'Facade glazing and a serving window for the Coffee Ocean café on Arkadia Alley in Odesa: the finished project, key details and installation.' },
    h1: 'Glass café facade with a serving window in Odesa',
    cardTitle: 'Café facade glazing in Odesa',
    city: 'Odesa',
    objectType: 'Coffee Ocean café',
    constructionType: 'Facade glazing and serving window',
    shortDescription: 'Facade glazing, a serving window and a glass entrance for the Coffee Ocean café on Arkadia Alley in Odesa.',
    categoryLabel: 'Glass facades',
    facts: [
      { label: 'Type', value: 'Facade glazing and serving window' },
      { label: 'Project', value: 'Coffee Ocean café' },
      { label: 'City', value: 'Odesa' },
      { label: 'Made', value: 'To individual dimensions' }
    ],
    coverAlt: 'Glass facade of the Coffee Ocean café in Odesa — a completed Space Glass project',
    galleryAlts: ['Glass facade of the Coffee Ocean café on Arkadia Alley in Odesa', 'Serving window in the glass facade of the Coffee Ocean café', 'Glass entrance of the Coffee Ocean café in Odesa'],
    galleryTitle: 'The café facade',
    task: { title: 'A facade for the Coffee Ocean café', text: 'The café needed a facade that matched the geometry of the building, the way the space is used every day and the existing finishes — with a serving window for customers outside.' },
    solution: { title: 'Facade glazing and a serving window', paragraphs: ['The facade was adapted to the architecture of the building, the function of the café and the position of the entrances and service areas.', 'The proportions and configuration were matched to the finished space.'] },
    tech: { title: 'Materials', items: [{ label: 'Glazing', value: 'Glass or insulating glass units' }, { label: 'System', value: 'Aluminium facade system' }, { label: 'Sealing', value: 'Sealing materials' }, { label: 'Made', value: 'To individual dimensions' }] },
    process: { title: 'Staged installation', fact: 'The facade was installed in stages, checking the geometry of the profiles, the joints, the sealing and the operation of the integrated doors and windows.' },
    result: { title: 'Result', text: 'The facade does its practical job, fits the proportions of the building and supports the style of the café.' },
    benefits: { title: 'Why glass facades suit cafés and shops', note: 'Benefits of glass facades and shopfronts in general, not specifications of this project.', items: [{ title: 'Visibility', text: 'Passers-by see the interior and the counter.' }, { title: 'Daylight', text: 'The room stays bright throughout the day.' }, { title: 'Service window', text: 'Customers can be served directly from the street.' }, { title: 'Durable system', text: 'Aluminium profiles do not corrode and need little maintenance.' }] },
    service: { hubId: 'facades', title: 'Related service', text: 'Facade systems, shopfronts and entrances — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will design a facade or shopfront for your café or shop.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['Can a similar solution be adapted to another building?', 'Yes. Every structure is designed to the actual dimensions, the geometry of the openings, the fixing conditions and your wishes for glass and hardware.'],
      ['What do you need for a preliminary quote?', 'Send us the location, approximate dimensions and photos of the facade and briefly describe the result you want. We will then clarify the configuration.'],
      ['Is installation included?', 'Yes, Space Glass can carry out the survey, manufacturing, delivery and professional installation. The final scope is set out in the quotation.']
    ],
    requestExample: 'shopfront glazing with a serving window for a café, approximate size, location'
  },
  'office-odesa': {
    seo: { title: 'Glass Office Partitions with Doors in Odesa | Space Glass', description: 'Glass office partitions with doors for an office in the Morskyi business centre in Odesa: the finished project, key details and installation.' },
    h1: 'Glass office partitions with doors in Odesa',
    cardTitle: 'Glass office partitions in Odesa',
    city: 'Odesa',
    objectType: 'Office, Morskyi business centre',
    constructionType: 'Glass office partitions',
    shortDescription: 'Glass partitions with doors for an office in the Morskyi business centre in Odesa — zoning without the feeling of a solid wall.',
    categoryLabel: 'Glass partitions',
    facts: [
      { label: 'Type', value: 'Glass office partitions' },
      { label: 'Project', value: 'Office, Morskyi business centre' },
      { label: 'City', value: 'Odesa' },
      { label: 'Made', value: 'To individual dimensions' }
    ],
    coverAlt: 'Glass office partitions with doors in the Morskyi business centre in Odesa',
    galleryAlts: ['General view of the glass partition', 'Zoning the office with glass', 'Profile of the glass partition', 'Glass panel and hardware', 'The partition seen from the room'],
    galleryTitle: 'The partitions in the office',
    task: { title: 'Partitions for an office in the Morskyi business centre', text: 'The client needed partitions that matched the geometry of the office, the way it is used every day and the existing finishes — a neat result instead of a standard solution.' },
    solution: { title: 'Glass office partitions with doors', paragraphs: ['The partition was designed to the actual geometry of the opening and the way the space is used, dividing the office without the feeling of a heavy wall.', 'The proportions and the configuration were matched to the finished interior.'] },
    tech: { title: 'Materials', items: [{ label: 'Glass', value: 'Safety glass' }, { label: 'System', value: 'Profile system' }, { label: 'Hardware', value: 'Door and junction hardware' }, { label: 'Made', value: 'To individual dimensions' }] },
    process: { title: 'Installation in a finished office', fact: 'The partitions were installed against the finished surfaces. After installation, the level, the junctions and the operation of the doors were checked.', general: { label: 'How we deliver glass partitions', steps: generalGlassSteps } },
    result: { title: 'Result', text: 'The partitions do their practical job, fit the proportions of the office and support its overall style.' },
    benefits: { title: 'Why glass partitions suit offices', note: 'Benefits of glass office partitions in general, not specifications of this project.', items: [{ title: 'Daylight', text: 'Light reaches every workplace.' }, { title: 'Clean installation', text: 'No wet trades, usually 1–3 days in an office.' }, { title: 'Quieter rooms', text: 'Laminated glass and seals reduce noise.' }, { title: 'Privacy on demand', text: 'Satin glass or frosted stripes where needed.' }] },
    service: { hubId: 'partitions', title: 'Related service', text: 'Partition types, glass and doors — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will design glass partitions for your office.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['Can a similar solution be adapted to another office?', 'Yes. Every structure is designed to the actual dimensions, the geometry of the opening, the fixing conditions and your wishes for glass and hardware.'],
      ['What do you need for a preliminary quote?', 'Send us the location, approximate dimensions or an office plan and photos, and briefly describe the result you want. We will then clarify the configuration.'],
      ['Is installation included?', 'Yes, Space Glass can carry out the survey, manufacturing, delivery and professional installation. The final scope is set out in the quotation.']
    ],
    requestExample: 'glass partitions with doors for an office, room sizes, location'
  },
  'hotel-showers': {
    seo: { title: 'Glass Showers and Bath Screens for a Hotel in Odesa | Space Glass', description: 'Glass shower screens and bath screens for the Dvorianskyi hotel in Odesa: one standard for every room, installed room by room without closing the hotel.' },
    h1: 'Glass shower screens for a hotel in Odesa',
    cardTitle: 'Shower screens for a hotel in Odesa',
    city: 'Odesa',
    objectType: 'Dvorianskyi Hotel',
    constructionType: 'Shower screens and bath screens',
    shortDescription: 'Glass shower screens and bath screens for the Dvorianskyi Hotel in Odesa — one standard of quality for every room.',
    categoryLabel: 'Glass showers',
    facts: [
      { label: 'Type', value: 'Shower screens and bath screens' },
      { label: 'Project', value: 'Dvorianskyi Hotel' },
      { label: 'City', value: 'Odesa' },
      { label: 'Made', value: 'To individual dimensions' }
    ],
    coverAlt: 'Glass shower enclosures at the Dvorianskyi Hotel in Odesa — a completed Space Glass project',
    galleryAlts: ['General view of the shower area', 'Safety glass of the shower enclosure', 'Hardware and glass fixings', 'Junction of the glass with the wall finish', 'Finished shower enclosure after installation'],
    galleryTitle: 'Showers in the hotel rooms',
    task: { title: 'Matching structures for several hotel rooms', text: 'The bathrooms of the Dvorianskyi Hotel were fitted differently — some rooms with showers, others with baths. The hotel needed one contractor to make both shower screens and bath screens to the same quality standard for all rooms at once.' },
    solution: { title: 'Shower screens and bath screens', paragraphs: ['Rooms with a shower area received glass shower screens, rooms with a bath received bath screens.', 'The hardware and type of glass were standardised across the hotel, so that maintenance and any future replacement of parts are the same for every room.'] },
    tech: { title: 'Materials', items: [{ label: 'Glass', value: 'Safety glass' }, { label: 'Hardware', value: 'Moisture-resistant hardware' }, { label: 'Sealing', value: 'Sealing elements' }, { label: 'Made', value: 'To individual dimensions' }] },
    process: { title: 'Room by room, without closing the hotel', fact: 'Survey and installation were carried out room by room to a schedule agreed with the hotel, so guests could still check in. Even with a standard specification, the geometry of each bathroom was checked separately.' },
    result: { title: 'Result', text: 'The hotel received shower screens and bath screens of the same quality in every room, which simplifies maintenance and the replacement of individual parts.' },
    benefits: { title: 'Why hotels choose glass showers', note: 'Benefits of glass showers for hotels in general, not specifications of this project.', items: [{ title: 'One standard', text: 'The same glass and hardware in every room.' }, { title: 'Easy maintenance', text: 'Identical parts are easy to service and replace.' }, { title: 'Hygienic surfaces', text: 'Smooth glass is quick to clean between guests.' }, { title: 'No downtime', text: 'Installation can follow the hotel’s occupancy schedule.' }] },
    service: { hubId: 'showers', title: 'Related service', text: 'Shower types, glass and hardware — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will make glass showers for your hotel or home.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['Can a similar solution be adapted to another hotel?', 'Yes. Every structure is designed to the actual dimensions, the geometry of each bathroom, the fixing conditions and your wishes for glass and hardware.'],
      ['What do you need for a preliminary quote?', 'Send us the location, the number of rooms, approximate dimensions and photos of typical bathrooms. We will then clarify the configuration.'],
      ['Is installation included?', 'Yes, Space Glass can carry out the survey, manufacturing, delivery and professional installation. The final scope is set out in the quotation.']
    ],
    requestExample: 'shower screens and bath screens for 20 hotel rooms, location'
  },
  nofilters: {
    seo: { title: 'Custom Oval Mirrors for a Beauty Salon, Odesa: Project | Space Glass', description: 'Oval mirrors of an individual design for the workstations of the Nofilters beauty salon in Odesa: the task, the solution and the finished interior.' },
    h1: 'Mirrors for the Nofilters beauty salon in Odesa',
    cardTitle: 'Mirrors for a beauty salon in Odesa',
    city: 'Odesa',
    objectType: 'Nofilters beauty salon',
    constructionType: 'Mirrors for a beauty salon',
    shortDescription: 'Oval mirrors of an individual design with a finished edge for the workstations of the Nofilters beauty salon in Odesa.',
    categoryLabel: 'Mirrors',
    facts: [
      { label: 'Project', value: 'Nofilters beauty salon' },
      { label: 'City', value: 'Odesa' },
      { label: 'Products', value: 'Mirrors for workstations' },
      { label: 'Shape', value: 'Oval, individual design' },
      { label: 'Edge', value: 'Finished edge' }
    ],
    coverAlt: 'Three oval mirrors in a row on the dark green wall of the Nofilters salon, each with a styling chair in front',
    heroCaption: 'A row of oval mirrors at the stylists’ workstations',
    galleryAlts: ['Oval mirror with a dark outline next to a styling chair at the Nofilters salon'],
    galleryTitle: 'Mirrors in the salon interior',
    about: { title: 'Mirrors as part of the salon concept', paragraphs: ['Nofilters is a beauty salon in Odesa. Space Glass made the mirrors for the stylists’ workstations: mirrors of an individual shape with a finished edge.', 'In a salon the mirror is both a working tool and the most visible element of the room, so the mirrors were made to an individual design that follows the interior concept.'] },
    task: { title: 'The client’s brief', text: 'The salon wanted mirrors that would create a stylish, modern interior and match the concept of the venue. The mirrors were needed for the stylists’ workstations.' },
    solution: { title: 'An oval mirror for every workstation', paragraphs: ['A mirror of an individual design was made for each workstation. The photo shows a row of three oval mirrors on a dark green wall, each facing its own chair with an equal spacing between them.', 'A dark outline along the edge separates each mirror from the wall and brings the three mirrors together into one composition.', 'Another oval mirror is installed at a separate workstation.'] },
    tech: { title: 'Technical details', items: [{ label: 'Shape', value: 'Oval, individual design' }, { label: 'Edge', value: 'Finished' }, { label: 'Purpose', value: 'Stylists’ workstations' }, { label: 'Made', value: 'Separately for each workstation' }] },
    process: { title: 'How it was delivered', fact: 'The mirrors were installed after the salon’s finishing work was completed — on finished walls.', general: { label: 'How we work with mirrors for commercial spaces', steps: [{ title: 'Survey', text: 'We measure the walls and mark the position of the workstations.' }, { title: 'Shape and layout', text: 'We agree the shape of the mirrors and their position on the wall.' }, { title: 'Manufacturing', text: 'The mirrors are cut to the approved shape.' }, { title: 'Installation', text: 'We install the mirrors on the prepared walls.' }] } },
    result: { title: 'Result', text: 'The salon received a coherent interior: the mirrors at the workstations share one style and support the concept of the venue.' },
    benefits: { title: 'Why this solution suits salons', note: 'Benefits of this type of mirror in general, not specifications of this project.', items: [{ title: 'A mirror for every place', text: 'Stylist and client work with their own mirror; neighbouring places are not distracting.' }, { title: 'No corners', text: 'An oval looks softer than a rectangle and has no corners to knock in a busy work area.' }, { title: 'Sized to the space', text: 'The mirror is made to the height of the chair and the width of the workstation.' }, { title: 'Finished edge', text: 'A smooth edge looks neat and needs no heavy frame.' }] },
    service: { hubId: 'mirrors', title: 'Related service', text: 'Mirror types, edges and lighting — on the service page.' },
    cta: { title: 'Like this project?', text: 'We will make mirrors to your dimensions.', button: 'Get a quote' },
    faqTitle: 'Questions about the project and ordering',
    faq: [
      ['Can you make mirrors to my dimensions?', 'Yes. We define the size and shape after a survey — to suit the wall, the furniture and the position of the workstations.'],
      ['Can I order a mirror in a different shape?', 'Yes. Besides oval mirrors we make round, rectangular and custom-outline mirrors from a sketch or a design project.'],
      ['Can every workstation have the same mirror?', 'Yes, we choose one shape and size for all workstations so that the room looks coherent.'],
      ['How long does installing the mirrors take?', 'It depends on the number of mirrors, their size and the fixing method. We agree the schedule after the survey.'],
      ['Can the mirrors be installed without closing the salon?', 'Yes, installation can be done on a day off or outside the salon’s opening hours.']
    ],
    requestExample: 'mirrors for 4 salon workstations, shape, location'
  }
};
