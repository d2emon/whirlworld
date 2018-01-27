<template>
    <v-layout row>
      <v-flex xs10>

        <v-card>
          <v-card-title primary-title v-text="$route.params.id">
          </v-card-title>
          <v-card-text>
            <v-list three-line>
              <template v-for="(i, id) in chapter.description">
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
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn v-for="(action, id) in chapter.actions" :key="id" flat @click="doAction(action)">{{ action.title }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import {player} from './player.js'

export default {
  name: 'HelloWorld',
  data () {
    let engineer = {
      avatar: '/static/avatar/engineer.jpg'
    }
    return {
      player: player,
      chapter: {
        description: [
          {
            text: '<p>Ворота выглядят не так, как вы их себе представляли. У ваших ног — большая металлическая чаша.' +
              'Вторая чаша — перевернутая — куполом нависает над первой на высоте в полтора человеческих роста.' +
              'А между ними — столб теплого золотого света.</p>' +
              '<p>Вы уже приготовились вступить в световой поток, как вдруг инженер кладет руку вам на плечо.</p>'
          },
          {
            dialog: true,
            avatar: engineer.avatar,
            text: 'Еще одна просьба. Из-за подлого Бронсона у нас перепутаны все сведения в банке данных... Обратите внимание — над каждыми Воротами обозначен их кодовый номер. Будем признательны, если запишете для нас номера всех Ворот, через которые вам придется пройти.'
          },
          {
            dialog: true,
            avatar: player.avatar,
            text: 'Ладно, это нетрудно. Но я же вижу, что вы еще что-то хотите сказать!'
          },
          {
            dialog: true,
            avatar: engineer.avatar,
            text: 'Да, <em class="grey--text text--lighten-2">— хмуро кивает инженер, —</em> должен предупредить. Если вы вторично попадете в Мир, где недавно уже побывали, произойдет перегрузка основного контура, и вас зашвырнет неизвестно куда, в любую точку Вселенной... или даже за ее пределы. Это непредсказуемо!'
          },
          {
            dialog: true,
            avatar: player.avatar,
            text: 'Это как раз то, что мне хотелось услышать для поднятия духа, <em class="grey--text text--lighten-2">— мрачно отвечаете вы и делаете шаг вперед...</em>'
          }
        ],
        actions: [
          {
            title: 'Войти в Ворота',
            action: function (vue, player) {
              var links = [366, 290, 345, 178]
              let roll = 10
              while (roll > 4) {
                roll = player.roll()
              }
              window.scrollTo(0, 0)
              vue.$router.push('/chapter/' + links[roll - 1])
            }
          }
        ]
      }
    }
  },
  methods: {
    doAction: function (action) {
      action.action(this, player)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
