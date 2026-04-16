import { escapeHtml, getClientIp, isRateLimited, validatePayload } from './_lib/contact.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo no permitido.' });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intentalo de nuevo en unos minutos.' });
  }

  const { errors, sanitized } = validatePayload(req.body || {});

  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(500).json({ error: 'La configuracion del formulario no esta completa.' });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h2>Nuevo contacto desde el portfolio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(sanitized.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(sanitized.email)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(sanitized.company || 'No indicada')}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(sanitized.subject)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(sanitized.message).replace(/\n/g, '<br />')}</p>
    </div>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: sanitized.email,
        subject: `[Portfolio] ${sanitized.subject}`,
        html,
      }),
    });

    const resendPayload = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      const errorMessage =
        resendPayload?.message || resendPayload?.error || 'Resend no ha aceptado la solicitud.';
      throw new Error(errorMessage);
    }

    return res.status(200).json({
      ok: true,
      message: 'Mensaje enviado correctamente. Respondere lo antes posible.',
    });
  } catch (error) {
    return res.status(502).json({
      error: 'No se pudo entregar el mensaje en este momento. Vuelve a intentarlo mas tarde.',
      detail: error.message,
    });
  }
}
