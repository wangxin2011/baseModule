
const loginRouter = [{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */'@/views/login/login.vue'),
    meta: {
      keepAlive: false,
      title: '登录'
    }
},{
  path: '/resetpwd',
  name: 'ResetPwd',
  component: () => import(/* webpackChunkName: "index" */'@/views/login/resetPwd.vue'),
  meta: {
    keepAlive: false,
    title: '重置密码'
  }
},{
  path: '/retrieve',
  name: 'RetrieveAccount',
  component: () => import(/* webpackChunkName: "index" */'@/views/login/retrieveAccount.vue'),
  meta: {
    keepAlive: false,
    title: '找回账号'
  }
}];

export default loginRouter;