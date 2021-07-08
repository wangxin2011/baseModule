import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = to.meta.title || '数据治理';
  const whiteList = ['/', '/auth'] // no redirect whitelist
  let _openid = store.state.login.openid;
  console.log("openid:"+_openid)
  if(whiteList.indexOf(to.path) == -1 && !_openid){
    next({ path: '/' })
  } else {
    next()
  }
})

