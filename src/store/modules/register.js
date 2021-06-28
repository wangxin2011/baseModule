import storage from '@/utils/localstorage'
import {getToken} from '@/api/wx.js'
const state = {
    token: null  // 存储微信tocken
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        storage.write('token', token);
    }
}

const actions = {
    getWXToken({ commit, state }) {
        // 获取code 
        return new Promise((resolve, reject) => {
            getToken({code:'14b128733813488aa48a0a10f91fbf32'}).then(response => {
                  const { data } = response    
                  console.log(response);      
                //   commit('SET_TOKEN', roles)
                  resolve(data)
                }).catch(error => {
                  reject(error)
                })
            })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
