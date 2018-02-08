<template>
    <v-toolbar app fixed :clipped-right="false">
      <v-toolbar-side-icon @click.stop="menuDrawer = !menuDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Вереница Миров</v-toolbar-title>
      <v-tooltip bottom>
        <v-btn icon @click="restart" slot="activator">
          <v-icon>refresh</v-icon>
        </v-btn>
        <span>Заново</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon @click="restart" slot="activator">
          <v-icon>{{ movement.icon }}</v-icon>
        </v-btn>
        <span>{{ movement.title }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon @click="restart" slot="activator">
          <v-icon>visibility</v-icon>
        </v-btn>
        <span>Смотреть</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon @click="restart" slot="activator">
          <v-icon>pan_tool</v-icon>
        </v-btn>
        <span>Брать</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon @click="restart" slot="activator">
          <v-icon>chat</v-icon>
        </v-btn>
        <span>Говорить</span>
      </v-tooltip>
      <v-menu
        bottom
        v-model="specialActions"
        offset-y
      >
        <v-tooltip bottom slot="activator">
          <v-btn icon slot="activator">
            <v-icon>toys</v-icon>
          </v-btn>
          <span>Специальное</span>
        </v-tooltip>
        <v-list>
          <v-list-tile v-for="(m, id) in movements" :key="id" @click="movement = m">
            <v-tooltip bottom>
              <v-icon slot="activator">{{ m.icon }}</v-icon>
              <span>{{ m.title }}</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile @click="restart">
            <v-tooltip bottom>
              <v-icon slot="activator">local_hotel</v-icon>
              <span>Отдыхать</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile @click="playerDrawer = !playerDrawer">
            <v-tooltip bottom>
              <v-icon slot="activator">face</v-icon>
              <span>Лист персонажа</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile @click="showTime">
            <v-tooltip bottom>
              <v-icon slot="activator">hourglass_empty</v-icon>
              <span>Время</span>
            </v-tooltip>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-tooltip bottom>
        <v-btn icon disabled @click="restart" slot="activator">
          <v-icon>stars</v-icon>
        </v-btn>
        <span>Магия</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon disabled @click="restart" slot="activator">
          <v-icon>blur_on</v-icon>
        </v-btn>
        <span>Предмет</span>
      </v-tooltip>
      <v-menu
        offset-y
        bottom
        :close-on-content-click="false"
        :nudge-width="400"
        v-model="showInventory"
      >
        <v-tooltip bottom slot="activator">
          <v-btn icon slot="activator">
            <v-icon>business_center</v-icon>
          </v-btn>
          <span>Инвентарь</span>
        </v-tooltip>
        <v-card>
          <v-layout row wrap>
            <template v-for="(i, id) in player.items">
              <v-flex xs4 v-if="i" :key="id">
                <item-icon :item="i">
                </item-icon>
              </v-flex>
            </template>
            <template v-for="(i, id) in player.noBag">
              <v-flex xs4 v-if="i" :key="id">
                <item-icon :item="i">
                </item-icon>
              </v-flex>
            </template>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="showInventory = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="showInventory = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-menu
        offset-x
        :close-on-content-click="false"
        :nudge-width="200"
        v-model="showSettings"
      >
        <v-tooltip bottom slot="activator">
          <v-btn icon slot="activator">
            <v-icon>settings</v-icon>
          </v-btn>
          <span>Настройки</span>
        </v-tooltip>
        <v-card>
          <v-layout row wrap>
            <v-flex xs4>
              <v-list>
                <v-list-tile @click="save">
                  Сохранить
                </v-list-tile>
                <v-list-tile @click="save">
                  Загрузить
                </v-list-tile>
                <v-list-tile @click="restart">
                  Заново
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-flex xs8>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="/static/doc-images/john.jpg" alt="John">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
                <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                  :class="fav ? 'red--text' : ''"
                  @click="fav = !fav"
                >
                  <v-icon>favorite</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable messages</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="hints" color="purple"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable hints</v-list-tile-title>
            </v-list-tile>
          </v-list>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="showSettings = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="showSettings = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="playerDrawer = !playerDrawer"></v-toolbar-side-icon>
    </v-toolbar>
</template>

<script>
import ItemIcon from '@/components/ItemIcon'
import store from '@/store'
import('vuetify/dist/vuetify.min.css')

export default {
  name: 'AppHeader',
  components: {
    ItemIcon
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
