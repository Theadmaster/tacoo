import { getMenuTree } from '@/api/menu'

/**
 * 生成菜单树
 *
 * @param {Array} menus 菜单列表
 */
const generateMenuTree = (menus, pid = 0) => {
  return menus.filter(menu => menu.pid === pid).map(menu => {
    switch (menu.type) {
      case 1: {
        const children = generateMenuTree(menus, menu.id)
        // 如果是页面，则再添加一个查看权限
        const viewPerm = {
          name: '查看',
          pid: menu.id,
          _id: menu.id,
          id: menu.id,
          type: 2,
          childrenIds: children.map(({ id }) => id)
        }
        return {
          ...menu,
          _id: menu.id,
          id: undefined,
          children: [viewPerm].concat(children)
        }
      }
      case 2:
        return {
          ...menu,
          _id: menu.id
        }
      case 0: default: {
        const children = generateMenuTree(menus, menu.id)
        return {
          ...menu,
          _id: menu.id,
          // 修复叶子节点为目录时，设置权限中无法正常显示已有权限的BUG
          id: children.length !== 0 ? undefined : menu.id,
          children
        }
      }
    }
  })
}

const state = {
  menuTree: []
}

const mutations = {
  SET_MENU_TREE: (state, menuTree) => {
    state.menuTree = menuTree
    // console.log(menuTree);
    
  }
}

const actions = {
  getMenuTree({ commit }) {
    getMenuTree().then(({ data }) => {
      commit('SET_MENU_TREE', data)
    }).catch(() => {})
  },

  // updateMenuTree({ commit }, list) {
  //   commit('SET_MENU_TREE', generateMenuTree(list))
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

