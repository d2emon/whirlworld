<template>
  <header class="app-header navbar">
    <!-- v-toolbar app fixed :clipped-right="true" class="app-header navbar">
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="#"></router-link>
      <v-toolbar-title>Вереница Миров</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="sidebarToggle"></v-toolbar-side-icon>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>

      <v-list class="navbar-nav mb-0">
        <v-list-tile @click="restart" class="nav-link">
          <v-list-tile-title class="px-3">Dashboard</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="restart" class="nav-link">
          <v-list-tile-title class="px-3">Users</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="restart" class="nav-link">
          <v-list-tile-title class="px-3">Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>


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
      <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <v-toolbar-side-icon @click.stop="playerDrawer = !playerDrawer"></v-toolbar-side-icon>
    </v-toolbar -->

    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <b-link class="navbar-brand" to="#"></b-link>
    <b-link to="#">Вереница Миров</b-link>

    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" v-for="(item, id) in mainMenu" :key="id">{{ item.title }}</b-nav-item>
    </b-navbar-nav>



    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger" v-if="notifications.length > 0">{{ notifications.length }}</b-badge>
        </template>
        <div class="dropdown-menu-lg">
          <b-dropdown-header tag="div" class="text-center"><strong>You have {{ notifications.length }} notifications</strong></b-dropdown-header>
          <b-dropdown-item v-for="(item, id) in notifications" :key="id"><i :class="item.icon"></i> {{ item.title }}</b-dropdown-item>
          <b-dropdown-header tag="div" class="text-center"><strong>Server</strong></b-dropdown-header>
          <b-dropdown-item>
            <div class="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
            <b-progress :value="serverUsage.cpu.percent" :max="100" variant="info" class="progress-xs"></b-progress>
            <small class="text-muted">{{serverUsage.cpu.processes}} Processes. {{serverUsage.cpu.cores}} Cores.</small>
          </b-dropdown-item>
          <b-dropdown-item>
            <div class="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
            <b-progress :value="serverUsage.memory.value" :max="serverUsage.memory.max" variant="warning" class="progress-xs"></b-progress>
            <small class="text-muted">{{serverUsage.memory.value}}GB/{{serverUsage.memory.max}}GB</small>
          </b-dropdown-item>
          <b-dropdown-item>
            <div class="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
            <b-progress :value="serverUsage.ssd.value" :max="serverUsage.ssd.max" variant="danger" class="progress-xs"></b-progress>
            <small class="text-muted">{{serverUsage.ssd.value}}GB/{{serverUsage.ssd.max}}GB</small>
          </b-dropdown-item>
        </div>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-list"></i>
          <b-badge pill variant="warning" v-if="tasks.length > 0">{{ tasks.length }}</b-badge>
        </template>
        <div class="dropdown-menu-lg">
          <b-dropdown-header tag="div" class="text-center"><strong>You have {{ tasks.length }} pending tasks</strong></b-dropdown-header>
          <b-dropdown-item class="dropdown-item" v-for="(item, id) in tasks" :key="id">
            <div class="small mb-1">{{ item.title }} <span class="float-right"><strong>{{ item.progress }}%</strong></span></div>
            <b-progress :value="item.progress" :max="100" :variant="item.variant" class="progress-xs"></b-progress>
          </b-dropdown-item>
          <b-dropdown-item class="text-center"><strong>View all tasks</strong></b-dropdown-item>
        </div>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-envelope-letter"></i>
          <b-badge pill variant="info" v-if="messages.length > 0">{{ messages.length }}</b-badge>
        </template>
        <div class="dropdown-menu-lg">
          <b-dropdown-header tag="div" class="text-center"><strong>You have {{ messages.length }} messages</strong></b-dropdown-header>

          <b-dropdown-item v-for="(item, id) in messages" :key="id">
            <div class="message">
              <div class="py-3 mr-3 float-left">
                <div class="avatar">
                  <img :src="'static/img/avatars/' + item.avatar" :alt="item.email" class="img-avatar">
                  <b-badge class="avatar-status" :variant="item.badge"></b-badge>
                </div>
              </div>
              <div>
                <small class="text-muted">{{ item.name }}</small>
                <small class="text-muted float-right mt-1">{{ item.registered }}</small>
              </div>
              <div class="text-truncate font-weight-bold" v-html="item.title"></div>
              <div class="small text-muted text-truncate">{{ item.text }}</div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item class="text-center"><strong>View all messages</strong></b-dropdown-item>
        </div>
      </b-nav-item-dropdown>

      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>

      <player-menu />
    </b-navbar-nav>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>

<script>
import ItemIcon from '@/components/ItemIcon'
import PlayerMenu from '@/components/PlayerMenu'
import store from '@/store'

export default {
  name: 'AppHeader',
  components: {
    ItemIcon,
    PlayerMenu
  },
  data: () => ({
    mainMenu: [
      { title: 'Dashboard' },
      { title: 'Users' },
      { title: 'Settings' }
    ],
    notifications: [
      { icon: 'icon-user-follow text-success', title: 'New user registered' },
      { icon: 'icon-user-unfollow text-danger', title: 'User deleted' },
      { icon: 'icon-chart text-info', title: 'Sales report is ready' },
      { icon: 'icon-basket-loaded text-primary', title: 'New client' },
      { icon: 'icon-user-follow text-success', title: 'New user registered' },
      { icon: 'icon-speedometer text-warning', title: 'Server overloaded' },

      { icon: 'icon-user-follow text-success', title: 'New user registered' },
      { icon: 'icon-user-unfollow text-danger', title: 'User deleted' },
      { icon: 'icon-chart text-info', title: 'Sales report is ready' },
      { icon: 'icon-basket-loaded text-primary', title: 'New client' },
      { icon: 'icon-speedometer text-warning', title: 'Server overloaded' }
    ],
    serverUsage: {
      cpu: { percent: 25, processes: 348, cores: '1/4' },
      memory: { percent: 70, value: 11444, max: 16384 },
      ssd: { percent: 90, value: 243, max: 256 }
    },
    tasks: [
      { title: 'Upgrade NPM & Bower', progress: 0, variant: 'info' },
      { title: 'ReactJS Version', progress: 25, variant: 'danger' },
      { title: 'VueJS Version', progress: 50, variant: 'warning' },
      { title: 'Add new layouts', progress: 75, variant: 'info' },
      { title: 'Angular 2 Cli Version', progress: 100, variant: 'success' }
    ],
    messages: [
      {
        avatar: '7.jpg',
        email: 'admin@bootstrapmaster.com',
        badge: 'success',
        name: 'John Doe',
        registered: 'Just now',
        title: '<span class="fa fa-exclamation text-danger"></span> Important message',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
      },
      {
        avatar: '6.jpg',
        email: 'admin@bootstrapmaster.com',
        badge: 'warning',
        name: 'Jane Doe',
        registered: '5 minutes ago',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
      },
      {
        avatar: '5.jpg',
        email: 'admin@bootstrapmaster.com',
        badge: 'danger',
        name: 'Janet Doe',
        registered: '1:52 PM',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
      },
      {
        avatar: '4.jpg',
        email: 'admin@bootstrapmaster.com',
        badge: 'info',
        name: 'Joe Doe',
        registered: '4:03 AM',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
      }
    ],


    itemsCount: 5,
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
    sidebarToggle: function () {
      alert('Sidebar')
      menuDrawer = !menuDrawer
    },
    mobileSidebarToggle: function () {
      alert('Mobile Sidebar')
      menuDrawer = !menuDrawer
    },
    asideToggle: function () {
      alert('Asidebar')
    },

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
