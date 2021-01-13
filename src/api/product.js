import $axios from './index'

// 新增产品
export function add(data) {
    const url = '/goods/add'
    return $axios.post(url, data)
}
//修改产品
export function update(data) {
    const url = '/goods/update'
    return $axios.post(url, data)
}

export function lists(size, page) {
    const url = `/goods?page=${page}&size=${size}`
    return $axios.get(url)
}

export function del(data) {
    const url = `/goods/delete`
    return $axios.post(url, data)
}