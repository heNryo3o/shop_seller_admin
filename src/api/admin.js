import request from '@/utils/request'

let model = '/admin'

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

export function getAdminPermissions(data) {
  return request({
    url: '/permission/cal-permissions',
    method: 'get',
    params: data
  })
}

export function getDepartmentOptions() {
  return request({
    url: model + '/department-options',
    method: 'get'
  })
}

export function adminOptions() {
  return request({
    url: model + '/admin-options',
    method: 'get'
  })
}

