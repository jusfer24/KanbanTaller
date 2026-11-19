// Filtra tareas por texto (título, descripción, etiqueta o código).
// No distingue mayúsculas ni tildes.
function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function filterTasks(tasks, query) {
  const needle = normalize(query).trim()
  if (!needle) return tasks

  return tasks.filter((task) =>
    [task.title, task.description, task.label, task.key].some((field) =>
      normalize(field).includes(needle),
    ),
  )
}
