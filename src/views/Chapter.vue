<template>
  <b-row>
    <b-modal id="combat" v-model="inFight" persistent max-width="400" @hide="noHide">
      <div slot="modal-title">
        Бой
      </div>
      <b-row>
        <b-col sm="6" v-if="player">
          <b-card no-body
            style="max-width: 20rem;"
            :img-src="'/static/avatar/' + player.avatar"
            :img-alt="player.title"
            img-top>
            <h4 slot="header">{{ player.title }}</h4>
            <b-card-body>
              <b-row>
                <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.skl.title }}</b></small></b-col>
                <b-col sm="4"><small class="text-muted">{{ player.skl.value }}/{{ player.skl.max }}</small></b-col>
                <b-col sm="12">
                  <b-progress height={} class="progress-xs" :variant="player.skl.color()" :value="player.skl.percent()"></b-progress>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.sta.title }}</b></small></b-col>
                <b-col sm="4"><small class="text-muted">{{ player.sta.value }}/{{ player.sta.max }}</small></b-col>
                <b-col sm="12">
                  <b-progress height={} class="progress-xs" :variant="player.sta.color()" :value="player.sta.percent()"></b-progress>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="6" v-if="enemies">
          <b-card no-body
            v-for="(e, id) in enemies"
            v-if="e.sta > 0"
            :key="'enemy' + id"
            style="max-width: 20rem;"
            :img-src="'/static/avatar/' + e.avatar"
            :img-alt="e.title"
            img-top>
            <h4 slot="header">{{ e.title }}</h4>
            <b-card-body>
              <b-row>
                <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.skl.title }}</b></small></b-col>
                <b-col sm="4"><small class="text-muted">{{ e.skl }}</small></b-col>
                <b-col sm="12">
                  <b-progress height={} class="progress-xs" variant="danger" :value="100"></b-progress>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="8" class="text-uppercase mb-1"><small><b>{{ player.sta.title }}</b></small></b-col>
                <b-col sm="4"><small class="text-muted">{{ e.sta }}</small></b-col>
                <b-col sm="12">
                  <b-progress height={} class="progress-xs" variant="danger" :value="100"></b-progress>
                </b-col>
              </b-row>
            </b-card-body>
            <b-card-footer>
              <b-btn variant="primary" flat v-if="inFight" @click="attack(e)">Атаковать</b-btn>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <div class="battle-log" v-html="battleLog">
      </div>
    </b-modal>

    <b-col sm="12">
      <b-card no-body class="w-75 mx-auto">
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
                <b-btn :id="'playitem-' + id" block flat @click.stop="takeItem(item)">{{ item.short ? item.short : item.title }}</b-btn>
                <b-popover
                  :target="'playitem-'+id"
                  placement="bottom"
                  :title="item.title"
                  triggers="hover focus"
                >
                  <div v-if="item.description">{{ item.showDescription() }}</div>
                  <div v-if="item.full">{{ item.full }}</div>
                </b-popover>
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
            <template v-if="chapter.directions">
              <b-col sm="12" v-if="chapter.directions">
                <b-row>
                  <b-col sm="3" v-if="chapter.directions.w">
                    <b-btn block flat @click.stop="doAction(chapter.directions.w)">
                      <i :class="directionIcon('w')"></i>
                      <template v-if="chapter.directions.w.title">{{ chapter.directions.w.title }}</template>
                      <template v-else>На запад</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.n">
                    <b-btn block flat @click.stop="doAction(chapter.directions.n)">
                      <i :class="directionIcon('n')"></i>
                      <template v-if="chapter.directions.n.title">{{ chapter.directions.n.title }}</template>
                      <template v-else>На север</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.s">
                    <b-btn block flat @click.stop="doAction(chapter.directions.s)">
                      <i :class="directionIcon('s')"></i>
                      <template v-if="chapter.directions.s.title">{{ chapter.directions.s.title }}</template>
                      <template v-else>На юг</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.e">
                    <b-btn block flat @click.stop="doAction(chapter.directions.e)">
                      <i :class="directionIcon('e')"></i>
                      <template v-if="chapter.directions.e.title">{{ chapter.directions.e.title }}</template>
                      <template v-else>На восток</template>
                    </b-btn>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="3" v-if="chapter.directions.l">
                    <b-btn block flat @click.stop="doAction(chapter.directions.l)">
                      <i :class="directionIcon('l')"></i>
                      <template v-if="chapter.directions.l.title">{{ chapter.directions.l.title }}</template>
                      <template v-else>Налево</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.f">
                    <b-btn block flat @click.stop="doAction(chapter.directions.f)">
                      <i :class="directionIcon('f')"></i>
                      <template v-if="chapter.directions.f.title">{{ chapter.directions.f.title }}</template>
                      <template v-else>Вперед</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.b">
                    <b-btn block flat @click.stop="doAction(chapter.directions.b)">
                      <i :class="directionIcon('b')"></i>
                      <template v-if="chapter.directions.b.title">{{ chapter.directions.b.title }}</template>
                      <template v-else>Назад</template>
                    </b-btn>
                  </b-col>
                  <b-col sm="3" v-if="chapter.directions.r">
                    <b-btn block flat @click.stop="doAction(chapter.directions.r)">
                      <i :class="directionIcon('r')"></i>
                      <template v-if="chapter.directions.r.title">{{ chapter.directions.r.title }}</template>
                      <template v-else>Направо</template>
                    </b-btn>
                  </b-col>
                </b-row>
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
  </b-row>
</template>

<script>
import GameDialog from '@/components/GameDialog'

export default {
  name: 'Chapter',
  components: {
    GameDialog
  },
  data () {
    return {
      chapter: null,
      player: this.$store.state.player,
      inFight: false,
      enemies: [],
      text: [],
      battleLog: ''
    }
  },
  methods: {
    loadChapter: function (id) {
      this.$store.commit('loadChapter', id)
      this.chapter = this.$store.state.chapter
      this.text = this.$store.state.text
      this.battleLog = this.$store.state.battleLog

      this.enemies = this.$store.getters.enemiesAlive
      this.inFight = this.enemies.length > 0
    },

    directionIcon (direction) {
      if (direction === 'nw') return 'fa fa-mail-reply'
      if (direction === 'n') return 'fa fa-arrow-up'
      if (direction === 'ne') return 'fa fa-mail-forward'
      if (direction === 'e') return 'fa fa-arrow-right'
      if (direction === 's') return 'fa fa-arrow-down'
      if (direction === 'w') return 'fa fa-arrow-left'

      if (direction === 'f') return 'fa fa-chevron-up'
      if (direction === 'r') return 'fa fa-chevron-right'
      if (direction === 'b') return 'fa fa-chevron-down'
      if (direction === 'l') return 'fa fa-chevron-left'
      return ''
    },
    doAction: function (action) {
      var newChapterID = this.chapter.doAction(action, this.$store.state.player)
      if (!newChapterID) return

      this.player.log = this.player.log.concat(this.text)
      this.player.log.push({ text: this.battleLog })
      this.player.log.push({ separator: true })
      this.player.log.push({ text: action.title })
      this.player.log.push({ separator: true })

      window.scrollTo(0, 0)
      this.$router.push('/chapter/' + newChapterID)
      this.loadChapter(newChapterID)
      this.$cookie.set('player', this.player.save())
    },
    takeItem: function (item) {
      var canTake = this.$store.state.player.takeItem(item)

      if (canTake) {
        this.$store.dispatch('removeItem', item)
      }
      this.chapter = this.$store.getters.currentChapter
      this.chapter.load(this.$store.state.player)
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

      if (!this.inFight) {
        this.$root.$emit('bv::hide::modal', 'combat')
      }
    },
    noHide (evt) {
      if (this.inFight) {
        evt.preventDefault()
        // this.$root.$emit('bv::hide::modal', 'combat')
      }
    }
  },
  created: function () {
    this.player.load(JSON.parse(this.$cookie.get('player')))
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
