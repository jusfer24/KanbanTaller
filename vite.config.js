import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En Windows, si la terminal abre el proyecto como "c:\" (minúscula), Vitest
// carga sus módulos dos veces y falla. Se normaliza la letra de unidad.
const root = process.cwd().replace(/^[a-z]:/, (drive) => drive.toUpperCase())

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de Vitest: las pruebas viven en la carpeta test/
  test: {
    root,
    include: ['test/**/*.test.{js,jsx}'],
    environment: 'node',
  },
})
