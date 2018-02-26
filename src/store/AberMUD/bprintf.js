function crapup(text) { console.log('CRAPUP: ' + text))

var pr_due = 0

function bprintf(args) {
  x = args
  if (x.length > 235) {
    console.log("Bprintf Short Buffer overflow")
    crapup("Internal Error in BPRINTF")
  }
  /* Now we have a string of chars expanded */
  quprnt(x)
}

var fileBuff = {
  opened: false, /* 0 = not logging */
  input: '',
  output: '',
  ct: 0,

  function printf(text) console.log(text)
  function f_listfl(x) {}

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

function seeplayer(p) {
  if (!p) return true
  if (me.num == p.num) return true /* me */
  if (me.lev < p.vis) return false
  if (ail.blind) return false /* Cant see */
  if ((me.loc == p.loc) && (isdark(me.loc))) return false
  setname(p)
  return true
}

var sysbuf = null

function makebfr() {
  sysbuf = malloc(4096) /* 4K of chars should be enough for worst case */
  if (!sysbuf) crapup("Out Of Memory")
  sysbuf = ""
}
    
var log_fl = {
  _proto_: fileBuff,

  function open(filename, mode) {
    this.opened = true
  }
}

var snoop = {
  _proto_: fileBuff,
  snoopt: null,

  function open(user, per) {
    let z =  SNOOP + user
    let x = openlock(z, per)
    this.opened = true
    return x
  }

  function viewsnoop() {
    this.open(me.name, "r+")
    if (!this.snoopt) return
    if (!this.opened) return
    while(!this.feof()) {
      z = this.fgets(127)
      printf("|%s", z)
    }
    this.truncate(0)
    this.close()
    /*
    let x = snoopt
    snoopt = null
    pbfr();
    snoopt = x
    */
  }
}

function logcom() {
  if (getuid() != geteuid()) {
    bprintf("\nNot allowed from this ID\n")
    return
  }

  if (log_fl.opened) {
    log_fl.close()
    return
  }

  bprintf("Commencing Logging Of Session\n")
  log_fl.open("mud_log", "a")
  if (!log_fl.opened) log_fl.open("mud_log", "w")
  if (!log_fl.opened) {
    bprintf("Cannot open log file mud_log\n")
    return
  }
  bprintf("The log will be written to the file 'mud_log'\n")
}

var pr_qcr = 0 

function pbfr(){
  block_alarm()
  closeworld()
  if (sysbuf) pr_due = 1
  if (sysbuf && pr_qcr) putchar('\n')
  pr_qcr = 0
  if (log_fl.opened) {
    iskb = 0
    log_fl.dcprnt(sysbuf)
  }
  if (snoopd) {
    snoop.open(snoopd.name, "a")
    if (snoop.opened) {
      iskb = 0
      snoop.dcprnt(sysbuf)
      snoop.close()
    }
  }
  iskb = 1
  stdout.dcprnt(sysbuf)
  sysbuf = "" /* clear buffer */
  if (snoop.snoopt) viewsnoop()
  unblock_alarm()
}

var iskb = 1

function quprnt(x) {
  if (x.length + sysbuf.length > 4095) {
    sysbuf = ''
    me.loseme()
    console.log('Buffer overflow on user ' + me.name)
    crapup('PANIC - Buffer overflow')
  }
  sysbuf += x
}

var snoopd = null
var sntn[32] = []

function snoopcom(){
  if (my_lev < 10) {
    bprintf('Ho hum, the weather is nice isn\'t it\n')
    return
  }

  if (snoop.snoopt) {
    bprintf('Stopped snooping on ' + sntn.name + '\n')
    snoop.snoopt = null
    sendsys(sntn, me, -400, 0, '')
  }
  if (brkword() == -1) {
    return
  }
  x = fpbn(wordbuf)
  if (x == -1) {
    bprintf('Who is that ?\n')
    return
  }
  if(((my_lev < 10000) && (x.lev >= 10))||(x.bit[6])) {
    bprintf('Your magical vision is obscured\n')
    snoop.snoopt = null
    return
  }
  sntn = x
  snoop.snoopt = x
  bprintf('Started to snoop on ' + x.name + '\n')
  sendsys(sntn, me, -401, 0, '')
  snoop.open(me, 'w')
  snoop.printf(' ')
  snoop.close()
}

function chksnp() {
  if (!snoopt) return
  sendsys(sntn, me, -400, 0, '')
}
 
function setname(x) {
  /* Assign Him her etc according to who it is */
  if((x>15) && (x!=fpbns("riatha")) && (x!=fpbns("shazareth"))) {
    strcpy(wd_it, pname(x))
    return
  }
  if(psex(x)) strcpy(wd_her, pname(x))
  else strcpy(wd_him, pname(x))
  strcpy(wd_them, pname(x))
}
