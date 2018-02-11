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
      <notifications :notifications="notifications.notifications" :server="server.server" />
      <tasks :tasks="tasks.tasks" />
      <messages :messages="messages.messages" />

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
import Notifications from './Notifications.vue'
import Messages from './Messages.vue'
import Tasks from './Tasks.vue'
import HeaderDropdown from './HeaderDropdown.vue'

export default {
  name: 'c-header',
  components: {
    Notifications,
    Tasks,
    Messages,
    HeaderDropdown
  },
  data: function () {
    return {
      messages: this.$store.state.dashboard.messages,
      notifications: this.$store.state.dashboard.notifications,
      server: this.$store.state.dashboard.server,
      tasks: this.$store.state.dashboard.tasks,

      mainMenu: this.$store.state.dashboard.menu.mainMenu
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
