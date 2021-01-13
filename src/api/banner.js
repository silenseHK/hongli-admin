import $axios from './index'

// 添加
export function BannerAdd(formData) {
    const url = '/banner/add'
    return $axios.post(url, formData)
}

// 添加
export function BannerEdit(formData) {
    const url = '/banner/save'
    return $axios.post(url, formData)
}

// 列表
export function BannerList(params) {
    const url = '/banner/index'
    return $axios.get(url, params)
}

// 删除
export function delBanner(params) {
    const url = '/banner/del'
    return $axios.post(url, params)
}