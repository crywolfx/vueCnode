<template>
	<ul class="content-ul">
			<li class="content-li" v-for="(value,index) in resList" @click="$router.push({name: 'topic', params:{id: value.data.id}})">
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
</template>
<script>
	export default{
		name:'listBlock',
		props:['resList'],
	}
</script>
<style lang="scss">
	.content-ul{
			.content-li{
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
</style>