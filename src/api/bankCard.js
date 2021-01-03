import $axios from "./index"

/**
 * 获取所有银行卡
 */
export const getBankCard = (limit, page) => {
  const url = `/bank/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
/**
 * 员工账号获取银行卡信息
 */
export const staffgetBankCard = ({size,page,phone}) => {
  const url = `/agent/backCards?size=${size}&page=${page}&phone=${phone}`
  return $axios.get(url)
}
/**
 * 根据id查询银行卡
 */

export const bankCardId = (id) => {
  const url = `/bank/findById?id=${id}`
  return $axios.get(url)
}

export const bankCardSearch = (params) => {
  const url = "/bank/search"
  return $axios.post(url, params)
}
