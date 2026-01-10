const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const CONTACT_EMAIL_PASS = process.env.CONTACT_EMAIL_PASS;

app.post('/contact', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  if (!CONTACT_EMAIL || !CONTACT_EMAIL_PASS) {
    return res.status(500).json({ error: 'Configuracion de correo incompleta.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONTACT_EMAIL,
      pass: CONTACT_EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: CONTACT_EMAIL,
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje,
      html: `<p><b>Nombre:</b> ${nombre}</p><p><b>Email:</b> ${email}</p><p><b>Mensaje:</b> ${mensaje}</p>`,
    });
    res.json({ ok: true, mensaje: 'Mensaje enviado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
