/**
 * 俱乐部列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Space } from "antd"
import { FetchNoticeApi } from '@/services/system'
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
      dataIndex: 'msg'
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return <Space>
          <Button type='link' size='small' onClick={() => setHorseConfigData(params => ({ ...params, visible: true, info: record }))}>编辑</Button>
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
        const { data } = await FetchNoticeApi()
        return {
          data: data,
          success: true,
          total: data.length || 0
        }
      }}
    ></ProTable>
    {/* 跑马灯配置 弹窗 */}
    <HorseConfig {...horseConfigData} onClose={() => setHorseConfigData(params => ({ ...params, visible: false, info: {} as ListItemType }))} refreshList={refreshList} />
  </PageContainer>
}

export default Page