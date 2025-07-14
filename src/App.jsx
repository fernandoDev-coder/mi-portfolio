import './App.css'
import { createSignal } from 'solid-js';

function App() {
  const [nombre, setNombre] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [mensaje, setMensaje] = createSignal('');
  const [enviando, setEnviando] = createSignal(false);
  const [resultado, setResultado] = createSignal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setResultado(null);
    try {
      const res = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre(), email: email(), mensaje: mensaje() }),
      });
      const data = await res.json();
      if (res.ok) {
        setResultado({ ok: true, mensaje: '¡Mensaje enviado correctamente!' });
        setNombre('');
        setEmail('');
        setMensaje('');
      } else {
        setResultado({ ok: false, mensaje: data.error || 'Error al enviar.' });
      }
    } catch (err) {
      setResultado({ ok: false, mensaje: 'Error de conexión con el servidor.' });
    }
    setEnviando(false);
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li><a href="#about">Sobre mí</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
      <div className="container">
        <section id="about">
          <h1>¡Hola! Soy Fernando</h1>
          <p>Bienvenido a mi portafolio personal.</p>
          {/* Aquí puedes agregar una breve descripción sobre ti, tus habilidades y experiencia. */}
        </section>
        <section id="projects">
          <h2>Proyectos</h2>
          <p>Aquí podrás ver algunos de mis proyectos destacados.</p>
          {/* Aquí puedes listar tus proyectos con enlaces, descripciones y tecnologías usadas. */}
        </section>
        <section id="contact">
          <h2>Contacto</h2>
          <p>Puedes contactarme a través de este formulario o por correo electrónico.</p>
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '600px',
              minWidth: '320px',
              margin: '2rem auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              background: 'rgba(20,30,48,0.98)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 24px 0 rgba(31,38,135,0.15)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6dd5ed', fontWeight: 600 }} htmlFor="nombre">Nombre:</label>
              <input id="nombre" type="text" name="nombre" value={nombre()} onInput={e => setNombre(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #2193b0', fontSize: '1rem', background: '#1a2233', color: '#fff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6dd5ed', fontWeight: 600 }} htmlFor="email">Email:</label>
              <input id="email" type="email" name="email" value={email()} onInput={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #2193b0', fontSize: '1rem', background: '#1a2233', color: '#fff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6dd5ed', fontWeight: 600 }} htmlFor="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" value={mensaje()} onInput={e => setMensaje(e.target.value)} required rows={5} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #2193b0', fontSize: '1rem', background: '#1a2233', color: '#fff', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={enviando()} style={{ width: '160px', alignSelf: 'center', padding: '0.8rem', fontSize: '1.1rem', borderRadius: '8px', background: '#6dd5ed', color: '#222', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              {enviando() ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
          {resultado() && (
            <div style={{ color: resultado().ok ? 'green' : 'red', textAlign: 'center' }}>{resultado().mensaje}</div>
          )}
        </section>
      </div>
    </>
  )
}

export default App
