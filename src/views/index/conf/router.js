const indexRouter = [{
  path: '/index',
  name: 'Index',
  component: () => import( /* webpackChunkName: "index" */ '@/views/index/index.vue'),
  meta: {
    keepAlive: false
  },
  title: '登录'
},
{
  path: '/details',
  name: 'details',
  component: () => import( /* webpackChunkName: "index" */ '@/views/index/details.vue'),
  meta: {
    keepAlive: false
  },
  title: '学生信息详情页'
}
];

export default indexRouter;