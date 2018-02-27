function getuid() { return true }
function geteuid() { return true }
function crapup(text) { console.log('CRAPUP: ' + text))
function isdark(loc) { return false }
function fpbns(p) { return {} }
var alarm = {
  block: function () {},
  unblock: function () {}
}
var world = {
  load: function () {},
  save: function () {}
}
var me = {
  num: 0,
  lev: 0,
  loc: 0,
  vis: 0,
  name: '',
  ail: {
    blind: false,
  }
  loose: function () {}
}
var wd = {
  him: '',
  her: '',
  it: '',
  them: ''
}

function bprintf(text) {
  if (text.length > 235) {
    console.log("Bprintf Short Buffer overflow")
    crapup("Internal Error in BPRINTF")
  }
  /* Now we have a string of chars expanded */
  sysbuf.quprnt(text)
}

function seeplayer(p) {
  if (!p) return true
  if (me.num == p.num) return true /* me */
  if (me.lev < p.vis) return false
  if (me.ail.blind) return false /* Cant see */
  if ((me.loc == p.loc) && (isdark(me.loc))) return false
  setname(p)
  return true
}

function setname(p) {
  /* Assign Him her etc according to who it is */
  if ((p.id > 15) && (p != fpbns("riatha")) && (p != fpbns("shazareth"))) {
    wd.it = p.name
    return
  }
  if (p.sex) wd.her = p.name
  else wd.him = p.name
  wd.them = x.name
}

var sysbuf = {
  max: 4096,
  buff: '',

  iskb: true,
  pr: {
    due: false,
    qcr: false
  },

  putchar: function (c) {},
  makebfr: function () {
    this.buff = malloc(this.max) /* 4K of chars should be enough for worst case */
    if (!this.buff) crapup("Out Of Memory")
    this.buff = ''
  },
  quprnt: function (text) {
    if (text.length + this.buff.length > this.max) {
      this.buff = ''
      me.loose()
      console.log('Buffer overflow on user ' + me.name)
      crapup('PANIC - Buffer overflow')
    }
    this.buff += text
  },
  pbfr: function (){
    alarm.block()
    world.save()

    if (this.buff) this.pr.due = true
    if (this.buff && this.pr.qcr) stdout.putchar('\n')
    this.pr.qcr = false

    if (log_fl.opened) {
      this.iskb = false
      log_fl.dcprnt(this.buff)
    }

    if (snoopd.load()) {
      this.iskb = false
      snoopd.dcprnt(this.buff)
      snoopd.close()
    }

    this.iskb = true
    stdout.dcprnt(this.buff)
    this.buff = "" /* clear buffer */
    snoopt.load()
    alarm.unblock()
  }
}

var fileBuff = {
  opened: false, /* 0 = not logging */
  input: '',
  output: '',
  ct: 0,

  printf: function (text) { console.log(text) } ,
  f_listfl: function (x) {},
  putc: function (c) {},

  function tocontinue(max) {
    let res = ''
    while (this.input[this.ct] != '\001') {
      res += this.input[this.ct]
      this.ct++
    }

    if (res.length >= max) {
      console.log("IO_TOcontinue overrun")
      this.input = ""
      crapup("Buffer OverRun in IO_TOcontinue")
    }

    this.ct++
    return res
  }

  /* The main loop */
  function dcprnt(str) {
    while (str[ct]) {
      this.putc(str[ct])
      // CMDs
      ct++
    }
  }

  // f
  function pfile() {
    txt = this.tocontinue(128)

    if (debug_mode) this.printf('[FILE ' + txt + ' ]\n')
    this.output += this.f_listfl(txt)
  }

  // d
  function pndeaf(str) {
    txt = this.tocontinue(256)
    if(!ail_deaf) this.printf(txt)
  }

  // s
  function pcansee(str) {
    txt = this.tocontinue(23, 256)
    a = fpbns(txt.name)
    if (!seeplayer(a)) {
      return
    }
    this.printf(txt.text)
  }

  // p
  function prname(str) {
    txt = this.tocontinue(24)
    if(!seeplayer(fpbns(txt)))
      this.printf('Someone')
    else
      this.printf(txt)
  }

  // c
  function pndark(str) {
    txt = this.tocontinue(256)
    if((!isdark()) && (ail_blind == 0))
      this.printf(txt)
  }

  // P
  function ppndeaf(str) {
    txt = this.tocontinue(24)
    if (ail_deaf) return
    a = fpbns(txt)
    if (seeplayer(a))
      this.printf(txt)
    else
      this.printf("Someone")
  }

  // D
  function ppnblind(str) {
    let txt = this.tocontinue(24)
    if (ail_blind) return
    a = fpbns(txt)
    if (seeplayer(a))
      this.printf(txt)
    else
      this.printf("Someone")
  }

  // l
  function pnotkb() {
    let txt = this.tocontinue(127)
    if(iskb) return
    this.printf(txt)
  }

  // default
  function other() {
    this.input = ""
    loseme()
    crapup("Internal $ control sequence error\n")
  }

  function close() {
    this.printf("\nEnd of log....\n\n")
    this.opened = false
    bprintf("End of log\n")
  }
}

var log_fl = {
  _proto_: fileBuff,

  load: function () {
    bprintf("Commencing Logging Of Session\n")
    this.open("mud_log", "a")
    if (!this.opened) this.open("mud_log", "w")
    if (!this.opened) {
      bprintf("Cannot open log file mud_log\n")
      return false
    }
    bprintf("The log will be written to the file 'mud_log'\n")
    return true
  },
  open: function (filename, mode) {
    this.opened = true
  }
}

var snoop = {
  _proto_: fileBuff,

  filename: function (username) {
    return SNOOP + username
  },

  open: function (username, per) {
    this.opened  = openlock(this.filename(username), per)
    return this.opened
  }
}

var snoopd = {
  _proto_: snoop,
  snoopd: null,

  load: function () {
    if (!this.snoopd) return false
    this.open(this.snoopd.name, 'a')
    return this.opened
  }
}

var snoopt = {
  _proto_: snoop,
  snoopt: null,
  sntn: null,

  view: function () {
    if (!this.openr(me)) return

    while(!this.feof()) {
      z = this.fgets(127)
      this.printf("|%s", z)
    }
    this.truncate(0)
    this.close()
    /*
    let x = snoopt
    snoopt = null
    pbfr();
    snoopt = x
    */
  },
  start: function () {
    if (!this.snoopt) return false
    return this.view()
  },
  load: function (player) {
    this.open(player.name, 'r+')
    if (!this.snoopt) return false
    return this.opened
  },
  check: function () {
    if (!this.snoopt) return
    sendsys(this.sntn, me, -400, 0, '')
  }
}

var snoopme = {
  _proto_: snoop,

  load: function () {
    this.open(me, 'w')
  }
}

// Actions
function logcom(args) {
  if (getuid() != geteuid()) {
    bprintf("\nNot allowed from this ID\n")
    return
  }

  if (log_fl.opened) {
    log_fl.close()
    return
  }

  log_fl.open()
}

function snoopcom(args){
  if (me.lev < 10) {
    bprintf('Ho hum, the weather is nice isn\'t it\n')
    return
  }

  if (snoopt.snoopt) {
    bprintf('Stopped snooping on ' + snoopt.sntn.name + '\n')
    snoopt.snoopt = null
    sendsys(snoopt.sntn, me, -400, 0, '')
  }

  if (args.length <= 0) return
  p = fpbn(args[0])
  if (!p) {
    bprintf('Who is that ?\n')
    return
  }
  if(((me.lev < 10000) && (p.lev >= 10)) || (p.bit[6])) {
    bprintf('Your magical vision is obscured\n')
    snoopt.snoopt = null
    return
  }
  snoopt.sntn = p
  snoopt.snoopt = p
  bprintf('Started to snoop on ' + p.name + '\n')
  sendsys(snoopt.sntn, me, -401, 0, '')

  snoopme.load(me, 'w')
  snoopme.printf(' ')
  snoopme.close()
}
