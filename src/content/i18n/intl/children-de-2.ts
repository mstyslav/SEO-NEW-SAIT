// DE child pages, part 2: rahmenlose Verglasung (Terrasse, Faltwand, Schiebeverglasung, Balkon) und Walk-in-Dusche.
import type { ChildCopy } from './types';

export const childrenDe2: Record<string, ChildCopy> = {
  terrassenverglasung: {
    meta: { title: 'Rahmenlose Terrassenverglasung nach Maß | Space Glass', description: 'Rahmenlose Terrassenverglasung, kalt oder warm mit Isolierglas: Faltwand, Schiebe- und Guillotine-System, schwellenlos. Anfrage aus Wien und Österreich.' },
    name: 'Terrassenverglasung',
    card: ['Terrassenverglasung', 'Rahmenlos verglast: Falt-, Schiebe-, Guillotine- und schwellenlose Systeme.'],
    eyebrow: 'Rahmenlose Verglasung / Terrasse',
    h1: 'Rahmenlose Terrassenverglasung',
    lead: 'Die Terrasse wird zum geschützten Raum, ohne die Aussicht zu verlieren: Glasflügel falten sich oder gleiten zur Seite, und die Terrasse ist wieder offen. Für private Terrassen, Veranden und Gastronomie.',
    heroAlt: 'Rahmenlose Terrassenverglasung mit raumhohen Glasflügeln',
    intro: {
      title: 'Die Terrasse für einen großen Teil des Jahres',
      paragraphs: [
        'Rahmenlose Verglasung macht eine offene Terrasse zum geschützten Raum, ohne das Panorama zu verlieren. Im geöffneten Zustand falten oder verschieben sich die Flügel, und die Terrasse ist wieder frei.',
        'Das System wählen wir nach Nutzung: Die Glas-Faltwand öffnet die Terrasse vollständig, das Schiebesystem hat breitere Flügel, das Guillotine-System fährt per Antrieb, schwellenlose Systeme eignen sich für häufigen Durchgang.',
        'Wird die Terrasse auch in der Übergangszeit genutzt, empfehlen wir ein System für Isolierglas; zusammen mit einem Glasdach wird die Terrasse zur Veranda.',
        'Kalt oder warm: Einfachglas (ESG) schützt vor Wind und Regen, hält aber die Wärme nicht. Warme Systeme verwenden Isolierglas 20–28 mm und verstärkte Dichtungen; die wärmste Variante ist die Guillotine THERMO mit Polyamid-Trennung und Isolierglas 24 mm. Diese Seite behandelt die Verglasung einer vorhandenen Terrasse; ein Raum mit eigenem Dach und Seiten ist ein Kaltwintergarten.'
      ],
      spec: [['Höhe bis 4000 mm', 'Verglasung ATRIUM'], ['Schwelle ab 0 mm', 'schwellenlose Systeme'], ['Isolierglas', 'für eine längere Saison'], ['Fernbedienung', 'bei Guillotine-Systemen']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Systeme für die Terrassenverglasung',
      intro: 'Beispiele aus unseren Systemen für Terrassen und Veranden von Privathäusern und Gastronomie.',
      items: [
        ['Faltsystem mit gerundeter Schwelle', 'Faltsystem mit niedriger, gerundeter Schwelle von 23 mm — gut begehbar, auch mit Rollwagen. Höhe bis 2700 mm, Flügelbreite bis 650 mm (Tür 750 mm), ESG 10 mm, Länge bis 10 m, einseitig bis zu 8 Flügel samt Tür.'],
        ['Warmes Faltsystem für Isolierglas', 'Faltsystem für Isolierglas 28 mm mit gerundeter Schwelle von 23 mm — stört weder den täglichen Durchgang noch den Transport von Gegenständen auf Rädern. Für Terrassen und Gastgärten.'],
        ['Schiebesystem mit Parallelbewegung', 'Parallel-Schiebesystem mit Schwelle 12,5 mm: Der erste Flügel zieht die weiteren mit, die Öffnung ist in Sekunden offen. Höhe bis 3000 mm, Flügelbreite bis 1200 mm, ESG 8 oder 10 mm.'],
        ['Warmes Schiebesystem für Isolierglas', 'Schiebesystem für Isolierglas 20 mm; verstärkte Rollen tragen je 120 kg, dadurch Flügel bis 1,3–1,5 m Breite. Schwelle 15 mm — für windige und schneereiche Regionen.'],
        ['Guillotine-Systeme', 'Vertikal verschiebbare Glasflügel mit Antrieb und Fernbedienung — für Terrassen mit Komfortanspruch.'],
        ['Schwellenlos: oben aufgehängt (ATRIUM, CENTRUM, MOMENTUM)', 'Die ganze Last liegt an der oberen Führung, unten sichern Riegel die Flügel: keine Schwelle, ebener Boden für Füße und Rollen. ESG 10 mm oder VSG, Flügelbreite bis 1000 mm, Wagen bis 150 kg; ATRIUM bis 4000 mm Höhe, CENTRUM mit Drehung der Flügel um 360°, MOMENTUM als Faltsystem mit Fußentriegelung.'],
        ['Warmes Faltsystem mit 7-mm-Schwelle (TIARA TWIN ZERO)', 'Das Unterprofil liegt im Boden, nur 7 mm ragen über den Belag — gut für Kinderwagen und Rollwagen. Isolierglas 28 mm, Höhe bis 2500 mm, Flügelbreite bis 650 mm (Tür 750 mm), Länge bis 10 m; Wasserableitung aus der Profilkammer, auch L-, U- und Radiusöffnungen.'],
        ['Warmes Schiebesystem mit hoher Schwelle (SLIDING MAX TRACK)', 'Schiebesystem für Isolierglas 20 mm mit Schwelle 42 mm — für Balkone in Hochhäusern und Terrassen in windigen Lagen mit viel Niederschlag. Höhe bis 3000 mm, Flügelbreite bis 1300 mm, Wagen bis 120 kg.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine rahmenlose Terrassenverglasung',
      items: [
        ['Panorama ohne Rahmen', 'Zwischen den Flügeln gibt es keine vertikalen Profile.'],
        ['Öffnet vollständig', 'Falten oder Schieben — die Terrasse ist wieder frei.'],
        ['Längere Saison', 'Mit Isolierglas bleibt die Terrasse länger nutzbar.'],
        ['Schwelle nach Bedarf', 'Von 0 mm bei schwellenlosen Systemen bis 30 mm für windige Lagen.'],
        ['Schutz vor Wetter', 'Dichtungen und Wasserableitung halten Wind, Regen und Staub ab.'],
        ['Jede Form', 'Gerade, L- und U-förmige sowie runde Öffnungen.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Mit Fotos und ungefähren Maßen von Breite und Höhe der Öffnung wählen wir das passende System und erstellen eine unverbindliche Kostenschätzung für Ihre Terrassenverglasung.', 'Gern übernehmen wir Projekte in Wien und Österreich — den Umfang von Lieferung und Montage legen wir je nach Produkt und Projekt gemeinsam fest.'] },
    faq: {
      title: 'Terrassenverglasung: häufige Fragen',
      intro: 'Systeme, Schwelle, Glas und Planung.',
      items: [
        ['Welches System ist für die Terrasse am besten?', 'Das hängt von der Nutzung ab: Die Glas-Faltwand öffnet vollständig, das Schiebesystem hat breitere Flügel, das Guillotine-System fährt automatisch, schwellenlose Systeme eignen sich für häufigen Durchgang.'],
        ['Kann die Terrasse auch im Herbst und Frühjahr genutzt werden?', 'Ja, mit einem System für Isolierglas; zusammen mit einem Glasdach wird die Terrasse zur Veranda.'],
        ['Wie hoch kann die Verglasung sein?', 'Je nach System bis 2700, 3000 oder — beim System ATRIUM — bis 4000 mm.'],
        ['Welche Glasstärken gibt es?', 'ESG 8 oder 10 mm bei einfacher Verglasung; Isolierglas 20 oder 28 mm bei den warmen Systemen.'],
        ['Wie niedrig kann die Schwelle sein?', 'Schwellenlose Systeme kommen mit 0 mm aus; die gerundete Schwelle der Faltsysteme beträgt 23 mm, bei Schiebesystemen sind 7,5–16 mm für ständigen Durchgang üblich.'],
        ['Welche Formen sind möglich?', 'Gerade, L- und U-förmige sowie runde Verglasungen.'],
        ['Was ist der Unterschied zwischen kalter und warmer Verglasung?', 'Kalte Systeme arbeiten mit Einfachglas (ESG 8–10 mm) und schützen vor Wind und Regen. Warme Systeme verwenden Isolierglas 20–28 mm und verstärkte Dichtungen, die Guillotine THERMO zusätzlich eine Polyamid-Trennung.'],
        ['Ist eine Terrassenverglasung ein Wintergarten?', 'Nein. Sie schließt eine vorhandene Terrasse seitlich. Ein Raum mit eigenem Dach und Seitenwänden ist ein Kaltwintergarten, ein beheizter Raum ein Wintergarten.']
      ]
    },
    form: { title: 'Terrassenverglasung anfragen', text: 'Senden Sie Fotos der Terrasse und ungefähre Maße — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['Faltsystem', 'Schiebesystem', 'Guillotine-System', 'Schwellenloses System', 'Mit Isolierglas (warm)', 'Noch unentschlossen'], commentPlaceholder: 'Breite und Höhe der Öffnung, Form, Schwelle, kalt oder warm, Ort in Österreich', product: 'Rahmenlose Terrassenverglasung' },
    related: ['glas-faltwand', 'schiebeverglasung', 'kaltwintergarten', 'balkonverglasung']
  },

  'glas-faltwand': {
    meta: { title: 'Glas-Faltwand rahmenlos nach Maß | Space Glass', description: 'Rahmenlose Glas-Faltwand: Die Flügel falten sich zum Paket und geben die Öffnung frei. ESG oder Isolierglas, Schwelle ab 7 mm. Anfrage aus Österreich.' },
    name: 'Glas-Faltwand',
    card: ['Glas-Faltwand', 'Rahmenlose Faltflügel, die die Öffnung vollständig freigeben.'],
    eyebrow: 'Rahmenlose Verglasung / Faltwand',
    h1: 'Glas-Faltwand — rahmenlose Faltverglasung',
    lead: 'Eine Reihe von Glasflügeln ohne vertikale Rahmen: Jeder Flügel fährt zum Rand der Öffnung, dreht sich um 90° und stellt sich zu einem Paket auf. Die Öffnung ist danach nahezu frei.',
    heroAlt: 'Rahmenlose Glas-Faltwand mit gefalteten Flügeln',
    intro: {
      title: 'Eine Öffnung, die sich vollständig öffnet',
      paragraphs: [
        'Bei der Glas-Faltwand (auch „Buch“-System) dreht sich jeder Flügel am Ende der Öffnung um 90° und stellt sich als Paket senkrecht zur Verglasungslinie. Die geöffnete Öffnung hat kaum Hindernisse.',
        'Die Systeme unterscheiden sich in Schwellenhöhe und Lastabtragung: Bei TIARA MAX und OPTIMA liegt das Gewicht auf dem Bodenprofil, bei SLIM und ZERO am oberen Profil — dadurch beträgt die Schwelle nur 23 oder 7 mm.',
        'Für saisonale Verglasung wird ESG 8–10 mm verwendet, für wärmere Lösungen Isolierglas in den Systemen TIARA TWIN. Möglich sind gerade, L- und U-förmige, runde und trapezförmige Verglasungen.'
      ],
      spec: [['Höhe bis 3000 mm', 'System TIARA MAX'], ['Schwelle ab 7 mm', 'TIARA MAX ZERO im Boden'], ['Glas', 'ESG 8–10 mm oder Isolierglas 20–28 mm'], ['Jede Form', 'L, U, rund, trapezförmig']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Glas-Faltwand: Systeme im Überblick',
      intro: 'Sechs Faltsysteme — vom günstigen OPTIMA bis zum warmen TIARA TWIN. Angaben für Basiskonfigurationen.',
      items: [
        ['TIARA MAX — Basis-Faltsystem', 'Für hohe Öffnungen bis 3 m. ESG 10 mm, Flügel bis 650 mm (Tür 750 mm), Schwelle 61 mm, Windlast bis 174 kg/m². Gerade, L-, U-förmige und runde Verglasung; Last auf dem Bodenprofil; Kindersicherung am Schloss; Wasser- und Kondensatableitung.'],
        ['Faltsystem mit niedriger Schwelle 23 mm', 'Obere Aufhängung: Das Gewicht der Flügel liegt auf dem oberen Profil, das untere führt nur. Schwelle 23 mm, Höhe bis 2700 mm, ESG 10 mm, Länge bis 10 m. Für Terrassen, Veranden und Pavillons mit häufigem Durchgang. Verlangt eine tragfähige obere Decke.'],
        ['Faltsystem mit gerundeter Schwelle', 'Schwelle 23 mm, gerundet — auch mit Rollwagen gut befahrbar. Einseitig bis 8 Flügel samt Tür; Rollen mit geschlossenen Kugellagern; Edelstahlteile.'],
        ['Faltsystem mit Schwelle im Boden', 'Das untere Profil wird in den Boden eingelassen und steht nur 7 mm vor — nahezu schwellenfreier Austritt. Obere Aufhängung, ESG 10 mm, Höhe bis 2700 mm, Länge bis 10 m.'],
        ['TIARA TWIN — für Isolierglas', 'Warme Variante für Isolierglas 20–28 mm: Terrasse und Veranda lassen sich auch in der Übergangszeit nutzen.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Glas-Faltwand',
      items: [
        ['Vollständig offen', 'Das Flügelpaket gibt die Öffnung nahezu frei.'],
        ['Ohne vertikale Rahmen', 'Freie Sicht zwischen den Glasflügeln.'],
        ['Schwelle von 7 bis 61 mm', 'Je nach System und Anforderung an den Durchgang.'],
        ['Warme Varianten', 'Isolierglas für längere Nutzung.'],
        ['Individuelle Form', 'Auch L-, U-förmig, rund und trapezförmig.'],
        ['Praxisdetails', 'Kindersicherung am Schloss, Ableitung von Wasser und Kondensat.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Mit Foto und Maßen der Öffnung bestimmen wir System, Flügelanzahl und Parkposition und erstellen eine unverbindliche Kostenschätzung für Ihre Glas-Faltwand.', 'Wir realisieren Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.'] },
    faq: {
      title: 'Glas-Faltwand: häufige Fragen',
      intro: 'Funktion, Schwelle, Glas und Einsatz.',
      items: [
        ['Wie funktioniert eine rahmenlose Faltwand?', 'Die Flügel laufen an Führungen im oberen und unteren Profil, drehen sich um 90° und stellen sich als Paket senkrecht zur Verglasungslinie auf.'],
        ['Welche Schwelle ist möglich?', 'Je nach System 61, 23 oder nur 7 mm über dem Boden. Welche Variante passt, hängt vom Durchgang und von der Konstruktion ab.'],
        ['Ist auch eine warme Ausführung möglich?', 'Ja, die Systeme TIARA TWIN verwenden Isolierglas mit 20–28 mm.'],
        ['Welche Höhe ist möglich?', 'Bei TIARA MAX bis 3000 mm, bei den Systemen mit oberer Aufhängung bis 2700 mm.'],
        ['Wie viel Wind hält die Verglasung aus?', 'TIARA MAX ist für eine Windlast bis 174 kg/m² ausgelegt. Für windige Lagen planen wir die Konstruktion entsprechend.'],
        ['Welche Formen sind möglich?', 'Gerade, L- und U-förmige, runde und trapezförmige Verglasungen.']
      ]
    },
    form: { title: 'Glas-Faltwand anfragen', text: 'Senden Sie Fotos und Maße der Öffnung — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['TIARA MAX', 'Niedrige Schwelle 23 mm', 'Schwelle im Boden (7 mm)', 'TIARA TWIN (Isolierglas)', 'Noch unentschlossen'], commentPlaceholder: 'Breite und Höhe der Öffnung, Form, Schwelle, Ort in Österreich', product: 'Glas-Faltwand' },
    related: ['terrassenverglasung', 'schiebeverglasung', 'balkonverglasung']
  },

  schiebeverglasung: {
    meta: { title: 'Rahmenlose Schiebeverglasung nach Maß | Space Glass', description: 'Rahmenlose Glasschiebesysteme für Terrasse und Balkon: breite Flügel bis 1,3 m, Schwelle ab 7,5 mm, ESG 8–10 mm. Anfrage aus Österreich.' },
    name: 'Schiebeverglasung',
    card: ['Schiebeverglasung', 'Rahmenlose Glasschiebesysteme mit breiten Flügeln und niedriger Schwelle.'],
    eyebrow: 'Rahmenlose Verglasung / Schiebesystem',
    h1: 'Rahmenlose Schiebeverglasung (Glasschiebesystem)',
    lead: 'Breite Glasflügel auf mehreren Schienen, die parallel gleiten: Die Öffnung ist in Sekunden offen. Weniger Stöße, klares Panorama — für Terrassen, Pavillons, Balkone und Raumteiler.',
    heroAlt: 'Rahmenlose Schiebeverglasung mit breiten Glasflügeln',
    intro: {
      title: 'Breite Flügel, wenig Profil',
      paragraphs: [
        'Ein Glasschiebesystem besteht aus mehreren Schienen, auf denen die Glasflügel parallel laufen. Es genügt, den ersten Flügel zu ziehen, die anderen folgen. Das Prinzip kennt man vom Schrank mit Schiebetüren.',
        'Die Flügel sind breiter als bei der Faltwand — bis 1,1–1,3 m — deshalb gibt es weniger vertikale Stöße, und das Panorama bleibt ruhiger. Ein mittiger Einstieg erlaubt es, die Flügel zu beiden Seiten der Öffnung zu schieben.',
        'Die Schwellenhöhe wählen wir nach Einsatzort: 7,5–16 mm für ständigen Durchgang, 30 mm für windige und regenreiche Lagen.'
      ],
      spec: [['Höhe bis 3000 mm', 'Öffnungen'], ['Flügel bis 1300 mm', 'System SLIDING TRACK'], ['Schwelle ab 7,5 mm', 'SLIDING SLIM'], ['Mittiger Einstieg', 'Flügel zu beiden Seiten']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Glasschiebesysteme für Einfachglas',
      intro: 'Sechs Schiebesysteme für ESG 8–10 mm. Warme Schiebesysteme für Isolierglas gibt es als eigene Lösung.',
      items: [
        ['SLIDING SLIM — Schwelle 7,5 mm', 'Parallel-Schiebesystem wie beim Schrank, mit der niedrigsten Schwelle von 7,5 mm — gut für Eingänge mit ständigem Durchgang und Innenraumtrennwände. Höhe bis 3000 mm, Flügel bis 900 mm, ESG 8 oder 10 mm, 3 oder 5 Schienen, Kombinationen 3+3 und 5+5, mittiger Einstieg, obere Rollen, sanftes Schließen mit Dämpfern.'],
        ['Schiebesystem, Schwelle 12,5 mm', 'Parallelbewegung, erste Flügel zieht den nächsten mit. Höhe bis 3000 mm, Flügel bis 1200 mm, ESG 8 oder 10 mm, 3 oder 5 Schienen; L- und U-förmige Verglasung mit Eckdichtung; Filzdichtung zwischen den Flügeln; Rollwagen aus Edelstahl.'],
        ['Schiebesystem, Schwelle 30 mm', 'Hohe Schwelle für Orte mit starkem Wind und Niederschlag, zum Beispiel Balkone in Neubauten oder Terrassen am Wasser. Flügel bis 1300 mm, ESG 8 oder 10 mm, zwei Bürstendichtungen am Flügel; mit fester Verglasung unten kombinierbar; L- und U-förmige Öffnungen.'],
        ['Schiebesystem der neuen Generation', 'Für ESG 10 mm: niedrigere Flügelprofile für mehr Transparenz, fünf Schlossvarianten und Smart-Griff. Schwelle 29,5 mm, Flügel bis 1100 mm, mittiger Einstieg; einfache oder doppelte Filzdichtung; abnehmbares Smart-Schloss zum Reinigen des Glases.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Schiebeverglasung',
      items: [
        ['Weniger Stöße', 'Flügel bis 1,1–1,3 m ergeben ein ruhiges Panorama.'],
        ['Öffnet in Sekunden', 'Ein Zug am ersten Flügel genügt.'],
        ['Niedrige Schwelle', 'Ab 7,5 mm — gut für Durchgänge.'],
        ['Windfest gedacht', 'Bei 30 mm Schwelle mit zwei Bürstendichtungen.'],
        ['Flexible Schienen', 'Drei oder fünf Schienen, mehrere Flügelgruppen.'],
        ['Viele Einsatzorte', 'Terrassen, Pavillons, Balkone, Restaurants, Raumteiler.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Mit Fotos und Maßen der Öffnung wählen wir die Schienenzahl und die Schwellenhöhe, die zu Ihrer Lage passen, und erstellen eine unverbindliche Kostenschätzung.', 'Anfragen und Projekte in Wien und ganz Österreich sind willkommen — Lieferung und Montage stimmen wir je nach Produkt und Projekt individuell mit Ihnen ab.'] },
    faq: {
      title: 'Schiebeverglasung: häufige Fragen',
      intro: 'Funktion, Flügel, Schwelle und Einsatz.',
      items: [
        ['Wie funktioniert die Schiebeverglasung?', 'Mehrere Schienen führen die Glasflügel parallel. Zieht man den ersten Flügel, folgen die anderen.'],
        ['Wie breit sind die Flügel?', 'Je nach System bis 900, 1100, 1200 oder 1300 mm.'],
        ['Welche Schwelle ist möglich?', 'Zwischen 7,5 und 16 mm für ständigen Durchgang, 30 mm für windige und regenreiche Lagen.'],
        ['Welches Glas wird eingesetzt?', 'ESG 8 oder 10 mm. Für Isolierglas gibt es eigene warme Schiebesysteme.'],
        ['Kann man in beide Richtungen öffnen?', 'Ja, ein mittiger Einstieg erlaubt es, die Flügel zu beiden Seiten der Öffnung zu schieben.'],
        ['Sind L- oder U-Formen möglich?', 'Ja, bei mehreren Systemen mit Eckdichtung.']
      ]
    },
    form: { title: 'Schiebeverglasung anfragen', text: 'Senden Sie Fotos und Maße der Öffnung — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['SLIDING SLIM (Schwelle 7,5 mm)', 'Schwelle 12,5 mm', 'Schwelle 30 mm (windige Lagen)', 'Neue Generation', 'Noch unentschlossen'], commentPlaceholder: 'Breite und Höhe der Öffnung, Form, Schwelle, Ort in Österreich', product: 'Rahmenlose Schiebeverglasung' },
    related: ['terrassenverglasung', 'glas-faltwand', 'balkonverglasung']
  },

  balkonverglasung: {
    meta: { title: 'Rahmenlose Balkonverglasung nach Maß | Space Glass', description: 'Rahmenlose Balkonverglasung mit Brüstung und Faltsystem, Schiebe- oder Guillotine-System für Balkon und Loggia. Anfrage aus Wien und Österreich.' },
    name: 'Balkonverglasung',
    card: ['Balkonverglasung', 'Panoramabalkon mit Glasbrüstung und rahmenloser Verglasung darüber.'],
    eyebrow: 'Rahmenlose Verglasung / Balkon',
    h1: 'Rahmenlose Balkonverglasung',
    lead: 'Panorama statt Rahmen: Die rahmenlose Verglasung des Balkons lässt den Blick frei, und die Flügel falten oder verschieben sich, wenn frische Luft gewünscht ist. Für Balkone und Loggien.',
    heroAlt: 'Rahmenlose Balkonverglasung mit Glasbrüstung',
    intro: {
      title: 'Panoramabalkon mit fertigen Systemen',
      paragraphs: [
        'Die rahmenlose Balkonverglasung entfernt vertikale Rahmen: Das offene Glas stört die Aussicht nicht, und die Flügel falten oder verschieben sich, wenn der Balkon geöffnet werden soll.',
        'Für Panoramabalkone gibt es fertige Kombinationen: eine feststehende Glasbrüstung bis 1,1–1,2 m Höhe und darüber bewegliche Verglasung. Beim System BALCONMAX INTEGRA ist das mittlere Profil zugleich Handlauf und Führungsschiene.',
        'In oberen Geschossen mit starkem Wind eignet sich GILIOTINA BALCON: Der untere Flügel lässt sich zum Reinigen des Glases von innen aufklappen.'
      ],
      spec: [['Brüstung bis 1100 mm', 'Glas 8–10 mm oder VSG'], ['Isolierglas 26–28 mm', 'BALCONTWIN INTEGRA'], ['L-, U-Form, Radius', 'auch komplexe Balkone'], ['Reinigung von innen', 'GILIOTINA BALCON']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Systeme für Balkone',
      intro: 'Drei fertige Panoramabalkone, eine Guillotine für hohe Gebäude und klassische Faltsysteme.',
      items: [
        ['BALCONMAX INTEGRA — Brüstung und Faltsystem', 'Feststehende Glasbrüstung unten und rahmenlose Faltverglasung oben; das mittlere Profil ist Handlauf und untere Führung der beweglichen Flügel. Höhe bis 4000 mm, Brüstung bis 1100 mm (Glas 8 oder 10 mm, VSG 4.4.2 / 5.5.2), bewegliche Flügel bis 650 mm, feste bis 1500 mm, Länge bis 5000 mm. Eloxiertes Aluminium oder Anthrazit.'],
        ['BALCONTWIN INTEGRA — warme Variante', 'Brüstung mit Isolierglas 26 mm und Faltsystem TIARA TWIN FLAT mit Isolierglas oben. Höhe bis 3100 mm, bewegliches Isolierglas 28 mm; erhöhter Schutz vor Wind, Schnee und Schmutz; zweiter Kondensatfänger; auch L-, U-förmige und runde Öffnungen.'],
        ['BALCONMAX + Schiebesystem', 'Feststehende Brüstung kombiniert mit einem Schiebesystem darüber — für transparente Balkone und Terrassen in der Höhe. Brüstung bis 1200 mm, Glas ESG oder VSG; Glas klar, Satin, Bronze oder Graphit; Profil in RAL-Farben.'],
        ['GILIOTINA BALCON — Guillotine für Balkone', 'Vertikal verschiebbares System für Panoramabalkone in der Höhe: Der untere Flügel ist aufklappbar, man kann lüften und das Glas von innen reinigen. Das Profil am Handlauf schützt vor Einklemmen. Breite bis 3500 mm.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum rahmenlose Balkonverglasung',
      items: [
        ['Freie Aussicht', 'Keine vertikalen Rahmen, nur Glas.'],
        ['Brüstung inklusive', 'Fertige Kombinationen aus Brüstung und beweglicher Verglasung.'],
        ['Auch warm', 'Varianten mit Isolierglas gegen Wind, Schnee und Schmutz.'],
        ['Für große Höhen', 'Guillotine mit aufklappbarem Flügel zum Reinigen von innen.'],
        ['Alle Balkonformen', 'L-, U-förmig und runde Balkone.'],
        ['Farben nach Wahl', 'Eloxiertes Aluminium, Anthrazit oder RAL.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie Fotos des Balkons und die ungefähren Maße — wir empfehlen die passende Kombination und erstellen eine unverbindliche Kostenschätzung.', 'Für Projekte in Wien und Österreich klären wir gemeinsam, wie Lieferung und Montage für Ihr Produkt am besten organisiert werden — je nach Produkt und Projekt.'] },
    faq: {
      title: 'Balkonverglasung: häufige Fragen',
      intro: 'Systeme, Brüstung, Glas und Reinigung.',
      items: [
        ['Was ist ein Panoramabalkon-System?', 'Eine feststehende Glasbrüstung unten und bewegliche rahmenlose Verglasung darüber. Bei BALCONMAX INTEGRA dient das mittlere Profil als Handlauf und Führungsschiene.'],
        ['Wie hoch ist die Brüstung?', 'Je nach System bis 1100 oder 1200 mm.'],
        ['Welches Glas wird verwendet?', 'Brüstung und Flügel in ESG 8 oder 10 mm oder VSG; bei den warmen Varianten Isolierglas 26 mm (fest) und 28 mm (beweglich).'],
        ['Was ist für hohe Gebäude geeignet?', 'GILIOTINA BALCON: Der untere Flügel lässt sich aufklappen, damit man lüften und das Glas von innen reinigen kann.'],
        ['Welche Formen sind möglich?', 'Gerade, L-, U-förmige und runde Balkone.'],
        ['Welche Farben gibt es?', 'Eloxiertes Aluminium oder Anthrazit, bei Schiebe-Kombinationen RAL-Farben.']
      ]
    },
    form: { title: 'Balkonverglasung anfragen', text: 'Senden Sie Fotos des Balkons und ungefähre Maße — wir empfehlen ein System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['BALCONMAX INTEGRA (Brüstung + Faltsystem)', 'BALCONTWIN INTEGRA (Isolierglas)', 'Brüstung + Schiebesystem', 'Guillotine für Balkone', 'Noch unentschlossen'], commentPlaceholder: 'Balkonmaße, Geschoss, Form, Glas, Ort in Österreich', product: 'Rahmenlose Balkonverglasung' },
    related: ['terrassenverglasung', 'glas-faltwand', 'balkongelaender']
  },

  'walk-in-dusche': {
    meta: { title: 'Walk-In-Duschwand aus Glas nach Maß | Space Glass', description: 'Walk-In-Duschabtrennung aus ESG 8 mm nach Maß: ohne Tür, in Chrom, Schwarz oder Gold. Sechs Modelle. Anfrage aus Wien und Österreich.' },
    name: 'Walk-In-Duschwand',
    card: ['Walk-In-Duschwand', 'Feststehende Duschabtrennung ohne Tür — nach Aufmaß aus ESG 8 mm.'],
    eyebrow: 'Glasduschen / Walk-In',
    h1: 'Walk-In-Duschwand und Duschabtrennung aus Glas',
    lead: 'Eine Dusche ohne Tür und ohne unnötige Teile: feststehendes Glas trennt den Nassbereich ab und lässt den Einstieg frei. Aus ESG 8 mm nach den Maßen Ihres Bades, mit Beschlägen in Chrom, Schwarz oder Gold.',
    heroAlt: 'Walk-In-Duschwand aus Glas in einem Badezimmer',
    intro: {
      title: 'Dusche ohne Tür, Scharniere und Schwelle',
      paragraphs: [
        'Eine Walk-In-Duschwand ist feststehendes Glas, das den Nassbereich abgrenzt und den Einstieg offen lässt. Es gibt keine Tür, keine Scharniere und keine Schwelle — die Dusche wirkt leicht, ist leicht zu reinigen und verkleinert das Bad optisch nicht.',
        'Die Modelle unterscheiden sich in der Zahl der Glasflächen und der Befestigung: ein Glas mit Halter, Glas von Boden bis Decke auf Profilen, Wand für die Nische, Frontglas mit seitlichem Einsatz oder eine Eck-Walk-in aus zwei Scheiben.',
        'Alle Duschwände fertigen wir aus ESG 8 mm nach Ihren Maßen, mit Beschlägen in Chrom, Schwarz oder Gold.'
      ],
      spec: [['ESG 8 mm', 'sicher bei Bruch'], ['Ohne Tür', 'nichts, was bricht oder undicht wird'], ['Beschläge', 'Chrom, Schwarz, Gold'], ['Nach Aufmaß', 'für Ihr Bad gefertigt']]
    },
    variants: {
      eyebrow: 'Modelle',
      title: 'Sechs Walk-In-Modelle',
      intro: 'Vom einfachen Glas mit Halter bis zur Eck-Walk-in. Alle Modelle in ESG 8 mm; Beschläge in Chrom, Schwarz oder Gold.',
      items: [
        ['FALLS — Glas mit Halter', 'Ein feststehendes Glas mit Halter (45° oder 90°): das Basismodell der Walk-in-Dusche für leichte Raumgliederung. Maße 800–1200 × 2000 mm. Minimalismus im Loft-Stil.'],
        ['BOND — Wand-, Boden- und Deckenbefestigung', 'Feststehende Wand mit Befestigung an Wand, Boden und Decke über Boden- und Deckenprofile; ein Bestseller im Loft-Stil, ohne Stabilisierungsstange. Klare Abgrenzung, maximal viel Licht.'],
        ['VOLIO — für Nischen', 'Offene Walk-in-Wand für Nischen und schmale Zonen mit horizontalem Halter senkrecht zum Glas.'],
        ['VIRGINIA — Frontglas', 'Duschwand mit Frontglas und offenen Seiten: eine knappe Form ohne Seitenelemente. Für geräumige Bäder.'],
        ['HELEN — mit Seitenteil', 'Frontscheibe mit schmalem Seitenteil, das Spritzwasser reduziert; Befestigung an der Wand. Der Raum bleibt offen.'],
        ['DELLA — Eck-Walk-in', 'Zwei feststehende Teile — vorn und seitlich an der Wand — bilden eine geschützte Duschzone ohne Tür, ähnlich einer Eckkabine.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Walk-In',
      items: [
        ['Ohne Tür', 'Nichts, was bricht oder undicht werden kann.'],
        ['Pflegeleicht', 'Glatte Glasflächen, wenige Beschläge.'],
        ['Offener Raum', 'Das Bad wirkt nicht kleiner.'],
        ['Sicheres Glas', 'ESG 8 mm zerfällt bei Bruch in stumpfe Krümel.'],
        ['Passend zum Stil', 'Beschläge in Chrom, Schwarz oder Gold.'],
        ['Maßgefertigt', 'Gefertigt nach Ihren Maßen.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie uns Fotos und ungefähre Maße der Duschzone — wir schlagen ein Walk-In-Modell vor und erstellen eine unverbindliche Kostenschätzung.', 'Wir begleiten Projekte in Wien und ganz Österreich; Lieferung und Montage richten sich nach Produkt und Objekt und werden individuell abgestimmt.'] },
    faq: {
      title: 'Walk-In-Duschwand: häufige Fragen',
      intro: 'Modelle, Glas, Beschläge und Aufmaß.',
      items: [
        ['Was ist eine Walk-In-Dusche?', 'Eine Dusche mit feststehendem Glas, das den Nassbereich abgrenzt, aber den Einstieg offen lässt — ohne Tür, Scharniere und Schwelle.'],
        ['Welches Glas wird verwendet?', 'ESG mit 8 mm — sicher bei Bruch.'],
        ['Welche Beschlagfarben gibt es?', 'Chrom, Schwarz und Gold.'],
        ['Wird die Duschwand nach Maß gefertigt?', 'Ja, nach den Maßen, die wir beim Aufmaß festlegen.'],
        ['Wie unterscheiden sich die Modelle?', 'In der Zahl der Glasflächen und in der Befestigung: ein Glas mit Halter, Wand-Boden-Decken-Befestigung, Nischenmodell, Frontglas mit Seitenteil oder Eck-Walk-in.'],
        ['Spritzt Wasser aus der Dusche?', 'Ein schmales Seitenteil (Modell HELEN) reduziert das Spritzwasser; die Modelle ohne Tür sind offene Lösungen.']
      ]
    },
    form: { title: 'Walk-In-Duschwand anfragen', text: 'Senden Sie Fotos des Bades und ungefähre Maße — wir schlagen ein Modell vor und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Modell', options: ['FALLS', 'BOND', 'VOLIO', 'VIRGINIA', 'HELEN', 'DELLA', 'Noch unentschlossen'], commentPlaceholder: 'Maße der Duschzone, Beschlagfarbe, Nische oder Ecke, Ort in Österreich', product: 'Walk-In-Duschwand' },
    related: ['eckdusche', 'schiebetuer-dusche', 'hotels']
  }
};
