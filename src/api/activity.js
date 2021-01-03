import $axios from "./index"

/**
 * 获取活动列表
 */
export const getPeriod = (limit, page, status) => {
  const url = `/period/findAll?limit=${limit}&page=${page}&status=${status}`
  return $axios.get(url)
}
/**
 * 搜索活动列表
 */
export const periodSearch = (params) => {
  const url = "/period/search"
  return $axios.post(url, params)
}
/**
 * 查看中奖详情数据
 */
export const periodId = (id) => {
  const url = `/period/findById?id=${id}`
  return $axios.get(url)
}

// ---------订单列表------------------
export const getBetting = (limit, page) => {
  const url = `/betting/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
// 员工订单列表
export const staffGetBetting = (params) => {
  const url = "/agent/order/index"
  return $axios.get(url,params)
}

export const searchBetting = (params) => {
  const url = "/betting/search"
  return $axios.post(url, params)
}
/**
 * 统计订单列表
 */
export const staticBetting = () => {
  const url = "/betting/statistics"
  return $axios.get(url)
}
/**
 * 员工统计订单列表
 */
export const staffStaticBetting = () => {
  const url = "/agent/order/statistic"
  return $axios.get(url)
}

/**
 * 手动开奖
 */
export const getPrize = (params) => {
  const url = "get_prize_opening_data"
  return $axios.post(url, params)
}

/**
 * 点击手动开奖
 */
export const requestDraw = (params) => {
  const url = "/sd_pize_opening"
  return $axios.post(url, params)
}
