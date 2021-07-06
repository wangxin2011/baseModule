

import request from '@/utils/request'
import store from "@/store"
import { Encrypt } from '@/utils/validate.js';

const header = {'Content-Type': 'application/x-www-form-urlencoded'}
// 接口地址前缀域名之后共同的
const prefix = ''
/**
 * 请求的底层接口
 * @param {*} url  接口地址
 * @param {*} method 请求方法 get、post
 * @param {*} params  请求参数
 * @param {*} headers  请求头
 */
export const baseRequest = (url, method = "post", params, headers) => {
    let _param = {
        url: prefix + url,
        method: method
    }
    let _header = {}
    params = params || {}
    if (store.state.app.token) {
        // let each request carry tokens
        let _token = store.state.app.token;
        let _openid = store.state.app.openid;
        if(_openid){
            _header['openid'] = Encrypt(_openid, true).toString();
        }
        _header['Authorization'] = "Bearer " + _token;
    }
    if (headers) {
        Object.assign(_header, headers)
    }
    _param.headers = _header
    if (method == 'post') {
        _param.data = params
        // _param.data = qs.stringify(params)
    } else {
        _param.params = params
    }
    return request(_param);
}

/**
 * 获取配置文件
 * @param {*} query 
 */
export const getConfig = query => {
    // 缓存当天
    const _date = new Date();
    const _v = _date.getFullYear()+""+_date.getMonth()+""+_date.getDate();
    return request({
        url: 'data/config.json?v='+ _v,
        method: 'get',
        params: query
    });
};
/**
 * 提交隐私政策是否已读接口
 * @param {*} query 
 */
export const setReadStatus = data => {
    // 缓存当天
    return request({
        url: 'Api/Common/SavePrivacyInfo',
        method: 'post',
        data
    });
};
/**
 * 获取帮助手册
 * 
 */
export const getPrivacyPolicy = () => {
    // 缓存当天
    const _date = new Date();
    const _v = _date.getFullYear()+""+_date.getMonth()+""+_date.getDate();
    return request({
        url: 'data/'+process.env.VUE_APP_ENV+'.txt?v=' + _v,
        method: 'get'
    });
};
/**
 * 获取省市
 * 
 */
export const getPrivices = () => {
    // 缓存当天
    const _date = new Date();
    const _v = _date.getFullYear()+""+_date.getMonth()+""+_date.getDate();
    return request({
        url: 'data/provinces.json?v=' + _v,
        method: 'get'
    });
};
/**
 * 提交日志
 * 
 */
export const postLogs = (data) => {
    // 缓存当天
    return request({
        url: 'api/log/receive',
        method: 'post',
        data
    });
};