// DE hub pages (Fachsprache für Österreich / DACH: ESG, VSG, Isolierglas, Pfosten-Riegel-Fassade,
// Ganzglas-Trennwand, Duschabtrennung …). Fakten wie auf den UA-Seiten derselben Rubrik.
import type { HubCommon, HubCopy } from './types';

export const hubCommonDe: HubCommon = {
  home: 'Startseite',
  request: 'Angebot anfragen',
  typesLinkLabel: 'Ansehen',
  processEyebrow: 'Ablauf',
  processTitle: 'Von der Anfrage bis zur Montage',
  processSteps: [
    ['Anfrage', 'Fotos, Grundriss oder ungefähre Maße'],
    ['Beratung', 'System, Glas und Beschläge'],
    ['Aufmaß', 'Exakte Maße vor Ort'],
    ['Zeichnung', 'Maße und Befestigung zur Freigabe'],
    ['Fertigung', 'Glas nach Maß vorgespannt'],
    ['Montage', 'Einbau, Justierung und Übergabe']
  ],
  areaEyebrow: 'Einsatzgebiet',
  areaTitle: 'Aufmaß und Montage in Kyjiw, Odesa und Lwiw',
  areaParagraphs: [
    'Unsere Teams übernehmen Aufmaß, Fertigung und Montage in Kyjiw, Odesa und Lwiw sowie in den umliegenden Regionen. Projekte in anderen Teilen der Ukraine werden individuell vereinbart.',
    'Ausgewählte Produkte und Konstruktionen können auch in andere europäische Länder geliefert werden — senden Sie uns Pläne oder Fotos und den Standort, und wir sagen Ihnen, was und wie geliefert werden kann.'
  ],
  offices: [['Kyjiw', 'Büro und Montage'], ['Odesa', 'Büro und Montage'], ['Lwiw', 'Büro und Montage']],
  projectsEyebrow: 'Referenzen',
  projectsTitle: 'Umgesetzte Projekte',
  allProjects: 'Alle Projekte',
  relatedEyebrow: 'Weiterlesen',
  relatedTitle: 'Weitere Lösungen'
};

export const hubsDe: Record<string, HubCopy> = {
  services: {
    meta: { title: 'Glas- und Aluminiumkonstruktionen: Leistungen | Space Glass', description: 'Planung, Aufmaß, eigene Fertigung, Lieferung, Montage und Service für Glas- und Aluminiumkonstruktionen nach Maß — für Wohnen und Gewerbe.' },
    name: 'Produkte und Leistungen',
    eyebrow: 'Produkte und Leistungen von Space Glass',
    h1: 'Glas- und Aluminiumkonstruktionen nach Maß — alles aus einer Hand',
    lead: 'Wir planen, fertigen und montieren Glas- und Aluminiumkonstruktionen nach Maß: Glasduschen, Glastrennwände, Geländer, Glastüren, Fassaden, rahmenlose Verglasungen, Spiegel, Wintergärten und Vordächer. Ein Team von der ersten Skizze bis zur fertigen Montage.',
    heroAlt: 'Planung von Glaskonstruktionen bei Space Glass — Zeichnungen, Glasmuster und Montagevorbereitung',
    explore: 'Produkte ansehen',
    intro: {
      title: 'Alles für Ihr Projekt — in einem Team',
      paragraphs: [
        'Space Glass koordiniert den gesamten Weg einer Konstruktion, damit technische Lösung, Fertigung und Montage als ein Prozess funktionieren. Das zählt vor allem dort, wo Glas auf Wände, Böden und andere Gewerke trifft: Toleranzen, Befestigung und Reihenfolge werden geplant, bevor zugeschnitten wird.',
        'Wir nehmen das Aufmaß, wählen System, Glas und Beschläge, erstellen Zeichnungen und Spezifikationen, fertigen auf eigenen Maschinen nach den freigegebenen Maßen, liefern und montieren — und bleiben auch danach für Justierung und Service erreichbar.',
        'Seit 2014 haben wir über 5.000 Projekte für Wohnen und Gewerbe umgesetzt und mehr als 50.000 m² Verglasung eingebaut.'
      ],
      spec: [['5.000+ Projekte', 'für Wohnen und Gewerbe'], ['50.000+ m²', 'eingebaute Verglasung'], ['10+ Jahre', 'Praxiserfahrung'], ['Kyjiw · Odesa · Lwiw', 'Büros und Montageteams']]
    },
    types: {
      eyebrow: 'Produkte',
      title: 'Was wir fertigen',
      intro: 'Wählen Sie einen Bereich — jede Seite erklärt Ausführungen, Glasoptionen und Ablauf.',
      items: [
        ['Glasduschen', 'Walk-in-Duschwände, Eck-, Nischen-, Schiebe- und Faltduschen, Badewannenaufsätze.'],
        ['Glastrennwände', 'Loft-, Ganzglas-, Schiebe- und Falttrennwände für Wohnung und Büro.'],
        ['Glastüren', 'Dreh-, Schiebe-, Pendel- und Rahmentüren aus Glas.'],
        ['Glasgeländer', 'Rahmenlose und Pfostengeländer für Treppen, Balkone, Terrassen und Pools.'],
        ['Spiegel nach Maß', 'LED-, Rahmen- und Wandspiegel, Spiegelwände für Salons und Studios.'],
        ['Glasvordächer', 'Vordächer — freitragend, mit Zugstangen, auf Konsolen oder im Rahmen.'],
        ['Rahmenlose Verglasung', 'Falt-, Schiebe- und Guillotinesysteme für Terrasse und Balkon.'],
        ['Aluminium-Fenster und -Türen', 'Wärmegedämmte Fenster, Türen und Hebe-Schiebe-Systeme.'],
        ['Wintergärten', 'Verglaste Aluminiumanbauten mit Glasdach und Schiebetüren.'],
        ['Glasfassaden', 'Pfosten-Riegel-, Structural-Glazing- und Elementfassaden, Schaufenster, Eingänge.'],
        ['Glaslösungen für Gewerbe', 'Lösungen für Hotels, Gastronomie, Büros, Handel und Praxen.']
      ]
    },
    benefits: {
      eyebrow: 'Komplettleistung',
      title: 'Sechs Schritte, ein verantwortliches Team',
      items: [
        ['Aufmaß und Beratung', 'Genaue Maße, Beurteilung des Objekts und die passende technische Lösung.'],
        ['Planung', 'Zeichnungen, Anschlussdetails sowie Auswahl von Glas, Profilen, Beschlägen und Befestigung.'],
        ['Fertigung', 'Konstruktionen nach dem freigegebenen Projekt auf eigenen Maschinen.'],
        ['Lieferung', 'Fachgerechte Verpackung und sicherer Transport.'],
        ['Montage', 'Einbau, Justierung, Abdichtung und Vorbereitung für den Alltag.'],
        ['Garantie und Service', '5 Jahre auf Glas, 2 Jahre auf Beschläge, 1 Jahr auf die Montage — und Service danach.']
      ]
    },
    faq: {
      title: 'Fragen vor dem Projektstart',
      intro: 'Angebot, Aufmaß, Zeichnungen, Lieferung, Montage, Garantie und Service.',
      items: [
        ['Wie erhalte ich eine erste Kostenschätzung?', 'Senden Sie Fotos, ungefähre Maße und eine kurze Beschreibung über das Formular. Wir beurteilen die Konstruktion und melden uns mit einem Lösungsvorschlag und einer Kostenschätzung.'],
        ['Was soll ich für ein Angebot senden?', 'Fotos des Einbauorts, ungefähre Maße und den Standort. Falls vorhanden, ergänzen Sie Zeichnungen, Planungsunterlagen und Wünsche zu Glas und Beschlägen.'],
        ['Führen Sie ein Aufmaß durch?', 'Ja. Ein professionelles Aufmaß erfasst die tatsächliche Geometrie und die Befestigungsuntergründe — die Grundlage für eine präzise Fertigung.'],
        ['Wo ist ein Aufmaß möglich?', 'Unsere Teams arbeiten in Kyjiw, Odesa und Lwiw sowie in den umliegenden Regionen. Andere Standorte stimmen wir je nach Konstruktion und Logistik ab.'],
        ['Arbeiten Sie mit DWG- oder PDF-Plänen?', 'Ja. Wir prüfen die Pläne von Architekten und Planern, klären die Anschlussdetails und passen die Lösung an die Bedingungen vor Ort an.'],
        ['Erstellen Sie Werkplanungen?', 'Ja. Vor der Fertigung erstellt unser Team Zeichnungen, Befestigungsdetails und eine Materialspezifikation zur Freigabe.'],
        ['Kann ich ohne Montage bestellen?', 'Ja, für einen Teil der Systeme — wenn Sie eigene Monteure haben, liefern wir die Konstruktion mit technischer Dokumentation und Montagehinweisen.'],
        ['Liefern Sie ins Ausland?', 'Ausgewählte Produkte und Konstruktionen können in europäische Länder geliefert werden. Lieferung und Montage im Ausland werden für jedes Projekt individuell vereinbart.'],
        ['Wie lange dauert ein Projekt?', 'Glaskonstruktionen bis zu 20 Arbeitstage, Aluminiumkonstruktionen bis zu 30 Arbeitstage nach Freigabe aller Projektdetails.'],
        ['Welche Garantie geben Sie?', '5 Jahre auf das Glas, 2 Jahre auf die Beschläge und 1 Jahr auf die Montage sowie Service nach der Übergabe: Justierung und Austausch von Teilen.']
      ]
    },
    form: { title: 'Erzählen Sie uns von Ihrem Projekt', text: 'Senden Sie Fotos, einen Grundriss oder Maße — wir wählen die passende Lösung und erstellen eine Kostenschätzung.', optionsLabel: 'Produkt', options: ['Glasdusche', 'Glastrennwand', 'Glastür', 'Glasgeländer', 'Spiegel', 'Glasvordach', 'Rahmenlose Verglasung', 'Aluminium-Fenster und -Türen', 'Wintergarten', 'Glasfassade', 'Gewerbeprojekt'], commentPlaceholder: 'Art der Konstruktion, ungefähre Maße, Standort', product: 'Produkte und Leistungen' }
  },

  showers: {
    meta: { title: 'Glasduschen nach Maß — Duschabtrennungen | Space Glass', description: 'Duschabtrennungen aus Glas nach Maß: Walk-in-Duschwände, Eck-, Nischen-, Schiebe- und Faltduschen, Badewannenaufsätze. ESG 8–10 mm, Beschläge in 6 Farben.' },
    name: 'Glasduschen',
    eyebrow: 'Glasduschen',
    h1: 'Glasduschen und Duschabtrennungen nach Maß',
    lead: 'Walk-in-Duschwände, Eck- und Nischenduschen, Schiebe- und Falttüren, Badewannenaufsätze und Fünfeckduschen — aus Einscheibensicherheitsglas exakt nach den Maßen Ihres Bades, mit Beschlägen in der Oberfläche Ihrer Wahl.',
    heroAlt: 'Rahmenlose Duschabtrennung aus Glas in einem modernen Badezimmer',
    explore: 'Duschtypen ansehen',
    intro: {
      title: 'Eine Dusche, die zu Ihrem Bad passt',
      paragraphs: [
        'Standard-Duschkabinen passen selten in ein reales Bad: Wände sind nicht exakt im Winkel, Nischen haben ihre eigene Breite, und erst die Fliesen bestimmen die endgültige Geometrie. Deshalb fertigen wir jede Duschabtrennung nach Maß — von der einzelnen Walk-in-Wand bis zur kompletten Eck- oder Fünfeckdusche.',
        'Standard ist ESG mit 8 mm; 10 mm Glas verwenden wir, wenn Größe und Konstruktion es erfordern. Sie wählen das Glas — klar, extraklar (eisenarm), satiniert, grau, bronze oder geriffelt — und die Beschlagoberfläche: Chrom, Schwarz, Edelstahl matt, Gold, Messing oder Bronze.',
        'Das Endaufmaß erfolgt nach dem Fliesen und dem Einbau von Duschwanne oder Bodenaufbau. Wir stimmen die Zeichnung mit Ihnen ab und montieren die Dusche mit abgedichteten, justierten Türen.'
      ],
      spec: [['ESG 8–10 mm', 'Einscheibensicherheitsglas'], ['6 Glasarten', 'klar, extraklar, satiniert, getönt, geriffelt'], ['6 Beschlagfarben', 'Chrom, Schwarz, Edelstahl, Gold, Messing, Bronze'], ['Mit oder ohne Duschwanne', 'auch bodengleich auf Fliesen']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Welche Glasduschen wir fertigen',
      intro: 'Wählen Sie die Grundform — Glas, Türart und Beschläge passen wir an Ihr Bad an.',
      items: [
        ['Walk-in-Duschwände', 'Feststehende Glaswände ohne Tür — die puristische Lösung, passend zur Duschfläche.'],
        ['Duschtüren aus Glas', 'Eine Tür für die Nische oder zwischen Wand und Festteil — als Dreh- oder Schiebetür.'],
        ['Eckduschen', 'Zwei Glasseiten bilden die Dusche in der Raumecke, mit dem Einstieg dort, wo Sie ihn brauchen.'],
        ['Schiebeduschen', 'Die Elemente gleiten auf einer Schiene und brauchen keinen Platz vor der Dusche.'],
        ['Nischenduschen', 'Eine Glastür oder Tür mit Festteil für eine Öffnung zwischen drei Wänden.'],
        ['Falttüren für die Dusche', 'Faltbare Glastüren für kompakte Duschen, Nischen und Wannen, wo eine Drehtür zu viel Platz braucht.'],
        ['Badewannenaufsätze', 'Feststehende, drehbare oder faltbare Glaswände auf der Wanne statt eines Duschvorhangs.'],
        ['Fünfeckduschen', 'Duschen mit abgeschrägter Front für die Ecke — platzsparend im Bad.']
      ]
    },
    options: {
      eyebrow: 'Glas und Beschläge',
      title: 'Glas, Beschläge und Duschboden',
      intro: 'Details, die über Optik und Alltagstauglichkeit entscheiden.',
      items: [
        ['Klar- und Extraklarglas', 'Klarglas hält das Bad hell; eisenarmes Extraklarglas hat keine grüne Kante und gibt Farben natürlicher wieder.'],
        ['Satiniert, getönt, geriffelt', 'Satinato bietet Sichtschutz und lässt Wasserflecken weniger sehen; Grau und Bronze geben Tiefe; Riffelglas bringt Struktur bei vollem Licht.'],
        ['Scharniere, Stabilisierungsstangen, Dichtungen', 'Scharniere bestimmen den Öffnungswinkel, Stangen stabilisieren breite Elemente, Dichtungen und Magnetleisten reduzieren Spritzwasser.'],
        ['Mit Duschwanne oder bodengleich', 'Eine Duschwanne vereinfacht Ablauf und Abdichtung; bodengleich braucht ein Gefälle, Abdichtung und Ablauf — beides berücksichtigen wir vor dem Endaufmaß.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Duschabtrennung aus Glas',
      items: [
        ['Exakte Passform', 'Nach den realen Maßen von Duschfläche, Nische oder Ecke — ohne Standardgrößen.'],
        ['Sicherheitsglas', 'ESG zerfällt bei Beschädigung in stumpfe Krümel.'],
        ['Licht und Weite', 'Glas hält das Bad offen und lässt es größer wirken als Vorhang oder Rahmenkabine.'],
        ['Pflegeleicht', 'Glatte Flächen und wenige Beschläge — Abziehen nach dem Duschen reduziert Kalk.'],
        ['Ihr Stil', 'Sechs Glasarten und sechs Beschlagfarben passend zu Fliesen, Armaturen und Möbeln.'],
        ['Garantie', '5 Jahre auf Glas, 2 Jahre auf Beschläge und 1 Jahr auf die Montage.']
      ]
    },
    faq: {
      title: 'Glasduschen: häufige Fragen',
      intro: 'Maße, Glas, Beschläge, Duschwanne, Dichtheit und Pflege.',
      items: [
        ['Kann ich eine Glasdusche nach Maß bestellen?', 'Ja. Wir fertigen Duschabtrennungen nach den tatsächlichen Maßen Ihres Bades. Vor der Fertigung nehmen wir Maß und stimmen Konstruktion und Zeichnung mit Ihnen ab.'],
        ['Welches Glas wird verwendet?', 'Einscheibensicherheitsglas (ESG). Art und Stärke richten sich nach Größe und Konstruktion der Dusche.'],
        ['Welche Glasstärke braucht eine Dusche?', 'Unser Standard ist ESG 8 mm. 10 mm Glas oder andere Lösungen setzen wir ein, wenn Größe und Konstruktion es erfordern.'],
        ['Wann wird das Aufmaß gemacht?', 'Das Endaufmaß empfehlen wir, wenn die Arbeiten abgeschlossen sind, die die Geometrie bestimmen: Wandfliesen, Bodenaufbau oder eingebaute Duschwanne.'],
        ['Geht eine Glasdusche ohne Duschwanne?', 'Ja, auf einem vorbereiteten Boden mit fachgerecht geplantem Ablauf. Die Geometrie des Bodens berücksichtigen wir beim Aufmaß.'],
        ['Geht das auch bei schiefen Wänden?', 'Ja. Wir messen die Abweichungen von Wänden und Ecken und berücksichtigen sie in der Zeichnung und im Glaszuschnitt.'],
        ['Welche Beschlagoberflächen gibt es?', 'Je nach System: Chrom, Schwarz, Edelstahl matt, Gold, Messing und Bronze. Die Oberfläche wird vor der Fertigung festgelegt.'],
        ['Wie dicht ist eine rahmenlose Dusche?', 'Das hängt von Konstruktion, Fugen, Dichtungen, Strahlrichtung und Vorbereitung der Duschzone ab. Eine rahmenlose Abtrennung ist keine vollständig geschlossene Kabine — Dichtungen und Ablauf planen wir entsprechend.'],
        ['Wovon hängt der Preis ab?', 'Von Breite und Höhe, Anzahl der Glaselemente, Öffnungsart, Glas, Beschlägen, Fertigungsaufwand, Lieferung und Montage.'],
        ['Wie pflege ich das Glas?', 'Nach dem Duschen das Wasser abziehen und regelmäßig mit glasgeeigneten Mitteln reinigen — das reduziert Kalkablagerungen.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie Fotos Ihres Bades und ungefähre Maße — wir schlagen eine Lösung vor und erstellen eine Kostenschätzung.', optionsLabel: 'Duschtyp', options: ['Walk-in-Duschwand', 'Duschtür aus Glas', 'Eckdusche', 'Schiebedusche', 'Nischendusche', 'Falttür', 'Badewannenaufsatz', 'Fünfeckdusche'], commentPlaceholder: 'Breite, Höhe und Tiefe der Duschzone, Duschwanne oder bodengleich, Ort', product: 'Glasduschen' }
  },

  partitions: {
    meta: { title: 'Glastrennwände nach Maß — Loft, Ganzglas | Space Glass', description: 'Glastrennwände für Wohnung und Büro: Loft-, Ganzglas-, Schiebe-, Teleskop- und Falttrennwände, mit oder ohne Tür. ESG oder VSG 8–12 mm.' },
    name: 'Glastrennwände',
    eyebrow: 'Glastrennwände',
    h1: 'Glastrennwände nach Maß',
    lead: 'Glastrennwände für Wohnungen, Häuser, Büros, Praxen und Salons: Loft-Trennwände, Ganzglaswände, Schiebe-, Teleskop- und Faltsysteme sowie Trennwände mit Tür. Räume gliedern ohne Lichtverlust — geplant, gefertigt und montiert von einem Team.',
    heroAlt: 'Glastrennwand zwischen Schlafzimmer und begehbarem Kleiderschrank',
    explore: 'Ausführungen ansehen',
    intro: {
      title: 'Raumgliederung ohne massive Wände',
      paragraphs: [
        'Eine Glastrennwand teilt den Raum in Zonen und erhält dabei Licht und Weite. Sie ist schlanker als eine Wand, wird meist an einem Tag montiert und kommt ohne Nassarbeiten aus — deshalb eignet sie sich für Wohnungen ebenso wie für Büros.',
        'Wir fertigen feststehende Trennwände im schlanken Profil oder mit Punkthaltern, schwarze Loft-Trennwände mit Sprossen, Trennwände mit Dreh-, Schiebe- oder Pendeltüren sowie hängende, bodengeführte, Teleskop- und Faltsysteme.',
        'Verwendet wird ESG oder VSG mit 8–12 mm, klar, satiniert, geriffelt oder getönt; die Profile sind in jeder Farbe möglich.'
      ],
      spec: [['9 Ausführungen', 'von Loft bis Faltsystem'], ['ESG / VSG 8–12 mm', 'Sicherheitsglas'], ['Montage an 1 Tag', 'typische Wohnung, ohne Nassarbeiten'], ['Bis 20 Arbeitstage', 'Fertigung nach Freigabe']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Welche Glastrennwände wir fertigen',
      intro: 'Feststehend, verschiebbar oder faltbar, mit oder ohne Tür — passend zu Raum und Nutzung.',
      items: [
        ['Loft-Trennwände', 'Glas in schlanken schwarzen Aluminiumprofilen mit Sprossen — der klassische Industrie-Look.'],
        ['Ganzglas-Trennwände', 'Raumhohes Glas mit minimalen Klemmen oder verdecktem Profil — so wenig Rahmen wie möglich.'],
        ['Hängende Schiebetrennwände', 'Die Elemente hängen an einer Deckenschiene — keine Bodenschiene, keine Schwelle.'],
        ['Bodengeführte Schiebetrennwände', 'Das Gewicht liegt auf einer Bodenschiene — so sind größere und schwerere Elemente möglich.'],
        ['Teleskop-Trennwände', 'Mehrere Schiebeelemente auf parallelen Schienen, die sich hintereinander schieben.'],
        ['Falttrennwände', 'Die Elemente falten oder drehen sich weg und öffnen die gesamte Öffnung.'],
        ['Trennwände mit Tür', 'Dreh-, Schiebe- oder Pendeltüren aus Glas in einer Flucht mit der Trennwand.'],
        ['Büro-Trennwände', 'Besprechungsräume, Einzelbüros und Open-Space-Zonen mit Türen und schalldämmendem Glas.'],
        ['Trennwände für die Wohnung', 'Schlafzimmer und Ankleide, Küche und Wohnbereich, Arbeitsecke — Licht in jeder Zone.']
      ]
    },
    options: {
      eyebrow: 'Funktionsweise',
      title: 'Feststehend, verschiebbar oder faltbar',
      intro: 'Die Bauart bestimmt Durchgang, Platzbedarf und Optik.',
      items: [
        ['Feststehend', 'Feste Elemente im Profil oder mit Klemmen — Loft- und Ganzglas-Trennwände.'],
        ['Mit Tür', 'Dreh-, Schiebe- oder Pendeltüren in einer Flucht mit der Trennwand.'],
        ['Verschiebbar', 'An einer Deckenschiene hängend oder bodengeführt, auch als Teleskopsystem.'],
        ['Faltbar', 'Falt- oder Drehelemente, die die ganze Öffnung freigeben.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Glastrennwand',
      items: [
        ['Tageslicht', 'Glas trennt den Raum, ohne Tageslicht zu nehmen.'],
        ['Schnell und sauber', 'Meist an einem Tag montiert, ohne Nassarbeiten und Staub.'],
        ['Sicherheit', 'ESG und VSG — keine scharfkantigen Splitter.'],
        ['Mehr Ruhe', 'Dichtungen und VSG senken den Schall spürbar.'],
        ['Passend zum Interieur', 'Klar-, Satinato- oder Riffelglas; Profile in jeder Farbe.'],
        ['Garantie', '5 Jahre auf Glas, 2 Jahre auf Beschläge und 1 Jahr auf die Montage.']
      ]
    },
    faq: {
      title: 'Glastrennwände: häufige Fragen',
      intro: 'Ausführungen, Glas, Türen, Schallschutz und Montage.',
      items: [
        ['Welche Glastrennwände gibt es?', 'Feststehende (Loft und Ganzglas), mit Tür, verschiebbare — hängend, bodengeführt und teleskopisch — sowie Falttrennwände.'],
        ['Welches Glas wird verwendet?', 'ESG mit 8–12 mm oder VSG — beide sicher und belastbar.'],
        ['Welche Trennwand passt in die Wohnung?', 'Für Industrie-Look eine Loft-Trennwand im schwarzen Profil, für Purismus Ganzglas, wenn kein Platz für eine Drehtür ist, ein Schiebesystem.'],
        ['Welche Trennwand passt ins Büro?', 'Einzelbüros — Trennwände mit Tür; Besprechungsräume im Großraum — geschlossene Glasboxen; viel Durchgangsverkehr — Pendeltüren.'],
        ['Dämmt eine Glastrennwand Schall?', 'Teilweise; mit VSG und Dichtungen ist der Unterschied deutlich.'],
        ['Ist Satinato- oder getöntes Glas möglich?', 'Ja — satiniertes, getöntes und geriffeltes Glas sowie satinierte Streifen oder ein Logo.'],
        ['Hängend oder bodengeführt — was ist der Unterschied?', 'Eine hängende Trennwand trägt ihr Gewicht über die Decke und hat keine Schwelle; eine bodengeführte trägt es über den Boden, daher sind größere Elemente möglich.'],
        ['Kann man in einen fertigen Innenausbau einbauen?', 'Ja, die Montage ist sauber und ohne Nassarbeiten.'],
        ['Wie lange dauern Fertigung und Montage?', 'Fertigung bis zu 20 Arbeitstage nach Freigabe aller Details; Montage meist ein Tag in der Wohnung und 1–3 Tage im Büro.'],
        ['Erstellen Sie Zeichnungen?', 'Ja, Maße, Sprossenteilung und Türen stimmen wir vor der Fertigung mit Ihnen ab.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie Grundriss oder Fotos des Raums mit Maßen — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'Ausführung', options: ['Loft-Trennwand', 'Ganzglas-Trennwand', 'Hängende Schiebetrennwand', 'Bodengeführte Schiebetrennwand', 'Teleskop-Trennwand', 'Falttrennwand', 'Trennwand mit Tür', 'Büro-Trennwand'], commentPlaceholder: 'Raum (Wohnung, Büro), Maße, Türen, Glas, Ort', product: 'Glastrennwände' }
  },

  doors: {
    meta: { title: 'Glastüren nach Maß — Schiebe- und Drehtüren | Space Glass', description: 'Innentüren aus Glas passend zur Öffnung: Dreh-, Schiebe-, Pendel-, Rahmen- und Satinato-Glastüren für Wohnung und Büro. ESG oder VSG 8–10 mm.' },
    name: 'Glastüren',
    eyebrow: 'Glastüren',
    h1: 'Glastüren nach Maß',
    lead: 'Dreh-, Schiebe-, Pendel- und Rahmentüren aus Glas nach dem Maß Ihrer Öffnung — für Wohnungen, Häuser, Büros und Praxen. ESG oder VSG, zuverlässige Beschläge, Satinierung und Dekor nach Ihrem Entwurf.',
    heroAlt: 'Glasschiebetüren im Aluminiumrahmen zwischen Wohn- und Schlafzimmer',
    explore: 'Türarten ansehen',
    intro: {
      title: 'Türen, die Licht durchlassen',
      paragraphs: [
        'Glastüren machen Räume heller: Tageslicht gelangt in Flure und fensterlose Räume, und der Grundriss wird nicht durch massive Türblätter zerteilt. Glas quillt nicht, verzieht sich nicht und bleicht nicht aus — ideal auch für Bad und Küche.',
        'Wir fertigen Türen nach der tatsächlichen Öffnung: rahmenlose Drehtüren und Loft-Türen in schlanken Profilen, Schiebetüren mit Laufwerk oder im Rahmen und Pendeltüren für stark frequentierte Eingänge. Glas, Dekor und Beschläge wählen wir projektbezogen.',
        'Verwendet wird ausschließlich ESG (8–10 mm) oder VSG; Bohrungen für Beschläge entstehen vor dem Vorspannen.'
      ],
      spec: [['ESG / VSG 8–12 mm', 'Sicherheitsglas'], ['Nach Maß der Öffnung', 'ohne Futter und Verkleidungen'], ['Dekor und Logo', 'Satinierung nach Vorlage'], ['Kyjiw · Odesa · Lwiw', 'Aufmaß, Montage und Service']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Welche Glastüren wir fertigen',
      intro: 'Wählen Sie die Öffnungsart — Glas, Beschlag und Schloss passen wir an die Nutzung an.',
      items: [
        ['Drehtüren aus Glas', 'Rahmenlose Türen mit Bändern an der Wand oder am Glasfestteil — die klarste Optik.'],
        ['Glasschiebetüren', 'Das Türblatt läuft an der Wand entlang und braucht keinen Platz vor der Öffnung.'],
        ['Pendeltüren', 'In beide Richtungen öffnende Türen mit Bodentürschließer für stark frequentierte Eingänge.'],
        ['Rahmentüren aus Aluminium', 'Glas im schlanken Aluminiumprofil mit Sprossen — steif und mit vollwertigem Schloss.'],
        ['Satinierte Glastüren', 'Vollflächig oder teilweise satiniert, Streifen oder Muster als Sichtschutz.'],
        ['Glastüren fürs Büro', 'Türen für Einzelbüros und Besprechungsräume, oft als Teil einer Glastrennwand.']
      ]
    },
    options: {
      eyebrow: 'Glas',
      title: 'Glas und Dekor für Türen',
      intro: 'In Türen kommt nur Sicherheitsglas zum Einsatz. Transparenz und Motiv bestimmen Sie.',
      items: [
        ['ESG', 'Das Grundmaterial: 8–10 mm, um ein Vielfaches fester als normales Glas, zerfällt in stumpfe Krümel.'],
        ['VSG', 'Zwei Scheiben mit Folie: Splitter bleiben haften, der Schallschutz ist besser — für Kinderzimmer, Praxen und Besprechungsräume.'],
        ['Satiniert und getönt', 'Satinierung ganz oder teilweise, Einfärbung in Bronze oder Grau.'],
        ['Dekor', 'Sandgestrahlte Motive, Streifen, Raumnummern oder ein Logo nach Vektorvorlage.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Glastüren',
      items: [
        ['Licht in allen Räumen', 'Glas lässt Tageslicht in Flure und fensterlose Räume.'],
        ['Nach Maß der Öffnung', 'Zuschnitt nach dem tatsächlichen Maß — ohne Futter und Zierleisten.'],
        ['Sicherheit', 'Nur ESG oder VSG: Bruchstücke sind stumpf oder bleiben an der Folie haften.'],
        ['Feuchtigkeitsbeständig', 'Glas quillt nicht, verzieht sich nicht und bleicht nicht aus.'],
        ['Sichtschutz nach Wunsch', 'Klar, satiniert oder getönt, mit Motiv oder Logo.'],
        ['Langlebig', 'Beschläge aus Edelstahl und eloxiertem Aluminium halten jahrelang.']
      ]
    },
    faq: {
      title: 'Glastüren: häufige Fragen',
      intro: 'Ausführungen, Glas, Gewicht, Schlösser, Schallschutz und Montage.',
      items: [
        ['Welche Glastüren gibt es?', 'Dreh-, Schiebe- und Pendeltüren, rahmenlos oder im Aluminiumprofil (Loft). Das Glas kann klar, satiniert, getönt oder dekoriert sein.'],
        ['Welches Glas wird für Türen verwendet?', 'ESG mit 8–10 mm oder VSG. Bohrungen für Beschläge werden vor dem Vorspannen gesetzt.'],
        ['Wie schwer sind Glastüren?', 'Etwa 20 kg/m² bei 8 mm und 25 kg/m² bei 10 mm. Ein Türblatt 800 × 2200 mm aus 10-mm-Glas wiegt rund 44 kg.'],
        ['Sind Glastüren mit Kindern sicher?', 'Ja. ESG zerfällt in stumpfe Krümel, VSG hält die Splitter auf der Folie. Ein satinierter Streifen auf Augenhöhe ist möglich.'],
        ['Braucht man eine Zarge?', 'Nein — rahmenlose Türen werden mit Bändern direkt an Wand oder Glasfestteil befestigt. Rahmentüren können eine Zarge haben.'],
        ['Welche Tür passt in einen schmalen Flur?', 'Eine Schiebetür — sie läuft an der Wand entlang und braucht keinen Platz vor der Öffnung.'],
        ['Kann eine Glastür ein Schloss haben?', 'Ja: Schlösser mit Schlüssel, WC-Riegel mit Frei/Besetzt-Anzeige, Magnet- und elektromechanische Schlösser.'],
        ['Dämmen Glastüren Schall?', 'Weniger als eine massive Wand. Besser wird es mit VSG und umlaufenden Dichtungen.'],
        ['Geht eine Glastür als Haustür?', 'Einfachglas dämmt nicht; für Außeneingänge empfehlen wir wärmegedämmte Aluminiumtüren.'],
        ['Lässt sich die Tür mit einer Glastrennwand kombinieren?', 'Ja, die Tür wird im gleichen Stil in eine Glas- oder Loft-Trennwand integriert.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie ein Foto und die Maße der Öffnung — wir schlagen Türart, Glas und Beschläge vor.', optionsLabel: 'Türart', options: ['Drehtür aus Glas', 'Glasschiebetür', 'Pendeltür', 'Rahmentür aus Aluminium', 'Satinierte Glastür', 'Glastür fürs Büro'], commentPlaceholder: 'Maße der Öffnung, Raum, Glaswunsch, Schloss, Ort', product: 'Glastüren' }
  },

  railings: {
    meta: { title: 'Glasgeländer für Treppe, Balkon und Terrasse | Space Glass', description: 'Glasgeländer für Treppen, Balkone, Terrassen und Pools: rahmenlos im Bodenprofil, mit Punkthaltern oder mit Pfosten. Immer mit Verbundsicherheitsglas.' },
    name: 'Glasgeländer',
    eyebrow: 'Glasgeländer',
    h1: 'Glasgeländer nach Maß',
    lead: 'Geländer für Treppen, Balkone, Terrassen und Pools auf Systemen aus deutscher Entwicklung: rahmenlos im Klemmprofil, mit Punkthaltern, als Pfostengeländer mit Handlauf und als französischer Balkon. Ausschließlich mit Verbundsicherheitsglas.',
    heroAlt: 'Freitragende Treppe mit rahmenlosem Glasgeländer in einem modernen Haus',
    explore: 'Geländerarten ansehen',
    intro: {
      title: 'Absturzsicherung, die den Blick frei lässt',
      paragraphs: [
        'Ein Glasgeländer sichert gegen Absturz, Wind und Höhenunterschiede, lässt aber Aussicht und Licht frei. Deshalb wird es an Treppen und Galerien, auf Balkonen, Terrassen und rund um Pools eingesetzt.',
        'Wir arbeiten mit Geländersystemen aus deutscher Entwicklung: Klemmprofile auf oder vor der Deckenstirn, Punkthalter, Edelstahlpfosten und französische Balkone. Profile und Halter sind je nach System für Horizontallasten bis 3 kN/m geprüft.',
        'Jedes Geländer erhält VSG aus zwei vorgespannten Scheiben: Bricht eine Scheibe, bleibt das Geländer an seinem Platz.'
      ],
      spec: [['11 Systeme', 'Profile, Pfosten, Punkthalter, französische Balkone'], ['VSG', '8,76–21,52 mm'], ['Bis 3 kN/m', 'Horizontallast'], ['Bis 20 Arbeitstage', 'Fertigung nach Freigabe']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Wo wir Glasgeländer einbauen',
      intro: 'Wählen Sie den Einsatzort — wir wählen System, Glas und Handlauf.',
      items: [
        ['Treppengeländer', 'Glas entlang von Läufen und Podesten — rahmenlos, mit Punkthaltern oder mit Pfosten und Handlauf.'],
        ['Balkongeländer', 'Eine klare Fassadenlinie mit Glas auf oder vor der Deckenplatte.'],
        ['Terrassengeländer', 'Windschutz, ohne den Blick auf Garten oder Landschaft zu verstellen.'],
        ['Poolumrandungen', 'Glas ab 1,2 m Höhe mit Edelstahlbeschlägen AISI 316 und optionaler selbstschließender Tür.'],
        ['Rahmenlose Geländer', 'Glas im durchgehenden Klemmprofil — ganz ohne Pfosten.'],
        ['Pfostengeländer', 'Glas mit Klemmhaltern zwischen Edelstahlpfosten mit Handlauf — eine wirtschaftliche Lösung.']
      ]
    },
    options: {
      eyebrow: 'Glas',
      title: 'Glas für Geländer',
      intro: 'In Geländern kommt ausschließlich Verbundsicherheitsglas zum Einsatz.',
      items: [
        ['VSG 17,52 und 21,52 mm', 'Zwei vorgespannte Scheiben à 8 oder 10 mm mit reißfester Folie — für rahmenlose Klemmprofile und Punkthalter.'],
        ['VSG 8,76 und 12,76 mm', 'Zwei Scheiben à 4 oder 6 mm — für Pfostengeländer, bei denen Klemmen das Glas beidseitig halten.'],
        ['Glasfarbe', 'Klar, extraklar (ohne Grünstich), grau und dunkelgrau.'],
        ['Satinierung und Beschichtung', 'Ganz oder teilweise satiniert als Sichtschutz sowie eine schmutz- und wasserabweisende Beschichtung.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein Glasgeländer',
      items: [
        ['Freie Sicht', 'Glas verdeckt weder Landschaft noch Garten oder Interieur.'],
        ['Sicherheit', 'Nur VSG: Bricht eine Scheibe, bleibt das Geländer stehen.'],
        ['Systeme aus deutscher Entwicklung', 'Profile, Pfosten und Halter geprüft für Lasten bis 3 kN/m.'],
        ['Wartungsarm', 'Kein Streichen; Aluminium und Edelstahl rosten nicht.'],
        ['Windschutz', 'Auf Terrasse und Balkon bricht das Glas Zugluft und Lärm.'],
        ['Nach Maß', 'Jede Länge und Form — gerade, L oder U, Ecken und Höhenversätze.']
      ]
    },
    faq: {
      title: 'Glasgeländer: häufige Fragen',
      intro: 'Systeme, Glas, Höhe, Lasten und Montage.',
      items: [
        ['Welche Glasgeländer gibt es?', 'Rahmenlose Geländer im Klemmprofil (Glas unten gehalten), punktgehaltenes Glas (Halter an der Deckenstirn), Pfostengeländer mit Handlauf und französische Balkone.'],
        ['Welches Glas wird verwendet?', 'Ausschließlich VSG: 17,52 oder 21,52 mm bei rahmenlosen Systemen und 8,76 oder 12,76 mm bei Pfostengeländern.'],
        ['Wie hoch muss ein Geländer sein?', 'Typisch ab 0,9 m an Treppen und 1,0–1,1 m auf Balkonen und Terrassen. Rahmenlose Profile halten Glas bis 1,3 m Höhe. Die erforderliche Höhe prüfen wir nach den für Ihr Objekt geltenden Bauvorschriften.'],
        ['Ist ein Geländer ohne Pfosten sicher?', 'Ja. Das Profil klemmt das Glas auf ganzer Länge und ist je nach System für Horizontallasten von 1–3 kN/m ausgelegt.'],
        ['Was ist ein französischer Balkon?', 'Eine Absturzsicherung aus Glas in der Öffnung eines bodentiefen Fensters: Das Fenster lässt sich öffnen, das Glas verhindert den Absturz. Befestigt wird am Fensterrahmen oder in der Laibung.'],
        ['Eignet sich Glas für den Pool?', 'Ja. Wir empfehlen mindestens 1,2 m Höhe und Edelstahl AISI 316; eine Glastür mit Schließer ist möglich.'],
        ['Kann das Profil die Fassadenfarbe haben?', 'Ja: Edelstahloptik, Schwarz, Anthrazit, Weiß oder jede RAL-Farbe.'],
        ['Braucht es einen Handlauf?', 'Bei rahmenlosen Geländern optional, er schützt aber die Glaskante und bietet Halt. Beim Pfostengeländer ist der Handlauf Teil des Systems.'],
        ['Halten Frost und Sonne dem Glas stand?', 'Ja. Vorgespanntes VSG ist temperaturwechselbeständig, die Folie schützt vor UV.'],
        ['Wie lange dauert die Fertigung?', 'Bis zu 20 Arbeitstage nach Freigabe aller Projektdetails: Glas und Profile werden nach Ihren Maßen gefertigt.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie Fotos, die Länge und den Untergrund — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'Einsatzort', options: ['Treppengeländer', 'Balkongeländer', 'Terrassengeländer', 'Poolumrandung', 'Rahmenloses Geländer', 'Pfostengeländer', 'Französischer Balkon'], commentPlaceholder: 'Länge, Höhe, Untergrund (Beton, Stahl, Holz), Handlauf, Ort', product: 'Glasgeländer' }
  },

  mirrors: {
    meta: { title: 'Spiegel nach Maß — LED-Spiegel, Rahmenspiegel | Space Glass', description: 'Spiegel in Ihren Maßen: LED-Spiegel, Rahmen- und Wandspiegel, Spiegelpaneele und Spiegelwände für Bad, Kosmetiksalon, Fitnessstudio und Hotel.' },
    name: 'Spiegel nach Maß',
    eyebrow: 'Spiegel nach Maß',
    h1: 'Spiegel nach Maß',
    lead: 'Spiegel in Ihren Maßen: mit LED-Beleuchtung, im Rahmen, als Wandspiegel, Spiegelpaneel oder Spiegelwand für Studios und Salons. Wir wählen Spiegelglas, Kantenbearbeitung, Rahmen und Licht — und übernehmen Aufmaß, Fertigung und Montage.',
    heroAlt: 'Halbrunder Standspiegel Space Glass MOON mit Beleuchtung im Schlafzimmer',
    explore: 'Spiegelarten ansehen',
    intro: {
      title: 'Spiegel in den Maßen Ihres Interieurs',
      paragraphs: [
        'Ein Fertigspiegel passt selten genau zu Wand, Waschtisch oder Nische: Breite, Montagehöhe und die Lage von Leuchten und Steckdosen ändern sich. Deshalb fertigen wir Spiegel nach Maß.',
        'Der Ablauf ist durchgängig: Aufmaß oder Prüfung der Maße, Abstimmung von Form, Kante, Rahmen und Lichtkonzept, Fertigung und Montage. Form, Ausschnitte und Bohrungen werden vor der Fertigung festgelegt.',
        'Unsere LED-Modelle verwenden das korrosionsbeständige Spiegelglas Saint-Gobain MIRALITE PURE und erreichen Schutzart IP44 für das Bad.'
      ],
      spec: [['Maß und Form nach Wunsch', 'für Wand, Waschtisch oder Nische'], ['Kante nach Wahl', 'poliert oder facettiert'], ['LED-Licht und Spiegelheizung', 'nach abgestimmtem Elektroplan'], ['IP44', 'LED-Modelle fürs Bad']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Spiegelarten',
      intro: 'Wählen Sie die Art — Maß, Form, Kante, Rahmen, Licht und Montage stimmen wir danach ab.',
      items: [
        ['LED-Spiegel', 'Front- oder Konturlicht, optionale Spiegelheizung, Schalterposition vorab festgelegt.'],
        ['Rahmenspiegel', 'Rahmen aus Metall, Aluminium oder dekorativen Profilen, die die Kante schützen.'],
        ['Wandspiegel', 'Große Spiegel für Flur, Wohn- und Schlafzimmer, sicher an der Wand befestigt.'],
        ['Spiegelpaneele', 'Spiegelwände aus mehreren Modulen mit geplanter Fugenteilung.'],
        ['Spiegel für Fitnessstudios', 'Spiegel 4–6 mm mit Splitterschutzfolie und durchgehender Fläche für Studios.'],
        ['Spiegel für Salons', 'Spiegel für Arbeitsplätze mit gleichmäßigem Frontlicht für Kosmetik- und Friseursalons.']
      ]
    },
    options: {
      eyebrow: 'Details',
      title: 'Kante, Licht und Befestigung',
      intro: 'Was wir vor der Fertigung abstimmen.',
      items: [
        ['Polierte Kante oder Facette', 'Eine offene Kante wird poliert; eine Facette bricht das Licht dekorativ, verkleinert aber die Spiegelfläche etwas.'],
        ['LED-Beleuchtung', 'Kontur- oder Frontlicht, Lichtfarbe, Schalter und Anschlusspunkt werden mit dem Elektroplan abgestimmt.'],
        ['Spiegelheizung', 'Sie hält die Mitte nach dem Duschen beschlagfrei, ersetzt aber keine Lüftung.'],
        ['Ausschnitte und Befestigung', 'Öffnungen für Steckdosen oder Leuchten werden vorab festgelegt; die Befestigung richtet sich nach Größe, Gewicht, Feuchte und Wandaufbau.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein Spiegel nach Maß',
      items: [
        ['Exakte Passform', 'Der Spiegel passt zu Wand, Waschtisch oder Nische — nicht umgekehrt.'],
        ['Jede Form', 'Rechteckig, quadratisch, rund oder als Sonderform nach Schablone.'],
        ['Badtauglich', 'Korrosionsbeständiges Spiegelglas und IP44-Beleuchtung bei unseren Modellen.'],
        ['Sicherheit, wo nötig', 'Splitterschutzfolie für Studios und öffentliche Räume.'],
        ['Gewerbeprojekte', 'Modulteilung und Befestigung für Hotels, Gastronomie und Salons geplant.'],
        ['Alles aus einer Hand', 'Aufmaß, Fertigung, Lieferung und Montage durch ein Team.']
      ]
    },
    faq: {
      title: 'Spiegel nach Maß: häufige Fragen',
      intro: 'Maße, Formen, Kanten, Licht, Montage und Gewerbe.',
      items: [
        ['Wovon hängt der Preis eines Spiegels ab?', 'Von Größe und Form, Spiegelglas, Kantenbearbeitung (poliert oder facettiert), Beleuchtung und Heizung, Ausschnitten, Rahmen, Lieferung und Montage.'],
        ['Fertigen Sie Spiegel nach individuellem Maß?', 'Ja. Die meisten Spiegel fertigen wir nach abgestimmten Maßen für eine konkrete Wand, einen Waschtisch oder eine Nische.'],
        ['Welche Formen sind möglich?', 'Rechteckig, quadratisch, rund und Sonderformen nach Schablone. Komplexe Konturen brauchen eine genaue Schablone und geplante Befestigung.'],
        ['Was ist bei einem LED-Spiegel zu beachten?', 'Elektro- und Lichtplanung werden vor der Fertigung abgestimmt: Kontur- oder Frontlicht, Anschlusspunkt, Schalter und dessen Position.'],
        ['Welcher Spiegel eignet sich fürs Bad?', 'Ein feuchtebeständiger: Wir berücksichtigen Wandaufbau und -zustand, Lüftung sowie die Lage von Elektrik und Sanitär.'],
        ['Wie wird ein großer, schwerer Spiegel befestigt?', 'Abhängig von Größe, Gewicht, Feuchte und Wandaufbau; bei Klebemontage verwenden wir spezielle Spiegelkleber.'],
        ['Was ist eine Spiegelwand?', 'Eine durchgehende Spiegelfläche aus mehreren Modulen. Fugenteilung, Modulmaße und die Ebenheit der Wand werden vorab geplant.'],
        ['Fertigen Sie Spiegel für Studios und Salons?', 'Ja — Studio-Spiegel aus 4–6-mm-Glas mit Splitterschutzfolie und Salonspiegel mit gleichmäßigem Frontlicht und guter Farbwiedergabe.'],
        ['Wann ist ein Aufmaß nötig?', 'Das Endaufmaß erfolgt, wenn die fertigen Oberflächen vorhanden und die Lage von Elektrik und Möbeln bekannt sind.'],
        ['Kann ich ohne Montage bestellen?', 'Ja, in einem Teil der Fälle ist Fertigung mit Lieferung ohne Montage möglich, sofern der Transport sicher ist.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie ein Foto der Wand und ungefähre Maße — wir schlagen Form, Kante und Beleuchtung vor.', optionsLabel: 'Spiegelart', options: ['LED-Spiegel', 'Rahmenspiegel', 'Wandspiegel', 'Spiegelpaneel / Spiegelwand', 'Studio-Spiegel', 'Salonspiegel'], commentPlaceholder: 'Maße, Form, Beleuchtung, Raum (Bad, Flur, Salon), Ort', product: 'Spiegel nach Maß' }
  },

  canopies: {
    meta: { title: 'Glasvordächer für den Eingang nach Maß | Space Glass', description: 'Glasvordächer für Haus-, Büro- und Ladeneingänge: freitragend, mit Zugstangen, auf Konsolen oder im Rahmen. Verbundsicherheitsglas, Tiefe bis 2 m.' },
    name: 'Glasvordächer',
    eyebrow: 'Glasvordächer',
    h1: 'Glasvordächer für den Eingang',
    lead: 'Vordächer aus Glas für Einfamilienhäuser, Büros, Läden und Mehrparteienhäuser: freitragend, mit Zugstangen, auf Konsolen, im Rahmen und mit seitlichem Windschutz. Systeme aus deutscher Entwicklung, VSG, Kostenschätzung anhand Ihrer Fotos.',
    heroAlt: 'Glasvordach auf Konsolen über dem Hauseingang',
    explore: 'Vordacharten ansehen',
    intro: {
      title: 'Schutz, der die Fassade sichtbar lässt',
      paragraphs: [
        'Ein Glasvordach hält Regen und Schnee vom Eingang fern, verdunkelt aber weder die Tür noch belastet es die Fassade optisch. Deshalb kommt es über Eingängen von Häusern, Büros, Läden, Restaurants und Wohnanlagen zum Einsatz.',
        'Wir arbeiten mit Vordachsystemen aus deutscher Entwicklung: freitragende Vordächer im Klemmprofil, Vordächer mit Edelstahl-Zugstangen und Konsolen sowie Aluminium- oder Stahlrahmen mit Rinne und Beleuchtung.',
        'Verwendet wird nur VSG aus vorgespannten Scheiben: Bei Beschädigung bleiben die Bruchstücke an der Folie haften.'
      ],
      spec: [['11 Systeme', 'freitragend, Zugstangen, Konsolen, Rahmen'], ['VSG', 'Bruchstücke bleiben an der Folie'], ['Bis 2 m', 'Auskragung'], ['Wenige Stunden', 'typische Montagezeit']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Welche Glasvordächer wir fertigen',
      intro: 'Die Befestigung bestimmt die Auskragung und die Wirkung der Fassade.',
      items: [
        ['Freitragende Vordächer', 'Nur an der Wand befestigt, ohne Zugstangen oder Stützen — die ruhigste Optik.'],
        ['Vordächer mit Zugstangen', 'Edelstahl-Zugstangen leiten die Last in die Wand darüber — für größere Tiefen.'],
        ['Vordächer auf Konsolen', 'Konsolen unter dem Glas, wenn über der Tür kein Platz für Zugstangen ist.'],
        ['Vordächer im Rahmen', 'Aluminium- oder Stahlrahmen mit Rinne und Beleuchtung — für große Flächen.'],
        ['Vordächer mit Seitenschutz', 'Eine gläserne Seitenwand schützt den Eingang vor Wind und Schlagregen.'],
        ['Vordächer für Gewerbe', 'Große Vordächer für Läden, Büros und Restaurants, auch mit Logo oder Licht.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein Glasvordach',
      items: [
        ['Trockener Eingang', 'Das Vordach schützt Tür und Menschen vor Regen und Schnee.'],
        ['Tageslicht', 'Glas verdunkelt den Eingang nicht und verdeckt die Fassade nicht.'],
        ['Sicherheit', 'Nur VSG: Bruchstücke bleiben an der Folie.'],
        ['Systeme aus deutscher Entwicklung', 'Geprüfte Schneelasten und Edelstahlbeschläge.'],
        ['Passend zur Fassade', 'Klar-, Extraklar- oder Satinatoglas; Halter in jeder RAL-Farbe.'],
        ['Schnelle Montage', 'In der Regel wenige Stunden vor Ort.']
      ]
    },
    faq: {
      title: 'Glasvordächer: häufige Fragen',
      intro: 'Ausführungen, Glas, Schneelast, Entwässerung und Montage.',
      items: [
        ['Welche Glasvordächer gibt es?', 'Freitragende (nur an der Wand), mit Zugstangen, auf Konsolen, im Rahmen und mit gläserner Seitenwand gegen Wind.'],
        ['Welches Glas wird verwendet?', 'Nur VSG aus vorgespannten Scheiben — bei Beschädigung bleiben die Bruchstücke an der Folie haften.'],
        ['Hält ein Glasvordach Schnee aus?', 'Ja, die Systeme sind für Schneelasten ausgelegt; Tiefe und Glas wählen wir passend zur Region.'],
        ['Wohin läuft das Wasser?', 'Das Vordach hat Gefälle von der Wand weg; bei Bedarf ergänzen wir Rinne und Fallrohr.'],
        ['Geht ein Vordach an einer gedämmten Fassade?', 'Ja, mit speziellen Befestigungen durch die Dämmung.'],
        ['Wie tief kann ein Vordach sein?', 'Je nach System von 50 cm bis 2 m.'],
        ['Ist Beleuchtung möglich?', 'Ja, LED-Spots im Rahmensystem oder separate Leuchten.'],
        ['Rosten die Halter?', 'Nein — Edelstahl oder beschichtetes Aluminium.'],
        ['Wie lange dauern Fertigung und Montage?', 'Fertigung bis zu 20 Arbeitstage nach Freigabe; die Montage dauert meist wenige Stunden.'],
        ['Wie pflege ich ein Glasvordach?', 'Einige Male pro Saison mit Glasreiniger säubern.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie ein Foto des Eingangs und ungefähre Maße — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'Vordachart', options: ['Freitragendes Vordach', 'Vordach mit Zugstangen', 'Vordach auf Konsolen', 'Vordach im Rahmen', 'Vordach mit Seitenschutz', 'Vordach für Gewerbe'], commentPlaceholder: 'Breite und Tiefe, Wandaufbau, Beleuchtung oder Rinne, Ort', product: 'Glasvordächer' }
  },

  frameless: {
    meta: { title: 'Rahmenlose Verglasung für Terrasse und Balkon | Space Glass', description: 'Rahmenlose Schiebe-, Falt-, Guillotine- und schwellenlose Glassysteme für Terrasse, Balkon, Pavillon und Gastronomie. Einfachglas oder Isolierglas.' },
    name: 'Rahmenlose Verglasung',
    eyebrow: 'Rahmenlose Verglasung',
    h1: 'Rahmenlose Verglasung für Terrasse und Balkon',
    lead: 'Rahmenlose Verglasung für Terrassen, Veranden, Balkone, Pavillons und Gastronomie: Falt-, Schiebe-, Guillotine- und schwellenlose Systeme mit ESG oder Isolierglas. Die Flügel öffnen vollständig, und der Blick bleibt frei von Rahmen.',
    heroAlt: 'Rahmenlose Terrassenverglasung mit Meerblick',
    explore: 'Systeme ansehen',
    intro: {
      title: 'Glas statt Wänden — und offener Raum an warmen Tagen',
      paragraphs: [
        'Rahmenlose Verglasung schützt Terrasse, Veranda, Balkon oder Pavillon vor Wind, Regen und Staub, ohne die Aussicht hinter Rahmen zu verstecken: Zwischen den Glasflügeln gibt es keine senkrechten Profile.',
        'Wir wählen das System nach Nutzung: saisonale Terrasse oder zusätzlicher Wohnraum, häufiger Durchgang oder windige Küste, manuell oder per Fernbedienung. Für die Übergangszeit gibt es Systeme mit Isolierglas.',
        'Den gesamten Ablauf übernehmen wir: Aufmaß und Prüfung der Decke, Planung von Flügeln und Parkposition, Fertigung mit ESG, Montage und Service.'
      ],
      spec: [['29 Systeme', 'Falt, Schiebe, Guillotine, schwellenlos'], ['ESG 8–10 mm', 'oder Isolierglas 20–28 mm'], ['Bis 4 m Höhe', 'Schwelle ab 0 mm'], ['Kyjiw · Odesa · Lwiw', 'Aufmaß, Montage und Service']]
    },
    types: {
      eyebrow: 'Systeme',
      title: 'Systeme und Einsatzbereiche',
      intro: 'Nach Öffnungsart oder Einsatzort — wir passen das System an Größe und Lage Ihrer Öffnung an.',
      items: [
        ['Faltsysteme', 'Die Flügel falten sich zu einem Paket an der Wand und öffnen die ganze Breite.'],
        ['Schiebesysteme', 'Breite Flügel bis 1,3 m gleiten wie Schranktüren, Schwelle ab 7,5 mm.'],
        ['Guillotinesysteme', 'Die Flügel fahren elektrisch senkrecht — per Fernbedienung, Taster oder Smartphone.'],
        ['Schwellenlose Systeme', 'Die Flügel hängen an der oberen Laufschiene, der Boden bleibt eben.'],
        ['Wärmegedämmte rahmenlose Verglasung', 'Systeme für Isolierglas — deutlich wärmer für die Nutzung über den Sommer hinaus.'],
        ['Balkonverglasung', 'Panoramaverglasung für Balkone und Loggien, auch im Mehrparteienhaus.'],
        ['Terrassenverglasung', 'Verglasung für Terrassen und Veranden, die sich bei schönem Wetter ganz öffnet.'],
        ['Pavillonverglasung', 'Faltsysteme für runde, L- und U-förmige Pavillons mit vielen Ecken.'],
        ['Panoramaverglasung für Häuser', 'Raumhohe Glaswände für Wohnhäuser und Restaurants.']
      ]
    },
    options: {
      eyebrow: 'Öffnungsarten',
      title: 'Falten, schieben, Guillotine oder schwellenlos',
      intro: 'Die Öffnungsart bestimmt Schwelle, Parkfläche der Flügel und Bedienkomfort.',
      items: [
        ['Falten', 'Die Flügel falten sich zu einem Paket an der Wand und geben die Öffnung ganz frei. Schwelle 7 bis 61 mm.'],
        ['Schieben', 'Breite Flügel gleiten auf Schienen, mit weniger Fugen. Schwelle ab 7,5 mm.'],
        ['Guillotine', 'Die Flügel fahren elektrisch senkrecht — ideal für Gastronomie-Terrassen und Ausgabetheken.'],
        ['Schwellenlos', 'Oben hängende Flügel lassen den Boden völlig eben.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum rahmenlose Verglasung',
      items: [
        ['Panorama ohne Rahmen', 'Keine senkrechten Profile zwischen den Flügeln — nur Glas vom Boden bis zur Decke.'],
        ['Vollständig zu öffnen', 'Falten, schieben oder heben — die Terrasse ist in Sekunden wieder offen.'],
        ['Sicherheitsglas', 'Nur ESG 8–10 mm, Isolierglas oder VSG.'],
        ['Wetterschutz', 'Dichtungen zwischen den Flügeln und eine Entwässerung schützen vor Wind, Regen, Schnee und Staub.'],
        ['Jede Form', 'Gerade, L- und U-förmige, gebogene Öffnungen und Pavillons mit vielen Ecken.'],
        ['Längere Saison', 'Terrasse oder Gastgarten sind Monate länger nutzbar, mit Isolierglas fast ganzjährig.']
      ]
    },
    faq: {
      title: 'Rahmenlose Verglasung: häufige Fragen',
      intro: 'Systeme, Glas, Schwelle, Wind, Wärme und Montage.',
      items: [
        ['Was ist rahmenlose Verglasung?', 'Eine Verglasung, bei der die ESG-Flügel keine senkrechten Rahmen haben: Das Glas wird nur im oberen und unteren Profil gehalten.'],
        ['Was ist besser für die Terrasse: Falt, Schiebe oder Guillotine?', 'Falt öffnet die ganze Öffnung, Schiebe hat breitere Flügel und weniger Fugen, Guillotine öffnet motorisch und eignet sich für Theken und Gastronomie-Terrassen.'],
        ['Welches Glas wird verwendet?', 'ESG 8 oder 10 mm, vorgespanntes Isolierglas 20–28 mm oder VSG — klar, satiniert oder in der Masse getönt.'],
        ['Ist rahmenlose Verglasung warm?', 'Systeme mit Einfachglas sind für die saisonale Nutzung. Systeme mit Isolierglas sind deutlich wärmer und verlängern die Saison.'],
        ['Geht es ohne Schwelle?', 'Ja: Oben hängende Systeme haben keine Schwelle, einige Faltsysteme ragen nur 7 mm über den Boden.'],
        ['Hält die Verglasung Wind aus?', 'Ja. Faltsysteme sind für Windlasten um 175 kg/m² ausgelegt; für exponierte Lagen wählen wir höhere Profile und stärkeres Glas.'],
        ['Braucht es ein Dach?', 'Ja, das System wird zwischen Boden und Dach oder Träger montiert. Ohne Dach ist ein Glasdach oder eine Pergola möglich.'],
        ['Kann das Profil farbig sein?', 'Ja: eloxiert, Anthrazitgrau oder jede RAL-Farbe; bei einigen Systemen auch Holzoptik.'],
        ['Zieht es durch die Fugen?', 'Dichtungen zwischen den Flügeln und umlaufend — Filz, Silikon oder Magnet je nach System — halten Zugluft ab.'],
        ['Wie lange dauert die Montage?', 'Eine Terrasse, ein Balkon oder ein Pavillon ist nach der Glasfertigung meist in einem bis wenigen Tagen montiert.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie Fotos der Öffnung sowie ungefähre Breite und Höhe — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'System oder Einsatzort', options: ['Faltsystem', 'Schiebesystem', 'Guillotinesystem', 'Schwellenloses System', 'Wärmegedämmte Verglasung', 'Balkon', 'Terrasse oder Veranda', 'Pavillon', 'Panoramaverglasung'], commentPlaceholder: 'Breite und Höhe der Öffnung, Schwelle, Glas, Ort', product: 'Rahmenlose Verglasung' }
  },

  aluminium: {
    meta: { title: 'Aluminiumfenster, -türen und Schiebesysteme | Space Glass', description: 'Wärmegedämmte Aluminiumfenster, -türen und Hebe-Schiebe-Systeme auf Aluprof-Profilen sowie Büroverglasung, Fassaden, Wintergärten und Pergolen.' },
    name: 'Aluminium-Fenster und -Türen',
    eyebrow: 'Aluminiumsysteme',
    h1: 'Aluminiumfenster, -türen und Schiebesysteme',
    lead: 'Aluminiumfenster und -türen, Schiebe- und Hebe-Schiebe-Systeme, Büro- und Fassadenverglasung, Wintergärten, Pergolen und Plissee-Insektenschutz auf Profilsystemen von Aluprof. Wir planen, fertigen und montieren.',
    heroAlt: 'Große Aluminium-Schiebetüren zur Terrasse',
    explore: 'Aluminiumprodukte ansehen',
    intro: {
      title: 'Aluminium für Jahrzehnte, nicht für eine Saison',
      paragraphs: [
        'Aluminium ermöglicht große Glasflächen, schlanke Rahmen und breite Schiebeelemente — und es fault nicht, verzieht sich weder bei Sonne noch bei Frost, vergilbt nicht und muss nicht gestrichen werden. Mit thermischer Trennung ist es zudem warm und energieeffizient.',
        'Unser Hauptsystem ist Aluprof: Fenster, Türen, Pivot- und Falttüren, Hebe-Schiebe-Systeme und Fassaden. Vor der Fertigung erstellen unsere Ingenieure Öffnungsplan, Positionsliste und Anschlussdetails.',
        'Die Profile werden auf eigenen Maschinen bearbeitet; Monteure mit über 10 Jahren Erfahrung bauen mit Abdichtung und Dampfsperre nach technischen Regeln ein.'
      ],
      spec: [['Uw ab 0,62', 'W/(m²K) bei Fenstern'], ['Bis RC4', 'einbruchhemmende Verglasung'], ['Jede RAL-Farbe', 'und Holzdekore'], ['Bis 30 Arbeitstage', 'Fertigung nach Freigabe']]
    },
    types: {
      eyebrow: 'Produkte',
      title: 'Aluminiumkonstruktionen, die wir fertigen',
      intro: 'Fenster, Türen und Systeme für Wohn- und Gewerbebauten.',
      items: [
        ['Aluminiumfenster', 'Wärmegedämmte Fenster mit schmalen Rahmen und verdeckten Beschlägen.'],
        ['Aluminiumtüren', 'Haus-, Terrassen- und Pivottüren mit Mehrfachverriegelung.'],
        ['Schiebe- und Hebe-Schiebe-Türen', 'Große Schiebeelemente für Terrassen und breite Öffnungen, thermisch getrennt.'],
        ['Büroverglasung', 'Innenverglasung und Glaswände in Aluminiumprofilen für Büros.'],
        ['Fassadenverglasung', 'Pfosten-Riegel- und Structural-Glazing-Fassaden für Wohn- und Gewerbebauten.'],
        ['Wintergärten', 'Verglaste Anbauten und Terrassen mit Glasdach.'],
        ['Pergolen', 'Aluminiumpergolen und Sonnenschutz für die Terrasse.'],
        ['Plissee-Insektenschutz', 'Plisseegitter für große Fenster und Schiebetüren.']
      ]
    },
    options: {
      eyebrow: 'Wärmedämmung',
      title: 'Wie warm ein Aluminiumfenster sein kann',
      intro: 'Thermische Trennung und Dämmvariante bestimmen die Energieeffizienz.',
      items: [
        ['Thermische Trennung', 'Ein Polyamidsteg zwischen äußerer und innerer Profilschale stoppt die Kälte — so wird das Aluminiumfenster warm.'],
        ['Dämmvarianten', 'Basis, mit Zweikomponentendichtung oder mit zusätzlichen Dämmeinlagen für Energiesparhäuser.'],
        ['Verglasung', 'Zwei- oder Dreifach-Isolierglas, Sicherheits- und einbruchhemmendes Glas bis RC4.'],
        ['Automatisierung', 'Antriebe, elektronische Schlösser und Zutrittskontrolle — auch per Smartphone.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum Aluminium',
      items: [
        ['Sicherheit', 'Steife Profile, Mehrfachverriegelung und einbruchhemmende Verglasung bis RC4. Aluminium brennt nicht.'],
        ['Energieeffizienz', 'Thermische Trennung und Zweikomponentendichtungen ergeben Uw-Werte ab 0,62 W/(m²K).'],
        ['Nachhaltigkeit', 'Aluminium, Polyamid und EPDM sind vollständig recycelbar.'],
        ['Langlebigkeit', 'Das Profil fault nicht, verzieht sich nicht, vergilbt nicht und braucht jahrzehntelang keinen Anstrich.'],
        ['Design', 'Schmale Rahmen, große Glasflächen, jede RAL-Farbe, verdeckte Bänder und Flügel.'],
        ['Service', 'Garantie- und Nachgarantieservice: Justierung, neue Dichtungen, Beschlagreparatur.']
      ]
    },
    faq: {
      title: 'Aluminiumfenster und -türen: häufige Fragen',
      intro: 'Systeme, Dämmung, Farben, Planung und Montage.',
      items: [
        ['Mit welchen Profilsystemen arbeiten Sie?', 'Unser Hauptsystem ist Aluprof: Fenster, Türen, Pivot- und Falttüren, Hebe-Schiebe-Systeme und Fassadensysteme.'],
        ['Sind Aluminiumfenster warm?', 'Ja. Thermisch getrennte Systeme erreichen Uw ab 0,62 W/(m²K) bei Fenstern und ab 0,84 W/(m²K) bei Hebe-Schiebe-Türen. Kaltes Aluminium ohne Trennung nur für unbeheizte Räume.'],
        ['Aluminium oder Kunststoff?', 'Aluminium ist fester und langlebiger und erlaubt große Flügel, schmale Rahmen, Schiebesysteme und Fassaden. Kunststoff ist bei Standardfenstern günstiger.'],
        ['Was ist eine thermische Trennung?', 'Ein Polyamidsteg zwischen äußerer und innerer Profilschale. Er stoppt die Kälte, sodass das Aluminiumfenster warm wird.'],
        ['Kann ich die Profilfarbe wählen?', 'Ja. Die Profile werden in jeder RAL-Farbe pulverbeschichtet; Struktur- und Holzdekore sind möglich.'],
        ['Erstellen Sie eine Planung?', 'Ja. Wir erstellen Öffnungsplan, Positionsliste und Standard-Anschlussdetails — das vermeidet unerwartete Kosten.'],
        ['Lassen sich Türen und Schiebesysteme automatisieren?', 'Ja. Antriebe, elektronische Schlösser und Zutrittskontrolle sind möglich, auch per Smartphone.'],
        ['Wie lange dauert die Fertigung?', 'Je nach System, Profilfarbe und Verglasung — in der Regel bis zu 30 Arbeitstage nach Freigabe der Zeichnungen.'],
        ['Arbeiten Sie mit Architekten und Bauträgern?', 'Ja. Wir liefern technische Unterlagen, helfen bei der Systemwahl und begleiten das Projekt von der Zeichnung bis zur Montage.'],
        ['Ist ein Aufmaß nötig?', 'Ja, bei Maßanfertigung ist das Aufmaß unerlässlich: Es legt die exakten Maße und Anschlussdetails fest.']
      ]
    },
    form: { title: 'Unverbindliche Kostenschätzung gewünscht?', text: 'Senden Sie Grundriss, Zeichnung oder Fotos der Öffnungen mit Maßen — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'Produkt', options: ['Aluminiumfenster', 'Aluminiumtüren', 'Schiebe- / Hebe-Schiebe-Türen', 'Büroverglasung', 'Fassadenverglasung', 'Wintergarten', 'Pergola', 'Plissee-Insektenschutz'], commentPlaceholder: 'Anzahl und Maße der Öffnungen, Dämmstandard, Farbe, Ort', product: 'Aluminium-Fenster und -Türen' }
  },

  wintergardens: {
    meta: { title: 'Wintergärten und Terrassen aus Aluminium | Space Glass', description: 'Wintergärten und verglaste Terrassen aus Aluminium: thermisch getrennte Profile, Glasdach, Schiebe- und Falttüren — ganzjährig oder saisonal nutzbar.' },
    name: 'Wintergärten',
    eyebrow: 'Aluminiumsysteme / Wintergärten',
    h1: 'Wintergärten aus Aluminium und verglaste Terrassen',
    lead: 'Ein verglaster Raum am Haus, den Sie das ganze Jahr nutzen. Wir planen Wintergärten und Terrassen auf Aluprof-Systemen: gedämmte Konstruktion, Glasdach, Panorama-Schiebe- oder Falttüren und Sonnenschutz.',
    heroAlt: 'Wintergarten aus Aluminium mit Schiebetüren an einem Einfamilienhaus',
    explore: 'Optionen ansehen',
    intro: {
      title: 'Draußen sein — zu jeder Jahreszeit',
      paragraphs: [
        'Ein Wintergarten ist ein verglaster Anbau oder eine Terrasse, bei der Tragwerk, Dach und Schiebetüren als ein System arbeiten. Im Sommer öffnen die Türen auf ganzer Breite, im Winter wird der Garten zum zusätzlichen Wohnraum.',
        'Für einen beheizten Wintergarten verwenden wir thermisch getrennte Profile und Zwei- oder Dreifach-Isolierglas. Für einen saisonalen Sommergarten genügt ein leichteres System mit Einfachglas.',
        'Space Glass plant den Garten komplett: Fassadenverglasung, Dach, Schiebetüren, Entwässerung und Anschlüsse an das Haus.'
      ],
      spec: [['Dachneigung 5°–45°', 'Wintergarten-Dachsystem'], ['Glas bis 450 kg', 'in Wand und Dach'], ['Flügel 1,2 × 2,8 m', 'rahmenlose Schiebeverglasung'], ['Beheizt oder saisonal', 'nach Ihrer Nutzung']]
    },
    types: {
      eyebrow: 'Optionen',
      title: 'Woraus ein Wintergarten besteht',
      intro: 'Diese Elemente kombinieren wir zu einem System für Ihr Haus.',
      items: [
        ['Beheizter Wintergarten', 'Thermisch getrennte Konstruktion und Isolierglas für die ganzjährige Nutzung.'],
        ['Saisonaler Sommergarten', 'Ein leichteres System mit Einfachglas für Frühling, Sommer und Herbst.'],
        ['Glasdach', 'Gedämmte Sparren und Pfetten bilden ein eigenständiges Glasdach mit Rinne im Traufbalken.'],
        ['Schiebe- und Falttüren', 'Hebe-Schiebe-Türen oder rahmenlose Schiebeelemente öffnen den Garten zur Terrasse.'],
        ['Pergola und Sonnenschutz', 'Pergolen, Außenjalousien und Beschattung für angenehme Temperaturen im Sommer.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum ein Wintergarten aus Aluminium',
      items: [
        ['Ein zusätzlicher Raum', 'Ein heller Platz zum Essen, Entspannen oder für Pflanzen — das ganze Jahr.'],
        ['Warme Konstruktion', 'Thermische Trennung im gesamten Dach und in den Wänden.'],
        ['Große Gläser', 'Schlanke Aluminiumprofile tragen große, schwere Isolierglaseinheiten.'],
        ['Dach in jeder Geometrie', 'Dachneigungen von 5° bis 45° und komplexe Formen.'],
        ['Lüftung', 'Öffenbare Flügel und Dachfenster lüften den Garten bei jedem Wetter.'],
        ['Ein Planer', 'Tragwerk, Dach, Türen, Entwässerung und Hausanschluss gemeinsam geplant.']
      ]
    },
    faq: {
      title: 'Wintergärten: häufige Fragen',
      intro: 'Beheizt oder saisonal, Dach, Türen und Planung.',
      items: [
        ['Was unterscheidet einen beheizten von einem saisonalen Wintergarten?', 'Ein beheizter Wintergarten hat thermisch getrennte Profile und Isolierglas und ist ganzjährig nutzbar. Ein Sommergarten nutzt ein leichteres System mit Einfachglas.'],
        ['Welches System verwenden Sie?', 'Aluprof-Systeme: ein spezielles Wintergarten-Dachsystem, halbstrukturelle Glaswände und rahmenlose Schiebeverglasung.'],
        ['Welche Dachneigungen sind möglich?', 'Das Wintergarten-Dachsystem erlaubt Neigungen von 5° bis 45°.'],
        ['Lässt sich der Garten im Sommer ganz öffnen?', 'Ja, mit Hebe-Schiebe-Türen oder rahmenlosen Schiebe- und Faltelementen.'],
        ['Wie wird das Regenwasser abgeleitet?', 'Über eine in den Traufbalken des Dachsystems integrierte Rinne.'],
        ['Wie verhindern Sie Überhitzung?', 'Mit Sonnenschutzglas, außenliegender Beschattung, Pergolen und öffenbaren Flügeln zur Lüftung.'],
        ['Planen Sie den Anschluss an das Haus?', 'Ja. Wir planen den Garten komplett — Fassadenverglasung, Dach, Schiebetüren, Entwässerung und die Anschlüsse an das Haus.'],
        ['Was brauchen Sie für eine erste Kostenschätzung?', 'Grundriss oder Fotos des Platzes mit Maßen, die gewünschte Nutzung und den Standort.']
      ]
    },
    form: { title: 'Sie planen einen Wintergarten?', text: 'Senden Sie Fotos des Platzes und ungefähre Maße — wir schlagen ein System vor und erstellen eine Kostenschätzung.', optionsLabel: 'Art', options: ['Beheizter Wintergarten', 'Saisonaler Sommergarten', 'Glasdach', 'Schiebe- / Falttüren'], commentPlaceholder: 'Maße, beheizt oder saisonal, Dach, Türen, Ort', product: 'Wintergärten' }
  },

  facades: {
    meta: { title: 'Glasfassaden für Gebäude — Planung und Montage | Space Glass', description: 'Glasfassaden auf Aluprof-Systemen: Pfosten-Riegel-, Structural-Glazing- und Elementfassaden, energieeffiziente Verglasung, Schaufenster und Eingänge.' },
    name: 'Glasfassaden',
    eyebrow: 'Glasfassaden',
    h1: 'Glasfassaden für Gebäude',
    lead: 'Pfosten-Riegel-, Structural-Glazing- und Elementfassaden, energieeffiziente Fassaden, Verglasung von Einfamilienhäusern, Schaufenster und Eingangsanlagen auf Aluprof-Systemen. Wir starten mit der Aufgabe, berechnen die Lasten und montieren die Fassade.',
    heroAlt: 'Stadtquartier mit Glasfassaden von Bürogebäuden',
    explore: 'Fassadenarten ansehen',
    intro: {
      title: 'Eine Glasfassade, geplant für Ihr Gebäude',
      paragraphs: [
        'Die Glasfassade bestimmt das Erscheinungsbild eines Gebäudes, das Tageslicht im Inneren und die Kosten für Heizung und Kühlung. Deshalb beginnen wir nicht mit dem Profil, sondern mit der Aufgabe: Einfamilienhaus, Bürogebäude oder Ladenlokal.',
        'Wir arbeiten mit Fassadensystemen von Aluprof — Pfosten-Riegel-Systeme, halbstrukturelle Fassaden mit schmalen Fugen, Elementfassaden und energieeffiziente Varianten — und integrieren Fenster, Türen und Sonnenschutz.',
        'Für jede Fassade berechnen wir Windlasten, Glasgewicht und Verankerung an den Decken und erstellen eine Spezifikation.'
      ],
      spec: [['Uf ab 0,55', 'W/(m²K) bei warmen Systemen'], ['Klasse I5/E5', 'Stoßfestigkeit'], ['EI30–EI60', 'Brandschutzlösungen'], ['Jede RAL-Farbe', 'eloxiert oder Holzdekor']]
    },
    types: {
      eyebrow: 'Ausführungen',
      title: 'Glasfassaden, die wir planen und montieren',
      intro: 'Von der Pfosten-Riegel-Fassade bis zu Schaufenster und Eingang.',
      items: [
        ['Pfosten-Riegel-Fassaden', 'Ein Raster aus Pfosten und Riegeln wird am Gebäude montiert; das Glas halten Pressleisten.'],
        ['Structural Glazing', 'Ohne außenliegende Pressleisten: Von außen sind nur Glas und schmale Fugen sichtbar.'],
        ['Fassaden für Einfamilienhäuser', 'Verglasung von Wohnräumen, Treppenhäusern, Lufträumen und Glasdächern.'],
        ['Energieeffiziente Fassaden', 'Warme Systeme mit Isolierglas und Sonnenschutz für niedrige Betriebskosten.'],
        ['Schaufensterverglasung', 'Große verglaste Schaufenster für Läden, Cafés und Showrooms.'],
        ['Eingangsanlagen aus Glas', 'Eingänge mit Pivot-, Schiebe- oder Paneeltüren, in die Fassade integriert.']
      ]
    },
    options: {
      eyebrow: 'Konstruktion',
      title: 'Fassadensysteme',
      intro: 'Wie die Fassade aufgebaut und montiert wird.',
      items: [
        ['Pfosten-Riegel', 'Pfosten und Riegel werden am Gebäude montiert und vor Ort verglast.'],
        ['Halbstrukturell', 'Außen eine durchgehende Glasfläche mit schmalen 2-cm-Fugen statt Pressleisten.'],
        ['Elementfassade', 'Module werden im Werk montiert und verglast und am Gebäude nur eingehängt.'],
        ['Aufsatzkonstruktion', 'Aluminium-Pressprofile auf einem tragenden Holz- oder Stahlrahmen.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: 'Warum eine Glasfassade',
      items: [
        ['Licht und Weite', 'Glas von Decke zu Decke füllt die Räume mit Tageslicht und öffnet den Blick.'],
        ['Energieeffizienz', 'Warme Systeme mit Uf ab 0,55 W/(m²K), Low-E-Glas und Sonnenschutz senken die Klimakosten.'],
        ['Schnelle Montage', 'Leichte Konstruktion; Elementfassaden werden in werkseitig gefertigten Modulen montiert.'],
        ['Sicherheit', 'VSG, Stoßfestigkeit I5/E5 und Brandschutz EI30–EI60.'],
        ['Langlebigkeit', 'Aluminium korrodiert und verzieht sich nicht; EPDM-Dichtungen sind UV-beständig.'],
        ['Gestaltungsfreiheit', 'Gekrümmte und facettierte Fassaden, jede RAL-Farbe, Glasdächer.']
      ]
    },
    faq: {
      title: 'Glasfassaden: häufige Fragen',
      intro: 'Systeme, Energieeffizienz, Sicherheit und Planung.',
      items: [
        ['Was ist eine Glasfassade?', 'Eine vorgehängte Fassade aus Aluminiumtragwerk und Isolierglas, verankert an den Decken. Sie schützt vor Witterung, lässt Licht herein und kann öffenbare Fenster und Türen enthalten.'],
        ['Welche Glasfassaden gibt es?', 'Pfosten-Riegel-, halbstrukturelle, Structural-Glazing- und Elementfassaden sowie Aufsatzkonstruktionen auf Holz- oder Stahlrahmen; jeweils auch in energieeffizienter Ausführung.'],
        ['Was unterscheidet eine Fassade von Fenstern?', 'Eine Fassade ist eine selbsttragende Vorhangwand über mehrere Geschosse mit großen Gläsern. Fenster werden in einzelne Wandöffnungen eingebaut.'],
        ['Welche Fassade ist am wärmsten?', 'Unsere wärmsten Systeme erreichen Uf ab 0,55 W/(m²K); passivhauszertifizierte Varianten sind verfügbar.'],
        ['Was ist Structural Glazing?', 'Eine Fassade ohne außenliegende Pressleisten: Die Gläser werden über Halter oder Verklebung gehalten, außen sind nur Glas und schmale Fugen sichtbar.'],
        ['Lassen sich Fenster in die Glasfassade integrieren?', 'Ja: Klapp-, Dreh-Kipp-, Parallelausstell- und verdeckte Fenster sowie Dachfenster im Glasdach.'],
        ['Wie wird Überhitzung vermieden?', 'Mit Sonnenschutzglas, Fassaden mit integrierten Jalousien oder außenliegenden Lamellen.'],
        ['Ist das Glas in der Fassade sicher?', 'Ja. Wir verwenden ESG und VSG und Systeme mit Stoßfestigkeit I5/E5; Brandschutzfassaden EI30 und EI60 sind möglich.'],
        ['Planen Sie die Fassade?', 'Ja. Wir berechnen Windlasten, Glasgewicht, Verankerung und Anschlüsse und erstellen die Spezifikation.'],
        ['Arbeiten Sie mit Architekten und Bauträgern?', 'Ja, wir wählen das System passend zum Projekt, erarbeiten technische Lösungen und begleiten das Objekt bis zur Übergabe.']
      ]
    },
    form: { title: 'Sie planen eine Glasfassade?', text: 'Senden Sie Pläne oder Fotos des Gebäudes mit Maßen — wir wählen das System und erstellen eine Kostenschätzung.', optionsLabel: 'Fassadenart', options: ['Pfosten-Riegel-Fassade', 'Structural Glazing', 'Fassade für ein Einfamilienhaus', 'Energieeffiziente Fassade', 'Schaufenster', 'Eingangsanlage aus Glas'], commentPlaceholder: 'Gebäudeart, Fassadenfläche, vorhandene Pläne, Ort', product: 'Glasfassaden' }
  },

  business: {
    meta: { title: 'Glas für Gewerbe — Hotels, Gastro, Büros | Space Glass', description: 'Glas für Hotels, Gastronomie, Büros, Handel, Salons, Praxen und Wohnanlagen: Trennwände, Türen, Schaufenster, Geländer und Terrassenverglasung.' },
    name: 'Glaslösungen für Gewerbe',
    eyebrow: 'Für Gewerbe',
    h1: 'Glaslösungen für Ihr Unternehmen',
    lead: 'Glas für Hotels, Gastronomie, Büros, Handel, Kosmetiksalons, Praxen, Wohnanlagen und Ferienanlagen: Schaufenster, Trennwände, Türen, Geländer, rahmenlose Terrassenverglasung, Duschen und Spiegel — ein Team vom Aufmaß bis zur Übergabe.',
    heroAlt: 'Hotellobby mit Glaskonstruktionen',
    explore: 'Branche wählen',
    intro: {
      title: 'Ein Auftragnehmer für alle Glasbereiche',
      paragraphs: [
        'Gewerbeprojekte brauchen mehr als gutes Glas: einen Zeitplan, der den Betrieb nicht stoppt, Beschläge für intensive Nutzung und eine Spezifikation für alle Bereiche — vom Eingang bis zu den Sanitärräumen.',
        'Wir nehmen das gesamte Objekt einmal auf, erstellen eine Spezifikation, fertigen und montieren außerhalb der Öffnungszeiten, am Wochenende oder in Etappen und bleiben für den Service danach erreichbar.',
        'Wir arbeiten mit Unternehmen auf Vertragsbasis mit vollständiger Dokumentation und mit Planern und Architekten ab der Entwurfsphase.'
      ],
      spec: [['Ein Aufmaß', 'eine Spezifikation für alle Bereiche'], ['Montage außerhalb der Öffnungszeiten', 'oder in Etappen'], ['Bis 20 / 30 Arbeitstage', 'Glas / Aluminium'], ['5 · 2 · 1 Jahre', 'Garantie auf Glas, Beschläge, Montage']]
    },
    types: {
      eyebrow: 'Branchen',
      title: 'Lösungen für Ihre Branche',
      intro: 'Was wir typischerweise je Branche umsetzen.',
      items: [
        ['Hotels', 'Duschen und Badewannenaufsätze für jedes Zimmer, Glastüren, Geländer, Lobby-Trennwände und Spiegel.'],
        ['Restaurants und Cafés', 'Rahmenlose Terrassenverglasung, Guillotinefenster, Schaufenster, Trennwände und Spiegelwände.'],
        ['Büros', 'Glastrennwände, Besprechungsräume, Glastüren und Branding auf Glas.'],
        ['Handel und Showrooms', 'Schaufenster, Eingangsanlagen, Regale, Podeste und Vordächer.'],
        ['Kosmetiksalons', 'Spiegel für Arbeitsplätze, Trennwände und Glastüren.'],
        ['Praxen und Kliniken', 'Trennwände und Türen mit Satinatoglas — leicht zu reinigen und hygienisch.'],
        ['Wohnanlagen', 'Balkon- und Treppengeländer, Vordächer, Lobbyverglasung — als Serie.'],
        ['Ferien- und Freizeitanlagen', 'Terrassen- und Pavillonverglasung, Geländer, Duschen und Vordächer.']
      ]
    },
    benefits: {
      eyebrow: 'Vorteile',
      title: '5 Jahre Garantie auf Glas, 2 auf Beschläge, 1 auf die Montage',
      items: [
        ['Ein Projekt für alles', 'Ein Aufmaß und eine Spezifikation für alle Bereiche Ihres Objekts.'],
        ['Kein Stillstand', 'Montage außerhalb der Öffnungszeiten, am Wochenende oder in Etappen.'],
        ['Robuste Beschläge', 'Schließer, Bänder und Laufschienen für intensive Nutzung und hohe Frequenz.'],
        ['Branding auf Glas', 'Satinierung, Folie oder Druck nach Ihrem Logo und Corporate Design.'],
        ['Serien und Filialen', 'Eine Standardlösung, einmal entwickelt und auf alle Standorte oder Zimmer übertragen.'],
        ['Service nach Übergabe', 'Justierung der Beschläge, neue Dichtungen und Einweisung des Personals.']
      ]
    },
    faq: {
      title: 'Glaslösungen für Gewerbe: häufige Fragen',
      intro: 'Leistungsumfang, Vertrag, Termine, Garantie und Montage.',
      items: [
        ['Für welche Branchen fertigen Sie Glaskonstruktionen?', 'Hotels, Restaurants und Cafés, Büros, Handel, Kosmetiksalons, Praxen und Kliniken, Wohnanlagen sowie Ferien- und Freizeitanlagen.'],
        ['Was genau fertigen Sie für Unternehmen?', 'Glastrennwände und -türen, Eingangsanlagen, Schaufenster, rahmenlose Terrassenverglasung, Geländer, Duschen, Spiegel, Vordächer, Regale und Theken.'],
        ['Arbeiten Sie auf Vertragsbasis?', 'Ja, mit Vertrag und vollständigen Unterlagen.'],
        ['Kann ich alles für ein Objekt als ein Projekt bestellen?', 'Ja, wir machen ein Aufmaß und eine Spezifikation für alle Bereiche — vom Eingang bis zu den Sanitärräumen.'],
        ['Montieren Sie ohne Betriebsunterbrechung?', 'Ja, außerhalb der Öffnungszeiten, am Wochenende oder in Etappen nach Absprache.'],
        ['Wie lange dauert ein Projekt?', 'Glaskonstruktionen bis 20 Arbeitstage, Aluminiumkonstruktionen bis 30 Arbeitstage nach Freigabe aller Details; Serien werden separat terminiert.'],
        ['Ist ein Logo auf dem Glas möglich?', 'Ja, durch Satinierung, Folie oder Druck nach Ihrer Vorlage.'],
        ['Arbeiten Sie mit Ketten und Serien?', 'Ja, wir entwickeln eine Standardlösung und übertragen sie auf alle Standorte oder Zimmer.'],
        ['Eignet sich Glas für hohe Frequenz?', 'Ja, mit verstärkten Beschlägen: Schließer, Bänder und Laufschienen für intensive Nutzung.'],
        ['Wo sehe ich Ihre Arbeiten?', 'Im Bereich Projekte — Hotels, Gastronomie, Büros, Praxen und Läden.']
      ]
    },
    form: { title: 'Sprechen wir über Ihr Projekt?', text: 'Erzählen Sie uns von Ihrem Unternehmen und Ihrem Vorhaben — wir schlagen eine Lösung für jeden Bereich vor und erstellen eine Kostenschätzung.', optionsLabel: 'Ihre Branche', options: ['Hotel', 'Restaurant oder Café', 'Büro', 'Handel oder Showroom', 'Kosmetiksalon', 'Praxis oder Klinik', 'Wohnanlage', 'Ferienanlage'], commentPlaceholder: 'Art des Objekts, Fläche, Bedarf (Trennwände, Terrasse, Schaufenster …), Ort', product: 'Glaslösungen für Gewerbe' }
  }
};
