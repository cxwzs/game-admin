/**
 * 俱乐部配置
 */
import { FC, useEffect, useState } from 'react'
import { type ListItemType } from './index'
import { Form, Input, message, Modal } from 'antd'
import { UpdateClubInfoApi } from '@/services/club'

interface ClubConfigProps {
  visible: boolean
  onClose: () => void
  refreshList: () => void
  info: ListItemType
}

const ClubConfig: FC<ClubConfigProps> = ({ visible, onClose, refreshList, info }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    form.resetFields()
    setLoading(false)
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      UpdateClubInfoApi({
        ...formRes,
        clubId: info.clubId
      }).then(res => {
        message.success(res.msg)
        onClose()
        refreshList()
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  useEffect(() => {
    if (visible && info && Object.keys(info).length) {
      form.setFieldsValue(info)
    }

    return () => {
      form.resetFields()
    }
  }, [visible, info])

  return <Modal
    title="俱乐部配置"
    closable={false}
    maskClosable={false}
    keyboard={false}
    open={visible}
    confirmLoading={loading}
    onCancel={onClose}
    afterClose={afterClose}
    onOk={onSubmit}
  >
    <Form form={form}>
      <Form.Item label='俱乐部名称' name='clubName' rules={[{ required: true, message: '请输入俱乐部名称' }]}>
        <Input placeholder='请输入俱乐部名称' />
      </Form.Item>
    </Form>
  </Modal>
}

export default ClubConfig