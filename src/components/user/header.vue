<template>
	<div class="header">
		<div class="back" @click="$router.go(-1)"></div>
	</div>
</template>
<script>
	
</script>
<style lang='scss' scoped>
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
	.header{
		width: 100%;
		height: 1.4rem;
		background: #444;
		.back{
			height: 1.4rem;
			width: 1.4rem;
			background: url("../../assets/svg/off.svg") no-repeat 50% 50%;
			background-size: 40%;
		}
	}
</style>