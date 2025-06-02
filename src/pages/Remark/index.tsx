/**
 * 留言管理
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Popconfirm, Space } from "antd"
import { FetchRemarkListApi, HandleRemarkApi } from '@/services/remark'
import { useRef } from "react"

interface ListItemType {
  addTime: string
  describe: string
  gameId: number
  id: number
  mobile: string
  wxNum: string
}

const Page = () => {

  const actionRef = useRef<ActionType>(null)

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '留言人',
      dataIndex: 'gameId',
      ellipsis: true,
      copyable: true
    },
    {
      title: '留言内容',
      dataIndex: 'describe',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '微信',
      dataIndex: 'wxNum',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        return <Space wrap>
          <Popconfirm
            title='确定将该留言标为已处理吗'
            onConfirm={() => {
              HandleRemarkApi({ id: record.id }).then(() => {
                refreshList()
              })
            }}
          >
            <Button type='link' size='small'>已处理</Button>
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
      search={{
        labelWidth: 'auto',
      }}
      options={false}
      pagination={{
        pageSize: 10,
        showQuickJumper: false
      }}
      rowKey={'id'}
      columns={columns}
      request={async (params) => {
        const { current, gameId } = params
        const { data, totalCount } = await FetchRemarkListApi({
          ...params,
          pageNum: current,
          gameId: gameId ? Number(gameId) : undefined
        })
        return {
          data: data,
          success: true,
          total: totalCount
        }
      }}
    ></ProTable>
  </PageContainer>
}

export default Page