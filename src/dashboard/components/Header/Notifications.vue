<template>
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
</template>
<script>
export default {
  name: 'Notifications',
  props: [
    'notifications',
    'server'
  ]
}
</script>
