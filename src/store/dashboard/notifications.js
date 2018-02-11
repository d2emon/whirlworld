var notificationList = [
  { icon: 'icon-user-follow text-success', text: 'Новый пользователь' },
  { icon: 'icon-user-unfollow text-danger', text: 'Пользователь удален' },
  { icon: 'icon-chart text-info', text: 'Отчет о продажам готов' },
  { icon: 'icon-basket-loaded text-primary', text: 'Новый клиент' },
  { icon: 'icon-speedometer text-warning', text: 'Сервер перегружен' }
]

var notificationCount = Math.floor(Math.random() * 15)
var notifications = []
for (var i = 0; i < notificationCount; i++) {
  let notificationId = Math.floor(Math.random() * notificationList.length)
  notifications.push(notificationList[notificationId])
}

export default {
  notifications: notifications
}
