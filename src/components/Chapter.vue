<template>
  <b-row>
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
                  <v-card-media :src="'/static/avatar/' + player.avatar" height="100px">
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
                  <v-card-media :src="'/static/avatar/' + e.avatar" height="100px">
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

    <b-col>
      <b-card no-body>
        <b-card-header v-html="chapter.title">
        </b-card-header>
        <b-card-body v-if="text.length || battleLog.length">
        <div v-if="text.length || battleLog.length" class="p-3">
          <game-dialog :text="text" :battleLog="battleLog" :dead="player.sta.value <= 0">
          </game-dialog>
        </div>
        </b-card-body>
        <b-card-footer v-if="(player.sta.value > 0) && (!inFight)">
          <b-row>
            <template v-for="(item, id) in chapter.items">
              <b-col sm="12" :key="'i' + id" v-if="item.active">
                  <v-tooltip bottom>
                    <v-btn block flat slot="activator" @click.stop="takeItem(item)">{{ item.short ? item.short : item.title }}</v-btn>
                    <h1>{{ item.title }}</h1>
                    <div v-if="item.description">{{ item.description }}</div>
                    <div v-if="item.full">{{ item.full }}</div>
                  </v-tooltip>
              </b-col>
            </template>
            <template v-for="(action, id) in chapter.actions">
              <b-col sm="12" :key="id" v-if="(!action.canDo) || (action.canDo(player))">
                <b-btn v-if="(action.chapter) || (action.action)" block flat @click.stop="doAction(action)">
                  <i v-if="action.direction" :class="directionIcon(action.direction)"></i>
                  {{ action.title }}
                </b-btn>
                <div v-else>{{ action.title }}</div>
              </b-col>
            </template>
            <b-col sm="12" v-if="chapter.defaultAction">
              <b-btn block flat @click.stop="doAction(chapter.defaultAction)">
                Далее
              </b-btn>
            </b-col>
            <b-col sm="12" v-if="player.log.length">
              <hr />
              <b-card no-body class="w-100 mb-1" v-if="player.log.length">
                <b-card-header header-tag="header" class="p-0" role="tab">
                  <b-btn block href="#" v-b-toggle.history>История</b-btn>
                </b-card-header>
                <b-collapse id="history" role="tabpanel">
                  <b-card-body>
                    <game-dialog :text="player.log" :battleLog="false" :dead="false">
                    </game-dialog>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </b-col>
          </b-row>
        </b-card-footer>
      </b-card>
    </b-col>
    <b-col sm="3">
      <player-panel />
    </b-col>
  </b-row>
</template>

<script>
import store from '@/store'
import GameDialog from '@/components/GameDialog'
import PlayerPanel from '@/components/PlayerPanel'

export default {
  name: 'HelloWorld',
  components: {
    GameDialog,
    PlayerPanel
  },
  data () {
    return {
      chapter: null,
      player: store.state.player,
      inFight: false,
      enemies: [],
      text: [],
      battleLog: ''
    }
  },
  methods: {
    loadChapter: function (id) {
      this.enemies = []
      this.chapter = store.state.chapters[id]
      this.text = this.chapter.load(store.state.player)
      this.battleLog = ''
      console.log(this.chapter.enemies)
      if (this.chapter.enemies.length) {
        this.enemies = this.chapter.enemies.filter(function (item) {
          return item.sta > 0
        })
        this.inFight = this.enemies.length > 0
      }
    },
    directionIcon (direction) {
      if (direction === 'nw') return 'mdi-arrow-top-left'
      if (direction === 'n') return 'arrow_upward'
      if (direction === 'ne') return 'mdi-arrow-top-right'
      if (direction === 'e') return 'arrow_forward'
      if (direction === 's') return 'arrow_downward'
      if (direction === 'w') return 'arrow_back'
      if (direction === 'l') return 'chevron_left'
      if (direction === 'r') return 'chevron_right'
      return ''
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
