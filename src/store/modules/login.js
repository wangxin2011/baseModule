import storage from '@/utils/localstorage'
import { Encrypt } from '@/utils/validate.js';
import { getUserInfoByCode } from '@/views/login/conf/api'
import { getUrlKey, formatDate } from '@/utils/util.js'
import { login, resetPwd, sendSms, retrieveAccount } from '@/views/login/conf/api'

const state = {
    token: storage.read('token'),  // 存储微信token
    code: '',     // 微信给过来的code
    openid: storage.read('wxOpenid'),     // 用户Openid
    userinfo: '', // 用户信息
    currentUser: storage.read('current_user'), // 当前用户
    account: '', // 账号
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        storage.write('token', token);
    },
    SET_CODE: (state) => {
        const _code= (getUrlKey('openid') || getUrlKey('code'));
        state.code= _code;
    },
    SET_CURRENTUSER: (state, user) => {
        state.currentUser = user;
        storage.write('current_user', user);
    },
    SET_USERINFO: (state, userinfo) => {
        state.userinfo = userinfo;
        let _curUser = null;
        if(userinfo && userinfo.accounts && userinfo.accounts.length > 0){
           let _filterItem = userinfo.accounts.filter((item) => {
                return item['isDefault'];
            })
            if(_filterItem.length == 0){
                // 如果为设置当前用户，则取第一个
                _curUser = userinfo.accounts[0];
            }else{
                _curUser = _filterItem[0];
            }
        }
        state.currentUser = _curUser;
        storage.write('current_user', _curUser);
        storage.write('userinfo', userinfo);
    },
    SET_OPENID: (state, openid) => {
        state.openid= openid;
        storage.write('wxOpenid', openid);
    },
    SET_ACCOUNT: (state, account) => {
        state.account= account;
    }
}

const actions = {
    // 通过微信code获取用户信息
    getUserInfoByToken({ commit, state }) {
        // const _code=  getUrlKey('code') || '021BbgM72mNMZL0Xf7I72OTVL72BbgMG1';
        const _code= state.code || storage.read('code');
        return new Promise((resolve, reject) => {
            // 获取token
            getUserInfoByCode({Code:_code}).then(response => {
                // response = {"data":{"sstoken":"12545265458","openid":"4562365874","accounts":[{"uid":"1","account":"zhangsan","uname":"张三","uerType":3, "isDefault": true},{"uid":"2","account":"zhangsan2","uname":"张三","uerType":3, "isDefault": false}]}};
                response = {"data":{"sstoken":"12545265458","openid":"4562365874","accounts":[]}};
                if(response && response.data && response.data.sstoken){
                    // 获取数据正常
                    let _data= response.data;
                    setUserLocalstore(commit, _data);
                    resolve(_data)
                } else {
                    // 获取数据为空
                    resolve()
                    setUserLocalstore(commit, "");
                    // commit('SET_USERINFO','');
                }
                
            }).catch(error => {
                resolve()
                setUserLocalstore(commit, "");
            })
        });
    },
    // 使用账号密码进行登录绑定
    doLogin({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            // 加密密码
            param.password = Encrypt(param.password, true).toString();
            // login(param).then(response => {
                let response = {data: {"uid":"1","account":"zhangsan","uname":"张三","uerType":3, "isDefault": true, "sstoken":"12345678910",}}
                if(response && response.data && response.data.sstoken){
                    // 绑定成功
                    let _data= response.data;
                    // 保存用户信息
                    // 获取用户信息
                    let _userinfo = state.userinfo || {};
                    _userinfo.sstoken = _data.sstoken;
                    _userinfo.accounts= [_data]
                    setUserLocalstore(commit, _userinfo);
                    resolve(_data)
                } else {
                    // 绑定失败
                    reject()
                }
                
            // }).catch(error => {
            //     reject()
            // })
        });
    },
    // 重置密码
    doResetPwd({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            // 加密密码
            param.password = Encrypt(param.password, true).toString();
            let _param = {};
            Object.assign(_param, param);
            // 移除确认密码
            delete _param.aginPassword;
            // resetPwd(_param).then(response => {
                let response = {data: {"uid":"1","account":"zhangsan","uname":"张三","uerType":3, "isDefault": true, "sstoken":"12345678910",}}
                if(response && response.data){
                    // 重置密码成功
                    resolve(response.data)
                } else {
                    // 绑定失败
                    reject()
                }
            // }).catch(error => {
            //     reject()
            // })
        });
    },
    // 发送短信
    doSendSms({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            // sendSms(_param).then(response => {
                let response = {data: {"uid":"1","account":"zhangsan","uname":"张三","uerType":3, "isDefault": true, "sstoken":"12345678910",}}
                if(response && response.data){
                    // 重置密码成功
                    resolve(response.data)
                } else {
                    // 绑定失败
                    reject()
                }
                
            // }).catch(error => {
            //     reject()
            // })
        });
    },
     // 找回账号
     doRetrieveAccount({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            // retrieveAccount(_param).then(response => {
                let response = {data: {"uid":"1","account":"zhangsan","uname":"张三","uerType":3, "isDefault": true, "sstoken":"12345678910",}}
                if(response && response.data){
                    // 重置密码成功
                    resolve(response.data)
                } else {
                    // 绑定失败
                    reject()
                }
                
            // }).catch(error => {
            //     reject()
            // })
        });
    },
     // 刷新token
    //  refreshToken({ commit, state }){
    //     return new Promise((resolve, reject) => {
    //         // 刷新token
    //         refreshToken().then(resp => { 
    //             // 获取用户数据
    //             if(resp.Code == 1){
    //                 let _token= resp.token;
    //                 let _userinfo= state.userinfo || {};
    //                 _userinfo.F_Token= _token;
    //                 commit('SET_USERINFO',_userinfo);
    //                 resolve(_userinfo)
    //             }else {
    //                 resolve();
    //                 commit('SET_USERINFO','');
    //             }
    //         }).catch(error => {
    //             resolve()
    //             commit('SET_USERINFO','');
    //         })
    //     });
    // },
    setUserInfo({ commit, state },userinfo) {
        commit('SET_USERINFO',userinfo);
    },
    setToken({ commit, state },token) {
        commit('SET_TOKEN',token);
    },
    // 设置微信openid
    setOpenId({ commit, state }, openid) {
        commit('SET_OPENID', openid);
    },
    // 设置微信code
    setWXCode({ commit, state }) {
        commit('SET_CODE');
    },
    clearUserStore({ commit, state }){
        commit('SET_USERINFO','');
    },
    clearStore({ commit, state }){
        commit('SET_USERINFO','');
        commit('SET_TOKEN','');
    }
}
// 设置用户信息缓存
function setUserLocalstore(commit, data){
    if(commit){
        // 存储用户信息
        commit('SET_USERINFO', data);
        let _openid = '';
        let _token = '';
        if(data){
            _openid = data.openid || '';
            _token = data.sstoken || '';
        }
        // 存储openid
        commit('SET_TOKEN', _openid);
        // 存储token
        commit('SET_OPENID', _token);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
