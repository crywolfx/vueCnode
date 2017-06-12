import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)



const store = new Vuex.Store({
	state: {
		type:'all',
		rollDown:false,
	},
	mutations: {
		SET_TYPE(state,type) {
			state.type=type;
		},
		SET_ROLLDOWN(state,bool) {
			state.rollDown=bool;
		}
	},
	actions: {

	}



})

export default store
