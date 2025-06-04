/**
 * 跑马灯配置
 */
import { FC, useEffect, useState } from 'react'
import { type ListItemType } from './index'
import { Form, Input, message, Modal } from 'antd'
import { UpdateHorseApi } from '@/services/horse'

interface HorseConfigProps {
  visible: boolean
  onClose: () => void
  refreshList: () => void
  info: ListItemType
}

const HorseConfig: FC<HorseConfigProps> = ({ visible, onClose, refreshList, info }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    form.resetFields()
    setLoading(false)
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      UpdateHorseApi({
            id: info.id,
            msg: formRes.msg
          }).then(res => {
        message.success('操作成功')
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
    title="跑马灯配置"
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
      <Form.Item label='内容' name='msg' rules={[{ required: true, message: '请输入' }]}>
        <Input placeholder='请输入' />
      </Form.Item>
    </Form>
  </Modal>
}

export default HorseConfig