import Vue from 'vue'
import Vuex from 'vuex'

// 数据源
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.store({
    state,
    mutations,
    actions
})
