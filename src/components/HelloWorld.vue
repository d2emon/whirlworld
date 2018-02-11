<template>
    <v-layout row>
      <v-flex xs10>
        <b-modal v-model="starting" size="lg">
          <div slot="modal-title">
            Начало игры
          </div>
          <p>Вам предлагают на выбор одну из трех вещей, примерно равных по массе:</p>
          <div slot="modal-footer">
            <template v-for="(i, id) in items">
              <b-btn :id="'item-' + id" @click.stop="selectItem(i)" :key="id">{{ i.short }}</b-btn>
              <b-popover
                :target="'item-'+id"
                placement="bottom"
                :title="i.title"
                triggers="hover focus"
                :content="i.description"
                :key="'p' + id"
              >
              </b-popover>
            </template>
          </div>
        </b-modal>

        <b-card no-body class="w-75 mx-auto">
          <div class="p-3">
            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/secretar.jpg" class="img-avatar" alt="Секретарша">
                </div>
              </div>
              <div>
                <small class="text-muted">Секретарша</small>
              </div>
              <div>
                <p>Входите, майор, шеф ждет вас. Опять неприятности в Лаборатории Мерфи.</p>
                <p><em>Голос секретарши шефа подозрительно мягок — значит, вас ждет особо опасное задание. А тут еще упоминание о Лаборатории Мерфи...</em></p>
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Ох, и попортил же вам крови этот громадный — как два хороших города — научно-исследовательский центр! Там есть всё: гениальнейшие ученые, исполнительнейшие лаборанты, современнейшее исследовательское оборудование, умнейшие компьютеры, океан энергии... Нет там только одного — порядка. Не было, нет и никогда не будет!..</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Опять Лаборатория? <em>— спрашиваете вы, входя в кабинет.</em></p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Там произошла кража, <em>— морщится шеф.</em></p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>И когда у них все будет тихо-мирно! Почему бы им не изобрести что-нибудь такое, чтобы избавиться от неприятностей и оставить в покое Патруль и полицию?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Нет уж, лучше не надо! Они уже пробовали! Помнишь Супермозг, сынок?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Еще бы! Такое не забывается. Супермозг, компьютер последнего поколения, немыслимой сложности устройство, был в порядке испытания брошен на административное руководство Лабораторией Мерфи. Сложность его и подвела. Супермозг перехватил обрывок трансляции художественного фильма (это был фантастический боевик), принял его как руководство к действию и объявил войну Лунной Обсерватории. Очень много шуму было. Вы как раз все это и расхлебывали...</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Но какое отношение Патруль имеет к краже? А полиция за что деньги получает?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Ты не спросил, что похищено, сынок. Опытный образец бета-аннигилятора. Кошмарная штуковина. Размером с рюкзачок, а сумеет превратить в ослепительную вспышку большой остров. А если по этому образцу построить приборчик покрупнее, можно пускать на распыл планеты...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Но почему все-таки с этим не может разобраться полиция? Или они уже не расследуют дел серьезнее, чем угон летающих велосипедов от школьной стоянки?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>По двум причинам, сынок. Во-первых, удалось установить, что ворюга работает на Паука. Помнишь пиратского босса, которого ты брал на внешнем кольце Сатурна? Он потом с каторги удрал... Так что это наше дело и наш клиент. Во-вторых, негодяй исчез в Веренице Миров. Он сейчас где угодно, но не на Земле.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p><em>Вы опускаетесь в кресло, поняв, что от задания не отбрыкаться.</em></p>
                <p>Все, сэр, сдаюсь и готов слушать. Сначала о клиенте...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Дэвид Бронсон. Всё.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Как это — всё?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Перед тем как исчезнуть, Бронсон стер в компьютерной памяти все данные о себе. Работал он в группе, изучающей Вереницу Миров. Там сотрудники какие-то чокнутые, ничего не замечают, кроме своих записей и приборов. Возраст похитителя, рост, цвет волос, цвет глаз — все по-разному описывают. Дружно сходятся лишь в одном: у Бронсона были совершенно потрясающие уши! Как у слона! Да, вот еще: украденный прибор находится в обычном пластиковом рюкзаке лилового цвета...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Исчерпывающее описание, шеф. Остается протянуть руку и схватить вора за шиворот... теперь слушаю про Вереницу Миров.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Это система мгновенного межпространственного перемещения. По какому принципу действует — не спрашивай. Я этого не пойму, даже если весь персонал Лаборатории Мерфи хором начнет объяснять. Какие-то Ворота: входишь здесь, а выходишь на другой планете. Причем где эта планета находится — пока не известно. Может, вообще не в нашей Вселенной. А может, в ближайшей солнечной системе. Поэтому все планеты, куда можно таким образом попасть, носят условные названия, например... — Шеф скашивает взгляд в записи. — ...Мир Лиловых Зорь, Мир Легенд, Мир Дружелюбных Тарантулов, Мир Камней, Мир Сновидений, Мир Роботов, Мир Грозных Призраков, Мир Стрекоз, Мир Мертвых Морей... всего девятнадцать миров. В каждом инженеры Лаборатории Мерфи установили Ворота Связи — для перехода в иные миры. Увы, Ворота подчиняются лишь одному закону — закону Мерфи. Они зашвырнут вас туда, куда сами сочтут нужным. Есть и еще одно осложнение. Карты исследованных земель с обозначенными на них Воротами наш мерзавец Бронсон предусмотрительно захватил с собой...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Поправьте меня, сэр, если я неправильно вас понял. Мне предстоит попасть на малоисследованную планету, причем в неизвестно какую ее точку; выяснить, не ли там человека, о котором известно лишь, что у него большие уши, а за плечами лиловый рюкзак; после чего перейти в другой мир и продолжить поиски. Так? О таком задании я мечтал всю жизнь! Перерыть от полюса до полюса девятнадцать планет!..</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Не преувеличивай, сынок. Конечно, это задание повышенной паршивости, но Ворота — устройство с ограниченным радиусом действия, так что «от полюса до полюса» — это ты зря... К тому же Ворота обладают некоей, условно говоря, «памятью», и высока вероятность того, что они забросят тебя туда же, куда перед этим забросили твоего противника. Если, конечно, не вмешается закон Мерфи...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>А возвращение? Как вернуться на Землю?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>О, с этим проще! Существует силовое устройство, способное выдернуть путешественника из любого Мира и вернуть на Землю.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Тогда почему бы не воспользоваться им, чтобы вернуть беглеца?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Увы, устройство сейчас... как бы это сказать...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Неисправно? <em>— догадываетесь вы.</em></p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Дорабатывается, <em>— дипломатично говорит шеф. —</em>  Через полгода будет в полном порядке.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Полгода! За полгода Бронсон успеет связаться с Пауком — наверняка у них это продумано заранее. И, если вы хоть что-то понимаете в пиратской душе, через полгода Паук станет повелителем Галактики...</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Шеф, <em>— кротко интересуетесь вы, —</em> не слишком ли это простое поручение? Не мало ли неприятностей на мою голову?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Угадал! <em>— вздыхает шеф. —</em> В Вереницу Миров прорвался кое-кто еще...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Экран над столом вспыхивает, на нем появляется лицо симпатичной кареглазой девушки с задорно вздернутым носиком и коротко остриженными каштановыми волосами.</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Мэри Коуфорд... Да-да, дочь того самого Дэна Коуфорда, что прежде был знаменитым пиратом, а теперь стал богатейшим из вольных торговцев. Хотел бы я знать, как он раздобыл помилование за былые похождения... Дочка вся в папашу. Авантюристка до мозга костей. Ненавидит Паука и всегда рада подставить ему подножку. Отличная актриса. Знает дзюдо, умело владеет чуть ли не всеми видами оружия. В случае необходимости сумеет поднять звездолет, а возможно, и проложить для него курс. Девятнадцать лет... Не хмыкай, она опасна, как пантера!</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Шеф, может быть, вы и невысокого мнения обо мне лично, но уж команда-то моя как-нибудь справится с девятнадцатилетней девчонкой!</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>А вот это — последний сюрприз. Ты идешь на задание один. Ворота не выдержат такой нагрузки — перебрасывать всю команду. Оставишь здесь и стажеров с Плутона, и своего любимого пса-мутанта, и даже, представь себе, Клушу!</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Это и в самом деле удар! КЛУ-6, криминалистическая лабораторная установка, шестая модель... Ваш личный робот, верный соратник и незаменимый помощник!.. Правда, Клуша зачастую занудна, болтлива, чересчур заботлива, но сколько раз она спасала вас от провала операции, а то и от смерти...</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p>Не переживай, сынок. Клуша будет связана с тобой телепатически. Подробности сообщит инженер, отвечающий за Ворота. Все, инструктаж окончен.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/boss.jpg" class="img-avatar" alt="Шеф">
                </div>
              </div>
              <div>
                <small class="text-muted">Шеф</small>
              </div>
              <div>
                <p><em>Встав, шеф добавляет официально:</em></p>
                <p>Возвращайтесь с победой, майор!</p>
                <br />
                <br />
              </div>
            </div>

            <hr>

            <div class="message">
              <div>
                <p>Как же, вернешься тут с победой! Инженер, собирающий вас в дорогу, больше всего озабочен тем, чтобы вы взяли с собою как можно меньше вещей. Даже форменную бляху Патруля вам велели снять с пояса — при Переходе важен каждый грамм.</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/engineer.jpg" class="img-avatar" alt="Инженер">
                </div>
              </div>
              <div>
                <small class="text-muted">Инженер</small>
              </div>
              <div>
                <p>Это лишь при старте с Земли, <em>— утешает вас инженер. —</em> В следующих Воротах можете тащить за собой хоть тушу мамонта.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Только мамонта мне и не хватало... А бластер?! Уж не собираетесь ли вы отправить меня в этот космический лабиринт без бластера?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/engineer.jpg" class="img-avatar" alt="Инженер">
                </div>
              </div>
              <div>
                <small class="text-muted">Инженер</small>
              </div>
              <div>
                <p>Бластер взять можно, он легкий. Но не более одного заряда! Иначе произойдет детонация, и вы прибудете на место в разобранном виде... Впрочем, и это важно лишь при старте с Земли. Если в Веренице Миров вам попадутся заряды — берите хоть сотню...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Восхитительная перспектива! Добывать заряды для боевого линейного излучателя в Мире Развеселых Тараканов... или как их там — Дружелюбных Тарантулов.</p>
                <p>Хуже всего с приборами. Оказывается, они не выдерживают Перехода и начинают барахлить. Единственное устройство, которое ученые сумели защитить от пагубного воздействия Ворот, — это наглухо запаянный на руке металлический браслет. Он выполняет три функции. Во-первых, это автопереводчик. Вы сможете общаться с любым разумным существом в Веренице Миров. Во-вторых, с помощью браслета вы будете поддерживать телепатическую связь с Клушей. Достаточно отдать мысленный приказ — и в мозгу зазвучит знакомый хрипловатый голос с въедливыми интонациями... Есть на браслете и маленький черный глазок. Если он замигает красным — значит, где-то поблизости аннигилятор, а при нем, надо полагать, и похититель...</p>
                <p>Вы скептически оглядываете легкий пластиковый рюкзак темно-синего цвета. В нем могли бы поместиться шесть предметов, но вредные ученые столько взять не позволяют. Вам предлагают на выбор одну из трех вещей, примерно равных по массе: инфракрасные очки «Ночное зрение», зажигалку или тюбик питательной пасты, которая в любой момент восстановит ваши силы до первоначального уровня (увы, пасты хватит лишь на один прием). Кроме того, у вашего пояса — обычное оружие исследователей Вереницы Миров: длинный, похожий на палаш, нож, прочный, легкий, с рукоятью из пластиката.</p>
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/engineer.jpg" class="img-avatar" alt="Инженер">
                </div>
              </div>
              <div>
                <small class="text-muted">Инженер</small>
              </div>
              <div>
                <p>Хорошо, что не нужен защитный скафандр, <span class="grey--text text--lighten-2">— говорит инженер деловито.</span> — На всех планетах атмосфера сходна с земной... кстати, у большинства обитателей Вереницы Миров и метаболизм близок к земному.</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/player.jpeg" class="img-avatar" alt="Майор">
                </div>
              </div>
              <div>
                <small class="text-muted">Майор</small>
              </div>
              <div>
                <p>Это означает, что если какая-нибудь местная зверюга сожрет меня, то у нее не будет болеть живот?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/engineer.jpg" class="img-avatar" alt="Инженер">
                </div>
              </div>
              <div>
                <small class="text-muted">Инженер</small>
              </div>
              <div>
                <p>Вот именно, <em>— невозмутимо отвечает инженер. —</em> Но многих из этих зверюг и вы сможете... э-э... употребить в пищу... Сведения о Мирах будете получать от КЛУ-6. <em>— Инженер оборачивается к лаборанту. —</em> Введены ли данные в память установки?</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/img/avatars/6.jpg" class="img-avatar" alt="Лаборант">
                </div>
              </div>
              <div>
                <small class="text-muted">Лаборант</small>
              </div>
              <div>
                <p>Так точно, введены! <em>— четко отвечает лаборант и вдруг, не выдержав, фыркает: —</em> Послушайте, майор, как вы можете работать с такой занудой? К тому же у нее блок эмоций начисто забивает логические центры!</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img src="/static/avatar/engineer.jpg" class="img-avatar" alt="Инженер">
                </div>
              </div>
              <div>
                <small class="text-muted">Инженер</small>
              </div>
              <div>
                <p>Полегче! <em>— обрывает подчиненного инженер. —</em> Клушу проектировал я сам, еще в молодости...</p>
                <br />
                <br />
              </div>
            </div>

            <div class="message">
              <div>
                <p>Вы с трудом сдерживаетесь, чтобы не спросить инженера: а нельзя ли что-нибудь у Клуши развинтить, чтоб не была такой болтливой?..</p>
                <p>Наконец сборы окончены — пора стартовать.</p>
                <br />
              </div>
            </div>

          </div>
          <b-card-footer>
            <b-button class="w-100" @click="starting = true"><i class="icon-control-play"></i> Начать игру</b-button>
          </b-card-footer>
        </b-card>

      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      starting: null,
      items: [
        this.$store.state.items.glasses,
        this.$store.state.items.lighter,
        this.$store.state.items.tube
      ]
    }
  },
  methods: {
    selectItem: function (item) {
      console.log(item)
      this.starting = false
      this.$store.commit('getItem', item)
      this.$router.push('/chapter/1')
    }
  }
}
</script>
