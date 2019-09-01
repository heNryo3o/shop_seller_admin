import request from '@/utils/request'

let model = '/company-validate'   //指定模块名称,快速生成增删改查接口名

export function getList(data) {
  return request({
    url: model+'/index',
    method: 'get',
    params: data
  })
}

export function changeStatus(data) {
  return request({
    url: model+'/change-status',
    method: 'post',
    data
  })
}
