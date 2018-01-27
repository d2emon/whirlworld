<template>
    <v-layout row>
      <v-flex xs10>

        <v-card>
          <v-card-title primary-title>
            <h1 v-html="chapter.title"></h1>
          </v-card-title>
          <v-card-text>
            <div v-html="chapter.description">
            </div>
            <v-list three-line>
              <template v-for="(i, id) in chapter.story">
                <v-list-tile avatar v-if="i.dialog" :key="id">
                  <v-list-tile-avatar v-if="i.avatar">
                    <img :src="i.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content class="body-1">
                    <div v-html="i.text"></div>
                  </v-list-tile-content>
                </v-list-tile>
                <v-card class="ma-4" :key="id" v-else>
                  <v-card-text v-html="i.text">
                  </v-card-text>
                </v-card>
              </template>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <template v-for="(action, id) in chapter.actions">
              <v-btn v-if="action.action" :key="id" flat @click="doAction(action)">{{ action.title }}</v-btn>
              <span v-else :key="id">{{ action.title }}</span>
            </template>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import store from '@/store'

export default {
  name: 'HelloWorld',
  data () {
    var chapter = store.state.chapters[this.$route.params.id]
    chapter.generate(store.state.player)
    return {
      chapter: chapter
    }
  },
  methods: {
    doAction: function (action) {
      var goto = action.action(store.state.player)
      window.scrollTo(0, 0)
      this.$router.push('/chapter/' + goto)
      this.chapter = store.state.chapters[this.$route.params.id]
      this.chapter.generate(store.state.player)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
