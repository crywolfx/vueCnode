<template>
<transition name="fade">
	<div class="login">
		<vheader></vheader>
		<div class="login-content">
			<img src="../../assets/svg/CNode.svg" alt="">
			<input type="text" v-model="token" placeholder="请输入token验证登录">
			<div class="go-login" @click="goLogin">点击登录</div>
		</div>	
	</div>
</transition>
</template>
<script>
import axios from 'axios'
import api from '../../api/index'
import header from './header'
	export default{
		name:'login',
		data() {
			return {
				token:'',
			}
		},
		components:{
			vheader:header,
		},
		watch: {
		},
		methods: {
			goLogin() {
				if(!this.token.trim()){
					return;
				}
				axios.post(api.login(),{
					accesstoken:this.token,
				})
				.then(res=>{
					if(res.data.success){
						this.$store.commit("SET_USER",res.data);
						this.$store.commit("SET_TOKEN",this.token);
						localStorage.setItem('userInfo', JSON.stringify(res.data));
						localStorage.setItem('token', this.token);
						this.$store.commit('SET_TOAST',{
							isShow:true,
							content:'登录成功',
							duration:1000,
						})
						this.$router.go(-1);
					}
				}).catch(()=>{
					this.$store.commit('SET_TOAST',{
						isShow:true,
						content:'登录失败',
						duration:1000,
					})
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
.login{
	height: 100%;
	width: 100%;
	background: #444;
	position: absolute;
	.header{
		width: 1.4rem;
		height: 1.4rem;
		background: url("../../assets/svg/off.svg") no-repeat 50% 50%;
		background-size: 40%;
	}
	.login-content{
		img{
			width: 3rem;
			position: relative;
			left: 50%;
			margin-left:-1.5rem;
		}
		input{
			display: block;
			height: 1rem;
			width: 60%;
			background: #666;
			border: 0;
			margin-left:20%;
			color: #eee;
			font-size: 16px;
			box-sizing: border-box;
			padding: 0 0.3rem;
			&::placeholder{
						color:#919191;
						font-size:18px;
					}
		}
		.go-login{
			margin-top: 0.3rem;
			display: block;
			height: 1rem;
			width: 40%;
			margin-left:30%;
			color: #eee;
			text-align: center;
			line-height: 1rem;
			font-size: 18px;
			background: #80BD01;
			border-radius: 10px;
		}
	}
}
	
	
</style>