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
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'user',
      breadcrumb: false
    },
    children: [{
        path: 'user-list',
        component: () => import('@/views/user/user-list'),
        name: 'UserList',
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'user-log',
        component: () => import('@/views/user/user-log'),
        name: 'UserLog',
        meta: {
          title: '登录注册日志'
        }
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    name: 'Store',
    meta: {
      title: '商家管理',
      icon: 'store',
      breadcrumb: false
    },
    children: [{
        path: 'store-list',
        component: () => import('@/views/store/store-list'),
        name: 'StoreList',
        meta: {
          title: '商家列表'
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
    path: '/admin',
    component: Layout,
    name: 'Admin',
    meta: {
      roles: ['admin', 'role', 'permission'],
      title: '员工管理',
      icon: 'admin',
      breadcrumb: false
    },
    children: [{
        path: 'admin',
        component: () => import('@/views/admin/admin'),
        name: 'AdminList',
        meta: {
          roles: ['admin'],
          title: '管理员'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'Role',
        meta: {
          roles: ['role'],
          title: '角色管理'
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/admin/permission'),
        name: 'Permission',
        meta: {
          roles: ['permission'],
          title: '权限管理'
        }
      }
    ]
  },

  {
    path: '/push',
    component: Layout,
    name: 'Push',
    meta: {
      title: '消息通知',
      icon: 'message',
      breadcrumb: false
    },
    children: [{
        path: 'template-list',
        component: () => import('@/views/push/template-list'),
        name: 'TemplateList',
        meta: {
          title: '消息模版'
        }
      },
      {
        path: 'push-logs',
        component: () => import('@/views/push/push-logs'),
        name: 'PushLogs',
        meta: {
          title: '推送日志'
        }
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'setting',
      breadcrumb: false
    },
    children: [{
        path: 'base',
        component: () => import('@/views/system/base'),
        name: 'Base',
        meta: {
          title: '基本设置'
        }
      },
      {
        path: 'areas',
        component: () => import('@/views/system/areas'),
        name: 'Roles',
        meta: {
          title: '地区管理'
        }
      },
      {
        path: 'category',
        component: () => import('@/views/system/category'),
        name: 'Category',
        meta: {
          title: '分类管理'
        }
      },
      {
        path: 'file',
        component: () => import('@/views/system/file'),
        name: 'File',
        meta: {
          title: '文件上传记录'
        }
      }
    ]
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
