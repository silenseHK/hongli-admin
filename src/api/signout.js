import request from '@/utils/request'
export const UserOut = (id) =>{
    // console.log(333,params)
    return request({
      method:"post",
      url:`/api/admin_out`,
      data:{
        id: id
      }
    })
}
