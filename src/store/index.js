import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

// import models from './models'
import menu from './menu.js'
import player from './player.js'
import chapters from './chapters'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

var notificationList = [
  { icon: 'icon-user-follow text-success', text: 'Новый пользователь' },
  { icon: 'icon-user-unfollow text-danger', text: 'Пользователь удален' },
  { icon: 'icon-chart text-info', text: 'Отчет о продажам готов' },
  { icon: 'icon-basket-loaded text-primary', text: 'Новый клиент' },
  { icon: 'icon-speedometer text-warning', text: 'Сервер перегружен' }
]
var taskList = [
  'Обновить NPM & Bower',
  'Версия ReactJS',
  'Версия VueJS',
  'Добавить новую верстку',
  'Версия Angular 2 Cli'
]

var variants = [
  'success',
  'info',
  'danger'
]

var names = [
  'John Doe',
  'Jane Doe',
  'Janet Doe',
  'Joe Doe'
]

var dates = [
  'Только что',
  '13:52',
  '04:03'
]

var titles = [
  '<span class="fa fa-exclamation text-danger"></span> Важное сообщение',
  'Важное сообщение',
  'Lorem ipsum dolor sit amet'
]

function percent2color (percent) {
  if (percent > 75) return 'success'
  if (percent > 50) return 'info'
  if (percent > 25) return 'warning'
  return 'danger'
}

var notificationCount = Math.floor(Math.random() * 15)
var notifications = []
for (var i = 0; i < notificationCount; i++) {
  let notificationId = Math.floor(Math.random() * notificationList.length)
  notifications.push(notificationList[notificationId])
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

var messageCount = Math.floor(Math.random() * 15)
var messages = []
for (let i = 0; i < messageCount; i++) {
  let variantId = Math.floor(Math.random() * variants.length)
  let nameId = Math.floor(Math.random() * names.length)
  let dateId = Math.floor(Math.random() * dates.length)
  let titleId = Math.floor(Math.random() * titles.length)
  messages.push({
    avatar: '' + (Math.floor(Math.random() * 4) + 4) + '.jpg',
    email: 'admin@bootstrapmaster.com',
    variant: variants[variantId],
    name: names[nameId],
    registered: dates[dateId],
    title: titles[titleId],
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed ' +
      'do eiusmod tempor incididunt...'
  })
}

export default new Vuex.Store({
  state: {
    // models: models,
    menu: menu,

    notifications: notifications,
    server: server,
    tasks: tasks,
    messages: messages,

    player: player,
    chapters: chapters
  },
  mutations: {
    /*
    setToken: (state, token) => {
      state.token = token
      state.http.defaults.headers.Authorization = 'Token ' + token
    },
    */
  },
  actions: {
    /*
    async getToken (context) {
      var response = await context.state.http.post('api-token-auth/', {
        username: context.state.username,
        password: context.state.password
      })
      context.commit('setToken', response.data.token)
    },
    */
  }
  // actions,
  /*
   * modules: {
   *   cart,
   *   products
   * },
   */
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
