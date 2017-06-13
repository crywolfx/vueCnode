import Vue from 'vue'
import Router from 'vue-router'
import Topic from '@/components/topic/topic'
import Topics from '@/components/content/index'

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
      name: 'topics',
      component: Topics
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
  ]
});
