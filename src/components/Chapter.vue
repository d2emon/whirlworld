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
              <v-flex xs6 v-if="enemies">
                <v-card v-for="(e, id) in enemies" v-if="e.sta > 0" :key="'e' + id">
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

      <v-flex xs12>

        <v-card>
          <v-card-title primary-title>
            <h1 v-html="chapter.title"></h1>
          </v-card-title>
          <v-card-text class="grey">
            <game-dialog :text="text" :battleLog="battleLog" :dead="player.sta.value <= 0">
            </game-dialog>
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

        <v-expansion-panel expand v-if="player.log.length">
          <v-expansion-panel-content>
            <div slot="header">История</div>
            <v-card class="grey">
              <v-card-text>
                <game-dialog :text="player.log" :battleLog="false" :dead="false">
                </game-dialog>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
</template>

<script>
import store from '@/store'
import GameDialog from '@/components/GameDialog'

export default {
  name: 'HelloWorld',
  components: {
    GameDialog
  },
  data () {
    return {
      chapter: null,
      player: store.state.player,
      inFight: false,
      enemy: null,
      enemies: [],
      text: [],
      battleLog: ''
    }
  },
  methods: {
    loadChapter: function (id) {
      this.enemy = null
      this.enemies = []
      this.chapter = store.state.chapters[id]
      this.text = this.chapter.load(store.state.player)
      this.battleLog = ''
      if (this.chapter.enemies.length) {
        this.inFight = true
        this.enemies = this.chapter.enemies
        this.enemy = this.chapter.enemies[0]
      }
    },
    doAction: function (action) {
      var newChapterID = this.chapter.doAction(action, store.state.player)
      if (!newChapterID) return

      this.player.log = this.player.log.concat(this.text)
      this.player.log.push({ text: this.battleLog })
      this.player.log.push({ separator: true })
      this.player.log.push({ text: action.title })
      this.player.log.push({ separator: true })

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
        this.chapter = store.state.chapters[store.state.player.chapter]
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
