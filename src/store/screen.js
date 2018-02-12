import interface from './interface'

// локация, выписывающая готовый текст в таблицу экрана.
function screen (text, items, header, controls, columns) {
  // COLUMNS
  if (columns && interface.colontitle.variants != 2) {
    columns = '-' + columns + '-'
  } else {
    columns = ''
  }

  var columnTag = {
    color: interface.colontitle.color,
    size: interface.colontitle.size,
    attrib: interface.colontitle.attrib,
    colonBG: interface.colontitle.bgcolor,
    text: column
  }

  // HEADER
  var head = {
    color: '',
    size: '',
    attrib: '',
    headBG: '',
    text: ''
  }
  if (header.checkpoint || (header.test && floor.head.chpnt)) {
    head.color = interface.head.chpnt.color
    head.size = interface.head.chpnt.size
    head.attrib = interface.head.chpnt.attrib
    head.headBG = interface.head.chpnt.bgcolor
    if (header.test) {
      head.text = 'Заголовок контрольной точки'
    }
  } else if (!header.checkpoint || (header.test && floor.head.simpl)) {
    head.color = interface.head.simpl.color
    head.size = interface.head.simpl.size
    head.attrib = interface.head.simpl.attrib
    head.headBG = interface.head.simpl.bgcolor
    if (header.test) {
      head.text = 'Простой заголовок'
    }
  }

  if (interface.head.variants = 1) { head.text = curloc }
  if (interface.head.variants = 2 && head.text != curloc) { head.text = curloc + '.' + head.text }
  if (interface.head.variants = 3) { head.text = head.text }
  if (interface.head.variants = 4 && head.text != curloc) { head.text = head.text + '-' + curloc }
  if (interface.head.variants = 5 && head.text != curloc) { head.text = '' }

  // :ссылка_назад
  back_href = {
    b: '',
    color: '',
    attrib: '',
    text: '' 
  }
  if (interface.back.href || header.test) {
    if (!header.test) {
      back_href.b = 'back_varriors()'
    }
    back_href.color = interface.href.back.color
    back.href.attrib = interface.href.back.attrib
    back.href.text = "Назад"
  }

  // работа с основным описанием
  if (controls.game == 1 || header.test) {
    // формируем содержимое ячеек с характеристиками и предметами

    // :статы
    if (header.test) { knew.test = 'test' }
    stat =  [
      base_txt('table.char'),
      base_txt('table.numbers'),
      base_txt('table.knew', knew.test)
    ]

    // :предметы
    if (interface.objs != 'show') {
      items = [] 
    } else if (header.test) {
      items = base_txt('table.mlast')
    } else {
      items = base_txt('table.blast')
    }
    
    // :дополнительные_тексты
    stat_scroll = []
    if (interface.stat == 'show') {
      if (print.length > 0 || header.test || print_down.length > 0) {
        stat_scroll = [
	  interface.print.main.bgcolor,
	  ''
	]
        if (print.length) {
	  r = array_prnt(print, '[only result]')
	}
        if (print_down.length) { 
          r += array_prnt(print_down, '[only result]')
        }
        if (header.test) {
          r += 'Простой текст. Общее форматирование.<br>'
          r += base_txt('невозможное_действие') + '<br>'
          r += base_txt('одевание') + '<br>'
          r += base_txt('взять') + '<br>'
          r += base_txt('выбросить') + '<br>'
          r += base_txt('сохранения') + '<br>'
          r += base_txt('изменение_стата') + '<br>'
        }
        stat_scroll.push({
          colorBG: interface.print.main.bgcolor,
          color: interface.print.main.color,
          attrib: interface.print.main.attrib,
          text: r
        })
      }
    }

    // таблица из объектов и дополнительных текстов
    objs = [
      items,
      stat_scroll
    ]
  } else {
    // не формируем содержимое ячеек с характеристиками и предметами
    stat = []
    objs = []
  }

  // размеры
  if (!stat_scroll.length && !items.length) {
    width = {
      right: 'width=5%',
      center: ''
    }
  } else {
    width = {
      right: 'width=25%',
      center: 'width=50%'
    }
  }

  // работа с окнами:
  if (interface.objs == 'show') { int_inventory(controls) }
  if (interface.stat == 'show' && controls == '[game]') {
    clr()
    pl(array_prnt(print, '[only result]'))
  }

  // генерируем основное описание и список предметов
  mtxt = {
    bg: interface.maintxt.bgcolor,
    cl: interface.maintxt.text.color,
    attrib: interface.maintxt.text.attrib
  }
  text = [
    [
      mtxt.bg,
      mtxt.cl,
      mtxt.attrib,
      text
    ]
  ]
  if (interface.objLoc.variants == 1) {
    objLoc.var = base_txt('note.objLoc')
  }
  if (items) {
    text.push({
      color: interface.objLoc.bgcolor,
      text: objLoc.var + items
    })
  }
  if (interface.next.href) {
    if (!header.test) {
      hr_np = {
	href: function () {
	  power.now = power.start
	  game.interface = '[game]'
          interface.refresh = 'страница.сброс'
          goto('page.' + (curloc + 1))
	}
      }
      nextpage = {
	b: hr_np,
        color: interface.href.next.color,
        attrib: interface.href.next.attrib,
        text: "next"
      }
      // jump 'button.close'
    } else if ((controls.game == 1 || save['count'] > 0) && (interface.stat != 'show' || interface.objs != 'show') {
      if (!header.test) {
        hr.np = {
	  l: function () { avs_face(test) },
          e: function () { avs.sets() },
          s: function () { avs.save() }
	}
      }
      nextpage = {
        l: {
          l: hr.np.l,
          color: interface.href.next.color,
          attrib: interface.href.next.attrib,
	  text: 'λ'
	},
        e: {
	  l: hr.np.e,
          color: interface.href.next.color,
          attrib: interface.href.next.attrib,
          text: 'é'
	},
	s: {
	  l: hr.np.s,
          color: interface.href.next.color,
          attrib: interface.href.next.attrib,
          text: 'S'
	}
      }
      // :button.close
      if (header.test){
        cc = col_inv(interface.main.bgcolor)
        if (cc){
	  close_color = cc
	} else {
	  close_color = '880000'
	}
        nextpage.push({
          l: function () { avs_face_refresh('close') },
          color: close_color,
          text: base_txt('button.close')
	})
      }
      // jump 'button.end'
    } else {
      nextpage = []
    }
    // :button.end
  if $GAME_INTERFACE['href.back.bgcolor']!'': $args['back.href.bgcolor']='bgcolor=#'+$GAME_INTERFACE['href.back.bgcolor']
  if $GAME_INTERFACE['href.next.bgcolor']!'': $args['next.href.bgcolor']='bgcolor=#'+$GAME_INTERFACE['href.next.bgcolor']
  ! непосредственно генерим таблицу
  if $AVS_PLAYERTYPE='':
  ! если плеер классический, генерим тупо таблицу
		$args['result']='<center><table cellpadding=10 border=0 width=100%>'
		if $args['head']!'': $args['result']+='<tr name=head><td width=25% '+$args['back.href.bgcolor']+' align=right>'+$args['back.href']+'</td><td align=center '+$args['head.bgcolor']+' '+$args['width.center']+'>'+$args['result.head']+'</td><td '+$args['next.href.bgcolor']+' '+$args['width.right']+'>'+$args['nextpage']+'</td></tr>'
		$args['result']+='<tr name=centr><td valign=top align=right width=25%>'+$args['stat']+'</td><td valign=top '+$args['width.center']+'>'+$args[0]+'</td><td valign=top align=left '+$args['width.right']+'>'+$args['objs']+'</td></tr>'
		if $args['colontitle']!'': $args['result']+='<tr><td valign=top align=right width=25%>&nbsp;</td><td name=btm '+$args['colon.bg']+' valign=middle align=center '+$args['width.center']+'>'+$args['colontitle']+'</td><td valign=top align=left '+$args['width.right']+'>&nbsp;</td></tr>'
		$args['result']+='</table></center>'
  elseif $AVS_PLAYERTYPE='QN':
  ! если навигатор, пробуем генерить дивами
		! левая колонка
		if $args['stat']<>'' or $args['back.href']<>'':
			$args['result']='<div id="avs_game_left_column">'
				if $args['back.href']<>'': $args['result']+='<div id="avs_game_back">'+$args['back.href']+'</div>'
				if $args['stat']<>'': $args['result']+='<div id="avs_game_statisctics">'+$args['stat']+'</div>'
			$args['result']+='</div>'
		end
		! центральная колонка
		$args['result']+='<div id="avs_game_center_column">'
			if $args['result.head']<>'':$args['result']+='<	div id="avs_game_head">'+$args['result.head']+'</div>'
			$args['result']+='<div id="avs_game_opinion">'+$args[0]+'</div>'
			if $args['colontitle']<>'':$args['result']+='<div id="avs_game_colontitle		">'+$args['colontitle']+'</div>'
		$args['result']+='</div>'
		! правая колонка
		$args['result']+='<div id="avs_game_right_column">'
			if $args['nextpage']<>'': $args['result']+='<div id="avs_game_sets">'+$args['nextpage']+'</div>'
			if $args['objs']<>'': $args['result']+='<div id="avs_game_objects">'+$args['objs']+'</div>'
		$args['result']+='</div>'
  else
			! Здесь моделируется интерфейс для приложений на андроид или с маленькими экранами
		! адаптировано для FORK
		$args['back.to.page']='<font color=#0000ff>[</font><a href="exec:$GAME_VALUE[''screen.floor'']='''' & gs ''true.goto''">Закрыть</a><font color=#0000ff>]</font>'
		$args['back.to.up']='<font color=#0000ff>[</font><a href="exec: & gs ''true.goto''">Назад</a><font color=#0000ff>]</font>'
		if arrsize('$print')>0:
		! описательные моменты выводятся поверх всех прочих текстов
			$args['result']+=$args['stat.scroll']
			$args['result']+='<br>'+$args['back.to.up']+'<br>'
		else
			! если это не 		описательный момент, смотрим по значению переменной, отмечающей состояние экрана
			if $args['back.href']<>"&nbsp;":
				if $GAME_VALUE['screen.floor']='STATS' or $GAME_VALUE['screen.floor']='OBJS':
					$args['tools']+=$args['back.to.page']+' &nbsp; &nbsp; '
				else
						$args['tools']+='<font color=#0000ff>[</font>'+$args['back.href']+'<font color=#0000ff>]</font> &nbsp; &nbsp; '
				end
				if $GAME_VALUE['screen.floor']='STATS':
					$args['tools']+='<font color=#888888>[<<fast["now"]>>|<<power["now"]>>|<<social["now"]>>]</font> &nbsp; &nbsp; '
				else
						$args['tools']+='<font color=#0000ff>[</font><a href="exec:$GAME_VALUE[''screen.floor'']=''STATS'' & gs ''true.goto''"><<fast["now"]>>|<<power["now"]>>|<<social["now"]>></a><font color=#0000ff>]</font> &nbsp; &nbsp; '
				end
				if $GAME_VALUE['screen.floor']='OBJS':
					$args['tools']+='<font color=#888888>[Предметы]</font>'
				else
						$args['tools']+='<font color=#0000ff>[</font><a href="exec:$GAME_VALUE[''screen.floor'']=''OBJS'' & gs ''true.goto''">Предметы</a><font color=#0000ff>]</font>'
				end
				!$args['tools']+=' ['+$args['nextpage']+']'
			end
			if $GAME_VALUE['screen.floor']='STATS':
				$args['result']+='<b>'+$args['tools']+'</b>'+'<br><br>'
				$args['result']+=$args['stat']
				$args['result']+='<br><br>'+'<b>'+$args['tools']+'</b>'
				$args['result']+='<h2><a href="exec:gosub ''avs.save'',6">Быстрое сохранение</a></h2>'
				$args['result']+='<h2><a href="exec:gosub ''avs.save'',7">Быстрая загрузка</a></h2>'
				$args['result']+='<h2><a href="exec:gosub ''avs.save'',4">Загрузить контрольную точку</a></h2>'
			elseif $GAME_VALUE['screen.floor']='OBJS':
				$args['result']+='<b>'+$args['tools']+'</b>'+'<br><br>'
				$args['result']+=$args['objs.scroll']
				$args['result']+='<br><br>'+'<b>'+$args['tools']+'</b>'
			else
					! стандартный экран, т.е. сами локации
				! строка инструментов выводится только, если $args['back.href']<>"&nbsp;"
				$args['result']+='<b>'+$args['tools']+'</b>'
				$args['result']+='<h2>'+$args['result.head']+'</h2>'
				$args['result']+=$args[0]
				$args['result']+=$args['print.down.log']
				$args['result']+=$args['colontitle']
				$args['result']+='<br>'+'<b>'+$args['tools']+'</b>'
			end
		end
  end
  killvar '$print'
  killvar '$print_down'
  $result=$args['result']
}
