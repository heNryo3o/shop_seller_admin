import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: '/login/change-password',
    method: 'post',
    data
  })
}