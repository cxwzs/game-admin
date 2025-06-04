/**
 * 留言管理
 */
import { request } from '@umijs/max'

// 留言管理 列表
export const FetchRemarkListApi = (params: any) => {
  return request('/admin/get_ke_fu_msg', {
    method: 'POST',
    data: params
  })
}

// 处理留言
export const HandleRemarkApi = (params: any) => {
  return request('/admin/set_ke_fu', {
    method: 'POST',
    data: params
  })
}