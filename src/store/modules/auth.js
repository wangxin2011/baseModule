import storage from '@/utils/localstorage'
import { getWxJsConfig } from '@/api/wx.js'

const state = {
    refrshFlag: false,
    refrshClass: false,
    jsdkConfig: null
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        storage.write('token', token);
    },
    SET_FlAG: (state, flag) => {
        state.refrshFlag = flag;
    },
    SET_CLASS_FlAG: (state, flag) => {
        state.refrshClass = flag;
    },
    SET_JSDK_CONFIG: (state, config) => {
        state.jsdkConfig = config;
    }
}

const actions = {
   
    setStatus({ commit, state },flag) {
        commit('SET_FlAG',flag);
    },
    setClassStatus({ commit, state },flag) {
        commit('SET_CLASS_FlAG',flag);
    },
    // 获取微信jsdk授权
    getjsdk({ commit, state }){
        return new Promise((resolve, reject) => {
            let _host= location.href.split('#')[0];
            // 获取微信jsdk授权
            getWxJsConfig({url: _host}).then(resp => {
                if(resp.errcode === 0){
                    let _config= resp.config;
                    commit('SET_JSDK_CONFIG',_config);
                    resolve(_config)
                }else {
                    resolve()
                    commit('SET_JSDK_CONFIG','');
                }
            }).catch(() => {
                resolve()
                commit('SET_JSDK_CONFIG','');
            })
                   
        });
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
