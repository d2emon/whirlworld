<template>
    <v-layout row>
      <v-flex xs10>
        <v-fab-transition>
          <v-tooltip left>
            <v-btn
              color="primary"
              dark
              fab
              fixed
              bottom
              right
              slot="activator"
              @click.stop="starting = true"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
            <span>Начать игру</span>
          </v-tooltip>
        </v-fab-transition>

        <v-dialog v-model="starting" max-width="500px">
          <v-card>
            <v-card-title>
              Начало игры
            </v-card-title>
            <v-card-text>
              <p>Вам предлагают на выбор одну из трех вещей, примерно равных по массе:</p>
            </v-card-text>
            <v-card-actions>
              <v-tooltip bottom v-for="(i, id) in items" :key="id">
                <v-btn color="primary" dark @click.stop="selectItem(i)" slot="activator">{{ i.short }}</v-btn>
                <h1>{{ i.title }}</h1>
                <div v-if="i.description">{{ i.description }}</div>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card>
          <v-list three-line>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/secretar.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Входите, майор, шеф ждет вас. Опять неприятности в Лаборатории Мерфи.<br>
                  <em class="grey--text text--lighten-2">Голос секретарши шефа подозрительно мягок — значит, вас ждет особо опасное задание. А тут еще упоминание о Лаборатории Мерфи...</em>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              Ох, и попортил же вам крови этот громадный — как два хороших города — научно-исследовательский центр! Там есть всё: гениальнейшие ученые, исполнительнейшие лаборанты, современнейшее исследовательское оборудование, умнейшие компьютеры, океан энергии... Нет там только одного — порядка. Не было, нет и никогда не будет!..
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Опять Лаборатория? <em class="grey--text text--lighten-2">— спрашиваете вы, входя в кабинет.</em>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Там произошла кража, <em class="grey--text text--lighten-2">— морщится шеф.</em>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  И когда у них все будет тихо-мирно! Почему бы им не изобрести что-нибудь такое, чтобы избавиться от неприятностей и оставить в покое Патруль и полицию?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Нет уж, лучше не надо! Они уже пробовали! Помнишь Супермозг, сынок?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              Еще бы! Такое не забывается. Супермозг, компьютер последнего поколения, немыслимой сложности устройство, был в порядке испытания брошен на административное руководство Лабораторией Мерфи. Сложность его и подвела. Супермозг перехватил обрывок трансляции художественного фильма (это был фантастический боевик), принял его как руководство к действию и объявил войну Лунной Обсерватории. Очень много шуму было. Вы как раз все это и расхлебывали...
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Но какое отношение Патруль имеет к краже? А полиция за что деньги получает?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Ты не спросил, что похищено, сынок. Опытный образец бета-аннигилятора. Кошмарная штуковина. Размером с рюкзачок, а сумеет превратить в ослепительную вспышку большой остров. А если по этому образцу построить приборчик покрупнее, можно пускать на распыл планеты...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Но почему все-таки с этим не может разобраться полиция? Или они уже не расследуют дел серьезнее, чем угон летающих велосипедов от школьной стоянки?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  По двум причинам, сынок. Во-первых, удалось установить, что ворюга работает на Паука. Помнишь пиратского босса, которого ты брал на внешнем кольце Сатурна? Он потом с каторги удрал... Так что это наше дело и наш клиент. Во-вторых, негодяй исчез в Веренице Миров. Он сейчас где угодно, но не на Земле.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  <em class="grey--text text--lighten-2">Вы опускаетесь в кресло, поняв, что от задания не отбрыкаться.</em><br>
                  Все, сэр, сдаюсь и готов слушать. Сначала о клиенте...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Дэвид Бронсон. Всё.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Как это — всё?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Перед тем как исчезнуть, Бронсон стер в компьютерной памяти все данные о себе. Работал он в группе, изучающей Вереницу Миров. Там сотрудники какие-то чокнутые, ничего не замечают, кроме своих записей и приборов. Возраст похитителя, рост, цвет волос, цвет глаз — все по-разному описывают. Дружно сходятся лишь в одном: у Бронсона были совершенно потрясающие уши! Как у слона! Да, вот еще: украденный прибор находится в обычном пластиковом рюкзаке лилового цвета...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Исчерпывающее описание, шеф. Остается протянуть руку и схватить вора за шиворот... теперь слушаю про Вереницу Миров.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Это система мгновенного межпространственного перемещения. По какому принципу действует — не спрашивай. Я этого не пойму, даже если весь персонал Лаборатории Мерфи хором начнет объяснять. Какие-то Ворота: входишь здесь, а выходишь на другой планете. Причем где эта планета находится — пока не известно. Может, вообще не в нашей Вселенной. А может, в ближайшей солнечной системе. Поэтому все планеты, куда можно таким образом попасть, носят условные названия, например... — Шеф скашивает взгляд в записи. — ...Мир Лиловых Зорь, Мир Легенд, Мир Дружелюбных Тарантулов, Мир Камней, Мир Сновидений, Мир Роботов, Мир Грозных Призраков, Мир Стрекоз, Мир Мертвых Морей... всего девятнадцать миров. В каждом инженеры Лаборатории Мерфи установили Ворота Связи — для перехода в иные миры. Увы, Ворота подчиняются лишь одному закону — закону Мерфи. Они зашвырнут вас туда, куда сами сочтут нужным. Есть и еще одно осложнение. Карты исследованных земель с обозначенными на них Воротами наш мерзавец Бронсон предусмотрительно захватил с собой...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Поправьте меня, сэр, если я неправильно вас понял. Мне предстоит попасть на малоисследованную планету, причем в неизвестно какую ее точку; выяснить, не ли там человека, о котором известно лишь, что у него большие уши, а за плечами лиловый рюкзак; после чего перейти в другой мир и продолжить поиски. Так? О таком задании я мечтал всю жизнь! Перерыть от полюса до полюса девятнадцать планет!..
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Не преувеличивай, сынок. Конечно, это задание повышенной паршивости, но Ворота — устройство с ограниченным радиусом действия, так что «от полюса до полюса» — это ты зря... К тому же Ворота обладают некоей, условно говоря, «памятью», и высока вероятность того, что они забросят тебя туда же, куда перед этим забросили твоего противника. Если, конечно, не вмешается закон Мерфи...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  А возвращение? Как вернуться на Землю?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  О, с этим проще! Существует силовое устройство, способное выдернуть путешественника из любого Мира и вернуть на Землю.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Тогда почему бы не воспользоваться им, чтобы вернуть беглеца?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Увы, устройство сейчас... как бы это сказать...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Неисправно? <em class="grey--text text--lighten-2">— догадываетесь вы.</em>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Дорабатывается, <em class="grey--text text--lighten-2">— дипломатично говорит шеф. —</em>  Через полгода будет в полном порядке.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              Полгода! За полгода Бронсон успеет связаться с Пауком — наверняка у них это продумано заранее. И, если вы хоть что-то понимаете в пиратской душе, через полгода Паук станет повелителем Галактики...
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Шеф, <em class="grey--text text--lighten-2">— кротко интересуетесь вы, —</em> не слишком ли это простое поручение? Не мало ли неприятностей на мою голову?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Угадал! <em class="grey--text text--lighten-2">— вздыхает шеф. —</em> В Вереницу Миров прорвался кое-кто еще...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              Экран над столом вспыхивает, на нем появляется лицо симпатичной кареглазой девушки с задорно вздернутым носиком и коротко остриженными каштановыми волосами.
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Мэри Коуфорд... Да-да, дочь того самого Дэна Коуфорда, что прежде был знаменитым пиратом, а теперь стал богатейшим из вольных торговцев. Хотел бы я знать, как он раздобыл помилование за былые похождения... Дочка вся в папашу. Авантюристка до мозга костей. Ненавидит Паука и всегда рада подставить ему подножку. Отличная актриса. Знает дзюдо, умело владеет чуть ли не всеми видами оружия. В случае необходимости сумеет поднять звездолет, а возможно, и проложить для него курс. Девятнадцать лет... Не хмыкай, она опасна, как пантера!
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Шеф, может быть, вы и невысокого мнения обо мне лично, но уж команда-то моя как-нибудь справится с девятнадцатилетней девчонкой!
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  А вот это — последний сюрприз. Ты идешь на задание один. Ворота не выдержат такой нагрузки — перебрасывать всю команду. Оставишь здесь и стажеров с Плутона, и своего любимого пса-мутанта, и даже, представь себе, Клушу!
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Это и в самом деле удар! КЛУ-6, криминалистическая лабораторная установка, шестая модель... Ваш личный робот, верный соратник и незаменимый помощник!.. Правда, Клуша зачастую занудна, болтлива, чересчур заботлива, но сколько раз она спасала вас от провала операции, а то и от смерти...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Не переживай, сынок. Клуша будет связана с тобой телепатически. Подробности сообщит инженер, отвечающий за Ворота. Все, инструктаж окончен.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/boss.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  <em class="grey--text text--lighten-2">Встав, шеф добавляет официально:</em><br>
                  Возвращайтесь с победой, майор!
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-card>
              <v-card-text>
              Как же, вернешься тут с победой! Инженер, собирающий вас в дорогу, больше всего озабочен тем, чтобы вы взяли с собою как можно меньше вещей. Даже форменную бляху Патруля вам велели снять с пояса — при Переходе важен каждый грамм.
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/engineer.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Это лишь при старте с Земли, <span class="grey--text text--lighten-2">— утешает вас инженер. —</span> В следующих Воротах можете тащить за собой хоть тушу мамонта.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                Только мамонта мне и не хватало... А бластер?! Уж не собираетесь ли вы отправить меня в этот космический лабиринт без бластера?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/engineer.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                Бластер взять можно, он легкий. Но не более одного заряда! Иначе произойдет детонация, и вы прибудете на место в разобранном виде... Впрочем, и это важно лишь при старте с Земли. Если в Веренице Миров вам попадутся заряды — берите хоть сотню...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              <p>Восхитительная перспектива! Добывать заряды для боевого линейного излучателя в Мире Развеселых Тараканов... или как их там — Дружелюбных Тарантулов.</p>
              <p>Хуже всего с приборами. Оказывается, они не выдерживают Перехода и начинают барахлить. Единственное устройство, которое ученые сумели защитить от пагубного воздействия Ворот, — это наглухо запаянный на руке металлический браслет. Он выполняет три функции. Во-первых, это автопереводчик. Вы сможете общаться с любым разумным существом в Веренице Миров. Во-вторых, с помощью браслета вы будете поддерживать телепатическую связь с Клушей. Достаточно отдать мысленный приказ — и в мозгу зазвучит знакомый хрипловатый голос с въедливыми интонациями... Есть на браслете и маленький черный глазок. Если он замигает красным — значит, где-то поблизости аннигилятор, а при нем, надо полагать, и похититель...</p>
              <p>Вы скептически оглядываете легкий пластиковый рюкзак темно-синего цвета. В нем могли бы поместиться шесть предметов, но вредные ученые столько взять не позволяют. Вам предлагают на выбор одну из трех вещей, примерно равных по массе: инфракрасные очки «Ночное зрение», зажигалку или тюбик питательной пасты, которая в любой момент восстановит ваши силы до первоначального уровня (увы, пасты хватит лишь на один прием). Кроме того, у вашего пояса — обычное оружие исследователей Вереницы Миров: длинный, похожий на палаш, нож, прочный, легкий, с рукоятью из пластиката.</p>
              </v-card-text>
            </v-card>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/engineer.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Хорошо, что не нужен защитный скафандр, <span class="grey--text text--lighten-2">— говорит инженер деловито.</span> — На всех планетах атмосфера сходна с земной... кстати, у большинства обитателей Вереницы Миров и метаболизм близок к земному.
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/player.jpeg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Это означает, что если какая-нибудь местная зверюга сожрет меня, то у нее не будет болеть живот?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/engineer.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Вот именно, <em class="grey--text text--lighten-2">— невозмутимо отвечает инженер. —</em> Но многих из этих зверюг и вы сможете... э-э... употребить в пищу... Сведения о Мирах будете получать от КЛУ-6. <em class="grey--text text--lighten-2">— Инженер оборачивается к лаборанту. —</em> Введены ли данные в память установки?
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/logo.png">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Так точно, введены! <em class="grey--text text--lighten-2">— четко отвечает лаборант и вдруг, не выдержав, фыркает: —</em> Послушайте, майор, как вы можете работать с такой занудой? К тому же у нее блок эмоций начисто забивает логические центры!
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/avatar/engineer.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  Полегче! <em class="grey--text text--lighten-2">— обрывает подчиненного инженер. —</em> Клушу проектировал я сам, еще в молодости...
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-card class="ma-4">
              <v-card-text>
              <p>Вы с трудом сдерживаетесь, чтобы не спросить инженера: а нельзя ли что-нибудь у Клуши развинтить, чтоб не была такой болтливой?..</p>
              <p>Наконец сборы окончены — пора стартовать.</p>
              </v-card-text>
            </v-card>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import items from '../store/chapters/items.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      starting: null,
      items: [
        items.glasses,
        items.lighter,
        items.tube
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    selectItem: function (item) {
      console.log(item)
      this.starting = false
      this.$emit('get_item', item)
      this.$router.push('/chapter/1')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
