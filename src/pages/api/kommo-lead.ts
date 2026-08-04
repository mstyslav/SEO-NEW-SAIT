import type { APIRoute } from 'astro';
import { createKommoPayload } from '../../integrations/kommo';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const payload = createKommoPayload(body);

  if (!payload.name || !payload.phone) {
    return new Response(
      JSON.stringify({ ok: false, error: 'name_and_phone_required' }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  const subdomain = import.meta.env.KOMMO_SUBDOMAIN;
  const token = import.meta.env.KOMMO_ACCESS_TOKEN;
  const pipelineId = Number(import.meta.env.KOMMO_PIPELINE_ID || 0);
  if (!subdomain || !token) {
    return new Response(JSON.stringify({ ok: false, error: 'crm_not_configured' }), {
      status: 503, headers: { 'content-type': 'application/json' }
    });
  }

  const note = [payload.comment, payload.city && `Місто: ${payload.city}`, payload.product && `Виріб: ${payload.product}`, payload.configuration && `Конфігурація: ${payload.configuration}`, payload.estimatedPrice && `Оцінка: ${payload.estimatedPrice}`].filter(Boolean).join('\n');
  const lead = [{
    name: `Сайт — ${payload.name}`,
    pipeline_id: pipelineId || undefined,
    _embedded: { contacts: [{
      first_name: payload.name,
      custom_fields_values: [
        { field_code: 'PHONE', values: [{ value: payload.phone, enum_code: 'WORK' }] },
        ...(payload.email ? [{ field_code: 'EMAIL', values: [{ value: payload.email, enum_code: 'WORK' }] }] : [])
      ]
    }] }
  }];
  const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/complex`, { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify(lead) });
  if (!response.ok) return new Response(JSON.stringify({ ok: false, error: 'crm_rejected_request' }), { status: 502, headers: { 'content-type': 'application/json' } });
  const result = await response.json();
  const leadId = result?.[0]?.id;
  if (leadId && note) await fetch(`https://${subdomain}.kommo.com/api/v4/leads/notes`, { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify([{ entity_id: leadId, note_type: 'common', params: { text: note } }]) });

  return new Response(
    JSON.stringify({
      ok: true,
      leadId,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
};
