var item = {
  avatar: '',
  short: '',
  title: '',
  description: '',
  image: '',
  noBag: false,
  canTake: true,
  active: true,
  chapter: null,
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
  id: 1,
  title: 'Бластер',
  short: 'Бластер',
  noBag: true,
  shots: 1,
  image: 'blaster.jpg',
  description: true,
  showDescription: function () {
    return 'Выстрелов: ' + this.shots
  }
}

export default {
  blaster,
  glasses: {
    __proto__: item,
    id: 101,
    title: 'Инфракрасные очки «Ночное зрение»',
    short: 'Инфракрасные очки',
    image: 'glasses.jpeg',
    description: ''
  },
  lighter: {
    __proto__: item,
    id: 102,
    title: 'Зажигалка',
    short: 'Зажигалка',
    image: 'lighter.jpeg',
    description: ''
  },
  tube: {
    __proto__: item,
    id: 103,
    title: 'Тюбик питательной пасты',
    short: 'Тюбик',
    image: 'tube.jpeg',
    description: 'В любой момент восстановит ваши силы до первоначального ' +
      'уровня (увы, пасты хватит лишь на один прием).'
  },
  fan: {
    __proto__: item,
    id: 201,
    title: 'Веер',
    short: 'Веер',
    description: 'Изящный веер на резной ручке.'
  },
  flask: {
    __proto__: item,
    id: 202,
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
    id: 203,
    title: 'Ракетка',
    short: 'Ракетка',
    take: 'ракетку',
    image: 'racket.jpg',
    description: 'Предмет, напоминающий теннисную ракетку, — инвентарь для ' +
      'какой-нибудь игры, забытый при эвакуации.'
  },
  rope: {
    __proto__: item,
    id: 204,
    title: 'Веревка',
    short: 'Веревка',
    take: 'моток',
    image: 'rope.jpg',
    description: 'Аккуратно свернутый моток тонкой оранжевой веревки. Она ' +
      'выглядит какой-то несерьезной (тоже, наверное, для игры). Впрочем, ' +
      'на разрыв веревка оказывается прочной и, вероятно, сможет выдержать ' +
      'солидную тяжесть.'
  },
  extinguisher: {
    __proto__: item,
    id: 205,
    title: 'Огнетушитель',
    short: 'Огнетушитель',
    take: 'небольшом металлическом цилиндрике, раскрашенном красными и ' +
      'белыми полосами',
    image: 'extinguisher.jpg',
    description: 'Да это же огнетушитель! Маленький, одноразового действия...',
    code: -100
    /**
     * Тогда имейте в виду: когда вы захотите его использовать, вычтите 100 из
     * номера параграфа, на котором будете находиться...
     */
  },
  seeds: {
    __proto__: item,
    id: 301,
    title: 'Мешочек с семенами',
    short: 'Семена',
    chapter: 177,
    canTake: false,
    code: 160,
    description: 'Бархатный мешочек с двумя крупными, похожими на шишечки, ' +
      'семенами'
  },
  ring: {
    __proto__: item,
    id: 302,
    title: 'Кольцо',
    short: 'Кольцо',
    chapter: 253,
    description: 'Серебряные кольцо с прозрачным камнем'
  },
  jar: {
    __proto__: item,
    id: 303,
    title: 'Кувшинчик',
    short: 'Кувшинчик',
    chapter: 313,
    code: -80,
    description: 'Небольшой синий кувшинчик с плотно притертой пробкой'
  },
  belt: {
    __proto__: item,
    id: 304,
    title: 'Пояс',
    short: 'Пояс',
    chapter: 353,
    description: 'Шелковый пояс кошмарной пестрой расцветки'
  },
  usedBlaster: {
    __proto__: item,
    id: 206,
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
    id: 401,
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
  },
  liana: {
    __proto__: item,
    id: 501,
    title: 'Лиана',
    short: 'Лиана',
    description: 'Лианы. Они выглядят очень прочными, хотя и тонкими...',
    take: 'С трудом удается дотянуться до одной из них. Лиана и в самом ' +
      'деле так прочна, что с трудом поддается ножу. Пожалуй, она сможет ' +
      'выдержать большой груз. Если в рюкзаке найдется свободное место — ' +
      'будет у вас в дороге веревка.'
  },
  grasshopperMeat: {
    __proto__: item,
    id: 502,
    title: 'Мясо кузнечика',
    short: 'Мясо',
    description: 'Кусок жареного мяса. В любую минуту он прибавит 3 к ' +
      'вашей СИЛЕ.',
    take: 'А если в рюкзаке найдется место, возьмите в дорогу'
  },
  candle: {
    __proto__: item,
    id: 207,
    title: 'Свеча',
    short: 'Свеча',
    image: 'candle.jpg'
  },
  fruitViolet: {
    __proto__: item,
    id: 503, // -505
    title: 'Фиолетовый фрукт',
    short: 'Фиолетовый фрукт',
    code: 204,
    description: 'Ярко-фиолетовый, с глянцевым блеском плод, такой твердый,' +
      'что нож скользит по нему, не оставляя даже царапины...'
  }
}
