export default [
  {
    path: '/',
    redirect: '/homePage'
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: resolve => {
      require(['@/pages/music/index.vue'], resolve)
    },
    meta: {
    	title: '首页'
    }
  }
]
