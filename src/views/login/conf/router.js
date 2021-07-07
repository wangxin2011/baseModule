
const loginRouter = [{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */'@/views/login/login.vue'),
    meta: {
      keepAlive: false,
      title: '登录'
    }
}];

export default loginRouter;