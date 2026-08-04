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

  /*
   TODO for production:
   1. Add KOMMO_SUBDOMAIN, KOMMO_ACCESS_TOKEN and KOMMO_PIPELINE_ID to server env.
   2. Find or create contact by phone/email.
   3. Create lead in the selected pipeline.
   4. Add configuration/project details as notes or custom fields.
   5. Upload attached files using Kommo file API.
  */

  return new Response(
    JSON.stringify({
      ok: true,
      mode: 'prepared',
      message: 'Kommo payload is valid. Production credentials are not connected yet.',
      payload,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
};
