import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "index"
  },
  // {
  //   path: '/getopenid',
  //   name: 'getOpenid',
  //   component: () => import(/* webpackChunkName: "index" */'../views/index/getOpenid.vue'),
  //   meta: {
  //     keepAlive: false
  //   }
  // },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */'../views/index/index.vue'),
    meta: {
      keepAlive: false
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
