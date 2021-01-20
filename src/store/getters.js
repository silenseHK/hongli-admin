const getters = {
  tabList: (state) => state.pageIndex.tabList,
  nativeTab: (state) => state.pageIndex.nativeTab,
  token: (state) => state.user.token,
  userName: (state) => state.user.userName,
  roles: (state) => state.user.roles,
  introduce: (state) => state.user.introduce,
  routes: (state) => state.permission.routes,
  addRoutes: (state) => state.permission.addRoutes,
  userStatus: (state) => state.user.userStatus,
  userDatas: (state) => state.user.userData,
  opened: (state) => {
    if (state.app.opened === "false") {
      return false
    } else if (state.app.opened === "true") {
      return true
    }
  },
  msgIsShow: (state) => state.app.msgIsShow,
  showDriver: (state) => state.app.showDriver,
}
export default getters
