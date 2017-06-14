import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)



const store = new Vuex.Store({
	state: {
		type:'all',
		rollDown:false,
		checkAside:false,
		user:JSON.parse(localStorage.getItem('userInfo')) || {},
		token:localStorage.getItem('token') || '',
		topics:{},
		replies:{},
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
		SET_CHECK_TOPICS(state,obj) {
			state.topics=obj;
			console.log(obj);
		},
		SET_CHECK_REPLIES(state,obj) {
			state.replies=obj;
			console.log(obj);
		}
	},
	actions: {

	}



})

export default store
