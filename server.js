const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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

  try {
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
      const err = await res.text().catch(() => '');
      console.warn('WhatsApp API error', res.status, err);
      return { sent: false, reason: 'whatsapp_api_error', status: res.status };
    }
    return { sent: true };
  } catch (e) {
    console.warn('WhatsApp send failed', e);
    return { sent: false, reason: 'whatsapp_exception' };
  }
}

app.use(express.static(path.join(__dirname)));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const {
    fullName,
    phone,
    email,
    moveInDate,
    roomPreference,
    message,
  } = req.body || {};

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'fullName and phone are required' });
  }

  try {
    const toEmail = process.env.TO_EMAIL || 'piyushverma730929@gmail.com';
    let emailDelivered = false;
    const emailConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (emailConfigured) {
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
        from: `"Jagan PG Website" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: `New enquiry from ${fullName}`,
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
      emailDelivered = true;
    } else {
      console.warn('Email transport not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL in .env');
      console.log('Contact submission:', {
        fullName,
        phone,
        email,
        moveInDate,
        roomPreference,
        message,
      });
    }

    const waResult = await sendWhatsAppNotification({
      fullName,
      phone,
      email,
      moveInDate,
      roomPreference,
      message,
    });

    res.json({ ok: true, delivered: emailDelivered, whatsapp: waResult.sent });
  } catch (err) {
    console.error('Failed to send email:', err);
    res.status(500).json({ error: 'Failed to process enquiry' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
