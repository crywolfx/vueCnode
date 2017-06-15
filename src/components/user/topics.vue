<template>
<transition name="fade">
	<div class="user-topic">
		<vheader class="header"></vheader>
		<ul>
			<li class="user-topic-content" v-for="(value,index) in userTopics" @click="$router.push({name: 'topic', params:{id: value.id}})">
				<img :src="value.author.avatar_url" alt="">
				<div class="topic-content">
					<div class="topic-user"><span class="user-name">{{value.author.loginname}}</span><span class="topic-time">{{use.formatDate(value.last_reply_at)}}</span></div>
					<div class="topic-title">{{value.title}}</div>
				</div>
			</li>
		</ul>
	</div>
</transition>	
</template>
<script>
import header from './header'
export default{
	name:'topics',
	data() {
		return {
			
		}
	},
	components:{
		vheader:header,
	},
	computed: {
		userTopics() {
			return this.$store.state.userTopics;
		}
	},
	watch: {
		userTopics(val,oldval) {

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
.user-topic{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #F2F4F7;
	box-sizing: border-box;
	padding:1.4rem 0 0 0;
	.header{
		position:fixed;
		top:0;
	}
	ul{
		background: #F2F4F7;
	.user-topic-content{
				overflow: hidden;
				box-sizing: border-box;
				padding:0.3rem;
				background: #fff;
				margin-top: 0.25rem;
				box-shadow: 0 -2px 2px rgba(213,215,217,.8),
							0 2px 2px rgba(213,215,217,.8);
			img{
				height: 1rem;
				float: left;
				border-radius: 50%;
			}
			.topic-content{
				float: left;
				width: 80%;
				margin-left: 0.3rem;
				.topic-user{
					height: 0.7rem;
					.topic-time{
						float:right;
					}
				}
				.topic-title{
						font-size: 14px;
						color: #3D3D3D;
					}
			}
		}	
	}
}	

</style>