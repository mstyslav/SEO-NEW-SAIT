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
};
