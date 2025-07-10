import './App.css'

function App() {
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
          {/* Aquí puedes agregar un formulario de contacto o tus datos de contacto. */}
        </section>
      </div>
    </>
  )
}

export default App
