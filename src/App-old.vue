<template>
  <v-app id="inspire" class="app">
      <v-dialog v-model="savePlayer" max-width="500px">
        <v-card>
          <v-card-title>
            Сохранить данные
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Данные игрока"
                    textarea
                    readonly
                    dark
                    :value="player.save()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            {{ player }}
            <hr>
            {{ player.save() }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="savePlayer=false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="loadPlayer" max-width="500px">
        <v-card>
          <v-card-title>
            Загрузить данные
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Данные игрока"
                    textarea
                    dark
                    v-model="loadData"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" flat @click.stop="loadPlayerData">Загрузить</v-btn>
            <v-btn color="primary" flat @click.stop="loadPlayer = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editPlayer" max-width="500px">
        <v-card>
          <v-card-title v-text="player.title">
          </v-card-title>
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
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="editPlayer=false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!--
    AppHeader
    <div class="app-body">
      Sidebar :navItems="nav"
      <main class="main">
        breadcrumb :list="list"
        <div class="container-fluid">
          router-view
        </div>
      </main>
      AppAside
    </div>
    AppFooter
    -->

    <app-header />
    <div class="app-body">
      <sidebar />
      <player-panel />

      <v-content class="main">
        breadcrumb :list="list"
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view @get_item="getItem" />
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <app-footer/>
  </v-app>
</template>

<script>
import ItemIcon from '@/components/ItemIcon'
import AppHeader from '@/components/AppHeader'
import Sidebar from '@/components/Sidebar'
import PlayerPanel from '@/components/PlayerPanel'
import AppFooter from '@/components/AppFooter'
import store from '@/store'
import('vuetify/dist/vuetify.min.css')

export default {
  name: 'App',
  components: {
    ItemIcon,
    AppHeader,
    Sidebar,
    PlayerPanel,
    AppFooter
  },
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
  },
  created: function () {
    if (!store.state.player.ready) {
      this.generate()
    }
  }
}
</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  // @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/css/font-awesome.min.css';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/css/simple-line-icons.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  // Import Main styles for this application
  @import './scss/style';
</style>
