/**
 * 系统管理
 */
import { request } from '@umijs/max'

// 查询 公告/跑马灯/分享图
export const FetchNoticeApi = () => {
  return request('/api/admin/get_msg_image', {
    method: 'POST'
  })
}

// 查询 阿里云OSS 临时凭证
export const FetchOssTokenApi = (params: any) => {
  return request('/api/admin/get_oss_credential', {
    method: 'POST',
    data: params
  })
}

// 更新 公告/跑马灯/分享图
export const UpdateNoticeApi = (params: any) => {
  return request('/api/admin/set_msg_image', {
    method: 'POST',
    data: params
  })
}
// 更新 留言
export const UpdateRemarkApi = (params: any) => {
  return request('/api/admin/get_ke_fu_msg', {
    method: 'POST',
    data: params
  })
}