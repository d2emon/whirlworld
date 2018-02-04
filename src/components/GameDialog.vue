<template>
  <div>
    <template v-for="(i, id) in text">
      <template v-if="i.separator">
        <hr :key="id">
      </template>
      <v-card :key="id" v-if="i.text" flat class="grey pa-0 ma-2">
        <v-card-text class="pa-0">
          <v-layout row spacer>
            <v-flex xs1 pr-3 v-if="i.actor && !i.actor.player">
              <v-tooltip bottom>
                <v-avatar slot="activator">
                  <img :src="'/static/avatar/' + i.actor.avatar">
                </v-avatar>
                <span>{{ i.actor.title }}</span>
              </v-tooltip>
            </v-flex>
            <v-flex>
              <v-card color="grey darken-1">
                <v-card-text v-html="text2html(i.text)">
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs1 pl-3 pr-5 v-if="i.actor && i.actor.player">
              <v-tooltip bottom>
                <v-avatar slot="activator">
                  <img :src="'/static/avatar/' + i.actor.avatar">
                </v-avatar>
                <span>{{ i.actor.title }}</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>

    <v-card v-if="battleLog">
      <v-card-text v-html="battleLog">
      </v-card-text>
    </v-card>

    <v-card no-body color="grey darken-1" class="ma-2" v-if="dead">
      <v-card-title primary-title v-html="'<h1>Ваше путешествие окончено!</h1>'">
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GameDialog',
  props: [
    'text',
    'battleLog',
    'dead'
  ],
  methods: {
    text2html: function (text) {
      return '<p>' + (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1</p>\n<p>$2') + '</p>'
    }
  }
}
</script>
