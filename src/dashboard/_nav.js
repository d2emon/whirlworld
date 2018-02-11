export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dash/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Colors',
      url: '/dash/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Typography',
      url: '/dash/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Components',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/dash/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/dash/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Carousels',
          url: '/dash/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Collapses',
          url: '/dash/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/dash/base/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Jumbotrons',
          url: '/dash/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'List Groups',
          url: '/dash/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navs',
          url: '/dash/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Paginations',
          url: '/dash/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Popovers',
          url: '/dash/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Progress Bars',
          url: '/dash/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/dash/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/dash/base/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tooltips',
          url: '/dash/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/dash/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Standard Buttons',
          url: '/dash/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Groups',
          url: '/dash/buttons/button-groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Dropdowns',
          url: '/dash/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Social Buttons',
          url: '/dash/buttons/social-buttons',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Editors',
      url: '/dash/editors',
      icon: 'fa fa-code',
      children: [
        {
          name: 'Alerts',
          url: '/dash/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/dash/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/dash/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Forms',
      url: '/dash/forms',
      icon: 'icon-note',
      children: [
        {
          name: 'Alerts',
          url: '/dash/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/dash/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/dash/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Google Maps',
      url: '/dash/maps',
      icon: 'icon-map',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Icons',
      url: '/dash/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'Flags',
          url: '/dash/icons/flags',
          icon: 'icon-star',
          badge: {
            variant: 'success',
            text: 'NEW'
          }
        },
        {
          name: 'Font Awesome',
          url: '/dash/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/dash/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/dash/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/dash/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/dash/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/dash/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Tables',
      url: '/dash/tables',
      icon: 'icon-list'
    },
    {
      name: 'Widgets',
      url: '/dash/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'danger',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'UI Kits',
      url: '/ui-kits',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      title: true,
      name: 'Labels'
    },
    {
      label: { variant: 'danger' },
      url: '#',
      name: 'Label danger'
    },
    {
      label: { variant: 'info' },
      url: '#',
      name: 'Label info'
    },
    {
      label: { variant: 'warning' },
      url: '#',
      name: 'Label warning'
    }
  ]
}
