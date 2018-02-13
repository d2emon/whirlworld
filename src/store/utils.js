import iface from './interface'
import game from './game'
import base from './base'

/*
[launcher]
[start]
[0.0_about]
[0.1_gameplay]
utils
  <Location name="onNewLoc"/>
  <Location name="onObjClick"/>
  <Location name="onObjSel"/>
  <Location name="onGameSave"/>
  <Location name="onGameLoad"/>
  <Location name="save.varriors"/>
  <Location name="back.varriors"/>
  <Location name="uc"/>
  <Location name="uc.obj"/>
specialLocations
  <Location name="run.dynamic.script"/>
  <Location name="get.word.padez"/>
  <Location name="get.word.end"/>
  <Location name="get.n.p"/>
settings
  <Location name="avs.save"/>
  <Location name="avs.sets"/>
  <Location name="avs.sets.color"/>
  <Location name="avs.face"/>
  <Location name="avs.face.refresh"/>
  <Location name="base.face"/>
  <Location name="base.face.text"/>
  <Location name="face.size"/>
  <Location name="face.floor"/>
  <Location name="face.attrib"/>
  <Location name="face.color"/>
  <Location name="face.reset"/>
  <Location name="face.input"/>
  <Location name="face.variants"/>
screen
  <Location name="set.Screen"/>
  <Location name="int.screen"/>
  <Location name="int.inventory"/>
  <Location name="int.DIN"/>
  <Location name="int.DINSTR"/>
  <Location name="int.DINCODE"/>
  <Location name="href.page"/>
  <Location name="int.loc.obj"/>
  <Location name="true.goto"/>
items
  <Location name="crt.obj"/>
  <Location name="del.obj.id"/>
  <Location name="rtp.obj"/>
  <Location name="get.daughter.obj"/>
  <Location name="prv.bag"/>
  <Location name="prv.obj.inBag"/>
  <Location name="add.obj"/>
  <Location name="put.obj"/>
  <Location name="minus.obj"/>
menuItems
  <Location name="menu.info"/>
  <Location name="menu.use"/>
  <Location name="menu.useon"/>
  <Location name="menu.put"/>
  <Location name="menu.eat"/>
  <Location name="menu.sale"/>
  <Location name="menu.dynamic"/>
  <Location name="menu.buy"/>
battle
  <Location name="int.war"/>
  <Location name="int.war.screen"/>
  <Location name="int.war.attack"/>
  <Location name="int.war.blaster"/>
  <Location name="int.war.prove"/>
gameFunctions
  <Location name="set.mainsets"/>
  <Location name="set.presets"/>
  <Location name="set.newgame"/>
  <Location name="power"/>
  <Location name="lovk"/>
  <Location name="luck"/>
  <Location name="upluck"/>
  <Location name="upluck.num"/>
  <Location name="social"/>
  <Location name="fast"/>
  <Location name="blast.charge"/>
  <Location name="flaga"/>
  <Location name="put.bag"/>
  <Location name="knew.fin"/>
dummy
  <Location name="лист_вонючка"/>
  <Location name="world.new"/>
  <Location name="mv"/>
  <Location name="war.txt"/>
base
  <Location name="base.txt"/>
  <Location name="base.obj"/>
  <Location name="base.ratch"/>
  <Location name="base.body"/>
  <Location name="base.knew"/>
templates
  <Location name="заряд бластера"/>
  <Location name="сила уменьшилась"/>
  <Location name="противник"/>
  <Location name="бросить кубик"/>
  <Location name="удача"/>
  <Location name="ворота"/>
deleted
  <Location name="page.75"/>
  <Location name="page.130"/>
  <Location name="page.151"/>
  <Location name="page.242"/>
  <Location name="page.263"/>
  <Location name="page.318"/>
  <Location name="page.404"/>
  <Location name="page.467"/>
  <Location name="page.598"/>
  <Location name="page.641"/>
chapters0
  <Location name="page.death"/>
  <Location name="page.-1"/>
  <Location name="page.0"/>
  <Location name="page.999"/>
 */

var survivedWarriors = []
var survivedLocation = []
var fast = {}
var social = {}
var power = {}

var luck = []
var unluck = []
var ids = []
var objects = []
var kolvos = []
var charges = []
var positions = []
var runs = []

var idWatch = []
var refreshWatch = []
var visited = [] // Посещенные локации
var tvar = []

var lvar = {
  source: '',
  data: {
    enemy: false,
    money: false,
    death: false,
    victory: false,
    game: true
  },
  footer: ''
}
var maintxt = ''
// var nosave = false
var time = {
  goto: 0
}
var checkpoint = []
// var luckRestore = []
var location = 0

function onNewLoc (location) {
  // служебная локация для обработки перехода на новую локацию. Фактически
  // здесь исходный текст книжки превращается в выводимый на экран.

  // var save = ''
  var last = refreshWatch[refreshWatch.length - 1]
  // -------------------- переход на новую локацию -----------
  if (last !== location) {
    idWatch.push(location)

    // очищаем временный массив:
    tvar = []
    game.screen_floor = ''
    // save = 'yep'
    if (!game.back_code) {
      saveWarrior()
    } else {
      backWarrior(true)
    }
  }
  // -------------------- переход на новую локацию -----------

  // -------------------- переход на любую локацию -----------
  refreshWatch.push(location)
  // -------------------- переход на любую локацию -----------

  if (!visited[location]) { visited[location] = true }

  var text = {
    dyn: '',
    main: ''
  }
  var items = []
  if (lvar.source) {
    text.dyn = 'int_DIN(lvar.source)'
    items = ['int_loc_obj(curloc)']
  } else {
    text.main = maintxt
  }

  tvar.dummy_header = lvar.data
  // проверка боем
  if (lvar.data.enemy) { text.main += base.txt('war') }
  if (lvar.data.money) { text.main += base.txt('sell') }
  if (lvar.data.death || game.power_loose === 'poweroff') {
    if (game.power_lose === 'poweroff') { text.main += base.txt('off') }
    text.main += base.txt('wl')
    items = []
    iface.refresh = true
    game.iface = {}
    // nosave = true
  } else {
    // nosave = false
  }
  if (lvar.data.victory) {
    text.main += base.txt('go')
    items = []
    iface.refresh = true
    game.iface = {}
  }
  if (lvar.data.game) {
    text.dyn += "int_DIN( base.txt('game.enemy', get_tag_cont(lvar.header, 'avs-game')))"
  }

  if (iface.refresh) { /* set_Screen(iface.refresh) */ }

  var res = {
    text: text,
    items: items,
    data: lvar.data,
    controls: game.iface,
    footer: lvar.footer
  }

  if (location === last && time.goto === 0) {
    // wait(1)
    // res += ' '
  } else {
    // если локация, на которую мы переместились, новая
    if (tvar.dummy_header.enemy) {
      game.take_pills = 'denied'
    } else if (game.take_pills === 'denied') {
      game.take_pills = 'enabled'
    } else {
      game.take_pills = ''
    }
  }

  lvar = []
  // var GAME_WAR = []
  // var GAME_WAR_LOG = []

  if (tvar.dummy_header.checkpoint) {
    checkpoint[location] += 1
    // avs_save(999)
  }

  time.goto = 0
  return res
}

// function onObjClick () {}
function onObjSel () {}
function onGameSave () {}
function onGameLoad () {}

function saveWarrior () {
  // локация, сохраняющая переменные в виде динамического кода в специальный
  // массив:
  survivedWarriors.push({
    GAME: game,
    fast: fast,
    social: social,
    power: power,
    luck: luck,
    unluck: unluck,
    pit: {
      ids: ids,
      objects: objects,
      kolvos: kolvos,
      charges: charges,
      positions: positions,
      runs: runs
    }
  })
  survivedLocation.push(location)
  return {
    vars: survivedWarriors,
    locs: survivedLocation
  }
}

function backWarrior (data) {
  // управление
  var state = survivedLocation.length - 2
  // состояние по текущей локации arrsize-1
  // состояние по предыдущей локации arrsize-2
  var vars = survivedWarriors[state]
  location = survivedLocation[state]
  if (!data) {
    // переходим на предыдущую локацию
    time.goto = 1
    /**
     * killvar '$GAME_INTERFACE'
     * killvar '$GAME_VALUE'
     * killvar 'fast' & killvar 'power' & killvar 'social'
     * killvar '$id_array'
     * killvar '$object_array'
     * killvar '$position_array'
     * killvar 'kolvo_array'
     * killvar 'charge_array'
     * killvar '$run_array'
     * killvar '$num_unluck'
     * killvar '$num_luck'
     * killvar 'здесь_был'
     * killvar 'удача_восст'
     * killvar 'checkpoint'
     */
    game.back_code = true
    // goto(location)
  } else {
    // если мы уже перешли на предыдущую локацию. Удаляем знания о текущей
    // (с которой перешли)
    survivedLocation.length--
    survivedWarriors.length--
    // killvar '$GAME_INTERFACE'
    visited = []
    // luckRestore = []
    checkpoint = []
    // восстанавливаем значения
    game.load(vars.GAME)
    fast = vars.fast
    social = vars.social
    power = vars.power
    luck = vars.luck
    unluck = vars.unluck
    ids = vars.pit.ids
    objects = vars.pit.objects
    kolvos = vars.pit.kolvos
    charges = vars.pit.charges
    positions = vars.pit.positions
    runs = vars.pit.runs
  }
}

// function uc () {}
// function uc_obj () {}

export default {
  onNewLoc,
  onObjSel,
  onGameSave,
  onGameLoad
}
