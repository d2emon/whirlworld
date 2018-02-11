<template>
  <div class="app">
    <b-modal id="saveModal" max-width="500px">
      <div slot="modal-title">
        Сохранить данные
      </div>
      <h3>Данные игрока</h3>
      <b-form-textarea
        :value="player.save()"
        readonly
        rows="5">
      </b-form-textarea>
      <b-btn v-b-toggle.collapse1 variant="primary">Игрок</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <b-card>
          {{ player }}
          <hr>
          {{ player.save() }}
        </b-card>
      </b-collapse>
      <div slot="modal-footer">
        <b-btn variant="primary" flat @click.stop="cancelSavePlayer">Закрыть</b-btn>
      </div>
    </b-modal>

    <b-modal id="loadModal" max-width="500px">
      <div slot="modal-title">
        Загрузить данные
      </div>
      <h3>Данные игрока</h3>
      <b-form-textarea
        v-model="loadData"
        rows="5">
      </b-form-textarea>
      <b-btn v-b-toggle.collapse2 variant="primary">Игрок</b-btn>
      <b-collapse id="collapse2" class="mt-2">
        <b-card>
          {{ player }}
        </b-card>
      </b-collapse>
      <div slot="modal-footer">
        <b-btn variant="primary" flat @click.stop="loadPlayer">Загрузить</b-btn>
        <b-btn variant="primary" flat @click.stop="cancelLoadPlayer">Закрыть</b-btn>
      </div>
    </b-modal>

    <b-modal id="editModal" max-width="500px" :title="player.title">
      <b-row>
        <b-col sm="6" class="text-uppercase mb-1"><small><b>{{ player.skl.title }}</b></small></b-col>
        <b-col sm="3"><b-form-input v-model="player.skl.value" type="number" :placeholder="player.skl.title"></b-form-input></b-col>
        <b-col sm="3"><b-form-input v-model="player.skl.max" type="number" :placeholder="player.skl.title"></b-form-input></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs my-2" :variant="player.skl.color()" :value="player.skl.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6" class="text-uppercase mb-1"><small><b>{{ player.sta.title }}</b></small></b-col>
        <b-col sm="3"><b-form-input v-model="player.sta.value" type="number" :placeholder="player.sta.title"></b-form-input></b-col>
        <b-col sm="3"><b-form-input v-model="player.sta.max" type="number" :placeholder="player.sta.title"></b-form-input></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs my-2" :variant="player.sta.color()" :value="player.sta.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6" class="text-uppercase mb-1"><small><b>{{ player.cha.title }}</b></small></b-col>
        <b-col sm="3"><b-form-input v-model="player.cha.value" type="number" :placeholder="player.cha.title"></b-form-input></b-col>
        <b-col sm="3"><b-form-input v-model="player.cha.max" type="number" :placeholder="player.cha.title"></b-form-input></b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs my-2" :variant="player.cha.color()" :value="player.cha.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="text-uppercase mb-1"><small><b>{{ player.lck.title }}</b></small></b-col>
        <b-col sm="2" v-for="(id, i) in 6" :key="id"> 
          <b-form-checkbox v-model="player.lck.data[i]">{{ i + 1 }}</b-form-checkbox>
        </b-col>
        <b-col sm="12">
          <b-progress height={} class="progress-xs my-2" :variant="player.lck.color()" :value="player.lck.percent()"></b-progress>
        </b-col>
      </b-row>
      <b-btn v-b-toggle.collapse3 variant="primary">Игрок</b-btn>
      <b-collapse id="collapse3" class="mt-2">
        <b-card>
          {{ player }}
        </b-card>
      </b-collapse>
      <div slot="modal-footer">
        <b-btn variant="primary" flat @click.stop="cancelEditPlayer">Закрыть</b-btn>
      </div>
    </b-modal>


    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items,
      loadData: ''
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    },
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    cancelSavePlayer () {
      this.$root.$emit('bv::hide::modal', 'saveModal')
    },
    cancelLoadPlayer () {
      this.$root.$emit('bv::hide::modal', 'loadModal')
    },
    cancelEditPlayer () {
      this.$root.$emit('bv::hide::modal', 'editModal')
    },
    loadPlayer () {
      this.player.load(JSON.parse(this.loadData))
      this.$root.$emit('bv::hide::modal', 'modalLoad')
    }
  }
}
</script>
