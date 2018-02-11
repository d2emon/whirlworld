<template>
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
</template>
<script>
export default {
  name: 'tasks',
  props: [
    'tasks'
  ]
}
</script>
