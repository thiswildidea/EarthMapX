import request from '/@/utils/request';


export function get_mapconfig()  {
	return request({
		url: '/config/mapconfig.json',
		method: 'get'
	})
}

