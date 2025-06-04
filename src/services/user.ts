/**
 * 用户管理
 */
import { request } from '@umijs/max'

// 用户列表
export const FetchUserListApi = (params: any) => {
  return request('/admin/get_user_list', {
    method: 'POST',
    data: params
  })
}

// 更新用户信息
export const UpdateUserInfoApi = (params: any) => {
  return request('/admin/modify_user_info', {
    method: 'POST',
    data: params
  })
}

// 更新用户房卡
export const UpdateRoomCardApi = (params: any) => {
  return request('/admin/add_insure_score', {
    method: 'POST',
    data: params
  })
}