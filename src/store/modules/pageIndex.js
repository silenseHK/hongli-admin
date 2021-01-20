/*
 * page index
 */
const state = {
    tabList: [],
    nativeTab: null
};
// 获取 Tab 根据 id
const getTabById = function(id) {
    for (var i = 0; i < state.tabList.length; i++) {
        if(state.tabList[i].id == id) {
            return i;
        }
    }
    return false;
};

const mutations = {
    addTab(state, payload) {
        let findIndex = getTabById(payload.id);
        payload.class_id = payload.id.replaceAll('/','_')
        if (findIndex === false) {
            state.tabList.push(payload);
        }
        state.nativeTab = payload;
    },
    setNativeTab(state, payload){
        state.nativeTab = payload;
    }
}
export default {
    namespaced: true,
    state,
    mutations
}