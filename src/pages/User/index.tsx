/**
 * 用户列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Image, message, Space, Switch } from "antd"
import { FetchUserListApi } from '@/services/user'
import UpdateUser from './UpdateUser'
import { useRef, useState } from "react"
import { UpdateUserInfoApi } from '@/services/user'

export interface ListItemType {
  userId: number
  gameId: number
  nickname: string
  headImg: string
  proxyLevel: number
  insureScore: number
}

const Page = () => {

  const actionRef = useRef<ActionType>()

  const [updateUserData, setUpadateUserData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '用户ID',
      dataIndex: 'gameId',
      copyable: true
    },
    {
      title: '用户头像',
      dataIndex: 'headImg',
      hideInSearch: true,
      render: (_, record) => {
        const { headImg } = record
        return <Image src={headImg} width={80} />
      }
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      ellipsis: true,
      copyable: true
    },
    {
      title: '是否代理',
      dataIndex: 'proxyLevel',
      ellipsis: true,
      copyable: true,
      render: (_, record) => {
        const { proxyLevel, userId } = record
        return <Switch checked={!!proxyLevel} checkedChildren="是" unCheckedChildren="否" onChange={(checked) => {
          UpdateUserInfoApi({
            userId,
            proxyLevel: Number(checked)
          }).then(res => {
            message.success(res.msg)
            refreshList()
          })
        }} />
      }
    },
    {
      title: '剩余房卡数',
      dataIndex: 'insureScore',
      valueType: 'digit',
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      render: (_, record) => {

        return <Space>
          <Button type='link' size='small' onClick={() => setUpadateUserData(params => ({ ...params, visible: true, info: record }))}>修改密码</Button>
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
      options={false}
      pagination={{
        pageSize: 10,
        showQuickJumper: false
      }}
      rowKey={'userId'}
      columns={columns}
      request={async (params) => {
        const { current } = params
        const { data, totalCount } = await FetchUserListApi({
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
    {/* 修改用户信息 */}
    <UpdateUser {...updateUserData} refreshList={refreshList} onClose={() => setUpadateUserData(params => ({ ...params, visible: false }))} />
  </PageContainer>
}

export default Page