import Vue from 'vue'
import VueRouter from 'vue-router'

// 通过require.context读取pages文件夹下的router.js
const allRouterFiles = require.context("../views", true, /\.js$/);
var allRouterList = [];
allRouterFiles.keys().forEach(key => {
  // 如果是conf文件夹下的router.js
  if (key.indexOf("/conf/router.js") != -1) {
    let option = allRouterFiles(key).default;
    // 拼接所有的router到allRouterList
    allRouterList = allRouterList.concat(option || []);
  }
});

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "auth"
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "index" */'../views/index/auth.vue'),
    meta: {
      keepAlive: false
    }
  }
].concat(allRouterList)
console.log(allRouterList)
const router = new VueRouter({
  routes
})

export default router
