/**
 * 系统管理
 */
import { request } from '@umijs/max'

// 查询 公告/跑马灯/分享图/分享链接
export const FetchNoticeApi = () => {
  return request('/admin/get_msg_image', {
    method: 'POST'
  })
}

// 查询 阿里云OSS 临时凭证
export const FetchOssTokenApi = (params: any) => {
  return request('/admin/get_oss_credential', {
    method: 'POST',
    data: params
  })
}

// 更新 公告/跑马灯/分享图/分享链接
export const UpdateNoticeApi = (params: any) => {
  return request('/admin/set_msg_image', {
    method: 'POST',
    data: params
  })
}
// 更新 留言
export const UpdateRemarkApi = (params: any) => {
  return request('/admin/get_ke_fu_msg', {
    method: 'POST',
    data: params
  })
}

// 设置 支付宝商户配置
export const UpdateAlipayApi = (params: any) => {
  return request('/admin/set_alipay_info', {
    method: 'POST',
    data: params
  })
}

// 查询 支付宝商户配置
export const FetchAlipayApi = () => {
  return request('/admin/get_alipay_info', {
    method: 'POST'
  })
}

// 设置 微信商户配置
export const UpdateWechatApi = (params: any) => {
  return request('/admin/set_wx_pay_info', {
    method: 'POST',
    data: params
  })
}

// 查询 微信商户配置
export const FetchWechatApi = () => {
  return request('/admin/get_wx_pay_info', {
    method: 'POST'
  })
}

// 设置 微信登陆信息
export const SettingWechatLoginApi = (params: any) => {
  return request('/admin/set_wx_login_info', {
    method: 'POST',
    data: params
  })
}

// 查询 微信登陆信息
export const FetchWechatLoginApi = () => {
  return request('/admin/get_wx_login_info', {
    method: 'POST'
  })
}

// 设置 客服联系方式
export const SettingCustomServerApi = (params: any) => {
  return request('/admin/set_ke_fu_wx', {
    method: 'POST',
    data: params
  })
}

// 查询 客服联系方式
export const FetchCustomServerApi = () => {
  return request('/admin/get_ke_fu_wx', {
    method: 'POST'
  })
}