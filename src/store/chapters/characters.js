var actor = {
  avatar: '',
  title: '',
  skl: 0,
  sta: 0,
  attack: 2,
  sklModify: 0,
  isPlayer: false,
  actorData: function () {
    return {
      player: this.isPlayer,
      avatar: this.avatar,
      title: this.title
    }
  },
  say: function (text) {
    return {
      actor: this.actorData(),
      dialog: true,
      text: text
    }
  },
  roll: function () {
    return Math.floor(Math.random() * 6) + 1
  },
  attackRoll () {
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
    avatar: 'player.jpeg',
    isPlayer: true,
    title: 'Игрок'
  },
  engineer: {
    __proto__: actor,
    avatar: 'engineer.jpg',
    title: 'Инженер'
  },
  clusha: {
    __proto__: actor,
    avatar: 'clusha.jpg',
    title: 'Клуша',
    world: null,
    describe: function (world) {
      if (!world) world = this.world
      return {
        actor: this.actorData(),
        dialog: true,
        world: world
      }
    }
  },
  robot: {
    __proto__: actor,
    avatar: 'clusha.jpg',
    title: 'Робот',
    skl: 8,
    sta: 8,
    attack: 3
  },
  hornet1: {
    __proto__: actor,
    avatar: 'hornet.jpeg',
    title: '1-Й Шершень',
    skl: 8,
    sta: 8
  },
  hornet2: {
    __proto__: actor,
    avatar: 'hornet.jpeg',
    title: '2-Й Шершень',
    skl: 8,
    sta: 6
  },
  pirate: {
    __proto__: actor,
    avatar: 'pirate.jpeg',
    title: 'Пират',
    skl: 9,
    sta: 9
  },
  spiderMonkey: {
    __proto__: actor,
    avatar: 'spidermonkey.jpg',
    title: 'Обезьянопаук',
    skl: 10,
    sta: 10
  },
  bertold: {
    __proto__: actor,
    avatar: 'bertold.jpg',
    title: 'Бертольд из Соргейля',
    skl: 10,
    sta: 10
  },
  forestMistress: {
    __proto__: actor,
    avatar: 'mistress.jpg',
    title: 'Владычица Древнего Леса'
  },
  murphy: {
    __proto__: actor,
    avatar: 'murphy.jpg',
    title: 'Эргенгард Мерфи'
  },
  sundew: {
    __proto__: actor,
    avatar: 'sundew.jpg',
    sklModify: -1,
    title: 'Росянка',
    skl: 7,
    sta: 8
  },
  predatorBush: {
    __proto__: actor,
    avatar: 'sundew.jpg',
    title: 'Куст-Хищник',
    skl: 9,
    sta: 10
  },
  grasshopper: {
    __proto__: actor,
    avatar: 'grasshopper.jpg',
    title: 'Кузнечик',
    skl: 10,
    sta: 10
  },
  animal1: {
    __proto__: actor,
    avatar: 'wolf.png',
    title: 'Зверь',
    sklModify: -1,
    skl: 9,
    sta: 10
  },
  animal2: {
    __proto__: actor,
    avatar: 'wolf.png',
    title: 'Зверь',
    sklModify: -1,
    skl: 9,
    sta: 8
  },
  predatorBall: {
    __proto__: actor,
    avatar: 'toothball.jpeg',
    title: 'Шар-хищник',
    skl: 10,
    sta: 6
  },
  knight: {
    __proto__: actor,
    avatar: 'knight.jpg',
    title: 'Рыцарь',
    skl: 10,
    sta: 12
  }
}
