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
  generate: function (player) {}
}

export default {
  describe: (text) => { return { text: text } },
  addDescription,
  chapter
}
