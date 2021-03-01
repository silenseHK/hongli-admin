import $axios from "./index"

/**
 * 获取下注提醒用户列表
 */
export const noticeUser = (size, page, user_id=0, phone='') => {
    const url = `/betting/noticeList?size=${size}&page=${page}&user_id=${user_id}&phone=${phone}`
    return $axios.get(url)
}

/**
 * 获取下注提醒用户下注列表
 */
export const noticeUserBetting = (size, page, user_id, type, sort) => {
    const url = `/betting/noticeBettingList?size=${size}&page=${page}&user_id=${user_id}&sort=${sort}&type=${type}`
    return $axios.get(url)
}