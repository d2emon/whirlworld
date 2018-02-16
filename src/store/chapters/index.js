// import dragonflies from './dragonflies.js'
// import robots from './robots.js'
// import legends from './legends.js'
// import stones from './stones.js'

import gate from '../gate.js'
import world from '../world'

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
  this.description = 'Ворота выглядят не так, как вы их себе представляли. ' +
    'У ваших ног — большая металлическая чаша. Вторая чаша — перевернутая — ' +
    'куполом нависает над первой на высоте в полтора человеческих роста. А ' +
    'между ними — столб теплого золотого света.'
  this.story = [
    desc.describe('Вы уже приготовились вступить в световой поток, как ' +
      'вдруг инженер кладет руку вам на плечо.'),
    characters.engineer.say('Еще одна просьба. Из-за подлого Бронсона у нас ' +
      'перепутаны все сведения в банке данных... Обратите внимание — над ' +
      'каждыми Воротами обозначен их кодовый номер. Будем признательны, ' +
      'если запишете для нас номера всех Ворот, через которые вам придется ' +
      'пройти.'),
    player.say('Ладно, это нетрудно. Но я же вижу, что вы еще что-то хотите ' +
      'сказать!'),
    characters.engineer.say('Да, <em>— хмуро кивает инженер, —</em> должен ' +
      'предупредить. Если вы вторично попадете в Мир, где недавно уже ' +
      'побывали, произойдет перегрузка основного контура, и вас зашвырнет ' +
      'неизвестно куда, в любую точку Вселенной... или даже за ее пределы. ' +
      'Это непредсказуемо!'),
    player.say('Это как раз то, что мне хотелось услышать для поднятия ' +
      'духа, <em>— мрачно отвечаете вы и делаете шаг вперед...</em>')
  ]
  this.world = null
  this.actions = []
  this.actions.push({
    title: 'Войти в Ворота',
    action: gate.go1
  })
}

chapters[404].generate = function (player) {
  this.world = null
  this.actions.push({
    title: 'Вам сюда',
    action: gate.go404
  })
}

chapters[641].generate = function (player) {
  this.world = null
  this.actions.push({
    title: 'Вам сюда',
    action: gate.go641
  })
}

// 178
world.robots.chapters.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].world = world.robots
  chapters[item.id].title = '&#xa7;' + item.id
})

// 290
world.stones.chapters.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].world = world.stones
  chapters[item.id].title = '&#xa7;' + item.id
})

// 345
world.dragonflies.chapters.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].world = world.dragonflies
  chapters[item.id].title = '&#xa7;' + item.id
})

// 366
world.legends.chapters.forEach(function (item, i, arr) {
  chapters[item.id] = item
  chapters[item.id].world = world.legends
  chapters[item.id].title = '&#xa7;' + item.id
})

console.log(chapters)

export default chapters
