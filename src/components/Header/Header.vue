<template>
  <header class="app-header navbar">
    <b-link to="/">{{ title }}</b-link>

    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" v-for="(item, id) in mainMenu" :key="id" :to="item.url"><span v-html="item.title"></span></b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <HeaderDropdown :player="player"/>
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
  computed: {
    player: function () {
      return this.$store.state.player
    }
  },
  data: function () {
    return {
      title: this.$store.state.title,
      mainMenu: this.$store.state.menu.mainMenu
    }
  },
  methods: {
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
