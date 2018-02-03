import items from './chapters/items.js'

var statBlocks = [
  null,
  null,
  {skl: 8, sta: 22, cha: 8},
  {skl: 10, sta: 20, cha: 6},
  {skl: 12, sta: 16, cha: 5},
  {skl: 9, sta: 18, cha: 8},
  {skl: 11, sta: 20, cha: 6},
  {skl: 9, sta: 20, cha: 7},
  {skl: 10, sta: 16, cha: 7},
  {skl: 8, sta: 24, cha: 7},
  {skl: 9, sta: 22, cha: 6},
  {skl: 10, sta: 18, cha: 7},
  {skl: 11, sta: 20, cha: 5}
]

function stat (title) {
  return {
    title: title,
    value: 6,
    max: 6,
    percent: function () {
      return (this.value / this.max) * 100
    },
    color: function () {
      if (this.percent() === 100) return 'info'
      if (this.percent() > 50) return 'warning'
      return 'error'
    },
    restore: function (value) {
      this.value = parseInt(this.value)
      if (this.value + value > this.max) {
        this.value = this.max
        return
      }
      this.value += value
    }
  }
}
var skl = stat('Ловкость')
var sta = stat('Сила')
var cha = stat('Обаяние')
var lck = stat('Удача')

lck.data = [true, true, true, true, true, true]
lck.value = function () {
  var luck = 0
  for (let i = 0; i < 6; i++) {
    if (this.data[i]) luck++
  }
  return luck
}
lck.percent = function () {
  return (this.value() / 6) * 100
}
lck.max = 6
lck.restore = function () {
  var roll = Math.floor(Math.random() * 6) + 1
  this.data[roll] = true
}

var player = {
  ready: false,
  avatar: '/static/avatar/player.jpeg',
  title: 'Игрок',
  skl: skl,
  sta: sta,
  cha: cha,
  lck: lck,
  attack: 2,
  chapter: 0,
  items: [
    null,
    null,
    null,
    null,
    null,
    null
  ],
  blaster: items.blaster,
  noBag: [],
  log: [],
  save: function () {
    return {
      avatar: this.avatar,
      title: this.title,
      skl: { value: this.skl.value, max: this.skl.max },
      sta: { value: this.sta.value, max: this.sta.max },
      cha: { value: this.cha.value, max: this.cha.max },
      lck: this.lck.data
    }
  },
  setStats: function (sklValue, staValue, chaValue) {
    this.skl.value = sklValue
    this.skl.max = sklValue
    this.sta.value = staValue
    this.sta.max = staValue
    this.cha.value = chaValue
    this.cha.max = chaValue
  },
  generate: function () {
    let roll = this.roll() + this.roll()
    let stats = statBlocks[roll]
    this.setStats(stats.skl, stats.sta, stats.cha)
    for (let i = 0; i < 6; i++) {
      this.lck.data[i] = true
    }
    for (let i = 0; i < 2; i++) {
      let roll = Math.floor(Math.random() * 6)
      this.lck.data[roll] = false
    }
    for (let i = 0; i < 6; i++) {
      this.items[i] = null
    }
    this.noBag = [
      this.blaster
    ]
    this.blaster.shots = 1
    this.log = []
    this.ready = true
  },
  roll: function () {
    return Math.floor(Math.random() * 6) + 1
  },
  testLuck: function (win, loose) {
    let roll = this.roll()
    if (!this.lck.data[roll - 1]) return loose
    this.lck.data[roll - 1] = false
    return win
  },
  testCha: function (win, loose) {
    let roll = this.roll() + this.roll()
    if (roll <= this.cha.value) {
      this.cha.value++
      return win
    } else {
      this.cha.value--
      return loose
    }
  },
  wound: function (value) {
    if (value >= this.sta.value) {
      this.sta.value = 0
      return
    }
    this.sta.value -= value
  },
  takeItem: function (item) {
    item.onTake(this)

    if (!item.canTake) return false

    if (item.noBag) {
      this.noBag.push(item)
      return true
    }
    var res = false
    for (let i = 0; i < this.items.length; i++) {
      if (!this.items[i]) {
        this.items[i] = item
        res = true
        break
      }
    }
    if (!res) {
      alert('Ваш рюкзак забит.')
      return false
    }
    if (item.chapter) {
      this.chapter = item.chapter
    }
    return res
  },
  backpackPlace: function () {
    var items = this.items.filter( function (x) { return x } )
    return (items.length / 6) * 100
  },
  backpackColor: function () {
    if (this.backpackPlace() < 50) return 'success'
    if (this.backpackPlace() < 100) return 'yellow'
    return 'red'
  },
  attackRoll: function () {
    return this.roll() + this.roll() + this.skl.value
  },
  fight: function (enemy, enemies) {
    var playerStr = this.attackRoll()
    var enemyStr = enemy.attackRoll()
    var enemiesStr = []
    var wounds = []
    var player = this

    if (playerStr > enemyStr) {
      enemy.wound(player.attack)
    }
    wounds.push({
      attacker: {
        actor: player,
        roll: playerStr
      },
      defender: {
        actor: enemy,
        roll: enemyStr
      },
      hit: (playerStr > enemyStr),
      wound: (playerStr > enemyStr) ? player.attack : 0
    })

    enemies.forEach(function (e) {
      var roll = 0
      if (e === enemy) {
        roll = enemyStr
      } else {
        roll = e.attackRoll()
      }

      enemiesStr.push(roll)
      if (playerStr < roll) {
        player.wound(e.attack)
      }
      wounds.push({
        attacker: {
          actor: e,
          roll: roll
        },
        defender: {
          actor: player,
          roll: playerStr
        },
        hit: (playerStr < roll),
        wound: (playerStr < roll) ? e.attack : 0
      })
    })

    return wounds
  },
  say: function (text) {
    console.log(this)
    return {
      actor: {
        player: true,
        avatar: this.avatar,
        title: this.title
      },
      dialog: true,
      text: text
    }
  },
  json: function () {
    return JSON.stringify(this)
  }
}

export default player
