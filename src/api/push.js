import request from '@/utils/request'

export function getTemplateList(data) {
  return request({
    url: '/push/index',
    method: 'get',
    params: data
  })
}

export function changeStatus(data) {
  return request({
    url: '/push/change-status',
    method: 'post',
    data
  })
}

export function deleteTemplate(data) {
  return request({
    url: '/push/destroy',
    method: 'post',
    data
  })
}

export function moduleOptions() {
  return request({
    url: '/push/module-options',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/push/create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/push/edit',
    method: 'post',
    data
  })
}

export function getPushLogs(data) {
  return request({
    url: '/push/logs',
    method: 'get',
    params: data
  })
}

export function getTypeOptions(data) {
  return request({
    url: '/push/type-options',
    method: 'get'
  })
}
