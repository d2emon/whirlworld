<template>
  <aside class="aside-menu">
    <b-tabs>
      <b-tab title="<i class='icon-user'></i>">
        <div class="p-3">
          <player-panel :player="player"/>
        </div>
      </b-tab>

      <b-tab title="<i class='icon-briefcase'></i>">
        <div class="p-3">
          <items-panel :player="player"/>
        </div>
      </b-tab>

      <b-tab title="<i class='icon-bubble'></i>">
        <div class="p-3">
          <b-card>
            <blockquote>
              <small>
                <p>Если неприятность может произойти, она обязательно происходит.</p>
                <p class="grey--text">Закон Мерфи, 2-я пол. ХХ века</p>
              </small>
            </blockquote>
          </b-card>
          <b-card>
            {{ player }}
          </b-card>
        </div>
      </b-tab>

      <b-tab title="<i class='icon-globe'></i>" v-if="world">
        <div class="p-3">
          <b-card>
            <h4 slot="header">{{ world.title }}</h4>
            <b-card-body>
              <h5 v-if="world.subtitle" v-text="world.subtitle"></h5>
              <div v-text="world.description"></div>
            </b-card-body>
          </b-card>
        </div>
      </b-tab>
    </b-tabs>
  </aside>
</template>

<script>
import Callout from './Callout'
import cSwitch from './Switch'
import PlayerPanel from './PlayerPanel'
import ItemsPanel from './ItemsPanel'

export default {
  name: 'c-aside',
  components: {
    Callout,
    cSwitch,
    PlayerPanel,
    ItemsPanel
  },
  computed: {
    player: function () { return this.$store.state.player },
    world: function () { return this.$store.getters.world }
  }
}
</script>
