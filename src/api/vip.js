import $axios from "./index"

/**
 * vip查看列表
 */
export function vipList(limit, page) {
  const url = `/vip/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}

/**
 * vip添添加
 */
export function vipAdd(params) {
  const url = "/vip/add"
  const data = {
    grade: params.grade,
    rebate: params.rebate,
    ids: params.ids,
  }
  return $axios.post(url, data)
}
/**
 * 特权编辑
 */
export function vipEdit(params) {
  const url = "/vip/edit"
  const data = {
    id: params.id,
    grade: params.grade,
    rebate: params.rebate,
    ids: params.ids,
  }
  return $axios.post(url, data)
}

/**
 * 会员删除
 */
export function vipDel(params) {
  const url = "/vip/del"
  const data = {
    id: params.id,
  }
  return $axios.post(url, data)
}
/**
 * 获取所有权限数组
 */

export function privilegeAll() {
  const url = "/privilege/all"
  return $axios.get(url)
}
