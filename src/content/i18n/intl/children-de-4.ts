// DE child pages, part 4: Balkongeländer, Glasschiebetür, Pfosten-Riegel-Fassade, LED-Spiegel, Hotels.
import type { ChildCopy } from './types';

export const childrenDe4: Record<string, ChildCopy> = {
  balkongelaender: {
    meta: { title: 'Balkon- und Terrassengeländer aus Glas | Space Glass', description: 'Glasgeländer für Balkon und Terrasse als Absturzsicherung: VSG 8,76–21,52 mm, Klemmprofil, Edelstahl AISI 316. Anfrage aus Wien und Österreich.' },
    name: 'Balkongeländer aus Glas',
    card: ['Balkongeländer aus Glas', 'Freie Aussicht statt Brüstung: VSG im Klemmprofil, französische Balkone und mehr.'],
    eyebrow: 'Glasgeländer / Balkon',
    h1: 'Balkon- und Terrassengeländer aus Glas',
    lead: 'Eine Aussicht, die nichts verdeckt: Das Glasgeländer ersetzt die geschlossene Brüstung und die Metallstäbe. Die Fassade wirkt modern, und das VSG schützt vor Wind — auch wenn eine Scheibe bricht, fällt niemand durch.',
    heroAlt: 'Balkongeländer aus Glas an einer Fassade',
    intro: {
      title: 'Ein Balkon mit freier Sicht',
      paragraphs: [
        'Auf dem Balkon ersetzt Glas die geschlossene Brüstung und die Metallstäbe: Aus dem Raum sieht man die Landschaft, und die Fassade wirkt modern. VSG schützt vor Wind und verhindert, dass jemand fällt, selbst wenn eine Scheibe bricht.',
        'Meist befestigen wir das Glas im Klemmprofil an der Stirn der Balkonplatte — so beansprucht das Geländer keine Balkonfläche, und das Profil verdeckt die Plattenkante. Für schmale und französische Balkone eignet sich die Punktbefestigung direkt an der Fensteröffnung.',
        'Alle Beschläge für den Außenbereich bestehen aus Edelstahl AISI 316 und eloxiertem Aluminium — sie rosten nicht am Meer und werden vom Regen nicht dunkel.',
        'Dasselbe gilt für die Terrasse: Ein Glasgeländer dient dort als Absturzsicherung, ohne den Blick zu verstellen. Auf Holz- oder Verbunddielen befestigen wir das Glas auf Minihandläufen am Unterbau, auf Beton im Klemmprofil. Höhe, Glas und Befestigung legen wir nach dem Aufmaß und den für Ihr Objekt geltenden Vorschriften fest.'
      ],
      spec: [['VSG 8,76–21,52 mm', 'laminiertes vorgespanntes Glas'], ['1,0–1,2 m', 'Höhe je nach geltenden Vorschriften'], ['AISI 316', 'Beschläge für den Außenbereich'], ['Stirnbefestigung', 'beansprucht keine Balkonfläche']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Varianten für Balkongeländer',
      intro: 'Sechs Lösungen für Balkone von Wohnungen und Häusern.',
      items: [
        ['Französischer Balkon am Fenster', 'Glas in der Öffnung eines bodentiefen Fensters — am Fensterrahmen (LINEO) oder auf Edelstahlhaltern in der Laibung (CANTO); VSG, Höhe typisch 0,9–1,1 m. Alle Ausführungen finden Sie auf der Seite Französischer Balkon aus Glas.'],
        ['Bündiges Profil mit der Platte', 'Klemmprofil, oben befestigt, aber bündig mit der Plattenkante: Die Befestigung liegt im Profil, die Fassade wirkt geschlossen. Aluminiumprofil 124,5 × 46 mm mit Flansch 91 mm, VSG 17,52 oder 21,52 mm, Glashöhe bis 1300 mm, Paneel bis 2500 mm, Last bis 3 kN/m; Farben Edelstahl, Schwarz, Anthrazit, Weiß, RAL.'],
        ['Stirnbefestigung', 'Stirnprofil für Balkone in Mehrfamilienhäusern — das Geländer beansprucht keine Balkonfläche und sieht an der ganzen Fassade gleich aus. Aluminiumprofil 124,5 × 46 mm, VSG 17,52 oder 21,52 mm, Glashöhe bis 1300 mm, Montage mit Abstand möglich.'],
        ['Geländer mit Stirnverkleidung', 'Glasgeländer mit Verkleidung der Plattenstirn von 23–60 cm Höhe — verbirgt dicke Decken und lässt die Fassade durchgehend gläsern wirken. Profil 230 × 45 mm, Verkleidung 230–600 mm aus Edelstahl oder lackiertem Stahl.'],
        ['Terrasse: Pfosten mit Handlauf (GARDO)', 'Runde Edelstahlpfosten mit Handlauf — eine günstige Lösung für Balkone und Terrassen. Pfosten AISI 304, Ø 42,4 × 2 mm, VSG 8,76 oder 12,76 mm, Höhe bis 1000 mm, Pfostenabstand 500–1500 mm, Montage oben oder an der Stirn; Form I, L oder U.'],
        ['Terrasse: Windschutz aus Glas', 'Ein Glasgeländer von 1,0 bis 1,6 m Höhe bricht den Wind auf der Terrasse und lässt den Blick offen. Anders als ein Holz- oder Metallzaun braucht Glas keinen Anstrich und beschattet nichts. Auf Holz- oder Verbunddielen befestigen wir das Glas auf Minihandläufen am Unterbau, auf Beton im Klemmprofil; Beschläge aus Edelstahl AISI 316 und eloxiertem Aluminium, Glaskanten geschliffen und poliert.'],
        ['Terrasse: quadratische Pfosten (DENSARO)', 'Quadratische Pfosten mit durchgehender Klemmung des Glases über die Höhe — strenge, moderne Geometrie für Balkone und Terrassen. Pfosten AISI 304, 60 × 40 mm, VSG 12,76 mm, Höhe bis 1100 mm, Pfostenabstand 500–1500 mm; Aluminium-Kantenschutz.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein Glasgeländer am Balkon',
      items: [
        ['Freie Sicht', 'Glas statt geschlossener Brüstung.'],
        ['Sicherer Schutz', 'VSG: Auch bei gebrochener Scheibe bleibt der Schutz bestehen.'],
        ['Kein Flächenverlust', 'Die Stirnbefestigung nimmt keine Balkonfläche in Anspruch.'],
        ['Witterungsbeständig', 'Edelstahl AISI 316 und eloxiertes Aluminium.'],
        ['Einheitliche Fassade', 'Gleiche Optik an allen Balkonen.'],
        ['Für Wohnung und Haus', 'Auch französische Balkone für Panoramafenster.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie uns Fotos des Balkons, die Länge und die Art der Platte — wir wählen die Befestigung und erstellen eine unverbindliche Kostenschätzung.', 'Wir begleiten Projekte in Wien und ganz Österreich; Lieferung und Montage richten sich nach Produkt und Objekt und werden individuell abgestimmt.'] },
    faq: {
      title: 'Balkongeländer aus Glas: häufige Fragen',
      intro: 'Glas, Höhe, Befestigung und Material.',
      items: [
        ['Welches Glas wird für das Balkongeländer verwendet?', 'VSG aus vorgespanntem Glas, 8,76 bis 21,52 mm.'],
        ['Wie hoch ist ein Balkongeländer?', 'Typisch 1,0–1,2 m, je nach den für Ihr Objekt geltenden Vorschriften.'],
        ['Wie wird das Glas befestigt?', 'Meist im Klemmprofil an der Plattenstirn; bei französischen Balkonen am Fensterrahmen oder auf Haltern in der Laibung.'],
        ['Rostet das Geländer?', 'Nein: Für den Außenbereich verwenden wir Edelstahl AISI 316 und eloxiertes Aluminium.'],
        ['Was ist ein französischer Balkon?', 'Ein Glasgeländer in der Öffnung eines bodentiefen Fensters — leichter Schutz vor dem Panoramafenster.'],
        ['Welche Farben gibt es?', 'Edelstahl, Weiß, Anthrazit, Schwarz oder RAL, je nach System.'],
        ['Kann Glas als Windschutz für die Terrasse dienen?', 'Ja: Ein Glasgeländer mit 1,0 bis 1,6 m Höhe hält Zugluft ab und lässt die Aussicht frei. Höhe und Befestigung legen wir nach dem Aufmaß fest; eine Zusage zu bestimmten Vorschriften geben wir nicht.'],
        ['Gibt es auch Geländer für die Terrasse?', 'Ja: auf Holz- oder Verbunddielen mit Minihandläufen am Unterbau, auf Beton im Klemmprofil; für Cafés und Restaurants in Segmenten, die sich leicht warten lassen.'],
        ['Dient das Glasgeländer als Absturzsicherung?', 'Ja, VSG-Glasgeländer schützen vor dem Absturz. Höhe, Glas und Befestigung legen wir nach dem Aufmaß und den für Ihr Objekt geltenden Vorschriften fest; eine pauschale Zusage geben wir nicht.']
      ]
    },
    form: { title: 'Balkongeländer aus Glas anfragen', text: 'Senden Sie Fotos des Balkons und ungefähre Maße — wir empfehlen die Befestigung und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Variante', options: ['Französischer Balkon (am Fensterrahmen)', 'Französischer Balkon (Halter in der Laibung)', 'Bündiges Profil', 'Stirnbefestigung', 'Mit Stirnverkleidung', 'Noch unentschlossen'], commentPlaceholder: 'Länge und Höhe, Plattenstirn, Material, Farbe, Ort in Österreich', product: 'Balkongeländer aus Glas' },
    related: ['franzoesischer-balkon', 'treppengelaender', 'balkonverglasung', 'glas-faltwand', 'bautraeger-wohnanlagen']
  },

  glasschiebetuer: {
    meta: { title: 'Glasschiebetür nach Maß | Space Glass', description: 'Glasschiebetür nach Maß: offene oder verdeckte Laufschiene, ESG 8–10 mm, Softclose-Dämpfer, ein- oder zweiflügelig. Anfrage aus Wien und Österreich.' },
    name: 'Glasschiebetür',
    card: ['Glasschiebetür', 'Schiebetür aus Glas an offener oder verdeckter Schiene — kein Platzbedarf vor der Öffnung.'],
    eyebrow: 'Glastüren / Schiebetür',
    h1: 'Glasschiebetür nach Maß',
    lead: 'Eine Glasschiebetür läuft an einer Schiene entlang der Wand oder verschwindet in einem Taschenelement. Vor der Öffnung ist kein Platz zum Aufschwingen nötig — ideal für kompakte Räume.',
    heroAlt: 'Glasschiebetür an offener Laufschiene',
    intro: {
      title: 'Türen, die keinen Platz brauchen',
      paragraphs: [
        'Glasschiebetüren laufen an einer Schiene entlang der Wand oder verschwinden in einer Tasche. Vor der Öffnung wird keine freie Fläche zum Öffnen gebraucht — deshalb sind sie die Lösung für kompakte Räume.',
        'Die Schiene kann offen sein, als Designelement mit Rollen aus Edelstahl, oder in Decke oder Profil verdeckt. Für große Öffnungen werden zwei Flügel eingesetzt, die auseinanderlaufen.',
        'Für sanftes Schließen ergänzen wir Dämpfer, für Ankleiden und Bäder Schlösser und Satinatoglas.'
      ],
      spec: [['0 cm vor der Öffnung', 'kein Schwenkbereich'], ['Offene oder verdeckte Schiene', 'je nach Stil'], ['Softclose', 'sanftes Schließen'], ['Ein oder zwei Flügel', 'nach Breite der Öffnung']]
    },
    variants: {
      eyebrow: 'Ausführungen',
      title: 'Glasschiebetüren: Ausführungen',
      intro: 'Von der offenen Schiene auf Rollen bis zur rahmenlosen Tür für die Küche.',
      items: [
        ['An offener Schiene (Rollen aus Edelstahl)', 'Das Glasblatt hängt an Rollen an einer offenen Edelstahlstange — Scheunentor- oder Loft-Stil. ESG 8–10 mm, dekorative Rollen, Dämpfer optional, Montage an der Wand über der Öffnung. Die Beschläge sind ein Akzent im Interieur; kein Eingriff in die Decke nötig; auch mit Spiegelblatt möglich.'],
        ['Rolle mit Dämpfer', 'Rollen mit Lagern und Dämpfer bremsen das Blatt in den Endlagen sanft ab, die Tür schlägt nicht. Dämpfer in eine oder zwei Richtungen, Blattgewicht typisch bis 80–100 kg, Edelstahl, in der Höhe regulierbar.'],
        ['Verdeckte Schiene im Aluminiumprofil', 'Glas in schlankem Profil, die Schiene ist verdeckt — strenge, moderne Optik für Ankleide und Schlafzimmer. Glas klar, satiniert oder getönt; Profil Aluminium, schwarz oder RAL; obere verdeckte Schiene; ein oder mehrere Flügel; Dämpfer.'],
        ['Zweiflügelige Schiebetür', 'Zwei Flügel laufen von der Mitte auseinander — für breite Öffnungen zwischen Küche und Wohnzimmer oder zum Arbeitszimmer, bis ca. 3 m Breite. Synchrone Dämpfer optional; Loft-Sprossenraster auf Wunsch.'],
        ['Rahmenlose Schiebetür', 'Durchgehendes ESG 10 mm mit minimalen Beschlägen — fast unsichtbare Tür für Küche oder Raumteilung. Aluminiumschiene offen oder in der Decke, Einlassgriff oder Bügelgriff, Dämpfer optional.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Glasschiebetür',
      items: [
        ['Kein Platzbedarf', 'Der Flügel gleitet an der Wand.'],
        ['Viele Gestaltungen', 'Offene Schiene als Akzent oder verdeckt für Minimalismus.'],
        ['Sanftes Schließen', 'Dämpfer verhindern Schlagen.'],
        ['Anpassbar', 'Ein oder zwei Flügel nach Breite der Öffnung.'],
        ['Einstellbar', 'Rollen regulierbar in der Höhe.'],
        ['Mit Schloss und Satinatoglas', 'Für Ankleiden und Bäder.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie uns Foto und Maße der Öffnung — wir empfehlen die Art der Schiene und erstellen eine unverbindliche Kostenschätzung.', 'Ob Wohnung, Büro oder Gewerbeobjekt in Wien oder Österreich: Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.'] },
    faq: {
      title: 'Glasschiebetür: häufige Fragen',
      intro: 'Schiene, Glas, Dämpfer und Breite.',
      items: [
        ['Wie funktioniert eine Glasschiebetür?', 'Das Glasblatt läuft an Rollen auf einer Schiene entlang der Wand oder verschwindet in einer Tasche. Vor der Öffnung ist kein Platz zum Aufschwingen nötig.'],
        ['Welches Glas wird verwendet?', 'ESG mit 8–10 mm; rahmenlose Türen in ESG 10 mm.'],
        ['Kann die Tür sanft schließen?', 'Ja, mit Dämpfern in eine oder zwei Richtungen. Das Blattgewicht liegt typisch bis 80–100 kg.'],
        ['Welche Schienenarten gibt es?', 'Offene Schiene (Edelstahl, dekorativ), verdeckte Schiene im Profil oder in der Decke.'],
        ['Wie breit darf die Öffnung sein?', 'Zweiflügelige Türen eignen sich für Öffnungen bis ca. 3 m.'],
        ['Kann die Tür abgeschlossen werden?', 'Ja, für Ankleiden und Bäder gibt es Schlösser und Satinatoglas.']
      ]
    },
    form: { title: 'Glasschiebetür anfragen', text: 'Senden Sie Foto und Maße der Öffnung — wir empfehlen die Ausführung und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Ausführung', options: ['Offene Schiene mit Rollen', 'Rolle mit Dämpfer', 'Verdeckte Schiene im Aluminiumprofil', 'Zweiflügelig', 'Rahmenlos', 'Noch unentschlossen'], commentPlaceholder: 'Breite und Höhe der Öffnung, Raum, Glas, Schloss, Ort in Österreich', product: 'Glasschiebetür' },
    related: ['schiebe-trennwand', 'trennwand-tuer', 'schiebetuer-dusche', 'glastuer-aluminiumrahmen']
  },

  'pfosten-riegel': {
    meta: { title: 'Pfosten-Riegel-Fassade aus Glas | Space Glass', description: 'Pfosten-Riegel-Glasfassade auf Aluprof-Systemen: Uf ab 0,55 W/(m²K), Profile 50 oder 60 mm, Fenster und Türen integrierbar. Anfrage aus Österreich.' },
    name: 'Pfosten-Riegel-Fassade',
    card: ['Pfosten-Riegel-Fassade', 'Die Klassiker der Glasfassade: Pfosten, Riegel und Isolierglas in Aluminium.'],
    eyebrow: 'Glasfassaden / Pfosten-Riegel',
    h1: 'Pfosten-Riegel-Fassade — Glasfassade aus Aluminium',
    lead: 'Die Klassik der Glasfassaden: Pfosten und Riegel werden am Gebäude montiert, dann kommen Isolierglas und Pressleisten. Für Wohnhäuser, Büros, Ladenlokale und große Gebäude.',
    heroAlt: 'Pfosten-Riegel-Glasfassade eines Gebäudes',
    intro: {
      title: 'Die klassische Glasfassade',
      paragraphs: [
        'Eine Pfosten-Riegel-Fassade wird am Gebäude Element für Element montiert: Zuerst werden die Pfosten an den Decken befestigt, dazwischen die Riegel, danach setzt man das Isolierglas und die Pressleisten mit Abdeckkappen ein.',
        'Die Systeme unterscheiden sich in der Profilbreite (50 oder 60 mm), in der Wärmedämmung und im Aussehen: klassische Pressleisten, eine betonte horizontale Linie (PL) oder durchgehendes Glas (EFEKT).',
        'Dieselben Profile werden für Glasdächer, Lichtkuppeln und Wintergärten verwendet; in die Fassade lassen sich Fenster und Türen kompatibler Systeme einbauen.'
      ],
      spec: [['Uf ab 0,55 W/(m²K)', 'System MB-MT50N'], ['Bis 3000 Pa', 'Windlast'], ['Modul bis 1100 kg', 'MB-SR50N, SR60N'], ['Profil 50 oder 60 mm', 'sichtbare Breite']]
    },
    variants: {
      eyebrow: 'Systeme',
      title: 'Pfosten-Riegel-Systeme von Aluprof',
      intro: 'Sechs Systeme — vom beliebtesten MB-SR50N bis zum warmen MB-MT50N. Werte laut Herstellerangaben.',
      items: [
        ['MB-MT50N — warm', 'Eine der beliebtesten Aluprof-Fassaden. Profilbreite 50 mm; Vorhangfassaden, Dächer, Dachfenster und räumliche Konstruktionen. Uf ab 0,55 W/(m²K), Luftdurchlässigkeit AE 1950 Pa, Wasserdichtheit RE 1950 Pa, Windlast 3000 Pa, Isolierglas 20–64 mm, entspricht EN 13830. Fenster, Türen und Schiebesysteme von Aluprof integrierbar; für Büros, Hochhäuser und Barnhäuser.'],
        ['MB-SR50N — das beliebteste System', 'Die gefragteste Aluprof-Fassade für Gebäude jeder Größe — vom Privathaus bis zum Einkaufszentrum. Schmale Teilungslinien, eingebaute Fenster und Türen. Uf ab 0,6 W/(m²K), Luftdurchlässigkeit AE 1200, Wasserdichtheit RE 1200, Stoßfestigkeit I5/E5, Modulgewicht bis 1100 kg. Gebogene und komplexe Fassadenformen, bündige Pfosten und Riegel innen, Kipp- und Dachfenster, HPVC-Isolatoren, EPDM-Dichtungen.'],
        ['MB-SR50N HI — erhöhte Wärmedämmung', 'Variante des MB-SR50N mit zusätzlichen Dämmeinlagen: dieselben schmalen Teilungslinien, aber bessere Wärmedämmung für beheizte Gebäude. Uf ab 0,85 W/(m²K), RE 1500, Stoßfestigkeit I5/E5, Profilbreite 50 mm; ebene Wände, Dächer, Lichtkuppeln.'],
        ['MB-SR60N — Fassade mit 60-mm-Profilen', 'Fassadensystem mit sichtbarer Breite von Pfosten und Riegeln von 60 mm für große Glaswände. Mit gedämmter Variante HI+ und Variante EFEKT ohne äußere Pressleisten. Luftdurchlässigkeit bis AE 1350, Wasserdichtheit bis RE 1500, Windlast 2,4 kN/m², Stoßfestigkeit I5/E5, Verglasung 4–72 mm; facettierte Wände ohne Eckpfosten.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Pfosten-Riegel-Fassade',
      items: [
        ['Für jede Gebäudegröße', 'Vom Einfamilienhaus bis zum Einkaufszentrum.'],
        ['Warm', 'Uf ab 0,55 W/(m²K) beim System MB-MT50N.'],
        ['Fenster und Türen integrierbar', 'Kompatible Systeme in der Fassade.'],
        ['Für Dächer und Wintergärten', 'Dieselben Profile für Glasdächer, Lichtkuppeln und Wintergärten.'],
        ['Gestaltungsfreiheit', 'Gebogene und facettierte Fassadenformen.'],
        ['Geprüfte Werte', 'Stoßfestigkeit I5/E5, EN 13830 laut Herstellerangaben.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Für Fassadenprojekte senden Sie uns Pläne oder Fotos mit Maßen. Wir wählen das System, erstellen die Spezifikation und geben eine unverbindliche Kostenschätzung ab.', 'Gern übernehmen wir Projekte in Wien und Österreich — den Umfang von Lieferung und Montage legen wir je nach Produkt und Projekt gemeinsam fest.'] },
    faq: {
      title: 'Pfosten-Riegel-Fassade: häufige Fragen',
      intro: 'Aufbau, Systeme und Einsatz.',
      items: [
        ['Wie ist eine Pfosten-Riegel-Fassade aufgebaut?', 'Pfosten werden an den Decken befestigt, zwischen ihnen die Riegel; danach werden Isolierglas und Pressleisten mit Abdeckkappen montiert.'],
        ['Welche Profilbreiten gibt es?', '50 oder 60 mm.'],
        ['Wie warm ist die Fassade?', 'Das System MB-MT50N erreicht Uf ab 0,55 W/(m²K); MB-SR50N HI ab 0,85 W/(m²K).'],
        ['Welche Windlast hält sie aus?', 'MB-MT50N bis 3000 Pa; MB-SR60N bis 2,4 kN/m².'],
        ['Kann man Fenster und Türen einbauen?', 'Ja, Fenster und Türen kompatibler Aluprof-Systeme lassen sich in die Fassade integrieren.'],
        ['Wo wird die Fassade eingesetzt?', 'Für Wohnhäuser, Büros, Ladenlokale und große Gebäude, außerdem für Glasdächer, Lichtkuppeln und Wintergärten.']
      ]
    },
    form: { title: 'Pfosten-Riegel-Fassade anfragen', text: 'Senden Sie Pläne oder Fotos mit Maßen — wir wählen das System und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'System', options: ['MB-MT50N', 'MB-SR50N', 'MB-SR50N HI', 'MB-SR60N', 'Noch unentschlossen'], commentPlaceholder: 'Gebäudeart, Fassadenfläche, vorhandene Pläne, Anforderungen, Ort in Österreich', product: 'Pfosten-Riegel-Fassade' },
    related: ['aluminiumfenster', 'aluminium-schiebetuer', 'hotels', 'structural-glazing']
  },

  'led-spiegel': {
    meta: { title: 'LED-Spiegel nach Maß und Modelle | Space Glass', description: 'LED-Spiegel für Bad und Wohnbereich: fertige Modelle mit IP44 und Spiegelglas von Saint-Gobain oder nach Maß. Anfrage aus Wien und Österreich.' },
    name: 'LED-Spiegel',
    card: ['LED-Spiegel', 'Spiegel mit Frontlicht oder Hintergrundbeleuchtung — fertig oder nach Maß.'],
    eyebrow: 'Spiegel / LED',
    h1: 'LED-Spiegel — Spiegel mit LED-Beleuchtung',
    lead: 'Licht, das arbeitet — nicht nur schmückt: Der LED-Spiegel verbindet Spiegel und Leuchte. Frontales Licht für Make-up und Rasur, Hintergrundlicht für Atmosphäre. Fertige Modelle von Space Glass oder nach Maß.',
    heroAlt: 'Spiegel mit LED-Beleuchtung',
    intro: {
      title: 'Spiegel und Leuchte in einem',
      paragraphs: [
        'Ein Spiegel mit LED-Beleuchtung verbindet Spiegel und Leuchte. Das frontale Licht beleuchtet das Gesicht gleichmäßig — für Make-up, Rasur und Pflege. Das Hintergrundlicht leuchtet sanft auf die Wand und schafft Atmosphäre.',
        'Wir bieten fertige Modelle von Space Glass mit Spiegelglas von Saint-Gobain und Schutzart IP44 für Badezimmer sowie Spiegel mit Beleuchtung nach individueller Größe und Form an.',
        'Vor der Fertigung stimmen wir Lichtszenario, Farbtemperatur, Lage des Stromanschlusses und Zusatzfunktionen ab: Sensor, Dimmer und Beschlagschutz-Heizung.'
      ],
      spec: [['IP44', 'für Badezimmer'], ['2000 lm', 'Helligkeit des LED-Streifens'], ['Frontal- oder Hintergrundlicht', 'nach Szenario'], ['Sonderformen', 'nach Maß und Form']]
    },
    variants: {
      eyebrow: 'Modelle',
      title: 'LED-Spiegel von Space Glass',
      intro: 'Beliebte Modelle verschiedener Formen — von rund bis ganzkörpergroß. Alle mit Schutzart IP44.',
      items: [
        ['COMO — rechteckig, Frontlicht', 'Rechteckiger Spiegel mit frontaler Beleuchtung — der Klassiker fürs Bad über dem Waschtisch. Maße 600 × 800 bis 1000 × 800 mm; horizontal oder vertikal montierbar; gleichmäßiges Licht auf das Gesicht; Wahl der Lichtfarbe.'],
        ['KING — abgerundete Ecken', 'Rechteckiger Spiegel mit abgerundeten Ecken und Frontlicht — ein weicherer Umriss fürs moderne Bad. Maße 600 × 800 bis 1000 × 800 mm; horizontal oder vertikal; helles Licht fürs Make-up.'],
        ['AGNES — rund, Hintergrundlicht', 'Runder Spiegel mit Hintergrundbeleuchtung: Das Licht breitet sich sanft auf der Wand um das Glas aus. Durchmesser 600–900 mm; schlicht ohne Rahmen; für Bad, Flur und Schlafzimmer.'],
        ['MOON — hoher Spiegel mit Hintergrundlicht', 'Hoher Spiegel in Form eines abgeschnittenen Kreises mit Hintergrundlicht — ein Blickfang für Schlafzimmer oder Flur. Maße 700 × 1400 bis 1000 × 2000 mm; Ganzkörperformat.'],
        ['FEATHER (AMO) — organische Form', 'Ganzkörperspiegel in asymmetrischer Form aus der Serie AMO: fließende, natürliche Linien und Hintergrundlicht. Maß 620 × 1500 mm; ohne Rahmen; für Flur und Schlafzimmer.'],
        ['BLOSSOM — Stadionform mit Frontlicht', 'Ganzkörperspiegel in Stadionform mit frontaler Beleuchtung: helles Licht auf ganzer Höhe. Maße 600 × 1500 bis 800 × 2000 mm; für Ankleide und Flur, auch für Salons geeignet.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein LED-Spiegel',
      items: [
        ['Licht im Spiegel', 'Eine Einheit aus Spiegel und Leuchte.'],
        ['Fürs Bad geeignet', 'Schutzart IP44.'],
        ['Hochwertiges Spiegelglas', 'Saint-Gobain MIRALITE PURE, korrosionsbeständig.'],
        ['Szenario nach Wunsch', 'Frontlicht für Make-up, Hintergrundlicht für Atmosphäre.'],
        ['Zusatzfunktionen', 'Sensor, Dimmer und Beheizung gegen Beschlag.'],
        ['Nach Maß', 'Individuelle Größe und Form.']
      ]
    },
    austria: { title: 'Anfragen aus Wien und ganz Österreich', paragraphs: ['Senden Sie uns Foto, Maße und gewünschtes Lichtszenario — wir empfehlen ein Modell oder fertigen den Spiegel nach Maß und erstellen eine unverbindliche Kostenschätzung.', 'Wir realisieren Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.'] },
    faq: {
      title: 'LED-Spiegel: häufige Fragen',
      intro: 'Modelle, Licht, Schutzart und Zusatzfunktionen.',
      items: [
        ['Welche Schutzart haben die LED-Spiegel?', 'Die fertigen Modelle von Space Glass haben Schutzart IP44 für Badezimmer.'],
        ['Welches Spiegelglas wird verwendet?', 'Spiegelglas Saint-Gobain MIRALITE PURE, korrosionsbeständig.'],
        ['Wie unterscheiden sich Front- und Hintergrundlicht?', 'Frontlicht beleuchtet das Gesicht gleichmäßig für Make-up und Rasur; Hintergrundlicht leuchtet sanft auf die Wand und schafft Atmosphäre.'],
        ['Gibt es Spiegel nach Maß?', 'Ja, Spiegel mit Beleuchtung nach individueller Größe und Form.'],
        ['Welche Zusatzfunktionen gibt es?', 'Sensor, Dimmer und Beheizung gegen Beschlag; vor der Fertigung stimmen wir Lichtfarbe und Lage des Stromanschlusses ab.'],
        ['Welche Modelle gibt es?', 'COMO, KING, AGNES, MOON, FEATHER (AMO) und BLOSSOM — von rechteckig bis ganzkörpergroß.']
      ]
    },
    form: { title: 'LED-Spiegel anfragen', text: 'Senden Sie Foto und Maße — wir empfehlen ein Modell oder planen einen Spiegel nach Maß und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Modell', options: ['COMO', 'KING', 'AGNES', 'MOON', 'FEATHER (AMO)', 'BLOSSOM', 'Spiegel nach Maß'], commentPlaceholder: 'Maße, Form, Lichtszenario, Raum (Bad, Flur, Salon), Ort in Österreich', product: 'LED-Spiegel' },
    related: ['walk-in-dusche', 'hotels', 'eckdusche']
  },

  hotels: {
    meta: { title: 'Glas für Hotels: Duschen, Fassaden, Trennwände', description: 'Glaslösungen für Hotellerie: Duschabtrennungen für Zimmer, Glastrennwände für Lobby, Geländer, Terrassenverglasung. Anfrage aus Wien und Österreich.' },
    name: 'Glas für Hotels',
    card: ['Glas für Hotels', 'Duschen, Spiegel, Trennwände, Geländer und Terrassen — als Serie für das ganze Haus.'],
    eyebrow: 'Für Gewerbe / Hotellerie',
    h1: 'Glaslösungen für Hotels und Hotellerie',
    lead: 'Glas lässt ein Hotel hochwertiger und großzügiger wirken: panoramaverglaste Eingangsbereiche, Glastrennwände in der Lobby und Glasduschen in den Zimmern. Ein Standard für alle Zimmer, Montage Etage für Etage.',
    heroAlt: 'Hotellobby mit Glaskonstruktionen',
    intro: {
      title: 'Ein Hotel, in dem man gern bleibt',
      paragraphs: [
        'Glas hilft einem Hotel, hochwertiger zu wirken und sich großzügiger anzufühlen: Panorama-Eingangsbereiche laden von der Straße ein, Glastrennwände gliedern die Lobby in Zonen, ohne Licht zu verlieren, und in den Zimmern machen Glasduschen das Bad leicht und hygienisch.',
        'Für Hotels zählen Standard und Zuverlässigkeit. Wir stimmen eine einheitliche Dusche oder einen Spiegel ab und übertragen ihn auf alle Zimmer, wählen Beschläge für intensive Nutzung und arbeiten in Etappen — Etage für Etage.',
        'Rahmenlose Verglasung von Terrassen und Restaurant verlängert die Saison, Glasgeländer an Balkonen öffnen den Blick aus den Zimmern.'
      ],
      spec: [['Serien für Zimmer', 'ein einheitlicher Standard'], ['Montage in Etappen', 'ohne Stopp der Belegung'], ['Beschläge', 'für intensive Nutzung'], ['Alles aus einer Hand', 'Aufmaß, Fertigung, Montage']]
    },
    variants: {
      eyebrow: 'Bereiche',
      title: 'Die Zonen eines Hotels und das passende Glas',
      intro: 'Sechs Bereiche, für die wir Glaslösungen fertigen.',
      items: [
        ['Lobby und Rezeption', 'Eingangsanlagen, Glastüren und Glastrennwände — der erste Eindruck für den Gast. Als Panorama-Verglasung der Lobby eignen sich Pfosten-Riegel-Fassaden aus Aluminium.'],
        ['Zimmer und Bäder', 'Duschkabinen, Walk-In-Duschwände und Badewannenaufsätze. Ein Duschformat pro Zimmertyp, das für alle Zimmer übernommen wird.'],
        ['Spiegel für Zimmer', 'Spiegel mit LED-Beleuchtung IP44 nach einem einheitlichen Design-Code des Hauses.'],
        ['Zonentrennung', 'Glastrennwände für Lobby, Lounge und Konferenzräume.'],
        ['Balkongeländer', 'Rahmenlose Geländer von Balkonen und Treppen — Aussicht ohne Hindernisse.'],
        ['Terrassen und Restaurant', 'Rahmenlose Verglasung von Terrassen und Gastgärten.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Glas im Hotel',
      items: [
        ['Aussicht ohne Hindernisse', 'Panoramaverglasung und Glasgeländer öffnen den Blick aus Lobby und Zimmern.'],
        ['Viel Licht', 'Glastrennwände und Türen lassen Tageslicht in die Tiefe der Räume.'],
        ['Wertiger Eindruck', 'Glas lässt das Interieur modern und hochwertig wirken.'],
        ['Praktisch', 'Glas ist zwischen zwei Gästen schnell gereinigt, nimmt keine Feuchtigkeit auf und bleicht nicht aus.'],
        ['Einheitlicher Standard', 'Dasselbe Format und dieselben Beschläge in allen Zimmern.'],
        ['Verträgliche Montage', 'Etappenweise, damit die Belegung nicht gestoppt wird.']
      ]
    },
    austria: { title: 'Hotels in Wien und ganz Österreich: Anfragen willkommen', paragraphs: ['Für ein Hotelprojekt brauchen wir Zimmerzahl, Zonen (Lobby, Zimmer, Terrasse) und Pläne oder Fotos. Daraus entsteht ein Vorschlag mit einheitlichem Standard und eine unverbindliche Kostenschätzung.', 'Anfragen und Projekte in Wien und ganz Österreich sind willkommen — Lieferung und Montage stimmen wir je nach Produkt und Projekt individuell mit Ihnen ab.'] },
    faq: {
      title: 'Glas für Hotels: häufige Fragen',
      intro: 'Standard, Etappen und Lösungen für einzelne Zonen.',
      items: [
        ['Welche Lösungen bieten Sie für Hotels an?', 'Eingangsanlagen und Glastüren, Glastrennwände für Lobby und Konferenzräume, Duschen und Badewannenaufsätze für Zimmer, LED-Spiegel, Balkongeländer sowie rahmenlose Verglasung für Terrasse und Restaurant.'],
        ['Kann ein einheitlicher Standard für alle Zimmer vereinbart werden?', 'Ja, wir stimmen ein Dusch- oder Spiegelformat ab und übertragen es auf alle Zimmer; das erleichtert Wartung und Austausch.'],
        ['Ist eine Montage ohne Stopp der Belegung möglich?', 'Ja, wir arbeiten in Etappen, Etage für Etage, abgestimmt auf die Belegung.'],
        ['Welche Beschläge werden verwendet?', 'Beschläge für intensive Nutzung, abgestimmt auf Stil und Beanspruchung des Hotels.'],
        ['Welches Glas wird für Geländer eingesetzt?', 'VSG — für Geländer von Terrassen, Balkonen und Pools.'],
        ['Für welche Projekte sind Sie tätig?', 'Wir realisieren Glas- und Aluminiumlösungen für Projekte in Wien und Österreich. Lieferung und Montage werden je nach Produkt und Projekt individuell abgestimmt.']
      ]
    },
    form: { title: 'Hotelprojekt anfragen', text: 'Erzählen Sie uns von Ihrem Hotel: Zimmerzahl, Zonen und Pläne oder Fotos — wir schlagen eine Lösung vor und erstellen eine unverbindliche Kostenschätzung.', optionsLabel: 'Bereich', options: ['Lobby und Eingang', 'Zimmer und Bäder', 'Spiegel', 'Trennwände', 'Balkone und Treppen', 'Terrasse und Restaurant', 'Mehrere Bereiche'], commentPlaceholder: 'Zimmerzahl, Zonen, Zeitplan, Ort in Österreich', product: 'Glas für Hotels' },
    related: ['walk-in-dusche', 'led-spiegel', 'pfosten-riegel', 'balkongelaender', 'terrassenverglasung']
  }
};
