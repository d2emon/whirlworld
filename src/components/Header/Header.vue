<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- b-link class="navbar-brand" to="#"></b-link -->
    <b-link to="/">Вереница миров</b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" v-for="(item, id) in mainMenu" :key="id" :to="item.url"><span v-html="item.title"></span></b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger" v-if="notifications.length > 0">{{ notifications.length }}</b-badge>
        </template>
        <template v-if="notifications.length > 0">
          <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>У вас {{ notifications.length }} оповещений</strong></b-dropdown-header>
          <b-dropdown-item v-for="(item, id) in notifications.slice(0, 5)" :key="id"><i :class="item.icon"></i> {{ item.text }}</b-dropdown-item>
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Сервер</strong></b-dropdown-header>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>Использование CPU</b></small></div>
          <b-progress height={} class="progress-xs" :variant="server.cpu.color" :value="server.cpu.percent"></b-progress>
          <small class="text-muted">{{ server.cpu.processes }} Процессов. {{ server.cpu.value }}/{{ server.cpu.max }} Ядер.</small>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>Использование Памяти</b></small></div>
          <b-progress height={} class="progress-xs" :variant="server.memory.color" :value="server.memory.percent"></b-progress>
          <small class="text-muted">{{ server.memory.value }}MB/{{ server.memory.max }}MB</small>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>Использование SSD 1</b></small></div>
          <b-progress height={} class="progress-xs" :variant="server.ssd.color" :value="server.ssd.percent"></b-progress>
          <small class="text-muted">{{ server.ssd.value }}GB/{{ server.ssd.max }}GB</small>
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-list"></i>
          <b-badge pill variant="warning" v-if="tasks.length > 0">{{ tasks.length }}</b-badge>
        </template>
        <template v-if="tasks.length > 0">
          <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>У вас {{ tasks.length }} заданий</strong></b-dropdown-header>
          <b-dropdown-item v-for="(item, id) in tasks.slice(0, 5)" :key="id">
            <div class="small mb-1">{{ item.title }} <span class="float-right"><strong>{{ item.progress }}%</strong></span></div>
            <b-progress height={} class="progress-xs" :variant="item.color" :value="item.progress"></b-progress>
          </b-dropdown-item>
          <b-dropdown-item class="text-center"><strong>Посмотреть все задания</strong></b-dropdown-item>
        </template>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-envelope-letter"></i>
          <b-badge pill variant="info" v-if="messages.length > 0">{{ messages.length }}</b-badge>
        </template>
        <div class="dropdown-menu-lg" v-if="messages.length > 0">
          <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>У вас {{ messages.length }} сообщений</strong></b-dropdown-header>

          <b-dropdown-item v-for="(item, id) in messages.slice(0, 4)" :key="id">
            <div class="message">
            <div class="py-3 mr-3 float-left">
              <div class="avatar">
                <img :src="'static/img/avatars/' + item.avatar" class="img-avatar" :alt="item.email">
                <span :class="'avatar-status badge-' + item.variant"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">{{ item.name }}</small>
              <small class="text-muted float-right mt-1">{{ item.registered }}</small>
            </div>
            <div class="text-truncate font-weight-bold" v-html="item.title"></div>
            <div class="small text-muted text-truncate" v-html="item.text"></div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item class="text-center"><strong>Посмотреть все сообщения</strong></b-dropdown-item>
        </div>
      </b-nav-item-dropdown>

      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>

      <HeaderDropdown/>
    </b-navbar-nav>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>
<script>
import HeaderDropdown from './HeaderDropdown.vue'

export default {
  name: 'c-header',
  components: {
    HeaderDropdown
  },
  data: function () {
    return {
      mainMenu: this.$store.state.menu.mainMenu,
      notifications: this.$store.state.notifications,
      server: this.$store.state.server,
      tasks: this.$store.state.tasks,
      messages: this.$store.state.messages
    }
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
