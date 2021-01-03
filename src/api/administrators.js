import $axios from './index'
// 管理员查看
export function AdminList(limit, page) {
  const url = `/admin/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
// 管理员添加
export function AdminAdd(username, password, nickname, role_id) {
  const url = '/admin/add'
  let data = {
    username: username,
    password: password,
    nickname: nickname,
    role_id: role_id
  }
  return $axios.post(url, data
  )
}
// 管理员删除
export function AdminDel(id) {
  const url = '/admin/del'
  let data = {
    id: id
  }
  return $axios.post(url, data
  )
}

// 管理员编辑
export function AdminEdit(id, username, password, nickname, role_id) {
  const url = '/admin/edit'
  let data = {
    id: id,
    username: username,
    password: password,
    nickname: nickname,
    role_id: role_id
  }
  return $axios.post(url, data
  )
}
// 根据id查询管理员
export function AdminFind(id) {
  const url = `/admin/findById?id=${id}`
  return $axios.get(url)
}

// 解除封禁管理员
export function AdminRelieve(id) {
  const url = '/admin/relieve'
  let data = {
    id: id
    
  }
  return $axios.post(url, data
  )
}

// 封禁管理员

export function LimitUser(id) {
  const url = '/admin/prohibition'
  let data = {
    id: id
    
  }
  return $axios.post(url, data
  )
}

