import $axios from './index'
// 权限查看
export function JurFind() {
  const url = `/right/findAll`
  return $axios.get(url)
}
// 权限添加
export function JurAdd(permission_name, address, parent_id) {
  const url = '/right/add'
  let data = {
    permission_name: permission_name,
    address: address,
    parent_id: parent_id
  }
  return $axios.post(url, data
  )
}

// ????
export function JurFind2() {
  const url = '/right/all'
  return $axios.get(url
  )
}

// 查看
export function JurFindBy(id) {
  const url = `/right/findById?id=${id}`

  return $axios.get(url
  )
}
// 权限编辑
export function JurEdit(id, permission_name, address, parent_id) {
  const url = '/right/edit'
  let data = {
    id: id,
    permission_name: permission_name,
    address: address,
    parent_id: parent_id
  }
  return $axios.post(url, data
  )
}
