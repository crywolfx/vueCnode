import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)



const store = new Vuex.Store({
	state: {
		type:'all',
		rollDown:false,
		checkAside:false,
		user:localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo')) || {},
		token:localStorage.getItem('token') || '',
		userTopics:localStorage.getItem('userTopics')&&JSON.parse(localStorage.getItem('userTopics')) || {},
	},
	mutations: {
		SET_TYPE(state,type) {
			state.type=type;
		},
		SET_ROLLDOWN(state,bool) {
			state.rollDown=bool;
		},
		CHECK_ASIDE(state,bool) {
			state.checkAside=bool;
		},
		SET_USER(state,user) {
			state.user=user;
		},
		SET_TOKEN(state,token) {
			state.token=token;
		},
		SET_USER_TOPICS(state,obj) {
			state.userTopics=obj;
		},
	},
	actions: {

	}



})

export default store
