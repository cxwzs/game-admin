/**
 * 用户列表
 */
import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { Image } from "antd"
import { FetchUserListApi } from '@/services/user'

interface ListItemType {
  userId: number
  gameId: number
  nickname: string
  headImg: string
  proxyLevel: number
  insureScore: number
}

const Page = () => {

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
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
    }
  ]

  return <PageContainer>
    <ProTable
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
  </PageContainer>
}

export default Page