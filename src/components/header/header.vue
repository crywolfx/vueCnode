<template>
<header>
	<div class="search">
		<div class="search-icon"></div>
	</div>
</header>
</template>

<script>
	export default{

	}
</script>
<style lang="scss" scoped>
	header{
		position: fixed;
		height: 1.4rem;
		width:100%;
		background: #747474;
	
	 .search{
		    width: 80%;
		    height: 1rem;
	     	background: #eee;
	     	position: absolute;
	     	left: 50%;
	     	top: 50%;
	     	transform:translate(-55%,-50%);
	     	.search-icon{
	     		width:1rem;
	     		height:1rem;
	     		background: #fff;
	     	}
	  }
	}
</style>