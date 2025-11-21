import request from '/@/utils/request';

/**
 * 后端控制菜单模拟json，路径在 https://gitee.com/PandaAdmin/PandaX-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 */

// 获取路由
export function getRouters()  {
	return request({
		url: '/config/menu.json',
		method: 'get'
	})
}