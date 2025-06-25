/**
 * 俱乐部
 */
import { request } from '@umijs/max'

// 俱乐部列表
export const FetchClubListApi = (params: any) => {
  return request('/admin/get_club_list', {
    method: 'POST',
    data: params
  })
}

// 更新俱乐部信息
export const UpdateClubInfoApi = (params: any) => {
  return request('/admin/set_club_info', {
    method: 'POST',
    data: params
  })
}

// 俱乐部成员
export const FetchClubMemberListApi = (params: any) => {
  return request('/admin/get_club_user_list', {
    method: 'POST',
    data: params
  })
}

// 设置 俱乐部 是否隐藏
export const SetClubHideApi = (params: any) => {
  return request('/admin/hide_or_show_club', {
    method: 'POST',
    data: params
  })
}

// 俱乐部统计
export const FetchClubStatisticsApi = (params: any) => {
  return request('/admin/get_club_statistics', {
    method: 'POST',
    data: params
  })
}