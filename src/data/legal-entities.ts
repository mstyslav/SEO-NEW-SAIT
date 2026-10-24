/**
 * Verified legal entities behind the Space Glass brand (owner-confirmed 2026-10-24).
 * Deliberately NOT published: Austrian Steuernummer (not a UID), FOP registration number and registered
 * address (private person — data minimisation). Do NOT invent the Austrian address or UID.
 */
export const AT_ENTITY = {
  name: 'Space Glass KG',
  firmenbuch: 'FN 647241 a',
  court: 'Handelsgericht Wien',
  street: 'Allerheiligenplatz 5/8',
  postalCity: '1200 Wien',
  country: 'Österreich',
  uid: 'ATU82178901',
  /** As given by the owner (family name first). Capacity (Komplementär/Geschäftsführer) NOT verified — Firmenbuch not accessible. */
  representative: 'Hrabko Mstyslav',
  /** GISA register (status aufrecht), exact Gewerbewortlaut as supplied by the owner from the official GISA screenshot 2026-10-24. */
  gewerbe: [
    { gisaZahl: '38116704', wortlaut: 'Handelsgewerbe mit Ausnahme der reglementierten Handelsgewerbe' },
    { gisaZahl: '38138140', wortlaut: 'Zusammenbau und Montage beweglicher Sachen, mit Ausnahme von Möbeln und statisch belangreichen Konstruktionen, aus fertig bezogenen Teilen mit Hilfe einfacher Schraub-, Klemm-, Kleb- und Steckverbindungen' }
  ],
  /** Gewerbebehörde and Kammer: confirmed/approved by the owner (not read from the GISA extract). */
  gewerbebehoerde: 'Magistratisches Bezirksamt für den 20. Bezirk, Wien' as string | null, // owner-confirmed 2026-10-24
  kammer: 'Wirtschaftskammer Wien (WKW)' as string | null, // owner-approved: no membership number, no Fachgruppe published
  phoneDisplay: '+43 677 64336327',
  email: 'info@space-glass.com.ua'
};

/** Published: name + registration number/date (owner-approved). NOT published: РНОКПП (tax ID), registered residential address — pending legal check. */
export const UA_ENTITY = { name: 'ФОП Гожда Марія Олегівна', registrationNumber: '2010350000000600762', registeredOn: '18.07.2024' };

/** true = Impressum is indexable, linked in the DE footer and listed in the sitemap. Set to false to hide it again. */
export const impressumComplete = true;
