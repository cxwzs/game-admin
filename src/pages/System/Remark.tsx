/**
 * 留言
 */
import { FC, ReactNode, useState } from 'react'
import { Form, Input, message, Modal } from 'antd'
import { UpdateRemarkApi } from '@/services/system'

interface RemarkConfigProps {
  children: (open: () => void) => ReactNode
}

const RemarkConfig: FC<RemarkConfigProps> = ({ children }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  const afterClose = () => {
    form.resetFields()
    setLoading(false)
  }

  const onClose = () => {
    setVisible(false)
  }

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      UpdateRemarkApi(formRes).then(res => {
        message.success(res.msg)
        onClose()
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  return <>
    {children(() => setVisible(true))}
    <Modal
      title="留言信息"
      width={'30vw'}
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
        <Form.Item label='留言' name='remark' rules={[{ required: true, message: '请输入' }]}>
          <Input.TextArea rows={4} placeholder='请输入' />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default RemarkConfig