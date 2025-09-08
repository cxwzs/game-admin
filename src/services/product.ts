/**
 * 商品管理
 */
import { request } from '@umijs/max'

// 查询 商品列表
export const FetchProductListApi = (params: any) => {
  return request('/admin/get_store_list', {
    method: 'POST',
    data: params
  })
}

// 商品 配置
export const SettingProductApi = (params: any) => {
  return request('/admin/add_store', {
    method: 'POST',
    data: params
  })
}

// 修改商品
export const UpdateProductApi = (params: any) => {
  return request('/admin/modify_store', {
    method: 'POST',
    data: params
  })
}