import { Button, Form, Input, message } from "antd"
import Styles from './index.module.less'
import { LoginApi } from '@/services/login'
import { useState } from "react"
import { history, useModel } from "@umijs/max"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"

const Login = () => {

  const { initialState, setInitialState } = useModel('@@initialState')

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onLogin = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      LoginApi(formRes).then(async res => {
        message.success('登录成功')
        const { token } = res
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify({
          name: formRes.adminAccount
        }))
        setInitialState(params => ({...params, name: formRes.adminAccount}))
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/')
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  return <div className={Styles.container}>
    <div className={Styles.loginForm}>
      <h2>后台管理系统</h2>
      <Form size='large' form={form}>
        <Form.Item name='adminAccount' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name='adminPassWord' rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="请输入密码" />
        </Form.Item>
      </Form>
      <Button type="primary" size='large' loading={loading} onClick={onLogin}>登录</Button>
    </div>
  </div>
}

export default Login
