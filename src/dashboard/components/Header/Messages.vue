<template>
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
</template>
<script>
export default {
  name: 'messages',
  props: [
    'messages'
  ]
}
</script>
