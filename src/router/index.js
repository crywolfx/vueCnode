import Vue from 'vue'
import Router from 'vue-router'
import Topic from '@/components/topic/topic'
import Topics from '@/components/content/index'
import Comment from '@/components/comment/comment'
import Login from '@/components/user/login'
import Personal from '@/components/user/personal'
import Pertopic from '@/components/user/topics'
import Percollect from '@/components/user/collect'
import Permessage from '@/components/user/message'
import Post from '@/components/user/post'
import About from '@/components/about/about'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'topics',
      component: Topics
    },
    {
      path: '/topics',
      name: 'home',
      component: Topics
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
    {
      path: '/topic/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/personal/topics',
      name: 'pertopic',
      component: Pertopic
    },
    {
      path: '/personal/collect',
      name: 'percollect',
      component: Percollect
    },
    {
      path: '/personal/message',
      name: 'permsg',
      component: Permessage
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
