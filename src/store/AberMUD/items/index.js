var item = {
  num: 0,
  bit: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  byte: [0],
  name: '',

  dambyitem: function () {
    if (!this.bit[15]) return -1
    return this.byte[0]
  },

  iscarrby: function (p) {},

  onHit: function (victim) {
    return true
  },
  onBreak: function () {}
}

var item32 = {
  _proto_: item,
  num: 32,

  onHit: function (victim) {
      if (item16.iscarrby(victim)) {
        bprintf("The runesword flashes back away from its target, growling in " +
          "anger!\n")
        return false
      }
      return true
  }
}

var item171 = {
  _proto_: item,
  num: 171,

  onBreak: function () {
    sys_reset()
  }
}
