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
  }
}
