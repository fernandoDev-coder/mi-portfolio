const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  // Configura el transporte de Nodemailer (puedes cambiar a tu proveedor real)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fernandolaramillan@gmail.com', // Cambia por tu correo
      pass: 'oekn djtx ctnp khia', // Usa una contraseña de aplicación si tienes 2FA
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'fernandolaramillan@gmail.com',
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje,
      html: `<p><b>Nombre:</b> ${nombre}</p><p><b>Email:</b> ${email}</p><p><b>Mensaje:</b> ${mensaje}</p>`
    });
    res.json({ ok: true, mensaje: 'Mensaje enviado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
}); 