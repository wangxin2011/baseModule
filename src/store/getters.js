
const getters = {
  code: state => state.login.code, // 微信code
  openid: state => state.login.openid, // 微信openid
  token: (state) => state.login.token, // 登录token
  userInfo: (state) => state.login.userinfo, // 用户信息
  currentUser: (state) => state.login.currentUser, // 当前指定用户信息
  account: (state) => state.login.account // 账号信息，找回账号使用，刷新后无效
}
export default getters
