/**
 * 俱乐部列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, message, Popconfirm, Space } from "antd"
import { FetchHorseApi, UpdateHorseApi } from '@/services/horse'
import HorseConfig from './HorseConfig'
import { useRef, useState } from "react"

export interface ListItemType {
  id: number
  msg: string
}

const Page = () => {

  const actionRef = useRef<ActionType>(null)

  const [horseConfigData, setHorseConfigData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const columns: ProColumns<ListItemType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      title: '内容',
      dataIndex: 'msg',
      width: 500
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        return <Space>
          <Button type='link' size='small' onClick={() => setHorseConfigData(params => ({ ...params, visible: true, info: record }))}>编辑</Button>
          <Popconfirm
            title='确定要删除当前跑马灯配置吗'
            onConfirm={() => {
              UpdateHorseApi({
                  id: record.id,
                  msg: ''
                }).then(res => {
                message.success('删除成功')
                refreshList()
              })
            }}
          >
            <Button type='link' size='small' danger>删除</Button>
          </Popconfirm>
        </Space>
      }
    }
  ]

  const refreshList = () => {
    actionRef.current?.reload()
  }

  return <PageContainer>
    <ProTable
      actionRef={actionRef}
      search={false}
      options={false}
      pagination={false}
      rowKey={'id'}
      columns={columns}
      toolbar={{
        actions: [
          <Button type='primary' onClick={() => setHorseConfigData(params => ({ ...params, visible: true, info: {} as ListItemType }))}>新增跑马灯</Button>
        ]
      }}
      request={async (params) => {
        const { data } = await FetchHorseApi()
        if (data && data.length > 0) {
          return {
            data: data,
            success: true,
            total: data.length
          }
        }
        return {
            data: [],
            success: true,
            total: 0
          }
      }}
    ></ProTable>
    {/* 跑马灯配置 弹窗 */}
    <HorseConfig {...horseConfigData} onClose={() => setHorseConfigData(params => ({ ...params, visible: false, info: {} as ListItemType }))} refreshList={refreshList} />
  </PageContainer>
}

export default Page