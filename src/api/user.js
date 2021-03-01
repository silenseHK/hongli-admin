import $axios from "./index"

/**
 * 获取所有用户
 */
export function userList(limit, page) {
  const url = `/user/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 编辑用用户
 */

export function userEdit(params) {
  const url = "/user/edit"

  return $axios.post(url, params)
}

/**
 * 删除用户
 */

export function userDel(params) {
  const url = "/user/del"
  const data = {
    id: params.id,
  }
  return $axios.post(url, data)
}

/**
 * 查询平接口
 */
export function userPlatform() {
  const url = "/user/platform"
  return $axios.get(url)
}

/**
 * 根据Id获取用户信息
 */

export function userId(id) {
  const url = `/user/findById?id=${id}`
  return $axios.get(url)
}
/**
 * @param {type} property - description.
 * 用户搜索
 */
export function useSearch(params) {
  const url = "/user/search"
  const data = params
  return $axios.post(url, data)
}

/**
 * 查询所有客服
 */

export const customerAll = () => {
  const url = "/user/customer"
  return $axios.get(url)
}
/**
 * 员工账号查询所有用户列表
 */
export const staffCustomerAll = (params) => {
  const url = "agent/user/search"
  return $axios.post(url,params)
}
/**
 * 新增用户
 */
export const addUsers = (params) => {
  const url = "/user/add"
  const data = params
  return $axios.post(url, data)
}

/**
 * 批量修改备注
 */

export const modifyEdit = (params) => {
  const url = "/user/modify"
  return $axios.post(url, params)
}

/**
 * 批量修改客接口j
 */
export const customerEdit = (params) => {
  const url = "/user/customer/modify"
  return $axios.post(url, params)
}

/**
 * 首充列表
 */
export const chargeList = (limit, page) => {
  const url = `/firstCharge/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 员工首充列表
 */
export const staffChargeList = (params) => {
  const url = "/agent/user/firstRecharge"
  return $axios.post(url,params)
}
/**
 * 首充搜索功能
 */

export const chargeSearch = (params) => {
  const url = "/firstCharge/search"
  return $axios.post(url, params)
}

/**
 * 会员下单列表
 */

export const staffGetPlace = (params) => {
  const url = "/agent/user/orderInfo"
  return $axios.post(url, params)
}
/**
 * 员工会员下单列表
 */

export const getPlace = (limit, page) => {
  const url = `/wager/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 会员下注搜索
 */
export const placeSearch = (params) => {
  const url = "/wager/search"
  return $axios.post(url, params)
}

/**
 * 获取首页列表
 */
export const getHome = () => {
  const url = "/home/findAll"
  return $axios.get(url)
}
/**
 * 获取首页列表新接口
 */
export const getHomeData = (params) => {
  const url = "/agent/home"
  return $axios.get(url, params)
}
/**
 * 点击搜索
 */
export const searchHome = (params) => {
  const url = "/home/search"
  return $axios.post(url, params)
}

/**
 * 点击封禁
 */
export const userStatus = (params) => {
  const url = "/user/status"
  return $axios.post(url, params)
}
/**
 * 获取推荐人信息
 */
export const getReferrer = () => {
  const url = "/user/recommend"
  return $axios.get(url)
}

/**
 * 赠送礼金
 */
export const requestGify = (params) => {
  const url = "/user/gift"
  return $axios.post(url, params)
}

/**
 * 上分
 */
export const requestBanUp = (params) => {
  const url = "/user/up"
  return $axios.post(url, params)
}
/**
 * 下分
 */
export const requestBanDown = (params) => {
  const url = "user/down"
  return $axios.post(url, params)
}
/**
 * 获取用户资金详情数据
 */
export const requestUserDetails = (params) => {
  const url = "/user/logs"
  return $axios.post(url, params)
}

export const requestLogType = () => {
  const url = "/user/logType"
  return $axios.get(url)
}

export const clearFakeBetting = () => {
  const url = "/user/clearFakeBetting"
  return $axios.post(url,{})
}

export const searchInviteUser = (params) => {
  const url = "/user/searchUserByPhoneLike"
  return $axios.post(url, params)
}

export const teamUpList = (page, size, user_id) => {
  const url = `/user/groupUpList?page=${page}&size=${size}&user_id=${user_id}`
  return $axios.get(url)
}

export const teamDownList = (page, size, user_id) => {
  const url = `/user/groupDownList?page=${page}&size=${size}&user_id=${user_id}`
  return $axios.get(url)
}
