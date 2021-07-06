import axios from 'axios';
import store from '@/store';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: ((window.serverConfig && window.serverConfig.VUE_APP_BASE_API) ? window.serverConfig.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API),
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
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        console.log(response)
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(response);
        }
    },
    error => {
        console.log("err=>", error)
        return Promise.reject(error);
    }
);

export default service;