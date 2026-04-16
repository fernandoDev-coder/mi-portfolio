import './App.css'
import { For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import {
  siCss,
  siDocker,
  siGit,
  siHtml5,
  siJavascript,
  siKubernetes,
  siMysql,
  siOpenjdk,
  siPhp,
  siPython,
  siSap,
  siSqlite,
  siTypescript,
} from 'simple-icons'

const profileImageUrl = `${import.meta.env.BASE_URL}images/fotoperfil.jpeg`
const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/contact'
const languageStorageKey = 'portfolio-language'

const skillIcons = {
  Python: { title: 'Python', path: siPython.path },
  JavaScript: { title: 'JavaScript', path: siJavascript.path },
  TypeScript: { title: 'TypeScript', path: siTypescript.path },
  PHP: { title: 'PHP', path: siPhp.path },
  Java: { title: 'Java', path: siOpenjdk.path },
  HTML5: { title: 'HTML5', path: siHtml5.path },
  CSS3: { title: 'CSS3', path: siCss.path },
  Docker: { title: 'Docker', path: siDocker.path },
  Kubernetes: { title: 'Kubernetes', path: siKubernetes.path },
  MySQL: { title: 'MySQL', path: siMysql.path },
  SQLite: { title: 'SQLite', path: siSqlite.path },
  Git: { title: 'Git', path: siGit.path },
  'VS Code': {
    title: 'VS Code',
    path: 'M17.01 3.34 21.5 5.5a.75.75 0 0 1 .43.67v11.66a.75.75 0 0 1-.43.67l-4.49 2.16a.75.75 0 0 1-.81-.11l-8.6-7.84-3.76 2.86a.5.5 0 0 1-.8-.4v-6.34a.5.5 0 0 1 .2-.4l3.76-2.86 8.6-7.84a.75.75 0 0 1 .81-.11ZM17 6.08 9.38 12 17 17.92V6.08Z',
  },
  'SAP ABAP': { title: 'SAP', path: siSap.path },
  SQL: {
    title: 'SQL',
    path: 'M12 2C7 2 3 3.79 3 6v12c0 2.21 4 4 9 4s9-1.79 9-4V6c0-2.21-4-4-9-4Zm0 2c4.42 0 7 .99 7 2s-2.58 2-7 2-7-.99-7-2 2.58-2 7-2Zm0 16c-4.42 0-7-.99-7-2v-2c1.65 1.08 4.51 1.62 7 1.62s5.35-.54 7-1.62v2c0 1.01-2.58 2-7 2Zm0-6c-4.42 0-7-.99-7-2v-2c1.65 1.08 4.51 1.62 7 1.62s5.35-.54 7-1.62v2c0 1.01-2.58 2-7 2Z',
  },
  'Integracion de procesos': {
    title: 'Integracion',
    path: 'M9 4h6v4h3l-6 6-6-6h3V4Zm-4 9h4v3h6v-3h4v7H5v-7Z',
  },
  'Mantenimiento evolutivo': {
    title: 'Mantenimiento',
    path: 'm14.7 6.3 3 3-8.4 8.4H6.3v-2.9l8.4-8.5ZM16.1 4.9l1.4-1.4a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-1.4 1.4-3-3Z',
  },
  Automatizacion: {
    title: 'Automatizacion',
    path: 'M12 2 4 6v6c0 5 3.4 9.74 8 11 4.6-1.26 8-6 8-11V6l-8-4Zm-1 14-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z',
  },
  'Arquitectura limpia': {
    title: 'Arquitectura',
    path: 'M3 19h18v2H3v-2Zm2-2V9l7-4 7 4v8h-2v-7.8l-5-2.85L7 9.2V17H5Zm5 0v-5h4v5h-4Z',
  },
  'Colaboracion con negocio': {
    title: 'Colaboracion',
    path: 'M7 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM7 13c2.67 0 8 1.34 8 4v3H-1v-3c0-2.66 5.33-4 8-4Zm10 0c-.29 0-.62.02-.97.05 1.33.96 1.97 2.12 1.97 3.45v3h6v-3c0-2.66-5.33-4-8-4Z',
  },
  'Enfoque en estabilidad': {
    title: 'Estabilidad',
    path: 'M12 3 4 7v5c0 5.05 3.41 9.78 8 11 4.59-1.22 8-5.95 8-11V7l-8-4Zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5 10.1c-1.39 1.62-3.07 2.82-5 3.4-1.93-.58-3.61-1.78-5-3.4V16c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5v1.1Z',
  },
}

function SkillIcon(props) {
  const icon = () => skillIcons[props.name] || skillIcons.SQL

  return (
    <span class="tag-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" focusable="false">
        <title>{icon().title}</title>
        <path d={icon().path} />
      </svg>
    </span>
  )
}

const content = {
  es: {
    nav: ['Sobre mí', 'Experiencia', 'Habilidades', 'Contribuciones', 'Formación', 'Contacto'],
    eyebrow: 'Backend Developer | SAP ABAP | Python Automation | SQL',
    heroRole:
      'Perfil backend orientado a software empresarial, automatización técnica y mantenimiento fiable de aplicaciones.',
    heroSummary:
      'Desarrollador especializado en SAP ABAP, automatización con Python, SQL y soporte técnico en entornos enterprise. Actualmente trabajo en Proceed Group desarrollando módulos backend en SAP, automatizaciones internas y ajustes puntuales sobre SAP Fiori.',
    primaryCta: 'Contactar',
    secondaryCta: 'Ver contribuciones',
    highlightsLabel: 'Especialidades clave',
    profileStatus: 'Actualmente en Proceed Group',
    profileTitle: 'Backend focused',
    profileText:
      'Desarrollo técnico con criterio de mantenimiento, estabilidad operativa y adaptación a entornos SAP y software empresarial.',
    aboutKicker: 'Sobre mí',
    aboutTitle: 'Backend con enfoque enterprise y una base técnica sólida.',
    aboutParagraphs: [
      'Desarrollador de software especializado en backend, con fuerte formación en Python y automatización.',
      'Formación y experiencia profesional en SAP ABAP, trabajando con lógica de negocio y sistemas empresariales.',
      'Experiencia previa en un rol orientado a DevOps, utilizando Docker y Kubernetes en entornos reales.',
      'Interés especial en arquitecturas limpias, automatización y soluciones backend mantenibles y escalables.',
      'Me gusta investigar, aprender y desarrollar proyectos propios de forma constante.',
      'Aunque mi perfil está orientado al backend, en mi tiempo libre también desarrollo proyectos frontend utilizando TypeScript, JavaScript y otras tecnologías.',
    ],
    experienceKicker: 'Experiencia',
    experienceTitle: 'Experiencia profesional actual.',
    experienceItems: [
      {
        period: 'Actualidad',
        role: 'Backend Developer',
        company: 'Proceed Group',
        description:
          'Desarrollo de módulos backend en SAP, automatizaciones en Python y soporte técnico sobre aplicaciones empresariales con foco en continuidad operativa y mantenimiento evolutivo.',
        highlights: [
          'Implementación y ajuste de lógica backend en entornos SAP ABAP.',
          'Automatización de tareas y procesos internos con Python.',
          'Colaboración en pequeños ajustes de SAP Fiori y soporte funcional.',
          'Mantenimiento técnico orientado a estabilidad, trazabilidad y fiabilidad.',
        ],
      },
    ],
    skillsKicker: 'Habilidades',
    skillsTitle: 'Capacidad técnica organizada por áreas de trabajo.',
    skillGroups: [
      {
        title: 'Stack principal',
        items: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'HTML5', 'CSS3'],
      },
      {
        title: 'Backend y enterprise',
        items: ['SAP ABAP', 'SQL', 'Integracion de procesos', 'Mantenimiento evolutivo'],
      },
      {
        title: 'Tools y DevOps',
        items: ['Docker', 'Kubernetes', 'MySQL', 'SQLite', 'Git', 'VS Code'],
      },
      {
        title: 'Trabajo técnico',
        items: ['Automatizacion', 'Arquitectura limpia', 'Colaboracion con negocio', 'Enfoque en estabilidad'],
      },
    ],
    projectsKicker: 'Proyectos y contribuciones',
    projectsTitle: 'Contribuciones relevantes y una selección de proyectos.',
    contributions: [
      {
        title: 'Desarrollo backend SAP',
        subtitle: 'Trabajo profesional actual',
        text:
          'Construccion y ajuste de logica backend en entornos SAP para dar soporte a procesos empresariales y necesidades de mantenimiento tecnico.',
        tags: ['SAP ABAP', 'Enterprise Software', 'Backend'],
      },
      {
        title: 'Automatizacion con Python',
        subtitle: 'Contribución operativa',
        text:
          'Automatización de tareas repetitivas y flujos internos para reducir fricción operativa y mejorar la consistencia en procesos de soporte y mantenimiento.',
        tags: ['Python', 'Automation', 'Operational Efficiency'],
      },
      {
        title: 'Soporte y mantenimiento',
        subtitle: 'Entornos empresariales',
        text:
          'Resolución de incidencias, análisis técnico y pequeños ajustes en aplicaciones de negocio con una aproximación orientada a continuidad y fiabilidad.',
        tags: ['Support', 'Maintenance', 'Reliability'],
      },
      {
        title: 'Ajustes SAP Fiori',
        subtitle: 'Colaboración funcional',
        text:
          'Apoyo en mejoras puntuales sobre SAP Fiori para alinear la capa de interfaz con necesidades concretas del entorno SAP y sus flujos asociados.',
        tags: ['SAP Fiori', 'SAP', 'UI Adjustments'],
      },
      {
        title: 'TerraData',
        subtitle: 'Proyecto seleccionado',
        text:
          'Proyecto orientado a centralizar datos, documentación y recursos de análisis en un mismo espacio de trabajo, con un enfoque claro en estructura y organización de información.',
        tags: ['Data Hub', 'Architecture', 'Structured Information'],
        link: 'https://github.com/fernandoDev-coder/TerraData.git',
      },
      {
        title: 'TakeYourSeat',
        subtitle: 'Proyecto de fin de grado',
        text:
          'Plataforma unificada para reserva de entradas de cine concebida con una arquitectura preparada para extender nuevas cadenas sin rehacer la base funcional.',
        tags: ['Final Degree Project', 'Scalable Design', 'Backend Thinking'],
        link: 'https://github.com/fernandoDev-coder/proyecto-final.git',
      },
    ],
    referenceLink: 'Ver referencia',
    educationKicker: 'Formación y certificaciones',
    educationTitle: 'Formación y desarrollo profesional.',
    educationItems: [
      {
        title: 'Idiomas',
        meta: 'Comunicación profesional',
        text: 'Inglés B2 certificado y español nativo.',
      },
      {
        title: 'Proyecto de fin de grado',
        meta: 'TakeYourSeat',
        text:
          'Trabajo académico orientado a diseñar una plataforma escalable con atención a estructura, extensibilidad y organización de la lógica de aplicación.',
      },
      {
        title: 'Especialización aplicada',
        meta: 'Backend, SAP y automatización',
        text:
          'Perfil construido sobre experiencia práctica en SAP ABAP, Python, SQL, mantenimiento de aplicaciones empresariales y soporte técnico.',
      },
    ],
    contactKicker: 'Contacto',
    contactTitle: 'Contacto profesional.',
    directChannels: 'Hablemos',
    contactCopy:
      'Si quieres contactar conmigo, aquí tienes un par de canales directos. Mi correo es fernandolaramillan@gmail.com.',
    contactLinks: [
      { label: 'Email', value: 'fernandolaramillan@gmail.com', href: 'mailto:fernandolaramillan@gmail.com' },
      { label: 'GitHub', value: 'github.com/fernandoDev-coder', href: 'https://github.com/fernandoDev-coder' },
    ],
    fields: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      subject: 'Asunto',
      message: 'Mensaje',
      honeypot: 'No rellenar',
    },
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    footer: 'Backend Developer especializado en SAP ABAP, Python y software empresarial.',
    errors: {
      name: 'Introduce tu nombre.',
      emailRequired: 'Introduce un email de contacto.',
      emailInvalid: 'Introduce un email válido.',
      company: 'El nombre de empresa es demasiado largo.',
      subject: 'Indica el motivo del contacto.',
      messageRequired: 'Escribe un mensaje.',
      messageShort: 'El mensaje debe tener al menos 30 caracteres.',
      review: 'Revisa los campos marcados y vuelve a intentarlo.',
      submit: 'No se pudo enviar el mensaje.',
      unexpected: 'Ha ocurrido un error al enviar el formulario.',
    },
    states: {
      sending: 'Enviando mensaje...',
      success: 'Mensaje enviado correctamente.',
    },
    ariaHome: 'Ir al inicio',
    ariaNav: 'Navegación principal',
    langLabel: 'Idioma',
  },
  en: {
    nav: ['About', 'Experience', 'Skills', 'Contributions', 'Education', 'Contact'],
    eyebrow: 'Backend Developer | SAP ABAP | Python Automation | SQL',
    heroRole:
      'Backend profile focused on enterprise software, technical automation, and reliable application maintenance.',
    heroSummary:
      'Developer specialized in SAP ABAP, Python automation, SQL, and technical support in enterprise environments. I currently work at Proceed Group building SAP backend modules, internal automations, and small SAP Fiori adjustments.',
    primaryCta: 'Contact',
    secondaryCta: 'View contributions',
    highlightsLabel: 'Core specializations',
    profileStatus: 'Currently at Proceed Group',
    profileTitle: 'Backend focused',
    profileText:
      'Technical development centered on maintainability, operational stability, and adaptation to SAP and enterprise software environments.',
    aboutKicker: 'About',
    aboutTitle: 'Backend with an enterprise mindset and a solid technical foundation.',
    aboutParagraphs: [
      'Backend-focused software developer with a strong foundation in Python and automation.',
      'Professional background in SAP ABAP, working with enterprise systems and business logic.',
      'Previous experience in a DevOps-oriented role, using Docker and Kubernetes in real environments.',
      'Strong interest in clean architecture, automation, and maintainable, scalable backend solutions.',
      'I enjoy researching, learning, and building side projects independently on a continuous basis.',
      'Although my main focus is backend development, in my free time I also build frontend projects using TypeScript, JavaScript, and other technologies.',
    ],
    experienceKicker: 'Experience',
    experienceTitle: 'Current professional experience.',
    experienceItems: [
      {
        period: 'Present',
        role: 'Backend Developer',
        company: 'Proceed Group',
        description:
          'Backend SAP module development, Python automations, and technical support for business applications with a focus on operational continuity and evolutionary maintenance.',
        highlights: [
          'Implementation and adjustment of backend logic in SAP ABAP environments.',
          'Automation of internal tasks and processes with Python.',
          'Collaboration on small SAP Fiori adjustments and functional support.',
          'Technical maintenance focused on stability, traceability, and reliability.',
        ],
      },
    ],
    skillsKicker: 'Skills',
    skillsTitle: 'Technical capabilities grouped by work area.',
    skillGroups: [
      {
        title: 'Main stack',
        items: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'HTML5', 'CSS3'],
      },
      {
        title: 'Backend and enterprise',
        items: ['SAP ABAP', 'SQL', 'Process integration', 'Evolutionary maintenance'],
      },
      {
        title: 'Tools and DevOps',
        items: ['Docker', 'Kubernetes', 'MySQL', 'SQLite', 'Git', 'VS Code'],
      },
      {
        title: 'Technical work',
        items: ['Automation', 'Clean architecture', 'Business collaboration', 'Stability mindset'],
      },
    ],
    projectsKicker: 'Projects & Contributions',
    projectsTitle: 'Relevant contributions and selected projects.',
    contributions: [
      {
        title: 'SAP backend development',
        subtitle: 'Current professional work',
        text:
          'Build and adjustment of backend logic in SAP environments to support business processes and technical maintenance needs.',
        tags: ['SAP ABAP', 'Enterprise Software', 'Backend'],
      },
      {
        title: 'Python automation',
        subtitle: 'Operational contribution',
        text:
          'Automation of repetitive tasks and internal flows to reduce operational friction and improve consistency across support and maintenance processes.',
        tags: ['Python', 'Automation', 'Operational Efficiency'],
      },
      {
        title: 'Support and maintenance',
        subtitle: 'Enterprise environments',
        text:
          'Incident resolution, technical analysis, and small business application adjustments with an approach centered on continuity and reliability.',
        tags: ['Support', 'Maintenance', 'Reliability'],
      },
      {
        title: 'SAP Fiori adjustments',
        subtitle: 'Functional collaboration',
        text:
          'Support in targeted SAP Fiori improvements to align the interface layer with concrete SAP environment needs and related flows.',
        tags: ['SAP Fiori', 'SAP', 'UI Adjustments'],
      },
      {
        title: 'TerraData',
        subtitle: 'Selected project',
        text:
          'Project focused on centralizing data, documentation, and analysis resources in one workspace, with a clear emphasis on structure and information organization.',
        tags: ['Data Hub', 'Architecture', 'Structured Information'],
        link: 'https://github.com/fernandoDev-coder/TerraData.git',
      },
      {
        title: 'TakeYourSeat',
        subtitle: 'Final degree project',
        text:
          'Unified cinema ticket booking platform designed with an architecture prepared to extend new chains without reworking the functional base.',
        tags: ['Final Degree Project', 'Scalable Design', 'Backend Thinking'],
        link: 'https://github.com/fernandoDev-coder/proyecto-final.git',
      },
    ],
    referenceLink: 'View reference',
    educationKicker: 'Education & Certifications',
    educationTitle: 'Education and professional development.',
    educationItems: [
      {
        title: 'Languages',
        meta: 'Professional communication',
        text: 'English B2 certified and native Spanish.',
      },
      {
        title: 'Final degree project',
        meta: 'TakeYourSeat',
        text:
          'Academic work focused on designing a scalable platform with attention to structure, extensibility, and application logic organization.',
      },
      {
        title: 'Applied specialization',
        meta: 'Backend, SAP, and automation',
        text:
          'Profile built on practical experience in SAP ABAP, Python, SQL, business application maintenance, and technical support.',
      },
    ],
    contactKicker: 'Contact',
    contactTitle: 'Professional contact.',
    directChannels: 'Get in touch',
    contactCopy:
      'If you would like to get in touch, here are a couple of direct channels. My email is fernandolaramillan@gmail.com.',
    contactLinks: [
      { label: 'Email', value: 'fernandolaramillan@gmail.com', href: 'mailto:fernandolaramillan@gmail.com' },
      { label: 'GitHub', value: 'github.com/fernandoDev-coder', href: 'https://github.com/fernandoDev-coder' },
    ],
    fields: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      subject: 'Subject',
      message: 'Message',
      honeypot: 'Do not fill',
    },
    send: 'Send message',
    sending: 'Sending...',
    footer: 'Backend Developer specialized in SAP ABAP, Python, and enterprise software.',
    errors: {
      name: 'Enter your name.',
      emailRequired: 'Enter a contact email.',
      emailInvalid: 'Enter a valid email.',
      company: 'Company name is too long.',
      subject: 'Enter the reason for contacting you.',
      messageRequired: 'Write a message.',
      messageShort: 'The message must be at least 30 characters long.',
      review: 'Review the highlighted fields and try again.',
      submit: 'The message could not be sent.',
      unexpected: 'An unexpected error occurred while sending the form.',
    },
    states: {
      sending: 'Sending message...',
      success: 'Message sent successfully.',
    },
    ariaHome: 'Go to home',
    ariaNav: 'Main navigation',
    langLabel: 'Language',
  },
}

const navAnchors = ['about', 'experience', 'skills', 'projects', 'education', 'contact']
const initialForm = { name: '', email: '', company: '', subject: '', message: '', website: '' }

function validateForm(data, copy) {
  const nextErrors = {}

  if (!data.name.trim()) nextErrors.name = copy.errors.name
  if (!data.email.trim()) {
    nextErrors.email = copy.errors.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    nextErrors.email = copy.errors.emailInvalid
  }

  if (data.company.trim().length > 100) nextErrors.company = copy.errors.company
  if (!data.subject.trim()) nextErrors.subject = copy.errors.subject
  if (!data.message.trim()) {
    nextErrors.message = copy.errors.messageRequired
  } else if (data.message.trim().length < 30) {
    nextErrors.message = copy.errors.messageShort
  }

  return nextErrors
}

function App() {
  const browserDefault =
    typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
  const [language, setLanguage] = createSignal(browserDefault)
  const [formData, setFormData] = createSignal(initialForm)
  const [errors, setErrors] = createSignal({})
  const [submitState, setSubmitState] = createSignal('idle')
  const [submitMessage, setSubmitMessage] = createSignal('')
  const [startedAt] = createSignal(Date.now())
  const [hasScrolled, setHasScrolled] = createSignal(false)

  onMount(() => {
    const storedLanguage = localStorage.getItem(languageStorageKey)
    if (storedLanguage === 'es' || storedLanguage === 'en') setLanguage(storedLanguage)

    const handleScroll = () => setHasScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll)
      revealObserver.disconnect()
    })
  })

  createEffect(() => {
    localStorage.setItem(languageStorageKey, language())
    document.documentElement.lang = language()
  })

  const handleInput = (event) => {
    const { name, value } = event.currentTarget
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId)
    if (!target) return

    const header = document.querySelector('.topbar')
    const headerOffset = header ? header.getBoundingClientRect().height + 20 : 100
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset

    document.documentElement.style.scrollBehavior = 'smooth'
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })

    window.history.replaceState(null, '', `#${targetId}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const copy = content[language()]
    const currentForm = formData()
    const validationErrors = validateForm(currentForm, copy)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitState('error')
      setSubmitMessage(copy.errors.review)
      return
    }

    setSubmitState('loading')
    setSubmitMessage(copy.states.sending)

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentForm, startedAt: startedAt() }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.error || copy.errors.submit)
      }

      setSubmitState('success')
      setSubmitMessage(payload.message || copy.states.success)
      setFormData(initialForm)
      setErrors({})
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error.message || copy.errors.unexpected)
    }
  }

  const copy = () => content[language()]

  return (
    <div class="page-shell">
      <header class={`topbar ${hasScrolled() ? 'is-scrolled' : ''}`}>
        <div class="topbar-actions">
          <nav class="topnav" aria-label={copy().ariaNav}>
            <For each={copy().nav}>
              {(label, index) => (
                <button type="button" class="nav-link" onClick={() => scrollToSection(navAnchors[index()])}>
                  {label}
                </button>
              )}
            </For>
          </nav>
          <div class="language-switcher" aria-label={copy().langLabel}>
            <button
              type="button"
              class={language() === 'es' ? 'is-active' : ''}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
            <button
              type="button"
              class={language() === 'en' ? 'is-active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main class="page">
        <section class="hero" id="hero">
          <div class="hero-copy" data-reveal>
            <span class="eyebrow">{copy().eyebrow}</span>
            <h1>Fernando Lara</h1>
            <p class="hero-role">{copy().heroRole}</p>
            <p class="hero-summary">{copy().heroSummary}</p>
            <div class="hero-actions">
              <button class="button button-primary" type="button" onClick={() => scrollToSection('contact')}>
                {copy().primaryCta}
              </button>
              <button class="button button-secondary" type="button" onClick={() => scrollToSection('projects')}>
                {copy().secondaryCta}
              </button>
            </div>
            <ul class="hero-highlights" aria-label={copy().highlightsLabel}>
              <li>SAP ABAP</li>
              <li>Python Automation</li>
              <li>SQL</li>
              <li>Enterprise Support</li>
            </ul>
          </div>

          <aside class="hero-panel" data-reveal>
            <div class="profile-card">
              <img class="profile-image" src={profileImageUrl} alt="Foto de Fernando Lara" />
              <div class="profile-meta">
                <span class="profile-status">{copy().profileStatus}</span>
                <strong>{copy().profileTitle}</strong>
                <p>{copy().profileText}</p>
              </div>
            </div>
          </aside>
        </section>

        <section class="content-section section-grid" id="about">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().aboutKicker}</span>
            <h2>{copy().aboutTitle}</h2>
          </div>
          <div class="section-body intro-copy" data-reveal>
            <For each={copy().aboutParagraphs}>{(paragraph) => <p>{paragraph}</p>}</For>
          </div>
        </section>

        <section class="content-section" id="experience">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().experienceKicker}</span>
            <h2>{copy().experienceTitle}</h2>
          </div>
          <div class="timeline">
            <For each={copy().experienceItems}>
              {(item) => (
                <article class="timeline-item" data-reveal>
                  <div class="timeline-period">{item.period}</div>
                  <div class="timeline-content">
                    <h3>
                      {item.role} <span>@ {item.company}</span>
                    </h3>
                    <p>{item.description}</p>
                    <ul class="detail-list">
                      <For each={item.highlights}>{(highlight) => <li>{highlight}</li>}</For>
                    </ul>
                  </div>
                </article>
              )}
            </For>
          </div>
        </section>

        <section class="content-section" id="skills">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().skillsKicker}</span>
            <h2>{copy().skillsTitle}</h2>
          </div>
          <div class="skills-grid">
            <For each={copy().skillGroups}>
              {(group) => (
                <article class="surface-card skill-card" data-reveal>
                  <h3>{group.title}</h3>
                  <ul class="icon-tag-list">
                    <For each={group.items}>
                      {(skill) => (
                        <li>
                          <SkillIcon name={skill} />
                          <span>{skill}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </article>
              )}
            </For>
          </div>
        </section>

        <section class="content-section" id="projects">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().projectsKicker}</span>
            <h2>{copy().projectsTitle}</h2>
          </div>
          <div class="card-grid">
            <For each={copy().contributions}>
              {(card) => (
                <article class="surface-card contribution-card" data-reveal>
                  <span class="card-meta">{card.subtitle}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ul class="tag-list">
                    <For each={card.tags}>{(tag) => <li>{tag}</li>}</For>
                  </ul>
                  <Show when={card.link}>
                    <a class="text-link" href={card.link} target="_blank" rel="noreferrer">
                      {copy().referenceLink}
                    </a>
                  </Show>
                </article>
              )}
            </For>
          </div>
        </section>

        <section class="content-section" id="education">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().educationKicker}</span>
            <h2>{copy().educationTitle}</h2>
          </div>
          <div class="education-grid">
            <For each={copy().educationItems}>
              {(item) => (
                <article class="surface-card education-card" data-reveal>
                  <span class="card-meta">{item.meta}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              )}
            </For>
          </div>
        </section>

        <section class="content-section contact-section" id="contact">
          <div class="section-heading" data-reveal>
            <span class="section-kicker">{copy().contactKicker}</span>
            <h2>{copy().contactTitle}</h2>
          </div>
          <div class="contact-layout">
            <aside class="surface-card contact-card" data-reveal>
              <h3>{copy().directChannels}</h3>
              <p>{copy().contactCopy}</p>
              <ul class="contact-list">
                <For each={copy().contactLinks}>
                  {(item) => (
                    <li>
                      <span>{item.label}</span>
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {item.value}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </aside>

            <form class="surface-card contact-form" data-reveal onSubmit={handleSubmit} noValidate>
              <div class="form-grid">
                <label class="field">
                  <span>{copy().fields.name}</span>
                  <input
                    type="text"
                    name="name"
                    value={formData().name}
                    onInput={handleInput}
                    autocomplete="name"
                    aria-invalid={Boolean(errors().name)}
                  />
                  <Show when={errors().name}>
                    <small class="field-error">{errors().name}</small>
                  </Show>
                </label>

                <label class="field">
                  <span>{copy().fields.email}</span>
                  <input
                    type="email"
                    name="email"
                    value={formData().email}
                    onInput={handleInput}
                    autocomplete="email"
                    aria-invalid={Boolean(errors().email)}
                  />
                  <Show when={errors().email}>
                    <small class="field-error">{errors().email}</small>
                  </Show>
                </label>

                <label class="field">
                  <span>{copy().fields.company}</span>
                  <input
                    type="text"
                    name="company"
                    value={formData().company}
                    onInput={handleInput}
                    autocomplete="organization"
                    aria-invalid={Boolean(errors().company)}
                  />
                  <Show when={errors().company}>
                    <small class="field-error">{errors().company}</small>
                  </Show>
                </label>

                <label class="field">
                  <span>{copy().fields.subject}</span>
                  <input
                    type="text"
                    name="subject"
                    value={formData().subject}
                    onInput={handleInput}
                    aria-invalid={Boolean(errors().subject)}
                  />
                  <Show when={errors().subject}>
                    <small class="field-error">{errors().subject}</small>
                  </Show>
                </label>
              </div>

              <label class="field">
                <span>{copy().fields.message}</span>
                <textarea
                  name="message"
                  rows="6"
                  value={formData().message}
                  onInput={handleInput}
                  aria-invalid={Boolean(errors().message)}
                />
                <Show when={errors().message}>
                  <small class="field-error">{errors().message}</small>
                </Show>
              </label>

              <label class="honeypot-field" aria-hidden="true">
                <span>{copy().fields.honeypot}</span>
                <input type="text" name="website" value={formData().website} onInput={handleInput} autocomplete="off" />
              </label>

              <div class="form-actions">
                <button class="button button-primary" type="submit" disabled={submitState() === 'loading'}>
                  <Show when={submitState() === 'loading'} fallback={copy().send}>
                    {copy().sending}
                  </Show>
                </button>
                <p class={`form-status ${submitState()}`} aria-live="polite">
                  {submitMessage()}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer class="footer">
        <span>Fernando Lara</span>
        <span>{copy().footer}</span>
      </footer>
    </div>
  )
}

export default App
