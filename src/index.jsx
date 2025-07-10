/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'
import { Router } from 'solid-app-router'

const root = document.getElementById('root')

render(() => (
  <Router>
    <App />
  </Router>
), root)
