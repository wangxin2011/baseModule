import request from '@/utils/request';
import { baseRequest } from '@/api/base';

// 通过微信code获取用户信息
export const getUserInfoByCode = (data) => {
    return request({
        url: 'https://mmoa.hilean.cn/api/app/employee/search?keywords=%E6%9B%B9',
       // url: process.env.VUE_APP_BASE_AUTH_API,
        method: 'post',
        data
    });
};
// 通过账号密码绑定用户
export const login = (data) => {
    return baseRequest('login', "post", data, null);
};
// 通过手机号发送验证码
export const sendSms = (data) => {
    return baseRequest('login', "post", data, null);
};
// 通过手机验证码重置密码
export const resetPwd = (data) => {
    return baseRequest('reset', "post", data, null);
};
// 通过学籍号和姓名找回账号
export const retrieveAccount = (data) => {
    return baseRequest('reset', "post", data, null);
};

