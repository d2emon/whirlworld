import world from './world.js'
import dragonflies from '../chapters/dragonflies.js'

export default {
  __proto__: world,
  title: 'Мир стрекоз',
  subtitle: 'Планета земного типа.',
  description: 'Населена преимущественно насекомыми. Известны три ' +
    'разумных вида: стрекозы, муравьи и малоизученные морские жители — ' +
    'предположительно водяные пауки. Имеются и неразумные животные, в том ' +
    'числе и хищные. Флора богата и разнообразна, много хищных растений ' +
    'разных видов...',
  start: 345,
  chapters: dragonflies
}
