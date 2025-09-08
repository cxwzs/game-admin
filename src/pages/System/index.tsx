/**
 * 俱乐部列表
 */
import { PageContainer } from "@ant-design/pro-components"
import { Button, Descriptions, Form, Input, message, Modal } from "antd"
import UploadImg from "./Upload"
import { UploadTypeEnum } from './enum'
import { FC, ReactNode, useEffect, useState } from "react"
import { UpdateAlipayApi, FetchAlipayApi, UpdateWechatApi, FetchWechatApi, SettingWechatLoginApi, FetchWechatLoginApi, SettingCustomServerApi, FetchCustomServerApi, FetchNoticeApi, UpdateNoticeApi } from '@/services/system'

interface MerchantConfigProps {
  children: (open: (status: boolean) => void) => ReactNode
  type: 'wechat' | 'alipay'
  title: string
}

interface LoginInfoConfigProps {
  children: (open: (status: boolean) => void) => ReactNode
  title: string
}

const merchantConfigRequestOptions = {
  wechat: {
    fetchApi: FetchWechatApi,
    updateApi: UpdateWechatApi
  },
  alipay: {
    fetchApi: FetchAlipayApi,
    updateApi: UpdateAlipayApi
  }
}

// 商户配置
const MerchantConfig: FC<MerchantConfigProps> = ({ title, children, type }) => {

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      merchantConfigRequestOptions[type].updateApi(formRes).then(res => {
        message.success(res.msg)
        setVisible(false)
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  const afterClose = () => {
    setLoading(false)
    form.resetFields()
  }

  useEffect(() => {
    if (visible) {
      merchantConfigRequestOptions[type].fetchApi().then(res => {
        form.setFieldsValue(res)
      })
    }
  }, [visible, type])

  return <>
    {children(setVisible)}
    <Modal
      title={title || '商户配置'}
      closable={false}
      keyboard={false}
      maskClosable={false}
      destroyOnHidden={true}
      confirmLoading={loading}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      afterClose={afterClose}
    >
      {
        type === 'alipay' && <Form form={form}>
          <Form.Item label='支付完成跳转地址' name='aliFinish' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='支付完成回调地址' name='aliPayNotify' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='应用ID' name='appId' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='商户私钥' name='privateKey' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='支付宝公钥' name='publicKey' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      }

      {
        type === 'wechat' && <Form form={form}>
          <Form.Item label='APIV3秘钥' name='mchAPIv3Key' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='证书序列号' name='mchCertificateSerialNumber' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='商户ID' name='mchID' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='商户私钥' name='privateKey' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label='支付完成回调' name='weChatPayNotify' rules={[
            { required: true, message: '请输入' }
          ]}>
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      }
    </Modal>
  </>
}

// 登录信息配置
const LoginInfoConfig: FC<LoginInfoConfigProps> = ({ title, children }) => {

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    setLoading(false)
    form.resetFields()
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      SettingWechatLoginApi(formRes).then(res => {
        message.success(res.msg)
        setVisible(false)
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  useEffect(() => {
    if(visible) {
      FetchWechatLoginApi().then(res => {
        form.setFieldsValue(res)
      })
    }
  }, [visible])

  return <>
    {children(setVisible)}
    <Modal
      title={title || '登录信息配置配置'}
      closable={false}
      keyboard={false}
      maskClosable={false}
      destroyOnHidden={true}
      confirmLoading={loading}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      afterClose={afterClose}
    >
      <Form form={form}>
        <Form.Item label='appId' name='appId' rules={[
          { required: true, message: '请输入' }
        ]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label='appSecret' name='appSecret' rules={[
          { required: true, message: '请输入' }
        ]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

// 客服联系方式配置
const CustomerServiceConfig: FC<LoginInfoConfigProps> = ({ title, children }) => {

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    setLoading(false)
    form.resetFields()
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      SettingCustomServerApi(formRes).then(res => {
        message.success(res.msg)
        setVisible(false)
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  useEffect(() => {
    if(visible) {
      FetchCustomServerApi().then(res => {
        form.setFieldsValue(res)
      })
    }
  }, [visible])

  return <>
    {children(setVisible)}
    <Modal
      title={title}
      closable={false}
      keyboard={false}
      maskClosable={false}
      destroyOnHidden={true}
      confirmLoading={loading}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      afterClose={afterClose}
    >
      <Form form={form}>
        <Form.Item label='客服微信' name='wxNum' rules={[
          { required: true, message: '请输入' }
        ]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

// 分享链接 配置
export const ShareLinkConfig: FC<LoginInfoConfigProps> = ({ title, children }) => {

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    setLoading(false)
    form.resetFields()
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      UpdateNoticeApi({
        // ...formRes,
        imgUrl: formRes.shareUrl,
        type: 4
      }).then(res => {
        message.success(res.msg)
        setVisible(false)
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  useEffect(() => {
    if(visible) {
      FetchNoticeApi().then(res => {
        form.setFieldsValue(res)
      })
    }
  }, [visible])

  return <>
    {children(setVisible)}
    <Modal
      title={title}
      closable={false}
      keyboard={false}
      maskClosable={false}
      destroyOnHidden={true}
      confirmLoading={loading}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      afterClose={afterClose}
    >
      <Form form={form}>
        <Form.Item label='分享链接' name='shareUrl' rules={[
          { required: true, message: '请输入' }
        ]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

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
      <Descriptions.Item label="支付宝商户配置">
        <MerchantConfig type='alipay' title="支付宝商户配置">
          {(open) => <Button type='primary' onClick={() => open(true)}>设置</Button>}
        </MerchantConfig>
      </Descriptions.Item>
      <Descriptions.Item label="微信商户配置">
        <MerchantConfig type='wechat' title="微信商户配置">
          {(open) => <Button type='primary' onClick={() => open(true)}>设置</Button>}
        </MerchantConfig>
      </Descriptions.Item>
      <Descriptions.Item label="微信登录信息配置">
        <LoginInfoConfig title="微信登录信息配置">
          {(open) => <Button type='primary' onClick={() => open(true)}>设置</Button>}
        </LoginInfoConfig>
      </Descriptions.Item>
      <Descriptions.Item label="客服联系方式配置">
        <CustomerServiceConfig title="客服联系方式配置">
          {(open) => <Button type='primary' onClick={() => open(true)}>设置</Button>}
        </CustomerServiceConfig>
      </Descriptions.Item>
      <Descriptions.Item label="分享链接配置">
        <ShareLinkConfig title="分享链接配置">
          {(open) => <Button type='primary' onClick={() => open(true)}>设置</Button>}
        </ShareLinkConfig>
      </Descriptions.Item>
    </Descriptions>
  </PageContainer>
}

export default Page