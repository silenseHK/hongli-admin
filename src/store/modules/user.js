// 登录

import { login, getInfo } from "@/api/login"
import { Message } from "element-ui"
import router, { resetRouter } from "@/router"

const state = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "", // 认证凭证'
  userName: "",
  nickName: "",
  roles: [],
  introduce: "",
  userStatus: "",
  userData: null,
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem("token", val)
  },
  GET_USERDATA(state, val) {
    console.log(val)
    state.userData = val
  },
  DEL_TOKEN(state) {
    state.token = ""
    state.userName = ""
    state.roles = ""
    state.introduce = ""
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("roleId")
    localStorage.removeItem("nickName")
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload.username
    localStorage.setItem("userName", payload.username)
    localStorage.setItem("nickName", payload.nickname)
  },
  /**
   * 储存用户的ID
   */
  ROLE_ID(state, payload) {
    // state.userName = payload;
    localStorage.setItem("roleId", payload)
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload
  },
  SET_STATUS(state, payload) {
    state.userStatus = payload
    localStorage.setItem("userStatus", payload)
  },
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then((res) => {
          if (res.code === "200") {
            commit("SET_TOKEN", res.token)
            commit("SET_NAME", res.data)
            commit("SET_STATUS", res.data.customer_status)
            commit("SET_INTRODUCE", res.data.nickname)
            commit("ROLE_ID", res.data.role_id)
            resolve(res)
          } else {
            Message.error(res.msg)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit("DEL_TOKEN")
    resetRouter()
    router.push({
      path: "/login",
      query: {
        redirect: "/",
      },
    })
  },
  _getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo({},{hiddenLoadingloading: true})
        .then((res) => {
          
          let resdata = res.data.menu
          // let resdata = res.data
          localStorage.setItem("roleType", res.data.role_type)
          let roles = resdata.reduce((result,item) =>{
            result.push(item.address)
            return result
          },[])
          if (res.code == "200") {
            commit("SET_ROLES", roles)
          } else {
            Message.error(res.msg)
          }
          resolve(roles)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
