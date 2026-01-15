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
        setResultado({ ok: true, mensaje: 'Mensaje enviado correctamente!' });
        setNombre('');
        setEmail('');
        setMensaje('');
      } else {
        setResultado({ ok: false, mensaje: data.error || 'Error al enviar.' });
      }
    } catch (err) {
      setResultado({ ok: false, mensaje: 'Error de conexion con el servidor.' });
    }
    setEnviando(false);
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li><a href="#about">Sobre mi</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
      <div className="container">
        <section id="about">
          <h1>Hola! Soy Fernando</h1>
          <p>Bienvenido a mi portafolio personal.</p>
          {/**/}
        </section>
        <section id="projects">
          <h2>Proyectos</h2>
          <p>Una seleccion de proyectos en los que he trabajado recientemente.</p>
          <div className="projects-grid">
            <article className="project-card">
              <h3>TerraData</h3>
              <p>
                TerraData es el hub de datos urbanos para ayuntamientos y consultoras. Centraliza
                documentos, mapas y datos en un espacio seguro para coordinar el territorio y
                analizar destinos con rapidez.
              </p>
              <a
                className="project-link"
                href="https://github.com/fernandoDev-coder/TerraData.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver repositorio
              </a>
            </article>
            <article className="project-card">
              <h3>TakeYourSeat</h3>
              <p>
                Mi proyecto de fin de grado: una plataforma unificada para reservar entradas de
                cine en multiples cadenas, con arquitectura escalable para incorporar nuevos cines
                sin cambios estructurales.
              </p>
              <a
                className="project-link"
                href="https://github.com/fernandoDev-coder/proyecto-final.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver repositorio
              </a>
            </article>
          </div>
        </section>
        <section id="contact">
          <h2>Contacto</h2>
          <p>Puedes contactarme a traves de este formulario o por correo electronico.</p>
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
      <footer className="footer">
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/fernando-lara-mill%C3%A1n-754402282/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            className="footer-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.47V9h3.41v1.56h.05c.47-.9 1.6-1.85 3.3-1.85 3.53 0 4.18 2.33 4.18 5.36v6.38zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
      </footer>
    </>
  )
}

export default App
