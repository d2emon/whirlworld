<template>
  <b-modal id="saveModal" max-width="500px">
    <div slot="modal-title">
      Сохранить данные
    </div>
    <h3>Данные игрока</h3>
    <b-form-textarea
      :value="player.save()"
      readonly
      rows="5">
    </b-form-textarea>
    <b-btn v-b-toggle.collapse1 variant="primary">Игрок</b-btn>
    <b-collapse id="collapse1" class="mt-2">
      <b-card>
        {{ player }}
        <hr>
        {{ player.save() }}
      </b-card>
    </b-collapse>
    <div slot="modal-footer">
      <b-btn variant="primary" flat @click.stop="cancelSavePlayer">Закрыть</b-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'SaveModal',
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    cancelSavePlayer () {
      this.$root.$emit('bv::hide::modal', 'saveModal')
    }
  }
}
</script>
