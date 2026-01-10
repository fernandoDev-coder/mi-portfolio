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
          <div className="about-hero">
            <div className="about-text">
              <h1>{idioma() === 'en' ? "Hi! I'm Fernando" : 'Hola! Soy Fernando'}</h1>
              <p>{idioma() === 'en' ? 'Welcome to my personal portfolio.' : 'Bienvenido a mi portafolio personal.'}</p>
              <div className="about-actions">
                <a
                  className="linkedin-button"
                  href="https://www.linkedin.com/in/fernando-lara-mill%C3%A1n-754402282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="linkedin-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.47V9h3.41v1.56h.05c.47-.9 1.6-1.85 3.3-1.85 3.53 0 4.18 2.33 4.18 5.36v6.38zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  className="linkedin-button"
                  href="https://github.com/fernandoDev-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="linkedin-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .5c-6.63 0-12 5.5-12 12.29 0 5.42 3.44 10.01 8.21 11.64.6.12.82-.27.82-.6 0-.29-.01-1.05-.02-2.06-3.34.75-4.04-1.65-4.04-1.65-.55-1.42-1.35-1.8-1.35-1.8-1.1-.79.08-.77.08-.77 1.22.09 1.86 1.29 1.86 1.29 1.08 1.9 2.83 1.35 3.52 1.04.11-.82.42-1.35.76-1.66-2.66-.31-5.47-1.37-5.47-6.11 0-1.35.46-2.46 1.22-3.33-.12-.31-.53-1.56.12-3.26 0 0 1-.33 3.3 1.27a11.1 11.1 0 0 1 3.01-.42c1.02 0 2.05.14 3.01.42 2.3-1.6 3.3-1.27 3.3-1.27.65 1.7.24 2.95.12 3.26.76.87 1.22 1.98 1.22 3.33 0 4.75-2.81 5.8-5.49 6.1.43.38.81 1.12.81 2.26 0 1.63-.01 2.95-.01 3.35 0 .33.22.73.82.6C20.56 22.8 24 18.21 24 12.79 24 6 18.63.5 12 .5z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <div
                  className={`about-toggle ${idioma()}`}
                  role="group"
                  aria-label="Cambiar idioma"
                >
                  <button
                    type="button"
                    className={idioma() === 'es' ? 'is-active' : ''}
                    onClick={() => setIdioma('es')}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    className={idioma() === 'en' ? 'is-active' : ''}
                    onClick={() => setIdioma('en')}
                  >
                    EN
                  </button>
                </div>
              </div>
              <div className="about-bio">
                {idioma() === 'en' ? (
                  <>
                    <h2>About Me</h2>
                    <ul>
                      <li>Backend-focused Software Developer with a strong foundation in Python and automation.</li>
                      <li>Professional background in SAP ABAP, working with enterprise systems and business logic.</li>
                      <li>Experience building and deploying services using Docker and Kubernetes from a previous DevOps-oriented role.</li>
                      <li>Strong interest in clean architecture, automation, and maintainable backend solutions.</li>
                      <li>Continuous learner: I enjoy researching, experimenting, and building side projects independently.</li>
                      <li>Although my main focus is backend development, in my free time I also work on frontend projects using TypeScript, JavaScript, among other technologies.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2>Sobre mi</h2>
                    <ul>
                      <li>Desarrollador de software especializado en backend, con fuerte formacion en Python y automatizacion.</li>
                      <li>Formacion y experiencia profesional en SAP ABAP, trabajando con logica de negocio y sistemas empresariales.</li>
                      <li>Experiencia previa en un rol orientado a DevOps, utilizando Docker y Kubernetes en entornos reales.</li>
                      <li>Interes especial en arquitecturas limpias, automatizacion y soluciones backend mantenibles y escalables.</li>
                      <li>Me gusta investigar, aprender y desarrollar proyectos propios de forma constante.</li>
                      <li>Aunque mi perfil esta orientado al backend, en mi tiempo libre tambien desarrollo proyectos frontend utilizando TypeScript, JavaScript, entre otras tecnologias.</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
            <img
              className="about-photo"
              src={`${import.meta.env.BASE_URL}images/fotoperfil.jpeg`}
              alt="Foto de Fernando"
            />
          </div>
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
