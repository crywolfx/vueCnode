import Vue from 'vue'
import Router from 'vue-router'
import Topic from '@/components/topic/topic'
import Topics from '@/components/content/index'
import Login from '@/components/user/login'
import Personal from '@/components/user/personal'
import Pertopic from '@/components/user/topics'

Vue.use(Router)

export default new Router({
  routes: [
 	 {
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
      path: '/personal/topics/:type',
      name: 'pertopic',
      component: Pertopic
    },
  ]
});
