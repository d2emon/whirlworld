<template>
  <div>
    <b-card>
      <blockquote>
        <small>
          <p>Если неприятность может произойти, она обязательно происходит.</p>
          <p class="grey--text">Закон Мерфи, 2-я пол. ХХ века</p>
        </small>
      </blockquote>
    </b-card>
    <b-card :title="player.title">
      <b-row>
        <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.skl.title }}</b></small></b-col>
        <b-col sm="4"><small class="text-muted">{{ player.skl.value }}/{{ player.skl.max }}</small></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs" :variant="player.skl.color()" :value="player.skl.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.sta.title }}</b></small></b-col>
        <b-col sm="4"><small class="text-muted">{{ player.sta.value }}/{{ player.sta.max }}</small></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs" :variant="player.sta.color()" :value="player.sta.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.cha.title }}</b></small></b-col>
        <b-col sm="4"><small class="text-muted">{{ player.cha.value }}/{{ player.cha.max }}</small></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs" :variant="player.cha.color()" :value="player.cha.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.lck.title }}</b></small></b-col>
        <b-col sm="4"><small class="text-muted">{{ player.lck.value() }}/{{ player.lck.max }}</small></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs" :variant="player.lck.color()" :value="player.lck.percent()"></b-progress>
        </b-col>
      </b-row>
    </b-card>
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
    <b-card>
      {{ player }}
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'PlayerPanel',
  data: function () {
    return {
      movements: [
        { icon: 'directions_walk', title: 'Идти' },
        { icon: 'directions_run', title: 'Бежать' },
        { icon: 'directions_walk', title: 'Красться' }
      ],
      movement: { icon: 'directions_walk', title: 'Идти' },

      player: this.$store.state.player,
      loadData: '',
      savePlayer: false,
      loadPlayer: false,
      editPlayer: false
    }
  },
  methods: {
    restart: function () {
      this.$store.state.player.ready = false
      this.$store.commit('generate')
      this.$router.push('/start')
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
    }
  },
  mounted: function () {
    if (!this.player.ready) {
      this.$store.commit('generate')
    }
  }
}
</script>
