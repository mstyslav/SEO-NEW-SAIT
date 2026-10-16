// EN hub pages. Facts (glass, loads, sizes, lead times, warranty, cities) come from the UA hub
// pages of the same section; no prices (UAH market only), no city pages, no supplier claims beyond
// what the UA pages state.
import type { HubCommon, HubCopy } from './types';

export const hubCommonEn: HubCommon = {
  home: 'Home',
  request: 'Get a quote',
  typesLinkLabel: 'View',
  processEyebrow: 'Process',
  processTitle: 'From the first request to installation',
  processSteps: [
    ['Request', 'Photos, plan or approximate dimensions'],
    ['Consultation', 'System, glass and hardware'],
    ['Site survey', 'Exact measurements on site'],
    ['Drawing', 'Dimensions and fixings for approval'],
    ['Manufacturing', 'Glass toughened to size'],
    ['Installation', 'Fitting, adjustment and handover']
  ],
  areaEyebrow: 'Where we work',
  areaTitle: 'Site surveys and installation in Kyiv, Odesa and Lviv',
  areaParagraphs: [
    'Our teams carry out site surveys, manufacturing and installation in Kyiv, Odesa and Lviv and the surrounding regions. Projects elsewhere in Ukraine are agreed individually.',
    'Selected products and structures can be delivered to other European countries — send us your drawings or photos and the location, and we will tell you what can be supplied and how.'
  ],
  offices: [['Kyiv', 'office and installation'], ['Odesa', 'office and installation'], ['Lviv', 'office and installation']],
  projectsEyebrow: 'Portfolio',
  projectsTitle: 'Completed projects',
  allProjects: 'All projects',
  relatedEyebrow: 'Related',
  relatedTitle: 'Explore more solutions'
};

export const hubsEn: Record<string, HubCopy> = {
  services: {
    meta: { title: 'Glass and Aluminium Products and Services | Space Glass', description: 'Design, site survey, in-house manufacturing, delivery, installation and service for custom glass and aluminium structures for homes and businesses.' },
    name: 'Products and services',
    eyebrow: 'Space Glass products and services',
    h1: 'Custom glass and aluminium structures — full service',
    lead: 'We design, manufacture and install made-to-measure glass and aluminium structures: shower enclosures, glass partitions, railings, doors, facades, frameless glazing, mirrors, winter gardens and canopies. One team from the first sketch to the finished installation.',
    heroAlt: 'Space Glass designers working on glass structures — drawings, glass samples and installation planning',
    explore: 'Browse products',
    intro: {
      title: 'Everything your project needs — in one team',
      paragraphs: [
        'Space Glass coordinates the whole path of a structure, so the technical solution, manufacturing and installation work as one process. That matters most where glass meets walls, floors and other trades: tolerances, fixings and sequence are planned before anything is cut.',
        'We measure the site, select the system, glass and hardware, prepare drawings and specifications, manufacture to the approved dimensions on our own equipment, deliver and install — and stay available for adjustments and service afterwards.',
        'Since 2014 we have completed more than 5,000 projects for homes and businesses and installed over 50,000 m² of glazing.'
      ],
      spec: [['5,000+ projects', 'for homes and businesses'], ['50,000+ m²', 'of glazing installed'], ['10+ years', 'of hands-on experience'], ['Kyiv · Odesa · Lviv', 'offices and installation teams']]
    },
    types: {
      eyebrow: 'Products',
      title: 'What we make',
      intro: 'Choose a product area — each page explains the types, glass options and how we work.',
      items: [
        ['Glass shower enclosures', 'Walk-in screens, corner, niche, sliding and bifold showers, bath screens.'],
        ['Glass partitions', 'Loft, frameless, sliding and folding partitions for homes and offices.'],
        ['Glass doors', 'Hinged, sliding, pivot and aluminium-framed glass doors.'],
        ['Glass railings', 'Frameless and post-mounted railings for stairs, balconies, terraces and pools.'],
        ['Custom mirrors', 'LED, framed and wall mirrors, mirror walls for salons and gyms.'],
        ['Glass canopies', 'Entrance canopies — cantilevered, with rods, on brackets or framed.'],
        ['Frameless glazing', 'Folding, sliding and guillotine systems for terraces and balconies.'],
        ['Aluminium windows and doors', 'Thermally broken windows, doors and lift-and-slide systems.'],
        ['Winter gardens', 'Glazed aluminium extensions with glass roofs and sliding doors.'],
        ['Glass facades', 'Stick, structural and unitised facades, shopfronts and entrances.'],
        ['Commercial glazing', 'Solutions for hotels, restaurants, offices, shops and clinics.']
      ]
    },
    benefits: {
      eyebrow: 'Full cycle',
      title: 'Six stages, one responsible team',
      items: [
        ['Survey and consultation', 'Accurate measurements, an assessment of the site and the right technical solution.'],
        ['Design', 'Drawings, junction details and the choice of glass, profiles, hardware and fixings.'],
        ['Manufacturing', 'Structures made to the approved project on our own equipment.'],
        ['Delivery', 'Professional packaging and safe transport of finished structures.'],
        ['Installation', 'Fitting, adjustment, sealing and preparation for everyday use.'],
        ['Warranty and service', '5 years on glass, 2 years on hardware, 1 year on installation — and service afterwards.']
      ]
    },
    faq: {
      title: 'Questions before we start',
      intro: 'Quotes, site surveys, drawings, delivery, installation, warranty and service.',
      items: [
        ['How do I get a preliminary quote?', 'Send photos of the site, approximate dimensions and a short description through the form. We assess the type of structure and come back with a preliminary solution and estimate.'],
        ['What should I send for a quote?', 'Photos of the installation area, approximate dimensions and the location are enough. If you have drawings, a design project or wishes for the glass and hardware, add them too.'],
        ['Do you carry out site surveys?', 'Yes. A professional survey records the actual geometry of the site and the fixing surfaces — it is essential for accurate manufacturing.'],
        ['Where are site surveys available?', 'Our teams survey and install in Kyiv, Odesa and Lviv and the surrounding regions. Other locations are agreed depending on the structure and logistics.'],
        ['Do you work with DWG or PDF drawings?', 'Yes. We review architects’ and designers’ drawings, clarify the junction details and adapt the solution to the actual conditions on site.'],
        ['Do you prepare technical drawings?', 'Yes. Before production our team prepares technical drawings, fixing details and a material specification for approval.'],
        ['Can I order the structure without installation?', 'Yes, for some systems — if you have your own installers, we supply the structure with technical documentation and installation recommendations.'],
        ['Do you deliver outside Ukraine?', 'Selected products and structures can be delivered to European countries. Delivery and installation abroad are agreed individually for each project.'],
        ['How long does a project take?', 'Glass structures usually take up to 20 working days and aluminium structures up to 30 working days after every detail of the project has been approved.'],
        ['What warranty do you give?', '5 years on the glass, 2 years on the hardware and 1 year on the installation, plus service after handover: adjustments and replacement of parts.']
      ]
    },
    form: { title: 'Tell us about your project', text: 'Send photos, a plan or dimensions — we will select the right solution and prepare a preliminary quote.', optionsLabel: 'Product', options: ['Glass shower enclosure', 'Glass partition', 'Glass door', 'Glass railing', 'Mirror', 'Glass canopy', 'Frameless glazing', 'Aluminium windows and doors', 'Winter garden', 'Glass facade', 'Commercial project'], commentPlaceholder: 'Type of structure, approximate dimensions, location', product: 'Products and services' }
  },

  showers: {
    meta: { title: 'Glass Shower Enclosures Made to Measure | Space Glass', description: 'Frameless glass shower enclosures made to measure: walk-in screens, corner, niche, sliding and bifold showers, bath screens. 8–10 mm toughened glass.' },
    name: 'Glass shower enclosures',
    eyebrow: 'Glass shower enclosures',
    h1: 'Glass shower enclosures made to measure',
    lead: 'Walk-in screens, corner and niche showers, sliding and bifold doors, bath screens and pentagonal enclosures — made from toughened safety glass to the exact dimensions of your bathroom, with hardware in the finish you choose.',
    heroAlt: 'Frameless glass shower enclosure in a modern bathroom',
    explore: 'View shower types',
    intro: {
      title: 'A shower designed around your bathroom',
      paragraphs: [
        'Standard shower cabins rarely fit a real bathroom: walls are not perfectly square, niches have their own width and the tiles set the final geometry. That is why we make every shower enclosure to measure — from a single walk-in screen to a complete corner or pentagonal enclosure.',
        'The basic solution is 8 mm toughened safety glass; 10 mm glass is used when the size and design require it. You choose the glass — clear, low-iron, satin, graphite, bronze or fluted — and the hardware finish: chrome, black, brushed steel, gold, brass or bronze.',
        'We take the final measurements once the tiling and the floor or shower tray are finished, agree the drawing with you and install the enclosure with sealed, adjusted doors.'
      ],
      spec: [['8–10 mm glass', 'toughened safety glass'], ['6 glass options', 'clear, low-iron, satin, tinted, fluted'], ['6 hardware finishes', 'chrome, black, steel, gold, brass, bronze'], ['With or without tray', 'walk-in on a tiled floor possible']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Which glass showers we make',
      intro: 'Choose the layout — we adapt the glass, door type and hardware to your bathroom.',
      items: [
        ['Walk-in shower screens', 'Fixed glass panels without a door — a minimalist solution sized to the shower area.'],
        ['Glass shower doors', 'A door for a niche or between a wall and a fixed panel — hinged or sliding.'],
        ['Corner shower enclosures', 'Two glass sides form the shower in the corner of the room, with the entrance where you need it.'],
        ['Sliding shower enclosures', 'The panels run along a rail and need no space in front of the shower to open.'],
        ['Niche showers', 'A glass door, or a door with a fixed panel, for an opening between three walls.'],
        ['Bifold shower doors', 'Folding glass doors for compact showers, niches and baths where a hinged door needs too much space.'],
        ['Bath screens', 'Fixed, hinged or folding glass screens on the bath instead of a shower curtain.'],
        ['Pentagonal enclosures', 'Enclosures with an angled front for corner positions that save space in the bathroom.']
      ]
    },
    options: {
      eyebrow: 'Glass and hardware',
      title: 'Glass, hardware and the shower floor',
      intro: 'The details that decide how the shower looks and works every day.',
      items: [
        ['Clear and low-iron glass', 'Clear glass keeps the bathroom bright; low-iron (extra clear) glass has no green edge and shows colours more truly.'],
        ['Satin, tinted and fluted glass', 'Satin glass adds privacy and hides water marks; graphite and bronze tints add depth; fluted glass gives texture while letting light through.'],
        ['Hinges, stabiliser bars and seals', 'Hinges set the opening angle, stabiliser bars hold wide panels, seals and magnetic strips reduce water escaping.'],
        ['With a tray or a level floor', 'A shower tray simplifies drainage and waterproofing; a walk-in shower needs a sloped, waterproofed floor with a drain — we take either into account before the final survey.']
      ]
    },
    benefits: {
      eyebrow: 'Why glass',
      title: 'Why choose a glass shower enclosure',
      items: [
        ['Exact fit', 'Made to the real dimensions of your shower area, niche or corner — no standard sizes.'],
        ['Safety glass', 'Toughened glass breaks into blunt fragments if it is ever damaged.'],
        ['Light and space', 'Glass keeps the bathroom open and visually larger than a curtain or a framed cabin.'],
        ['Easy to clean', 'Smooth glass and minimal hardware — wiping after use reduces limescale.'],
        ['Your style', 'Six glass types and six hardware finishes to match tiles, taps and furniture.'],
        ['Warranty', '5 years on glass, 2 years on hardware and 1 year on installation.']
      ]
    },
    faq: {
      title: 'Glass shower enclosures: FAQ',
      intro: 'Sizes, glass, hardware, trays, sealing and care.',
      items: [
        ['Can I order a shower enclosure to custom dimensions?', 'Yes. We make glass shower enclosures to the actual dimensions of your bathroom. Before production we measure the site and agree the design and drawing with you.'],
        ['What glass is used for shower enclosures?', 'We use toughened safety glass. The type and thickness are chosen according to the dimensions and design of the shower.'],
        ['What glass thickness does a shower need?', 'Our standard is 8 mm toughened glass. 10 mm glass or other solutions are used when the size and design of the enclosure require it.'],
        ['When should the shower be measured?', 'We recommend the final survey once the work that defines the shower geometry is finished: wall tiling, floor preparation or the installed shower tray.'],
        ['Can a glass shower be installed without a tray?', 'Yes, on a prepared floor with properly designed drainage. We take the geometry of the floor into account during the survey.'],
        ['Can you make a shower for walls that are not straight?', 'Yes. We measure the deviations of walls and corners and take them into account in the drawing and the shape of the glass.'],
        ['Which hardware finishes are available?', 'Depending on the system: chrome, black, brushed steel, gold, brass and bronze. The finish is agreed before production.'],
        ['How watertight is a frameless shower?', 'It depends on the design, joints, seals, the direction of the water and the preparation of the shower area. A frameless enclosure is not a fully sealed cabin — we plan seals and drainage accordingly.'],
        ['What affects the price?', 'The width and height, the number of glass panels, the opening type, glass, hardware, complexity of manufacturing, delivery and installation.'],
        ['How should I care for the glass?', 'Remove water from the glass after showering and clean it regularly with products suitable for glass — this reduces limescale.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send photos of your bathroom and approximate dimensions — we will suggest a layout and prepare an estimate.', optionsLabel: 'Shower type', options: ['Walk-in shower screen', 'Glass shower door', 'Corner shower enclosure', 'Sliding shower enclosure', 'Niche shower', 'Bifold shower door', 'Bath screen', 'Pentagonal enclosure'], commentPlaceholder: 'Width, height and depth of the shower area, tray or tiled floor, location', product: 'Glass shower enclosures' }
  },

  partitions: {
    meta: { title: 'Custom Glass Partitions — Loft and Sliding | Space Glass', description: 'Glass partitions for homes and offices: loft, frameless, sliding, telescopic and folding systems, with or without doors. Toughened or laminated glass.' },
    name: 'Glass partitions',
    eyebrow: 'Glass partitions',
    h1: 'Glass partitions made to measure',
    lead: 'Glass partitions for apartments, houses, offices, clinics and salons: loft partitions, frameless glass walls, sliding, telescopic and folding systems and partitions with doors. Zoning without losing daylight — designed, manufactured and installed by one team.',
    heroAlt: 'Glass partition between a bedroom and a walk-in wardrobe',
    explore: 'View partition types',
    intro: {
      title: 'Zoning without solid walls',
      paragraphs: [
        'A glass partition divides a space into zones but keeps the light and the sense of space. It is thinner than a wall, is usually installed in a day and needs no wet trades — which is why it works equally well in apartments and offices.',
        'We make fixed partitions in slim profiles or with point fixings, black loft partitions with glazing bars, partitions with hinged, sliding or pivot doors, and suspended, floor-guided, telescopic and folding sliding systems.',
        'Glass is toughened or laminated, 8–12 mm thick, clear, satin, fluted or tinted; the profiles can be finished in any colour.'
      ],
      spec: [['9 types', 'from loft to folding systems'], ['Glass 8–12 mm', 'toughened or laminated'], ['Installed in 1 day', 'typical apartment, no wet trades'], ['Up to 20 working days', 'manufacturing after approval']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Which glass partitions we make',
      intro: 'Fixed, sliding or folding, with or without a door — chosen around your space and how it is used.',
      items: [
        ['Loft partitions', 'Glass in a slim black steel-look aluminium profile with glazing bars — the classic industrial style.'],
        ['Frameless glass walls', 'Full-height glass with minimal clamps or a hidden channel — as little frame as possible.'],
        ['Suspended sliding partitions', 'Panels hang from a ceiling track, so there is no rail or threshold on the floor.'],
        ['Floor-guided sliding partitions', 'The weight rests on a floor track, which allows larger and heavier panels.'],
        ['Telescopic partitions', 'Several sliding panels on parallel tracks that stack behind one another.'],
        ['Folding partitions', 'Panels fold or pivot away and open the whole opening when you need one large room.'],
        ['Partitions with doors', 'Hinged, sliding or pivot glass doors in one line with the partition.'],
        ['Office partitions', 'Meeting rooms, private offices and open-plan zoning with doors and sound-reducing glass.'],
        ['Interior partitions for homes', 'Bedroom and wardrobe, kitchen and living room, study corners — light stays in every zone.']
      ]
    },
    options: {
      eyebrow: 'How it works',
      title: 'Fixed, sliding or folding',
      intro: 'The type of partition decides the passage, the space it needs and the look.',
      items: [
        ['Fixed', 'Static panels in a profile or on clamps — loft and frameless partitions.'],
        ['With doors', 'Hinged, sliding or pivot doors in one line with the partition.'],
        ['Sliding', 'Suspended from a top track or guided along the floor, including telescopic systems.'],
        ['Folding', 'Bifold or pivoting panels that open the whole opening.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why a glass partition',
      items: [
        ['Daylight', 'Glass divides the space but does not take away the daylight.'],
        ['Fast and clean', 'Usually installed in one day, without wet trades or dust.'],
        ['Safety', 'Toughened and laminated glass — no sharp shards.'],
        ['Quieter rooms', 'Seals and laminated glass noticeably reduce noise.'],
        ['Matches the interior', 'Clear, satin or fluted glass; profiles in any colour.'],
        ['Warranty', '5 years on glass, 2 years on hardware and 1 year on installation.']
      ]
    },
    faq: {
      title: 'Glass partitions: FAQ',
      intro: 'Types, glass, doors, sound insulation and installation.',
      items: [
        ['What types of glass partitions are there?', 'Fixed (loft and frameless), with doors, sliding — suspended, floor-guided and telescopic — and folding partitions.'],
        ['What glass is used?', 'Toughened glass 8–12 mm thick or laminated safety glass — both are safe and strong.'],
        ['Which partition suits an apartment?', 'For an industrial look — a loft partition in a black profile; for minimalism — frameless glass; where there is no room for a hinged door — a sliding system.'],
        ['Which partition suits an office?', 'Private offices — partitions with doors; meeting rooms in an open-plan space — enclosed glass rooms; high footfall — pivot doors.'],
        ['Does a glass partition reduce noise?', 'Partly; with laminated glass and seals the difference is noticeable.'],
        ['Can the glass be frosted or tinted?', 'Yes — satin, tinted and fluted glass, as well as frosted stripes or a logo.'],
        ['What is the difference between suspended and floor-guided systems?', 'A suspended partition carries its weight from the ceiling and has no threshold; a floor-guided system carries it on the floor, so larger panels are possible.'],
        ['Can a partition be installed in a finished interior?', 'Yes, installation is clean and needs no wet trades.'],
        ['How long do manufacturing and installation take?', 'Manufacturing takes up to 20 working days after all details are approved; installation usually takes one day in an apartment and 1–3 days in an office.'],
        ['Do you prepare drawings?', 'Yes, we agree dimensions, glazing bars and doors with you before manufacturing.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send a plan or photos of the room with dimensions — we will choose a system and prepare an estimate.', optionsLabel: 'Partition type', options: ['Loft partition', 'Frameless glass wall', 'Suspended sliding partition', 'Floor-guided sliding partition', 'Telescopic partition', 'Folding partition', 'Partition with a door', 'Office partition'], commentPlaceholder: 'Room (apartment, office), dimensions, doors, glass, location', product: 'Glass partitions' }
  },

  doors: {
    meta: { title: 'Glass Doors Made to Measure — Sliding, Hinged | Space Glass', description: 'Interior glass doors made to fit your opening: hinged, sliding, pivot, aluminium-framed and frosted doors for homes and offices. 8–10 mm safety glass.' },
    name: 'Glass doors',
    eyebrow: 'Glass doors',
    h1: 'Glass doors made to measure',
    lead: 'Hinged, sliding, pivot and aluminium-framed glass doors made to the size of your opening — for apartments, houses, offices and clinics. Toughened or laminated glass, reliable hardware, frosting and decoration to your design.',
    heroAlt: 'Sliding glass doors in an aluminium frame between a living room and a bedroom',
    explore: 'View door types',
    intro: {
      title: 'Doors that let the light through',
      paragraphs: [
        'Glass doors make an interior lighter: daylight reaches corridors and rooms without windows, and the space is not broken up by solid door leaves. Glass does not swell, warp or fade, so it works just as well in bathrooms and kitchens.',
        'We make doors for the actual opening: frameless hinged doors and loft doors in slim profiles, sliding doors on rollers or in a frame, and pivot doors for entrances with heavy footfall. Glass, decoration and hardware are chosen for each project.',
        'Only toughened (8–10 mm) or laminated glass is used; holes for the hardware are made before toughening.'
      ],
      spec: [['Glass 8–12 mm', 'toughened or laminated'], ['Made to your opening', 'no architraves or extensions needed'], ['Decoration and logo', 'frosting to your design'], ['Kyiv · Odesa · Lviv', 'survey, installation and service']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Which glass doors we make',
      intro: 'Choose the opening type — we select glass, hardware and lock for the way the door is used.',
      items: [
        ['Hinged glass doors', 'Frameless doors on hinges fixed to the wall or a glass panel — the cleanest look.'],
        ['Sliding glass doors', 'The leaf slides along the wall and takes no space in front of the opening.'],
        ['Pivot doors', 'Double-action doors with a floor closer for entrances with constant footfall.'],
        ['Aluminium-framed doors', 'Glass in a slim aluminium profile with glazing bars — rigid, with a full lock.'],
        ['Frosted glass doors', 'Full or partial satin finish, stripes or patterns for privacy.'],
        ['Office glass doors', 'Doors for private offices and meeting rooms, often as part of a glass partition.']
      ]
    },
    options: {
      eyebrow: 'Glass',
      title: 'Glass and decoration for doors',
      intro: 'Only safety glass is used in doors. Transparency and pattern are your choice.',
      items: [
        ['Toughened glass', 'The main material: 8–10 mm, several times stronger than ordinary glass, breaks into blunt fragments.'],
        ['Laminated glass', 'Two sheets bonded with a film: fragments stay in place and sound insulation is better — for children’s rooms, clinics and meeting rooms.'],
        ['Frosted and tinted', 'Satin finish over the whole surface or in parts; bronze and graphite body tints.'],
        ['Decoration', 'Sandblasted patterns, stripes, room numbers or a logo from a vector file.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why glass doors',
      items: [
        ['Light in every room', 'Glass lets daylight into corridors and rooms without windows.'],
        ['Made to your opening', 'Glass is cut to the actual size — no extensions or architraves.'],
        ['Safety', 'Only toughened or laminated glass: fragments are blunt or held by the film.'],
        ['Moisture-proof', 'Glass does not swell, warp or fade — ideal for bathrooms and kitchens.'],
        ['Privacy as you like', 'Clear, frosted or tinted glass, a pattern or a logo.'],
        ['Durability', 'Stainless steel and anodised aluminium hardware lasts for years.']
      ]
    },
    faq: {
      title: 'Glass doors: FAQ',
      intro: 'Types, glass, weight, locks, soundproofing and installation.',
      items: [
        ['What types of glass doors are there?', 'Hinged, sliding, pivot, frameless and aluminium-framed (loft) doors. The glass can be clear, frosted, tinted or decorated.'],
        ['What glass is used for doors?', 'Toughened safety glass 8–10 mm or laminated glass. Holes for the hardware are made before toughening.'],
        ['How heavy are glass doors?', 'About 20 kg/m² for 8 mm glass and 25 kg/m² for 10 mm. An 800 × 2200 mm leaf in 10 mm glass weighs about 44 kg.'],
        ['Are glass doors safe in a home with children?', 'Yes. Toughened glass breaks into blunt fragments and laminated glass holds them on the film. A frosted stripe at eye level can be added.'],
        ['Do I need a door frame?', 'No — frameless doors are fixed with hinges directly to the wall or a glass panel. Aluminium-framed doors can have a frame.'],
        ['Which door suits a narrow corridor?', 'A sliding door — it moves along the wall and takes no space in front of the opening.'],
        ['Can a glass door have a lock?', 'Yes: key locks, privacy indicators, magnetic and electromechanical locks.'],
        ['Do glass doors insulate sound?', 'Less than a solid wall. For better insulation choose laminated glass and perimeter seals.'],
        ['Can a glass door be used as an external entrance?', 'Single glass does not retain heat; for an external entrance choose thermally broken aluminium doors.'],
        ['Can the door be combined with a glass partition?', 'Yes, the door can be built into a glass or loft partition in the same style.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send a photo and the dimensions of the opening — we will suggest the door type, glass and hardware.', optionsLabel: 'Door type', options: ['Hinged glass door', 'Sliding glass door', 'Pivot door', 'Aluminium-framed door', 'Frosted glass door', 'Office glass door'], commentPlaceholder: 'Opening size, room, glass preferences, lock, location', product: 'Glass doors' }
  },

  railings: {
    meta: { title: 'Glass Railings for Stairs, Balconies, Terraces | Space Glass', description: 'Glass railings for stairs, balconies, terraces and pools: frameless base-channel systems, point fixings and post-mounted railings. Laminated safety glass.' },
    name: 'Glass railings',
    eyebrow: 'Glass railings',
    h1: 'Glass railings made to measure',
    lead: 'Railings for stairs, balconies, terraces and pools on German-engineered systems: frameless glass in a base channel, point-fixed glass, post-mounted railings with a handrail and French balconies. Laminated safety glass only.',
    heroAlt: 'Cantilevered staircase with a frameless glass railing in a modern house',
    explore: 'View railing types',
    intro: {
      title: 'Safety that keeps the view open',
      paragraphs: [
        'A glass railing protects against falls, wind and level differences but keeps the view and the light. That is why it is used on stairs and galleries, balconies, terraces and around pools.',
        'We work with German-engineered railing systems: base channels fixed on top of or to the edge of the slab, point fixings, stainless steel posts and French balconies. The profiles and holders are tested for horizontal loads of up to 3 kN/m depending on the system.',
        'Every railing uses laminated glass from two toughened sheets: if one sheet breaks, the railing stays in place.'
      ],
      spec: [['11 systems', 'channels, posts, point fixings, French balconies'], ['Laminated glass', '8.76–21.52 mm'], ['Up to 3 kN/m', 'horizontal load'], ['Up to 20 working days', 'manufacturing after approval']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Where we install glass railings',
      intro: 'Choose the place — we select the system, glass and handrail for it.',
      items: [
        ['Stair railings', 'Glass along flights and landings — frameless, point-fixed or with posts and a handrail.'],
        ['Balcony railings', 'A clean facade line with glass fixed on top of or to the edge of the slab.'],
        ['Terrace railings', 'Wind protection without blocking the view of the garden or the landscape.'],
        ['Pool fences', 'Glass from 1.2 m high with AISI 316 stainless steel hardware and an optional self-closing gate.'],
        ['Frameless railings', 'Glass clamped in a continuous base channel — no posts at all.'],
        ['Post-mounted railings', 'Glass held by clamps between stainless steel posts with a handrail — a cost-effective option.']
      ]
    },
    options: {
      eyebrow: 'Glass',
      title: 'Glass for railings',
      intro: 'Only laminated safety glass is used in railings.',
      items: [
        ['Laminated 17.52 and 21.52 mm', 'Two toughened sheets of 8 or 10 mm with a strong interlayer — for frameless channel systems and point fixings.'],
        ['Laminated 8.76 and 12.76 mm', 'Two sheets of 4 or 6 mm — for post-mounted railings where clamps hold the glass on both sides.'],
        ['Glass colour', 'Clear, low-iron (no green tint), grey and dark grey.'],
        ['Frosting and coatings', 'Full or partial frosting for privacy and an easy-clean coating that repels dirt and water.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why a glass railing',
      items: [
        ['Open view', 'Glass does not block the landscape, the garden or the interior.'],
        ['Safety', 'Laminated glass only: if one sheet breaks, the railing stays in place.'],
        ['German-engineered systems', 'Profiles, posts and holders tested for loads of up to 3 kN/m.'],
        ['Low maintenance', 'Nothing to paint; aluminium and stainless steel do not rust.'],
        ['Wind protection', 'On terraces and balconies the glass breaks draughts and noise.'],
        ['Made for your site', 'Any length and shape — straight, L or U, corners and level changes.']
      ]
    },
    faq: {
      title: 'Glass railings: FAQ',
      intro: 'Systems, glass, height, loads and installation.',
      items: [
        ['What types of glass railings are there?', 'Frameless railings in a base channel (glass held from below), point-fixed glass (holders on the slab edge), post-mounted railings with a handrail and French balconies.'],
        ['What glass is used?', 'Only laminated glass: 17.52 or 21.52 mm for frameless systems and 8.76 or 12.76 mm for post-mounted railings.'],
        ['How high should a railing be?', 'Typically from 0.9 m on stairs and 1.0–1.1 m on balconies and terraces. Frameless channels hold glass up to 1.3 m high. We check the height against the building regulations that apply to your site.'],
        ['Is a railing without posts safe?', 'Yes. The channel clamps the glass along its full length and is designed for horizontal loads of 1–3 kN/m depending on the system.'],
        ['What is a French balcony?', 'A glass railing in the opening of a floor-to-ceiling window: the window can be opened while the glass prevents falls. It is fixed to the window frame or to the reveals.'],
        ['Is glass suitable around a pool?', 'Yes. We recommend a height of at least 1.2 m and AISI 316 stainless steel hardware; a glass gate with a closer can be added.'],
        ['Can the profile match the facade colour?', 'Yes: stainless steel look, black, anthracite, white or any RAL colour.'],
        ['Is a handrail necessary?', 'For frameless railings it is optional but protects the glass edge and gives support. On post-mounted railings the handrail is part of the system.'],
        ['Does the glass withstand frost and sun?', 'Yes. Toughened laminated glass is not affected by temperature changes, and the interlayer protects against UV.'],
        ['How long does manufacturing take?', 'Up to 20 working days after all details of the project are approved: glass and profiles are made to your dimensions.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send photos, the length and the type of substrate — we will select a system and prepare an estimate.', optionsLabel: 'Where', options: ['Stair railing', 'Balcony railing', 'Terrace railing', 'Pool fence', 'Frameless railing', 'Post-mounted railing', 'French balcony'], commentPlaceholder: 'Length, height, substrate (concrete, steel, timber), handrail, location', product: 'Glass railings' }
  },

  mirrors: {
    meta: { title: 'Custom Mirrors Made to Measure — LED, Framed | Space Glass', description: 'Mirrors made to your size: LED mirrors, framed and wall mirrors, mirror panels and mirror walls for bathrooms, beauty salons, gyms and hotels.' },
    name: 'Custom mirrors',
    eyebrow: 'Custom mirrors',
    h1: 'Custom mirrors made to measure',
    lead: 'Mirrors in your dimensions: with LED lighting, framed, wall-mounted, mirror panels and mirror walls for gyms and beauty salons. We choose the mirror glass, edge finish, frame and lighting, then measure, manufacture and install.',
    heroAlt: 'Space Glass MOON full-length semicircular mirror with lighting in a bedroom',
    explore: 'View mirror types',
    intro: {
      title: 'Mirrors sized for your interior',
      paragraphs: [
        'A ready-made mirror rarely matches the wall, the vanity unit or the niche exactly: the width, the mounting height and the position of lights and sockets all change. That is why we make mirrors to measure.',
        'The work is a full cycle: survey or check of the dimensions, agreement on the shape, edge, frame and lighting scheme, manufacturing and installation. The shape, cut-outs and holes are fixed before manufacturing.',
        'Our ready LED models use Saint-Gobain MIRALITE PURE mirror glass, which resists corrosion, and have IP44 protection for bathrooms.'
      ],
      spec: [['Custom size and shape', 'for the actual wall, vanity or niche'], ['Edge of your choice', 'polished or bevelled'], ['LED lighting and demister', 'to an agreed wiring scheme'], ['IP44', 'ready LED models for bathrooms']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Types of mirrors',
      intro: 'Choose the type — then we agree the size, shape, edge, frame, lighting and mounting.',
      items: [
        ['LED mirrors', 'Front or contour lighting, optional demister, switch position agreed in advance.'],
        ['Framed mirrors', 'Metal, aluminium or decorative frames that finish the edge and protect it.'],
        ['Wall mirrors', 'Large mirrors for hallways, living rooms and bedrooms, fixed securely to the wall.'],
        ['Mirror panels', 'Mirror walls from several modules with a planned joint layout.'],
        ['Gym mirrors', '4–6 mm mirror with a safety film and a continuous surface for gyms and dance studios.'],
        ['Salon mirrors', 'Mirrors for workstations with even front lighting for beauty salons, hairdressers and barbers.']
      ]
    },
    options: {
      eyebrow: 'Details',
      title: 'Edge, light and mounting',
      intro: 'What we agree before manufacturing.',
      items: [
        ['Polished edge or bevel', 'An exposed edge is polished; a bevel adds a decorative refraction of light but slightly reduces the reflective area.'],
        ['LED lighting', 'Contour or front light, colour temperature, switch and power supply point are agreed with the wiring plan.'],
        ['Demister', 'Heating keeps the central area free of condensation after a shower; it does not replace ventilation.'],
        ['Cut-outs and mounting', 'Openings for sockets or lights are set in advance; the fixing method depends on the size, weight, humidity and wall material.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why a made-to-measure mirror',
      items: [
        ['Exact fit', 'The mirror matches the wall, vanity or niche instead of the other way round.'],
        ['Any shape', 'Rectangular, square, round or custom shapes from a template.'],
        ['Bathroom-ready', 'Corrosion-resistant mirror glass and IP44 lighting in our ready models.'],
        ['Safety where needed', 'Safety film for gyms, studios and public spaces.'],
        ['Commercial projects', 'Module layouts and fixings planned for hotels, restaurants and salons.'],
        ['Full service', 'Survey, manufacturing, delivery and installation by one team.']
      ]
    },
    faq: {
      title: 'Custom mirrors: FAQ',
      intro: 'Sizes, shapes, edges, lighting, installation and commercial projects.',
      items: [
        ['What affects the price of a mirror?', 'The size and shape, the type of mirror glass, the edge finish (polished or bevelled), lighting and demister, cut-outs, frame, delivery and installation.'],
        ['Can you make a mirror to custom dimensions?', 'Yes. Most mirrors are made to agreed dimensions for a specific wall, vanity unit or niche.'],
        ['Which shapes are possible?', 'Rectangular, square, round and custom shapes from a template. A complex outline needs an accurate template and planned fixings.'],
        ['What should I consider for an LED mirror?', 'The wiring and lighting scheme are agreed before manufacturing: contour or front light, the power supply point, the switch and its position.'],
        ['Which mirror suits a bathroom?', 'One designed for humidity: we consider the wall material and condition, ventilation and the position of electrics and plumbing.'],
        ['How is a large or heavy mirror fixed?', 'The fixing method depends on the size, weight, humidity and wall material; for bonded installation special mirror adhesives are used.'],
        ['What is a mirror wall?', 'A continuous mirror surface made of several modules. The joint layout, module sizes and the flatness of the wall are planned in advance.'],
        ['Do you make mirrors for gyms and salons?', 'Yes — gym mirrors in 4–6 mm glass with a safety film, and salon mirrors with even front lighting and accurate colour rendering.'],
        ['When is a professional survey needed?', 'The final survey is done once the finished surfaces are ready and the positions of electrics and furniture are known.'],
        ['Can I order a mirror without installation?', 'Yes, for some orders a mirror can be manufactured and delivered without installation, provided it can be transported safely.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send a photo of the wall and approximate dimensions — we will suggest the shape, edge and lighting.', optionsLabel: 'Mirror type', options: ['LED mirror', 'Framed mirror', 'Wall mirror', 'Mirror panel / mirror wall', 'Gym mirror', 'Salon mirror'], commentPlaceholder: 'Size, shape, lighting, room (bathroom, hallway, salon), location', product: 'Custom mirrors' }
  },

  canopies: {
    meta: { title: 'Glass Canopies Over Entrances, Made to Measure | Space Glass', description: 'Glass entrance canopies for houses, offices and shops: cantilevered, with tension rods, on brackets or framed. Laminated safety glass, depths up to 2 m.' },
    name: 'Glass canopies',
    eyebrow: 'Glass canopies',
    h1: 'Glass canopies over entrances',
    lead: 'Glass canopies for private houses, offices, shops and apartment buildings: cantilevered, with tension rods, on brackets, framed and with side wind protection. German-engineered systems, laminated glass, a quote from your photos.',
    heroAlt: 'Glass canopy on brackets over the entrance to a house',
    explore: 'View canopy types',
    intro: {
      title: 'Protection that keeps the facade visible',
      paragraphs: [
        'A glass canopy keeps rain and snow off the entrance but does not darken the door or overload the facade. That is why it is used over the entrances of houses, offices, shops, restaurants and apartment buildings.',
        'We work with German-engineered canopy systems: cantilevered canopies in a clamping profile, canopies on stainless steel tension rods and brackets, and aluminium or steel frames with a gutter and lighting.',
        'Only laminated glass made of toughened sheets is used: if it is damaged, the fragments stay on the interlayer.'
      ],
      spec: [['11 systems', 'cantilevered, rods, brackets, frames'], ['Laminated glass', 'fragments stay on the interlayer'], ['Up to 2 m', 'canopy depth'], ['A few hours', 'typical installation on site']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Which glass canopies we make',
      intro: 'The fixing type decides the depth of the canopy and the look of the facade.',
      items: [
        ['Cantilevered canopies', 'Fixed to the wall only, without rods or supports — the cleanest look.'],
        ['Canopies with tension rods', 'Stainless steel rods transfer the load to the wall above — for deeper canopies.'],
        ['Canopies on brackets', 'Brackets under the glass when there is no room for rods above the door.'],
        ['Framed canopies', 'An aluminium or steel frame with a gutter and lighting — for large areas.'],
        ['Canopies with side protection', 'A glass side panel that shields the entrance from wind and driving rain.'],
        ['Canopies for businesses', 'Large canopies for shops, offices and restaurants, also with a logo or lighting.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why a glass canopy',
      items: [
        ['A dry entrance', 'The canopy protects the door and people from rain and snow.'],
        ['Daylight', 'Glass does not darken the entrance or hide the facade.'],
        ['Safety', 'Laminated glass only: fragments stay on the interlayer.'],
        ['German-engineered systems', 'Tested snow loads and stainless steel hardware.'],
        ['Matches the facade', 'Clear, low-iron or satin glass; fixings in any RAL colour.'],
        ['Fast installation', 'Usually a few hours on site.']
      ]
    },
    faq: {
      title: 'Glass canopies: FAQ',
      intro: 'Types, glass, snow load, drainage and installation.',
      items: [
        ['What types of glass canopies are there?', 'Cantilevered (wall-fixed only), with tension rods, on brackets, framed and with a glass side panel against wind.'],
        ['What glass is used for a canopy?', 'Only laminated glass made of toughened sheets — if it is damaged, the fragments stay on the interlayer.'],
        ['Can a canopy carry snow?', 'Yes, the systems are designed for snow loads; the depth and glass are chosen for the region.'],
        ['Where does the water go?', 'The canopy slopes away from the wall; a gutter and downpipe can be added if needed.'],
        ['Can a canopy be fixed to an insulated facade?', 'Yes, with special fixings through the insulation.'],
        ['How deep can a canopy be?', 'From 50 cm to 2 m depending on the system.'],
        ['Can it have lighting?', 'Yes, LED spots in a framed system or separate lighting.'],
        ['Do the fixings rust?', 'No — stainless steel or coated aluminium.'],
        ['How long do manufacturing and installation take?', 'Manufacturing takes up to 20 working days after approval; installation usually takes a few hours.'],
        ['How do I care for a glass canopy?', 'Clean it with a glass cleaner a few times per season.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send a photo of the entrance and approximate dimensions — we will select a system and prepare an estimate.', optionsLabel: 'Canopy type', options: ['Cantilevered canopy', 'Canopy with tension rods', 'Canopy on brackets', 'Framed canopy', 'Canopy with side protection', 'Canopy for a business'], commentPlaceholder: 'Width and depth, wall type, lighting or gutter, location', product: 'Glass canopies' }
  },

  frameless: {
    meta: { title: 'Frameless Glazing for Terraces and Balconies | Space Glass', description: 'Frameless sliding, folding, guillotine and threshold-free glass systems for terraces, balconies, gazebos and restaurants. Single glass or insulated units.' },
    name: 'Frameless glazing',
    eyebrow: 'Frameless glazing',
    h1: 'Frameless glazing for terraces and balconies',
    lead: 'Frameless glazing for terraces, verandas, balconies, gazebos and restaurants: folding, sliding, guillotine and threshold-free systems with toughened glass or insulating glass units. The panels open fully and the view stays free of frames.',
    heroAlt: 'Frameless terrace glazing with a sea view',
    explore: 'View system types',
    intro: {
      title: 'Glass instead of walls — and open space on warm days',
      paragraphs: [
        'Frameless glazing protects a terrace, veranda, balcony or gazebo from wind, rain and dust without hiding the view behind frames: there are no vertical profiles between the glass panels.',
        'We choose the system for the way you use the space: a seasonal terrace or an extra living room, frequent passage or a windy coast, manual opening or a remote control. For the cooler months there are systems with insulating glass units.',
        'We handle the full cycle: survey and check of the slab, the panel and parking layout, manufacturing with toughened glass, installation and service.'
      ],
      spec: [['29 systems', 'folding, sliding, guillotine, threshold-free'], ['Glass 8–10 mm', 'or insulating units 20–28 mm'], ['Up to 4 m high', 'threshold from 0 mm'], ['Kyiv · Odesa · Lviv', 'survey, installation and service']]
    },
    types: {
      eyebrow: 'Systems',
      title: 'Frameless glazing systems and applications',
      intro: 'Choose by opening type or by place — we match the system to the size and exposure of your opening.',
      items: [
        ['Folding (bifold) systems', 'Panels fold and stack against the wall, opening the whole width.'],
        ['Sliding systems', 'Wide panels up to 1.3 m slide like wardrobe doors, threshold from 7.5 mm.'],
        ['Guillotine systems', 'Panels move vertically on an electric drive — remote, button or smartphone.'],
        ['Threshold-free systems', 'Panels hang from the top track, so the floor stays level.'],
        ['Insulated frameless glazing', 'Systems for insulating glass units — noticeably warmer for use beyond summer.'],
        ['Balcony glazing', 'Panoramic glazing for balconies and loggias, including apartment buildings.'],
        ['Terrace glazing', 'Glazing for terraces and verandas that opens fully in good weather.'],
        ['Gazebo glazing', 'Folding systems for round, L- and U-shaped gazebos with many corners.'],
        ['Panoramic house glazing', 'Floor-to-ceiling glass walls for houses and restaurants.']
      ]
    },
    options: {
      eyebrow: 'How they open',
      title: 'Folding, sliding, guillotine or threshold-free',
      intro: 'The opening type decides the threshold, the parking space for the panels and the comfort of use.',
      items: [
        ['Folding', 'The panels fold into a stack by the wall and open the opening completely. Threshold from 7 to 61 mm.'],
        ['Sliding', 'Wide panels slide along tracks with fewer joints. Threshold from 7.5 mm.'],
        ['Guillotine', 'The panels move vertically on an electric drive — ideal for restaurant terraces and counters.'],
        ['Threshold-free', 'Top-hung panels leave the floor completely level.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why frameless glazing',
      items: [
        ['Panorama without frames', 'No vertical profiles between the panels — just glass from floor to ceiling.'],
        ['Fully opening', 'Panels fold, slide or lift — the terrace is open again in seconds.'],
        ['Safety glass', 'Toughened glass 8–10 mm, insulating units or laminated glass only.'],
        ['Weather protection', 'Seals between the panels and water drainage protect against wind, rain, snow and dust.'],
        ['Any shape', 'Straight, L- and U-shaped, curved openings and gazebos with many corners.'],
        ['A longer season', 'A terrace or summer area works for months longer, and with insulating units almost all year.']
      ]
    },
    faq: {
      title: 'Frameless glazing: FAQ',
      intro: 'Systems, glass, thresholds, wind, warmth and installation.',
      items: [
        ['What is frameless glazing?', 'Glazing in which the toughened glass panels have no vertical frames: the glass is held only in the top and bottom profiles.'],
        ['Which is best for a terrace: folding, sliding or guillotine?', 'Folding opens the whole opening, sliding has wider panels and fewer joints, guillotine opens with a drive and suits counters and restaurant terraces.'],
        ['What glass is used?', 'Toughened glass 8 or 10 mm, toughened insulating units 20–28 mm or laminated glass — clear, satin or body-tinted.'],
        ['Is frameless glazing warm?', 'Single-glass systems are for seasonal use. Systems with insulating glass units are noticeably warmer and extend the season.'],
        ['Can it be installed without a threshold?', 'Yes: top-hung systems have no threshold, and some folding systems rise only 7 mm above the floor.'],
        ['Does the glazing withstand wind?', 'Yes. Folding systems are designed for wind loads of around 175 kg/m²; for exposed sites we choose higher profiles and thicker glass.'],
        ['Is a roof needed?', 'Yes, the system is installed between the floor and a roof or beam. If there is no roof, a glass roof or a pergola can be added.'],
        ['Can the profile be painted?', 'Yes: anodised aluminium, anthracite grey or any RAL colour; wood effect for some systems.'],
        ['Does it let in draughts?', 'Seals between the panels and around the perimeter — felt, silicone or magnetic depending on the system — keep draughts out.'],
        ['How long does installation take?', 'Installing one terrace, balcony or gazebo usually takes from one to several days after the glass is manufactured.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send photos of the opening and approximate width and height — we will select a system and prepare an estimate.', optionsLabel: 'System or place', options: ['Folding system', 'Sliding system', 'Guillotine system', 'Threshold-free system', 'Insulated frameless glazing', 'Balcony', 'Terrace or veranda', 'Gazebo', 'Panoramic house glazing'], commentPlaceholder: 'Width and height of the opening, threshold, glass, location', product: 'Frameless glazing' }
  },

  aluminium: {
    meta: { title: 'Aluminium Windows, Doors and Sliding Systems | Space Glass', description: 'Thermally broken aluminium windows, doors and lift-and-slide systems on Aluprof profiles, plus office glazing, facades, winter gardens and pergolas.' },
    name: 'Aluminium windows and doors',
    eyebrow: 'Aluminium systems',
    h1: 'Aluminium windows, doors and sliding systems',
    lead: 'Aluminium windows and doors, sliding and lift-and-slide systems, office and facade glazing, winter gardens, pergolas and pleated insect screens on Aluprof profile systems. We design, manufacture and install.',
    heroAlt: 'Large aluminium sliding doors opening onto a terrace',
    explore: 'View aluminium products',
    intro: {
      title: 'Aluminium for decades, not for a season',
      paragraphs: [
        'Aluminium allows large glass areas, slim frames and wide sliding panels, and it does not rot, warp in the sun or frost, yellow or need repainting. With a thermal break it is also a warm, energy-efficient choice.',
        'Our main profile system is Aluprof: windows, doors, pivot and folding doors, lift-and-slide systems and facades. Engineers prepare an opening schedule, product specifications and junction details before production.',
        'Profiles are machined on our own equipment; installers with more than 10 years of experience fit the products with waterproofing and vapour barriers according to technical standards.'
      ],
      spec: [['Uw from 0.62', 'W/(m²K) for windows'], ['Up to RC4', 'burglar-resistant glazing'], ['Any RAL colour', 'and wood-effect finishes'], ['Up to 30 working days', 'manufacturing after approval']]
    },
    types: {
      eyebrow: 'Products',
      title: 'Aluminium structures we make',
      intro: 'Windows, doors and systems for private homes and commercial buildings.',
      items: [
        ['Aluminium windows', 'Thermally broken windows with narrow frames and hidden hinges.'],
        ['Aluminium doors', 'Entrance, terrace and pivot doors with multi-point locks.'],
        ['Sliding and lift-and-slide doors', 'Large sliding panels for terraces and wide openings, with a thermal break.'],
        ['Office glazing', 'Internal glazing and glass walls in aluminium profiles for offices.'],
        ['Facade glazing', 'Stick and structural facades for private and commercial buildings.'],
        ['Winter gardens', 'Glazed extensions and terraces with a glass roof.'],
        ['Pergolas', 'Aluminium pergolas and sun protection for terraces.'],
        ['Pleated insect screens', 'Pleated screens for large windows and sliding doors.']
      ]
    },
    options: {
      eyebrow: 'Insulation',
      title: 'How warm an aluminium window can be',
      intro: 'The thermal break and the insulation variant decide the energy performance.',
      items: [
        ['Thermal break', 'A polyamide insert between the outer and inner parts of the profile stops the cold, so the aluminium window becomes warm.'],
        ['Insulation variants', 'Basic, with a two-component seal, or with additional insulating inserts for energy-efficient houses.'],
        ['Glazing units', 'Double or triple insulating units, safety and burglar-resistant glass up to RC4.'],
        ['Automation', 'Drives, electronic locks and access control — including smartphone control.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why aluminium',
      items: [
        ['Security', 'Rigid profiles, multi-point locks and burglar-resistant glazing up to RC4. Aluminium does not burn.'],
        ['Energy efficiency', 'Thermal breaks and two-component seals give Uw values from 0.62 W/(m²K).'],
        ['Sustainability', 'Aluminium, polyamide and EPDM are fully recyclable.'],
        ['Durability', 'The profile does not rot, warp or yellow and needs no painting for decades.'],
        ['Design', 'Narrow frames, large glass areas, any RAL colour, hidden hinges and sashes.'],
        ['Service', 'Warranty and post-warranty service: adjustment, new seals and hardware repair.']
      ]
    },
    faq: {
      title: 'Aluminium windows and doors: FAQ',
      intro: 'Systems, insulation, colours, design and installation.',
      items: [
        ['Which profile systems do you use?', 'Our main system is Aluprof: windows, doors, pivot and folding doors, lift-and-slide systems and facade systems.'],
        ['Are aluminium windows warm?', 'Yes. Systems with a thermal break reach Uw from 0.62 W/(m²K) for windows and from 0.84 W/(m²K) for lift-and-slide doors. Cold aluminium without a thermal break is used only for unheated spaces.'],
        ['Aluminium or PVC?', 'Aluminium is stronger and more durable and allows large sashes, narrow frames, sliding systems and facades. PVC is more affordable for standard windows.'],
        ['What is a thermal break?', 'A polyamide insert between the outer and inner parts of the profile. It stops the cold, so the aluminium window becomes warm.'],
        ['Can I choose the profile colour?', 'Yes. Profiles are powder-coated in any RAL colour; textured and wood-effect finishes are also available.'],
        ['Do you prepare a design?', 'Yes. We prepare an opening schedule, product specifications and standard junction details — this avoids unexpected costs.'],
        ['Can doors and sliding systems be automated?', 'Yes. Drives, electronic locks and access control are available, including smartphone control.'],
        ['How long does manufacturing take?', 'It depends on the system, profile colour and glazing units — usually up to 30 working days after the drawings are approved.'],
        ['Do you work with architects and developers?', 'Yes. We provide technical documentation, help choose the system and support the project from drawings to installation.'],
        ['Is a professional survey required?', 'Yes, for made-to-measure products a survey is essential: it defines the exact dimensions and junction details.']
      ]
    },
    form: { title: 'Need a preliminary quote?', text: 'Send a plan or drawing, or photos of the openings with dimensions — we will select the system and prepare an estimate.', optionsLabel: 'Product', options: ['Aluminium windows', 'Aluminium doors', 'Sliding / lift-and-slide doors', 'Office glazing', 'Facade glazing', 'Winter garden', 'Pergola', 'Pleated insect screens'], commentPlaceholder: 'Number and sizes of openings, insulation level, colour, location', product: 'Aluminium windows and doors' }
  },

  wintergardens: {
    meta: { title: 'Aluminium Winter Gardens and Glazed Terraces | Space Glass', description: 'Aluminium winter gardens and glazed terraces: thermally broken frames, glass roofs, sliding and folding doors. Designed for year-round or seasonal use.' },
    name: 'Winter gardens',
    eyebrow: 'Aluminium systems / Winter gardens',
    h1: 'Aluminium winter gardens and glazed terraces',
    lead: 'A glazed space next to the house that you can use all year round. We design winter gardens and terraces on Aluprof systems: an insulated frame, a glass roof, panoramic sliding or folding doors and sun protection.',
    heroAlt: 'Aluminium winter garden with sliding doors next to a private house',
    explore: 'View options',
    intro: {
      title: 'Comfort outdoors, whatever the season',
      paragraphs: [
        'A winter garden is a glazed extension or terrace in which the frame, the roof and the sliding doors work as one system. In summer the doors open along the whole width; in winter the garden becomes an extra room.',
        'For a heated garden we use thermally broken profiles and double or triple insulating glass units. For a seasonal terrace a lighter system with single glass is enough.',
        'Space Glass designs the whole garden: facade glazing, roof, sliding doors, drainage and the junctions with the house.'
      ],
      spec: [['Roof slope 5°–45°', 'winter garden roof system'], ['Glass up to 450 kg', 'in the walls and roof'], ['Panels 1.2 × 2.8 m', 'frameless sliding glazing'], ['Heated or seasonal', 'chosen for how you use it']]
    },
    types: {
      eyebrow: 'Options',
      title: 'What a winter garden is made of',
      intro: 'We combine these elements into one system for your house.',
      items: [
        ['Heated winter garden', 'Thermally broken frame and insulating glass units for year-round use.'],
        ['Seasonal glazed terrace', 'A lighter system with single glass for spring, summer and autumn.'],
        ['Glass roof', 'Insulated rafters and purlins form an independent glass roof with a gutter in the eaves beam.'],
        ['Sliding and folding doors', 'Lift-and-slide doors or frameless sliding panels that open the garden to the terrace.'],
        ['Pergolas and sun protection', 'Pergolas, external blinds and shading to keep the garden comfortable in summer.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why an aluminium winter garden',
      items: [
        ['An extra room', 'A bright space for dining, relaxing or plants, used all year round.'],
        ['Warm frame', 'Thermal breaks along the whole roof and walls.'],
        ['Large glass', 'Slim aluminium profiles carry large and heavy glazing units.'],
        ['Roof of any geometry', 'Roof slopes from 5° to 45° and complex shapes.'],
        ['Ventilation', 'Opening sashes and roof windows ventilate the garden in any weather.'],
        ['One designer', 'Frame, roof, doors, drainage and junctions with the house planned together.']
      ]
    },
    faq: {
      title: 'Winter gardens: FAQ',
      intro: 'Heated or seasonal, roof, doors and design.',
      items: [
        ['What is the difference between a heated and a seasonal winter garden?', 'A heated garden uses thermally broken profiles and insulating glass units and can be used all year. A seasonal terrace uses a lighter system with single glass.'],
        ['Which system do you use?', 'Aluprof systems: a dedicated winter garden roof system, semi-structural glass walls and frameless sliding glazing.'],
        ['What roof slopes are possible?', 'The winter garden roof system allows slopes from 5° to 45°.'],
        ['Can the garden open fully in summer?', 'Yes, with lift-and-slide doors or frameless sliding and folding panels.'],
        ['How is rainwater drained?', 'Through a gutter integrated into the eaves beam of the roof system.'],
        ['How do you prevent overheating?', 'With solar control glass, external shading, pergolas and opening sashes for ventilation.'],
        ['Do you design the connection to the house?', 'Yes. We design the whole garden — facade glazing, roof, sliding doors, drainage and the junctions with the house.'],
        ['What do you need for a preliminary quote?', 'A plan or photos of the place with dimensions, how you want to use the garden and the location.']
      ]
    },
    form: { title: 'Planning a winter garden?', text: 'Send photos of the place and approximate dimensions — we will suggest a system and prepare an estimate.', optionsLabel: 'Type', options: ['Heated winter garden', 'Seasonal glazed terrace', 'Glass roof', 'Sliding / folding doors'], commentPlaceholder: 'Dimensions, heated or seasonal, roof, doors, location', product: 'Winter gardens' }
  },

  facades: {
    meta: { title: 'Glass Facades — Design and Installation | Space Glass', description: 'Glass facades on Aluprof systems: stick, structural and unitised facades, energy-efficient glazing, shopfronts and entrances. Design and installation.' },
    name: 'Glass facades',
    eyebrow: 'Glass facades',
    h1: 'Glass facades for buildings',
    lead: 'Stick, structural and unitised glass facades, energy-efficient facades, glazing for private houses, shopfronts and glass entrances on Aluprof systems. We start with the task, calculate the loads and install the facade.',
    heroAlt: 'City block with glass facades of office buildings',
    explore: 'View facade types',
    intro: {
      title: 'A glass facade designed for your building',
      paragraphs: [
        'A glass facade defines how a building looks, how much daylight reaches the interior and how much is spent on heating and cooling. That is why we start not with a profile but with the task: a private house, an office building or a shopfront.',
        'We work with Aluprof facade systems — stick systems, semi-structural facades with slim joints, unitised facades and energy-efficient versions — and integrate windows, doors and sun protection into the facade.',
        'For every facade we calculate wind loads, glass weight and fixings to the slabs, and prepare a specification.'
      ],
      spec: [['Uf from 0.55', 'W/(m²K) for warm systems'], ['Class I5/E5', 'impact resistance'], ['EI30–EI60', 'fire-rated solutions'], ['Any RAL colour', 'anodised or wood effect']]
    },
    types: {
      eyebrow: 'Types',
      title: 'Glass facades we design and install',
      intro: 'From stick systems to shopfronts and entrances.',
      items: [
        ['Stick (mullion-transom) facades', 'A frame of mullions and transoms assembled on the building; glass is held by pressure plates.'],
        ['Structural glazing', 'No external pressure plates: from outside only glass and slim joints are visible.'],
        ['Facades for private houses', 'Living room glazing, stairwells, double-height spaces and glass roofs.'],
        ['Energy-efficient facades', 'Warm systems with insulating units and solar control for low running costs.'],
        ['Shopfront glazing', 'Large glazed shopfronts for shops, cafés and showrooms.'],
        ['Glass entrances', 'Entrance areas with pivot, sliding or panel doors integrated into the facade.']
      ]
    },
    options: {
      eyebrow: 'Construction',
      title: 'Facade systems',
      intro: 'How the facade is built and installed.',
      items: [
        ['Stick system', 'Mullions and transoms are assembled on the building and glazed on site.'],
        ['Semi-structural', 'From outside, a continuous glass surface with slim 2 cm joints instead of pressure plates.'],
        ['Unitised', 'Modules are assembled and glazed in the factory and only hung on the building.'],
        ['Cover-cap on a substructure', 'Aluminium pressure profiles on a timber or steel load-bearing frame.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: 'Why a glass facade',
      items: [
        ['Light and space', 'Glass from slab to slab fills the rooms with daylight and opens the view.'],
        ['Energy efficiency', 'Warm systems with Uf from 0.55 W/(m²K), low-e units and sun protection reduce climate costs.'],
        ['Fast installation', 'Lightweight construction; unitised facades are installed in factory-made modules.'],
        ['Safety', 'Laminated glass, impact resistance class I5/E5 and fire-rated EI30–EI60 solutions.'],
        ['Durability', 'Aluminium does not corrode or warp; EPDM seals resist UV.'],
        ['Architectural freedom', 'Curved and faceted facades, any RAL colour, glass roofs.']
      ]
    },
    faq: {
      title: 'Glass facades: FAQ',
      intro: 'Systems, energy performance, safety and design.',
      items: [
        ['What is a glass facade?', 'A curtain wall of an aluminium frame and insulating glass units fixed to the slabs. It protects from the weather, lets in light and can include opening windows and doors.'],
        ['What types of glass facades are there?', 'Stick systems, semi-structural, structural and unitised facades, and cover-cap facades on a timber or steel frame; energy-efficient versions are available for each.'],
        ['How is a facade different from windows?', 'A facade is a self-supporting curtain wall spanning several storeys and holding large glass. Windows are installed in individual openings in the walls.'],
        ['Which facade is the warmest?', 'Our warmest systems reach Uf from 0.55 W/(m²K); passive-house certified versions are available.'],
        ['What is structural glazing?', 'A facade without external pressure plates: the units are held by retainers or bonding, and from outside only glass and slim joints are visible.'],
        ['Can windows be integrated into a glass facade?', 'Yes: top-hung, tilt-and-turn, parallel-opening and concealed windows, and roof windows in a glass roof.'],
        ['How do you protect a glass facade from overheating?', 'With solar control glazing, facades with integrated blinds or external louvres.'],
        ['Is the glass in a facade safe?', 'Yes. We use toughened and laminated glass and systems with impact resistance class I5/E5; fire-rated EI30 and EI60 facades are available.'],
        ['Do you design the facade?', 'Yes. We calculate wind loads, glass weight, slab fixings and junctions and prepare the specification.'],
        ['Do you work with architects and developers?', 'Yes, we select the system for the project, prepare technical solutions and support the site until handover.']
      ]
    },
    form: { title: 'Planning a glass facade?', text: 'Send drawings or photos of the building with dimensions — we will select the system and prepare an estimate.', optionsLabel: 'Facade type', options: ['Stick facade', 'Structural glazing', 'Private house facade', 'Energy-efficient facade', 'Shopfront', 'Glass entrance'], commentPlaceholder: 'Building type, facade area, drawings available, location', product: 'Glass facades' }
  },

  business: {
    meta: { title: 'Commercial Glazing for Hotels and Offices | Space Glass', description: 'Glass solutions for hotels, restaurants, offices, shops, salons, clinics and residential developments: partitions, doors, shopfronts, railings, terraces.' },
    name: 'Commercial glazing',
    eyebrow: 'For businesses',
    h1: 'Glass solutions for businesses',
    lead: 'Glass for hotels, restaurants, offices, shops, beauty salons, clinics, residential developments and resorts: shopfronts, partitions, doors, railings, frameless terrace glazing, showers and mirrors — one team from survey to handover.',
    heroAlt: 'Hotel lobby with glass structures',
    explore: 'Choose your business',
    intro: {
      title: 'One contractor for every glass zone',
      paragraphs: [
        'Commercial projects need more than good glass: a schedule that does not stop the business, hardware made for heavy use and one specification for all zones — from the entrance to the bathrooms.',
        'We survey the whole site once, prepare one specification, manufacture and install out of hours, at weekends or in stages, and stay available for service afterwards.',
        'We work with companies under a contract with full documentation, and with designers and architects from the drawing stage.'
      ],
      spec: [['One survey', 'one specification for all zones'], ['Out-of-hours installation', 'or in agreed stages'], ['Up to 20 / 30 working days', 'glass / aluminium production'], ['5 · 2 · 1 years', 'warranty on glass, hardware, installation']]
    },
    types: {
      eyebrow: 'Sectors',
      title: 'Solutions for your business',
      intro: 'What we typically make for each type of business.',
      items: [
        ['Hotels', 'Showers and bath screens for every room, glass doors, railings, lobby partitions and mirrors.'],
        ['Restaurants and cafés', 'Frameless terrace glazing, guillotine windows, shopfronts, partitions and mirror walls.'],
        ['Offices', 'Glass partitions, meeting rooms, glass doors and branding on glass.'],
        ['Shops and showrooms', 'Shopfronts, glass entrances, shelves, display podiums and canopies.'],
        ['Beauty salons', 'Mirrors for workstations, partitions and glass doors.'],
        ['Clinics and dental practices', 'Partitions and doors with frosted glass, easy to clean and keep hygienic.'],
        ['Residential developments', 'Balcony and stair railings, entrance canopies, lobby glazing — as a series.'],
        ['Resorts and recreation', 'Terrace and gazebo glazing, railings, showers and canopies.']
      ]
    },
    benefits: {
      eyebrow: 'Benefits',
      title: '5 years warranty on glass, 2 on hardware, 1 on installation',
      items: [
        ['One project for everything', 'One survey and one specification for every zone of your premises.'],
        ['No downtime', 'Installation out of hours, at weekends or in stages to an agreed schedule.'],
        ['Heavy-duty hardware', 'Closers, hinges and tracks for intensive use and heavy footfall.'],
        ['Branding on glass', 'Frosting, film or print to your logo and corporate design.'],
        ['Series and chains', 'A standard solution developed once and rolled out to every outlet or room.'],
        ['Service after handover', 'Hardware adjustment, new seals and staff advice.']
      ]
    },
    faq: {
      title: 'Commercial glazing: FAQ',
      intro: 'Scope of work, contracts, schedules, warranty and installation.',
      items: [
        ['Which businesses do you make glass structures for?', 'Hotels, restaurants and cafés, offices, shops, beauty salons, clinics and dental practices, residential developments and resorts.'],
        ['What exactly do you make for businesses?', 'Glass partitions and doors, entrances, shopfronts, frameless terrace glazing, railings, showers, mirrors, canopies, shelves and counters.'],
        ['Do you work with companies under a contract?', 'Yes, under a contract with a full set of documents.'],
        ['Can everything for one venue be ordered as a single project?', 'Yes, we do one survey and one specification for every zone — from the entrance to the bathrooms.'],
        ['Can you install without stopping our business?', 'Yes, out of hours, at weekends or in stages to an agreed schedule.'],
        ['How long does a project take?', 'Glass structures take up to 20 working days and aluminium structures up to 30 working days after all details are approved; a series schedule is agreed separately.'],
        ['Can you put a logo on the glass?', 'Yes, by frosting, film or print from your design.'],
        ['Do you work with chains and series?', 'Yes, we develop a standard solution and roll it out to every outlet or room.'],
        ['Is glass suitable for heavy footfall?', 'Yes, with reinforced hardware: closers, hinges and tracks for intensive use.'],
        ['Where can I see your work?', 'In the Projects section — hotels, restaurants, offices, clinics and shops.']
      ]
    },
    form: { title: 'Shall we discuss your project?', text: 'Tell us about your business and what needs to be done — we will suggest a solution for each zone and prepare a preliminary quote.', optionsLabel: 'Your business', options: ['Hotel', 'Restaurant or café', 'Office', 'Shop or showroom', 'Beauty salon', 'Clinic or dental practice', 'Residential development', 'Resort'], commentPlaceholder: 'Type of venue, area, what is needed (partitions, terrace, shopfront…), location', product: 'Commercial glazing' }
  }
};
