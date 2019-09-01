import request from '@/utils/request'

let model = '/login'

export function login(data) {
  return request({
    url: model + '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: model + '/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: model + '/logout',
    method: 'post'
  })
}
