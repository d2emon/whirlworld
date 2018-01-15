<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-card>
        <v-card-text>
          <blockquote class="blockquote caption">
            <p>Если неприятность может произойти, она обязательно происходит.</p>
            <p class="grey--text">Закон Мерфи, 2-я пол. ХХ века</p>
          </blockquote>
      <hr>
      <v-card>
        <v-card-text>
          <div>Мастерство: {{ stats.skl }}</div>
          <div>Выносливость: {{ stats.sta }}</div>
          <div>Удача: {{ stats.lck }}</div>
        </v-card-text>
      </v-card>
      <hr>
      <v-card>
        <v-card-text>
          <ul>
            <template v-for="i in items">
              <li>Item {{ i }}</li>
            </template>
          </ul> 
        </v-card-text>
      </v-card>
        </v-card-text>
      </v-card>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Вереница Миров</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import('vuetify/dist/vuetify.min.css')

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    source: 'String',
    stats: {
      skl: 12,
      sta: 24,
      lck: 12
    },
    items: [
      null,
      null,
      null,
      null,
      null,
      null,
    ]
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
