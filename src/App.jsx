import './App.css'
import { Routes, Route, Link } from 'solid-app-router'
import TakeYourSeat from './TakeYourSeat.jsx'

function App() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li><Link href="/">Sobre mí</Link></li>
          <li><Link href="/proyectos">Proyectos</Link></li>
          <li><Link href="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/takeyourseat" element={<TakeYourSeat />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

function Home() {
  return (
    <section id="about">
      <h1>¡Hola! Soy Fernando</h1>
      <p>Bienvenido a mi portafolio personal.</p>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <h2>Proyectos</h2>
      <ul>
        <li>
          <Link href="/proyectos/takeyourseat">TakeYourSeat</Link> - Aplicación para gestión de reservas de asientos.
        </li>
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact">
      <h2>Contacto</h2>
      <p>Puedes contactarme a través de este formulario o por correo electrónico.</p>
    </section>
  )
}

export default App
