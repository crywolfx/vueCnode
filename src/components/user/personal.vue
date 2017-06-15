<template>
<transition name="fade">
	<div class="personal">
		<vheader></vheader>
		<div class="user">
			<img :src="[userInfo.avatar_url ? userInfo.avatar_url : 'http://orbmbw2o7.bkt.clouddn.com/CNode.svg']" alt="">
			<div class="username">
				<span>昵称:{{userInfo.loginname}}</span>
				<span>积分:{{userInfo.score}}</span>
			</div>
		</div>
		<ul class="related">
			<li @click="checkTopics(userInfo.recent_topics)"><span class="related-icon create"></span><span class="related-text">创建话题</span></li>
			<li @click="checkTopics(userInfo.recent_replies)"><span class="related-icon join"></span><span class="related-text">参与话题</span></li>
			<li @click="checkCollect"><span class="related-icon collect"></span><span class="related-text">收藏话题</span></li>
			<li @click="checkMsg"><span class="related-icon msg"></span><span class="related-text">未读消息({{msgCount}})</span></li>
		</ul>
	</div>
</transition>
</template>
<script>
import header from './header'
import axios from 'axios'
import api from '../../api/index'
export default{
	name:'personal',
	data() {
		return {
			userInfo:{},
			msgCount:'',
		}
	},
	components:{
		vheader:header,
	},
	computed:{
		user() {
			return this.$store.state.user;
		},
		checkTopic() {
			return this.$store.state.checkTopic;
		},
		token() {
			return this.$store.state.token;
		}
	},
	beforeRouteEnter(to,from,next) {
		next(vm=>{
			if(!vm.user.loginname){
				vm.userInfo={};
				return false;
			}
			vm.getUser(vm.user.loginname);
			if(vm.token){
				vm.getMsgCount(vm.token);
			}
		})
	},
	methods: {
		getUser(loginname) {
			axios.get(api.personal(loginname)).then(res=>{
				if(res.data.success){
					this.userInfo=res.data.data;
				}
			})
		},
		getMsgCount(token) {
			axios.get(api.getMsgCount(),{
				params:{
					accesstoken:token,
				}
			}).then(res=>{
				if(res.data.success){
					this.msgCount=res.data.data;
				}
			})
		},
		checkLogin() {
			if(!this.userInfo.loginname){
				this.$router.push({name:'login'});
				return false;
			}else{
				return true;
			}
		},
		checkTopics(type) {
			if(!this.checkLogin()){
				return;
			}
			this.$store.commit('SET_USER_TOPICS',type);
			localStorage.setItem('userTopics',JSON.stringify(type));
			this.$router.push({
  						name:'pertopic',
  					});
		},
		checkCollect() {
			if(!this.checkLogin()){
				return;
			}
			this.$router.push({
  						name:'percollect',
  					});
		},
		checkMsg() {
			if(!this.checkLogin()){
				return;
			}
			this.$router.push({
				name:'permsg',
			})
		}
	}
}
	

</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all .2s ease-in-out;
}
.fade-leave-active {
  transition: all .2s ease-in-out;
}
.fade-enter, .fade-leave-active {
  transform: translateX(100%);
  opacity: 0;
}
	.personal{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #F2F4F7;
		.user{
			margin-top: 0.25rem;
			box-shadow: 0 -2px 2px rgba(213,215,217,.8),
						0 2px 2px rgba(213,215,217,.8);
			height: 150px;
			background: #fff;
			img{
				width: 100px;
				position: relative;
				left: 50%;
				margin-left: -50px;
				margin-top: 10px;
				border-radius: 50%;
			}
			.username{
					height:40px;
					line-height: 40px;
					text-align: center;
					font-size: 18px;
					color:#757575;
					span{
						padding: 0 8px;
					}
				}
		}
		.related{
			margin-top: 0.25rem;
			box-shadow: 0 -2px 2px rgba(213,215,217,.8),
						0 2px 2px rgba(213,215,217,.8);
			background: #fff;
			li{
				height: 1.2rem;
				display: flex;
				.related-icon{
					height: 1.2rem;
					width: 1.2rem;
					float: left;
				}
				.create{
					background: url("../../assets/svg/create.svg") no-repeat 50% 50%;
					background-size:55%;
				}
				.join{
					background: url("../../assets/svg/join.svg") no-repeat 50% 50%;
					background-size:55%;
				}
				.collect{
					background: url("../../assets/svg/collect2.svg") no-repeat 50% 50%;
					background-size:55%;
				}
				.msg{
					background: url("../../assets/svg/message.svg") no-repeat 50% 50%;
					background-size:55%;
				}

				.related-text{
					height: 1.2rem;
					flex:1;
					line-height:1.2rem;
					font-size: 16px;
					color: #B9B9B9;
					border-bottom: 1px solid #E9E9E9;
				}
			}
		}
	}

</style>