export type KommoLeadPayload = {
  source: 'website';
  locale: 'uk' | 'ru' | 'en' | 'de';
  name: string;
  phone: string;
  email?: string;
  city?: string;
  comment?: string;
  product?: string;
  configuration?: string;
  estimatedPrice?: string;
  /** Site path the request was sent from (forms.js posts it as `source`). */
  page?: string;
  project?: unknown;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

export function createKommoPayload(input: Partial<Omit<KommoLeadPayload, 'source'>> & { source?: string }): KommoLeadPayload {
  // forms.js sends the page path in `source`; keep it instead of losing it to the constant.
  const pagePath = input.page ?? (typeof input.source === 'string' && input.source.startsWith('/') ? input.source : undefined);
  return {
    source: 'website',
    locale: input.locale ?? 'uk',
    name: input.name ?? '',
    phone: input.phone ?? '',
    email: input.email,
    city: input.city,
    comment: input.comment,
    product: input.product,
    configuration: input.configuration,
    estimatedPrice: input.estimatedPrice,
    page: pagePath,
    project: input.project,
    utm: input.utm,
  };
}

/*
Production connection will be implemented through a secure server endpoint.
Never expose a Kommo access token in browser JavaScript.
*/
