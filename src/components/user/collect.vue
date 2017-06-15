<template>
<transition name="fade">
	<div class="collect">
		<vheader class="header"></vheader>
		<vlistblock :resList="collectData"></vlistblock>
	</div>
</transition>	
</template>
<script>
import header from './header'
import api from '../../api/index'
import axios from 'axios'
import listBlock from '../content/listBlock'
export default{
	name:'collect',
	data() {
		return{
			collectData:{},
		}
	},
	components:{
		vheader:header,
		vlistblock:listBlock,
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	},
	beforeRouteEnter(to,from,next) {
		next(vm=>{
			vm.getCollect(vm.user.loginname);
		})
	},
	methods: {
		getCollect(loginname) {
			axios.get(api.getCollect(loginname)).then(res=>{
				if(res.data.success){
					let value=res.data.data.map((value)=>{
							return res={
								data:value,
								content:'',
							}
						})
					this.collectData=value;
				}
			}).catch(err=>{
				console.error("加载收藏列表失败"+err);
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
  transition: all .1s ease-in-out;
}
.fade-enter, .fade-leave-active {
  transform: translateX(100%);
  opacity: 0;
}
	.collect{
		position: absolute;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding:1.4rem 0 0 0;
		.header{
		position:fixed;
		top:0;
		}
	}

</style>