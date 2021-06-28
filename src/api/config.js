

import request from '@/utils/request'
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