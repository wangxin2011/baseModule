
import request from '@/utils/request'

export const getlist = query => {
    return request({
        url: 'http://node.zq9527.cn/getList',
        method: 'get',
        params: query
    });
};
export const getAuthNum = query => {
    return request({
        url: 'http://node.zq9527.cn/getList',
        method: 'get',
        params: query
    });
};
/**
 * 获取教育局辖学校
 * param {string} DistrictId 区域ID（教育局ID）
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * */
export const getOrgStatusList = query => {
    return request({
        url: 'Api/School/GetOrgStatusList',
        method: 'get',
        params: query
    });
};
/**
 * 审核学校管理员
 * param {string} SchoolId 学校ID
 * param {string} TeacherId 老师ID
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * param {string} Opinion 意见
 * 
 */
export const auditSchoolManager = data => {
    return request({
        url: 'Api/School/AuditSchoolManager',
        method: 'post',
        data
    });
};
/**
 * 拒绝所有学校管理员
 * param {string} SchoolId 学校ID
 * param {string} TeacherId 老师ID
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * param {string} Opinion 意见
 * 
 */
export const rejectAllManager = data => {
    return request({
        url: 'Api/School/AuditSchoolManager',
        method: 'post',
        data
    });
};

/**
 * 获取学校管理人员列表
 * param {string} ParentId 县区ID 
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * 
 */
export const getSchoolManagerList = query => {
    return request({
        url: 'Api/School/GetSchoolManagerList',
        method: 'get',
        params: query
    });
};

/**
 * 审核学校职工
 * param {string} TeacherId 老师ID
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * param {string} Opinion 意见
 * 
 */
export const auditTeacher = data => {
    return request({
        url: 'Api/School/AuditTeacher',
        method: 'post',
        data
    });
};

/**
 * 拒绝学校职工
 * param {string} TeacherId 老师ID
 * 
 */
export const rejectAllStaff = data => {
    return request({
        url: 'Api/School/AuditTeacher',
        method: 'post',
        data
    });
};
/**
 * 移除学校职工
 * param {string} TeacherId 老师ID
 * 
 */
export const removeStaff = data => {
    return request({
        url: 'Api/School/AuditTeacher',
        method: 'post',
        data
    });
};
/**
 * 获取学校管理人员列表
 * param {string} SchoolId 学校ID 
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * 
 */
export const getTeacherList = query => {
    return request({
        url: 'Api/School/GetTeacherList',
        method: 'get',
        params: query
    });
};
/**
 * 获取已审核人员列表
 * param {string} SchoolId 学校ID 
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * 
 */
export const getAllTeacherList = query => {
    return request({
        url: 'Api/School/GetAllTeacherList',
        method: 'get',
        params: query
    });
};
/**
 * 设置老师为学校管理员
 * param {string} SchoolId 学校ID 
 * param {string} ManagerId 教职工ID
 * param {string} Tags 标签（可控）
 * param {string} Status 状态，2：设置为管理员，3：取消管理员
 * 
 */
export const setSchoolManager = data => {
    return request({
        url: 'Api/School/SetSchoolManager',
        method: 'post',
        data
    });
};

/**
 * 获取教育局辖学校
 * param {string} SchoolId 区域ID（教育局ID）
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * */
export const getClassStatusList = query => {
    return request({
        url: 'Api/School/GetClassStatusList',
        method: 'get',
        params: query
    });
};
/**
 * 移除学校老师
* param {string} TeacherId 老师ID
 * param {number} Status 状态，3：驳回或删除
 * */
export const removeMTeacher = data => {
    return request({
        url: 'Api/School/RemoveTeacher',
        method: 'post',
        data
    });
};

/**
 * 审核班级
 * param {string} ClassId 班级ID
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * param {string} Opinion 意见
 * 
 */
export const auditClass = data => {
    return request({
        url: 'Api/School/AuditClass',
        method: 'post',
        data
    });
};
/**
 * 拒绝全部待审班级
 * param {string} ClassId 班级ID
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * 
 */
export const rejectAllClass = data => {
    return request({
        url: 'Api/School/AuditClass',
        method: 'post',
        data
    });
};
/**
 * 获取班级列表
 * param {string} SchoolId 学校ID 
 * param {string} GradeCode 班级编码
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * 
 */
export const getAuditClassList = query => {
    return request({
        url: 'Api/School/GetAuditClassList',
        method: 'get',
        params: query
    });
};


/**
 * 获取区县教育局列表
 * 
 */
export const getDeptStatusList = query => {
    return request({
        url: 'Api/TopGroup/GetDeptStatusList',
        method: 'get',
        params: query
    });
};
/**
 * 获取区县管理员列表
 * param {string} PageIndex 页码 
 * param {string} PageSize 一页记录数 
 * param {string} Status 状态，1：未审核，2：通过，3：驳回
 * 
 */
export const getAreaManagerList = query => {
    return request({
        url: 'Api/TopGroup/GetAreaManagerList',
        method: 'get',
        params: query
    });
};
/**
 * 审核区县管理员
 * param {string} Ids F_Id列表，非管理员ID，多个ID请有半角逗号（,）分隔
 * param {number} Status 学校ID 状态，2：审核通过，3：驳回
 * param {string} Opinion 意见
 * 
 */
export const auditAreaManager = data => {
    return request({
        url: 'Api/TopGroup/AuditAreaManager',
        method: 'post',
        data
    });
};
/**
 * 移除县(区)、学校管理员
 * param {string} RemoveType 2：学校管理员，3：县（区）管理员
 * param {string} OrgId 组织ID
 * param {string} ManagerId 管理员ID
 * 
 */
export const removeManager = data => {
    return request({
        url: 'Api/Manage/RemoveManager',
        method: 'post',
        data
    });
};