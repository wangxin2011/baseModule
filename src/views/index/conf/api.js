import baseRequest from '@/api/base';
import request from '@/utils/request';

// 通过微信code获取用户信息
export const getUserInfoByCode = (data) => {
    return request({
        url: 'https://mmoa.hilean.cn/api/app/employee/search?keywords=%E6%9B%B9',
       // url: process.env.VUE_APP_BASE_AUTH_API,
        method: 'post',
        data
    });
};

