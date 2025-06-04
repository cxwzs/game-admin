/**
 * 修改用户 房卡
 */
import { FC, useEffect, useState } from 'react'
import { Form, Input, InputNumber, message, Modal } from 'antd'
import { UpdateUserInfoApi, UpdateRoomCardApi } from '@/services/user'
import { type ListItemType } from './index'

interface UpdateRoomCardProps {
  visible: boolean
  onClose: () => void
  refreshList: () => void
  status: string
  info: ListItemType
}

const UpdateRoomCard: FC<UpdateRoomCardProps> = ({ visible, onClose, refreshList, info, status }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const afterClose = () => {
    form.resetFields()
    setLoading(false)
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      const { InsureScore } = formRes
      UpdateRoomCardApi({
        InsureScore: status === 'add' ? InsureScore : InsureScore * -1,
        userId: info.userId
      }).then(res => {
        message.success(res.msg)
        onClose()
        refreshList()
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  return <Modal
      title={`${status === 'add' ? '充值' : '扣除'}用户房卡`}
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
        <Form.Item label='房卡数量' name='InsureScore' extra={`当前用户房卡数量: ${info.insureScore}`} rules={[{
          required: true,
          validator: (rule, value) => {
            if(!value && value !== 0) return Promise.reject('请输入')
            if(value > info.insureScore && status === 'deduct') return Promise.reject('扣除数量不能大于当前用户房卡数量')
            return Promise.resolve()
          }
        }]}>
          <InputNumber placeholder='请输入' controls={false} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
}

export default UpdateRoomCard