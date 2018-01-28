import desc from './description.js'
import characters from './characters.js'
import items from './items.js'

var chapter = {
  id: 0,
  title: '&#xa7;',
  description: '',
  story: [],
  actions: [],
  generate: function (player) {}
}

var chapters = [
  {
    __proto__: chapter,
    id: 104,
    description: 'Вы на улочке, стиснутой длинными одноэтажными домами. ' +
      'Судя по уцелевшим колоннам и лепным узорам вокруг выбитых окон, ' +
      'здесь был не самый бедный район...',
    actions: [
      { title: 'Пойдете прямо по улочке?', action: () => { return 392 } },
      { title: 'Или захотите свернуть в соседний переулок, ведущий направо?', action: () => { return 256 } },
      { title: 'А может быть, решите заглянуть в подъезд ближайшего дома?', action: () => { return 424 } }
    ]
  },
  {
    __proto__: chapter,
    id: 168,
    description: 'Ядовитый дым врывается в горло, рвет в клочья легкие. ' +
      'Задыхаясь от боли, падаете вы на булыжную мостовую. Здесь и ' +
      'кончается ваше путешествие...'
  },
  {
    __proto__: chapter,
    id: 178,
    description: 'Голова начинает кружиться так сильно, что вы ничего не ' +
      'видите вокруг. Стараясь удержаться на ногах, жадно глотаете воздух. ' +
      'Вас оглушает рев снарядов, треск пулеметных очередей, свист пуль. ' +
      'Прижавшись к подножию полуразрушенной стены и зажмурившись, чтобы ' +
      'преодолеть головокружение, слушаете рапорт Клуши:',
    story: [
      characters.clusha.say('Мир Роботов. Планета земного типа.'),
      characters.clusha.say('Еще недавно на ней существовала цивилизация, ' +
        'по уровню развития примерно соответствующая концу 20 века ' +
        'цивилизации Земли. Существа гуманоидного типа, возможно — потомки ' +
        'земных колонистов Эпохи Великого Переселения. Тогда многие из ' +
        'заселенных планет остались неучтенными...'),
      characters.clusha.say('Продолжительная война стала для цивилизации ' +
        'катастрофой. Используемые обеими враждующими сторонами боевые ' +
        'механизмы истребили практически всех людей и теперь воюют между ' +
        'собой, попутно воспроизводя себе подобных из подручных материалов.'),
      characters.clusha.say('За годы битв оба враждующих лагеря ' +
        'перемешались, цель войны давно забыта, каждый боевой робот ' +
        'сражается сам за себя...'),
      desc.describe('Да, не самое уютное местечко во Вселенной... Вы ' +
        'осторожно открываете глаза и сразу смотрите на браслет. Индикатор ' +
        'остается черным.')
    ],
    actions: [
      { title: 'Кажется, стрельба переместилась чуть в сторону.' },
      { title: ' Теперь можно осторожно осмотреться: куда же закинул вас переход?', action: () => { return 304 } }
    ]
  },
  {
    __proto__: chapter,
    id: 196,
    description: '<p>Вы перешагиваете порог — и тут же где-то на улице ' +
      'тяжело ухает бомба. Взрывная волна врывается в комнату, сметая ' +
      'уцелевшие оконные стекла. Стены содрогаются, и вы видите, как над ' +
      'вашей головой от потолка к косяку начинает змеиться трещина...</p>',
    actions: [
      { title: 'ПРОВЕРЬТЕ СВОЮ УДАЧУ. Повезет вам или нет?', action: (player) => { return player.testLuck(16, 600) } }
    ]
  },
  {
    __proto__: chapter,
    id: 208,
    generate: function () {
      this.description = '<p>Отряхивая с одежды известковую пыль, вы ' +
      'осматриваетесь. Обломки стены завалили выход, но, к счастью, в ' +
      'комнате есть окно. Путь к отступлению обеспечен, и вы начинаете ' +
      'обследовать комнату.</p>' +
      '<p>Когда-то здесь жила женщина — из мебели уцелело высокое, ' +
      'покрытое трещинками трюмо. '
      if (this.items.length > 0) {
        console.log(this.items)
        this.description += 'На подзеркальнике лежит ' +
          this.items[0].lowercase() + '. '
        for (var i = 1; i < this.items.length; i++) {
          console.log(this.items[i])
          this.description += 'Тут же валяется ' + this.items[i].lowercase() + '. '
        }
      }
      this.description += 'Густой слой пыли покрывает трюмо'
      if (this.items.length > 0) this.description += ' и безделушки на нем'
      this.description += '. '
      this.description += 'Вам становится грустно при мысли о бывшей ' +
      'хозяйке комнаты... И зачем люди развязали эту бессмысленную войну, ' +
      'погубившую цивилизацию?</p>' +
      '<p>Что ж, пора идти дальше.'
      if (this.items.length > 0) {
        this.description += ' Если хотите, возьмите что-нибудь на память.'
      }
      this.description += '</p>'
    },
    actions: [
      { title: 'А теперь покиньте комнату через окно.', action: () => { return 368 } }
    ],
    items: [
      items.fan,
      items.flask
    ]
  },
  {
    __proto__: chapter,
    id: 304,
    actions: [
      { title: 'Вы попали сюда.', action: (player) => { return (player.roll() < 4) ? 104 : 216 } }
    ]
  },
  {
    __proto__: chapter,
    id: 368,
    description: 'Перемахнув высокий подоконник, оказываетесь на странной ' +
      'улице: все дома сложены из зеленого камня. Даже булыжная мостовая — ' +
      'и та салатного цвета. Это довольно красиво, но любоваться некогда: ' +
      'слева рявкают одна за другой пулеметные очереди — без цели, прямо ' +
      'по мостовой. Но гораздо хуже то, что справа, из окон и дверей ' +
      'соседнего дома, выползают струи багрового дыма. Газовая атака! ' +
      'Только этого не хватало! Обратно в дом не вернуться — окно слишком ' +
      'высоко...',
    actions: [
      { title: 'Хорошо бы, конечно, перелететь опасную зону!' },
      { title: 'Но раз вы этого не можете сделать, попытайтесь проскочить под прицелом пулемета в те короткие мгновения, когда он замолкает.', action: () => { return 644 } },
      { title: 'А может быть, невзирая на отчаянные протесты Клуши, рискнете пробежать сквозь клубящийся багровый дым?', action: () => { return 168 } }
    ]
  },
  {
    __proto__: chapter,
    id: 424,
    description: 'Вид заброшенного дома повергает в уныние. Перевернутая ' +
      'мебель, обсыпанная обвалившейся штукатуркой, выбитые окна в ' +
      'противоположной от входа стене... А ведь когда-то здесь жили люди!',
    actions: [
      { title: 'Вряд ли в этом холодном мрачном холле вы найдете ' +
        'что-нибудь интересное для себя.' },
      { title: 'Пройдете в соседнюю комнату?', action: () => { return 196 } },
      { title: 'Или покинете дом?' },
      { title: 'В таком случае — как?' },
      { title: 'Через дверь?', action: () => { return 552 } },
      { title: 'Или (чтобы попасть на другую улицу) через окно?', action: () => { return 368 } }
    ]
  },
  {
    __proto__: chapter,
    id: 600,
    description: 'Вы не успеваете отпрыгнуть, и часть стены обрушивается на вас.',
    generate: (player) => { player.wound(3) },
    actions: [
      { title: 'Далее', action: (player) => { return 208 } }
    ]
  }
]

export default chapters