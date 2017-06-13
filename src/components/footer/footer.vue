<template>
<transition name="fade">
	<footer v-show="!rolldown">
		<div v-for="(value,index) in list" :class="[active==value ? value+'Act' : value ]" @click="changeAct(value)"></div>
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
			// type() {
			// 	return this.$store.state.type;
			// },
		},
		// watch: {
		// 	type(val){
		// 		this.active=val;
		// 	}
		// }
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
		}
		.all{
		    background: url(../../assets/svg/all.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.allAct{
			background: url(../../assets/svg/allAct.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.good{
			background: url(../../assets/svg/good.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.goodAct{
			background: url(../../assets/svg/goodAct.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.share{
			background: url(../../assets/svg/share.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.shareAct{
			background: url(../../assets/svg/shareAct.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.ask{
			background: url(../../assets/svg/ask.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.askAct{
			background: url(../../assets/svg/askAct.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.job{
			background: url(../../assets/svg/job.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
		.jobAct{
			background: url(../../assets/svg/jobAct.svg) no-repeat 50% 50%;
		    background-size: 30%;
		}
	}
</style>