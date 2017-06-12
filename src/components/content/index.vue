<template>
	<div class="content">
		<ul>
			<li v-for="(value,index) in resList">
				<div class="header">
					<img :src="value.data.author.avatar_url" alt="">
					<span class="name">来自用户:{{value.data.author.loginname}}</span>
					<span class="top" v-if="value.data.top">置顶</span>
				</div>
				<div class="title"><strong>{{value.data.title}}</strong></div>
				<div class="text-content">{{value.content}}</div>
				<div class="related">
				<span>{{value.data.visit_count}}浏览·</span>
				<span>{{value.data.reply_count}}评论</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import axios from 'axios'
import api from '../../api/index'
	export default{
		name:'index',
		data() {
			return {
				page:1,
				resList:[],
				scrollTop:0,
			}
		},
		computed: {
			type() {
				return this.$store.state.type;
			}
		},
		watch: {
			type(val,oldval) {
				if(val!=oldval){
					this.resList=[];
					this.page=1;
				}
				this.getTopics(val);
			},
			scrollTop(val,oldval) {
				if(val>oldval) {
					this.$store.commit('SET_ROLLDOWN',true);
				}else{
					this.$store.commit('SET_ROLLDOWN',false);
				}
			}
		},
		created() {
			this.getTopics(this.type);
		},
		mounted() {
			$(window).on('scroll',()=>{
				this.scrollTop=$(document).scrollTop();
				if(($(document).scrollTop()+$(window).height())>=$(document).height() && $(document).height()!=$(window).height()){
						this.page++;
						this.getTopics(this.type);
			     }
			})
		},
		methods: {
			getTopics(type) {
				axios.get(api.getTopics(type,this.page,20)).then((res)=>{
					if(res.data.success){
						let value=res.data.data.map((value)=>{
							return res={
								data:value,
								content:$(value.content).text().trim().substring(0,100),
							}
						})
						this.resList=this.resList.concat(value);
					}
				})
			}
		}

	}	
</script>
<style lang="scss" scoped>
	.content{
		padding-top: 1.4rem;
		width: 100%;
		background: #F2F4F7;
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
	}
</style>