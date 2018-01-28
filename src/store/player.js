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
      console.log(this.title + ' ' + this.percent() + ' vs ' + 100)
      if (this.percent() === 100) return 'info'
      if (this.percent() > 50) return 'warning'
      return 'error'
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

var player = {
  ready: false,
  avatar: '/static/avatar/player.jpeg',
  skl: skl,
  sta: sta,
  cha: cha,
  lck: lck,
  items: [
    null,
    null,
    null,
    null,
    null,
    null
  ],
  noBag: [],
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
    this.noBag = []
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
  wound: function (value) {
    if (value >= this.sta.value) {
      this.sta.value = 0
      return
    }
    this.sta.value -= value
  },
  takeItem: function (item) {
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
    }
    return res
  },
  say: function (text) {
    return {
      dialog: true,
      avatar: this.avatar,
      text: text
    }
  }
}

module.exports = {
  player: player
}