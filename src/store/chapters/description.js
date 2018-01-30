function addDescription (chapter, text) {
  chapter.description.push({
    text: text
  })
}

var chapter = {
  id: 0,
  title: '&#xa7;',
  description: '',
  story: [],
  actions: [],
  enemies: [],
  items: [],
  loose: false,
  load: function (player) {
    this.generate(player)
    this.items.forEach(function (item) {
      item.active = true
    })
    if (this.loose) {
      player.sta.value = 0
    }
  },
  doAction: function (action, player) {
    if (action.canDo) {
      if (!action.canDo(player)) return false
    }

    if (action.chapter) {
      return action.chapter
    } else {
      return action.action(player)
    }
  },
  generate: function (player) {}
}

export default {
  describe: (text) => { return { text: text } },
  addDescription,
  chapter
}
