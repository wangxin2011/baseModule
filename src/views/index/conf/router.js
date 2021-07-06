
const indexRouter = [{
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */'@/views/index/index.vue'),
    meta: {
      keepAlive: false
    }
}];

export default indexRouter;