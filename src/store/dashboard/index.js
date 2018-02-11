import menu from './menu.js'
import server from './server.js'
import messages from './messages.js'
import notifications from './notifications.js'
import tasks from './tasks.js'

export default {
  state: {
    menu: menu,
    server: server,
    messages: messages,
    notifications: notifications,
    tasks: tasks
  },
  getters: {
  },
  mutations: {
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
  // plugins: debug ? [createLogger()] : []
}
