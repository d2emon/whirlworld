var npc = {
  name: '',
  isPc: false,
  lev: 0,
  loc: 0,
  sco: 0,

  wpnheld: null,
  in_fight: 0,
  fighting: null,

  loose: function () {},
  calib: function () {},

  bonus: function () {
    return 10 * damof(this)
  },
  onHitBy: function (me, dmg) {}
}

var player = {
  _proto_: npc,
  isPc: true,

  bonus: function () {
    return this.lev * this.lev * 100
  }
}

var pc16 = {
  _proto_: npc,

  onHitBy: function (me, dmg) {
    me.sco -= 100 * dmg
    bprintf('You feel weaker, as the wraiths icy touch seems to drain your ' +
      'very life force\n')
    if (me.sco < 0) me.str = -1
  }
}
