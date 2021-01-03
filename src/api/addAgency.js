
import $axios from "./index"
//新增代理员工
const addAgencyStaff = (params) => {
    return $axios.post("/account/add", params)
}
//编辑代理员工
const editAgencyStaff = (params) => {
    return $axios.post("/account/edit", params)
}
// 绑定账号
const bindingAccount = (params) => {
    return $axios.post("/account/bind", params)
}
// 查询代理员工信息
const getAgencyStaffInfo = (params) => {
    return $axios.get("/user/findCustomerServiceByPhone",params)
  }

export {
    addAgencyStaff,editAgencyStaff,bindingAccount,getAgencyStaffInfo
}