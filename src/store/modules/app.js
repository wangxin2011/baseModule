import storage from '@/utils/localstorage'
import CryptoJS from "crypto-js";
import { Encrypt } from '@/utils/validate.js';
import { getUrlKey, formatDate } from '@/utils/util.js'
import { getToken, getUserInfo, refreshToken, getUserInfoByTicket } from '@/api/wx.js'
import { getConfig } from '@/api/config.js'
const state = {
    token: storage.read('token'),  // 存储微信tocken
    code: '',     // 用户code
    zfb:'',
    zfbParam:{"appid": "",
        "auth_token": "",
        "isFrom": ""
       },  // 支付宝参数
    statlabel:'',
    openid: storage.read('openId'),     // 用户Openid
    userinfo: '', // 用户信息
    uk:'',  // 关键字为20200303，可通用
    isPlatform: 1,  // 是否为那个线:1：南昌市微信端，11：南昌市赣服通，2：新余市微信端，21：新余市赣服通端
    topGroupId: storage.read("topGroupId"),  // 注册先选择该id
    config: null // 配置信息
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        storage.write('token', token);
    },
    SET_CODE: (state, code) => {
        state.code = code;
        storage.write('token', code);
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
    SET_Openid: (state) => {
        /**
         * 请求头的中token 值的格式：{type}_{token}
         * type: 类型，1:微信公众号， 2：赣服通  
         * token:凭证，当type为1时，其值为openId，
         * 不加密；当type为2时，其值为身份证号，请用AES加密传。
         */
        /*****************支付宝接口******************** */
        // let _appid= getUrlKey('appid'), _token= getUrlKey('auth_token'),_form= getUrlKey('isFrom');
        // console.log(_appid !='' && _token !='');
        // if(_appid !='' && _token !=''){
        /*****************支付宝接口******************** */
        let _code= getUrlKey('code'), _openid= getUrlKey('openid');
        if(_code != '' || _openid != ''){
            // 默认
            const _openid=  getUrlKey('openid') || getUrlKey('code') || '';
            let _uk=  getUrlKey('uk') || '';
            const _date= formatDate(new Date());
            state.openid= _openid;
            let _md5uk= CryptoJS.MD5(_openid+_date).toString();
            if(process.env.VUE_APP_ENV === 'staging' || process.env.VUE_APP_ENV === 'stagxy' || process.env.VUE_APP_ENV === 'development'){
                _uk= _openid;
                _md5uk=_uk;
            }
            if(_uk == _md5uk){
                // 测试使用
                state.token= {openid: _openid};
            }else{
                _uk='';
            }
            if(process.env.VUE_APP_ENV == 'xinyu' || process.env.VUE_APP_ENV === 'stagxy'){
                state.isPlatform= 2;
            }else{
                state.isPlatform= 1;
            }
            state.uk = _uk;
            storage.write('openId', _openid);
        }else{
            let _token= getUrlKey('token_hanweb');
           // 支付宝
            // state.zfbParam= {"appid": (getUrlKey('appid') || 'PaCdvIHT'),
            //                 "auth_token": (getUrlKey('auth_token') || ''),
            //                 "isFrom": (getUrlKey('isFrom') || 'JXGOV')
            //             }
            state.zfbParam= {"auth_token": _token}
            const _date= formatDate(new Date());
            let _openid= state.zfbParam.auth_token;
            let _uk=  getUrlKey('uk') || '';
            let _md5uk= CryptoJS.MD5(_openid+_date).toString();
            // console.log(_md5uk);
            if(_uk == _md5uk){
                // 测试使用
                _openid= Encrypt(_openid, true).toString();
                console.log(_openid);
                state.token= {openid: _openid};
            }else{
                _uk='';
            }
            if(process.env.VUE_APP_ENV == 'xinyu' || process.env.VUE_APP_ENV === 'stagxy' || process.env.VUE_APP_ENV == 'development' ){
                state.isPlatform= 21;
            }else{
                state.isPlatform= 11;
            }
            state.uk= _uk;
            storage.write('zfbParam', state.zfbParam);
            state.openid= state.zfbParam.auth_token;
            storage.write('openId', state.openid);
        } 
        
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
        const _code=  state.openid || storage.read('openId');
        return new Promise((resolve, reject) => {
            //仅测试使用用户信息不存在
            if(state.token){
                let _token= state.token;	
                // 获取用户数据
                getUserInfo({Code: _token.openid}).then(resp => {
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
                return;
            }
            // 获取token
            getToken({Code:_code}).then(response => { 
                if(!response.errcode){  
                    response['timestamp'] = new Date().getTime();
                    commit('SET_TOKEN', response)
                    // 获取用户数据
                    getUserInfo({openid: response.openid,type: 1}).then(resp => {
                        if(resp.Code == 1){
                            let _data= resp.Data;
                            commit('SET_USERINFO',_data);
                            resolve(_data)
                        }else {
                            resolve();
                            commit('SET_USERINFO','');
                        }
                    }).catch(error => {
                        resolve();
                        commit('SET_USERINFO','');
                    })
                }else{
                    resolve("")
                    commit('SET_USERINFO','');
                }
            }).catch(error => {
                resolve()
                commit('SET_USERINFO','');
            })
        });
    },
    // 支付宝获取用户信息
    getUserInfoByZFB({ commit, state }) {
        const _zfbParam=  state.zfbParam || storage.read('zfbParam');
        return new Promise((resolve, reject) => {
            // 仅测试使用
            if(state.token && state.uk){
                let _token= state.token;
                // 获取用户数据
                getUserInfo({openid: _token.openid}).then(resp => {
                    state.zfb=resp;
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
                return;
            }
            
            getUserInfoByTicket({token: _zfbParam.auth_token}).then(res => { 
                state.zfb=res;
                if(res.result == 'true' &&  res.userdetail){  
                    let _data= res.userdetail;
                    let _opid= _data.cardid || _data.idcard;
                    if(_opid.length > 14){
                        _opid= Encrypt(_opid, true).toString();
                        commit('SET_TOKEN', {openid: _opid, timestamp: new Date().getTime()})
                        // 获取用户数据
                        getUserInfo({openid: _opid}).then(resp => {
                            if(resp.Code == 1){
                                let _data= resp.Data;
                                commit('SET_USERINFO',_data);
                                resolve(_data)
                            }else {
                                resolve();
                                commit('SET_USERINFO','');
                            }
                        }).catch(error => {
                            resolve();
                            commit('SET_TOKEN', '')
                            commit('SET_USERINFO','');
                        })
                        return;
                    }else{
                        resolve();
                        commit('SET_TOKEN', '')
                        commit('SET_USERINFO','');
                    }
                }else{
                    resolve()
                    commit('SET_TOKEN', '')
                    commit('SET_USERINFO','');
                }
            }).catch(error => {
                state.zfb={message:'无消息响应'+JSON.stringify(error)};
                resolve()
                commit('SET_TOKEN', '')
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
    setOpenId({ commit, state }) {
        commit('SET_Openid');
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
