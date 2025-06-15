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

// 是否 允许所有人创建亲友圈
export const AllowCreateCircleApi = (params: any) => {
  return request('/admin/set_all_create_club', {
    method: 'POST',
    data: params
  })
}

// 指定玩家 是否允许创建亲友圈
export const AllowCreateCircleByUserApi = (params: any) => {
  return request('/admin/set_user_create_club', {
    method: 'POST',
    data: params
  })
}