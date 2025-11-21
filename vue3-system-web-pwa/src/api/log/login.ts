import request from '/@/utils/request';

// 查询参数列表分页
export function listLoginInfo(query:any) {
    return request({
        url: '/log/login/list',
        method: 'get',
        params: query
    })
}

// 删除
export function delLoginInfo(infoId:any) {
    return request({
        url: '/log/login/'+ infoId,
        method: 'delete',
    })
}

// 清空登录日志
export function cleanLoginInfo() {
    return request({
        url: '/log/login/clean',
        method: 'delete',
    })
}