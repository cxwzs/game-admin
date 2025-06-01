/**
 * 修改用户信息
 */
import { FC, useState } from 'react'
import { Form, Input, message, Modal } from 'antd'
import { UpdateUserInfoApi } from '@/services/user'
import { type ListItemType } from './index'

interface UpdateUserProps {
  visible: boolean
  onClose: () => void
  refreshList: () => void
  info: ListItemType
}

const UpdateUser: FC<UpdateUserProps> = ({ visible, onClose, refreshList, info }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    form.resetFields()
    setLoading(false)
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      UpdateUserInfoApi({
        ...formRes,
        userId: info.userId
      }).then(res => {
        message.success(res.msg)
        onClose()
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  return <Modal
      title="用户信息"
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
        <Form.Item label='密码' name='passWord' rules={[{ required: true, message: '请输入' }]}>
          <Input.Password placeholder='请输入' visibilityToggle />
        </Form.Item>
      </Form>
    </Modal>
}

export default UpdateUser