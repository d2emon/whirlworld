function percent2color (percent) {
  if (percent > 75) return 'success'
  if (percent > 50) return 'info'
  if (percent > 25) return 'warning'
  return 'danger'
}

var taskList = [
  'Обновить NPM & Bower',
  'Версия ReactJS',
  'Версия VueJS',
  'Добавить новую верстку',
  'Версия Angular 2 Cli'
]

var taskCount = Math.floor(Math.random() * 15)
var tasks = []
for (let i = 0; i < taskCount; i++) {
  let taskId = Math.floor(Math.random() * taskList.length)
  let progress = Math.floor(Math.random() * 100)
  tasks.push({
    title: taskList[taskId],
    progress: progress,
    color: percent2color(progress)
  })
}

export default {
  tasks: tasks
}
