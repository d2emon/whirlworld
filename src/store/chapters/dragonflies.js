// import {addDescription, addReplica} from './description.js'
import desc from './description.js'
import characters from './characters.js'

var chapter = {
  id: 0,
  title: '&#xa7;',
  description: [],
  actions: [],
  generate: function (player) {}
}

var chapters = [
  {
    __proto__: chapter,
    id: 143,
    description: 'Через полгода сотрудники Лаборатории Мерфи налаживают ' +
      'силовую установку и выручают вас из плена.  Но возвращение на Землю ' +
      'получается невеселым: задание с треском провалено! Утешает лишь то, ' +
      'что и Паук не завладел чудовищным оружием. Шеф сухо сообщает вам, что ' +
      'неизвестные лица ведут переговоры о выкупе бета-аннигилятора за ' +
      'громадную сумму. Видимо, придется заплатить. Кто стоит за этой ' +
      'операцией — можно догадаться, но доказать, увы, ничего нельзя. Семейка ' +
      'Коуфордов неплохо наживется на вашем поражении.'
  },
  {
    __proto__: chapter,
    id: 183,
    description: 'Делаете несколько шагов, раздвигая перед собой жесткую ' +
      'траву... и обнаруживаете узенькую дорожку, выложенную плоскими белыми ' +
      'камешками. Здесь явно поработали разумные существа! Заинтересовавшись, ' +
      'идете по дорожке и доходите до развилки.',
    actions: [
      { title: 'Куда свернете?' },
      { title: 'Налево', action: () => { return 31 } },
      { title: 'Направо', action: () => { return 231 } }
    ]
  },
  {
    __proto__: chapter,
    id: 231,
    description: 'Вскоре вы вновь оказываетесь на развилке.',
    actions: [
      { title: 'Какую дорожку выберете на этот раз?' },
      { title: 'Левую', action: () => { return 267 } },
      { title: 'Правую', action: () => { return 479 } }
    ]
  },
  {
    __proto__: chapter,
    id: 345,
    description: 'Тошнота и головокружение чуть не валят вас с ног. Кажется, ' +
      'вы уже в каком-то другом месте, но уверенности в этом нет: вы почти ' +
      'ничего не видите, в ушах стоит гулкий звон. В мозг пробивается голос ' +
      'Клуши:',
    story: [
      characters.clusha.say('Мир стрекоз. Планета земного типа.'),
      characters.clusha.say('Населена преимущественно насекомыми. Известны три разумных вида: стрекозы, муравьи и малоизученные морские жители — предположительно водяные пауки. Имеются и неразумные животные, в том числе и хищные. Флора богата и разнообразна, много хищных растений разных видов...'),
      desc.describe(
        '<p>Головокружение проходит. Глубоко вдохнув свежий, пахнущий медом воздух, оглядываетесь по сторонам.</p>' +
        '<p>Вы словно попали на картинку из детской книжки! Все вокруг напоминает Землю, но небо здесь ярче, трава зеленее, а громадные цветы, разбросанные вокруг, сияют чистыми, сочными красками. На юге (как вы определяете по солнцу) протянулся невысокий, но очень длинный горный хребет. Клуша тут же сообщает что это — так называемые Горы Черных Тайн, откуда не вернулся ни один исследовательский отряд. Местность к северу от гор более-менее изучена. К сожалению, карты похищены Бронсоном, но известно, что на севере находится морское побережье, а где-то к северо-востоку — колония воинственных муравьев...</p>'
      )
    ],
    actions: [
      { title: 'Куда двинетесь?' },
      { title: 'На юг, к горам', action: () => { return 23 } },
      { title: 'На север, к морю', action: () => { return 603 } }
    ]
  },
  {
    __proto__: chapter,
    id: 450,
    description: 'Не успеваете сделать и десятка шагов, как слышите резкий ' +
      'щелкающий окрик. Вас окружает дюжина существ, похожих на громадных ' +
      'черных муравьев. Они вооружены заостренными палками. Каждый выглядит ' +
      'сильным соперником в одиночку, а уж толпой...',
    actions: [
      { title: 'Словом, разумнее всего сделать то, что они требуют: проследовать за ними в муравейник.', action: () => { return 523 } }
    ]
  },
  {
    __proto__: chapter,
    id: 479,
    description: 'Дорожка, петляя среди колючих кустов, ведет на ' +
      'северо-восток. Внезапно кусты расступаются. Перед вами возвышается ' +
      'что-то, напоминающие рыцарский замок, только башни странно округлены ' +
      'сверху. Клуша тут же информирует вас, что это муравейник. Муравьи — ' +
      'разумные, но почти не изученные, поскольку на контакт идут крайне ' +
      'неохотно.',
    actions: [
      { title: 'Рискнете подойти к муравейнику в надежде узнать что-либо о Воротах?', action: () => { return 450 } },
      { title: 'Или как можно осторожнее, пробираясь кустами, обойдете муравейник и пойдете дальше на север?', action: () => { return 268 } }
    ]
  },
  {
    __proto__: chapter,
    id: 523,
    description: '<p>Не раз и не два придется вам пожалеть о том, что вы ' +
      'очутились в муравейнике. Вас ждет самое унизительное и горькое ' +
      'рабство: тяжелый труд по расчистке подземных переходов от мусора, ' +
      'долгие дни и ночи почти без света. Несколько попыток совершить побег ' +
      'приведут лишь к тому, что вы заплутаете в подземных лабиринтах и ' +
      'будете жестоко искусаны изловившими вас шестиногими хозяевами.</p>' +
      '<p>И лишь одно будет вас немного утешать: долгие телепатические ' +
      'разговоры о быте и нравах муравьев, которые вы (при помощи Клуши) ' +
      'будете вести с ошалевшими от счастья ксенобиологами и этнографами. ' +
      'Так сказать, «наш человек в муравейнике».</p>',
    actions: [
      { title: 'Далее', action: () => { return 143 } }
    ]
  },
  {
    __proto__: chapter,
    id: 603,
    generate: function (player) {
      this.actions = [
        { title: 'Откуда же начнется ваш путь?' },
        {
          title: 'Куда завел вас Переход?',
          // 'Бросьте кубик. Если выпадет четное число, вы попали сюда. Если нечетное, то сюда.'
          action: (player) => { return (player.roll() % 2) ? 183 : 107 }
        }
      ]
    }
  }
]

export default chapters
