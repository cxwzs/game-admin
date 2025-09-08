/**
 * 用户列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Image, message, Space, Statistic, Switch, Tooltip } from "antd"
import { FetchUserListApi, AllowCreateCircleApi, AllowCreateCircleByUserApi } from '@/services/user'
import UpdateUser from './UpdateUser'
import { useRef, useState } from "react"
import { UpdateUserInfoApi } from '@/services/user'
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import UpdateRoomCard from './RoomCard'

export interface ListItemType {
  userId: number
  gameId: number
  nickname: string
  headImg: string
  proxyLevel: number
  insureScore: number
  openCreate: number
  account: string
  vipLevel: number
}

const Page = () => {

  const actionRef = useRef<ActionType>()

  const [updateUserData, setUpadateUserData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const [updateRoomCardData, setUpadateRoomCardData] = useState({
    visible: false,
    info: {} as ListItemType,
    status: 'add'
  })

  // 所有玩家 是否允许 创建亲友圈
  const [allAllowCreateCircle, setAllowCreateCircle] = useState(false)
  const [allAllowCreateCircleLoading, setAllowCreateCircleLoading] = useState(false)

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '用户ID',
      dataIndex: 'gameId',
      copyable: true
    },
    {
      title: '账号',
      dataIndex: 'account',
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
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: { text: '否' },
        2: { text: '是' }
      }
    },
    {
      title: '是否代理',
      dataIndex: 'proxyLevel',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
      render: (_, record) => {
        const { proxyLevel, userId, vipLevel } = record
        return <Switch checked={!!proxyLevel} checkedChildren="是" unCheckedChildren="否" onChange={(checked) => {
          UpdateUserInfoApi({
            userId,
            proxyLevel: Number(checked),
            vipLevel
          }).then(res => {
            message.success(res.msg)
            refreshList()
          })
        }} />
      }
    },
    {
      title: '管理员',
      dataIndex: 'vipLevel',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
      render: (_, record) => {
        const { vipLevel, userId, proxyLevel } = record
        return <Switch checked={!!vipLevel} checkedChildren="是" unCheckedChildren="否" onChange={(checked) => {
          UpdateUserInfoApi({
            userId,
            adminLevel: Number(checked),
            proxyLevel
          }).then(res => {
            message.success(res.msg)
            refreshList()
          })
        }} />
      }
    },
    {
      title: '是否允许创建亲友圈',
      dataIndex: 'openCreate',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
      render: (_, record) => {
        const { openCreate, userId } = record
        return <Switch checked={!!openCreate} checkedChildren="是" unCheckedChildren="否" onChange={(checked) => {
          AllowCreateCircleByUserApi({
            userID: userId,
            openCreate: Number(checked)
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
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        const { insureScore } = record
        return <Space>
          <Statistic value={insureScore} valueStyle={{ fontSize: 16 }} />
          <Tooltip title='充值房卡'>
            <Button type='link' icon={<PlusCircleOutlined />} onClick={() => setUpadateRoomCardData({
              visible: true,
              status: 'add',
              info: record
            })}></Button>
          </Tooltip>
          <Tooltip title='扣除房卡'>
            <Button type='link' icon={<MinusCircleOutlined />} onClick={() => setUpadateRoomCardData({
              visible: true,
              status: 'deduct',
              info: record
            })}></Button>
          </Tooltip>
        </Space>
      }
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
      scroll={{
        x: true
      }}
      toolbar={{
        actions: [
          <Space>
            <span>允许所有玩家创建亲友圈</span>
            <Switch loading={allAllowCreateCircleLoading} checked={allAllowCreateCircle} checkedChildren='是' unCheckedChildren='否' onChange={(checked) => {
              setAllowCreateCircleLoading(true)
              AllowCreateCircleApi({
                allCreateClub:  Number(checked)
              }).then(res => {
                message.success(res.msg)
                setAllowCreateCircle(checked)
                refreshList()
              }).finally(() => setAllowCreateCircleLoading(false))
            }}></Switch>
          </Space>
        ]
      }}
      rowKey={'userId'}
      columns={columns}
      request={async (params) => {
        const { current, proxyLevel, gameId, ...reset } = params
        const { data, totalCount, allCreateClub } = await FetchUserListApi({
           ...reset,
          pageNum: current,
          proxyLevel: proxyLevel ? Number(proxyLevel) : undefined,
          // nickname: nickname ?? '',
          gameID: gameId ? Number(gameId) : undefined
        })
        setAllowCreateCircle(!!allCreateClub)
        return {
          data: data,
          success: true,
          total: totalCount
        }
      }}
    ></ProTable>
    {/* 修改用户信息 */}
    <UpdateUser {...updateUserData} refreshList={refreshList} onClose={() => setUpadateUserData(params => ({ ...params, visible: false }))} />
    {/* 修改用户房卡 */}
    <UpdateRoomCard {...updateRoomCardData} refreshList={refreshList} onClose={() => setUpadateRoomCardData(params => ({ ...params, visible: false, status: 'add' }))} />
  </PageContainer>
}

export default Page