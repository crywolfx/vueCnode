<template>
<transition name="fade">
    <div class="about-me">
        <vheader></vheader>
        <img src="http://orbmbw2o7.bkt.clouddn.com/%E5%85%94%E5%AD%902.png" alt="">
        <ul class="stack">
            <li class="title">技术栈</li>
            <li>vue2.0</li>
            <li>vuex</li>
            <li>vue-router</li>
            <li>axios</li>
            <li>scss</li>
            <li>localStorage</li>
        </ul>
        <div class="concat">
            <div>源码:<a href="https://github.com/crywolfx/vueCnode">github</a></div>
            <div>github:<a href="https://github.com/crywolfx">crywolfx</a></div>
            <div>博客:<a href="http://blog.wxink.xyz">blog</a></div>
        </div>
        <p>如果你喜欢，或者对你有帮助，就点个star吧T_T</p>
    </div>
</transition>
</template>
<script>
import header from '../user/header'
export default{
    name:'about',
    components:{
		vheader:header,
	},
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
.about-me{
    position: absolute;
    height: 100%;
    width:100%;
    background: #444;
    img{
			width: 3rem;
			position: relative;
			left: 50%;
			margin-left:-1.5rem;
            border-radius: 50%;
		}
    .stack{
        width: 50%;
        margin-left:25%;
        li{
            width: 100%;
            color:#fff;
            font-size: 16px;
            margin-bottom: 0.1rem;
            text-align: center;
        }
        .title{
            font-size: 18px;
        }
    }
    .concat{
        margin-top: 1rem;
        position: relative;
        width: 300px;
        height:1rem;
        left: 50%;
        margin-left: -150px;
        display:flex;
        div{
            flex:1;
            font-size: 14px;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            a{
                color:#DEDEDE;
            }
        }
    }
    p{
        height: 1rem;
        width: 300px;
        position: relative;
        left: 50%;
        margin-left: -150px;
        text-align: center;
        color:#DEDEDE;
    }
}

</style>
