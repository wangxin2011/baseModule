
import storage from '@/utils/localstorage'
const getters = {
  code: state => state.app.code,
  topGroupId: state => state.app.topGroupId,
  token: (state) => state.app.token,
  userInfo: (state) => state.app.userinfo,
  classRefresh: state => state.monitor.classRefresh,  // 班级统计是否刷新
  schoolRefresh: state => state.monitor.schoolRefresh,  // 学校统计是否刷新
  countyRefresh: state => state.monitor.countyRefresh, // 区县统计是否刷新
  cityRefresh: state => state.monitor.cityRefresh, // 市管理员统计是否刷新
  classAuditRefresh: state => state.monitor.classAuditRefresh,  // 班级审核是否刷新
  getClockDataList: (state) => (key, key2) => {
    // const _date = new Date();
    let _object = storage.read("SET_CLOCK_DATALIST" + key);
    // let _time =  _date.getFullYear()+''+_date.getMonth()+''+_date.getDate();
    let _list = {};
    if(!_object){
      // 新的缓存没有数据，取老缓存数据
      _object = storage.read("SET_CLOCK_DATALIST" + key2);
      _list = _object || {};
    }else if(_object){
      _list = _object.list || {};
    }
    return _list;
  }
}
export default getters
