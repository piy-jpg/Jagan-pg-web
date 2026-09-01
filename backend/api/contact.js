const nodemailer = require('nodemailer');

async function sendWhatsAppNotification({
  fullName,
  phone,
  email,
  moveInDate,
  roomPreference,
  message,
}) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const owner = process.env.OWNER_WHATSAPP || '917300212948';
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || 'en_US';

  if (!token || !phoneId || !owner) {
    return { sent: false, reason: 'whatsapp_not_configured' };
  }

  const to = owner.replace(/[^\d]/g, '');
  const bodyLines = [
    `New enquiry from Jagan PG website`,
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email || '-'}`,
    `Move-in: ${moveInDate || '-'}`,
    `Room: ${roomPreference || '-'}`,
    `Message: ${message || '-'}`,
  ];

  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
  const payload = templateName
    ? {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: templateLang },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: fullName },
                { type: 'text', text: phone },
                { type: 'text', text: email || '-' },
                { type: 'text', text: moveInDate || '-' },
                { type: 'text', text: roomPreference || '-' },
                { type: 'text', text: message || '-' },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: bodyLines.join('\n') },
      };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return { sent: false, reason: 'whatsapp_api_error', status: res.status };
  }
  return { sent: true };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    fullName,
    phone,
    email,
    moveInDate,
    roomPreference,
    message,
  } = req.body || {};

  if (!fullName || !phone) {
    res.status(400).json({ error: 'fullName and phone are required' });
    return;
  }

  const emailConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  if (!emailConfigured) {
    res.status(503).json({
      error: 'Enquiry email is not configured yet. Please contact us on WhatsApp.',
    });
    return;
  }

  try {
    const toEmail = process.env.TO_EMAIL || 'piyushverma730929@gmail.com';
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Jagan PG Website" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email || undefined,
      subject: `New Jagan PG enquiry from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email || '-'}`,
        `Move-in date: ${moveInDate || '-'}`,
        `Room preference: ${roomPreference || '-'}`,
        '',
        'Message:',
        message || '-',
      ].join('\n'),
    };

    await transporter.sendMail(mailOptions);

    const waResult = await sendWhatsAppNotification({
      fullName,
      phone,
      email,
      moveInDate,
      roomPreference,
      message,
    });

    res.status(200).json({ ok: true, delivered: true, whatsapp: waResult.sent });
  } catch (e) {
    console.error('Failed to deliver enquiry email:', e);
    res.status(502).json({ error: 'We could not deliver your enquiry. Please try again or contact us on WhatsApp.' });
  }
};
