<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img :src="'static/avatar/' + player.avatar" class="img-avatar" :alt="player.title">
        </template>

        <b-dropdown-header tag="div" class="text-center"><strong>Игра</strong></b-dropdown-header>
        <b-dropdown-item @click="savePlayer"><i class="fa fa-user"></i> Сохранить</b-dropdown-item>
        <b-dropdown-item @click="loadPlayer"><i class="fa fa-user"></i> Загрузить</b-dropdown-item>
        <b-dropdown-item @click="editPlayer"><i class="fa fa-user"></i> Править</b-dropdown-item>

        <b-dropdown-header tag="div" class="text-center"><strong>Настройки</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-usd"></i> Payments<b-badge variant="secondary">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-file"></i> Projects<b-badge variant="primary">{{itemsCount}}</b-badge></b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>

        <b-dropdown-item><i class="fa fa-shield"></i> Заблокировать</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-lock"></i> Выйти</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
export default {
  name: 'header-dropdown',
  props: [
    'player'
  ],
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    savePlayer () {
      this.$root.$emit('bv::show::modal', 'saveModal')
    },
    loadPlayer () {
      this.$root.$emit('bv::show::modal', 'loadModal')
    },
    editPlayer () {
      this.$root.$emit('bv::show::modal', 'editModal')
    }
  }
}
</script>
