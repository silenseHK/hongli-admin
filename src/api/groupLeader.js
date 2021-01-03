import $axios from "./index"

/**
 * 获取组长账号管理列表
 */
export const getgroupLeaderAccountList = (params) => {
    return $axios.get('/user/groupLeader/list',params)
}
/**
 * 添加组长
 */
export const addGroupLeader = (params) => {
    return $axios.post('/user/groupLeader/add',params)
}
/**
 * 删除一栏数据
 */
export const delGroupLeaderData = (params) => {
    return $axios.post('/user/groupLeader/del',params)
}

/**
 * 修改一栏数据
 */
export const motifyGroupLeaderData = (params) => {
    return $axios.post('/user/groupLeader/edit',params)
}

/**
 * 搜索账号
 */
export const searchData = (params) => {
    return $axios.get('/user/groupLeader/searchAccount',params)
}


/**
 * 绑定账号
 */
export const myBindingAccount = (params) => {
    return $axios.post('/user/groupLeader/bindAccount',params)
}