<template>
<transition name="fade">
	<footer v-show="!rolldown">
		<div v-for="(value,index) in list" @click="changeAct(value)">
			<span class="foot-icon" :class="[active==value ? value+'Act' : value ]"></span>
		</div>
	</footer>
</transition>
</template>
<script>
	export default{
		name:'footer',
		data() {
			return {
				active:'all',
				list:['all','good','share','ask','job'],
			}
		},
		methods:{
			changeAct(value) {
				this.active=value;
				this.$store.commit('SET_TYPE',value);
			}
		},
		computed:{
			rolldown() {
				return this.$store.state.rollDown;
			},
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
  transform: translateY(60px);
  opacity: 0;
}
	footer{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 1.4rem;
		width: 100%;
		display: flex;
		background: #444444;
		div{
			float: left;
			flex:1;
			.foot-icon{
				height: 1.4rem;
				width: 1.4rem;
				display: block;
				position: relative;
				left:50%;
				margin-left: -0.7rem;
			}
		}
		.all{
		    background: url(../../assets/svg/all.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.allAct{
			background: url(../../assets/svg/allAct.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.good{
			background: url(../../assets/svg/good.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.goodAct{
			background: url(../../assets/svg/goodAct.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.share{
			background: url(../../assets/svg/share.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.shareAct{
			background: url(../../assets/svg/shareAct.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.ask{
			background: url(../../assets/svg/ask.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.askAct{
			background: url(../../assets/svg/askAct.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.job{
			background: url(../../assets/svg/job.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
		.jobAct{
			background: url(../../assets/svg/jobAct.svg) no-repeat 50% 50%;
		    background-size: 50%;
		}
	}
</style>