<template>
  <b-modal id="loadModal" max-width="500px">
    <div slot="modal-title">
      Загрузить данные
    </div>
    <h3>Данные игрока</h3>
    <b-form-textarea
      v-model="loadData"
      rows="5">
    </b-form-textarea>
    <b-btn v-b-toggle.collapse2 variant="primary">Игрок</b-btn>
    <b-collapse id="collapse2" class="mt-2">
      <b-card>
        {{ player }}
      </b-card>
    </b-collapse>
    <div slot="modal-footer">
      <b-btn variant="primary" flat @click.stop="loadPlayer">Загрузить</b-btn>
      <b-btn variant="primary" flat @click.stop="cancelLoadPlayer">Закрыть</b-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'LoadModal',
  data: function () {
    return {
      loadData: ''
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    cancelLoadPlayer () {
      this.$root.$emit('bv::hide::modal', 'loadModal')
    },
    loadPlayer () {
      this.player.load(JSON.parse(this.loadData))
      this.$root.$emit('bv::hide::modal', 'modalLoad')
    }
  }
}
</script>
