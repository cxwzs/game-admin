import { request } from '@umijs/max'

/**
 * 登录
 */
export const LoginApi = (params: any) => {
  return request('/admin/login', {
    method: 'POST',
    data: params
  })
}