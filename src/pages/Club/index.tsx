/**
 * 俱乐部列表
 */
import { type ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, message, Space, Switch } from "antd"
import { FetchClubListApi, SetClubHideApi } from '@/services/club'
import ClubConfig from "@/pages/CLub/ClubConfig"
import { useRef, useState } from "react"
import ClubMember from "@/pages/CLub/ClubMember"
import ClubStatistics from "@/pages/CLub/ClubStatistics"

export interface ListItemType {
  clubId: number
  clubName: string
  clubNo: number
  mainGameId: number
  clubType: number
  peopleCount: number
  hideClub: number
}

const Page = () => {

  const actionRef = useRef<ActionType>(null)

  const [clubConfigData, setClubConfigData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const [clubMemberData, setClubMemberData] = useState({
    visible: false,
    clubInfo: {} as ListItemType
  })

  const [clubStatisticsData, setClubStatisticsData] = useState({
    visible: false,
    clubInfo: {} as ListItemType
  })

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '俱乐部号',
      dataIndex: 'clubNo',
      ellipsis: true,
      copyable: true
    },
    {
      title: '俱乐部名称',
      dataIndex: 'clubName',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '俱乐部类型',
      dataIndex: 'clubType',
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '普通俱乐部'
        },
        1: {
          text: '合伙人俱乐部'
        }
      }
    },
    {
      title: '群主ID',
      dataIndex: 'mainGameId',
      fieldProps: {
        controls: false
      },
      ellipsis: true,
      copyable: true
    },
    {
      title: '成员人数',
      dataIndex: 'peopleCount',
      hideInSearch: true
    },
    {
      title: '是否隐藏',
      dataIndex: 'hideClub',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
      render: (_, record) => {
        const { hideClub, clubId } = record
        return <Switch checked={!!hideClub} checkedChildren="是" unCheckedChildren="否" onChange={(checked) => {
          SetClubHideApi({
            clubID: clubId,
            hideClub: Number(checked)
          }).then(res => {
            message.success(res.msg)
            refreshList()
          })
        }} />
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        const { peopleCount } = record
        return <Space wrap>
          <Button type='link' size='small' onClick={() => {
            setClubConfigData({
              visible: true,
              info: record
            })
          }}>编辑</Button>
          {
            peopleCount > 0 && <Button type='link' size='small' onClick={() => setClubMemberData(params => ({ ...params, visible: true, clubInfo: record }))}>成员</Button>
          }
          <Button type='link' size='small' onClick={() => setClubStatisticsData(params => ({
            ...params,
            visible: true,
            clubInfo: record
          }))}>
            统计
          </Button>
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
      scroll={{
        x: true
      }}
      options={false}
      pagination={{
        pageSize: 10,
        showQuickJumper: false
      }}
      rowKey={'clubId'}
      columns={columns}
      request={async (params) => {
        const { current, clubType, clubNo, mainGameId } = params
        const { data, totalCount } = await FetchClubListApi({
          ...params,
          pageNum: current,
          clubType: clubType ? Number(clubType) : undefined,
          clubNo: clubNo ? Number(clubNo) : undefined,
          mainGameId: mainGameId ? Number(mainGameId) : undefined
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
    {/* 俱乐部成员 弹窗 */}
    <ClubMember {...clubMemberData} onClose={() => setClubMemberData(params => ({ ...params, visible: false, clubInfo: {} as ListItemType }))} />
    {/* 俱乐部统计 */}
    <ClubStatistics {...clubStatisticsData} onClose={() => setClubStatisticsData(params => ({ ...params, visible: false, clubInfo: {} as ListItemType }))}/>
  </PageContainer>
}

export default Page