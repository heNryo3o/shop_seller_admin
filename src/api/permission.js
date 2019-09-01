import request from '@/utils/request'

let model = '/permission'

export function getList(data) {
  return request({
    url: model + '/index',
    method: 'get',
    params: data
  })
}

export function edit(data) {
  return request({
    url: model + '/edit',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: model + '/create',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: model + '/change-status',
    method: 'post',
    data
  })
}

export function destroy(data) {
  return request({
    url: model + '/destroy',
    method: 'post',
    data
  })
}

export function getPermissionOptions() {
  return request({
    url: model + '/permission-options',
    method: 'get',
  })
}

export function getPermissionParentOptions() {
  return request({
    url: model + '/parent-options',
    method: 'get'
  })
}
