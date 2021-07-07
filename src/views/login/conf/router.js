
const loginRouter = [{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */'@/views/login/login.vue'),
    meta: {
      keepAlive: false
    }
}];

export default loginRouter;