
import request from '@/utils/request'

export const submit = data => {
    return request({
        url: 'http://node.zq9527.cn/getUserInfo',
        method: 'get',
        params: data
    });
};
/**
 * 获取学校数据
 * param {string} url 接口地址 
 * 区域管理员注册：Api/Register/PostAreaManager
 * 学校管理员注册：Api/Register/PostSchoolManager
 * 教职工注册：Api/Register/PostTeacher
 * 家长注册：Api/Register/PostParent
 * param {string} Name 姓名
 * param {string} Mobile 手机号
 * param {string} IdNo 身份证号
 * param {string} DistrictId 区域ID（县区教育局ID）
 * param {number} SchoolCount 学校数据
 * param {string} SchoolId 学校ID
 * param {string} Phase 学制编码
 * param {number} ClassCount 全校班级总数
 * param {number} TeacherCount 全校教职工人数
 * param {string} ClassId 班级ID
 * 
 * 
 * */
export const register = (url,data) => {
    return request({
        url: url,
        method: 'post',
        data
    });
};

/**
 * 获取辖区数据
 * 
 */
export const getDistrict = query => {
    return request({
        url: 'Api/Common/GetDistrict',
        method: 'get',
        params: query
    });
};
/**
 * 获取用户数据
 * 
 */
export const getUserBasicInfo = query => {
    return request({
        url: 'Api/Common/GetUserBasicInfo',
        method: 'get',
        params: query
    });
};
/**
 * 获取用户修改
 * 
 */
export const saveUserInfo = data => {
    return request({
        url: 'Api/Common/SaveUserInfo',
        method: 'post',
        data
    });
};
// 添加退休教职工
export const addRetireTeacher = data => {
    return request({
        url: 'Api/School/AddRetireTeacher',
        method: 'post',
        data
    });
};
// 支付宝端家长关联
// "StudentName": "学生姓名",
// "StudentIdNo": "学生证件号码，加密后",
// "ParentIdNo": "家长证件证号，加密后"
export const bindGanFuTongParent = data => {
    return request({
        url: 'Api/Common/BindGanFuTongParent',
        method: 'post',
        data
    });
};
// 微信端关联用户
// "Name": "学生姓名",
// "IdCard": "学生证件号码，加密后",
// "OpenId": 
export const gftToWechatForXinyu = data => {
    return request({
        url: 'Api/Common/GftToWechatForXinyu',
        method: 'post',
        data
    });
};
