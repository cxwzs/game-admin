/**
 * 跑马灯
 */
import { request } from '@umijs/max'

// 查询 跑马灯
export const FetchHorseApi = () => {
  return request('/admin/set_msg_info', {
    method: 'POST'
  })
}

// 更新 跑马灯
export const UpdateHorseApi = (params: any) => {
  return request('/admin/modify_msg_info', {
    method: 'POST',
    data: params
  })
}