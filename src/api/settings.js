import $axios from './index'
// 获取设置数据
export function systemFindAll() {
    const url = '/system/findAll'
   
    return $axios.get(url)
}
    // 设置修改
export function systemEdit(systemData) {
    const url = '/system/edit'
    const data = {
        systemEdit:systemData
    }
   
    return $axios.post(url,data)
}

// 获取版本信息
export function editionFindAll() {
    const url = '/edition/findAll'
   
    return $axios.get(url)
}
// 提交版本更新
export function editionAdd(getVersion) {
    const url = '/edition/add'
    let data = {
        version: getVersion.version,
        version_name:getVersion.version_name,
        remark: getVersion.remark,
        is_update: getVersion.is_update,
        android_url: getVersion.android_url,
        ios_url: getVersion.ios_url
    }
   
    return $axios.post(url,data)
}
// 提交版本更新
export function editionEdit(getVersion) {
    const url = '/edition/edit'
    let data = {
        id:getVersion.id,
        version: getVersion.version,
        remark: getVersion.remark,
        is_update: getVersion.is_update,
        android_url: getVersion.android_url,
        ios_url: getVersion.ios_url,
        version_name:getVersion.version_name
    }
   
    return $axios.post(url,data)
}