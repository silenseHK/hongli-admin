import $axios from "./index"

/**
 * 获取填过的h5弹窗信息
 */
export const getH5WindowInfo = () => {
    return $axios.get('/system/h5Alert')
}
/**
 * 提交h5弹窗信息
 */
export const submitH5WindowInfo = (params) => {
    return $axios.post('/system/h5Alert',params)
}
