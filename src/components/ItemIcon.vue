<template>
  <v-tooltip bottom>
    <v-card slot="activator">
      <v-card-media v-if="item.image" :src="'/static/items/' + item.image" height="100px">
      </v-card-media>
      <v-card-actions>
        <v-btn flat dark>Listen now</v-btn>
      </v-card-actions>
    </v-card>
    <h1>{{ item.title }}</h1>
    <div v-if="item.description">{{ item.showDescription() }}</div>
    <div v-if="item.full">{{ item.full }}</div>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ItemIcon',
  props: [
    'item'
  ]
}
</script>
