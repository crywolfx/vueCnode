const _baseUrl = 'https://cnodejs.org/api/v1'
export default{
	getTopics(tab,page,limit) {
		return `${_baseUrl}/topics?tab=${tab}&page=${page}&limit=${limit}`;
	},
	getTopic(id){
		return `${_baseUrl}/topic/${id}`;
	},
	login() {
		return `${_baseUrl}/accesstoken`;
	},
	personal(loginname) {
		return `${_baseUrl}/user/${loginname}`;
	}
}