<template>
    <v-layout row>
      <v-dialog v-model="inFight" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Бой</v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs6 v-if="player">
                <v-card>
                  <v-card-title>
                    <h2>{{player.title}}</h2>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs9>{{player.skl.title}}</v-flex>
                      <v-flex xs3>{{player.skl.value}}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs9>{{player.sta.title}}</v-flex>
                      <v-flex xs3>{{player.sta.value}}</v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs6 v-if="enemy">
                <v-card>
                  <v-card-title>
                    <h2>{{enemy.title}}</h2>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs9>Ловкость</v-flex>
                      <v-flex xs3>{{enemy.skl}}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs9>Сила</v-flex>
                      <v-flex xs3>{{enemy.sta}}</v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <div class="battle-log" v-html="battleLog"></div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat v-if="inFight" @click.native="attack">Атаковать</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
              <template v-for="(item, id) in chapter.items">
                <v-card class="ma-4" :key="id" v-if="!item.canTake">
                  <v-card-text v-html="item.description">
                  </v-card-text>
                </v-card>
              </template>
            </v-list>
            <v-card v-if="battleLog">
              <v-card-text v-html="battleLog">
              </v-card-text>
            </v-card>
            <h1 v-if="player.sta.value === 0">Ваше путешествие окончено!</h1>
          </v-card-text>
          <v-card-actions v-if="(player.sta.value > 0) && (!inFight)">
            <v-layout row wrap>
              <template v-for="(item, id) in chapter.items">
                <v-flex xs12 :key="'i' + id" v-if="item.active">
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
    return {
      chapter: null,
      player: store.state.player,
      inFight: false,
      enemy: null,
      battleLog: ''
    }
  },
  methods: {
    loadChapter: function (id) {
      this.chapter = store.state.chapters[id]
      this.chapter.load(store.state.player)
      this.battleLog = ''
      if (this.chapter.enemies.length) {
        this.inFight = true
        this.enemy = this.chapter.enemies[0]
        console.log(this.enemy)
      }
    },
    doAction: function (action) {
      var newChapterID = 0
      if (action.chapter) {
        newChapterID = action.chapter
      } else {
        newChapterID = action.action(store.state.player)
      }
      window.scrollTo(0, 0)
      this.$router.push('/chapter/' + newChapterID)
      this.loadChapter(newChapterID)
    },
    takeItem: function (item) {
      var canTake = store.state.player.takeItem(item)

      if (canTake) {
        this.chapter.items = this.chapter.items.filter(function (element, i) {
          return element !== item
        })
        this.chapter.load(store.state.player)
      }
    },
    attack: function () {
      var attack = this.player.fight(this.enemy)
      console.log(attack)
      this.inFight = ((this.player.sta.value > 0) && (this.enemy.sta > 0))
      if (attack.result > 0) {
        this.battleLog += '<p class="info--text">' + this.player.title +
          '(' + attack.player + ') наносит удар.<br>\n' +
          this.enemy.title + '(' + attack.enemy + ') получает ранение (' +
          attack.wound + ').</p>\n'
        return
      }
      if (attack.result < 0) {
        this.battleLog += '<p class="red--text">' + this.enemy.title +
          '(' + attack.enemy + ') наносит удар.<br>\n' +
          this.player.title + '(' + attack.player + ') получает ранение (' +
          attack.wound + ').</p>\n'
        return
      }
      this.battleLog += '<p class="yellow--text">' + this.player.title +
        '(' + attack.player + ') наносит удар.<br>\n' +
        this.enemy.title + '(' + attack.enemy + ') наносит удар.</p>\n'
    }
  },
  created: function () {
    this.loadChapter(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.battle-log {
  height: 100px;
  overflow: auto;
}
</style>
