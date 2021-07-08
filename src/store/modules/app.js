import storage from '@/utils/localstorage'

import { getConfig } from '@/api/base.js'
const state = {
    statlabel:'',
    config: null // 配置信息
}

const mutations = {
    SET_CONFIG: (state, config) => {
        state.config = config
    }
}

const actions = {
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
   
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
