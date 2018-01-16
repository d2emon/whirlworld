<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="generate">
          <v-list-tile-action>
            <v-icon>refresh</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Заново</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
                <v-flex xs8>Мастерство:</v-flex>
                <v-flex xs2>{{ player.skl }}</v-flex>
                <v-flex xs2>({{ player.skl }})</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>Выносливость:</v-flex>
                <v-flex xs2>{{ player.sta }}</v-flex>
                <v-flex xs2>({{ player.sta }})</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>Обаяние:</v-flex>
                <v-flex xs2>{{ player.cha }}</v-flex>
                <v-flex xs2>({{ player.cha }})</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>Удача:</v-flex>
                <v-flex xs2>{{ player.luck() }}</v-flex>
                <v-flex xs2>(6)</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <hr>
          <ul>
            <template v-for="(i, id) in player.items">
              <li :key="id">Item {{ i }}:{{ id }}</li>
            </template>
          </ul>
        </v-card-text>
      </v-card>
      <v-list dense>
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Вереница Миров</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import('vuetify/dist/vuetify.min.css')

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    source: 'String',
    statBlocks: [
      null,
      null,
      {skl: 8, sta: 22, cha: 8},
      {skl: 10, sta: 20, cha: 6},
      {skl: 12, sta: 16, cha: 5},
      {skl: 9, sta: 18, cha: 8},
      {skl: 11, sta: 20, cha: 6},
      {skl: 9, sta: 20, cha: 7},
      {skl: 10, sta: 16, cha: 7},
      {skl: 8, sta: 24, cha: 7},
      {skl: 9, sta: 22, cha: 6},
      {skl: 10, sta: 18, cha: 7},
      {skl: 11, sta: 20, cha: 5}
    ],
    player: {
      skl: 0,
      sta: 0,
      cha: 0,
      luckData: [true, true, true, true, true, true],
      items: [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      luck: function () {
        var luck = 0
        for (let i = 0; i < 6; i++) {
          if (this.luckData[i]) luck++
        }
        return luck
      }
    }
  }),
  methods: {
    generate: function () {
      let roll = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2
      let stats = this.statBlocks[roll]
      this.player.skl = stats.skl
      this.player.sta = stats.sta
      this.player.cha = stats.cha
      for (let i = 0; i < 6; i++) {
        this.player.luckData[i] = true
      }
      for (let i = 0; i < 2; i++) {
        let roll = Math.floor(Math.random() * 6) + 1
        this.player.luckData[roll] = false
      }
      for (let i = 0; i < 6; i++) {
        this.player.items[i] = null
      }
    }
  },
  created: function () {
    this.generate()
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
