/**
 * 俱乐部列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Space } from "antd"
import { FetchClubListApi } from '@/services/club'
import ClubConfig from './ClubConfig'
import { useRef, useState } from "react"

export interface ListItemType {
  clubId: number
  clubName: string
  clubNo: number
  mainGameId: number
}

const Page = () => {

  const actionRef = useRef<ActionType>(null)

  const [clubConfigData, setClubConfigData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '俱乐部ID',
      dataIndex: 'clubId',
      hideInSearch: true
    },
    {
      title: '俱乐部号',
      dataIndex: 'clubNo',
      valueType: 'digit',
      fieldProps: {
        controls: false
      },
      ellipsis: true,
      copyable: true
    },
    {
      title: '俱乐部名称',
      dataIndex: 'clubName',
      ellipsis: true,
      copyable: true
    },
    {
      title: 'mainGameId',
      dataIndex: 'mainGameId',
      valueType: 'digit',
      fieldProps: {
        controls: false
      },
      ellipsis: true,
      copyable: true
    },
    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        return <Space wrap>
          <Button type='link' size='small' onClick={() => {
            setClubConfigData({
              visible: true,
              info: record
            })
          }}>编辑</Button>
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
      search={{
        labelWidth: 'auto',
      }}
      options={false}
      pagination={{
        pageSize: 10,
        showQuickJumper: false
      }}
      rowKey={'clubId'}
      columns={columns}
      request={async (params) => {
        const { current } = params
        const { data, totalCount } = await FetchClubListApi({
          ...params,
          pageNum: current
        })
        return {
          data: data,
          success: true,
          total: totalCount
        }
      }}
    ></ProTable>
    {/* 俱乐部配置 弹窗 */}
    <ClubConfig {...clubConfigData} onClose={() => setClubConfigData(params => ({ ...params, visible: false, info: {} as ListItemType }))} refreshList={refreshList} />
  </PageContainer>
}

export default Page