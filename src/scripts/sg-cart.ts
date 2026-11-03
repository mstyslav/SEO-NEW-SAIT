// Unified cart store (UA + RU share it): localStorage key «spaceGlassProject» — the same key the configurators
// ("Додати до проєкту"), /project-print/ and /proposal/ already use, so nothing existing breaks.
// Item price is the UNIT price in UAH; missing / 0 means "price to be confirmed".
export const CART_KEY = 'spaceGlassProject';
export type CartItem = {
  id: string; name: string; category?: string; configuration?: string; price?: number | null; quantity: number; image?: string; url?: string;
  kind?: 'led-mirror'; modelId?: number; slug?: string; w?: number; h?: number; options?: Record<string, string>;
};
export type Project = { items: CartItem[]; note?: string; orderId?: string; savedAt?: string };

export function readProject(): Project {
  try {
    const p = JSON.parse(localStorage.getItem(CART_KEY) || '{"items":[],"note":""}');
    return { ...p, items: Array.isArray(p.items) ? p.items : [] };
  } catch { return { items: [], note: '' }; }
}
export function writeProject(p: Project) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(p)); } catch { /* storage blocked */ }
  window.dispatchEvent(new Event('space-glass-project-updated'));
}
export const itemCount = (p = readProject()) => p.items.reduce((n, i) => n + (Number(i.quantity) || 1), 0);

/** Adds a line; the same mirror with the same size and options only raises the quantity, any other combination is a new line. */
export function addItem(item: Omit<CartItem, 'id'>) {
  const p = readProject();
  const same = (i: CartItem) => item.kind === 'led-mirror' && i.kind === 'led-mirror' && i.modelId === item.modelId && i.w === item.w && i.h === item.h
    && JSON.stringify(Object.entries(i.options ?? {}).sort()) === JSON.stringify(Object.entries(item.options ?? {}).sort());
  const hit = p.items.find(same);
  if (hit) { hit.quantity = Math.min(50, (Number(hit.quantity) || 1) + item.quantity); hit.price = item.price; }
  else p.items.push({ ...item, id: `${item.kind ?? 'item'}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` });
  writeProject(p);
}
export const newOrderId = () => (crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`).replace(/[^A-Za-z0-9_-]/g, '');
