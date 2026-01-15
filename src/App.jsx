import './App.css'
import { createEffect, createSignal, onMount } from 'solid-js';

function App() {
  const [nombre, setNombre] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [mensaje, setMensaje] = createSignal('');
  const [enviando, setEnviando] = createSignal(false);
  const [resultado, setResultado] = createSignal(null);
  const [idioma, setIdioma] = createSignal('es');

  onMount(() => {
    const stored = localStorage.getItem('portfolio-lang');
    if (stored === 'es' || stored === 'en') {
      setIdioma(stored);
      return;
    }

    const browserLang = navigator.language?.toLowerCase() || '';
    setIdioma(browserLang.startsWith('es') ? 'es' : 'en');
  });

  createEffect(() => {
    localStorage.setItem('portfolio-lang', idioma());
  });

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
          <li><a href="#about">{idioma() === 'en' ? 'About Me' : 'Sobre mi'}</a></li>
          <li><a href="#projects">{idioma() === 'en' ? 'Projects' : 'Proyectos'}</a></li>
          <li><a href="#contact">{idioma() === 'en' ? 'Contact' : 'Contacto'}</a></li>
        </ul>
      </nav>

      <div className="container">
        <section id="about">
          <h1>Hola! Soy Fernando</h1>
          <p>Bienvenido a mi portafolio personal.</p>
          {/* Aqui puedes agregar una breve descripcion sobre ti, tus habilidades y experiencia. */}
        </section>
        <section id="projects">
          <h2>{idioma() === 'en' ? 'Projects' : 'Proyectos'}</h2>
          <p>
            {idioma() === 'en'
              ? 'A selection of projects I have worked on recently.'
              : 'Una seleccion de proyectos en los que he trabajado recientemente.'}
          </p>
          <div className="projects-grid">
            <article className="project-card">
              <h3>TerraData</h3>
              <p>
                {idioma() === 'en'
                  ? 'TerraData is the urban data hub for municipalities and consultancies. It centralizes documents, maps, and data in a secure space to coordinate territory and analyze destinations quickly.'
                  : 'TerraData es el hub de datos urbanos para ayuntamientos y consultoras. Centraliza documentos, mapas y datos en un espacio seguro para coordinar el territorio y analizar destinos con rapidez.'}
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
                {idioma() === 'en'
                  ? "My capstone project: a unified platform to book cinema tickets across multiple chains, with scalable architecture to add new theaters without structural changes."
                  : 'Mi proyecto de fin de grado: una plataforma unificada para reservar entradas de cine en multiples cadenas, con arquitectura escalable para incorporar nuevos cines sin cambios estructurales.'}
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
          <h2>{idioma() === 'en' ? 'Contact' : 'Contacto'}</h2>
          <p>
            {idioma() === 'en'
              ? 'You can reach me through this form or by email.'
              : 'Puedes contactarme a traves de este formulario o por correo electronico.'}
          </p>
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '600px',
              minWidth: '320px',
              margin: '2rem auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              background: 'rgba(255, 250, 242, 0.96)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(122, 94, 63, 0.18)',
              border: '1px solid #c5a985'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6e8a6e', fontWeight: 600 }} htmlFor="nombre">
                {idioma() === 'en' ? 'Name:' : 'Nombre:'}
              </label>
              <input id="nombre" type="text" name="nombre" value={nombre()} onInput={e => setNombre(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #c5a985', fontSize: '1rem', background: '#fffaf2', color: '#2f241b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6e8a6e', fontWeight: 600 }} htmlFor="email">
                Email:
              </label>
              <input id="email" type="email" name="email" value={email()} onInput={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #c5a985', fontSize: '1rem', background: '#fffaf2', color: '#2f241b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ color: '#6e8a6e', fontWeight: 600 }} htmlFor="mensaje">
                {idioma() === 'en' ? 'Message:' : 'Mensaje:'}
              </label>
              <textarea id="mensaje" name="mensaje" value={mensaje()} onInput={e => setMensaje(e.target.value)} required rows={5} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #c5a985', fontSize: '1rem', background: '#fffaf2', color: '#2f241b', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={enviando()} style={{ width: '160px', alignSelf: 'center', padding: '0.8rem', fontSize: '1.1rem', borderRadius: '8px', background: '#8fb48f', color: '#2f241b', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              {enviando()
                ? (idioma() === 'en' ? 'Sending...' : 'Enviando...')
                : (idioma() === 'en' ? 'Send' : 'Enviar')}
            </button>
          </form>
          {resultado() && (
            <div style={{ color: resultado().ok ? 'green' : 'red', textAlign: 'center' }}>
              {resultado().mensaje}
            </div>
          )}
        </section>
      </div>
      <footer className="footer">
        <span>
          {idioma() === 'en' ? 'Thanks for visiting my portfolio.' : 'Gracias por visitar mi portafolio.'}
        </span>
      </footer>
    </>
  )
}

export default App
