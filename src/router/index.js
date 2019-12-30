import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import TemplateList from '@/components/TemplateList'
import TemplateTask from '@/components/TemplateTask'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/list*',
      name: 'TemplateList',
      component: TemplateList
    },
    {
      path: '/task*',
      name: 'TemplateTask',
      component: TemplateTask
    },
    {
      path: '/',
      name: 'ListView',
      component: ListView
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }




})

// router.beforeRouteUpdate((to, from, next) => {
//   const id = to.params.id
//   this.AJAXRequest(id)
//   next()
// })


export default router
