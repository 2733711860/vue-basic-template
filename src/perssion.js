import router from './router'
import { getRoute } from '@/api'
 
var getRouter // 用来获取后台拿到的路由
let IsFirst = true; // 是否首次进入页面，避免默认进入地址无权限直接报错

router.beforeEach((to, from, next) => {
  if (!getRouter) { // 不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      getRoute().then(res => {
        getRouter = res.data; // 后台拿到路由
        saveObjArr('router', getRouter) // 存储路由到sessionStorage
        // router.push(getRouter[0].path);
        routerGo(to, next) // 执行路由跳转方法
      })
    } else { // 从sessionStorage拿到了路由
      getRouter = getObjArr('router') // 拿到路由
      routerGo(to, next)
    }
  } else {
    if (to.path == '/NotFound') { // 未加载页面默认会跳转至404页面
      if (IsFirst) {
        IsFirst = false;
        return;
      }
      return;
    } else {
      next()
    }
  }
})
 
 
function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) // 过滤路由
	getRouter.forEach(item => {
		router.addRoute(item) // 动态添加路由
	})
	let { title } = to.meta;
	document.title = title;
  next({
    ...to,
    replace: true
  })
}
 
function saveObjArr(name, data) { //sessionStorage 存储数组对象的方法
  sessionStorage.setItem(name, JSON.stringify(data))
}
 
function getObjArr(name) { //sessionStorage 获取数组对象的方法
  return JSON.parse(window.sessionStorage.getItem(name));
}
 
function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
				route.component = process.env.NODE_ENV == 'development' ? 
					require('@/' + route.component + '.vue').default :
					() => import(`@/${route.component}.vue`)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}