import request from '@/utils/request'

let model = '/system'   //指定模块名称,快速生成增删改查接口名

export function fileList(data) {
  return request({
    url: '/upload/index',
    method: 'get',
    params: data
  })
}
