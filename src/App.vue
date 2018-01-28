<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      :mini-variant.sync="minified"
      app
    >
      <v-list dense>
        <v-list-tile @click="restart">
          <v-list-tile-action>
            <v-icon>refresh</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Заново</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="generate">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="generate">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="minified = !minified"></v-toolbar-side-icon>
      <v-toolbar-title>Вереница Миров</v-toolbar-title>
      <v-btn icon @click="restart">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      app
    >
      <v-card>
        <v-card-text>
          <blockquote class="blockquote caption">
            <p>Если неприятность может произойти, она обязательно происходит.</p>
            <p class="grey--text">Закон Мерфи, 2-я пол. ХХ века</p>
          </blockquote>
          <hr>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>{{ player.skl.title }}:</v-flex>
                <v-flex xs2>{{ player.skl.value }}</v-flex>
                <v-flex xs2>({{ player.skl.max }})</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-progress-linear :value="player.skl.percent()" :color="player.skl.color()"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>{{ player.sta.title }}:</v-flex>
                <v-flex xs2>{{ player.sta.value }}</v-flex>
                <v-flex xs2>({{ player.sta.max }})</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-progress-linear :value="player.sta.percent()" :color="player.sta.color()"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>{{ player.cha.title }}:</v-flex>
                <v-flex xs2>{{ player.cha.value }}</v-flex>
                <v-flex xs2>({{ player.cha.max }})</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-progress-linear :value="player.cha.percent()" :color="player.cha.color()"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>{{ this.player.lck.title }}:</v-flex>
                <v-flex xs2>{{ player.lck.value() }}</v-flex>
                <v-flex xs2>({{ player.lck.max }})</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-progress-linear :value="player.lck.percent()" :color="player.lck.color()"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <hr>
          <ol>
            <template v-for="(i, id) in player.items">
              <li v-if="i" :key="id">
                <v-tooltip bottom>
                  <span slot="activator">{{ i.short }}</span>
                  <h1>{{ i.title }}</h1>
                  <div v-if="i.description">{{ i.description }}</div>
                  <div v-if="i.full">{{ i.full }}</div>
                </v-tooltip>
              </li>
              <li v-else :key="id">
                <em class="grey--text darken-1">Ничего</em>
              </li>
            </template>
          </ol>
          <ul>
            <template v-for="(i, id) in player.noBag">
              <li v-if="i" :key="id">
                <v-tooltip bottom>
                  <span slot="activator">{{ i.short }}</span>
                  <h1>{{ i.title }}</h1>
                  <div v-if="i.description">{{ i.description }}</div>
                  <div v-if="i.full">{{ i.full }}</div>
                </v-tooltip>
              </li>
              <li v-else :key="id">
                <em class="grey--text darken-1">Ничего</em>
              </li>
            </template>
          </ul>
        </v-card-text>
      </v-card>
      <hr>
      <v-card>
        <v-card-text>
          <form>
            <v-layout row wrap>
              <v-text-field xs6 :label="player.skl.title" v-model="player.skl.value" type="number"></v-text-field>
              <v-text-field xs6 :label="player.skl.title" v-model="player.skl.max" type="number"></v-text-field>
            </v-layout>
            <v-layout row wrap>
              <v-text-field xs6 :label="player.sta.title" v-model="player.sta.value" type="number"></v-text-field>
              <v-text-field xs6 :label="player.sta.title" v-model="player.sta.max" type="number"></v-text-field>
            </v-layout>
            <v-layout row wrap>
              <v-text-field xs6 :label="player.cha.title" v-model="player.cha.value" type="number"></v-text-field>
              <v-text-field xs6 :label="player.cha.title" v-model="player.cha.max" type="number"></v-text-field>
            </v-layout>
            <v-layout row wrap>
              <v-checkbox v-for="(id, i) in 6" :key="id" v-model="player.lck.data[i]" :label="'' + (i + 1)"></v-checkbox>
            </v-layout>
          </form>
          {{ player }}
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view @get_item="getItem" />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import store from '@/store'
import('vuetify/dist/vuetify.min.css')

export default {
  name: 'App',
  data: () => ({
    minified: true,
    drawer: null,
    source: 'String',
    player: store.state.player,
    player1: {
      items: [
        null,
        null,
        null,
        null,
        null,
        null
      ]
    }
  }),
  methods: {
    generate: function () {
      this.player.generate()
      for (let i = 0; i < 6; i++) {
        this.player1.items[i] = null
      }
      console.log(store.state)
    },
    restart: function () {
      store.state.player.ready = false
      this.generate()
      this.$router.push('/')
    },
    getItem: function (item) {
      var res = false
      for (let i = 0; i < this.player.items.length; i++) {
        if (!this.player.items[i]) {
          this.player.items[i] = item
          res = true
          break
        }
      }
      if (!res) {
        alert('Ваш рюкзак забит.')
      }
    }
  },
  created: function () {
    if (!store.state.player.ready) {
      this.generate()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
