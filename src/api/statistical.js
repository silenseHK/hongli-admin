import $axios from "./index"
/**
 * 当日盈利差
 */
export const getProfit = (limit, page) => {
  const url = `/spread/profit?limit=${limit}&page=${page}`
  return $axios.get(url)
}
// 组长运营数据
export const getOperation = (params) => {
  return $axios.get('/agent/staffLists',params)
}
/**
 * 员工当日盈利差
 */
export const staffGetProfit = (params) => {
  const url = "/agent/statistical/dailyWinRank"
  return $axios.post(url, params)
}
/**
 * 当日亏损差
 */
export const getLoss = (limit, page) => {
  const url = `/spread/loss?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 员工当日亏损差
 */
export const staffGetLoss = (params) => {
  const url = "/agent/statistical/dailyLoseRank"
  return $axios.post(url, params)
}
/**
 * 客服业绩报表
 */
export const getReport = (limit, page) => {
  const url = `/report/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 搜索客服业绩
 */
export const searchReport = (params) => {
  const url = `/report/search`
  return $axios.post(url, params)
}
