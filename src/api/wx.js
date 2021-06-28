
import request from '@/utils/request'
import qs from 'qs';

export const getToken = data => {
    return request({
        // url: 'http://twxdsj.dledc.com/api/Wechat/OAuth',
        url: process.env.VUE_APP_BASE_AUTH_API,
        method: 'post',
        data
    });
};
// appid=m0FuEHFX&auth_token=XrSYtN3q_JXGOVXCX&isFrom=JXGOV
export const getZFBToken = query => {
    return request({
        url: 'http://gft.nc.gov.cn/service/general/getAuthInfo.do?appid='+query.appid+'&auth_token='+query.auth_token+'&isFrom='+query.isFrom,
        method: 'get'
    });
};
export const getUserInfoByTicket = data => {
    console.log(process.env.VUE_APP_BASE_GFT_AUTH_API);
    return request({
        // url: 'https://ganfutong.jiangxi.gov.cn/jmportalgft/interfaces/getUserInfoByTicket.do',
        url: process.env.VUE_APP_BASE_GFT_AUTH_API,
        method: 'post',
        // params: query
        // headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        // data: qs.stringify(data)
        data
        
    });
};
export const getCode = query => {
    return request({
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9aa127d3ac5bb3f&redirect_uri=http://wx.zq9527.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
        method: 'get',
        params: query
       
    });
};
/**
 * 获取用户数据
 * @param {*} query 
 * @param {string} Code 
 */
export const getUserInfo = query => {
    return request({
        url: 'Api/Common/GetUserInfo',
        method: 'get',
        params: query
    });
};
/**
 * 获取微信jsdk授权信息
 * @param {*} data 
 */
export const getWxJsConfig = data => {
    return request({
        // url: 'http://testjkdsj.nceduc.cn/wechat/api/wechat/GetWxJsConfig',
        url: process.env.VUE_APP_JSDK_AUTH_API,
        method: 'post',
        data
    });
};
/**
 * 刷新token
 * param {string} 
 * param {string} 
 * param {string} 
 * 
 */
export const refreshToken = data => {
    return request({
        url: 'http://wx.yfxstg.cn/refreshToken',
        method: 'post',
        data
    });
};
