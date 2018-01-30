var item = {
  avatar: '',
  short: '',
  title: '',
  description: '',
  noBag: false,
  canTake: true,
  active: true,
  onTake: function (player) {},
  lowercase: function () {
    if (!this.description) return ''

    return this.description[0].toLowerCase() + this.description.substring(1)
  },
  showDescription: function (player) {
    return this.description
  }
}

var blaster = {
  __proto__: item,
  title: 'Бластер',
  short: 'Бластер',
  noBag: true,
  shots: 1,
  description: true,
  showDescription: function () {
    return 'Выстрелов: ' + this.shots
  }
}

export default {
  blaster,
  fan: {
    __proto__: item,
    title: 'Веер',
    short: 'Веер',
    description: 'Изящный веер на резной ручке.'
  },
  flask: {
    __proto__: item,
    title: 'Фляжка',
    short: 'Фляжка',
    noBag: true,
    description: 'Покрытый узорами серебряный сосудик на цепочке. ' +
      'Судя по легкому аромату, здесь когда-то хранились духи.',
    full: 'Кстати, серебряный сосуд можно использовать как фляжку. В него ' +
        'поместится всего 2 глотка воды, но каждый глоток в пути увеличит ' +
        'вашу СИЛУ на 2. (Правда, воду предстоит еще найти.) Класть фляжку ' +
        'в рюкзак не стоит — удобнее прикрепить цепочку к поясу.'
  },
  racket: {
    __proto__: item,
    title: 'Ракетка',
    short: 'Ракетка',
    take: 'ракетку',
    description: 'Предмет, напоминающий теннисную ракетку, — инвентарь для ' +
      'какой-нибудь игры, забытый при эвакуации.'
  },
  rope: {
    __proto__: item,
    title: 'Веревка',
    short: 'Веревка',
    take: 'моток',
    description: 'Аккуратно свернутый моток тонкой оранжевой веревки. Она ' +
      'выглядит какой-то несерьезной (тоже, наверное, для игры). Впрочем, ' +
      'на разрыв веревка оказывается прочной и, вероятно, сможет выдержать ' +
      'солидную тяжесть.'
  },
  extinguisher: {
    __proto__: item,
    title: 'Огнетушитель',
    short: 'Огнетушитель',
    take: 'небольшом металлическом цилиндрике, раскрашенном красными и ' +
      'белыми полосами',
    description: 'Да это же огнетушитель! Маленький, одноразового действия...',
    code: -100
    /**
     * Тогда имейте в виду: когда вы захотите его использовать, вычтите 100 из
     * номера параграфа, на котором будете находиться...
     */
  },
  usedBlaster: {
    __proto__: item,
    title: 'Бластер',
    short: 'Бластер',
    description: 'Возле тела лежит бластер почти той же конструкции, что и ' +
      'ваш. Ствол поврежден случайной пулей, но зарядник цел.',
    canTake: false,
    onTake: function (player) {
      if (!this.active) return
      this.description += 'Передернув затвор, обнаруживаете последний ' +
        'неиспользованный заряд. Можете взять его с собой.'
      player.blaster.shots += 1
      this.active = false
    }
  },
  usedBlaster2: {
    __proto__: item,
    title: 'Бластер',
    short: 'Бластер',
    description: 'Ну и крепко же бластер грохнулся о камни! Корпус ' +
      'пересекает трещина, затвор покорежен. Хорошо, что зарядник, хоть и с ' +
      'трудом, но открывается...',
    canTake: false,
    onTake: function (player) {
      if (!this.active) return
      this.description += '<p>Какая досада! Этот светлой памяти болван даже ' +
        'не позаботился о полном боезапасе: в бластере только один заряд. ' +
        'Конечно, вы можете взять его себе.</p>'
      player.blaster.shots += 1
      this.active = false
    }
  }
}
