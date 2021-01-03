/**
 * 财务信息
 */

import $axios from "./index"

// -----------------充值列表---------------
export const getRecharge = (limit, page, status) => {
  const url = `/recharge/findAll?limit=${limit}&page=${page}&status=${status}`
  return $axios.get(url)
}
// 员工充值列表
export const staffGetRecharge = (params) => {
  const url = "/agent/finance/recharge"
  return $axios.post(url, params)
}
/**
 * 搜索
 */
export const searchRecharge = (params) => {
  const url = "/recharge/search"
  return $axios.post(url, params)
}
/**
 * 查看用户信息
 */
export const userRecharge = (params) => {
  const url = "/recharge/user"
  return $axios.post(url, params)
}
/**
 * 获取提现列表信息
 */
export const getwithdrawal = (limit, page, status) => {
  const url = `/withdrawal/findAll?limit=${limit}&page=${page}&status=${status}`
  return $axios.get(url)
}
/**
 * 获取员工提现列表信息
 */
export const staffGetwithdrawal = (params) => {
  const url = "/agent/finance/withdraw"
  return $axios.post(url, params)
}
export const withSearch = (params) => {
  const url = "/withdrawal/search"
  return $axios.post(url, params)
}
/**
 * 审核提现
 */
export const reviewWith = (params) => {
  const url = "/withdrawal/audit"
  return $axios.post(url, params)
}

/**
 * 全选审核通过
 */
export const allBy = (params) => {
  const url = "/withdrawal/pass"
  return $axios.post(url, params)
}
/**
 * 全选审核不通过
 */
export const allFila = (params) => {
  const url = "/withdrawal/failure"
  return $axios.post(url, params)
}

// -----------------分佣列表-----------------------------
/**
 * 获取分佣列表
 */

export const getCommission = (limit, page, status) => {
  const url = `/charge/findAll?limit=${limit}&page=${page}&status=${status}`
  return $axios.get(url)
}
/**
 * 获取员工分佣列表
 */

export const staffGetCommission = (params) => {
  const url = "/agent/finance/commission"
  return $axios.post(url,params)
}

/**
 * 搜索分记录
 */
export const searchCommission = (params) => {
  const url = "/charge/search"
  return $axios.post(url, params)
}
// -----------------提佣列表-----------------------------
/**
 * 获取提佣列表
 */

export const getSupport = (limit, page) => {
  const url = `/commission/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}

/**
 * 搜索提佣记录
 */
export const searSupport = (params) => {
  const url = "/commission/search"
  return $axios.post(url, params)
}

// --------------------签到列表------------------
/**
 * 获取签到列表
 */

export const getSign = (limit, page) => {
  const url = `/sign/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 获取员工签到列表
 */

export const staffGetSign = (params) => {
  const url = "/agent/finance/signIn"
  return $axios.post(url,params)
}

/**
 * 搜索签到记录
 */
export const searSign = (params) => {
  const url = "/sign/search"
  return $axios.post(url, params)
}

// -------------------------裂变红包-------------------
export const packetList = (limit, page) => {
  const url = `/envelope/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
// 员工裂变红包
export const staffPacketList = (params) => {
  const url = "/agent/finance/envelope"
  return $axios.post(url,params)
}

export const packetSearch = (params) => {
  const url = "/envelope/search"
  return $axios.post(url, params)
}

/**
 * 取消提现记录接口
 */
export const getCancel = (params) => {
  const url = "/withdrawal/cancel"
  return $axios.post(url, params)
}
