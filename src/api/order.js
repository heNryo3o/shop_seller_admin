import request from '@/utils/request'

let model = '/order'

export function getList(data) {
  return request({
    url: model + '/index',
    method: 'get',
    params: data
  })
}

export function changeStatus(data) {
  return request({
    url: model + '/change-status',
    method: 'post',
    data
  })
}

export function sendProduct(data) {
  return request({
    url: model + '/send-product',
    method: 'post',
    data
  })
}

export function agreeRefund(data) {
  return request({
    url: model + '/agree-refund',
    method: 'post',
    data
  })
}

export function moneyLog(data) {
  return request({
    url: model + '/money-log',
    method: 'get',
    params: data
  })
}

export function cashLog(data) {
  return request({
    url: model + '/cash-log',
    method: 'get',
    params: data
  })
}

export function cashSubmit(data) {
  return request({
    url: model + '/cash-submit',
    method: 'post',
    data
  })
}
