function sendsys(to, from, codeword, chan, text) {
  /*
  if ((codeword != -9900) && (codeword!= -10021)) {
    block.b64 = text
  } else {
    block.b64 = [
      i[0],
      i[1],
      i[2]
    ]
  }
  */
  send2({
    loc: chan,
    code: codeword,
    users: {
      to: to,
      from: from
    },
    data: null
  })
}

function gamrcv(data) {
  nameme = globme.toLowerCase()
  isme = split(data, nam1, nam2, text, nameme)
  i = text

  if ((data.code == -20000) && (fpbns(nam1) == me.fighting)) {
    me.in_fight = 0
    me.fighting = null
  }

  if (data.code < -10099) {
    new1rcv(isme, data.loc, nam1, nam2, data.code, text)
    return
  }

  if (data.code == -9900) {
    text[0].vis = text[1]
    return
  }
  if (data.code == -666) {
    bprintf("Something Very Evil Has Just Happened...\n")
    me.loose()
    crapup("Bye Bye Cruel World....")
  }
  if (data.code == -599) {
    if (isme) {
      me.lev = data.text.lev
      me.sco = data.text.sco
      me.str = data.text.str
      me.calib()
    }
    return
  }
  if (data.code == -750) {
    if (isme) {
      if (fpbns(nam2))
        me.loose()
      world.save()
      printf("***HALT\n")
      exit(0)
    }
  }
  if (data.code == -400) {
    if (isme)
      snoopd = null
    return
  }
  if (data.code == -401) {
    if (isme) {
      snoopd = fpbns(nam2)
    }
    return
  }
  if (data.code == -10000) {
    if (!isme && (data.loc == me.loc)) {
      bprintf(text)
    }
    return
  }
  if (data.code == -10030) {
    wthrrcv(data.loc)
    return
  }
  if (data.code == -10021) {
    if (me.loc == data.loc) {
      if (isme) {
        rdes = 1
        vdes = data.text[0]
        bloodrcv(text, isme)
      }
    }
    return
  }
  if (data.code == -10020) {
    if (isme) {
      ades = data.text[0]
      if (me.lev < 10) {
        bprintf('You drop everything you have as you are summoned by \001p' + nam2 + '\001\n')
      } else {
        bprintf('\001p' + nam2 + '\001 tried to summon you\n')
        return
      }
      tdes = 1
    }
    return
  }
  if (data.code == -10001) {
    if (isme) {
      if (me.lev > 10)
         bprintf('\001p' + nam2 + '\001 cast a lightning bolt at you\n')
      else {
        /* You are in the .... */
        bprintf("A massive lightning bolt arcs down out of the sky to strike")
        zb = '[ \001p' + me.name + '\001 has just been zapped by \001p' + nam2.name + '\001 and terminated ]\n'
        sendsys(me, me, -10113, me.loc, zb)
        bprintf(" you between\nthe eyes\n")
        zapped = 1
        delpers(me)
        zb = '\001s' + me.name + '\001' + me.name + ' has just died.\n\001'
        sendsys(me, me, -10000, me.loc, zb)
        me.loose()
        bprintf('You have been utterly destroyed by ' + nam2 + '\n')
        crapup("Bye Bye.... Slain By Lightning")
      }
    } else
      if (data.loc == me.loc)
        bprintf('\001cA massive lightning bolt strikes \001\001D' + nam1 + '\001\001c\n\001')
    return
  }
  if (data.code == -10002) {
    if (!isme) {
      if (data.loc == me.loc || me.lev > 9)
        bprintf('\001P' + nam2 + '\001\001d shouts \'' + text + '\'\n\001')
      else
        bprintf('\001dA voice shouts \'' + text + '\'\n\001')
    }
    return
  }
  if (data.code == -10003) {
    if (!isme) {
      if (data.loc == me.loc)
        bprintf('\001P' + nam2 + '\001\001d says \'' + text + '\'\n\001')
    }
    return
  }
  if (data.code == -10004) {
    if (isme)
      bprintf('\001P' + nam2 + '\001\001d tells you \'' + text + '\'\n\001')
    return
  }
  if (data.code == -10010) {
    if (isme) {
      me.loose()
      crapup("You have been kicked off")
    } else
      bprintf(nam1 + ' has been kicked off\n')
    return
  }
  if (data.code == -10011) {
    if (isme) {
      bprintf(text)
    }
    return
  }
}
