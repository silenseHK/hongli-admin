import Vue from "vue"
import Router from "vue-router"
import store from "@/store"

Vue.use(Router)

import Layout from "@/layout"
// import NavTest from './modules/nav-test'
import { Message } from "element-ui"
import getTitle from "@/utils/getTitle"

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
    meta: { title: "登录页" },
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
    hidden: true,
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/dashbord",
    children: [
      {
        path: "dashbord",
        name: "Dashbord",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "仪表盘", icon: "el-icon-s-data" },
      },
    ],
  },
  {
    path: "/personal",
    name: "Personal",
    component: Layout,
    redirect: "/personal/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "Personal-index",
        component: () => import("@/views/personal"),
        meta: { title: "个人中心" },
      },
    ],
  },
  {
    path: "/types",
    component: Layout,
    name: "/account/list",
    redirect: "/types/index",
    hidden: true,
    children: [
      {
        path: "/types/index",
        name: "/account/list",
        component: () => import("@/views/types"),
        meta: { title: "404", icon: "el-icon-s-release" },
      },
    ],
  },
  {
    path: "/ordertype",
    component: Layout,
    name: "/account/list",
    redirect: "/ordertype/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "/account/list",
        component: () => import("@/views/orderList/OrderType"),
        meta: { title: "404", icon: "el-icon-s-release" },
      },
    ],
  },
]
/*动态添加routers*/
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   name: '/role/findAll',
  //   component: Layout,
  //   redirect: '/permission/page-use',
  //   meta: {
  //     title: '分类列表',
  //     icon: 'el-icon-lock'
  //   },
  //   children: [
  //     {
  //       path: 'page-user',
  //       name: '/role/findAll',
  //       component: () => import('@/views/permission'),
  //       meta: { title: '用户页面', icon: 'el-icon-user-solid' }
  //     },

  //   ]
  // },
  {
    path: "/admin",
    name: "/admin/findAll",
    component: Layout,
    redirect: "/admin/index",
    children: [
      {
        path: "index",
        name: "/admin/findAll",
        component: () => import("@/views/administrators/Administrators"),
        meta: { title: "管理员管理", icon: "el-icon-user-solid" },
      },
    ],
  },
  {
    path: "/banner",
    name: "/banner/index",
    component: Layout,
    redirect: "/banner/index",
    children: [
      {
        path: "index",
        name: "/admin/findAll",
        component: () => import("@/views/banner/index"),
        meta: { title: "banner管理", icon: "el-icon-user-solid" },
      },
    ],
  },
  {
    path: "/roles",
    component: Layout,
    name: "/role/findAll",
    redirect: "/roles/index",
    children: [
      {
        path: "index",
        name: "/role/findAll",
        component: () => import("@/views/role/Role"),
        meta: { title: "角色管理", icon: "el-icon-user" },
      },
    ],
  },
  {
    path: "/right",
    component: Layout,
    name: "/right/findAll",
    redirect: "/right/index",
    children: [
      {
        path: "index",
        name: "/right/findAll",
        component: () => import("@/views/jurisdiction/jurisdiction"),
        meta: { title: "权限管理", icon: "el-icon-unlock" },
      },
    ],
  },
  {
    path: "/shareCode",
    component: Layout,
    name: "/shareCode/index",
    redirect: "/shareCode/index",
    noCache: true,
    children: [
      {
        path: "index",
        name: "/shareCode/index",
        component: () => import("@/views/shareCode"),
        meta: { title: "邀请管理", icon: "el-icon-picture-outline" },
      },
    ],
  },
  {
    path: "/bankcard",
    component: Layout,
    name: "/bankcard/findAll",
    redirect: "/bankcard/index",
    children: [
      {
        path: "index",
        name: "/bankcard/findAll",
        component: () => import("@/views/bankCard"),
        meta: { title: "银行卡信息", icon: "el-icon-bank-card" },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    name: "/product/search",
    redirect: "/product/index",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "index",
        name: "/product/search",
        component: () => import("@/views/product/index"),
        meta: { title: "商品列表", icon: "el-icon-goods" },
      },
      {
        path: "orders",
        name: "/product/search",
        component: () => import("@/views/product/orders"),
        meta: { title: "商品订单", icon: "el-icon-s-order" },
      }
    ],
  },
  {
    path: "/myPerformance",
    component: Layout,
    name: "/Performance/findAll",
    redirect: "/myPerformance/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "/Performance/findAll",
        component: () => import("@/views/myPerformance"),
        meta: { title: "业绩统计", icon: "el-icon-bank-card" },
      },
    ],
  },
  {
    path: "/journal",
    component: Layout,
    name: "/journal/index",
    redirect: "/journal/index",
    children: [
      {
        path: "index",
        name: "/journal/index",
        component: () => import("@/views/journal"),
        meta: { title: "操作日志", icon: "el-icon-document" },
      },
    ],
  },
  {
    path: "/staffBankCard",
    component: Layout,
    name: "/staffBankCard/index",
    redirect: "/staffBankCard/index",
    children: [
      {
        path: "index",
        name: "/staffBankCard/index",
        component: () => import("@/views/staffBankCard"),
        meta: { title: "银行卡信息", icon: "el-icon-bank-card" },
      },
    ]
  },
  {
    path: "/user/details",
    component: Layout,
    hidden: true,
    name: "/user/findAll",
    rediret: "/user/details",
    children: [
      {
        path: "/user/details",
        name: "/user/findAll",
        component: () => import("@/views/user/components/BalanceTable"),
        meta: { title: "资金详情", icon: "el-icon-s-order" },
      },
    ],
  },
  {
    path: "/staffUser/details",
    component: () => import("@/views/staffUser/components/BalanceTable"),
    hidden: true,
    name: "/staffUser/findAll",
    meta: { title: "资金详情", icon: "el-icon-s-order" }
  },
  //
  {
    path: "/staffGroupLeaderOperationManage",
    component: Layout,
    name: "/staffOperationManage/findAll",
    meta: { title: "员工管理", icon: "el-icon-s-custom" },
    children: [
      {
        path: "index",
        name: "/staffOperationManage/index",
        component: () => import("@/views/groupLeaderOperationManage/index"),
        meta: { title: "员工运营数据", icon: "el-icon-s-custom" },
      },
      {
        path: "account",
        name: "/staffAccount/list",
        component: () => import("@/views/account/index"),
        meta: {
          title: "员工账号管理",
          icon: "el-icon-star-on",
        },
      }
    ],
  },
  //
  {
    path: "/groupLeaderOperationManage",
    component: Layout,
    name: "/groupLeaderOperationManage/findAll",
    redirect: "/groupLeaderOperationManage/index",
    meta: { title: "组长管理", icon: "el-icon-s-custom" },
    children: [
      {
        path: "groupLeaderOperationData",
        name: "/groupLeaderOperationData/index",
        component: () => import("@/views/groupLeaderOperationData/index"),
        meta: {
          title: "组长运营数据",
          icon: "el-icon-s-data",
        },
      },
      {
        path: "groupLeaderAccount",
        name: "/groupLeaderAccount/index",
        component: () => import("@/views/groupLeaderAccount"),
        meta: {
          title: "组长账号管理",
          icon: "el-icon-star-on",
        }
      },
    ],
  },
  {
    path: "/staffUser",
    component: Layout,
    name: "/staffUser/findAll",
    redirect: "/staffUser/index",
    meta: { title: "运营管理", icon: "el-icon-s-custom" },
    children: [
      {
        path: "index",
        name: "/staffUser/list",
        component: () => import("@/views/staffUser"),
        meta: { title: "用户列表", icon: "el-icon-s-custom" },
      },

      {
        path: "staffFirst-stroke",
        name: "/staffCharge/list",
        component: () => import("@/views/staffFirstStroke"),
        meta: { title: "首充列表", icon: "el-icon-s-order" },
      },
      {
        path: "staffPlace-order",
        name: "/staffMember/order",
        component: () => import("@/views/staffPlaceOrderList"),
        meta: { title: "会员下单信息", icon: "el-icon-s-shop" }
      }
    ],
  },
  {
    path: "/user",
    component: Layout,
    name: "/user/findAll",
    redirect: "/user/index",
    meta: { title: "用户管理", icon: "el-icon-s-custom" },
    children: [
      {
        path: "index",
        name: "/user/list",

        component: () => import("@/views/user"),
        meta: { title: "用户列表", icon: "el-icon-s-custom" },
      },

      {
        path: "first-stroke",
        name: "/charge/list",
        component: () => import("@/views/firstStroke"),

        meta: { title: "首充列表", icon: "el-icon-s-order" },
      },
      {
        path: "place-order",
        name: "/member/order",
        component: () => import("@/views/placeOrder"),
        meta: { title: "会员下单信息", icon: "el-icon-s-shop" },
      },
    ],
  },

  // {
  //   path: "/news",
  //   component: Layout,
  //   name: "/news/findAll",
  //   redirect: "/news/index",

  //   children: [
  //     {
  //       path: "index",
  //       name: "/news/findAll",
  //       component: () => import("@/views/Information/Information"),
  //       meta: { title: "资讯列表", icon: "el-icon-news" },
  //     },
  //     {
  //       path: "news-add",
  //       name: "/news/findAll",
  //       hidden: true,
  //       component: () => import("@/views/Information/components/newsAdd.vue"),
  //       meta: { title: "资讯列表", icon: "el-icon-news" },
  //     },
  //     {
  //       path: "news-update",
  //       name: "/news/findAll",
  //       hidden: true,
  //       component: () =>
  //         import("@/views/Information/components/updateNews.vue"),
  //       meta: { title: "资讯列表", icon: "el-icon-news" },
  //     },

  //   ],
  // },

  /**
   * 财务信息
   */
  {
    path: "/staffFinancial",
    component: Layout,
    name: "/staffFinancial/findAll",
    redirect: "/staffFinancial/index",
    meta: {
      title: "财务信息",
      icon: "el-icon-s-claim",
    },
    children: [
      {
        path: "staffRecharge-list",
        name: "/staffRecharge/list",
        component: () => import("@/views/staffRecharge"),
        meta: { title: "充值列表", icon: "el-icon-notebook-2" },
      },
      {
        path: "staffFinancial",
        name: "/staffWithdraw/list",
        component: () => import("@/views/staffFinancial"),
        meta: { title: "提现列表", icon: "el-icon-document-checked" },
      },
      {
        path: "staffCommission-list",
        name: "/staffCommission/lists",
        component: () => import("@/views/staffCommission"),
        meta: { title: "分佣列表", icon: "el-icon-s-cooperation" },
      },
      {
        path: "staffFission-list",
        name: "/staffFission/list",
        component: () => import("@/views/staffFission"),
        meta: { title: "裂变红包任务", icon: "el-icon-present" },
      },
      {
        path: "staffSign-list",
        name: "/staffSign/package",
        component: () => import("@/views/staffSign"),
        meta: { title: "签到礼包", icon: "el-icon-tickets" },
      },
      {
        path: "staffBonus-list",
        name: "/staffBonus/list",
        component: () => import("@/views/staffBonusList"),
        meta: { title: "赠金记录", icon: "el-icon-tickets" },
      },
      {
        path: "staffUpdown-list",
        name: "/staffUpdown/list",
        component: () => import("@/views/staffUpdown"),
        meta: { title: "上下分列表", icon: "el-icon-tickets" },
      },
    ],
  },
  {
    path: "/financial",
    component: Layout,
    name: "/place/findAll",
    redirect: "/financial/index",
    meta: {
      title: "财务信息",
      icon: "el-icon-s-claim",
    },
    children: [
      {
        path: "recharge-list",
        name: "/recharge/list",
        component: () => import("@/views/recharge"),
        meta: { title: "充值列表", icon: "el-icon-notebook-2" },
      },
      {
        path: "financial",
        name: "/withdraw/list",
        component: () => import("@/views/financial"),
        meta: { title: "提现列表", icon: "el-icon-document-checked" },
      },
      // {
      //   path: "support-list",
      //   name: "/commission/list",
      //   component: () => import("@/views/support"),
      //   meta: { title: "提佣列表", icon: "el-icon-document-remove" },
      // },
      {
        path: "commission-list",
        name: "/commission/lists",
        component: () => import("@/views/commission"),
        meta: { title: "分佣列表", icon: "el-icon-s-cooperation" },
      },
      {
        path: "fission-list",
        name: "/fission/list",
        component: () => import("@/views/fission"),
        meta: { title: "裂变红包任务", icon: "el-icon-present" },
      },
      {
        path: "sign-list",
        name: "/signin/package",
        component: () => import("@/views/sign"),
        meta: { title: "签到礼包", icon: "el-icon-tickets" },
      },
      {
        path: "bonus-list",
        name: "/bonus/list",
        component: () => import("@/views/bonusList"),
        meta: { title: "赠金记录", icon: "el-icon-tickets" },
      },
      {
        path: "upanddown-list",
        name: "/upanddown/list",
        component: () => import("@/views/upadndown"),
        meta: { title: "上下分列表", icon: "el-icon-tickets" },
      },
    ],
  },
  {
    path: "/staffOrderList",
    component: Layout,
    name: "/staffOrderList/findAll",
    redirect: "/staffOrderList/index",
    noCache: true,
    meta: {
      title: "订单信息",
      icon: "el-icon-shopping-bag-1",
    },
    children: [
      {
        path: "staffOrder-list",
        name: "/staffOrderList/lists",
        component: () => import("@/views/staffOrderList"),
        meta: { title: "订单列表", icon: "el-icon-s-order" },
      },
    ],
  },
  {
    path: "/activity",
    component: Layout,
    name: "/order/findAll",
    redirect: "/activity/index",
    noCache: true,
    meta: {
      title: "订单信息",
      icon: "el-icon-shopping-bag-1",
    },
    children: [
      {
        noCache: true,
        path: "index",
        name: "/active/lists",
        component: () => import("@/views/activity"),
        meta: { title: "活动列表", icon: "el-icon-tickets" },
      },
      {
        path: "order-list",
        name: "/order/lists",
        component: () => import("@/views/orderList"),
        meta: { title: "订单列表", icon: "el-icon-s-order" },
      },
    ],
  },
  //统计报表
  {
    path: "/staffReport",
    component: Layout,
    name: "/staffReport/findAll",
    redirect: "/staffReport/index",
    meta: {
      title: "统计报表",
      icon: "el-icon-s-marketing",
    },
    children: [
      {
        path: "index",
        name: "/staffDay/difference",
        component: () => import("@/views/staffStatistical"),
        meta: {
          title: "会员当日利差",
          icon: "el-icon-s-data",
        },
      }
    ],
  },
  {
    path: "/report",
    component: Layout,
    name: "/report/findAll",
    redirect: "/report/index",
    meta: {
      title: "统计报表",
      icon: "el-icon-s-marketing",
    },
    children: [
      {
        path: "index",
        name: "/day/difference",
        component: () => import("@/views/statistical"),
        meta: {
          title: "会员当日利差",
          icon: "el-icon-s-data",
        },
      },
      {
        path: "performance-list",
        name: "/customer/service",
        component: () => import("@/views/performance"),
        meta: {
          title: "代理业绩报表",
          icon: "el-icon-data-line",
        },
      },
    ],
  },
  //系统管理
  {
    path: "/system",
    component: Layout,
    name: "/system/findAll",
    redirect: "/system/index",
    meta: {
      title: "系统管理",
      icon: "el-icon-s-tools",
    },
    children: [
      {
        path: "config-list",
        name: "/system/configuration",
        component: () => import("@/views/configuration"),
        meta: {
          title: "系统配置",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "regulationManage",
        name: "/regulationManage/index",
        component: () => import("@/views/regulationManage"),
        meta: {
          title: "规则配置",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: 'rechargeWithdraw',
        name: '/rechargeWithdraw/index',
        component: () => import("@/views/rechargeWithdraw"),
        meta: { title: "充值提现管理", icon: "el-icon-coin" }
      },
      {
        path: "setId",
        name: "/setId/index",
        component: () => import("@/views/setId"),
        meta: {
          title: "角色配置",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "h5Window",
        name: "/h5Window/index",
        component: () => import("@/views/h5Window"),
        meta: {
          title: "h5弹窗文本配置",
          icon: "el-icon-edit",
        },
      },
      {
        path: "whitelist-list",
        name: "/ip/lists",
        component: () => import("@/views/whitelist"),
        meta: {
          title: "IP白名单配置",
          icon: "el-icon-mobile",
        },
      }
    ],
  },

  {
    path: "/error",
    component: Layout,
    name: "Error",
    redirect: "/error/404",
    // children: [
    //   {
    //     path: '404',
    //     name: 'Page404',
    //     component: () => import('@/views/error-page/404'),
    //     meta: { title: '404', icon: 'el-icon-s-release' }
    //   }
    // ]
  },
  // {
  //   path: 'https://github.com/gcddblue/vue-admin-webapp',
  //   name: 'Github',
  //   meta: { icon: 'el-icon-link', title: '项目链接' }
  // },
  // NavTest,
  {
    path: "*",
    name: "*404",
    redirect: "/404",
    hidden: true,
  },
]
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 }
    },
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

// 导航守卫
// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  if (to.path === "/login") {
    next()
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch("user/_getInfo")
          // console.log('roles--->',roles)
          const addRoutes = await store.dispatch(
            "permission/getAsyncRoutes",
            roles
          )
          // console.log('addRoutes--->',addRoutes)
          router.addRoutes(addRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error)
        }
      }
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      })
    }
  }
})
export default router
