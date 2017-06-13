<template>
<transition name="fade">
	<div class="com-content">
		<div class="header">
			<div class="back" @click="back()"></div>
			<div class="sort" @click="sort()"></div>
		</div>
		<ul class="com-list">
			<li v-for="(value,index) in comm">
				<div class="com-icon div"><img :src="value.author.avatar_url" alt=""></div>
				<div class="com-detail div">
					<div class="com-name"><b>{{value.author.loginname}}</b></div>
					<div class="com-text" v-html="value.content"></div>
					<div class="com-about">
						<span class="com-time">1.1.1</span>
						<span class="com-up">{{value.ups.length}}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</transition>
</template>
<script>
	export default{
		name:'comment',
		data() {
			return {

			}
		},
		props:['comm'],
		watch:{
			comm(val){
				console.log(val);
			}
		},
		methods: {
			back() {
				this.$emit('isCheckCom',false);
			}
		},
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
  transform: translateY(-100%);
  opacity: 0;
}
.com-content{
	height: 100%;
	width: 100%;
}
	.header{
			width: 100%;
			height: 1.4rem;
			background: #444444;
			position: fixed;
			top:0;
			left: 0;
			.back{
				float: left;
				width: 1.4rem;
				height: 1.4rem;
				background: url("../../assets/svg/off.svg") no-repeat 50% 50%;
				background-size: 40%;
			}
			.sort{
				float: right;
				width: 1.4rem;
				height: 1.4rem;
				background: url("../../assets/svg/sort.svg") no-repeat 50% 50%;
				background-size: 50%;
			}
	}
	.com-list{
		margin-top: 1.4rem;
		width: 100%;
		li{
			padding: 0.3rem 0 0 0;
			overflow: hidden;
			.div{
				float: left;
			}
			.com-icon{
				width: 2rem;
				img{
					width: 1rem;
					margin-left: 0.5rem;
					border-radius: 50%;
				}
			}
			.com-detail{
				width: 80%;
				box-sizing: border-box;
				padding: 0 10px 0 0;
				.com-name{
					padding: 0 0 0.14rem 0;
				}
				.com-text{
					padding: 0 0 0.14rem 0;
					width: 90%;
				}
				.com-about{
					width: 100%;
					.com-time{
						float:left;
					}
					.com-up{
						float:right;
					}
				}
		    }
		}
	}

</style>