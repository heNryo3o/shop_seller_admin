import request from '@/utils/request'

let model = '/user'   //指定模块名称,快速生成增删改查接口名

export function getList(data) {
  return request({
    url: model+'/index',
    method: 'get',
    params: data
  })
}

export function edit(data) {
  return request({
    url: model+'/edit',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: model+'/create',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: model+'/change-status',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: model+'/info',
    method: 'get',
    params: data
  })
}

export function destroy(data) {
  return request({
    url: model+'/destroy',
    method: 'post',
    data
  })
}

export function getLogs(data) {
  return request({
    url: model+'/logs',
    method: 'get',
    params: data
  })
}
