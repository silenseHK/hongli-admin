<template>
    <div>
        <div class="nav-right-2" v-if="tabList && tabList.length">
            <div class="towards-left" @click="scrollToLeft" title="向左滑">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="towards-middle">
                <div class="tab-title-box" @dblclick.stop="">
                    <div v-for="tab in tabList" :key="tab.id" :id=" 'tab' + tab.class_id " class="tab-title"
                         :class=" (tab.id == nativeTab.id ? 'tab-native' : '') "
                         @click="showTab(tab)"
                         draggable="true" @dragstart="is_drag = true; dragTab = tab"
                         @dragend="is_drag = false;">
                        <div class="tab-title-2">
                            <span :style=" tab.is_have_en ? 'font-weight: 400;' : '' ">{{tab.name}}</span>
                            <i class="el-icon-close" v-if="!tab.hide_close" @click.stop="closeTab(tab)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="towards-right" @click="scrollToRight" title="向右滑">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        name: "pageIndex",
        props: {},
        components: {

        },
        directives: {

        },
        data() {
            var homeTab = {
                id: 'home',	// 唯一标识
                name: '首页',
                // view: ()=> import('@/views/dashboard/index'),
                hide_close: true,	// 隐藏关闭键
                is_rend: true,
            };
            return {
                scrollX: 0,// 滚动条位置
                homeTab: homeTab,		// 主页tab
                rightTab: null,	// 右键正在操作的tab
                rightShow: false,	// 右键菜单是否正在显示
                rightStyle: {		// 卡片标题右键菜单的样式
                    left: '0px',		// 坐标x
                    top: '0px',			// 坐标y
                    maxHeight: '0px'	// 右键菜单的最高高度 (控制是否展开)
                },
                is_show_tabbar: true,		// 是否显示tab栏
                breMenuList: [homeTab],			// 面包屑导航栏的tab数据
                default_active: '/',	// 默认的高亮菜单id

            }
        },
        computed: {
            ...mapGetters(["tabList", "nativeTab"]),
        },
        watch: {
            nativeTab(val) {
                this.$nextTick(function () {
                    this.scrollToAuto(val);
                })
            }
        },
        mounted() {

        },
        methods: {
            // 关闭页面
            closeTab: function (tab, callFn) {
                // 如果tab为当前正在显示的tab, 则先不让它显示
                if (tab == this.nativeTab) {
                    var index = this.tabList.indexOf(tab);
                    var preTab = this.tabList[index - 1];
                    this.showTab(preTab);
                }
                // 开始从集合中移除
                this.arrayDelete(this.tabList, tab);
                // 如果有回调
                if (callFn) {
                    this.$nextTick(function () {
                        callFn();
                    })
                }
            },
            scrollToLeft: function () {
                let towardsMiddle = document.querySelector('.towards-middle');
                if (towardsMiddle.scrollLeft <= 0) {
                    // console.log('到头了')
                    return;
                }
                let step = 150;
                let timer = null;
                let animation = function(){
                    step -= 2;
                    towardsMiddle.scrollLeft -=  2;
                    if (step <= 0 && timer) {
                        clearInterval(timer);
                    }
                };
                timer = setInterval(animation, 1);
            },
            // 获取 Tab 根据 id
            getTabById: function (id) {
                for (let i = 0; i < this.tabList.length; i++) {
                    if (this.tabList[i].id == id) {
                        return this.tabList[i];
                    }
                }
                return null;
            },
            arrayDelete: function (arr, item) {
                var index = arr.indexOf(item);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            },
            // 在一个tab上, 初始化 view
            initTabView: function (tab) {
                // 如果已经初始化过了
                if (tab.is_init_view) {
                    return;
                }
                // 开始初始化
                tab.params = tab.params || {};	// 给参数一个默认值
                tab.is_rend = true;			// 是否显示, 利用此来强制刷新子组件
                return tab.is_init_view = true;
            },
            // 添加一个Tab  {id,name,url}
            addTab: function (tab) {
                tab.is_have_en = this.is_have_en(tab.name);	// 有英文字母的不能加字体加粗动画, 因为会影响tab选项卡的width尺寸, 造成动画混乱
                // tab.view = () => import('@/sa-view/HelloWorld.vue');
                this.initTabView(tab);
                this.tabList.push(tab);
                // this.addSlide(tab);
            },
            // 显示某个页面  (如果不存在, 则先添加)
            showTab: function (tab) {
                // 如果是当前正在显示的tab , 则直接 返回
                if (tab == this.nativeTab) {
                    return;
                }
                // 如果没有先添加
                if (this.getTabById(tab.id) == null) {
                    this.addTab(tab);
                } else {
                    this.$store.commit("pageIndex/setNativeTab", tab)
                }
                // 然后显示
                this.$nextTick(function () {
                    this.f5HashByNativeTab();
                });
                this.$store.commit('pageIndex/setNativeTab', tab);
                this.default_active = tab.id;	// 左边自动关联, 如果左边没有，则无效果

                // 归位一下
                this.$nextTick(function () {
                    this.scrollToAuto(tab);
                }.bind(this))
            },
            // 根据当前tab刷新一下锚链接
            f5HashByNativeTab: function () {
                // 如果非记住模式
                if (this.is_reme_open == false) {
                    return;
                }
                location.hash = this.nativeTab.id;
            },
            // 自动归位
            scrollToAuto: function (tab) {
                // console.log('自动归位');
                let tabDom = document.querySelector('#tab' + tab.class_id);
                tabDom.scrollIntoView({inline:"center"});
            },
            // 视角向右滑动一段距离
            scrollToRight: function () {
                let towardsMiddle = document.querySelector('.towards-middle');
                let tabTitleBox = document.querySelector('.tab-title-box');	// 视角宽度
                if (towardsMiddle.scrollLeft + towardsMiddle.clientWidth  >= tabTitleBox.clientWidth) {
                    // console.log('到头了')
                    return;
                }
                let step = 0;
                let timer = null;
                let animation = function(){
                    step += 2;
                    towardsMiddle.scrollLeft += 2;
                    if (step > 150 && timer) {
                        clearInterval(timer);
                    }
                };
                timer = setInterval(animation, 1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .nav-right-2 {
        margin-left: 200px;
    }

    .nav-right-2, .nav-right-bre {
        height: 35px;
        position: relative;
        z-index: 110;
        box-shadow: 0 2px 2px #CCC;
    }

    .nav-right-2 > div {
        height: 100%;
        position: absolute;
    }

    .nav-right-bre {
        line-height: 35px;
        padding-left: 1em;
        background-color: #FFF;
        cursor: pointer;
        display: none;
    }

    .nav-right-bre .el-breadcrumb__item {
        line-height: 35px;
        font-size: 13px;
    }

    /* .nav-right-bre .el-breadcrumb__item:hover{cursor: pointer; text-decoration: underline;} */

    .nav-right-2 .towards-left, .nav-right-2 .towards-right {
        width: 24px;
        text-align: center;
        background-color: #FFF;
        cursor: pointer;
        line-height: 35px;
    }

    .nav-right-2 .towards-left {
        border-right: 1px #eee solid;
    }

    .nav-right-2 .towards-right {
        border-left: 1px #eee solid;
        right: 0px;
    }

    .nav-right-2 .towards-left:hover i, .nav-right-2 .towards-right:hover i {
        font-size: 1.1em;
        font-weight: bold;
    }

    .nav-right-2 .towards-middle {
        width: calc(100% - 25px);
        overflow: auto;
        left: 25px;
        background-color: #EEE;
        transition: all .3s;
    }
    .nav-right-2 .towards-middle::-webkit-scrollbar {
        display: none;
    }

    .nav-right-2 .tab-title-box {
        position: absolute;
        left: 0px;
        display: block;
        transition: all 0.2s;
        white-space: nowrap;
        display: flex;
        justify-content: left;
        padding-right: 500px;
    }

    .nav-right-2 .tab-title {
        font-size: 13px;
        cursor: pointer;
        float: left;
        transition: all 0.15s;
        white-space: nowrap;
        overflow: hidden;
        text-decoration: none;
        color: #333;
        display: inline-block;
    }

    .nav-right-2 .tab-title-2 {
        padding: 0px 10px;
        height: 35px;
        margin-right: 1px;
        background-color: #FFF;
        line-height: 35px;
    }

    .nav-right-2 .tab-title-2 {
        transition: padding 0.1s, margin 0.1s;
    }

    /*.nav-right-2 .tab-title-2{border-bottom: 1px solid #2D8CF0}*/
    .nav-right-2 .tab-title-2 * {
        transition: all 0.0s;
    }

    /* .tab-title .el-icon-caret-right{color: #EEE; font-size: 1.7em; position: relative; top: 4px;} */
    .nav-right-2 .tab-title .el-icon-close {
        display: inline-block;
        border-radius: 50%;
        padding: 1px;
        color: #ccc;
        margin-left: -4px;
    }

    .nav-right-2 .tab-title .el-icon-close:hover {
        color: red;
        font-weight: bold
    }

    .nav-right-2 .tab-title span {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
    }

    .nav-right-2 .tab-title:hover span, .nav-right-2 .tab-native span {
        font-weight: bold;
        color: #2D8CF0;
    }

    .nav-right-2 .tab-title:hover span, .nav-right-2 .tab-native {
        color: #2D8CF0;
    }
</style>