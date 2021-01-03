import $axios from './index'

export function login(data) {
  const url = '/admin_login'
  return $axios.post(url, data)
}
export function getInfo(parms,parm) {
  const url = '/menu'
  return $axios.get(url,parms,parm)
}

