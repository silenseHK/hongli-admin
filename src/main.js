/*
 * @Descripttion:
 * @version:
 * @Author: voanit
 * @Date: 2020-05-12 10:59:05
 * @LastEditors: voanit
 * @LastEditTime: 2020-06-23 11:37:50
 */

import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "./store"
import "@/style/index.scss" // glob scss
import "./plugins/element.js"
import formatDate from "./utils/formatDate"
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.filter("formatDate", formatDate)
// import animated from 'animate.css'
import "./assets/font_qfueigoh4o/iconfont"
/* 
全局变量域名地址 
*/
import global from "./utils/global"
Vue.prototype.GLOBAL = global
Vue.prototype.layer = window.layer;

// Vue.use(animated)
// import SlideVerify from 'vue-monoplasty-slide-verify'

// Vue.use(SlideVerify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
