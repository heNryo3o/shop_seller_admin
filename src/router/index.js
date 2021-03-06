import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/apply',
    component: () => import('@/views/apply/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '江苏乐众管理后台',
        icon: 'dashboard',
        breadcrumb: false
      }
    }]
  }
]

export const asyncRoutes = [{
    path: '/store',
    component: Layout,
    name: 'Store',
    meta: {
      title: '店铺管理',
      icon: 'store',
      breadcrumb: false
    },
    children: [{
        path: 'store-list',
        component: () => import('@/views/store/store-list'),
        name: 'StoreList',
        meta: {
          title: '店铺基本信息'
        }
      },
      {
        path: 'product-list',
        component: () => import('@/views/store/product-list'),
        name: 'ProductList',
        meta: {
          title: '商品列表'
        }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'Account',
    meta: {
      title: '财务管理',
      icon: 'account',
      breadcrumb: false
    },
    children: [{
        path: 'order',
        component: () => import('@/views/account/order'),
        name: 'Order',
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'money',
        component: () => import('@/views/account/money'),
        name: 'Money',
        meta: {
          title: '收益明细'
        }
      },
      {
        path: 'cash',
        component: () => import('@/views/account/cash'),
        name: 'Cash',
        meta: {
          title: '提现申请'
        }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    name: 'Chat',
    meta: {
      title: '客服消息',
      icon: 'message',
      breadcrumb: false
    },
    children: [{
      path: 'chat',
      component: () => import('@/views/chat/chat'),
      name: 'Chat',
      meta: {
        title: '客服消息'
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
