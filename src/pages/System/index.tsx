/**
 * 俱乐部列表
 */
import { PageContainer } from "@ant-design/pro-components"
import { Button, Descriptions } from "antd"
import NoticeConfig from "./Notice"
import RemarkConfig from "./Remark"

const Page = () => {

  return <PageContainer>
    <Descriptions bordered column={3}>
      <Descriptions.Item label="跑马灯/公告/分享图">
        <NoticeConfig>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </NoticeConfig>
      </Descriptions.Item>
      <Descriptions.Item label="留言信息">
        <RemarkConfig>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </RemarkConfig>
      </Descriptions.Item>
    </Descriptions>
  </PageContainer>
}

export default Page