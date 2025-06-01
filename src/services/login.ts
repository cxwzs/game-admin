import { request } from '@umijs/max'

/**
 * 登录
 */
export const LoginApi = (params: any) => {
  return request('/api/admin/login', {
    method: 'POST',
    data: params
  })
}