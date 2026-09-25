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
  'hub/alu': iconWrap('<path d="M8 6h24v28H8z"/><path d="M12 10h16v20H12z"/><path d="M8 6l4 4M32 6l-4 4M8 34l4-4M32 34l-4-4"/>')
};
