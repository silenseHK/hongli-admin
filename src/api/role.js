import $axios from './index'
// 角色添加
export function RoleAdd(cUsername,list) {
  const url = '/role/add'
  let data = {
    rolename: cUsername,
    jurisdiction: list
  }
  return $axios.post(url, data
  )
}
// 角色查看
export function RoleList(limit, page) {
  const url = `/role/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}



// 根据id查询角色

export function RoleFind(id) {
  const url = `/role/findById?id=${id}`
  return $axios.get(url)
}


// 角色删除
export function RoleDel(id) {
  const url = '/role/del'
  let data = {
    id: id,
  
  }
  return $axios.post(url, data
  )
}


//??????????????
export function PowerFind() {
  const url = `/right_all`
  return $axios.get(url)
}

// 角色编辑
export function RoleEdit(id ,rolename, jurisdiction) {
  const url = '/role/edit'
  let data = {
    id: id,
    rolename: rolename,
    jurisdiction: jurisdiction
  }
  return $axios.post(url, data
  )
}

