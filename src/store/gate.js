import world from './world'

export default {
  worlds: world,
  items: [
    world.legends,
    world.stones,
    world.dragonflies,
    world.robots
  ],

  go1: function (player) {
    var w = [
      world.legends,
      world.stones,
      world.dragonflies,
      world.robots
    ]
    let roll = 10
    while (roll > 4) {
      roll = player.roll()
    }
    return w[roll - 1].start
  },

  go404: function (player) {
    var w = [
      world.legends,
      world.stones,
      world.dragonflies
    ]
    let roll = player.roll()
    if (roll > 3) roll -= 3
    return w[roll - 1].start
  },

  go641: function (player) {
    var w = [
      world.stones,
      world.dragonflies,
      world.robots
    ]
    let roll = player.roll()
    if (roll <= 2) return w[0].start
    if (roll <= 4) return w[1].start
    return w[2].start
  }
}
