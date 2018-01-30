<template>
    <v-layout row>
      <v-dialog v-model="inFight" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Бой</v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs6 v-if="player">
                <v-card>
                  <v-card-title>
                    <h2>{{player.title}}</h2>
                  </v-card-title>
                  <v-card-media :src="player.avatar" height="100px">
                  </v-card-media>
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
                <v-card v-for="(id, e) in enemies" v-if="e.sta > 0" :key="'e' + id">
                  <v-card-title>
                    <h2>{{e.title}}</h2>
                  </v-card-title>
                  <v-card-media :src="e.avatar" height="100px">
                  </v-card-media>
                  <v-card-text>
                      <v-layout row>
                        <v-flex xs9>Ловкость</v-flex>
                        <v-flex xs3>{{e.skl}}</v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs9>Сила</v-flex>
                        <v-flex xs3>{{e.sta}}</v-flex>
                      </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" flat v-if="inFight" @click.native="attack(e)">Атаковать</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
            <div class="battle-log" v-html="battleLog"></div>
          </v-card-text>
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
                <v-flex xs12 :key="id" v-if="(!action.canDo) || (action.canDo(player))">
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
      enemies: [],
      battleLog: ''
    }
  },
  methods: {
    loadChapter: function (id) {
      this.enemy = null
      this.enemies = []
      this.chapter = store.state.chapters[id]
      this.chapter.load(store.state.player)
      this.battleLog = ''
      if (this.chapter.enemies.length) {
        this.inFight = true
        this.enemies = this.chapter.enemies
        this.enemy = this.chapter.enemies[0]
        console.log(this.enemy)
      }
    },
    doAction: function (action) {
      var newChapterID = this.chapter.doAction(action, store.state.player)
      if (!newChapterID) return

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
    attack: function (enemy) {
      this.battleLog += '<hr>'
      var attack = this.player.fight(enemy, this.enemies.filter(function (e) {
        return e.sta > 0
      }))

      console.log('attack')
      console.log(attack)
      var enemiesCount = 0
      this.enemies.forEach(function (e) {
        if (e.sta > 0) {
          enemiesCount += 1
        }
      })
      if (this.player.sta.value <= 0) this.inFight = false
      if (!enemiesCount) this.inFight = false

      this.battleLog += '<p>'
      for (var i = 0; i < attack.length; i++) {
        var a = attack[i]
        console.log(a)
        var color = 'info--text'
        var text = a.attacker.actor.title + '(' + a.attacker.roll + ')'
        if (a.hit) {
          if (a.attacker.actor !== this.player) {
            color = 'red--text'
          }
          text += ' наносит удар'
        } else {
          color = 'yellow--text'
          text += ' промахивается.'
        }
        text += '(' + a.wound + ').'
        this.battleLog += '<span class="' + color + '">' + text + '</span><br>'
      }
      this.battleLog += '</p>'
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
