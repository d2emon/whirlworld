<template>
  <div>
    <template v-for="(i, id) in text">
      <template v-if="i.separator">
        <hr :key="'-' + id">
      </template>

      <div :key="id" class="pa-0 ma-2 message">
        <template v-if="i.actor">
          <div class="py-3 pb-5 mr-3 float-left" v-if="i.actor">
            <div class="avatar">
              <img :src="'/static/avatar/' + i.actor.avatar" class="img-avatar" :alt="i.actor.title">
            </div>
          </div>
          <div>
            <small class="text-muted">{{ i.actor.title }}</small>
          </div>
        </template>

        <div v-if="i.text" v-html="text2html(i.text) + '<br /><br />'"></div>

        <div v-if="i.separator"><hr /></div>

        <div v-if="i.world">
          <b-card>
            <h4 slot="header">{{ i.world.title }}</h4>
            <b-card-body>
              <h5 v-if="i.world.subtitle" v-text="i.world.subtitle"></h5>
              <div v-text="i.world.description"></div>
            </b-card-body>
          </b-card>
        </div>
      </div>

    </template>

    <b-card v-if="battleLog">
      <b-card-body v-html="battleLog">
      </b-card-body>
    </b-card>

    <b-card no-body bg-variant="danger" v-if="dead" header="Ваше путешествие окончено!">
    </b-card>
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
