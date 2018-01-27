function addDescription (chapter, text) {
  chapter.description.push({
    text: text
  })
}

export default {
  describe: (text) => { return { text: text } },
  addDescription
}
