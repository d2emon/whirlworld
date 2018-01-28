var actor = {
  avatar: '',
  say: function (text) {
    return {
      dialog: true,
      avatar: this.avatar,
      text: text
    }
  }
}

export default {
  engineer: {
    __proto__: actor,
    avatar: '/static/avatar/engineer.jpg'
  },
  clusha: {
    __proto__: actor,
    avatar: '/static/avatar/clusha.jpg'
  },
  player: {
    __proto__: actor,
    avatar: '/static/avatar/player.jpeg'
  }
}
