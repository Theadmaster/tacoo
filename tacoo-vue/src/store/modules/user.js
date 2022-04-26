import { login, logout, getInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'



const state = {
    token: getToken(),
    name: '',
    avatar: '',
    user: {},
    menu: [],
    role: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
    REMOVE_TOKEN: (state) => {
        state.token = null
        state.name = null
        state.avatar = null
        removeToken()
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERINFO: (state, userinfo) => {
        state.user = userinfo
    },
    SET_MENU: (state, menu) => {
        state.menu = menu
    },
    SET_ROLE: (state, role) => {
        state.role = role
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then((res) => {
                console.log(res);
                if(res.status === 1) return reject(err)
                const token = res.token
                commit('SET_TOKEN', token)
                commit('SET_NAME', res.data.username)
                commit('SET_AVATAR', res.data.user_picture)
                commit('SET_USERINFO', res.data)
                commit('SET_MENU', res.data.menu)
                commit('SET_ROLE', res.data.roleId)
                resolve(res.message)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}