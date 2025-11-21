import request from '/@/utils/request';

// 查询参数列表分页
export function mapToken(query:any) {
    return request({
        url: '/mapconfig/maptoken',
        method: 'get',
        params: query
    })
}