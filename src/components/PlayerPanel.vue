<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'PlayerPanel',
  props: [
    'player'
  ],
  data: function () {
    return {
      movements: [
        { icon: 'directions_walk', title: 'Идти' },
        { icon: 'directions_run', title: 'Бежать' },
        { icon: 'directions_walk', title: 'Красться' }
      ],
      movement: { icon: 'directions_walk', title: 'Идти' },

      loadData: '',
      savePlayer: false,
      loadPlayer: false,
      editPlayer: false
    }
  },
  methods: {
    restart: function () {
      this.player.ready = false
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
