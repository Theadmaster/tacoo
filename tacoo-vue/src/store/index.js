import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'
import menu from './modules/menu'
import dict from './modules/dict'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        dict
    },
    getters
})

export default store