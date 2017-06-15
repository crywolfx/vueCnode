<template>
<transition name="fade">
	<div class="post">
		<vheader class="header"></vheader>
		<div class="post-content">
			<div class="post-fa">
				<label for="tab">选择板块:</label>
					<select v-model="postForm.tab" id="tab" class="Select-tab">
                		<option value="">请选择</option>
                		<option value="share">分享</option>
   						<option value="ask">问答</option>
                		<option value="job">招聘</option>
                		<option value="dev">测试</option>
            		</select>
			</div>
			<div class="post-fa">
				<input class="post-title" type="text" v-model="postForm.title" placeholder="标题字数十字以上">
			</div>
			<div class="post-fa">
				<label for="text" class="post-lobel">内容:</label>
				<textarea v-model="postForm.content" class="post-text" id="text" rows="12" placeholder="在此处输入内容哟(支持Mark-Down)......"></textarea>
			</div>
			<div class="post-out" @click="sendPost">提交</div>
		</div>
	</div>
</transition>
</template>
<script>
import header from './header'
import api from '../../api/index'
import axios from 'axios'

export default{
	name:'post',
	data() {
		return {
			postForm:{
				tab:'',
				title:'',
				content:'',
			},
			isModify:false,
		}
	},
	components: {
		vheader:header,
	},
	beforeRouteEnter(to,from,next) {
		next(vm=>{
			if(vm.modifyTopic){
				vm.$store.commit('SET_TOAST',{
					isShow:true,
					content:'请填写修改内容呦',
					duration:2000,
				})
				vm.isModify=true;
				vm.postForm={
					tab:vm.modifyTopic.tab,
					title:vm.modifyTopic.title,
					content:$(vm.modifyTopic.content).text(),
				}
			}else{
				vm.$store.commit('SET_TOAST',{
					isShow:true,
					content:'请填写发布内容呦',
					duration:2000,
				})
			}
		})
	},
	computed:{
		token() {
			return this.$store.state.token;
		},
		modifyTopic() {
			return this.$store.state.modifyTopic;
		},
		user() {
			return this.$store.state.user;
		}
	},
	methods:{
		checkForm() {
			for(var index in this.postForm){
				if(!this.postForm[index]){
					return false;
				}
			}
			if(this.postForm.title.trim().length < 10 || this.postForm.title.trim().length>255){
				return false;
			}
			return true;
		},
		sendPost() {
			if(!this.user.loginname){
				this.$router.push({name:'login'});
				return;
			}
			if(!this.checkForm()){
				this.$store.commit('SET_TOAST',{
					isShow:true,
					content:'请按规定填写',
					duration:1000,
				})
				return false;
			}
			let sendObj={
				accesstoken:this.token,
				title:this.postForm.title,
				tab:this.postForm.tab,
				content:this.postForm.content,
			}
			if(this.isModify){
				this.modifyPost(sendObj);
				return;
			}
			axios.post(api.createPost(),sendObj).then(res=>{
				this.getResThen(res);
			}).catch(err=>{
				this.$store.commit('SET_TOAST',{
					isShow:true,
					content:'发表失败',
					duration:1000,
				})
			})
		},
		modifyPost(sendObj) {
			sendObj.topic_id = this.modifyTopic.id;
			axios.post(api.modifyPost(),sendObj).then(res=>{
				this.getResThen(res);
				this.isModify=false;
				this.$store.commit('MODIFY_POST','');
			}).catch(err=>{
				this.$store.commit('SET_TOAST',{
					isShow:true,
					content:'修改失败',
					duration:1000,
				})
			})	
		},
		getResThen(res) {
			if(res.data.success){
					this.$store.commit('SET_TOAST',{
						isShow:true,
						content:'发表成功',
						duration:1000,
					})
					this.$router.push({
						name: 'topic', 
						params:{
							id: res.data.topic_id,
						}
					})
			    }
		}
	}
}
	

</script>
<style lang="scss" scoped>
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
.post{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #F2F4F7;
	.header{
			position:fixed;
			top:0;
		}
	.post-content{
		box-sizing: border-box;
		padding-top: 1.4rem;
		.post-fa{
			box-sizing: border-box;
			padding:0.2rem;
			background: #fff;
			margin-top: 0.3rem;
			box-shadow: 0 -2px 2px rgba(213,215,217,.8),
						0 2px 2px rgba(213,215,217,.8);
			font-size: 16px;
			.Select-tab{
				border: 0;
				height: 1rem;
				margin-left: 0.2rem;
			}
			.post-title{
				width: 100%;
				height: 0.8rem;
				border:1px solid #eee;
				border-radius: 5px;
				box-sizing: border-box;
				padding: 0 0.3rem;
			}
			.post-lobel{
				width: 100%;
				display: block;
			}
			.post-text{
				width: 100%;
				margin-top: 0.3rem;
				border:1px solid #eee;
				border-radius: 5px;
			}
		}
		.post-out{
			height: 1rem;
			width: 40%;
			margin-top:0.5rem;
			line-height: 1rem;
			text-align: center;
			border-radius: 10px;
			margin-left:30%;
			font-size:18px;
			color: #fff;
			background: #444;
		}
	}
}
	
</style>