// DE child pages, part 1: Glastrennwände. Fakten nur aus den UA-Seiten der jeweiligen Rubrik
// (Glasstärken, Systeme, Maße); keine Preise, keine neuen Garantien, Schallwerte oder Zertifikate.
import type { ChildCopy } from './types';

export const childrenDe1: Record<string, ChildCopy> = {
  ganzglaswand: {
    meta: { title: 'Ganzglaswand nach Maß in Österreich | Space Glass', description: 'Ganzglaswand für Wohnung, Büro und Praxis: ESG oder VSG 8–12 mm, transparente Stöße, Klemmprofil oder Punkthalter. Anfrage aus Wien und Österreich.' },
    name: 'Ganzglaswand',
    card: ['Ganzglaswand', 'Raumhohes Glas mit transparenten Stößen — mit Profil oder nur auf Punkthaltern.'],
    eyebrow: 'Glastrennwände / Ganzglaswand',
    h1: 'Ganzglaswand nach Maß',
    lead: 'Eine Glastrennwand mit so wenig Metall wie möglich: transparente Stöße, schlanke Klemmprofile oder Punkthalter. Der Raum wird gegliedert, Licht und Weite bleiben erhalten — für Büro, Praxis, Showroom und moderne Wohnungen.',
    heroAlt: 'Ganzglaswand mit transparenten Stößen in einem hellen Innenraum',
    intro: {
      title: 'Raumgliederung fast ohne sichtbares Metall',
      paragraphs: [
        'Eine Ganzglaswand besteht aus großen Scheiben aus vorgespanntem Glas, die Stoß an Stoß über ein transparentes Profil oder Dichtstoff verbunden werden. Vertikale Profile gibt es nicht, vom Metall ist kaum etwas zu sehen.',
        'Gehalten wird das Glas von schlanken Klemmprofilen an Decke und Boden oder von Punkthaltern. In die Wand lassen sich Dreh- oder Pendeltüren integrieren.',
        'Solche Trennwände werden für Büros, Praxen, Showrooms und moderne Wohnungen gewählt. Maße, Glasstärke, Beschläge und Türen legen wir nach dem Aufmaß fest.'
      ],
      spec: [['Glas 8–12 mm', 'ESG oder VSG'], ['Transparente Stöße', 'ohne vertikale Profile'], ['Türen integrierbar', 'Dreh- oder Pendeltüren'], ['Maßanfertigung', 'nach Aufmaß vor Ort']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Drei Ausführungen der Ganzglaswand',
      intro: 'Mit Klemmprofil, auf Punkthaltern oder mit Pendeltüren — je nach Raum und Nutzung.',
      items: [
        ['Ganzglaswand im Klemmprofil', 'Feststehende Wand in schlanken Aluminium-Klemmprofilen an Decke, Boden und Wänden. Das Glas wird ohne Bohrung eingesetzt, Dichtungen verbessern den Schallschutz. ESG 8–10 mm oder VSG; Profil in Silber, Schwarz oder RAL-Farbe; Tür integrierbar.'],
        ['Ganzglaswand auf Punkthaltern', 'Rahmenlose Glaswand: Die Scheiben werden von Punkthaltern und minimalen Profilen gehalten und Stoß an Stoß mit transparentem Dichtstoff verbunden. ESG 10–12 mm; Beschläge in Edelstahl oder Schwarz.'],
        ['Ganzglaswand mit Pendeltüren', 'Ganzglaswand mit Pendeltüren, die in beide Richtungen öffnen. Die Beschläge sind auf 500 000 Zyklen geprüft — für Bereiche mit viel Durchgangsverkehr. Wandhöhe bis 3400 mm, Glas 8, 10 oder 12 mm, Türen bis 2590 × 1250 mm.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Ganzglaswand',
      items: [
        ['Maximales Tageslicht', 'Große Glasflächen und transparente Stöße lassen das Licht in alle Bereiche.'],
        ['Kaum Metall', 'Schlanke Klemmprofile oder Punkthalter — die Wand wirkt leicht und hochwertig.'],
        ['Türen in einer Flucht', 'Dreh- oder Pendeltüren fügen sich in die Glasfläche ein.'],
        ['Für viele Räume', 'Büros, Praxen, Restaurants, Showrooms und Wohnungen.'],
        ['Glas nach Wahl', 'Klar, satiniert, getönt oder als VSG — abgestimmt auf Privatsphäre und Nutzung.'],
        ['Nach Maß geplant', 'Höhe, Glasstärke, Beschläge und Türen werden nach dem Aufmaß festgelegt.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie uns einen Grundriss oder Fotos mit Maßen — wir schlagen das passende System für Ihre Ganzglaswand vor und erstellen eine unverbindliche Kostenschätzung.', 'Wir realisieren Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.'] },
    faq: {
      title: 'Ganzglaswand: häufige Fragen',
      intro: 'Glas, Systeme, Türen und Planung.',
      items: [
        ['Was ist eine Ganzglaswand?', 'Eine Trennwand aus großen vorgespannten Glasscheiben, die Stoß an Stoß verbunden werden. Vertikale Profile gibt es nicht; gehalten wird das Glas von schlanken Klemmprofilen oder Punkthaltern.'],
        ['Welches Glas wird verwendet?', 'ESG oder VSG mit 8–12 mm Stärke. Die genaue Stärke hängt von System, Höhe und Türen ab und wird nach dem Aufmaß festgelegt.'],
        ['Kann eine Tür in die Ganzglaswand integriert werden?', 'Ja, Dreh- und Pendeltüren lassen sich in die Wand einbauen. Pendeltüren öffnen in beide Richtungen und eignen sich für stark frequentierte Bereiche.'],
        ['Wie hoch kann die Wand sein?', 'Bei der Ausführung mit Pendeltüren bis 3400 mm. Die mögliche Höhe der anderen Systeme klären wir bei der Planung.'],
        ['Welche Profilfarben gibt es?', 'Beim Klemmprofil Silber, Schwarz und RAL-Farben; Beschläge der Punkthalter in Edelstahl oder Schwarz.'],
        ['Wie gehen Sie vor?', 'Anfrage mit Plan oder Fotos, Beratung, Aufmaß, Zeichnung zur Freigabe, Fertigung und Montage. Die Maße, die Glasstärke, die Beschläge und die Türen legen wir nach dem Aufmaß fest.']
      ]
    },
    form: { title: 'Ganzglaswand anfragen', text: 'Senden Sie einen Grundriss oder Fotos des Raums mit Maßen — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Ausführung', options: ['Ganzglaswand im Klemmprofil', 'Ganzglaswand auf Punkthaltern', 'Ganzglaswand mit Pendeltüren', 'Noch unentschlossen'], commentPlaceholder: 'Raum (Wohnung, Büro, Praxis), Maße, Türen, Glas, Ort in Österreich', product: 'Ganzglaswand' },
    related: ['trennwand-tuer', 'buero-trennwand', 'loft-trennwand', 'glas-raumteiler-wohnung']
  },

  'loft-trennwand': {
    meta: { title: 'Loft-Glastrennwand mit schwarzem Profil | Space Glass', description: 'Loft-Trennwand aus Glas: schwarzes Aluminiumprofil mit Sprossen, klares, satiniertes oder geriffeltes Glas, mit Tür möglich. Anfrage aus Österreich.' },
    name: 'Loft-Glastrennwand',
    card: ['Loft-Glastrennwand', 'Schwarzes Profil und Sprossen im Industrie-Look — gliedert den Raum und lässt Licht durch.'],
    eyebrow: 'Glastrennwände / Loft',
    h1: 'Loft-Glastrennwand mit schwarzem Profil',
    lead: 'Schwarzes Profil und Sprossen im Look einer Werkstatt: Die Loft-Trennwand gliedert Küche, Schlafzimmer, Arbeitsbereich oder Salon und lässt das Tageslicht durch.',
    heroAlt: 'Loft-Glastrennwand mit schwarzem Profil und horizontalen Sprossen',
    intro: {
      title: 'Industrie-Stil ohne Schwere',
      paragraphs: [
        'Eine Loft-Glastrennwand ist Glas in einem schlanken, mattschwarzen Aluminiumprofil mit horizontalen oder vertikalen Sprossen. Sie teilt den Raum optisch und funktional, nimmt aber kein Tageslicht weg.',
        'Wir fertigen feststehende Trennwände, Trennwände mit Dreh- oder Schiebetür sowie Schiebeelemente an einer schwarzen Industrieschiene. Die Sprossenteilung stimmen wir auf das Interieur ab.',
        'Das Glas ist klar für maximales Licht, satiniert oder geriffelt für Privatsphäre im Schlafzimmer oder Bad.'
      ],
      spec: [['Schwarzes Profil', 'Aluminium, matt'], ['Sprossen', 'Raster nach Entwurf'], ['Türen', 'Dreh- oder Schiebetür'], ['Glas', 'klar, satiniert, geriffelt']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Loft-Systeme im Überblick',
      intro: 'Feststehende Wand, Wand mit Tür und Schiebeelement an schwarzer Schiene.',
      items: [
        ['Loft-Trennwand mit Sprossen', 'Schwarzes Profil und horizontale Sprossen ergeben den Rhythmus eines Werkstattfensters — ohne schweres Metall. Sprossen nach Entwurf; Glas klar, satiniert oder geriffelt; Tür als Dreh- oder Schiebetür möglich.'],
        ['Loft-Trennwand mit Tür', 'Glastür im gleichen schwarzen Profil und im selben Sprossenraster: Raumgliederung und Zugang in einer Konstruktion. Dreh- oder Schiebetür, schwarzer Griff passend zum Stil.'],
        ['Schiebetür an schwarzer Schiene', 'Hängende Glasschiebetür an einer schwarzen Industrieschiene (System LIGERA): ESG 10 mm, Wandmontage, Schließdämpfer auf Wunsch. Die natürliche Ergänzung zur Loft-Trennwand.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Loft-Trennwand',
      items: [
        ['Industrieller Look', 'Schwarzes Profil und Sprossen prägen den Raum, ohne ihn zu verdunkeln.'],
        ['Leichter als Stahl', 'Aluminiumprofil statt massivem Stahlrahmen.'],
        ['Sprossen nach Wunsch', 'Jedes Raster lässt sich an das Interieur anpassen.'],
        ['Privatsphäre wählbar', 'Klares, satiniertes oder geriffeltes Glas.'],
        ['Türen im Raster', 'Dreh- oder Schiebetür in derselben Optik.'],
        ['Für Küche, Büro, Schlafzimmer', 'Auch für Studios und Salons geeignet.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Zeigen Sie uns den Raum: Mit Foto, Maßen und Ihrer Wunsch-Sprossenteilung erstellen wir einen Vorschlag und eine unverbindliche Kostenschätzung für Ihre Loft-Trennwand.', 'Anfragen und Projekte in Wien und ganz Österreich sind willkommen — Lieferung und Montage stimmen wir je nach Produkt und Projekt individuell mit Ihnen ab.'] },
    faq: {
      title: 'Loft-Glastrennwand: häufige Fragen',
      intro: 'Profil, Sprossen, Glas und Türen.',
      items: [
        ['Was ist eine Loft-Glastrennwand?', 'Eine Glastrennwand in einem schlanken schwarzen Aluminiumprofil mit horizontalen oder vertikalen Sprossen — der klassische Industrie-Look, hier ohne schwere Stahlkonstruktion.'],
        ['Kann ich die Sprossenteilung selbst bestimmen?', 'Ja. Das Raster stimmen wir nach Ihrem Entwurf und dem Interieur ab.'],
        ['Welches Glas ist möglich?', 'Klares Glas für maximales Licht sowie satiniertes oder geriffeltes Glas für Privatsphäre, zum Beispiel im Schlafzimmer oder Bad.'],
        ['Gibt es die Trennwand mit Tür?', 'Ja, mit Dreh- oder Schiebetür im selben schwarzen Profil und Sprossenraster.'],
        ['Welche Schiebetür passt dazu?', 'Eine hängende Glasschiebetür an einer schwarzen Industrieschiene: ESG 10 mm, Wandmontage, Schließdämpfer auf Wunsch.'],
        ['Wo wird eine Loft-Trennwand eingesetzt?', 'In Küchen, Schlafzimmern, Arbeitszimmern, Büros und Salons — überall, wo Räume gegliedert werden sollen, ohne das Licht zu verlieren.']
      ]
    },
    form: { title: 'Loft-Trennwand anfragen', text: 'Senden Sie Fotos und Maße des Raums und Ihre Wünsche zur Sprossenteilung — wir erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Ausführung', options: ['Loft-Trennwand mit Sprossen', 'Loft-Trennwand mit Tür', 'Schiebetür an schwarzer Schiene', 'Noch unentschlossen'], commentPlaceholder: 'Raum, Maße, Sprossenraster, Tür, Glas, Ort in Österreich', product: 'Loft-Glastrennwand' },
    related: ['ganzglaswand', 'trennwand-tuer', 'schiebe-trennwand', 'glas-raumteiler-wohnung']
  },

  'schiebe-trennwand': {
    meta: { title: 'Schiebe-Glastrennwand nach Maß | Space Glass', description: 'Glasschiebewand: hängend an der Schiene, bodengeführt oder teleskopisch, ESG 8–10 mm, Softclose. Anfrage aus Wien und ganz Österreich.' },
    name: 'Schiebe-Glastrennwand',
    card: ['Schiebe-Glastrennwand', 'Glasschiebewand: hängend an der Schiene, bodengeführt oder teleskopisch.'],
    eyebrow: 'Glastrennwände / Schiebewand',
    h1: 'Schiebe-Glastrennwand: hängend, bodengeführt, teleskopisch',
    lead: 'Die Glasflügel laufen an einer oberen Schiene oder auf Rollen am Boden — und brauchen keinen Platz zum Aufschwingen. Ideal, wenn für eine Drehtür kein Platz ist: Küche, Ankleide, Schlafzimmer, Büro, Terrasse.',
    heroAlt: 'Hängende Glasschiebewand an einer Laufschiene zwischen Küche und Wohnbereich',
    intro: {
      title: 'Keine Schwelle, kein Platzbedarf für den Türflügel',
      paragraphs: [
        'Bei einer hängenden Glasschiebewand laufen die Glasflügel auf Rollen an einer Schiene an Decke oder Wand. Der Boden bleibt eben, und die Tür braucht keinen Platz zum Aufschwingen.',
        'Die Schiene kann im Profil verschwinden (verdeckter Laufwagen mit Softclose-Dämpfer), als Designelement offen aus Edelstahl geführt werden oder als schwarze Industrieschiene zum Loft-Stil passen.',
        'Ein Flügel verschließt eine Öffnung, mehrere Flügel gliedern den Raum in Zonen.',
        'Bodengeführte (untergestützte) Systeme laufen mit den Rollen unten, die obere Schiene führt die Flügel nur: So lassen sich große und schwere Flügel unter abgehängten oder gespannten Decken oder Trockenbau einsetzen, die Decke trägt kein Gewicht. Die Schwelle beträgt je nach System 7,5 bis 30 mm. Teleskopische Systeme fahren mehrere Flügel hintereinander: Der erste Flügel zieht die weiteren mit, oder mehrere Flügel laufen auf eigenen Schienen und parken als schmales Paket.'
      ],
      spec: [['Ohne Schwelle', 'ebener Boden'], ['Softclose', 'leises Abbremsen'], ['Flügel bis 75 kg', 'bei offener Schiene'], ['ESG 8–10 mm', 'je nach System']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Schiebesysteme: hängend, bodengeführt, teleskopisch',
      intro: 'Von der verdeckten Laufschiene bis zum bodengeführten System für große Flügel. Werte für Basiskonfigurationen, Details nach Aufmaß.',
      items: [
        ['PIANO — verdeckter Laufwagen', 'Hängende Schiebetür mit verdecktem Laufwagen im Aluminiumprofil und Softclose-Dämpfer; der Flügel wird am Ende des Weges leise abgebremst. ESG 8–10 mm, Montage an Decke oder Wand. Für Wohnungen und Büros.'],
        ['SUSPENS — offene Schiene', 'Schiebesystem auf offener Edelstahlschiene: Rollen und Schiene werden zum Designelement. Flügel bis 75 kg, ESG 8–10 mm, Wandmontage. Für Küchen, Ankleiden und Schlafzimmer.'],
        ['LIGERA — schwarze Schiene', 'Glasschiebetür an schwarzer Industrieschiene, ESG 10 mm, Schließdämpfer auf Wunsch, Wandmontage. Passt zur Loft-Trennwand und zu schwarzen Beschlägen.'],
        ['MERCATO — Aluminiumprofil', 'Schiebesystem im Aluminiumprofil, wenn mehrere Flügel gebraucht werden. ESG 8–10 mm, ein oder mehrere Flügel, Profil in Silber oder Schwarz. Für Büros, Läden und Wohnungen.'],
        ['ATRIUM — teleskopisch, hängend, ohne Schwelle', 'Hängendes System für Öffnungen bis 4 m Höhe: Die Flügel (10 mm, ESG oder VSG) laufen an der oberen Führung und parken als Paket; keine Schwelle. Flügelbreite bis 1000 mm, Wagen bis 150 kg. Für Lofts und hohe Decken, auch für breite Öffnungen mit wenig Platz für das Flügelpaket.'],
        ['SLIDING SLIM — bodengeführt, Schwelle 7,5 mm', 'Parallel-Schiebesystem nach dem Prinzip des Schranks mit der niedrigsten Schwelle (7,5 mm). Höhe bis 3000 mm, Flügelbreite bis 900 mm, ESG 8 oder 10 mm, 3 oder 5 Schienen; Parken von jeder Seite, für große Öffnungen.'],
        ['SLIDING SMART — teleskopisch, Schwelle 12,5 mm', 'Der erste Flügel zieht die weiteren mit, sodass eine breite Öffnung mit einer Bewegung frei wird. Höhe bis 3000 mm, Flügelbreite bis 1200 mm, ESG 8 oder 10 mm, 3 oder 5 Schienen, Filzdichtungen.'],
        ['SLIDING NEXT — bodengeführt, schlanke Profile', 'System der neuen Generation für ESG 10 mm: schlanke Flügelprofile, mehrere Schlossvarianten, Smart-Griff, mittiger Zugang. Schwellen 16 mm (FLAT) oder 29,5 mm; ALL GLASS ohne oberes Profil für den Eindruck von durchgehendem Glas. Höhe bis 3000 mm, Flügelbreite bis 1100 mm.'],
        ['SLIDING TRACK — Zugluftschutz', 'Schiebesystem mit Schwelle 30 mm und doppelter Bürstendichtung unter den Flügeln — für Trennwände zwischen Raum und Terrasse oder Balkon, wo Zugluft stört. Höhe bis 3000 mm, Flügelbreite bis 1300 mm, ESG 8 oder 10 mm; auch für L- und U-förmige Öffnungen.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine hängende Schiebewand',
      items: [
        ['Ohne Schwelle', 'Der Boden bleibt eben, keine Bodenschiene stört.'],
        ['Platz sparen', 'Der Flügel gleitet an der Wand — kein Schwenkbereich nötig.'],
        ['Leiser Lauf', 'Softclose dämpft den Flügel am Ende des Weges.'],
        ['Schiene als Gestaltung', 'Verdeckt, in Edelstahl oder in Schwarz.'],
        ['Ein oder mehrere Flügel', 'Von der einfachen Tür bis zur Raumteilung in Zonen.'],
        ['Viele Einsatzorte', 'Küche, Ankleide, Schlafzimmer, Büro und Laden.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Nennen Sie uns die Breite der Öffnung und den gewünschten Einsatz — wir wählen das passende System und erstellen eine unverbindliche Kostenschätzung.', 'Für Projekte in Wien und Österreich klären wir gemeinsam, wie Lieferung und Montage für Ihr Produkt am besten organisiert werden — je nach Produkt und Projekt.'] },
    faq: {
      title: 'Schiebe-Glastrennwand: häufige Fragen',
      intro: 'Schiene, Glas, Montage und Einsatz.',
      items: [
        ['Was bedeutet „hängend“?', 'Die Glasflügel hängen an Rollen und laufen an einer Schiene an Decke oder Wand. Dadurch gibt es auf dem Boden keine Schwelle und keine Führung.'],
        ['Welches Glas wird verwendet?', 'ESG mit 8–10 mm, beim System LIGERA 10 mm.'],
        ['Wie schwer darf ein Flügel sein?', 'Bei der offenen Schiene (SUSPENS) bis 75 kg. Für die anderen Systeme legen wir die Daten bei der Planung fest.'],
        ['Kann der Flügel leise schließen?', 'Ja. Das System PIANO hat einen Softclose-Dämpfer, bei LIGERA ist ein Dämpfer auf Wunsch möglich.'],
        ['Wo wird die Schiene montiert?', 'An Decke oder Wand — je nach System und Raum.'],
        ['Für welche Räume eignet sich die Schiebewand?', 'Für Küche und Wohnbereich, Ankleide, Schlafzimmer, Büros und Läden, überall dort, wo eine Drehtür zu viel Platz braucht.'],
        ['Hängend oder bodengeführt?', 'Hängende Systeme haben keine Schwelle und keine Bodenführung. Bodengeführte Systeme tragen die Last unten und eignen sich für große, schwere Flügel unter Decken, die nichts tragen sollen; die Schwelle liegt zwischen 7,5 und 30 mm.'],
        ['Was ist eine teleskopische Glasschiebewand?', 'Mehrere Flügel laufen hintereinander: Der erste zieht die weiteren mit (SLIDING SMART) oder mehrere Flügel parken als Paket (ATRIUM). So wird eine breite Öffnung mit einer Bewegung frei.']
      ]
    },
    form: { title: 'Schiebe-Glastrennwand anfragen', text: 'Senden Sie Fotos und Maße der Öffnung — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['Hängend (PIANO, SUSPENS, LIGERA, MERCATO)', 'Bodengeführt (SLIDING SLIM, NEXT, TRACK)', 'Teleskopisch (SLIDING SMART, ATRIUM)', 'Noch unentschlossen'], commentPlaceholder: 'Breite und Höhe der Öffnung, Anzahl Flügel, Einsatz, Ort in Österreich', product: 'Schiebe-Glastrennwand' },
    related: ['glasschiebetuer', 'loft-trennwand', 'trennwand-tuer']
  },

  'trennwand-tuer': {
    meta: { title: 'Glastrennwand mit Tür: Dreh-, Schiebe-, Pendeltür', description: 'Glastrennwand mit integrierter Tür in einer Flucht: Dreh-, Schiebe- oder Pendeltür, ESG 8–10 mm oder VSG, Beschläge nach Wahl. Anfrage aus Österreich.' },
    name: 'Glastrennwand mit Tür',
    card: ['Glastrennwand mit Tür', 'Wand und Tür in einer Flucht — als Dreh-, Schiebe- oder Pendeltür.'],
    eyebrow: 'Glastrennwände / mit Tür',
    h1: 'Glastrennwand mit Tür',
    lead: 'Trennwand und Tür in einer Linie: Dreh-, Schiebe- oder Pendeltür. Der Raum bekommt einen Zugang, die Wand die Leichtigkeit von Glas.',
    heroAlt: 'Glastrennwand mit integrierter Glastür',
    intro: {
      title: 'Der Zugang ist Teil der Glaswand',
      paragraphs: [
        'Eine Tür in der Glastrennwand wirkt wie ein Teil der Wand: gleiches Profil, gleiches Glas, eine Linie. Separate Türzargen und Verkleidungen sind nicht nötig.',
        'Die Öffnungsart wählen wir nach dem Einsatz: Drehtüren mit umlaufender Dichtung für Ruhe, Schiebetüren für Platzersparnis, Pendeltüren für Durchgangsverkehr.',
        'Beschläge — Bänder, Griffe, Schlösser und Türschließer — stimmen wir auf Stil und Beanspruchung ab.'
      ],
      spec: [['Drehtür', 'mit umlaufender Dichtung'], ['Schiebetür', 'spart Platz'], ['Pendeltür', 'öffnet in beide Richtungen'], ['Glas', 'ESG 8–10 mm oder VSG']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Trennwand mit Tür: Ausführungen',
      intro: 'Von der Wand mit Drehtür bis zur Schiebe- und Pendeltür.',
      items: [
        ['Trennwand mit Drehtür oder Schiebetür', 'Feststehende Trennwand mit integrierten Glastüren — als Dreh- oder Schiebetür im selben Profil. Glas ESG 8–10 mm oder VSG; Aluminiumprofil in Silber oder Schwarz; umlaufende Dichtung an der Tür; Türschließer auf Wunsch; Schloss und Griff nach Wahl.'],
        ['Loft-Trennwand mit Tür', 'Loft-Glastrennwand mit Glastür im selben schwarzen Profil und Sprossenraster. Dreh- oder Schiebetür; Glas klar, satiniert oder geriffelt; schwarzer Griff passend zum Stil.'],
        ['Ganzglaswand mit Pendeltüren', 'Pendeltüren öffnen in beide Richtungen, die Beschläge sind auf 500 000 Zyklen geprüft. Wandhöhe bis 3400 mm, Glas 8, 10 oder 12 mm, Türen bis 2590 × 1250 mm.'],
        ['Hängende Schiebetür (PIANO, MERCATO)', 'Schiebetüren an der Laufschiene: PIANO mit verdecktem Laufwagen und Softclose, MERCATO im Aluminiumprofil für mehrere Flügel.'],
        ['Glastür für die Wandöffnung (PERTO)', 'Gläserne Drehtür für eine Öffnung in der Wand oder in der Trennwand: ESG oder VSG, klar, satiniert oder getönt, Breite bis 100 cm.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Trennwand mit Tür',
      items: [
        ['Tür in einer Linie', 'Wand und Tür wirken wie eine Fläche.'],
        ['Öffnungsart nach Bedarf', 'Dreh-, Schiebe- oder Pendeltür.'],
        ['Ruhiger Raum', 'Umlaufende Dichtung an der Drehtür.'],
        ['Beschläge nach Wahl', 'Türschließer, Schloss und Griff stimmen wir auf Stil und Nutzung ab.'],
        ['Ohne Zarge', 'Keine separaten Türzargen und Verkleidungen.'],
        ['Büro bis Schlafzimmer', 'Für Einzelbüros, Praxen, Küchen und Wohnräume.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Sagen Sie uns, wie der Raum genutzt wird: Wir empfehlen die passende Öffnungsart und erstellen eine unverbindliche Kostenschätzung für Ihre Glastrennwand mit Tür.', 'Wir begleiten Projekte in Wien und ganz Österreich; Lieferung und Montage richten sich nach Produkt und Objekt und werden individuell abgestimmt.'] },
    faq: {
      title: 'Glastrennwand mit Tür: häufige Fragen',
      intro: 'Türarten, Glas, Beschläge und Planung.',
      items: [
        ['Welche Türarten sind möglich?', 'Drehtüren, Schiebetüren und Pendeltüren — jeweils im selben Profil und Glas wie die Trennwand.'],
        ['Welche Tür passt in einen stark frequentierten Bereich?', 'Pendeltüren, die in beide Richtungen öffnen. Die Beschläge sind auf 500 000 Zyklen geprüft.'],
        ['Wann ist eine Schiebetür sinnvoll?', 'Wenn für eine Drehtür kein Platz ist: Der Flügel gleitet an der Wand entlang.'],
        ['Welches Glas wird verwendet?', 'ESG mit 8–10 mm oder VSG; bei Pendeltüren 8, 10 oder 12 mm.'],
        ['Welche Beschläge gibt es?', 'Bänder, Griffe, Schlösser und Türschließer — abgestimmt auf Stil und Beanspruchung.'],
        ['Brauche ich eine Türzarge?', 'Nein. Tür und Trennwand bilden eine Linie mit demselben Profil und Glas, separate Zargen und Verkleidungen entfallen.']
      ]
    },
    form: { title: 'Glastrennwand mit Tür anfragen', text: 'Senden Sie Fotos und Maße — wir empfehlen Türart und System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Ausführung', options: ['Trennwand mit Drehtür', 'Trennwand mit Schiebetür', 'Trennwand mit Pendeltür', 'Loft-Trennwand mit Tür', 'Noch unentschlossen'], commentPlaceholder: 'Raum, Maße, Türart, Glas, Beschläge, Ort in Österreich', product: 'Glastrennwand mit Tür' },
    related: ['ganzglaswand', 'schiebe-trennwand', 'buero-trennwand']
  },

  'buero-trennwand': {
    meta: { title: 'Bürotrennwand aus Glas: Büro, Meeting, Open Space', description: 'Glastrennwand fürs Büro: Einzelbüros, Besprechungsräume und Open Space mit Türen, Branding und Glasboxen. Anfrage aus Wien und Österreich.' },
    name: 'Bürotrennwand aus Glas',
    card: ['Bürotrennwand aus Glas', 'Büros und Besprechungsräume mit Tageslicht — mit Türen, Branding und Glasbox.'],
    eyebrow: 'Glastrennwände / Büro',
    h1: 'Bürotrennwand aus Glas',
    lead: 'Einzelbüros, Besprechungsräume und Open Space — mit Licht in jeder Zone. Glastrennwände mit Türen, Schiebesysteme und freistehende Glasboxen, auf Wunsch mit Logo und Satinierung.',
    heroAlt: 'Bürotrennwände aus Glas mit Türen in einem Büro',
    intro: {
      title: 'Ein Büro mit Tageslicht in jeder Zone',
      paragraphs: [
        'Glastrennwände gliedern das Büro in Einzelbüros und Besprechungsräume, erhalten aber das Tageslicht und den offenen Charakter. Das Team sieht sich, Gespräche bleiben hinter dem Glas.',
        'Wir fertigen Trennwände in schlanken Profilen mit Türen, Schiebe- und Pendeltür-Systeme sowie freistehende Glasboxen („Raum im Raum“), die ohne Eingriff in die Decke aufgestellt werden.',
        'Für Privatsphäre setzen wir satinierte Streifen, Logo oder vollständig satiniertes Glas ein; für mehr Ruhe VSG und Dichtungen.'
      ],
      spec: [['Büros und Besprechung', 'nach Büroplan'], ['Branding', 'Logo und Streifen'], ['Montage ohne Stillstand', 'abends und am Wochenende'], ['Glasbox', 'ohne Eingriff in die Decke']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Lösungen für das Büro',
      intro: 'Vier Konstruktionen, die für Büros besonders häufig gewählt werden.',
      items: [
        ['CAJA — Raum im Raum', 'Freistehende Glasbox für Besprechungsräume und Büros im Open Space — ohne Eingriff in Decke und Wände. Größe bis 3,2 × 6 m, Höhe bis 3 m, ESG 10 mm oder VSG 10,76 mm, Glastüren im Lieferumfang. Als Konstruktion versetzbar.'],
        ['Trennwand mit Türen', 'Feststehende Trennwand mit integrierten Dreh- oder Schiebetüren in einem Profil — wirkt wie eine geschlossene Wand. ESG 8–10 mm oder VSG; Aluminiumprofil in Silber oder Schwarz; Türschließer auf Wunsch.'],
        ['Schiebetrennwand PIANO', 'Hängende Schiebetür mit verdecktem Laufwagen und Softclose — der Flügel stoppt am Wegende leise. ESG 8–10 mm, Montage an Decke oder Wand.'],
        ['Pendeltüren PENDULA', 'Ganzglaswand mit Pendeltüren, die in beide Richtungen öffnen; Beschläge auf 500 000 Zyklen geprüft. Wandhöhe bis 3400 mm, Glas 8, 10 oder 12 mm — für Bereiche mit viel Durchgangsverkehr.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Glas im Büro',
      items: [
        ['Tageslicht überall', 'Das Licht erreicht jeden Arbeitsplatz.'],
        ['Offen und abgeschirmt', 'Das Team sieht sich, Gespräche bleiben im Raum.'],
        ['Branding auf Glas', 'Logo, Streifen oder satiniertes Glas nach Ihrem Entwurf.'],
        ['Mehr Ruhe', 'VSG und Dichtungen für ein ruhigeres Umfeld.'],
        ['Montage im laufenden Betrieb', 'Auf Wunsch abends und am Wochenende, damit der Betrieb nicht stehen bleibt.'],
        ['Flexibel', 'Glasboxen lassen sich als Konstruktion versetzen.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Schicken Sie uns den Büroplan: Wir schlagen Einzelbüros, Besprechungsräume und Türen vor und erstellen eine unverbindliche Kostenschätzung.', 'Ob Wohnung, Büro oder Gewerbeobjekt in Wien oder Österreich: Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.'] },
    faq: {
      title: 'Bürotrennwand aus Glas: häufige Fragen',
      intro: 'Glasbox, Türen, Branding und Montage.',
      items: [
        ['Was ist eine Glasbox „Raum im Raum“?', 'Eine freistehende Glaskonstruktion für Besprechungsräume und Büros im Open Space. Sie greift nicht in Decke und Wände ein und lässt sich versetzen. Größe bis 3,2 × 6 m, Höhe bis 3 m.'],
        ['Welches Glas wird verwendet?', 'ESG oder VSG; bei der Glasbox ESG 10 mm oder VSG 10,76 mm, bei Trennwänden mit Türen ESG 8–10 mm oder VSG.'],
        ['Kann ich das Glas für Privatsphäre gestalten?', 'Ja: satinierte Streifen, Logo oder vollständig satiniertes Glas. Für mehr Ruhe empfehlen wir VSG und Dichtungen.'],
        ['Welche Türen sind möglich?', 'Dreh-, Schiebe- und Pendeltüren. Pendeltüren öffnen in beide Richtungen und eignen sich für stark frequentierte Bereiche.'],
        ['Kann die Montage ohne Betriebsunterbrechung erfolgen?', 'Ja, auf Wunsch abends und am Wochenende.'],
        ['Was brauchen Sie für eine Kostenschätzung?', 'Büroplan oder Fotos mit Maßen, gewünschte Raumaufteilung, Anzahl der Türen und Branding-Wünsche.']
      ]
    },
    form: { title: 'Bürotrennwand anfragen', text: 'Senden Sie den Büroplan oder Fotos mit Maßen — wir schlagen eine Aufteilung vor und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Lösung', options: ['Glasbox „Raum im Raum“ (CAJA)', 'Trennwand mit Türen', 'Schiebetrennwand', 'Ganzglaswand mit Pendeltüren', 'Noch unentschlossen'], commentPlaceholder: 'Fläche, Anzahl Räume, Türen, Branding, Ort in Österreich', product: 'Bürotrennwand aus Glas' },
    related: ['trennwand-tuer', 'ganzglaswand', 'schiebe-trennwand', 'aluminium-buerotrennwand', 'buero-glasloesungen']
  }
};
