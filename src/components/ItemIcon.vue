<template>
  <b-card no-body
    class="item-card"
    :img-src="image()"
    :img-alt="item.title"
    img-fluid
    img-top
    @click="itemClick">
    <h4 slot="header">{{ item.title }}</h4>
    <b-card-body v-if="item.description || item.full">
      <div v-if="item.description">{{ item.showDescription() }}</div>
      <div v-if="item.full">{{ item.full }}</div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'ItemIcon',
  props: [
    'item'
  ],
  methods: {
    image: function () {
      if (!this.item.image) return null

      return '/static/items/' + this.item.image
    },
    itemClick: function () {
      this.$emit('click')
    }
  }
}
</script>

<style>
.item-card .card-img-top {
  max-height: 200px;
  max-width: 200px;
  margin: auto;
}
.item-card {
  max-height: 20rem;
  // height: 15rem;
  width: 13rem;
}
</style>
