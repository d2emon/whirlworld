var id_watch = []
var refresh_watch = []
var curloc = null
var tvar = null
var AVS_PLAYERTYPE = ''
var GAME_VALUE = {
  screen_floor: '',
  back_code: ''
}
var args = {
  save: '',
  controlJS: ''
}

function onNewLoc () {
  // служебная локация для обработки перехода на новую локацию. Фактически
  // здесь исходный текст книжки превращается в выводимый на экран.
  // -------------------- переход на новую локацию -----------
  if (id_watch != curloc) {
    id_watch.push(curloc)
    // очищаем временный массив:
    tvar = null
    GAME_VALUE.screen_floor = ''
    args.save = 'yep'
    if (GAME_VALUE.back_code != 'back') {
      // save_varriors()
    } else {
      // back_varriors('back')
    }
    if (AVS_PLAYERTYPE == 'QN') {
      // данный костыль должен позволять прокручивать
      // страницу при повторном посещении до низу.
      // смысл в чём. Элемент добавляется только тогда,
      // когда страница посещена первый раз.
      // Если же элемент не найден, скрипт прокрутит
      // полосу прокрутки до низа.
      args.controlJS = '<a name="controlJS" id="controlJS"></a>'
    }
  }
  if (id_watch.length > 100) { id_watch = [] }
  // -------------------- переход на новую локацию -----------

  // -------------------- переход на любую локацию -----------
  refresh_watch.push(curloc)
  if (refresh_watch.length > 9999) { refresh_watch = [] }
  // -------------------- переход на любую локацию -----------

  if (!was_here[curloc]) {
    was_here[curloc] = true
  }
  if (lvar.source != '') {
    args.to_screen = int_DIN(lvar.source)
    args.items_list = int_loc_obj(curloc)
  } else {
    args.to_screen = '<avs-main>' + maintxt + '</avs-main>'
  }

  tvar.dummy_header = lvar.header
  // проверка боем
  if (instr(lvar.header, '<avs-enemy>')) { args.to_screen += base_txt('war') }
  if (instr(lvar.header, '<avs-money>')) { args.to_screen += base_txt('sell') }
  if (instr(lvar.header, '<avs-death>') || GAME_VALUE.power_loose == 'poweroff') {
    /**
    if $GAME_VALUE['power.lose']='poweroff': $args['на экран']+=$func('base.txt','off')
    $args['на экран']+=$func('base.txt','wl')
    $args['список предметов']=''
    $GAME_INTERFACE['refresh']='страница.сброс'
    $GAME_VALUE['interface']=''
     */
    nosave = true
  } else {
    nosave = false
  }
  /**
if instr($lvar['заголовок'],'<avs-victory>')!0:
  $args['на экран']+=$func('base.txt','go')
  $args['список предметов']=''
  $GAME_INTERFACE['refresh']='страница.сброс'
  $GAME_VALUE['interface']=''
end
if instr($lvar['заголовок'],'<avs-game:')!0:
  $args['на экран']+=$func('int.DIN',$func('base.txt','game.enemy',$func('get.tag.cont',$lvar['заголовок'],'avs-game')))
end
! кусок костыля для прокрутки
$args['на экран']+=$args['controlJS']
*clr
if $GAME_INTERFACE['refresh']!'': gosub 'set.Screen',$GAME_INTERFACE['refresh']
$args['PRINTSCREEN']=$func('int.screen',$args['на экран'],$args['список предметов'],$lvar['заголовок'],$GAME_VALUE['interface'],$lvar['колонтитул'])
*pl $args['PRINTSCREEN']

if $refresh_watch[]=$refresh_watch[arrsize('$refresh_watch')-2] and time['goto']=0:
  wait 1
  *p ' '
end

if $refresh_watch[]!$refresh_watch[arrsize('$refresh_watch')-2]:
  ! если локация, на которую мы переместились, новая
  if instr($tvar['костыль.заголовок'],'<avs-enemy>')!0:
    $GAME_VALUE['приём лекарства']='запрещён'
  elseif $GAME_VALUE['приём лекарства']='запрещён':
    $GAME_VALUE['приём лекарства']='разрешён'
  else
    $GAME_VALUE['приём лекарства']=''
  end
end

killvar '$lvar'
killvar '$GAME_WAR'
killvar '$GAME_WAR_LOG'

if instr($tvar['костыль.заголовок'],'<checkpoint>')!0 and checkpoint[$curloc]=0:
  checkpoint[$curloc]+=1
  gosub 'avs.save',999
end
time['goto']=0
   */

}

export default {
  onNewLoc
}
