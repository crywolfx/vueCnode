<template>
<div class="fa">
	<vheader></vheader>
	<div class="content">
		<ul>
			<li v-for="(value,index) in resList" @click="$router.push({name: 'topic', params:{id: value.data.id}})">
				<div class="header">
					<img :src="value.data.author.avatar_url" alt="">
					<span class="name">来自用户:{{value.data.author.loginname}}</span>
					<span class="top" v-if="value.data.top">置顶</span>
					<span class="top" v-if="value.data.good">精华</span>
					<span class="tab" v-if="value.data.tab === 'good'">精华</span>
              		<span class="tab" v-else-if="value.data.tab === 'share'">分享</span>
              		<span class="tab" v-else-if="value.data.tab === 'ask'">问答</span>
              		<span class="tab" v-else-if="value.data.tab === 'job'">招聘</span>
				</div> 
				<div class="title"><strong>{{value.data.title}}</strong></div>
				<div class="text-content">{{value.content}}</div>
				<div class="related">
				<span>{{value.data.visit_count}}浏览·</span>
				<span>{{value.data.reply_count}}评论</span>
				<span>{{use.formatDate(value.data.last_reply_at)}}</span>
				</div>
			</li>
		</ul>
	<transition name="gotop">
		<div class="go-top" @click="gotop()" v-show="isgotop"></div>
	</transition>
		<div class="loading" v-show="isloading"></div>
	</div>
	<vfooter></vfooter>
</div>
</template>
<script>
import axios from 'axios'
import api from '../../api/index'
import header from '../header/header'
import footer from '../footer/footer'
	export default{
		name:'index',
		data() {
			return {
				page:1,
				resList:[],
				scrollTop:0,
				isloading:false,
				isgotop:false,
			}
		},
		components: {
			vheader:header,
			vfooter:footer,
		},
		computed: {
			type() {
				return this.$store.state.type;
			},
		},
		watch: {
			type(val,oldval) {
				if(val!=oldval){
					this.resList=[];
					this.page=1;
					this.getTopics(val);
				}
			},
			scrollTop(val,oldval) {
				val>window.innerHeight ? this.isgotop=true : this.isgotop=false;
				if(val==0){
					return;
				}
				if(val>oldval) {
					this.$store.commit('SET_ROLLDOWN',true);
				}else{
					this.$store.commit('SET_ROLLDOWN',false);
				}
			},
		},
		created() {
			this.getTopics(this.type);
		},
		beforeRouteEnter(to, from, next) {
     		next(vm => {
     			window.scrollTo(0,vm.scrollTop);
        	window.addEventListener('scroll', vm.scrollArtlist, false)
     		 })
    	},
    	beforeRouteLeave(to, from, next) {	
     		window.removeEventListener("scroll", this.scrollArtlist, false)
      		next()
   		 },
		methods: {
			getTopics(type) {
				this.isloading=true;
				axios.get(api.getTopics(type,this.page,20)).then((res)=>{
					if(res.data.success){
						let value=res.data.data.map((value)=>{
							return res={
								data:value,
								content:$(value.content).text().trim().substring(0,100),
							}
						})
						this.page++;
						this.resList=this.resList.concat(value);
						this.isloading=false;
					}
				})
			},
	      scrollArtlist() {
	      	this.scrollTop=parseInt(window.scrollY);
        	let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY);
        	if (document.body.scrollHeight-totalheight<20 && document.body.scrollHeight>window.innerHeight) {
         	    if(!this.isloading){
         	    	this.getTopics(this.type);
         	    }
       	     }
       	   },
       	  gotop() {
      			if (this.scrollTop <= 0) {
        			return;
     			 }
     		 let time = setInterval(() => {
        		if (this.scrollTop <= 0) {
         		 clearInterval(time);
        		}
        		 this.scrollTop=this.scrollTop-100;
        		 window.scrollTo(0,this.scrollTop);
     		   }, 1)
  		    }
        },
	}	
</script>
<style lang="scss" scoped>
.gotop-enter-active {
  transition: all .3s ease-in-out;
}
.gotop-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.gotop-enter, .gotop-leave-active {
  transform: translateX(60px);
  opacity: 0;
}
.fa{
	height: 100%;
	width: 100%;
	position: absolute;
	background: #F2F4F7;
}
	.content{
		padding-top: 1.4rem;
		width: 100%;
		background: #F2F4F7;
		overflow: hidden;
		ul{
			li{
				box-sizing: border-box;
				padding:0 0.3rem;
				background: #fff;
				margin-top: 0.25rem;
				box-shadow: 0 -2px 2px rgba(213,215,217,.8),
							0 2px 2px rgba(213,215,217,.8);
				.header{
					height: 0.7rem;
					padding:0.22rem 0;
					img{
						height: 100%;
						float: left;
						border-radius: 50%;
					}
					span{
						float: left;
						height: 100%;
						margin-left: 0.2rem;
						line-height: 0.7rem;
					}
					.name{
						color: #99A4AA;
					}
					.top{
						color:red;
					}
					.tab{
						float: right;
						color: #272727;
					}
				}
				.title{
					font-family: "Microsoft YaHei";
					font-size: 14px;
				}
				.text-content{
					color: #474747;
					padding:0.2rem 0;
				}
				.related{
					color: #99A4AA;
					padding-bottom:0.2rem;
				}
			}
		}
		.loading{
					height: 1.4rem;
					width:100%;
					background: url("../../assets/svg/loading2.svg") no-repeat 50% 50%;
					background-size: contain;
				}
		.go-top{
			width:1rem;
			height: 1rem;
			position: fixed;
			right: 0.4rem;
			bottom: 1.8rem;
			background: url("../../assets/svg/gotop.svg") no-repeat;
			background-size: contain;
		}
	}
</style>