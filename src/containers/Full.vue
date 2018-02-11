<template>
  <div class="app">
    <save-modal />
    <load-modal />
    <edit-modal />

    <AppHeader/>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import { Header as AppHeader, Aside as AppAside, Footer as AppFooter } from '@/components/'
import {SaveModal, LoadModal, EditModal} from '@/components/Modals/'

export default {
  name: 'full',
  components: {
    SaveModal,
    LoadModal,
    EditModal,

    AppHeader,
    AppAside,
    AppFooter
  },
  computed: {
    name () {
      return this.$route.name
    }
  },
  mounted: function () {
    document.body.classList.toggle('sidebar-hidden', true)
    document.body.classList.toggle('aside-menu-hidden', false)
  }
}
</script>
