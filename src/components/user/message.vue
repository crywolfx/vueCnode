<template>
	<transition name="fade">
		<div class="message">
			<vheader class="header"></vheader>
			<span class="mark-all" @click="markAll"></span>
			<ul class="msg-ul">
				<li class="msg-li" :class="[active==index ? 'select' : ' ' ]" v-for="(value,index) in tablist" @click="changAct(index)">{{value}}</li>
			</ul>
			<ul class="msg-content-ul">
				<li class="msg-content-li" v-for="(value,index) in msgList">
					<div class="msg-header">
						<img :src="value.author.avatar_url" alt="">
						<span class="name">来自用户: {{value.author.loginname}}</span>
						<span class="name">{{use.formatDate(value.create_at)}}</span>
						<span class="mark" v-if="active==1" @click="markOne(value.id,index)"></span>
					</div>
					<div @click="$router.push({name: 'topic', params:{id: value.topic.id}})">
						<div class="msg-content">主题: {{value.topic.title}}</div>
						<div class="msg-content">回复内容: {{value.reply.content}}</div>
					</div>
				</li>
			</ul>
		</div>
	</transition>
</template>
<script>
import header from './header'
import api from '../../api/index'
import axios from 'axios'
export default {
	name: 'message',
	data() {
		return {
			tablist: ['已读', '未读'],
			active: 0,
			msgList: [],
			has_read_messages: [],
			hasnot_read_messages: [],
		}
	},
	computed: {
		token() {
			return this.$store.state.token;
		}
	},
	components: {
		vheader: header,
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.active=0;
			vm.getMsg(vm.token);
		})
	},
	methods: {
		changAct(index) {
			if (index == 0) {
				this.msgList = this.has_read_messages;
			} else {
				this.msgList = this.hasnot_read_messages;
			}
			this.active = index;
		},
		getMsg(token) {
			axios.get(api.getMsg(), {
				params: {
					accesstoken: token,
					mdrender: false,
				}
			}).then(res => {
				if (res.data.success) {
					this.has_read_messages = res.data.data.has_read_messages;
					this.msgList = res.data.data.has_read_messages;
					this.hasnot_read_messages = res.data.data.hasnot_read_messages;
				}
			}).catch(err => {
				console.error("加载消息失败" + err);
			})
		},
		markOne(id, index) {
			axios.post(api.markOne(id), {
				accesstoken: this.token,
			}).then(res => {
				if (res.data.success) {
					this.$store.commit('SET_TOAST', {
						isShow: true,
						content: "标记已读",
						duration: 1000,
					})
					this.has_read_messages.unshift(this.hasnot_read_messages.splice(index, 1)[0]);
					this.msgList=this.hasnot_read_messages;
				}
			}).catch(err => {
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "标记失败",
					duration: 1000,
				})
				console.error(err)
			})
		},
		markAll() {
			axios.post(api.markAll(), {
				accesstoken: this.token,
			}).then(res => {
				if (res.data.success) {
					this.$store.commit('SET_TOAST', {
						isShow: true,
						content: "标记全部已读",
						duration: 1000,
					})
					this.has_read_messages = this.hasnot_read_messages.concat(this.has_read_messages);
					this.hasnot_read_messages = [];
					if(this.active==1){
						this.msgList=[];
					}else{
						this.msgList=this.has_read_messages;
					}
				}
			}).catch(err => {
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "标记失败",
					duration: 1000,
				})
				console.error(err)
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

.fade-enter,
.fade-leave-active {
	transform: translateX(100%);
	opacity: 0;
}

.message {
	position: absolute;
	height: 100%;
	width: 100%;
	background: #F2F4F7;
	box-sizing: border-box;
	padding: 1.4rem 0 0 0;
	.header {
		position: fixed;
		top: 0;
		z-index: 1;
	}
	.mark-all {
		float: right;
		height: 1.4rem;
		width: 1.4rem;
		z-index: 1;
		position: fixed;
		top: 0;
		right: 0;
		background: url("../../assets/svg/markAll.svg") no-repeat 50% 50%;
		background-size: 54%;
	}
	.msg-ul {
		position: fixed;
		top: 1.4rem;
		width: 100%;
		z-index: 1;
		.msg-li {
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
		.select {
			border-bottom: 2px solid #EB3F3F;
		}
	}
	.msg-content-ul {
		margin-top: 1rem;
		.msg-content-li {
			box-sizing: border-box;
			padding: 0 0.3rem;
			background: #fff;
			width: 100%;
			overflow: hidden;
			position: relative;
			border-bottom: 1px solid #DEDEDE;
			.msg-header {
				height: 0.7rem;
				padding: 0.22rem 0;
				img {
					height: 100%;
					border-radius: 50%;
					float: left;
				}
				.name {
					float: left;
					height: 100%;
					margin-left: 0.2rem;
					line-height: 0.7rem;
					color: #99A4AA;
				}
			}
			.msg-content {
				margin-left: 0.9rem;
				color: #474747;
				margin-bottom: 0.2rem;
			}
			.mark {
				float: right;
				width: 0.7rem;
				height: 0.7rem;
				background: url('../../assets/svg/mark.svg') no-repeat;
				background-size: contain;
			}
		}
	}
}
</style>