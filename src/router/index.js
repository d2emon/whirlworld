import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Start from '@/views/Start'
import Chapter from '@/views/Chapter'

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
    }
  ]
})
