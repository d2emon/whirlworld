import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import {player} from './player.js'
import chapters from './chapters'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    player: player,
    chapters: chapters
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
