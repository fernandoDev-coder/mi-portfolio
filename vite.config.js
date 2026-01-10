import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: '/mi-portfolio/', // Cambia por el nombre de tu repo si es diferente
  plugins: [solid()],
})
