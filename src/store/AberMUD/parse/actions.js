var world = {}

var verbtxt = [
  ["go", "climb"], "n", "e", "s", "w","u","d","quit",["get","take"],"drop",
  "look",["i","inv","inventory"],"who","reset","zap",["eat","drink"],"play","shout","say","tell",
  "save","score","exorcise","give",["steal","pinch"],"levels","help","value","stats",["examine","read"],
  "delete",["pass","password"],"summon",["weapon","wield"],["shoot","kill","hit","fire","launch","smash","break","strike"],0,0,0,0,0
  0,0,0,0,0,0,0,0,0,"laugh",
  "cry","burp","fart","hiccup","grin","smile","wink","snigger","pose","set",
  "pray","storm","rain","sun","snow","goto",0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,"wear",
  "remove","put","wave","blizzard","open",["close","shut"],"lock","unlock","force","light",
  "extinguish","where",0,"invisible","visible",0,["turn","pull","press","push"],"cripple","cure","dumb",
  "change","missile","shock","fireball","translocate","blow","sigh","kiss","hug","slap",
  "tickle","scream","bounce","wiz","stare","exits","crash","sing","grope","spray",
  "groan","moan","directory","yawn","wizlist","in","smoke","deafen","resurrect","log",
  "tss","rmedit","loc","squeeze","users","honeyboard","inumber","update","become","systat",
  "converse","snoop","shell","raw","purr","cuddle","sulk","roll","credits","brief",
  "debug","jump","map","flee","bug","typo","pn","blind","patch","debugmode",
  "pflags","frobnicate","setin","setout","setmin","setmout","emote","dig","empty"]
var exittxt = [
  ['n', 'north'],
  ['e', 'east'],
  ['s', 'south'],
  ['w', 'west'],
  ['u', 'up'],
  ['d', 'down']
]

function chkverb() {
  return chklist(wordbuf, verbtxt)
}

function dogocom(args) {
  if (args.length <= 0) {
    bprintf("GO where ?\n")
    return false
  }
  if (args[0] == "rope") wordbuf = "up"
  a = chklist(wordbuf, exittxt)
  if (!a) {
    bprintf("Thats not a valid direction\n")
    return false
  }
  return dodirn(a, args)
}

function dodirn(n, args) {
  if (me.in_fight) {
    bprintf("You can't just stroll out of a fight!\n")
    bprintf("If you wish to leave a fight, you must FLEE in a direction\n")
    return
  }

  if (item32.iscarrby(me) && (pc25.loc == me.loc) && pc25.name) {
    bprintf("\001cThe Golem\001 bars the doorway!\n")
    return
  }

  if (chkcrip()) return

  newch = ex_dat[n]
  if ((newch > 999) && (newch < 2000)) {
    door = item[newch - 1000]
    droff = door.num ^ 1 /* other door side */
    if (door.state) {
      if (door.name != 'door') || isdark() || !door.long[door.state]) {
        bprintf("You can't go that way\n")
        /* Invis doors */
      } else {
        bprintf("The door is not open\n")
      }
      return
    }
    newch = door.off.loc
  }

  if (newch == -139) {
    if (!item113.iswornby(me) && !item114.iswornby(me) && !item89.iswornby(me)) {
      bprintf("The intense heat drives you back\n")
      return
    } else {
      bprintf("The shield protects you from the worst of the lava stream's heat\n")
    }
  }

  if (n == 2) {
    i = fpbns('figure')
    if ((i.num !=menum) &&
      i &&
      (i.loc == me.loc) &&
      !item101.iswornby(me) &&
      !item102.iswornby(me) &&
      !item103.iswornby(me)
    ) {
      bprintf("\001pThe Figure\001 holds you back\n")
      bprintf("\001pThe Figure\001 says 'Only true sorcerors may pass'\n")
      return
    }
  }

  if (newch >= 0) {
    bprintf("You can't go that way\n")
    return
  } else {
    block = '\001s' + me.name + '\001' + me.name + ' has gone ' + exittxt[n] + ' ' + out_ms + '.\n\001'
    sendsys(me, me, -10000, me.loc, block)
    me.loc = newch
    block = '\001s' + me.name + '\001' + me.name + ' ' +  in_ms + '\n\001'
    sendsys(me, me, -10000, me.loc, block)
    trapch(me.loc)
  }
}

function quitcom() {
  if (isforce) {
    bprintf("You can't be forced to do that\n")
    return
  }
  me.rte()
  world.load()
  if(me.in_fight) {
    bprintf("Not in the middle of a fight!\n")
    return
  }
  xx = me.name + ' has left the game\n'
  bprintf("Ok")
  sendsys(me, me, -10000, me.loc, xx)

  xx = '[ Quitting Game : ' + me.name + ' ]\n'
  sendsys(me, me, -10113, 0, xx);

  dumpitems()
  me.str = -1
  me.name = ''
  world.save()
  curmode = 0
  me.loc = 0
  me.save()
  crapup("Goodbye")
}

function rescom() {
  if (me.lev < 10) {
    bprintf("What ?\n")
    return
  }
  broad('Reset in progress....\nReset Completed....\n')

  b = openlock(RESET_DATA, "r")
  sec_read(b, objinfo, 0, 4*numobs)
  fcloselock(b)

  i = time()

  a = fopen(RESET_T, "w")
  a.printf('Last Reset At ' + i.ctime() + '\n')
  a.close()

  a = fopen(RESET_N, "w")
  a.printf(i)
  a.close()

  resetplayers()
}

function lookcom(args) {
  if(args.length <= 0) {
    brhold = brmode
    brmode = 0
    lookin(me.loc)
    brmode = brhold
    return
  }

  if (args[0] == 'at') {
    return examcom()
  }
  if ((args[0] == 'in') && (args[0] == 'into')) {
    return
  }
  if (args[1] <= 0) {
    bprintf("In what ?\n")
    return
  }
  a = fobna(args[1])
  if (!a) {
    bprintf("What ?\n")
    return
  }
  if (!a.bit[14]) {
    bprintf("That isn't a container\n")
    return
  }
  if (a.bit[2] && a.state) {
    bprintf("It's closed!\n")
    return
  }
  bprintf('The ' + a.name + ' contains:\n')
  aobjsat(a, 3)
}

function lightningcom() {
  if (me.lev < 10) {
    bprintf("Your spell fails.....\n")
    return
  }
  if (args.length <= 0) {
    bprintf("But who do you wish to blast into pieces....\n")
    return
  }
  vic = fpbn(args[0])
  if (!vic) {
    bprintf("There is no one on with that name\n")
    return
  }
  sendsys(vic, me, -10001, vic, '')
  console.log(me.name +' zapped ' + vic.name)
  if (!vic.isPc)
    woundmn(vic, 10000) /* DIE */
  broad('\001dYou hear an ominous clap of thunder in the distance\n\001')
}

function eatcom() {
  if (args.length <= 0) {
    bprintf("What\n")
    return
  }

  if ((me.loc == -609) && (args[0] == "water")) args[0] = "spring"
  if (args[0] == "from") brkword()
  b = fobna(args[0])
  if (!b) {
    bprintf("There isn't one of those here\n")
    return
  }

  if (b.num == 11) {
    bprintf("You feel funny, and then pass out\n")
    bprintf("You wake up elsewhere....\n")
    teletrap(-1076)
    return
  }
  if (b.num == 75) {
    bprintf("very refreshing\n")
    return
  }
  if (b.num == 175) {
    if (me.lev < 3) {
      me.sco += 40
      me.calib()
      bprintf("You feel a wave of energy sweeping through you.\n")
      return
    } else {
      bprintf("Faintly magical by the taste.\n")
      if (me.str < 40) me.str += 2
      me.calib()
    }
    return
  }
  if (b.bit[6]) {
    destroy(b)
    bprintf("Ok....\n")
    me.str += 12
    me.calib()
  } else
    bprintf("Thats sure not the latest in health food....\n")
}

function playcom() {
  if (args.length <= 0) {
    bprintf("Play what ?\n")
    return
  }

  a = fobna(args[0])
  if (!a) {
    bprintf("That isn't here\n")
    return
  }
  if (!isavl(a)) {
    bprintf("That isn't here\n")
    return
  }
}

function shoutcom() {
  if (chkdumb()) return
  blob = getreinput()
  if (me.lev > 9)
    sendsys(me, me, -10104, me.loc, blob)
  else
    sendsys(me, me, -10002, me.loc, blob)
    bprintf("Ok\n")
}

function saycom() {
  if (chkdumb()) return
  blob = getreinput()
  sendsys(me, me, -10003, me.loc, blob)
  bprintf('You say \'' + blob + '\'\n')
}

function tellcom() {
  if (chkdumb()) return
  if (args.length <= 0) {
    bprintf("Tell who ?\n")
    return
  }
  b = fpbn(args[0])
  if (!b) {
    bprintf("No one with that name is playing\n")
    return
  }
  blob = getreinput()
  sendsys(b, me, -10004, me.loc, blob)
}

function pncom() {
	bprintf("Current pronouns are:\n")
	bprintf('Me              : ' + me.name + '\n')
	bprintf('Myself          : ' + me.name + '\n')
	bprintf('It              : ' + wd.it + '\n')
	bprintf('Him             : ' + wd.him + '\n')
	bprintf('Her             : ' + wd.her + '\n')
	bprintf('Them            : ' + wd.them + '\n')
	if (me.lev > 9) {
		bprintf('There           : ' + wd.there + '\n')
	}
}

function scorecom() {
  if (me.lev == 1) {
    bprintf('Your strength is ' + me.str + '\n')
    return
  } else
    bprintf('Your strength is ' + me.str + '(from ' + (50 + 8 * me.lev) + '),Your score is ' + me.sco + '\n' +
      'This ranks you as ' + me.name + ' ')
  disle3(me.lev, me.sex)
}


function doAction (n) {
  world.load()
  if (n == 1) return dogocom()
  if ((n > 1) && (n < 8)) return dodirn(n - 1)
  if (n == 8) return quitcom()
  /*
  case 139:
     if(in_fight)
        {
        bprintf("Not in a fight!\n");break;
        }
     gropecom();
     break;
  case 9:
     getobj();
     break;
  case 137:
     crashcom();
     break;
  case 10:
     dropitem();
     break;
  */
  if (n == 11) return lookcom()
  /*
  case 12:
     inventory();
     break;
  case 13:
     whocom();
     break;
  */
  if (n == 14) return rescom()
  if (n == 15) return lightningcom()
  /*
  case 16:
     eatcom();
     break;
  case 17:
     playcom();
     break;
  case 18:
     shoutcom();
     break;
  case 19:
     saycom();
     break;
  case 20:
     tellcom();
     break;
  case 21:
     saveme();
     break;
  */
  if (n == 22) return scorecom()
  /*
  case 23:
     exorcom();
     break;
  case 24:
     givecom();
     break;
  case 25:
     stealcom();
     break;
  case 26:
     levcom();
     break;
  case 27:
     helpcom();
     break;
  case 28:
     valuecom();
     break;
  case 29:
     stacom();
     break;
  case 30:
     examcom();
     break;
  case 31:
     delcom();
     break;
  case 32:
     passcom();
     break;
  case 33:
     sumcom();
     break;
  case 34:
     weapcom();
     break;
  case 35:
     killcom();
     break;
  case 50:
     laughcom();
     break;
  case 51:
     crycom();
     break;
  case 52:
     burpcom();
     break;
  case 53:
     fartcom();
     break;
  case 54:
     hiccupcom();
     break;
  case 55:
     grincom();
     break;
  case 56:
     smilecom();
     break;
  case 57:
     winkcom();
     break;
  case 58:
     sniggercom();
     break;
  case 59:
     posecom();
     break;
  case 60:
     setcom();
     break;
  case 61:
     praycom();
     break;
  case 62:
     stormcom();
     break;
  case 63:
     raincom();
     break;
  case 64:
     suncom();
     break;
  case 65:
     snowcom();
     break;
  case 66:
     goloccom();
     break;
  case 100:
     wearcom();
     break;
  case 101:
     removecom();
     break;
  case 102:
     putcom();
     break;
  case 103:
     wavecom();
     break;
  case 104:
     blizzardcom();
     break;
  case 105:
     opencom();
     break;
  case 106:
     closecom();
     break;
  case 107:
     lockcom();
     break;
  case 108:
     unlockcom();
     break;
  case 109:
     forcecom();
     break;
  case 110:
     lightcom();
     break;
  case 111:
     extinguishcom();
     break;
  case 118:
     cripplecom();
     break;
  case 119:
     curecom();
     break;
  case 120:
     dumbcom();
     break;
  case 121:
     changecom();
     break;
  case 122:
     missilecom();
     break;
  case 123:
     shockcom();
     break;
  case 124:
     fireballcom();
     break;
  case 126:
     blowcom();
     break;
  case 127:
     sighcom();
     break;
  case 128:
     kisscom();
     break;
  case 129:
     hugcom();
     break;
  case 130:
     slapcom();
     break;
  case 131:
     ticklecom();
     break;
  case 132:
     screamcom();
     break;
  case 133:
     bouncecom();
     break;
  case 134:
     wizcom();
     break;
  case 135:
     starecom();
     break;
  case 136:
     exits();
     break;
  case 138:
     singcom();
     break;
  case 140:
     spraycom();
     break;
  case 141:
     groancom();
     break;
  case 142:
     moancom();
     break;
  case 143:
     dircom();
     break;
  case 144:
     yawncom();
     break;
  case 117:;
  case 113:
     pushcom();
     break;
  case 145:
     wizlist();
     break;
  case 146:
     incom();
     break;
  case 147:
     lightcom();
     break;
  case 114:
     inviscom();
     break;
  case 115:
     viscom();
     break;
  case 148:
     deafcom();
     break;
  case 149:
     ressurcom();
     break;
  case 150:
     logcom();
     break;
  case 151:
     tsscom();
     break;
  case 152:
     rmeditcom();
     break;
  case 154:
     squeezecom();
     break;
  case 153:
     loccom();
     break;
  case 155:
     usercom();
     break;
  case 156:
     u_system();
     break;
  case 157:
     inumcom();
     break;
  case 158:
     updcom();
     break;
  case 159:
     becom();
     break;
  case 160:
     systat();
     break;
  case 161:
     convcom();
     break;
  case 162:
     snoopcom();
     break;
  case 163:
     shellcom();
     break;
  case 164:
     rawcom();
     break;
  case 165:
     purrcom();
     break;
  case 166:
     cuddlecom();
     break;
  case 167:
     sulkcom();
     break;
  case 168:
     rollcom();
     break;
  case 169:
     bprintf("\001f%s\001",CREDITS);
     break;
  case 170:
     brmode=!brmode;
     break;
  case 171:
     debugcom();
     break;
  case 172:
     jumpcom();
     break;
  case 112:
     wherecom();
     break;
  case 173:
     bprintf("Your adventurers automatic monster detecting radar, and long range\n");
     bprintf("mapping kit, is, sadly, out of order.\n");break;
  case 174:
     if(!in_fight)
        {
        dogocom();
        break;
        }
     else
        {
        char ar[120];
        if(iscarrby(32,mynum))
           {
           bprintf("The sword won't let you!!!!\n");
           break;
           }
        sprintf(ar,"\001c%s\001 drops everything in a frantic attempt to escape\n",globme);
        sendsys(globme,globme,-10000,curch,ar);
        sendsys(globme,globme,-20000,curch,"");
        my_sco-=my_sco/33; // loose 3%
        calibme();
        in_fight=0;
        on_flee_event();
        dogocom();
        break;
        }
  case 175:
     bugcom();
     break;
  case 176:
     typocom();
     break;
  */
  if (n == 177) return pncom()
  /*
  case 178:
     blindcom();
     break;
  case 179:
     edit_world();
     break;
  case 180:
     if(ptstflg(mynum,4)) debug_mode=1-debug_mode;
     break;
  case 181:
     setpflags();
     break;
  case 182:
     frobnicate();
     break;
  case 183:
     setincom();
     break;
  case 184:
     setoutcom();
     break;
  case 185:
     setmincom();
     break;
  case 186:
     setmoutcom();
     break;
  case 187:
     emotecom();
     break;
  case 188:
     digcom();
     break;
  case 189:
     emptycom();
     break;
  default:
     if(my_lev>9999)bprintf("Sorry not written yet[COMREF %d]\n",n);
     else bprintf("I don't know that verb.\n");
     break;
  */
}
