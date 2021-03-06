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
  directions: {},
  loose: false,
  load: function (player) {
    var items = []
    player.chapter = this.id
    this.generate(player)
    this.items.forEach(function (item) {
      item.active = true
    })
    if (this.loose) {
      player.sta.value = 0
    }
    if (this.description) {
      items.push({ text: this.description })
    }
    this.story.forEach(function (item) {
      items.push(item)
    })
    this.items.forEach(function (item) {
      if (item.canTake) return
      items.push({ text: item.description })
    })
    return items
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
