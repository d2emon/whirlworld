<template>
  <div>
    <b-card title="Рюкзак">
      <b-row>
        <b-col sm="12">
          <b-progress height={} class="progress-xs" :variant="player.backpackColor()" :value="player.backpackPlace()"></b-progress>
          <small class="text-muted">{{ player.backpackItems() }}/6</small>
        </b-col>
      </b-row>
      <ol>
        <template v-for="(i, id) in player.items">
          <li v-if="i" :key="id">
            <span :id="'item-' + id" :key="id">{{ i.short }}</span>
            <b-popover
              :target="'item-'+id"
              placement="bottom"
              :title="i.title"
              triggers="hover focus"
            >
              <div v-if="i.description">{{ i.showDescription() }}</div>
              <div v-if="i.full">{{ i.full }}</div>
            </b-popover>
          </li>
          <li v-else :key="id">
            <em>Ничего</em>
          </li>
        </template>
      </ol>
      <ul>
        <template v-for="(i, id) in player.noBag">
          <li v-if="i" :key="id">
            <span :id="'item-' + id" :key="id">{{ i.short }}</span>
            <b-popover
              :target="'item-'+id"
              placement="bottom"
              :title="i.title"
              triggers="hover focus"
            >
              <div v-if="i.description">{{ i.showDescription() }}</div>
              <div v-if="i.full">{{ i.full }}</div>
            </b-popover>
          </li>
          <li v-else :key="id">
            <em>Ничего</em>
          </li>
        </template>
      </ul>
      <hr>
      <b-row>
        <b-col sm="8" class="text-uppercase mb-1"><small><b>Заряды</b></small></b-col>
        <b-col sm="4"><small class="text-muted">{{ player.blaster.shots }}</small></b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ItemsPanel',
  props: [
    'player'
  ]
}
</script>
