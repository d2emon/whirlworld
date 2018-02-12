import iface from './interface'
import game from './game'

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
var tvar = []
var visited = []

var lvar = {
  source: ''
}
var toScreen = ''
var maintxt = ''
var items = ''
// var nosave = false
var lval = {
  header: ''
}
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
  // -------------------- переход на новую локацию -----------
  if (idWatch[idWatch.length - 1] !== location) {
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
  if (idWatch.length > 100) { idWatch = [] }
  // -------------------- переход на новую локацию -----------

  // -------------------- переход на любую локацию -----------
  refreshWatch.push(location)
  if (refreshWatch.length > 9999) { refreshWatch = [] }
  // -------------------- переход на любую локацию -----------

  if (!visited[location]) { visited[location] = true }

  if (lvar.source) {
    toScreen = 'int_DIN(lvar.source)'
    items = 'int_loc_obj(curloc)'
  } else {
    toScreen = '<avs-main>' + maintxt + '</avs-main>'
  }

  tvar.dummy_header = lvar.header
  // проверка боем
  if (lvar.header.enemy) { toScreen += "base_txt('war')" }
  if (lvar.header.money) { toScreen += "base_txt('sell')" }
  if (lvar.header.death || game.power_loose === 'poweroff') {
    if (game.power_lose === 'poweroff') { toScreen += "base_txt('off')" }
    toScreen += "base_txt('wl')"
    items = []
    iface.refresh = 'page.reset'
    game.iface = ''
    // nosave = true
  } else {
    // nosave = false
  }
  if (lval.header.victory) {
    toScreen += "base_txt('go')"
    items = []
    iface.refresh = 'page.reset'
    game.iface = ''
  }
  if (lvar.header.game) {
    toScreen += "int_DIN( base_txt('game.enemy', get_tag_cont(lvar.header, 'avs-game')))"
  }

  var res = ''
  if (iface.refresh) { /* set_Screen(iface.refresh) */ }

  var printscreen = 'int_screen(' +
    toScreen +
    items +
    lvar.header +
    game.iface +
    lvar.colontitle +
    ')'
  res += printscreen + '\n'

  if (refreshWatch[refreshWatch.length - 1] === refreshWatch[refreshWatch.length - 2] && time.goto === 0) {
    // wait(1)
    res += ' '
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

  if (tvar.dummy_header.checkpoint && checkpoint[location]) {
    checkpoint[location] += 1
    // avs_save(999)
  }

  time.goto = 0
  return res
}

// function onObjClick () {}
// function onObjSel () {}
// function onGameSave () {}
// function onGameLoad () {}

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
    // game = vars.GAME
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
  onNewLoc
}
