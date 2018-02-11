import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Dash from '@/dashboard/containers/Dash'

// Views
import Start from '@/views/Start'
import Chapter from '@/views/Chapter'

import Dashboard from '@/dashboard/views/Dashboard'

import Colors from '@/dashboard/views/theme/Colors'
import Typography from '@/dashboard/views/theme/Typography'

import Widgets from '@/dashboard/views/Widgets'

// Views - Components
import Cards from '@/dashboard/views/base/Cards'
import Forms from '@/dashboard/views/base/Forms'
import Switches from '@/dashboard/views/base/Switches'
import Tables from '@/dashboard/views/base/Tables'
import Breadcrumbs from '@/dashboard/views/base/Breadcrumbs'
import Carousels from '@/dashboard/views/base/Carousels'
import Collapses from '@/dashboard/views/base/Collapses'
import Jumbotrons from '@/dashboard/views/base/Jumbotrons'
import ListGroups from '@/dashboard/views/base/ListGroups'
import Navs from '@/dashboard/views/base/Navs'
import Navbars from '@/dashboard/views/base/Navbars'
import Paginations from '@/dashboard/views/base/Paginations'
import Popovers from '@/dashboard/views/base/Popovers'
import ProgressBars from '@/dashboard/views/base/ProgressBars'
import Tooltips from '@/dashboard/views/base/Tooltips'

// Views - Buttons
import StandardButtons from '@/dashboard/views/buttons/StandardButtons'
import ButtonGroups from '@/dashboard/views/buttons/ButtonGroups'
import Dropdowns from '@/dashboard/views/buttons/Dropdowns'
import SocialButtons from '@/dashboard/views/buttons/SocialButtons'

// Views - Icons
import Flags from '@/dashboard/views/icons/Flags'
import FontAwesome from '@/dashboard/views/icons/FontAwesome'
import SimpleLineIcons from '@/dashboard/views/icons/SimpleLineIcons'

// Views - Notifications
import Alerts from '@/dashboard/views/notifications/Alerts'
import Badges from '@/dashboard/views/notifications/Badges'
import Modals from '@/dashboard/views/notifications/Modals'

// Views - Pages
import Page404 from '@/dashboard/views/pages/Page404'
import Page500 from '@/dashboard/views/pages/Page500'
import Login from '@/dashboard/views/pages/Login'
import Register from '@/dashboard/views/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/start',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'start',
          name: 'Start',
          component: Start
        },
        {
          path: 'chapter/:id',
          name: 'Chapter',
          component: Chapter
        }
      ]
    },
    {
      path: '/dash',
      redirect: '/dash/dashboard',
      name: 'Dash',
      component: Dash,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/dash/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'base',
          redirect: '/dash/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/dash/buttons/buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'social-buttons',
              name: 'Social Buttons',
              component: SocialButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/dash/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/dash/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
