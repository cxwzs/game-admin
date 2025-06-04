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
  return request('/admin/query_club_info', {
    method: 'POST',
    data: params
  })
}