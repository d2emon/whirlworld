
function dambyitem(it)
{
  if (!it) return 4
  return it.dambyitem
}

function hitplayer(victim, wpn) {
  if (!victim) return

  /* Chance to hit stuff */
  if (wpn && (!wpn.iscarrby(me))) {
    bprintf('You belatedly realise you dont have the ' + wpn.name + ',\n' +
      'and are forced to use your hands instead..\n')
    if (me.wpnheld == wpn) wpnheld = null
    wpn = null
  }

  me.wpnheld = wpn
  if (!wpn.onHit(victim)) return
  if (wpn.dambyitem() < 0) {
    bprintf('Thats no good as a weapon\n')
    me.wpnheld = null
    return
  }

  if (me.in_fight) {
    bprintf('You are already fighting!\n')
    return
  }

  me.fighting = victim
  me.in_fight = 300

  var res = randperc()

  var cth = 40 + 3 * me.lev
  if (item89.iswornby(victim) ||
    item113.iswornby(victim) ||
    item114.iswornby(victim)) cth -= 10
  if (cth < 0) cth=0

  if (cth > res) {
    bprintf('You hit \001p' + victim.name + '\001 ')
    if (wpn) bprintf('with the ' + wpn.name)
    bprintf("\n")

    ddn = randperc() % (dambyitem(wpn))
    x = {
      sender: me,
      dmg: ddn,
      wpn: wpn
    }

    if (victim.str - ddn < 0) {
      bprintf("Your last blow did the trick\n")
      if (victim.str >= 0) {
        /* Bonus ? */
        me.sco += victim.bonus()
      victim.str = -1 /* MARK ALREADY DEAD */
      me.in_fight = 0
      me.fighting = null
    }

    if (victim.isPc)
      sendsys(victim, me, -10021, me.loc, x)
    else {
      woundmn(victim, ddn)
    }
    me.sco += ddn * 2
    me.calib()
    return
  } else {
    bprintf('You missed \001p' + victim.name + '\001\n')
    x = {
      sender: me,
      dmg: -1,
      wpn: wpn
    }
    if (victim.isPc)
      sendsys(victim, me, -10021, me.loc, x)
    else
      woundmn(victim, 0)
  }
}

function bloodrcv(data, isme) {
  if (!isme) return /* for mo */
  if (!data.sender) return

  // nlod:
  if (!data.sender.name) return
  me.fighting = data.sender
  me.in_fight = 300
  if (!data.dmg) {
    bprintf('\001p' + data.sender.name + '\001 attacks you')
    if (data.wpn) bprintf(' with the ' + data.wpn.name)
    bprintf("\n")
  } else {
    bprintf('You are wounded by \001p' + data.sender.name + '\001')
    if (data.wpn) bprintf(' with the ' + data.wpn.name)
    bprintf('\n')
    if (me.lev < 10) {
      me.str -= data.dmg
      data.sender.onHitBy(me, dmg)
    }
    if (me.str < 0) {
      console.log(me.name + ' slain by ' + data.sender.name)
      dumpitems()
      me.loose()
      world.save()
      me.delpers()
      world.load()

      ms = '\001p' + me.name + '\001 has just died.\n'
      sendsys(me, me, -10000, me.loc, ms)

      ms = '[ \001p' + me.name + '\001 has been slain by \001p' + data.sender.name + '\001 ]\n'
      sendsys(me, me, -10113, me.loc, ms)

      crapup("Oh dear... you seem to be slightly dead\n")
    }
    me.cal = 1 /* Queue an update when ready */
  }
}

function breakitem(x) {
  if (!x) {
    bprintf("What is that ?\n")
    return
  }
  x.onBreak()
  bprintf("You can't do that\n")
}

// Actions
function weapcom(args) {
  if (args.length <= 0) {
    bprintf("Which weapon do you wish to select though\n")
    return
  }
  a = fobnc(args[0])
  if (!a) {
    bprintf("Whats one of those ?\n")
    return
  }
  b = a.dambyitem()
  if (b < 0) {
    bprintf("Thats not a weapon\n")
    me.wpnheld = null
    return
  }
  me.wpnheld = a
  me.calib()
  bprintf("OK...\n")
}

function killcom(args) {
  if (args.length <= 0) {
    bprintf("Kill who\n")
    return
  }

  if (args[0] == "door") {
    bprintf("Who do you think you are , Moog ?\n")
    return
  }

  if (fobna(args[0])) {
    breakitem(fobna(args[0]))
    return
  }

  a = fpbn(args[0])
  if (!a) {
    bprintf("You can't do that\n")
    return
  }
  if (a == me) {
    bprintf("Come on, it will look better tomorrow...\n")
    return
  }
  if (a.loc != me.loc) {
    bprintf("They aren't here\n")
    return
  }

  // xwisc:
  for (i = 1; i < args.length; i++) {
    if (args[i] != "with")) {
      continue
    }
    if (i + 1 >= args.length) {
      bprintf("with what ?\n")
      return
    }
  }
  if (args.length <= i) {
    hitplayer(a, me.wpnheld)
    return
  }

  x = fobnc(args[i])
  if (!x) {
    bprintf("with what ?\n")
    return
  }
  hitplayer(a, x)
}
