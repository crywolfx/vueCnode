<template>
	<transition name="fade">
		<div class="com-content">
			<div class="header">
				<div class="back" @click="back()"></div>
				<div class="sort" @click="sort()"></div>
			</div>
			<ul class="com-list">
				<li v-for="(value,index) in topic.replies">
					<div class="com-icon div">
						<img :src="value.author.avatar_url" alt="">
					</div>
					<div class="com-detail div">
						<div class="com-name">
							<span>
								<b>{{value.author.loginname}}</b>
							</span>
							<span class="author" v-if="topic.author.loginname==value.author.loginname">作者</span>
							<span class="reply" @click="reply(value.author.loginname,value.id)"></span>
						</div>
						<div class="com-text" v-html="value.content"></div>
						<div class="com-about">
							<span class="com-time">{{use.formatDate(value.create_at)}}</span>
							<span class="com-up" :class="[value.is_uped ? 'is-uped' : ' ']" @click="setUp(value.id,index,value.author.loginname)">{{value.ups.length}}</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="tip">~没有更多内容~</div>
			<div class="footer">
				<input type="text" class="send-comm" v-model="sendContent">
				<div class="send-icon" @click="sendComm"></div>
			</div>
		</div>
	</transition>
</template>

<script>
import axios from 'axios'
import api from '../../api/index'
export default {
	name: 'comment',
	data() {
		return {
			isReverse: false,
			sendContent: '',
			replyId: '',
		}
	},
	props: ['topic'],
	computed: {
		token() {
			return this.$store.state.token;
		},
		user() {
			return this.$store.state.user;
		}
	},
	methods: {
		back() {
			this.$emit('isCheckCom', false);
		},
		sort() {
			this.topic.replies.reverse();
			this.isReverse = !this.isReverse;
			let content = '';
			if (this.isReverse) {
				content = '按照时间顺序倒序排列'
			} else {
				content = '按照时间顺序正序排列'
			}
			this.$store.commit('SET_TOAST', {
				isShow: true,
				content: content,
				duration: 1000,
			})
		},
		checkLogin() {
			if (!this.token) {
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "你还没有登录呦",
					duration: 1000,
				})
				return false;
			}
			return true;
		},
		setUp(id, index,loginname) {
			if(!this.checkLogin()){
				return;
			}
			if(loginname==this.user.loginname){
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "不能给自己点赞呦",
					duration: 1000,
				})
				return;
			}
			axios.post(api.upsComm(id), {
				accesstoken: this.token
			}).then(res => {
				if (res.data.success) {
					if (res.data.action == "up") {
						this.topic.replies[index].is_uped = true;
						this.$store.commit('SET_TOAST', {
							isShow: true,
							content: "点赞成功",
							duration: 1000,
						})
					} else {
						this.topic.replies[index].is_uped = false;
						this.$store.commit('SET_TOAST', {
							isShow: true,
							content: "取消点赞成功",
							duration: 1000,
						})
					}
				}
			}).catch((err) => {
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "操作失败",
					duration: 1000,
				})
			})
		},
		reply(name, id) {
			if(!this.checkLogin()){
				return;
			}
			this.sendContent = '@' + name + ' ';
			this.replyId = id;
		},
		sendComm() {
			if(!this.checkLogin()){
				return;
			}
			if (this.sendContent.trim() == '') {
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "不能发送空回复哟",
					duration: 1000,
				})
				return;
			}
			axios.post(api.createComm(this.topic.id), {
				accesstoken: this.token,
				content: this.sendContent,
				reply_id: this.replyId,
			}).then(res => {
				if (res.data.success) {
					let date = new Date();
					this.topic.replies.push({
						author: {
							avatar_url: this.user.avatar_url,
							loginname: this.user.loginname,
						},
						content: this.sendContent,
						id: res.data.reply_id,
						is_uped: false,
						reply_id: this.replyId,
						create_at: date.getTime(),
						ups: [],
					})
					this.$store.commit('SET_TOAST', {
						isShow: true,
						content: "评论成功",
						duration: 1000,
					})
				}
			}).catch(err => {
				console.error(err);
				this.$store.commit('SET_TOAST', {
					isShow: true,
					content: "评论失败",
					duration: 1000,
				})
			})
		}
	},
	created() {
		window.scrollTo(0, 0);
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
}

.com-content {
	position: absolute;
	height: 100%;
	width: 100%;
	background: #F2F4F7;
}

.header {
	width: 100%;
	height: 1.4rem;
	background: #444444;
	position: fixed;
	top: 0;
	left: 0;
	.back {
		float: left;
		width: 1.4rem;
		height: 1.4rem;
		background: url("../../assets/svg/off.svg") no-repeat 50% 50%;
		background-size: 40%;
	}
	.sort {
		float: right;
		width: 1.4rem;
		height: 1.4rem;
		background: url("../../assets/svg/sort.svg") no-repeat 50% 50%;
		background-size: 50%;
	}
}

.com-list {
	margin-top: 1.4rem;
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 2px rgba(213, 215, 217, .8);
	li {
		padding: 0.3rem 0 0 0;
		overflow: hidden;
		.div {
			float: left;
		}
		.com-icon {
			width: 2rem;
			img {
				width: 1rem;
				margin-left: 0.5rem;
				border-radius: 50%;
			}
		}
		.com-detail {
			width: 80%;
			box-sizing: border-box;
			padding: 0 10px 10px 0;
			border-bottom: 1px solid #EFEFEF;
			.com-name {
				padding: 0 0 0.14rem 0;
				font-family: "Microsoft YaHei";
				.author {
					margin-left: 0.3rem;
					color: #80BD01;
				}
				.reply {
					float: right;
					height: 0.5rem;
					width: 1rem;
					background: url("../../assets/svg/reply.svg") no-repeat 30%;
					background-size: contain;
				}
			}
			.com-text {
				padding: 0 0 0.14rem 0;
				width: 90%;
				font-family: "Microsoft YaHei";
			}
			.com-about {
				width: 100%;
				.com-time {
					float: left;
					color: #989898;
				}
				.com-up {
					float: right;
					width: 1rem;
					height: 0.5rem;
					text-align: right;
					background: url("../../assets/svg/upup.svg") no-repeat 30%;
					background-size: contain;
					line-height: 0.5rem;
					color: #999;
				}
				.is-uped {
					background: url("../../assets/svg/upup2.svg") no-repeat 30%;
					background-size: contain;
				}
			}
		}
	}
}

.tip {
	height: 1.4rem;
	width: 100%;
	line-height: 1.4rem;
	text-align: center;
	margin-bottom: 1.4rem;
	color: #989898;
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 1.4rem;
	width: 100%;
	background: #fff;
	box-shadow: 0 -2px 2px rgba(213, 215, 217, .8);
	.send-comm {
		width: 80%;
		height: 1rem;
		background: #fff;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 2px solid rgba(156, 156, 156, .8);
		margin-left: 5%;
		font-size: 14px;
	}
	.send-icon {
		width: 1rem;
		height: 1rem;
		float: right;
		margin-right: 0.2rem;
		margin-top: 0.2rem;
		background: url('../../assets/svg/send.svg') no-repeat 50% 50%;
		background-size: contain;
	}
}
</style>