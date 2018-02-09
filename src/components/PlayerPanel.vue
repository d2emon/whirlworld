<template>
    <v-navigation-drawer
      clipped
      fixed
      v-model="playerDrawer"
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
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs8>Заряды:</v-flex>
                <v-flex xs4>{{ player.blaster.shots }}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <hr>
          <v-layout row wrap>
            <v-flex xs12>
              <v-progress-linear :value="player.backpackPlace()" :color="player.backpackColor()"></v-progress-linear>
            </v-flex>
          </v-layout>
          <ol>
            <template v-for="(i, id) in player.items">
              <li v-if="i" :key="id">
                <v-tooltip bottom>
                  <span slot="activator">{{ i.short }}</span>
                  <h1>{{ i.title }}</h1>
                  <div v-if="i.description">{{ i.showDescription() }}</div>
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
                  <div v-if="i.description">{{ i.showDescription() }}</div>
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
    </v-navigation-drawer>
</template>

<script>
import store from '@/store'

export default {
  name: 'PlayerPanel',
  data: () => ({
    movements: [
      { icon: 'directions_walk', title: 'Идти' },
      { icon: 'directions_run', title: 'Бежать' },
      { icon: 'directions_walk', title: 'Красться' }
    ],
    movement: { icon: 'directions_walk', title: 'Идти' },
    fav: false,
    message: true,
    hints: false,
    minified: true,
    menuDrawer: null,
    playerDrawer: false,
    specialActions: null,
    showInventory: null,
    showSettings: null,
    player: store.state.player,
    loadData: '',
    savePlayer: false,
    loadPlayer: false,
    editPlayer: false
  }),
  methods: {
    generate: function () {
      this.player.generate()
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
    },
    save: function () {
      this.savePlayer = true
    },
    load: function () {
      this.loadPlayer = true
    },
    loadPlayerData: function () {
      var data = JSON.parse(this.loadData)
      this.player.load(data)
      this.loadPlayer = false
      this.$router.push('/chapter/' + this.player.chapter)
    },
    edit: function () {
      this.editPlayer = true
    },
    showTime: function () {
      alert('Time')
    }
  }
}
</script>
