import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { store } from '/@/store/index.ts';
import { Session } from '/@/utils/storage';
import { NextLoading } from '/@/utils/loading';
import { staticRoutes, staticPageRoutes } from '/@/router/route';
import { getRouters } from '/@/api/local/menu';

const Layout = () => import('/@/layout/index.vue')
const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });
/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});
// 前端控制路由
export async function initFrontEndControlRoutes() {
	// 界面 loading 动画开始执行
	if (window.nextLoading === undefined) NextLoading.start();

	router.addRoute(pathMatch); // 添加404界面
	resetRoute(); // 删除/重置路由
}

// 后端控制路由：模拟执行路由数据初始化
export async function  initBackEndControlRoutes() {
	NextLoading.start(); // 界面 loading 动画开始执行
	let menuRoute:any = await getRouters()
	let drs = [
		{
			path: '/',
			name: '/',
			component: () => import('/@/layout/index.vue'),
			redirect: '/home',
			meta: {
				isKeepAlive: true,
			},
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('/@/views/home/index.vue'),
					meta: {
						title: 'message.router.home',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: true,
						isIframe: false,
						icon: 'iconfont icon-shouye',
					},
				},
			],
		},
	]
	drs[0].children = drs[0].children?.concat(backEndRouterConverter(menuRoute.menus))
	// @ts-ignore
	if(import.meta.env.VITE_MODE as any == 'development'){
      drs[0].children?.push( staticPageRoutes[0])
	};

	// 添加404界面
	router.addRoute(pathMatch);
	// 添加动态路由
	formatTwoStageRoutes(formatFlatteningRoutes(drs)).forEach((route: any) => {
		router.addRoute((route as unknown) as RouteRecordRaw);
	});
	store.dispatch('routesList/setRoutesList', drs[0].children);

	let authsRoutes = setFilterMenuFun(drs);
	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(authsRoutes))[0].children);
}


// 后端控制路由，后端返回路由 转换为vue route
export function backEndRouterConverter(routes: any, parentPath: string = "/") {
	if (!routes) return;
	return routes.map((item: any) => {
		if (!item.meta.auth || item.meta.auth.length === 0){
			delete item.meta.auth
		}
		item.component = item.component === 'Layout' || item.component === ''? Layout : dynamicImport(dynamicViewsModules, item.component as string);
		if (!item.redirect || item.redirect == "") {
			delete item.redirect
		}
		let path = item.path
		// 如果不是以 / 开头，则路径需要拼接父路径
		if (!path.startsWith("/")) {
			path = parentPath + "/" + path;
		}
		item.path = path
		item.children && backEndRouterConverter(item.children,item.path);
		if (item.children&&item.children.length === 0){
			delete item.children
		}

		return item;
	});
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, '');
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}



export function setFilterMenuFun(routes: any) {
	const menu: any = [];
	routes.forEach((route: any) => {
		const item = { ...route };
		if (item.children) {
			item.children = setFilterMenuFun(item.children)
		}
		menu.push(item);
	});
	return menu;
}

/**
 * 定义404界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404',
};

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatTwoStageRoutes(arr: any) {
	if (arr.length <= 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			// 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
			if (v.path.indexOf('/:') > -1) {
				v.meta['isDynamic'] = true;
				v.meta['isDynamicPath'] = v.path;
			}
			newArr[0].children.push({ ...v });
			// 存 name 值，keep-alive 中 include 使用，实现路由的缓存
			// 路径：/@/layout/routerView/parent.vue
			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name);
				store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList);
			}
		}
	});
	return newArr;
}


/**
 * 删除/重置路由
 * @method router.removeRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#push
 */
export function resetRoute() {
	store.state.routesList.routesList.forEach((route: any) => {
		const { name } = route;
		router.hasRoute(name) && router.removeRoute(name);
	});


}

// isRequestRoutes 为 true，则开启后端控制路由，路径：`/src/store/modules/themeConfig.ts`
const { isRequestRoutes } = store.state.themeConfig.themeConfig;
// 前端控制路由：初始化方法，防止刷新时路由丢失
if (!isRequestRoutes) initFrontEndControlRoutes();

// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
	if (store.state.routesList.routesList.length === 0) {
		if (isRequestRoutes) {
			// 后端控制路由：路由数据初始化，防止刷新时丢失
			await initBackEndControlRoutes();
			// 动态添加路由：防止非首页刷新时跳转回首页的问题
			// 确保 addRoute() 时动态添加的路由已经被完全加载上去
			next({ ...to, replace: true });
		}
	} else {
		next();
	}
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
	NextLoading.done();
});

// 导出路由
export default router;
