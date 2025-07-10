import './App.css'

function TakeYourSeat() {
  return (
    <section>
      <h2>TakeYourSeat</h2>
      <p>Aplicación para gestión de reservas de asientos. Aquí puedes agregar una descripción detallada, imágenes y características del proyecto.</p>
      {/* Ejemplo de imagen (reemplaza la ruta por la tuya): */}
      {/* <img src="/ruta/a/tu/imagen.jpg" alt="TakeYourSeat screenshot" style={{maxWidth: '400px'}} /> */}
      <h3>Características principales</h3>
      <ul>
        <li>Reserva de asientos en tiempo real</li>
        <li>Panel de administración</li>
        <li>Notificaciones y recordatorios</li>
        {/* Agrega más características aquí */}
      </ul>
      <h3>Tecnologías usadas</h3>
      <ul>
        <li>SolidJS</li>
        <li>Vite</li>
        <li>CSS</li>
        {/* Agrega más tecnologías aquí */}
      </ul>
      <h3>Enlaces</h3>
      <ul>
        <li><a href="https://github.com/fernandodev-coder/takeyourseat" target="_blank" rel="noopener noreferrer">Repositorio en GitHub</a></li>
        {/* <li><a href="https://takeyourseat-demo.com" target="_blank" rel="noopener noreferrer">Demo</a></li> */}
      </ul>
    </section>
  )
}

export default TakeYourSeat 