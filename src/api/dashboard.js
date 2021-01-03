import $axios from './index'
// 今日统计数据汇总
export function getCardsData() {
  const url = '/meter/today'
  return $axios.get(url)
}
// 昨日数据统计汇总
export function getMeterData() {
  const url = '/meter/yesterday'
  return $axios.get(url)
}
export function getLineData() {
  const url = '/meter/user'
  return $axios.get(url)
}

export function getBarData() {
  const url = '/meter/agent'
  return $axios.get(url)
}

export function getBarGame() {
  const url = '/meter/game'
  return $axios.get(url)
}

//员工业绩统计
export function getMyPerformance(params) {
  const url = '/account/showData'
  return $axios.post(url,params)
}
