import world from './world.js'
import stones from '../chapters/stones.js'

export default {
  __proto__: world,
  title: 'Мир Камней',
  description: 'Разумной жизни нет. Растительности тоже нет, кроме ' +
    'лишайника, встречающегося редкими островками. Фауна малоизученная, ' +
    'предположительно все виды — хищники.',
  start: 290, // 6
  chapters: stones
}
