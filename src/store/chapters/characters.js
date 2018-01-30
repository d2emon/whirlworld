var actor = {
  avatar: '',
  title: '',
  skl: 0,
  sta: 0,
  attack: 2,
  say: function (text) {
    return {
      dialog: true,
      avatar: this.avatar,
      text: text
    }
  },
  roll: function () {
    return Math.floor(Math.random() * 6) + 1
  },
  attackRoll() {
    return this.roll() + this.roll() + this.skl
  },
  wound: function (value) {
    if (this.sta <= value) {
      this.sta = 0
      return
    }
    this.sta -= value
  }
}

export default {
  player: {
    __proto__: actor,
    avatar: '/static/avatar/player.jpeg'
  },
  engineer: {
    __proto__: actor,
    avatar: '/static/avatar/engineer.jpg'
  },
  clusha: {
    __proto__: actor,
    avatar: '/static/avatar/clusha.jpg'
  },
  robot: {
    __proto__: actor,
    avatar: '/static/avatar/clusha.jpg',
    title: 'Робот',
    skl: 8,
    sta: 8,
    attack: 3
  },
  hornet1: {
    __proto__: actor,
    avatar: '/static/avatar/hornet.jpeg',
    title: '1-Й Шершень',
    skl: 8,
    sta: 8
  },
  hornet2: {
    __proto__: actor,
    avatar: '/static/avatar/hornet.jpeg',
    title: '2-Й Шершень',
    skl: 8,
    sta: 6
  }
}
