
const state = {
    roleOptions: [],
}

const mutations = {
    SET_ROLEOPTIONS: (state, data) => {
        state.roleOptions = data
    }
}

const actions = {
    // role
    setRole({ commit }, payload) {
        commit('SET_ROLEOPTIONS', payload)
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}