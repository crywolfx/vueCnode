<template>
<transition name="fade">
	<div class="aside" v-show="checkAside">
		<div class="asi-mask" @click="colseAside"></div>
		<div class="asi-content">
			<div class="asi-logo" @click="go('login')">
				<img :src="[user.avatar_url ? user.avatar_url : 'http://orbmbw2o7.bkt.clouddn.com/CNode.svg']" alt="">
				<div class="asi-name">{{user.loginname ? user.loginname : '点击头像登录'}}</div>
			</div>
			<ul class="asi-menu">
				<li class="asi-block" v-for="(value,index) in menu" :class="[active==value ? 'select' : '' ]" @click="changeAct(value);go(value)"><span :class="value+'-icon'"></span><span>{{menuText[index]}}</span></li>
			</ul>
		</div>
	</div>
</transition>
</template>
<script>
	export default{
		name:'aside',
		data() {
			return {
				active:'home',
				menu:['home','personal','post','logout','about'],
				menuText:['主 页','个 人','发 布','登 出','关 于']
			}
		},
		computed: {
			checkAside() {
				return this.$store.state.checkAside;
			},
			user() {
				return this.$store.state.user;
			},
		},
		methods: {
			colseAside() {
				this.$store.commit('CHECK_ASIDE',false);
			},
			changeAct(val) {
				this.active=val;
			},
			go(path) {
				if(path=='logout'){
					this.active='home';
					localStorage.clear();
					this.$store.commit("SET_USER",{});
					this.$store.commit("SET_TOKEN",'');
				}else{
					this.$router.push({
						name:path,
					});
				}
				this.colseAside();
			}
		}
	}
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateX(100%);
  opacity: 0;
}
	.aside{
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		width: 100%;
		z-index: 2;
		display: flex;
		width{
			float:left;
			height: 100%;
		}
		.asi-mask{
			flex:1;
			// background: #444;
			// opacity: 0.3;
		}
		.asi-content{
			width: 4.4rem;
			background: #444;
			.asi-logo{
				width: 4.4rem;
				img{
					width: 2.2rem;
					margin-left:1.1rem;
					margin-top: 0.3rem;
					border-radius: 50%;
				}
				.asi-name{
					width:100%;
					text-align: center;
					color: #fff;
					font-size: 16px;
				}
			}
			.asi-menu{
				margin-top:0.3rem;
				.asi-block{
					height: 1rem;
					width: 100%;
					font-size: 16px;
					color:#fff;
					line-height: 1rem;
					span{
						display:block;
						float: left;
						height: 100%;
						width: 50%;
					}
					.home-icon{
						background: url("../../assets/svg/home.svg") no-repeat 90% 50%;
						background-size:25%;
					}
					.personal-icon{
						background: url("../../assets/svg/Personal.svg") no-repeat 90% 50%;
						background-size:25%;
					}
					.post-icon{
						background: url("../../assets/svg/post.svg") no-repeat 90% 50%;
						background-size:25%;
					}
					.about-icon{
						background: url("../../assets/svg/abouthome.svg") no-repeat 89% 50%;
						background-size:25%;
					}
					.logout-icon{
						background: url("../../assets/svg/logout.svg") no-repeat 83% 50%;
						background-size:25%;
					}
				}
				.select{
					background: #999;
				}
			}

		}

	}
</style>