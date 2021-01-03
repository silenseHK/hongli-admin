import $axios from './index'
// 获取推荐数据
export function getInvitationCodeData() {
    return $axios.get('/agent/inviteInfo')
}