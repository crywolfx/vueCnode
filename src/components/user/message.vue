<template>
<transition name="fade">
	<div class="message">
		<vheader class="header"></vheader>
		<span class="mark-all"></span>
		<ul class="msg-ul">
			<li class="msg-li" :class="[active==index ? 'select' : ' ' ]" v-for="(value,index) in tablist" @click="changAct(index)">{{value}}</li>
		</ul>
	</div>
</transition>
</template>
<script>
import header from './header'
import api from '../../api/index'
import axios from 'axios'
export default{
	name:'message',
	data() {
		return {
			tablist:['已读','未读'],
			active:0,
			msgList:[],
			has_read_messages:[],
			hasnot_read_messages:[],
		}
	},
	computed: {
		token() {
			return this.$store.state.token;
		}
	},
	components: {
		vheader:header,
	},
	beforeRouteEnter(to,from,next) {
		next(vm=>{
			vm.getMsg(vm.token);
		})
	},
	methods: {
		changAct(index) {
			if(index==0){
				this.msgList=this.has_read_messages;
			}else{
				this.msgList=this.hasnot_read_messages;
			}
			this.active=index;
		},
		getMsg(token) {
			axios.get(api.getMsg(),{
				params:{
					accesstoken:token,
				}
			}).then(res=>{
				if(res.data.success){
					this.has_read_messages=res.data.has_read_messages;
					this.hasnot_read_messages=res.data.hasnot_read_messages;
				}
			}).catch(err=>{
				console.error("加载消息失败"+err);
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
	.message{
		position: absolute;
		height: 100%;
		width: 100%;
		background: #F2F4F7;
		box-sizing: border-box;
		padding:1.4rem 0 0 0;
		.header{
			position:fixed;
			top:0;
		}
		.mark-all{
			float: right;
			height: 1.4rem;
			width: 1.4rem;
			position: fixed;
			top: 0;
			right: 0;
			background: url("../../assets/svg/markAll.svg") no-repeat 50% 50%;
			background-size: 54%;
		}
		.msg-ul{
			position: fixed;
			top:1.4rem;
			width: 100%;
			.msg-li{
				float: left;
				width: 50%;
				height: 1rem;
				text-align: center;
				line-height: 1rem;
				font-size: 18px;
				background: #444;
				color: #fff;
				box-sizing: border-box;
			}
			.select{
				border-bottom: 2px solid #EB3F3F;
			}
		}
	}

</style>