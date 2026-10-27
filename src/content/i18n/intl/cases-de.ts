// DE Referenzen. Fakten nur aus den Projektdaten (src/content/projects/*.json) bzw. für Nofilters aus
// der geprüften Premium-Fallstudie (src/data/project-cases/nofilters.ts). «Allgemeine Information» =
// wie Space Glass üblicherweise arbeitet, nicht Daten dieses Projekts.
import type { CaseCopy, CaseLabels } from './types';

export const caseLabelsDe: CaseLabels = {
  home: 'Startseite', projects: 'Projekte', breadcrumbs: 'Brotkrümelnavigation', photos: 'Fotos ansehen', openPhoto: 'Foto öffnen', factsLabel: 'Projektdaten',
  about: 'Über das Projekt', task: 'Aufgabe', solution: 'Unsere Lösung', tech: 'Technische Details', process: 'Umsetzung', projectFact: 'In diesem Projekt', result: 'Ergebnis',
  benefits: 'Vorteile', gallery: 'Galerie', generalTag: 'Allgemeine Information', service: 'Leistung', also: 'Auch',
  faqIntro: 'Antworten zu Kostenschätzung, Sondermaßen, Material, Montage und Pflege.', relatedEyebrow: 'Weitere Projekte', relatedTitle: 'Weitere umgesetzte Projekte', back: 'Alle Projekte',
  lbLabel: 'Projektfotos ansehen', close: 'Schließen', prev: 'Vorheriges Foto', next: 'Nächstes Foto', of: 'von', viewProject: 'Projekt ansehen'
};

const generalGlassSteps = [
  { title: 'Aufmaß', text: 'Wir messen die Öffnungen und prüfen Untergründe und Höhen vor Ort.' },
  { title: 'Zeichnung', text: 'Maße, Glas, Beschläge und Befestigung werden vor der Fertigung freigegeben.' },
  { title: 'Fertigung', text: 'Das Glas wird nach den freigegebenen Maßen zugeschnitten, bearbeitet und vorgespannt.' },
  { title: 'Montage', text: 'Wir montieren, justieren und übergeben die fertige Konstruktion.' }
];

export const casesDe: Record<string, CaseCopy> = {
  osocor: {
    seo: { title: 'Rahmenlose Terrassenverglasung, OSOCOR RESIDENCE, Kyjiw', description: 'Rahmenlose Terrassenverglasung, Glasgeländer und Glastüren für OSOCOR RESIDENCE in Kyjiw: das fertige Projekt, wichtige Details und die Montage.' },
    h1: 'Rahmenlose Terrassenverglasung und Glasgeländer in Kyjiw',
    cardTitle: 'Rahmenlose Terrassenverglasung in Kyjiw',
    city: 'Kyjiw',
    objectType: 'OSOCOR RESIDENCE',
    constructionType: 'Rahmenlose Verglasung, Geländer und Glastüren',
    shortDescription: 'Rahmenlose Verglasung, Glasgeländer und Glastüren für OSOCOR RESIDENCE in Kyjiw — Schutz vor Wind und Regen, ohne die Aussicht zu verlieren.',
    categoryLabel: 'Rahmenlose Verglasung',
    facts: [
      { label: 'Art', value: 'Rahmenlose Verglasung, Geländer und Glastüren' },
      { label: 'Objekt', value: 'OSOCOR RESIDENCE' },
      { label: 'Stadt', value: 'Kyjiw' },
      { label: 'Ausführung', value: 'Nach individuellen Maßen' }
    ],
    coverAlt: 'Rahmenlose Terrassenverglasung bei OSOCOR RESIDENCE in Kyjiw — ein umgesetztes Projekt von Space Glass',
    galleryAlts: ['Panoramablick auf die rahmenlose Verglasung', 'Glasfront der Terrasse', 'Transparentes Glasgeländer', 'Rahmenloses Verglasungssystem von der Seite', 'Terrassenverglasung nach der Montage'],
    galleryTitle: 'Die Terrasse nach der Montage',
    task: { title: 'Eine Lösung für OSOCOR RESIDENCE', text: 'Gefragt war eine Verglasung, die zur Geometrie der Terrasse, zur täglichen Nutzung und zum vorhandenen Ausbau passt — ein sauberes Ergebnis statt einer Standardlösung.' },
    solution: { title: 'Rahmenlose Verglasung, Geländer und Glastüren', paragraphs: ['Die Verglasung wurde so geplant, dass sie vor Regen und Wind schützt, ohne Aussicht und Tageslicht zu verstellen.', 'Proportionen und Ausführung von Verglasung, Geländern und Türen wurden auf die Architektur des fertigen Raums abgestimmt.'] },
    tech: { title: 'Materialien', items: [{ label: 'Glas', value: 'Sicherheitsglas' }, { label: 'System', value: 'Aluminium-Laufschienensystem' }, { label: 'Abdichtung', value: 'Dichtungselemente' }, { label: 'Ausführung', value: 'Nach individuellen Maßen' }] },
    process: { title: 'Montage am fertigen Objekt', fact: 'Laufschienen und Glaselemente wurden nach der tatsächlichen Geometrie der Öffnungen montiert; Lauf jedes Flügels und gleichmäßige Anschlüsse wurden geprüft.', general: { label: 'So setzen wir rahmenlose Verglasungen um', steps: generalGlassSteps } },
    result: { title: 'Ergebnis', text: 'Die Verglasung erfüllt ihre Funktion, passt zu den Proportionen der Terrasse und unterstützt den Stil von OSOCOR RESIDENCE.' },
    benefits: { title: 'Warum rahmenlose Verglasung für Terrassen', note: 'Vorteile rahmenloser Verglasung allgemein, keine Daten dieses Projekts.', items: [{ title: 'Freie Sicht', text: 'Keine senkrechten Rahmen zwischen den Glasflügeln.' }, { title: 'Ganz zu öffnen', text: 'Bei schönem Wetter schieben oder falten sich die Flügel weg.' }, { title: 'Wetterschutz', text: 'Dichtungen und Entwässerung halten Wind, Regen und Staub ab.' }, { title: 'Längere Saison', text: 'Die Terrasse ist mehr Monate im Jahr nutzbar.' }] },
    service: { hubId: 'frameless', title: 'Passende Leistung', text: 'Systeme, Glasoptionen und Ablauf — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir planen eine rahmenlose Verglasung für Ihre Terrasse oder Ihren Balkon.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Lässt sich eine ähnliche Lösung auf ein anderes Objekt übertragen?', 'Ja. Jede Konstruktion planen wir nach den tatsächlichen Maßen, der Geometrie der Öffnung, den Befestigungsbedingungen und Ihren Wünschen zu Glas und Beschlägen.'],
      ['Was brauchen Sie für eine Kostenschätzung?', 'Senden Sie uns Standort, ungefähre Maße und Fotos des Einbauorts und beschreiben Sie kurz das gewünschte Ergebnis. Danach klären wir die Ausführung.'],
      ['Ist die Montage enthalten?', 'Ja, Space Glass übernimmt Aufmaß, Fertigung, Lieferung und fachgerechte Montage. Der genaue Umfang steht im Angebot.']
    ],
    requestExample: 'rahmenlose Verglasung für eine Terrasse mit ca. 6 m Breite, Ort'
  },
  'stair-railing': {
    seo: { title: 'Glasgeländer an der Treppe mit Titannitrid-Oberfläche | Space Glass', description: 'Treppe und Glasgeländer in einem Einfamilienhaus: Metallteile mit goldfarbener Titannitrid-Beschichtung, Glas entlang des Laufs und der offenen Galerie.' },
    h1: 'Treppe und Glasgeländer mit Titannitrid in einem Einfamilienhaus',
    cardTitle: 'Glasgeländer an der Treppe mit Titannitrid',
    objectType: 'Einfamilienhaus',
    constructionType: 'Treppe und Glasgeländer',
    shortDescription: 'Treppe und Glasgeländer in einem Einfamilienhaus: Die Metallteile sind mit Titannitrid beschichtet, das Glas begleitet den Lauf und die offene Kante des Obergeschosses.',
    categoryLabel: 'Glasgeländer',
    facts: [
      { label: 'Konstruktion', value: 'Treppe und Glasgeländer' },
      { label: 'Objekt', value: 'Einfamilienhaus' },
      { label: 'Metalloberfläche', value: 'Titannitrid' }
    ],
    coverAlt: 'Glasgeländer an der Treppe mit goldfarbenem Titannitrid-Handlauf in einem Einfamilienhaus',
    heroCaption: 'Treppenlauf mit Glasgeländer und Titannitrid-Handlauf',
    galleryAlts: [
      'Treppenlauf von unten: Glas auf beiden Seiten und Handläufe mit Titannitrid-Beschichtung',
      'Glasgeländer an der offenen Kante des Obergeschosses mit goldfarbener Einfassung',
      'Titannitrid-Handlauf über dem Treppenlauf neben einem Fenster',
      'Blick von oben auf die Wendung der Treppe mit Glasgeländer',
      'Glasgeländer des Laufs vor dem Wohnzimmer mit Sofas',
      'Glasgeländer entlang des Treppenauges zum unteren Geschoss',
      'Goldfarbener Handlauf an der Wendung des Laufs',
      'Glashalter-Pfosten mit Titannitrid-Beschichtung an der Deckenkante'
    ],
    galleryTitle: 'Treppe und Geländer im Haus',
    about: { title: 'Treppe und Glasgeländer', paragraphs: ['Das Objekt ist ein Einfamilienhaus. Space Glass hat die Treppe und das Glasgeländer ausgeführt; die Metallteile der Konstruktion sind mit Titannitrid beschichtet.', 'Die Fotos zeigen, wie der goldfarbene Handlauf und die Einfassung des Laufs entlang der Treppe verlaufen und sich als Geländer im Obergeschoss fortsetzen, während das Glas den Raum hell und offen hält.'] },
    tech: { title: 'Was über das Projekt bekannt ist', items: [{ label: 'Objekt', value: 'Einfamilienhaus' }, { label: 'Konstruktion', value: 'Treppe und Glasgeländer' }, { label: 'Metalloberfläche', value: 'Titannitrid (Goldton)' }, { label: 'Geländer', value: 'Entlang des Laufs und der Galeriekante' }] },
    result: { title: 'Ergebnis', text: 'Die Treppe wurde zum Mittelpunkt des Interieurs: Das Glas verschließt den Raum nicht, und das Metall mit Titannitrid unterstreicht die warme Farbpalette des Hauses.' },
    benefits: { title: 'Warum ein Glasgeländer an der Treppe', note: 'Vorteile von Glasgeländern allgemein, keine Daten dieses Projekts.', items: [{ title: 'Licht geht durch', text: 'Glas verdunkelt weder Treppenhaus noch Galerie.' }, { title: 'Verbundsicherheitsglas', text: 'Bricht eine Scheibe, bleibt das Geländer an seinem Platz.' }, { title: 'Eine Linie', text: 'Lauf und Galeriekante lassen sich im selben Stil ausführen.' }, { title: 'Metallfarbe nach Wunsch', text: 'Handläufe und Halter passen sich der Farbwelt an.' }] },
    service: { hubId: 'railings', title: 'Passende Leistung', text: 'Geländersysteme, Glas und Höhen — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir planen ein Glasgeländer für Ihre Treppe.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Was ist eine Titannitrid-Beschichtung?', 'Eine dünne dekorative Schutzschicht auf Metall, die ihm einen Goldton verleiht. Sie wird für Handläufe, Profile und Beschläge verwendet, wenn Messing- oder Goldoptik gewünscht ist.'],
      ['Lässt sich das Treppengeländer mit dem Geländer im Obergeschoss kombinieren?', 'Ja. Geländer am Lauf und an der offenen Deckenkante können im gleichen Stil ausgeführt werden, sodass Handlauf und Glas ohne Materialwechsel durchlaufen.'],
      ['Ist eine andere Metallfarbe möglich?', 'Ja. Die Farbe der Metallteile wählen wir zusammen mit dem Glas passend zum Interieur; die Optionen stimmen wir bei der Kostenschätzung ab.']
    ],
    requestExample: 'Glasgeländer für Treppe und Galerie im Obergeschoss, Metallfarbe, Ort'
  },
  'coffee-ocean': {
    seo: { title: 'Glasfassade eines Cafés mit Ausgabefenster, Odesa | Space Glass', description: 'Fassadenverglasung und Ausgabefenster für das Café Coffee Ocean an der Arkadia-Allee in Odesa: das fertige Projekt, wichtige Details und die Montage.' },
    h1: 'Glasfassade eines Cafés mit Ausgabefenster in Odesa',
    cardTitle: 'Fassadenverglasung eines Cafés in Odesa',
    city: 'Odesa',
    objectType: 'Café Coffee Ocean',
    constructionType: 'Fassadenverglasung und Ausgabefenster',
    shortDescription: 'Fassadenverglasung, Ausgabefenster und gläserner Eingang für das Café Coffee Ocean an der Arkadia-Allee in Odesa.',
    categoryLabel: 'Glasfassaden',
    facts: [
      { label: 'Art', value: 'Fassadenverglasung und Ausgabefenster' },
      { label: 'Objekt', value: 'Café Coffee Ocean' },
      { label: 'Stadt', value: 'Odesa' },
      { label: 'Ausführung', value: 'Nach individuellen Maßen' }
    ],
    coverAlt: 'Glasfassade des Cafés Coffee Ocean in Odesa — ein umgesetztes Projekt von Space Glass',
    galleryAlts: ['Glasfassade des Cafés Coffee Ocean an der Arkadia-Allee in Odesa', 'Ausgabefenster in der Glasfassade des Cafés Coffee Ocean', 'Gläserner Eingang des Cafés Coffee Ocean in Odesa'],
    galleryTitle: 'Die Fassade des Cafés',
    task: { title: 'Eine Fassade für das Café Coffee Ocean', text: 'Das Café brauchte eine Fassade, die zur Geometrie des Gebäudes, zur täglichen Nutzung und zum vorhandenen Ausbau passt — mit einem Ausgabefenster für Gäste draußen.' },
    solution: { title: 'Fassadenverglasung und Ausgabefenster', paragraphs: ['Die Fassade wurde an die Architektur des Gebäudes, die Funktion des Cafés sowie die Lage von Eingängen und Servicebereichen angepasst.', 'Proportionen und Ausführung wurden auf den fertigen Raum abgestimmt.'] },
    tech: { title: 'Materialien', items: [{ label: 'Verglasung', value: 'Glas oder Isolierglas' }, { label: 'System', value: 'Aluminium-Fassadensystem' }, { label: 'Abdichtung', value: 'Dichtstoffe' }, { label: 'Ausführung', value: 'Nach individuellen Maßen' }] },
    process: { title: 'Montage in Etappen', fact: 'Die Fassade wurde in Etappen montiert, mit Kontrolle der Profilgeometrie, der Fugen, der Abdichtung und der Funktion der integrierten Türen und Fenster.' },
    result: { title: 'Ergebnis', text: 'Die Fassade erfüllt ihre Funktion, passt zu den Proportionen des Gebäudes und unterstreicht den Stil des Cafés.' },
    benefits: { title: 'Warum Glasfassaden für Cafés und Läden', note: 'Vorteile von Glasfassaden und Schaufenstern allgemein, keine Daten dieses Projekts.', items: [{ title: 'Sichtbarkeit', text: 'Passanten sehen den Innenraum und die Theke.' }, { title: 'Tageslicht', text: 'Der Raum bleibt den ganzen Tag hell.' }, { title: 'Ausgabefenster', text: 'Gäste werden direkt von der Straße aus bedient.' }, { title: 'Langlebiges System', text: 'Aluminiumprofile korrodieren nicht und sind wartungsarm.' }] },
    service: { hubId: 'facades', title: 'Passende Leistung', text: 'Fassadensysteme, Schaufenster und Eingänge — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir planen eine Fassade oder ein Schaufenster für Ihr Café oder Geschäft.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Lässt sich eine ähnliche Lösung auf ein anderes Gebäude übertragen?', 'Ja. Jede Konstruktion planen wir nach den tatsächlichen Maßen, der Geometrie der Öffnungen, den Befestigungsbedingungen und Ihren Wünschen zu Glas und Beschlägen.'],
      ['Was brauchen Sie für eine Kostenschätzung?', 'Senden Sie uns Standort, ungefähre Maße und Fotos der Fassade und beschreiben Sie kurz das gewünschte Ergebnis. Danach klären wir die Ausführung.'],
      ['Ist die Montage enthalten?', 'Ja, Space Glass übernimmt Aufmaß, Fertigung, Lieferung und fachgerechte Montage. Der genaue Umfang steht im Angebot.']
    ],
    requestExample: 'Schaufensterverglasung mit Ausgabefenster für ein Café, ungefähre Größe, Ort'
  },
  'office-odesa': {
    seo: { title: 'Glastrennwände mit Türen für ein Büro in Odesa | Space Glass', description: 'Glastrennwände mit Türen für ein Büro im Businesscenter Morskyj in Odesa: das fertige Projekt, wichtige Details und die Montage.' },
    h1: 'Büro-Glastrennwände mit Türen in Odesa',
    cardTitle: 'Büro-Glastrennwände in Odesa',
    city: 'Odesa',
    objectType: 'Büro, Businesscenter Morskyj',
    constructionType: 'Büro-Glastrennwände',
    shortDescription: 'Glastrennwände mit Türen für ein Büro im Businesscenter Morskyj in Odesa — Raumgliederung ohne das Gefühl einer massiven Wand.',
    categoryLabel: 'Glastrennwände',
    facts: [
      { label: 'Art', value: 'Büro-Glastrennwände' },
      { label: 'Objekt', value: 'Büro, Businesscenter Morskyj' },
      { label: 'Stadt', value: 'Odesa' },
      { label: 'Ausführung', value: 'Nach individuellen Maßen' }
    ],
    coverAlt: 'Büro-Glastrennwände mit Türen im Businesscenter Morskyj in Odesa',
    galleryAlts: ['Gesamtansicht der Glastrennwand', 'Raumgliederung im Büro mit Glas', 'Profil der Glastrennwand', 'Glaselement und Beschläge', 'Die Trennwand von der Raumseite'],
    galleryTitle: 'Die Trennwände im Büro',
    task: { title: 'Trennwände für ein Büro im Businesscenter Morskyj', text: 'Gefragt waren Trennwände, die zur Geometrie des Büros, zur täglichen Nutzung und zum vorhandenen Ausbau passen — ein sauberes Ergebnis statt einer Standardlösung.' },
    solution: { title: 'Büro-Glastrennwände mit Türen', paragraphs: ['Die Trennwand wurde nach der tatsächlichen Geometrie der Öffnung und der Nutzung geplant und gliedert das Büro, ohne wie eine schwere Wand zu wirken.', 'Proportionen und Ausführung wurden auf das fertige Interieur abgestimmt.'] },
    tech: { title: 'Materialien', items: [{ label: 'Glas', value: 'Sicherheitsglas' }, { label: 'System', value: 'Profilsystem' }, { label: 'Beschläge', value: 'Tür- und Anschlussbeschläge' }, { label: 'Ausführung', value: 'Nach individuellen Maßen' }] },
    process: { title: 'Montage im fertigen Büro', fact: 'Die Trennwände wurden an den fertigen Oberflächen montiert. Danach wurden Lot, Anschlüsse und Funktion der Türen geprüft.', general: { label: 'So setzen wir Glastrennwände um', steps: generalGlassSteps } },
    result: { title: 'Ergebnis', text: 'Die Trennwände erfüllen ihre Funktion, passen zu den Proportionen des Büros und unterstreichen seinen Stil.' },
    benefits: { title: 'Warum Glastrennwände im Büro', note: 'Vorteile von Büro-Glastrennwänden allgemein, keine Daten dieses Projekts.', items: [{ title: 'Tageslicht', text: 'Licht erreicht jeden Arbeitsplatz.' }, { title: 'Saubere Montage', text: 'Ohne Nassarbeiten, im Büro meist 1–3 Tage.' }, { title: 'Mehr Ruhe', text: 'VSG und Dichtungen senken den Schall.' }, { title: 'Sichtschutz nach Bedarf', text: 'Satinatoglas oder satinierte Streifen, wo nötig.' }] },
    service: { hubId: 'partitions', title: 'Passende Leistung', text: 'Trennwandarten, Glas und Türen — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir planen Glastrennwände für Ihr Büro.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Lässt sich eine ähnliche Lösung auf ein anderes Büro übertragen?', 'Ja. Jede Konstruktion planen wir nach den tatsächlichen Maßen, der Geometrie der Öffnung, den Befestigungsbedingungen und Ihren Wünschen zu Glas und Beschlägen.'],
      ['Was brauchen Sie für eine Kostenschätzung?', 'Senden Sie uns Standort, ungefähre Maße oder einen Büroplan und Fotos und beschreiben Sie kurz das gewünschte Ergebnis. Danach klären wir die Ausführung.'],
      ['Ist die Montage enthalten?', 'Ja, Space Glass übernimmt Aufmaß, Fertigung, Lieferung und fachgerechte Montage. Der genaue Umfang steht im Angebot.']
    ],
    requestExample: 'Glastrennwände mit Türen für ein Büro, Raummaße, Ort'
  },
  'hotel-showers': {
    seo: { title: 'Glasduschen und Badewannenaufsätze für ein Hotel in Odesa', description: 'Duschwände und Badewannenaufsätze aus Glas für das Hotel Dworjanskyj in Odesa: ein Standard für alle Zimmer, montiert im laufenden Betrieb.' },
    h1: 'Duschwände aus Glas für ein Hotel in Odesa',
    cardTitle: 'Duschwände für ein Hotel in Odesa',
    city: 'Odesa',
    objectType: 'Hotel Dworjanskyj',
    constructionType: 'Duschwände und Badewannenaufsätze',
    shortDescription: 'Duschwände und Badewannenaufsätze aus Glas für das Hotel Dworjanskyj in Odesa — ein Qualitätsstandard für alle Zimmer.',
    categoryLabel: 'Glasduschen',
    facts: [
      { label: 'Art', value: 'Duschwände und Badewannenaufsätze' },
      { label: 'Objekt', value: 'Hotel Dworjanskyj' },
      { label: 'Stadt', value: 'Odesa' },
      { label: 'Ausführung', value: 'Nach individuellen Maßen' }
    ],
    coverAlt: 'Glasduschen im Hotel Dworjanskyj in Odesa — ein umgesetztes Projekt von Space Glass',
    galleryAlts: ['Gesamtansicht der Duschzone', 'Sicherheitsglas der Duschabtrennung', 'Beschläge und Glasbefestigung', 'Anschluss des Glases an die Wandoberfläche', 'Fertige Duschabtrennung nach der Montage'],
    galleryTitle: 'Duschen in den Hotelzimmern',
    task: { title: 'Gleiche Konstruktionen für mehrere Hotelzimmer', text: 'Die Bäder im Hotel Dworjanskyj waren unterschiedlich ausgestattet — teils mit Dusche, teils mit Badewanne. Gesucht war ein Auftragnehmer, der Duschwände und Badewannenaufsätze für alle Zimmer gleichzeitig nach demselben Qualitätsstandard fertigt.' },
    solution: { title: 'Duschwände und Badewannenaufsätze', paragraphs: ['Zimmer mit Duschzone erhielten Duschwände aus Glas, Zimmer mit Badewanne Badewannenaufsätze.', 'Beschläge und Glasart wurden im ganzen Hotel vereinheitlicht, damit Wartung und ein späterer Teiletausch in allen Zimmern gleich sind.'] },
    tech: { title: 'Materialien', items: [{ label: 'Glas', value: 'Sicherheitsglas' }, { label: 'Beschläge', value: 'Feuchtigkeitsbeständige Beschläge' }, { label: 'Abdichtung', value: 'Dichtungselemente' }, { label: 'Ausführung', value: 'Nach individuellen Maßen' }] },
    process: { title: 'Zimmer für Zimmer, ohne Hotelschließung', fact: 'Aufmaß und Montage erfolgten Zimmer für Zimmer nach einem mit dem Hotel abgestimmten Zeitplan, sodass der Gästebetrieb weiterlief. Trotz einheitlicher Ausstattung wurde die Geometrie jedes Bades einzeln geprüft.' },
    result: { title: 'Ergebnis', text: 'Das Hotel erhielt Duschwände und Badewannenaufsätze in gleicher Qualität für alle Zimmer — das vereinfacht Wartung und den Austausch einzelner Teile.' },
    benefits: { title: 'Warum Hotels Glasduschen wählen', note: 'Vorteile von Glasduschen für Hotels allgemein, keine Daten dieses Projekts.', items: [{ title: 'Ein Standard', text: 'Gleiches Glas und gleiche Beschläge in jedem Zimmer.' }, { title: 'Einfache Wartung', text: 'Identische Teile lassen sich leicht warten und tauschen.' }, { title: 'Hygienische Flächen', text: 'Glattes Glas ist zwischen zwei Gästen schnell gereinigt.' }, { title: 'Kein Stillstand', text: 'Die Montage folgt dem Belegungsplan des Hotels.' }] },
    service: { hubId: 'showers', title: 'Passende Leistung', text: 'Duschtypen, Glas und Beschläge — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir fertigen Glasduschen für Ihr Hotel oder Ihr Zuhause.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Lässt sich eine ähnliche Lösung auf ein anderes Hotel übertragen?', 'Ja. Jede Konstruktion planen wir nach den tatsächlichen Maßen, der Geometrie jedes Bades, den Befestigungsbedingungen und Ihren Wünschen zu Glas und Beschlägen.'],
      ['Was brauchen Sie für eine Kostenschätzung?', 'Senden Sie uns Standort, Zimmeranzahl, ungefähre Maße und Fotos typischer Bäder. Danach klären wir die Ausführung.'],
      ['Ist die Montage enthalten?', 'Ja, Space Glass übernimmt Aufmaß, Fertigung, Lieferung und fachgerechte Montage. Der genaue Umfang steht im Angebot.']
    ],
    requestExample: 'Duschwände und Badewannenaufsätze für 20 Hotelzimmer, Ort'
  },
  nofilters: {
    seo: { title: 'Ovale Spiegel nach Maß für einen Kosmetiksalon, Odesa | Space Glass', description: 'Ovale Spiegel nach individuellem Design für die Arbeitsplätze des Kosmetiksalons Nofilters in Odesa: Aufgabe, Lösung und das fertige Interieur.' },
    h1: 'Spiegel für den Kosmetiksalon Nofilters in Odesa',
    cardTitle: 'Spiegel für einen Kosmetiksalon in Odesa',
    city: 'Odesa',
    objectType: 'Kosmetiksalon Nofilters',
    constructionType: 'Spiegel für einen Kosmetiksalon',
    shortDescription: 'Ovale Spiegel nach individuellem Design mit bearbeiteter Kante für die Arbeitsplätze des Kosmetiksalons Nofilters in Odesa.',
    categoryLabel: 'Spiegel',
    facts: [
      { label: 'Objekt', value: 'Kosmetiksalon Nofilters' },
      { label: 'Stadt', value: 'Odesa' },
      { label: 'Produkte', value: 'Spiegel für Arbeitsplätze' },
      { label: 'Form', value: 'Oval, individuelles Design' },
      { label: 'Kante', value: 'Bearbeitet' }
    ],
    coverAlt: 'Drei ovale Spiegel in einer Reihe an der dunkelgrünen Wand des Salons Nofilters, vor jedem ein Arbeitsstuhl',
    heroCaption: 'Eine Reihe ovaler Spiegel an den Arbeitsplätzen',
    galleryAlts: ['Ovaler Spiegel mit dunkler Kontur neben einem Arbeitsstuhl im Salon Nofilters'],
    galleryTitle: 'Spiegel im Salon',
    about: { title: 'Spiegel als Teil des Salonkonzepts', paragraphs: ['Nofilters ist ein Kosmetiksalon in Odesa. Space Glass fertigte die Spiegel für die Arbeitsplätze: Spiegel in individueller Form mit bearbeiteter Kante.', 'Im Salon ist der Spiegel Arbeitsgerät und zugleich das auffälligste Element des Raums — deshalb wurden die Spiegel nach einem individuellen Design passend zum Interieurkonzept gefertigt.'] },
    task: { title: 'Die Aufgabe', text: 'Der Salon wünschte Spiegel, die ein stilvolles, modernes Interieur schaffen und zum Konzept des Hauses passen. Die Spiegel waren für die Arbeitsplätze bestimmt.' },
    solution: { title: 'Ein ovaler Spiegel für jeden Arbeitsplatz', paragraphs: ['Für jeden Arbeitsplatz wurde ein Spiegel nach individuellem Design gefertigt. Das Foto zeigt eine Reihe aus drei ovalen Spiegeln an einer dunkelgrünen Wand — jeder gegenüber seinem Stuhl, mit gleichem Abstand.', 'Eine dunkle Kontur an der Kante setzt jeden Spiegel von der Wand ab und fasst die drei Spiegel zu einer Komposition zusammen.', 'Ein weiterer ovaler Spiegel hängt an einem separaten Arbeitsplatz.'] },
    tech: { title: 'Technische Details', items: [{ label: 'Form', value: 'Oval, individuelles Design' }, { label: 'Kante', value: 'Bearbeitet' }, { label: 'Einsatz', value: 'Arbeitsplätze im Salon' }, { label: 'Ausführung', value: 'Für jeden Arbeitsplatz einzeln' }] },
    process: { title: 'Umsetzung', fact: 'Die Spiegel wurden nach Abschluss des Innenausbaus montiert — auf die fertigen Wände.', general: { label: 'So arbeiten wir mit Spiegeln für Gewerberäume', steps: [{ title: 'Aufmaß', text: 'Wir messen die Wände und markieren die Lage der Arbeitsplätze.' }, { title: 'Form und Anordnung', text: 'Wir stimmen die Form der Spiegel und ihre Position an der Wand ab.' }, { title: 'Fertigung', text: 'Die Spiegel werden in der abgestimmten Form zugeschnitten.' }, { title: 'Montage', text: 'Wir montieren die Spiegel an den vorbereiteten Wänden.' }] } },
    result: { title: 'Ergebnis', text: 'Der Salon erhielt ein stimmiges Interieur: Die Spiegel an den Arbeitsplätzen sind einheitlich gestaltet und unterstützen das Konzept des Hauses.' },
    benefits: { title: 'Warum diese Lösung zu Salons passt', note: 'Vorteile dieser Spiegelart allgemein, keine Daten dieses Projekts.', items: [{ title: 'Ein Spiegel pro Platz', text: 'Stylist und Kunde arbeiten mit ihrem eigenen Spiegel, Nachbarplätze lenken nicht ab.' }, { title: 'Ohne Ecken', text: 'Ein Oval wirkt weicher als ein Rechteck und hat keine Ecken, an denen man hängen bleibt.' }, { title: 'Passend zum Raum', text: 'Der Spiegel wird auf Stuhlhöhe und Platzbreite gefertigt.' }, { title: 'Bearbeitete Kante', text: 'Eine glatte Kante wirkt sauber und braucht keinen schweren Rahmen.' }] },
    service: { hubId: 'mirrors', title: 'Passende Leistung', text: 'Spiegelarten, Kanten und Beleuchtung — auf der Leistungsseite.' },
    cta: { title: 'Gefällt Ihnen dieses Projekt?', text: 'Wir fertigen Spiegel nach Ihren Maßen.', button: 'Angebot anfragen' },
    faqTitle: 'Fragen zum Projekt und zur Bestellung',
    faq: [
      ['Fertigen Sie Spiegel nach meinen Maßen?', 'Ja. Größe und Form legen wir nach dem Aufmaß fest — passend zu Wand, Möbeln und Arbeitsplätzen.'],
      ['Ist eine andere Form möglich?', 'Ja. Neben ovalen Spiegeln fertigen wir runde, rechteckige und Spiegel mit individueller Kontur nach Skizze oder Entwurf.'],
      ['Können alle Arbeitsplätze den gleichen Spiegel bekommen?', 'Ja, wir wählen eine Form und Größe für alle Plätze, damit der Raum einheitlich wirkt.'],
      ['Wie lange dauert die Montage der Spiegel?', 'Das hängt von Anzahl, Größe und Befestigungsart ab. Den Zeitplan stimmen wir nach dem Aufmaß ab.'],
      ['Ist eine Montage ohne Salonschließung möglich?', 'Ja, die Montage kann an einem Ruhetag oder außerhalb der Öffnungszeiten erfolgen.']
    ],
    requestExample: 'Spiegel für 4 Arbeitsplätze im Salon, Form, Ort'
  }
};
