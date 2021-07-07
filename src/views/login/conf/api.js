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

