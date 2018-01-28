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
            <v-layout row wrap>
              <template v-for="(item, id) in chapter.items">
                <v-flex xs12 :key="'i' + id">
                  <v-tooltip bottom>
                    <v-btn flat slot="activator" @click.stop="takeItem(item)">{{ item.short ? item.short : item.title }}</v-btn>
                    <h1>{{ item.title }}</h1>
                    <div v-if="item.description">{{ item.description }}</div>
                    <div v-if="item.full">{{ item.full }}</div>
                  </v-tooltip>
                </v-flex>
              </template>
              <template v-for="(action, id) in chapter.actions">
                <v-flex xs12 :key="id">
                  <v-btn v-if="(action.chapter) || (action.action)" flat @click.stop="doAction(action)">{{ action.title }}</v-btn>
                  <div v-else>{{ action.title }}</div>
                </v-flex>
              </template>
            </v-layout>
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
      if (action.chapter) {
        var goto = action.chapter
      } else {
        var goto = action.action(store.state.player)
      }
      window.scrollTo(0, 0)
      this.$router.push('/chapter/' + goto)
      this.chapter = store.state.chapters[this.$route.params.id]
      this.chapter.generate(store.state.player)
    },
    takeItem: function (item) {
      alert(item)

      store.state.player.takeItem(item)

      this.chapter.items = this.chapter.items.filter(function (element, i) {
        return element !== item
      })
      this.chapter.generate(store.state.player)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
