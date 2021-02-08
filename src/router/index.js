import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var constantRouterMap=[
	{
	  path: '/',
	  redirect: '/index'
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('@/pages/index.vue'),
		meta: {
			title: '首页'
		}
	},
	{
		path: '/addRoute',
		name: 'addRoute',
		component: () => import('@/pages/add-route.vue'),
		meta: {
			title: '新增路由'
		}
	},
	{
		path: '/weather',
		name: 'weather',
		component: () => import('@/pages/weather.vue'),
		meta: {
			title: '天气'
		}
	},
	{
		path: '/poetry',
		name: 'poetry',
		component: () => import('@/pages/poetry.vue'),
		meta: {
			title: '诗词'
		}
	},
	{
		path: '*',
		component: () => import('@/pages/NotFound.vue'),
		meta: {
			title: 'NotFound'
		}
	}
]
 
export default new Router({
  routes: constantRouterMap,
  // mode:'history'
})