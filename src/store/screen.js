// локация, выписывающая готовый текст в таблицу экрана.
// function screen (text, items, header, controls, footer)

  // работа с окнами:
  // if (iface.objs.show) { int_inventory(controls) }
  // if (iface.stat.show && controls.game) { pl.push(print) }

  // --------------------------------------------------------------------------

  // BACK
  // Назад    back_varriors()

  // STATS
  // [[fast.now]] | [[power.now]] | [[social.now]]
  // base.txt('table.char'),
  // base.txt('table.numbers'),
  // base.txt('table.knew', knew.test)

  // --------------------------------------------------------------------------

  // HEADER
  // ====
  // checkpoint ::  Заголовок контрольной точки
  // !checkpoint :: Простой заголовок
  // getHeadText(iface.head.variants, headText, curloc)

  // BODY
  // ====
  // text
  // base.txt('note.objLoc')
  // items  || base.txt('table.mlast') || base.txt('table.blast')

  // FOOTER
  // ====
  // columns

  // --------------------------------------------------------------------------

  // LINKS
  // ====
  // Next                     power.now = power.start
  //                          game.iface.game = true
  //                          iface.refresh = 'страница.сброс'
  //                          gotoPage('page.' + (location + 1))
  // λ                        avs.face(test)
  // é                        avs.sets()
  // S                        avs.save()
  // base.txt('button.close') avs.face.refresh('close')

  // OBJS
  // ====
  // items  || base.txt('table.mlast') || base.txt('table.blast')
  // ----
  // print
  // print_down
  // Простой текст. Общее форматирование.
  // base.txt('невозможное_действие')
  // base.txt('одевание')
  // base.txt('взять')
  // base.txt('выбросить')
  // base.txt('сохранения')
  // base.txt('изменение_стата')

  // --------------------------------------------------------------------------

  // __ANY__
  // %STATS%
  // %OBJS%
  // %LINKS%

  // __STAT__
  // Быстрое сохранение           avs_save(6)
  // Быстрая загрузка             avs_save(7)
  // Загрузить контрольную точку  avs_save(4)

  // __OBJS__
  // >> obj.scroll

  // __DEFAULT__
  // %HEADER%
  // %BODY%
  // >> print.down.log
  // %FOOTER%
