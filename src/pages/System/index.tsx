/**
 * 俱乐部列表
 */
import { PageContainer } from "@ant-design/pro-components"
import { Button, Descriptions } from "antd"
import NoticeConfig from "./Notice"

const Page = () => {

  return <PageContainer>
    <Descriptions bordered column={3}>
      <Descriptions.Item label="跑马灯/公告/分享图">
        <NoticeConfig>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </NoticeConfig>
      </Descriptions.Item>
    </Descriptions>
  </PageContainer>
}

export default Page