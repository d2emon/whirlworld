var item = {
  avatar: '',
  short: '',
  title: '',
  description: '',
  noBag: false,
  lowercase: function () {
    if (!this.description) return ''

    return this.description[0].toLowerCase() + this.description.substring(1)
  }
}

export default {
  fan: {
    __proto__: item,
    title: 'Веер',
    short: 'Веер',
    description: 'Изящный веер на резной ручке.'
  },
  flask: {
    __proto__: item,
    title: 'Фляжка',
    short: 'Фляжка',
    noBag: true,
    description: 'Покрытый узорами серебряный сосудик на цепочке. ' +
      'Судя по легкому аромату, здесь когда-то хранились духи.',
    full: 'Кстати, серебряный сосуд можно использовать как фляжку. В него ' +
        'поместится всего 2 глотка воды, но каждый глоток в пути увеличит ' +
        'вашу СИЛУ на 2. (Правда, воду предстоит еще найти.) Класть фляжку ' +
        'в рюкзак не стоит — удобнее прикрепить цепочку к поясу.'
  }
}
