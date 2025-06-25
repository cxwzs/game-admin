/**
 * 俱乐部列表
 */
import { PageContainer } from "@ant-design/pro-components"
import { Button, Descriptions } from "antd"
import UploadImg from "./Upload"
import { UploadTypeEnum } from './enum'

const Page = () => {

  return <PageContainer>
    <Descriptions bordered column={1}>
      <Descriptions.Item label="分享图">
        <UploadImg uploadType={UploadTypeEnum.share}>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </UploadImg>
      </Descriptions.Item>
      <Descriptions.Item label="推广图">
        <UploadImg uploadType={UploadTypeEnum.promotion}>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </UploadImg>
      </Descriptions.Item>
      <Descriptions.Item label="公告图">
        <UploadImg uploadType={UploadTypeEnum.notice}>
          {(open) => <Button type='primary' onClick={open}>设置</Button>}
        </UploadImg>
      </Descriptions.Item>
    </Descriptions>
  </PageContainer>
}

export default Page