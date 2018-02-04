<template>
  <v-app id="inspire" dark>
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
                <v-card>
                  <v-card-title primary-title>
                    <v-tooltip bottom>
                      <div class="headline" slot="activator">{{ i.short }}</div>
                      <h1>{{ i.title }}</h1>
                      <div v-if="i.description">{{ i.showDescription() }}</div>
                      <div v-if="i.full">{{ i.full }}</div>
                    </v-tooltip>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark>Listen now</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </template>
            <template v-for="(i, id) in player.noBag">
              <v-flex xs4 v-if="i" :key="id">
                <v-card>
                  <v-card-title primary-title>
                    <v-tooltip bottom>
                      <div class="headline" slot="activator">{{ i.short }}</div>
                      <h1>{{ i.title }}</h1>
                      <div v-if="i.description">{{ i.showDescription() }}</div>
                      <div v-if="i.full">{{ i.full }}</div>
                    </v-tooltip>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark>Listen now</v-btn>
                  </v-card-actions>
                </v-card>
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
