<template>
<transition name="fade">
<div>
	<div class="art-content" v-if="!isCheckCom">
		<header>
			<div class="back" @click="$router.go(-1)"></div>
			<div class="search">{{title}}</div>
			<div class="ctrl"></div>
			<div class="share"></div>
		</header>
		<div  ref="scrollContent">  <!--bug -->
			<div class="art-detail-list">
			    <div class="art-title">{{dataRes.title}}</div>
			    <div class="art-author" v-show="!isloading">
				    <img :src="dataRes.author.avatar_url" alt="">
				    <span>{{dataRes.author.loginname}}</span>
				    <button class="collect">收藏</button>
			    </div>
			    <span class="art-line"></span>
			    <section ref="article" class="art-res-content" v-html="dataRes.content"></section>
			    <div class="info" v-show="!isloading">
			    	<div>创建于 {{createTime}}</div>
			    	<div>编辑于 {{use.formatDate(lastReply)}}</div>
			    	<div>著作权归作者所有</div>
			    </div>
		    </div>
		</div>
	<transition name="gotop">
		<div class="go-top" @click="gotop()" v-show="isgotop"></div>
	</transition>
		<div class="loading" v-show="isloading"></div>
	<transition name="bottom">
		<footer v-show="!isScroll">
				<span class="v-count">{{dataRes.visit_count}}</span>
				<div class="v-ctrl">
					<div class="v-collect">
						<div class="icon clt"></div>
						<div class="text">收藏</div>
					</div>
					<div class="v-comment" @click="checkCom()">
						<div class="icon cmt"></div>
						<div class="text">{{dataRes.reply_count}}</div>
					</div>
				</div>
		</footer>
	</transition>
	</div>
	<vcomment v-if="isCheckCom" @isCheckCom="changeCheckCom" :comm="dataRes.replies"></vcomment>
</div>
</transition>
</template>
<script>
import axios from 'axios'
import api from '../../api/index'
import comment from '../comment/comment'
	export default{
		name:'topic',
		data() {
			return {
				dataRes:{
					author:{}
				},
				scrollTop:0,
				title:"搜索node内容",
				isgotop:false,
				createTime:'00-00-00',
				lastReply:'00-00-00',
				isloading:false,
				isScroll:false,
				isCheckCom:false,
			}
		},
		computed:{

		},
		components: {
			vcomment:comment,
		},
		watch: {
			scrollTop(val,oldval) {
				val>window.innerHeight ? this.title=this.dataRes.title : this.title="搜索node内容";
				val>window.innerHeight ? this.isgotop=true : this.isgotop=false;
				if(this.isgotop&&val>oldval&&(val+window.innerHeight)!=document.body.scrollHeight){
					this.isScroll=true;
				}else{
					this.isScroll=false;
				}
			}
		},
		mounted() {
			window.addEventListener('scroll',()=>{
				this.scrollTop=window.scrollY;
			}, false)
		},
		beforeRouteEnter (to, from, next) {
			next(vm=>{
				window.scrollTo(0,0);
				vm.getTopic(to.params.id);
			})
		},
		beforeRouteLeave (to,from,next) {
			this.dataRes={
				author:{}
			}
			this.$store.commit('SET_ROLLDOWN',false);
			next();
		},
		methods: {
			getTopic(id) {
				this.isloading=true;
				axios.get(api.getTopic(id)).then(res=>{
					if(res.data.success==true){
						this.isloading=false;
						this.dataRes=res.data.data;
						let yymmdd=this.dataRes.create_at.split('T')[0];
						let time=this.dataRes.create_at.split('T')[1].split('.')[0];
						this.createTime=yymmdd+' '+time;
						let yymmdd2=this.dataRes.last_reply_at.split('T')[0];
						let time2=this.dataRes.last_reply_at.split('T')[1].split('.')[0];
						this.lastReply=yymmdd2+' '+time2;
					}
				})
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
  		    },
  		    checkCom() {
  		    	this.isCheckCom=true;
  		    },
  		    changeCheckCom(val) {
  		    	this.isCheckCom=false;
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
  transform: translateX(-100%);
  opacity: 0;
}
.bottom-enter-active {
  transition: all .3s ease-in-out;
}
.bottom-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.bottom-enter, .bottom-leave-active {
  transform: translateY(60px);
  opacity: 0;
}
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
	.art-content{
		width: 100%;
		height: 100%;
		header{
			width: 100%;
			height: 1.4rem;
			background: #444444;
			position: fixed;
			top:0;
			left: 0;
			div{
				float: left;
				height: 100%;
			}
			.back{
				width: 1.4rem;
				background: url("../../assets/svg/off.svg") no-repeat 50% 50%;
				background-size: 40%;
			}
			.search{
				width: 6rem;
		   		height: 1rem;
	     		background: #595959;
	     		border-radius: 2px;
	     		margin-top: 0.2rem;
	     		line-height: 1rem;
	     		color: #eee;
	     		font-size: 16px;
	     		box-sizing: border-box;
	     		padding: 0 0.3rem;
	     		overflow: hidden;
	   			white-space: nowrap;
    			text-overflow: ellipsis;
			}
			.share{
				float: right;
				width:1.3rem;
				background: url("../../assets/svg/topshare.svg") no-repeat 50% 50%;
				background-size: 40%;
			}
			.ctrl{
				float: right;
				width:1.3rem;
				background: url("../../assets/svg/about.svg") no-repeat 50% 50%;
				background-size: 40%;
			}
		}
		.art-detail-list{
			padding-top:1.4rem;
			width: 100%;
			height: 100%;
		}
			.art-title{
				width: 100%;
				line-height:0.9rem;
				background: #444444;
				color: #fff;
				box-sizing: border-box;
				padding: 0 0.3rem;
				font-size:16px;
			}
			.art-author{
				height: 1.4rem;
				width: 100%;
				box-sizing: border-box;
				padding: 0 0.3rem;
				line-height:1.4rem;
				img{
					margin-top:0.2rem;
						height: 1rem;
						float: left;
						border-radius: 50%;
				  }
				span{
						float: left;
						height: 100%;
						margin-left: 0.2rem;
						line-height: 1.4rem;
						font-size:14px;
						color: #272727;
				}
				.collect{
					float: right;
					width: 1.4rem;
					height: 0.8rem;
					background: #FEFEFE;
					border:1px solid #444;
					margin-top:0.3rem;
					border-radius:4px;
				}
			},
			.art-line{
				width: 100%;
				height: 1px;
				display: block;
				background: #EFEFEF;
			}
			.art-res-content{
				color: #444444;
				box-sizing: border-box;
				width: 100%;
				padding: 0.3rem 0.3rem 0 0.3rem;
				width:100%;
				overflow: hidden;
			}
			.info{
				float: right;
				margin: 0.8rem 0.3rem 2rem 0;
				div{
					padding: 0.05rem;
					color: #444;
				}
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
		.loading{
					height: 1.4rem;
					width:100%;
					background: url("../../assets/svg/loading2.svg") no-repeat 50% 50%;
					background-size: contain;
				}
		footer{
		    position: fixed;
			bottom: 0;
			left: 0;
			height: 1.4rem;
			width: 100%;
			background: #FEFEFE;
			border-top: 1px solid #EFEFEF;
			.v-count{
				height: 0.8rem;
				width: 1.4rem;
				margin-top:0.3rem;
				margin-left:0.3rem;
				background: #FEFEFE;
				border:1px solid #D4D4D4;
				border-radius:0.1rem;
				float: left;
				text-align: center;
				line-height: 0.8rem;
				color:#999999;
			}
			.v-ctrl{
				float: right;
				width: 4rem;
				height: 1.4rem;
				margin-right: 0.3rem;
				div{
					float: left;
					width: 2rem;
				}
				.icon{
					height: 0.8rem;
				}
				.clt{
					background: url("../../assets/svg/collect.svg") no-repeat 50% 50%;
					background-size: 36%;
				}
				.cmt{
					background: url("../../assets/svg/comment.svg") no-repeat 50% 50%;
					background-size: 30%;
				}
				.text{
					height: 0.6rem;
					text-align: center;
					color: #999999;
					font-size:8px;
				}
			}
		}
	}
</style>