var variants = [
  'success',
  'info',
  'danger'
]

var names = [
  'John Doe',
  'Jane Doe',
  'Janet Doe',
  'Joe Doe'
]

var dates = [
  'Только что',
  '13:52',
  '04:03'
]

var titles = [
  '<span class="fa fa-exclamation text-danger"></span> Важное сообщение',
  'Важное сообщение',
  'Lorem ipsum dolor sit amet'
]

var messageCount = Math.floor(Math.random() * 15)
var messages = []
for (let i = 0; i < messageCount; i++) {
  let variantId = Math.floor(Math.random() * variants.length)
  let nameId = Math.floor(Math.random() * names.length)
  let dateId = Math.floor(Math.random() * dates.length)
  let titleId = Math.floor(Math.random() * titles.length)
  messages.push({
    avatar: '' + (Math.floor(Math.random() * 4) + 4) + '.jpg',
    email: 'admin@bootstrapmaster.com',
    variant: variants[variantId],
    name: names[nameId],
    registered: dates[dateId],
    title: titles[titleId],
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed ' +
      'do eiusmod tempor incididunt...'
  })
}

export default {
  messages: messages
}
