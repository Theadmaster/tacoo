/**
 * 异步路由，必须指定component
 *
 * 由于异步路由在后台生成，此处对象的Key值为菜单表中Compontent字段
 */
 export const asyncRoutes = {
    // Layout: {
    //   component: () => import('@/layout'),
    //   isLayout: true
    // },
    User: {
      name: 'User',
      component: () => import('@/views/base/user')
    },
    Role: {
      name: 'Role',
      component: () => import('@/views/base/role')
    },
    Menu: {
      name: 'Menu',
      component: () => import('@/views/base/menu')
    },
    Dict: {
      name: 'Dict',
      component: () => import('@/views/base/dict')
    }
  }
  