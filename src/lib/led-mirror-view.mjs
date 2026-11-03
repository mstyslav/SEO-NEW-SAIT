// Presentation helpers shared by the LED mirror catalog and model pages (build time and browser).
export const slugOf = (model) => model.name_short.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/^-|-$/g, '');
export const formatUah = (n) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн`;
export const frameLabel = (model) => (model.frame === 'Металева' ? 'Металева рама' : model.frame);
export const caption = (model) => [model.shape, model.main_light, frameLabel(model)].join(' · ');
export const formatDate = (iso) => iso.split('-').reverse().join('.');
