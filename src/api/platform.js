import request from '@/utils/request'
export const PlatList = (limit,page) =>{
    // console.log(333,params)
    return request({
      method:"get",
      url:`/api/platform/findAll?limit=${limit}&page=${page}`,
      data:{

      }
    })
}