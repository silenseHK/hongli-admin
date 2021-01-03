import $axios from "./index"

/**
 * 获取服务器时间
 */

export const getServeTime = (params,parm) => {
  const url = '/home/systemTime'
  return $axios.post(url,params,parm)
}
//冻结
export const frozenIT = (params) => {
  return $axios.post('/account/frozen',params)
}
//解冻
export const disFrozenIT = (params) => {
  return $axios.post('/account/disFrozen',params)
}
//提现配置数据和数据回填
export const getWithdrawConfig = () => {
  return $axios.get('/system/withdrawConfig')
}
//提交提现配置
export const setWithdrawConfig = (params) => {
  return $axios.post('/system/withdrawConfig',params)
}
//充值配置数据和数据回填
export const getRechargeConfig = () => {
  return $axios.get('/system/rechargeConfig')
}
//提交充值配置
export const setRechargeConfig = (params) => {
  return $axios.post('/system/rechargeConfig',params)
}
//规则配置数据和数据回填
export const getRegulation = () => {
  return $axios.get('/system/gameRule')
}
//修改开奖规则
export const modifyRegulation = (params) => {
  return $axios.post('/system/gameRule',params)
}
/**
 * 获取设置的员工角色id
 */

export const getStaffID = (params) => {
  const url = '/system/staffRole'
  return $axios.get(url,params)
}
/**
 * 获取设置的组长角色id
 */

export const getGroupLeaderID = (params) => {
  const url = '/system/leaderRole'
  return $axios.get(url,params)
}
/**
 * 操作日志
 */

export const getJournalData = (params) => {
  const url = '/log/adminList'
  return $axios.get(url,params)
}
/**
 * 提交员工角色id
 */
export const submitStaffID = (params) => {
  const url = '/system/staffRole'
  return $axios.post(url,params)
}
/**
 * 提交组长角色id
 */
export const submitGroupLeaderID = (params) => {
  const url = '/system/leaderRole'
  return $axios.post(url,params)
}
/**
 * 查询账号
 */

export const getSystem = (limit, page) => {
  const url = `/account/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 *  添加账号
 */

export const addSystem = (params) => {
  const url = "/account/add"
  return $axios.post(url, params)
}

/**
 * 修改账号
 */

export const editSystem = (params) => {
  const url = "/account/edit"
  return $axios.post(url, params)
}
/**
 * 删除账号
 */

export const deleteSystem = (params) => {
  const url = "/account/del"
  return $axios.post(url, params)
}
/**
 * 查询账号
 */

export const searchSystem = (params) => {
  const url = "/account/search"
  return $axios.post(url, params)
}

// -------------------------ip地址---------------------

export const getIP = (limit, page) => {
  const url = `/ip/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 *  添加ip
 */

export const addIp = (params) => {
  const url = "/ip/add"
  return $axios.post(url, params)
}

/**
 * 修改ip
 */

export const editIp = (params) => {
  const url = "/ip/edit"
  return $axios.post(url, params)
}
/**
 * 删除ip
 */

export const deleteIp = (params) => {
  const url = "/ip/del"
  return $axios.post(url, params)
}

/**
 * 获取系统配置
 */

export const systemAll = () => {
  const url = `/system/findAll`
  return $axios.get(url)
}
export const systemEdit = (params) => {
  const url = "/system/edit"
  return $axios.post(url, params)
}
