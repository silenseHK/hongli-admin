import { asyncRoutes, currencyRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...currencyRoutes, ...payload]
    state.addRoutes = payload
  }
}
// 遍历asyncRoutes动态路由
function forSearchArr(route, roles) {
  let arrNew = []
  for (let item of route) {
    let itemNew = { ...item } //解决浅拷贝共享同一内存地址
    if (roles.includes(itemNew.name)) {
      if (itemNew.children) {
        itemNew.children = forSearchArr(itemNew.children, roles)
      }
      arrNew.push(itemNew)
    }
  }
  // console.log(arrNew)
  return arrNew
}
const actions = {
  getAsyncRoutes({ commit, rootGetters }, roles) {
    // console.log('rootGetters---->',rootGetters);
    // console.log('asyncRoutes---->',asyncRoutes);
    // console.log('rolesroles--->',roles)
    return new Promise(resolve => {
      let routes = []
      // if (rootGetters.userName === 'admin') {
      //   routes = asyncRoutes || ''
      // } else {
        routes = forSearchArr(asyncRoutes, roles)
      // }
      // console.log('routesroutesroutesroutes--->',routes)
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
