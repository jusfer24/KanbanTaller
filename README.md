# KanbanTaller

[![CI](https://github.com/jusfer24/KanbanTaller/actions/workflows/ci.yml/badge.svg)](https://github.com/jusfer24/KanbanTaller/actions/workflows/ci.yml)

Aplicación Kanban (estilo Jira) hecha con React + Vite.

**Demo:** https://kanban-taller-nine.vercel.app

## Funcionalidades

- Crear, editar y eliminar tareas.
- Organizar tareas en tres estados: **Pendiente**, **En progreso** y **Completado**.
- Cambiar el estado de las tareas arrastrándolas entre columnas o desde el menú "⋮" de cada tarjeta.
- Crear y eliminar proyectos, cada uno con su propio tablero.
- Asignar prioridad (Alta / Media / Baja) y una etiqueta a cada tarea.
- Identificar cada tarea con un código automático (KT-1, KT-2, …).
- Buscar tareas por título, descripción, etiqueta o código.
- Guardar todo en el navegador (localStorage).

## Requisitos

- Node.js 20 o superior

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto http://localhost:5173).

## Scripts

| Comando           | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Servidor de desarrollo              |
| `npm run build`   | Compila para producción en `dist/`  |
| `npm run preview` | Sirve la compilación de producción  |
| `npm run lint`    | Revisa el código con oxlint         |
| `npm test`        | Ejecuta las pruebas con Vitest      |
| `npm run test:watch` | Pruebas en modo observación      |

## Integración continua (GitHub Actions)

El pipeline [`.github/workflows/ci.yml`](.github/workflows/ci.yml) se ejecuta en cada
**push** y **pull request** hacia `main`, en un runner *self-hosted* del grupo con Node.js 20:

1. Instala las dependencias (`npm ci`).
2. Ejecuta las pruebas automatizadas con Vitest (`npm test`).
3. Genera el build de producción (`npm run build`).

## Despliegue (Vercel)

La app está publicada en Vercel, vinculada a este repositorio de GitHub:

- Cada push a `main` se publica automáticamente en producción.
- Cada Pull Request genera una URL de vista previa.

## Estructura

```
src/
├── components/         Componentes de la interfaz (cada uno con su .module.css)
│   ├── BoardHeader/    Barra superior (proyectos, buscador) y título del tablero
│   ├── Board/          Tablero con las tres columnas
│   ├── Column/         Columna de un estado
│   ├── TaskCard/       Tarjeta de una tarea
│   ├── TaskMenu/       Menú "⋮" (mover, editar, eliminar)
│   ├── Modal/          Ventana modal reutilizable
│   ├── TaskForm/       Formulario para crear/editar tareas
│   └── ProjectForm/    Formulario para crear proyectos
├── hooks/              useTasks y useProjects: lógica de la app
├── constants/          Estados, prioridades, códigos de tarea y proyecto inicial
├── utils/              localStorage, búsqueda y eliminación de proyectos
├── styles/             Variables globales (paleta de azules) y estilos de formulario
├── App.jsx
└── main.jsx

test/                   Pruebas automatizadas (Vitest), con la misma estructura que src/
├── constants/          Códigos de tarea y prioridades
└── utils/              Búsqueda, localStorage y proyectos
```
