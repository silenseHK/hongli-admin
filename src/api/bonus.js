import $axios from "./index"

/**
 * 获取赠金信息
 */
export const getGifyAll = (limit, page) => {
  const url = `/gift/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 获取员工赠金信息
 */
export const staffGetGifyAll = (params) => {
  const url = "/agent/finance/bonus"
  return $axios.post(url,params)
}

/**
 * 赠金搜索
 */

export const searchGif = (params) => {
  const url = "/gift/search"
  return $axios.post(url, params)
}
/**
 * 上下分记录
 */
export const getUpandDown = (limit, page) => {
  const url = `/portion/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 员工上下分记录
 */
export const staffGetUpandDown = (params) => {
  const url = "/agent/finance/upAndDown"
  return $axios.post(url,params)
}
/**
 * 上下分搜索
 */

export const searchupAndDown = (params) => {
  const url = "/portion/search"
  return $axios.post(url, params)
}
