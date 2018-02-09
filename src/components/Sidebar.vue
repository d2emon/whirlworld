<template>
    <v-navigation-drawer
      clipped
      fixed
      :mini-variant.sync="minified"
      v-model="menuDrawer"
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
        <v-list-tile @click="edit">
          <v-list-tile-action>
            <v-icon>mode_edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Править</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="save">
          <v-list-tile-action>
            <v-icon>file_download</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Сохранить</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="load">
          <v-list-tile-action>
            <v-icon>file_upload</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Загрузить</v-list-tile-title>
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
</template>

<script>
import store from '@/store'

export default {
  name: 'Sidebar',
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
    minified: false,
    menuDrawer: false,
    playerDrawer: null,
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
