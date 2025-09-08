/**
 * 俱乐部统计
 */
import { Drawer, Flex, Space, Statistic } from "antd"
import { FC, useState } from "react"
import { type ListItemType as ClubInfoType } from './index'
import { ProColumns, ProTable } from "@ant-design/pro-components"
import { FetchClubStatisticsApi } from '@/services/club'
import dayjs, { Dayjs } from "dayjs"

interface ClubStatisticsProps {
  visible: boolean
  onClose: () => void
  clubInfo: ClubInfoType
}

interface clubStatisticsType {
  count: number
  gameName: string
  kindId: number
}

const ClubStatistics: FC<ClubStatisticsProps> = ({ visible, onClose, clubInfo }) => {

  const [statistics, setStatistics] = useState({
    totalCostCard: 0,
    totalGameCount: 0,
    totalUserCount: 0
  })

  const columns: ProColumns<clubStatisticsType>[] = [
    {
      title: 'ID',
      dataIndex: 'gameId',
      hideInSearch: true
    },
    {
      title: '游戏名称',
      dataIndex: 'gameName',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '玩家数量',
      dataIndex: 'count',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '日期',
      dataIndex: 'date',
      hideInTable: true,
      valueType: 'date',
      initialValue: [dayjs().startOf('day')],
      fieldProps: {
        disabledDate: (current: Dayjs) => current && current > dayjs().startOf('day'),
        allowClear: false,
        inputReadOnly: true
      }
    }
  ]

  return <Drawer
    title="俱乐部统计"
    width={'40vw'}
    keyboard={false}
    destroyOnHidden
    open={visible}
    onClose={onClose}
  >
    <ProTable
      options={false}
      size="small"
      scroll={{
        x: true
      }}
      headerTitle={(
        <Flex gap={16} wrap> 
          <Space>
            <span>当天总消耗房卡：</span>
            <Statistic value={statistics.totalCostCard} />
          </Space>
          <Space>
            <span>当天总局数：</span>
            <Statistic value={statistics.totalGameCount} />
          </Space>
          <Space>
            <span>当天玩家数：</span>
            <Statistic value={statistics.totalUserCount} />
          </Space>
        </Flex>
      )}
      pagination={false}
      columns={columns}
      request={async (params) => {
        const { date } = params
        const { gamePlayCount, totalCostCard, totalGameCount, totalUserCount } = await FetchClubStatisticsApi({
          clubID: clubInfo.clubId,
          date: dayjs(date).format('YYYY-MM-DD 00:00:00')
        })
        setStatistics({
          totalCostCard: totalCostCard || 0,
          totalGameCount: totalGameCount || 0,
          totalUserCount: totalUserCount || 0
        })
        return {
          data: gamePlayCount || [],
          success: true,
          total: gamePlayCount.length || 0
        }
      }
      }
    ></ProTable>
  </Drawer>
}

export default ClubStatistics