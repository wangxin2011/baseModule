import storage from '@/utils/localstorage'
import CryptoJS from "crypto-js";
import { Encrypt } from '@/utils/validate.js';
import { getUrlKey, formatDate } from '@/utils/util.js'
import { getToken, getUserInfo, refreshToken } from '@/api/wx.js'
import { getUserInfoByCode } from '@/views/index/conf/api'
import { getConfig } from '@/api/base.js'
const state = {
    token: storage.read('token'),  // 存储微信token
    code: '',     // 微信给过来的code
    statlabel:'',
    openid: storage.read('wxOpenid'),     // 用户Openid
    userinfo: '', // 用户信息
    config: null // 配置信息
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
    SET_TOPGROUPID: (state, topGroupId) => {
        state.topGroupId = topGroupId;
        storage.write('topGroupId', topGroupId);
    },
    SET_USERINFO: (state, userinfo) => {
        state.userinfo = userinfo;
        let _top='';
        if(userinfo && userinfo.F_TopGroupId){
            _top= userinfo.F_TopGroupId;
        }
        state.topGroupId = _top;
        storage.write('topGroupId', _top);
        storage.write('userinfo', userinfo);
    },
    SET_OOPENID: (state, openid) => {
        state.openid= openid;
        storage.write('wxOpenid', openid);
    },
    SET_CONFIG: (state, config) => {
        state.config = config
    }
}

const actions = {
     // 获取用户信息
     getUserInfo({ commit, state }) {
        const _token=  state.token || storage.read('token');
        return new Promise((resolve, reject) => {
            if(_token){
                // 用户信息不存在
                // 获取用户数据
                 getUserInfo({Code:  _token.openid}).then(resp => {
                    if(resp.Code == 1){
                        let _data= resp.Data;
                        commit('SET_USERINFO',_data);
                        resolve(_data)
                    }else {
                        resolve()
                        commit('SET_USERINFO','');
                    }
                }).catch(() => {
                    resolve()
                    commit('SET_USERINFO','');
                })
            }else{
                resolve()
                commit('SET_USERINFO','');
            }
        });
    },
    // 微信获取用户信息
    getUserInfoByToken({ commit, state }) {
        // const _code=  getUrlKey('code') || '021BbgM72mNMZL0Xf7I72OTVL72BbgMG1';
        const _code= state.code || storage.read('code');
        return new Promise((resolve, reject) => {
            // 获取token
            getUserInfoByCode({Code:_code}).then(response => {
                response = {"data":{"sstoken":"12545265458","openid":"4562365874","accounts":[{"uid":"1","account":"zhangsan","uname":"张三","uerType":3},{"uid":"2","account":"zhangsan2","uname":"张三","uerType":3}]}};
                if(response && response.data && response.data.sstoken){
                    // 获取数据正常
                    let _data= response.data;
                    // 存储用户信息
                    commit('SET_USERINFO',_data);
                    // 存储openid
                    commit('SET_TOKEN',_data.sstoken);
                    // 存储token
                    commit('SET_OOPENID',_data.openid);
                    resolve(_data)
                } else {
                    // 获取数据为空
                    resolve()
                    commit('SET_USERINFO','');
                }
                
            }).catch(error => {
                resolve()
                commit('SET_USERINFO','');
            })
        });
    },
    // 读取配置文件
    getConfig({ commit, state }) {
        return new Promise((resolve, reject) => {
            // 获取用户数据
            getConfig().then(resp => {
                commit('SET_CONFIG',resp);
                resolve(resp)
            }).catch(() => {
               
            })
        });
    },
    // 刷新token
    refreshToken({ commit, state }){
        return new Promise((resolve, reject) => {
            // 刷新token
            refreshToken().then(resp => { 
                // 获取用户数据
                if(resp.Code == 1){
                    let _token= resp.token;
                    let _userinfo= state.userinfo || {};
                    _userinfo.F_Token= _token;
                    commit('SET_USERINFO',_userinfo);
                    resolve(_userinfo)
                }else {
                    resolve();
                    commit('SET_USERINFO','');
                }
            }).catch(error => {
                resolve()
                commit('SET_USERINFO','');
            })
        });
    },
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
