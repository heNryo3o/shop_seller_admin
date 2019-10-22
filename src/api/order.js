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
