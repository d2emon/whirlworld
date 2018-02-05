import dragonflies from './dragonflies.js'
import robots from './robots.js'
import legends from './legends.js'
import stones from './stones.js'

import characters from './characters.js'

// import {describe, addDescription, addReplica} from './description.js'
import desc from './description.js'

var chapters = []

for (var i = 0; i < 665; i++) {
  chapters.push({
    __proto__: desc.chapter,
    id: i,
    title: '&#xa7;' + i
  })
}

chapters[1].generate = function (player) {
  this.actions = []

  this.description = '<p>Ворота выглядят не так, как вы их себе представляли. ' +
    'У ваших ног — большая металлическая чаша. Вторая чаша — перевернутая — ' +
    'куполом нависает над первой на высоте в полтора человеческих роста. А ' +
    'между ними — столб теплого золотого света.</p>'
  this.story = [
    desc.describe('<p>Вы уже приготовились вступить в световой поток, как вдруг инженер кладет руку вам на плечо.</p>'),
    characters.engineer.say('Еще одна просьба. Из-за подлого Бронсона у нас перепутаны все сведения в банке данных... Обратите внимание — над каждыми Воротами обозначен их кодовый номер. Будем признательны, если запишете для нас номера всех Ворот, через которые вам придется пройти.'),
    player.say('Ладно, это нетрудно. Но я же вижу, что вы еще что-то хотите сказать!'),
    characters.engineer.say('Да, <em class="grey--text text--lighten-2">— хмуро кивает инженер, —</em> должен предупредить. Если вы вторично попадете в Мир, где недавно уже побывали, произойдет перегрузка основного контура, и вас зашвырнет неизвестно куда, в любую точку Вселенной... или даже за ее пределы. Это непредсказуемо!'),
    player.say('Это как раз то, что мне хотелось услышать для поднятия духа, <em class="grey--text text--lighten-2">— мрачно отвечаете вы и делаете шаг вперед...</em>')
  ]
  this.actions.push({
    title: 'Войти в Ворота',
    action: function (player) {
      var links = [366, 290, 345, 178]
      let roll = 10
      while (roll > 4) {
        roll = player.roll()
      }
      return links[roll - 1]
      // vue.$router.push('/chapter/' + links[roll - 1])
    }
  })
}

chapters[404].generate = function (player) {
  this.actions.push({
    title: 'Вам сюда',
    action: function (player) {
      var links = [366, 290, 345]
      let roll = player.roll()
      if (roll > 3) roll -= 3
      return links[roll - 1]
    }
  })
}

chapters[641].generate = function (player) {
  this.actions.push({
    title: 'Вам сюда',
    action: function (player) {
      var links = [290, 345, 178]
      let roll = player.roll()
      if (roll <= 2) return links[0]
      if (roll <= 4) return links[1]
      return links[2]
    }
  })
}

// 178
robots.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].title = '&#xa7;' + item.id
})

// 290
stones.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].title = '&#xa7;' + item.id
})

// 345
dragonflies.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].title = '&#xa7;' + item.id
})

// 366
legends.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].title = '&#xa7;' + item.id
})

console.log(chapters)

export default chapters
