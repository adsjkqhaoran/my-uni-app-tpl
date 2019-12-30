import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import common from './modules/common.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	namespaced: true,
	state: {
	},
	mutations: {
	},
	modules: {
		common,
		user
	}
})
export default store