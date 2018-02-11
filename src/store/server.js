function percent2color (percent) {
  if (percent > 75) return 'success'
  if (percent > 50) return 'info'
  if (percent > 25) return 'warning'
  return 'danger'
}

var server = {
  cpu: {
    percent: 0,
    color: 'info',
    value: Math.floor(Math.random() * 5),
    max: 4,
    processes: Math.floor(Math.random() * 500)
  },
  memory: {
    percent: 0,
    color: 'info',
    value: Math.floor(Math.random() * 16384),
    max: 16384
  },
  ssd: {
    percent: 0,
    color: 'info',
    value: Math.floor(Math.random() * 256),
    max: 256
  }
}
server.cpu.percent = (server.cpu.value / server.cpu.max) * 100
server.cpu.color = percent2color(100 - server.cpu.percent)
server.memory.percent = (server.memory.value / server.memory.max) * 100
server.memory.color = percent2color(100 - server.memory.percent)
server.ssd.percent = (server.ssd.value / server.ssd.max) * 100
server.ssd.color = percent2color(100 - server.ssd.percent)

export default {
  server: server
}
