<template>
  <v-tooltip bottom>
    <v-card slot="activator">
      <v-card-media v-if="item.image" :src="'/static/items/' + item.image" height="100px">
      </v-card-media>
    </v-card>
    <v-card>
      <v-card-title primary-title class="headline">
        {{ item.title }}
      </v-card-title>
      <v-card-text>
        <div v-if="item.description">{{ item.showDescription() }}</div>
        <div v-if="item.full">{{ item.full }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn flat dark>Listen now</v-btn>
      </v-card-actions>
    </v-card>
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
