<template>
<transition name="fade">
<header v-show="!rolldown">
	<div class="search">
		<div class="search-icon"></div>
		<div class="search-text">搜索node内容</div>
	</div>
	<div class="touch" @click="checkAside"></div>
</header>
</transition>
</template>

<script>
	export default{
		name:'header',
		computed:{
			rolldown() {
				return this.$store.state.rollDown;
			},
		},
		methods: {
			checkAside() {
				this.$store.commit('CHECK_ASIDE',true)
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
  transform: translateY(-60px);
  opacity: 0;
}
	header{
		position: fixed;
		height: 1.4rem;
		top:0;
		left: 0;
		width:100%;
		background: #444444;
	 .search{
		    width: 8rem;
		    height: 1rem;
	     	background: #595959;
	     	border-radius: 2px;
	     	margin-top: 0.2rem;
	     	margin-left: 0.6rem;
	     	float: left;
	     	div{
	     		float: left;
	     		height: 1rem;
	     		line-height: 1rem;
	     		color: #eee;
	     		font-size: 16px;
	     	}
	     	.search-icon{
	     		width:1.5rem;
	     		height:1rem;
	     		background: url("../../assets/svg/search.svg") no-repeat 50% 50%;
	     		background-size: 40%;
	     	}
	  }
	  .touch{
	  	float: right;
	  	background: url("../../assets/svg/lightning.svg") no-repeat 50% 50%;
	  	background-size: 70%;
	  	width: 1.4rem;
	  	height: 1rem;
	  	margin-top:0.2rem;
	  }
	}
</style>