/**
 * Line-art icons for the aluminium / metal-plastic hub cards — same 40×40
 * viewBox, 1.5 stroke and currentColor as the /dushovi-kabiny/ and /dzerkala/
 * type icons, so all section hubs share one visual language.
 * Keys: `${group}/${slug}` plus cross-links.
 */
const iconWrap = (p: string) =>
  `<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

export const profileIcons: Record<string, string> = {
  'alu/vikna': iconWrap('<rect x="8" y="6" width="24" height="28"/><path d="M20 6v28M8 20h24"/>'),
  'alu/dveri': iconWrap('<path d="M10 34V6h20v28"/><path d="M6 34h28"/><path d="M25 21h.01"/><path d="M14 10h12v20"/>'),
  'alu/rozsuvni-dveri': iconWrap('<path d="M5 9h30"/><path d="M6 34h28"/><rect x="8" y="11" width="15" height="23"/><rect x="18" y="11" width="15" height="23"/><path d="M25 22h4"/>'),
  'alu/ofisne-sklinnya': iconWrap('<path d="M4 34h32"/><rect x="6" y="8" width="12" height="26"/><rect x="18" y="8" width="16" height="26"/><path d="M22 21h.01"/><path d="M6 8h28"/>'),
  'alu/fasadne-sklinnya': iconWrap('<rect x="6" y="4" width="28" height="32"/><path d="M6 12h28M6 20h28M6 28h28M15 4v32M25 4v32"/>'),
  'alu/zymovi-sady': iconWrap('<path d="M4 34h32"/><path d="M6 34V18l14-10 14 10v16"/><path d="M13 34V22h14v12"/><path d="M20 22v12M13 13l14 0"/>'),
  'alu/sitky-plise': iconWrap('<rect x="8" y="6" width="24" height="28"/><path d="M12 6v28M15 6v28M18 6v28"/><path d="M26 20h.01"/>'),
  'alu/perholy': iconWrap('<path d="M4 12h32"/><path d="M8 12v22M32 12v22"/><path d="M8 8l4 4M14 8l4 4M20 8l4 4M26 8l4 4"/><path d="M4 34h32"/>'),
  'pvc/vikna': iconWrap('<rect x="8" y="6" width="24" height="28"/><rect x="11" y="9" width="18" height="22"/><path d="M26 20h.01"/>'),
  'pvc/dveri': iconWrap('<path d="M10 34V6h20v28"/><rect x="14" y="10" width="12" height="12"/><path d="M6 34h28"/><path d="M26 26h.01"/>'),
  'pvc/rozsuvni-dveri': iconWrap('<path d="M4 10h32"/><path d="M4 34h32"/><rect x="6" y="12" width="16" height="22"/><rect x="18" y="12" width="16" height="22"/><path d="M13 23h4"/>'),
  'pvc/ofisni-perehorodky': iconWrap('<path d="M4 34h32"/><rect x="6" y="10" width="28" height="24"/><path d="M6 22h28M16 10v24M26 10v24"/>'),
  'hub/alu': iconWrap('<path d="M8 6h24v28H8z"/><path d="M12 10h16v20H12z"/><path d="M8 6l4 4M32 6l-4 4M8 34l4-4M32 34l-4-4"/>'),
  'frameless/povorotno-skladni-systemy': iconWrap('<path d="M4 8h32M4 33h32"/><path d="M6 10l6 22M12 10l-6 22"/><path d="M16 10v22M24 10v22M32 10v22"/>'),
  'frameless/sklyani-rozsuvni-systemy': iconWrap('<path d="M4 8h32M4 33h32"/><rect x="6" y="10" width="12" height="22"/><rect x="14" y="12" width="12" height="20"/><rect x="22" y="10" width="12" height="22"/><path d="M28 21h4"/>'),
  'frameless/giljotynni-systemy': iconWrap('<rect x="6" y="6" width="28" height="28"/><path d="M6 15h28M6 24h28"/><path d="M30 10v10M28 12l2-2 2 2M28 18l2 2 2-2"/>'),
  'frameless/bezporogovi-systemy': iconWrap('<path d="M4 7h32"/><path d="M9 9v24M17 9v24M25 9v24M33 9v24"/><path d="M4 34h4M12 34h4M20 34h4M28 34h4" stroke-dasharray="2 2"/>'),
  'frameless/teple-bezramne-sklinnya': iconWrap('<path d="M4 7h32M4 33h32"/><path d="M11 9v22M14 9v22M26 9v22M29 9v22"/><path d="M20 15v8"/><circle cx="20" cy="26" r="2.5"/>'),
  'frameless/bezramne-sklinnya-balkona': iconWrap('<path d="M4 4v32M4 22h30"/><path d="M4 8h30v14"/><path d="M12 8v14M20 8v14M28 8v14"/><path d="M4 30h30M34 22v8"/>'),
  'frameless/bezramne-sklinnya-terasy': iconWrap('<path d="M3 12l17-7 17 7"/><path d="M6 12v22M34 12v22"/><path d="M12 14v20M18 14v20M24 14v20M30 14v20"/><path d="M3 34h34"/>'),
  'frameless/bezramne-sklinnya-altanky': iconWrap('<path d="M20 4L6 14h28z"/><path d="M8 14v20M32 14v20M14 14v20M26 14v20M20 14v20"/><path d="M5 34h30"/>'),
  'frameless/panoramne-sklinnya': iconWrap('<rect x="3" y="9" width="34" height="22"/><path d="M14 9v22M26 9v22"/><path d="M3 24l8-5 7 4 8-6 11 7"/>'),
  'facade/stiykovo-ryhelne-sklinnya': iconWrap('<rect x="6" y="4" width="28" height="32"/><path d="M6 14h28M6 24h28M15 4v32M25 4v32"/>'),
  'facade/strukturne-sklinnya-fasadu': iconWrap('<rect x="6" y="4" width="28" height="32" stroke-dasharray="3 2"/><path d="M6 14h28M6 24h28M15 4v32M25 4v32" stroke-width="0.8"/>'),
  'facade/sklyani-fasady-budynkiv': iconWrap('<path d="M4 18L20 6l16 12"/><path d="M8 16v18h24V16"/><path d="M13 20h14v14H13z"/><path d="M20 20v14M13 27h14"/>'),
  'facade/enerhoefektyvni-fasady': iconWrap('<rect x="6" y="8" width="20" height="28"/><path d="M6 17h20M6 26h20M16 8v28"/><circle cx="32" cy="8" r="3"/><path d="M32 2v1M32 13v1M26 8h1M37 8h1"/>'),
  'facade/vitrinne-sklinnya': iconWrap('<path d="M4 10h32"/><path d="M6 10l2-5h24l2 5"/><rect x="6" y="12" width="28" height="22"/><path d="M22 12v22M6 34h28"/>'),
  'facade/sklyani-vkhidni-hrupy': iconWrap('<rect x="5" y="6" width="30" height="28"/><path d="M5 12h30"/><path d="M14 12v22M26 12v22"/><path d="M18 24h.01M22 24h.01"/>'),
  'doors/rozpashni-sklyani-dveri': iconWrap('<path d="M8 34V6h24v28"/><path d="M8 6l14 4v28l-14-4"/><path d="M18 21h.01"/><path d="M4 34h32"/>'),
  'doors/rozsuvni-sklyani-dveri': iconWrap('<path d="M4 7h32"/><rect x="7" y="9" width="13" height="25"/><rect x="18" y="9" width="13" height="25"/><path d="M24 21h4M26 19l2 2-2 2"/><path d="M4 34h32"/>'),
  'doors/mayatnykovi-sklyani-dveri': iconWrap('<path d="M20 6v28"/><path d="M20 6l-12 6v22M20 6l12 6v22"/><path d="M4 34h32"/><path d="M14 22l-3 2 3 2M26 22l3 2-3 2"/>'),
  'doors/dveri-v-aliuminiievomu-profili': iconWrap('<rect x="10" y="4" width="20" height="30"/><path d="M10 14h20M10 24h20M20 4v30"/><path d="M4 34h32"/>'),
  'doors/matovi-sklyani-dveri': iconWrap('<rect x="10" y="4" width="20" height="30"/><path d="M13 8l4 4M13 14l10 10M17 8l10 10M23 8l4 4M13 20l10 10"/><path d="M4 34h32"/>'),
  'doors/sklyani-dveri-dlia-ofisu': iconWrap('<rect x="4" y="6" width="32" height="28"/><path d="M4 12h32M16 12v22M26 12v22"/><path d="M19 23h.01"/>'),
  'railings/sklyani-peryla-dlia-skhodiv': iconWrap('<path d="M4 34h8v-6h8v-6h8v-6h8"/><path d="M8 28V16l24-12v12"/><path d="M8 16l24-12"/>'),
  'railings/sklyani-ohorozhi-balkoniv': iconWrap('<path d="M4 22h32"/><path d="M6 22V10h28v12"/><path d="M4 26h32"/><path d="M12 4v6M28 4v6"/>'),
  'railings/sklyani-ohorozhi-teras': iconWrap('<path d="M3 30h34"/><path d="M5 30V16h30v14"/><path d="M15 16v14M25 16v14"/><circle cx="31" cy="7" r="3"/>'),
  'railings/sklyani-ohorozhi-baseiniv': iconWrap('<rect x="4" y="18" width="32" height="14" rx="2"/><path d="M8 25c3-2 5 2 8 0s5 2 8 0 5 2 8 0"/><path d="M6 18V8h28v10"/>'),
  'railings/bezramni-sklyani-ohorozhi': iconWrap('<rect x="6" y="8" width="28" height="20"/><path d="M4 28h32v6H4z"/><path d="M11 12l6 12M18 12l4 8"/>'),
  'railings/sklyani-ohorozhi-na-stiykakh': iconWrap('<path d="M4 8h32"/><path d="M6 8v26M20 8v26M34 8v26"/><rect x="9" y="12" width="8" height="18"/><rect x="23" y="12" width="8" height="18"/>'),
  'railings/ohorozhi-dlia-pryvatnoho-budynku': iconWrap('<path d="M4 18L20 5l16 13"/><path d="M8 16v18h24V16"/><path d="M4 34h32"/><path d="M12 26h16v8H12z"/>'),
};
