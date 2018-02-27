function statplyr(args) {
  b = fpbn(args[0])
  if (!b) {
    bprintf("Whats that ?\n");
    return;
  }
  bprintf('Name      : ' + b.name + '\n')
  bprintf('Level     : ' + b.lev + '\n')
  bprintf('Strength  : ' + b.str + '\n')
  bprintf('Sex       : ' + (b.sex == 0 ? "MALE" : "FEMALE") + '\n')
  bprintf('Location  : ' + showname(b.loc))
}

function wizlist() {
  if (me.lev < 10)
  {
    bprintf("Huh ?\n")
    return
  }
  world.save()
  bprintf('\001f' + WIZLIST + '\001')
}

function incom() {
  a = 0
  if (me.lev < 10) {
    bprintf("Huh\n");
    return;
  }
  while (a < 7) {
    ex_bk[a] = ex_dat[a]
    a++
  }
  if (args.length == 0) {
    bprintf("In where ?\n");
    return;
  }
  rn = args[0]
  if (args <= 1) {
    bprintf("In where ?\n");
    return;
  }
  rv = args[1]
  x = roomnum(rn,rv)
  if (x == 0) {
    bprintf("Where is that ?\n");
    return;
  }
  getreinput(st);
  y = me.loc
  me.loc = x
  world.close()
  unit = openroom(me.loc, "r")
  if (!unit) {
    me.loc = y
    bprintf("No such room\n");
    return;
  }
  lodex(unit);
  unit.close()
  world.load()
  gamecom(st)
  world.load()
  if (me.loc == x) {
    a = 0
    while (a < 7) {
      ex_dat[a] = ex_bk[a]
      a++
    }
  }
  me.loc = y
}

function smokecom() {
  lightcom()
}

function jumpcom() {
  a = 0;
  b = 0;
  while(jumtb[a]) {
    if (jumtb[a] == curch) {
      b = jumtb[a+1];
      break;
    }
    a += 2
  }
  if (b==0) {
    bprintf("Wheeeeee....\n");
    return;
  }
  if ((me.lev < 10) && ((!item1.iscarrby(me)) || (item1.state == 0))) {
    me.loc = b
    bprintf("Wheeeeeeeeeeeeeeeee  <<<<SPLAT>>>>\n")
    bprintf("You seem to be splattered all over the place\n")
    me.loose()
    crapup("I suppose you could be scraped up - with a spatula")
  }
  ms = '\001s' + me.name + '\001' + me.name + ' has just left\n\001'
  sendsys(me, me, -10000, me.loc, ms)
  me.loc = b
  ms = '\001s' + me.name + '\001' + me.name + ' has just dropped in\n\001'
  sendsys(me, me, -10000, me.loc, ms);
  trapch(b);
}

var jumtb[] = [-643, -633, -1050, -662, -1082, -1053, 0, 0]

function wherecom() {
  if (me.str < 10) {
    bprintf("You are too weak\n");
    return;
  }
  if (me.lev < 10) me.str -= 2
  rnd = randperc()
  cha = 10 * me.lev
  if ((item111.iscarrby(me))||(item121.iscarrby(me))||(item163.iscarrby(me)))
    cha = 100
  world.close()
  if (rnd > cha) {
    bprintf("Your spell fails...\n");
    return;
  }
  cha = 0;
  if(args.length == 0) {
    bprintf("What is that ?\n")
    return
  }
  rnd = 0
  while(cha < numobs) {
    if (cha.name == args[0]) {
      rnd = 1
      if (me.lev > 9999) bprintf('[' + cha + ']');
      bprintf(cha.name + ' - ')
      if ((me.lev < 10) && (cha.spare == -1))
        bprintf("Nowhere\n");
      else
        desrm(cha.loc, cha.carrf);
    }
    cha++
  }
  cha = fpbn(args[0])
  if (cha) {
    rnd++;
    bprintf(cha.name + ' - ');
    desrm(cha.loc, 0);
  }
  if(rnd) return;
  bprintf("I dont know what that is\n");
}

function desrm(loc, cf) {
  if ((me.lev < 10) && (cf == 0) && (loc > -5)) {
    bprintf("Somewhere.....\n");
    return;
  }
  if (cf==3) {
    bprintf('In the ' + loc.name + '\n');
    return;
  }
  if(cf>0) {
    bprintf('Carried by \001c' + loc.name + '\001\n');
    return;
  }
  unit = openroom(loc, "r")
  if (unit==NULL) {
    bprintf("Out in the void\n");
    return;
  }
  b=0;
  while(b++<7)
    getstr(unit, x);
  bprintf(x);
  if (me.lev>9) {
    bprintf(" | ");
    showname(loc);
  } else
    bprintf("\n");
  fclose(unit);
}

function edit_world() {
	if (!me.bit[5]) {
		bprintf("Must be Game Administrator\n");
		return;
	}
	if(args.length == 0) {
		bprintf("Must Specify Player or Object\n");
		return;
	}
	if (args[0] == "player") {
    //goto e_player;
  }
	if (args[0] != "object") {
		bprintf("Must specify Player or Object\n");
		return;
	}
	b = getnarg(0, numobs - 1);
  if (!b) return;
	c = getnarg(0, 3);
  if (!c) return;
	d = getnarg(0, 0)
  if (!d) return;
	objinfo[4 * b + c] = d
  bprintf("Tis done\n");
  return;

  // e_player:
  b = getnarg(0, 47);
	if (!b) return;
	c = getnarg(0, 15);
	if (!c) return;
	d = getnarg(0, 0);
	if (!d) return;
	ublock[16 * b + c] = d;
  bprintf("Tis done\n");
  return;
}

function getnarg(bt, to) {
	if(args.length == 0) {
		bprintf("Missing numeric argument\n");
		return false;
	}
	x = numarg(args[0]);
	if (x<bt) {
    bprintf("Invalid range\n");
    return false;
  }
	if ((to) && (x > to)) {
    bprintf("Invalid range\n");
    return false;
  }
	return x
}

// Actions
function helpcom() {
extern char wordbuf[];
extern long curch,mynum;
extern char globme[];
extern long my_lev;
long a;
char b[128];
if(brkword()!= -1)
{
	a=fpbn(wordbuf);
	if(a== -1)
	{
		bprintf("Help who ?\n");
		return;
	}
	if((ploc(a)!=curch))
	{
		bprintf("They are not here\n");
		return;
	}
	if(a==mynum)
	{
		bprintf("You can't help yourself.\n");
		return;
	}
	if(phelping(mynum)!=-1)
	{
		sprintf(b,"\001c%s\001 has stopped helping you\n",globme);
		sendsys(pname(a),pname(a),-10011,curch,b);
		bprintf("Stopped helping %s\n",pname(phelping(mynum)));
	}
	setphelping(mynum,a);
	sprintf(b,"\001c%s\001 has offered to help you\n",globme);
	sendsys(pname(a),pname(a),-10011,curch,b);
	bprintf("OK...\n");
	return;
    }
    closeworld();
    bprintf("\001f%s\001",HELP1);
    if(my_lev>9)
       {
       bprintf("Hit <Return> For More....\n");
       pbfr();
       while(getchar()!='\n');
       bprintf("\001f%s\001",HELP2);
       }
    bprintf("\n");
    if(my_lev>9999)
       {
       bprintf("Hit <Return> For More....\n");
       pbfr();
       while(getchar()!='\n');
       bprintf("\001f%s\001",HELP3);
       }
    bprintf("\n");
}

function levcom() {
    closeworld();
    bprintf("\001f%s\001",LEVELS);
}

function valuecom() {
    long a,b;
    extern char wordbuf[];
    extern long mynum;
    if(brkword()== -1)
       {
       bprintf("Value what ?\n");
       return;
       }
    b=fobna(wordbuf);
    if(b== -1)
       {
       bprintf("There isn't one of those here.\n");
       return;
       }
    bprintf("%s : %d points\n",wordbuf,(tscale()*(obaseval(b)))/5);
    return;
}

function stacom() {
    long a,b;
    extern long my_lev;
    if(brkword()== -1)
       {
       bprintf("STATS what ?\n");
       return;
       }
    if(my_lev<10)
       {
       bprintf("Sorry, this is a wizard command buster...\n");
       return;
       }
    a=fobn(wordbuf);
    if(a== -1)
       {
       statplyr();
       return;
       }
    bprintf("\nItem        :%s",oname(a));
if(ocarrf(a)==3) bprintf(       "\nContained in:%s",oname(oloc(a)));
else
{
    if(ocarrf(a)!=0)bprintf("\nHeld By     :%s",pname(oloc(a)));
    else
       {bprintf("\nPosition    :");
       showname(oloc(a));
}
       }
    bprintf("\nState       :%d",state(a));
    bprintf("\nCarr_Flag   :%d",ocarrf(a));
    bprintf("\nSpare       :%d",ospare(a));
    bprintf("\nMax State   :%d",omaxstate(a));
    bprintf("\nBase Value  :%d",obaseval(a));
    bprintf("\n");
}

function examcom() {
    long a,b;
    FILE *x;
    char r[88];
    extern long mynum,curch;
    extern char globme[],wordbuf[];
    if(brkword()== -1)
       {
       bprintf("Examine what ?\n");
       return;
       }
    a=fobna(wordbuf);
    if(a== -1)
       {
       bprintf("You see nothing special at all\n");
       return;
       }
    switch(a)
       {
       case 144:
          if(obyte(144,0)==0)
             {
             osetbyte(144,0,1);
             bprintf("You take a scroll from the tube.\n");
ocreate(145);
             setoloc(145,mynum,1);
             return;
             }
          break;
       case 145:
          ;
          curch= -114;
          bprintf("As you read the scroll you are teleported!\n");
          destroy(145);
          trapch(curch);
          return;
       case 101:
          if(obyte(101,0)==0)
             {
             bprintf("You take a key from one pocket\n");
             osetbyte(101,0,1);
oclrbit(107,0);
             setoloc(107,mynum,1);
             return;
             }
          break;
       case 7:
          setstate(7,randperc()%3+1);
          switch(state(7))
             {
             case 1:
                bprintf("It glows red");break;
             case 2:
                bprintf("It glows blue");break;
             case 3:
                bprintf("It glows green");break;
                }
          bprintf("\n");
          return;
       case 8:
          if(state(7)!=0)
             {
             if((iscarrby(3+state(7),mynum))&&(otstbit(3+state(7),13)))
                {
                bprintf("Everything shimmers and then solidifies into a different view!\n");
                destroy(8);
                teletrap(-1074);
                return;
       case 85:
          if(!obyte(83,0))
             {
             bprintf("Aha. under the bed you find a loaf and a rabbit pie\n");
             ocreate(83);ocreate(84);
             osetbyte(83,0,1);
             return;
             }
          break;
       case 91:
          if(!obyte(90,0))
             {
             ocreate(90);bprintf("You pull an amulet from the bedding\n");
             osetbyte(90,0,1);
             return;
             }
          break;
          }
       }
    break;
    }

 sprintf(r,"%s%d",EXAMINES,a);
 x=fopen(r,"r");
 if(x==NULL)
 {
 bprintf("You see nothing special.\n");
 return;
 }
 else
 {while(getstr(x,r))
    {
    bprintf("%s\n",r);
    }
 fclose(x);
 }
 }
