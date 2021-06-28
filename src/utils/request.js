import axios from 'axios';
import store from '@/store';
import { Encrypt } from '@/utils/validate.js';
import CryptoJS from "crypto-js";

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 600000
});

service.interceptors.request.use(
    config => {
        if(config.url && config.url.indexOf('data/') >= 0){
            // 配置文件读取本地
            config.baseURL = ''
        }
        config.retry= 4; // 重试次数
        config.retryDelay = 1000; // 重试延时
        if (store.state.app.token) {
            // let each request carry tokens
            let _openid=  store.state.app.token.openid;
            if(store.state.app.isPlatform == 11 || store.state.app.isPlatform == 21){
                // 南昌市支付宝赣服通使用
                _openid= '2_' + _openid;
            }
            // 如果用户信息中有token，直接获取用户信息中的token
            if(store.state.app.userinfo){
                _openid= store.state.app.userinfo.F_Token || _openid;
            }
            config.headers['token'] = _openid;
            const _tempTime = new Date().getTime();
            const _signMd5 = CryptoJS.MD5(_openid+_tempTime).toString() || '';
            config.headers['tk'] = Encrypt(''+_tempTime, true).toString();
            config.headers['sign'] = _signMd5.toLowerCase();
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;