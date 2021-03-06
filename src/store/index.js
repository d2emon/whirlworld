import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import createLogger from '../../../src/plugins/logger'

// import models from './models'
import menu from './menu.js'
import player from './player.js'
import chapters from './chapters'
import items from './chapters/items'

import characters from './chapters/characters'

import utils from './utils.js'

Vue.use(Vuex)

const debug = false // process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    title: 'Вереница Миров',

    // models: models,
    menu: menu,

    chapter: null,
    text: [],
    battleLog: '',

    player: player,
    items: items,
    chapters: chapters
  },
  getters: {
    percent2color: (state) => (percent) => {
      if (percent > 75) return 'success'
      if (percent > 50) return 'info'
      if (percent > 25) return 'warning'
      return 'danger'
    },
    enemiesAlive: state => {
      if (!state.chapter) return []
      return state.chapter.enemies.filter(function (item) {
        return item.sta > 0
      })
    },
    currentChapter: state => {
      return state.chapters[state.player.chapter]
    },
    world: state => {
      return state.chapters[state.player.chapter].world
    }
  },
  mutations: {
    loadChapter: (state, id) => {
      state.chapter = state.chapters[id]
      state.text = state.chapter.load(state.player)
      state.battleLog = ''
      characters.clusha.world = state.chapter.world
    },
    getItem: (state, item) => {
      console.log(item)
      var res = false
      for (let i = 0; i < state.player.items.length; i++) {
        if (!state.player.items[i]) {
          // state.player.items[i] = item
          Vue.set(state.player.items, i, item)
          res = true
          break
        }
      }
      if (!res) {
        alert('Ваш рюкзак забит.')
      }
    },
    generate: state => {
      state.player.generate()
    }
  },
  actions: {
    removeItem: (context, item) => {
      var chapter = context.getters.currentChapter
      chapter.items = chapter.items.filter(
        function (element, i) {
          return element !== item
        }
      )
    },
    /*
    async getToken (context) {
      var response = await context.state.http.post('api-token-auth/', {
        username: context.state.username,
        password: context.state.password
      })
      context.commit('setToken', response.data.token)
    },
    */
    onNewLoc: (context) => {
      utils.onNewLoc()
    },
    onObjSel: (context) => {
      // $onobjsel='onObjSel'
    },
    onGameSave: (context) => {
      // $ongsave='onGameSave'
    },
    onGameLoad: (context) => {
      // $ongload='onGameLoad'
    },
    uc: (context) => {
      // $usercom='uc'
    }
    // gosub 'set.Screen','обложка.чёрный'
  },
  // actions,
  /**
   * modules: {
   *   dashboard
   * },
   */
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
