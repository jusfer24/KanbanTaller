# KanbanTaller

Aplicación Kanban (estilo Jira) hecha con React + Vite.

**Demo:** https://kanban-taller.vercel.app

## Funcionalidades

- Crear, editar y eliminar tareas.
- Organizar tareas en tres estados: **Pendiente**, **En progreso** y **Completado**.
- Cambiar el estado de las tareas arrastrándolas entre columnas o desde el menú "⋮" de cada tarjeta.
- Crear varios proyectos, cada uno con su propio tablero.
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
├── utils/              localStorage y búsqueda
├── styles/             Variables globales (paleta de azules) y estilos de formulario
├── App.jsx
└── main.jsx

test/                   Pruebas automatizadas (Vitest), con la misma estructura que src/
├── constants/          Códigos de tarea y prioridades
└── utils/              Búsqueda y localStorage
```
