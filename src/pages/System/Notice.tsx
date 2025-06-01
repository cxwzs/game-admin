/**
 * 跑马灯/公告/分享图
 */
import { FC, ReactNode, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, Input, message, Modal, Row, Upload } from 'antd'
import { FetchNoticeApi, FetchOssTokenApi, UpdateNoticeApi } from '@/services/system'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Style from './notice.module.less'
import * as OSS from 'ali-oss'

interface NoticeConfigProps {
  children: (open: () => void) => ReactNode
}

const NoticeConfig: FC<NoticeConfigProps> = ({ children }) => {

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
      UpdateNoticeApi(formRes).then(res => {
        message.success(res.msg)
        onClose()
      }).finally(() => setLoading(false))
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  const beforeUpload = (file: File) => {
    const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isValidType) {
      message.warning('只能上传 JPG/PNG 文件！')
      return Upload.LIST_IGNORE
    }

    const isValidSize = file.size / 1024 / 1024 < 5 // 小于 5MB
    if (!isValidSize) {
      message.warning('文件大小不能超过 5MB')
      return Upload.LIST_IGNORE
    }

    return true
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList[0]
  }

  const createOssFileName = (file: File) => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    const ext = file.name.split('.').pop()
    return `${timestamp}-${random}.${ext}`
  }

  const customRequest = (options: any) => {
    const { file, onSuccess, onProgress, onError } = options
    const fileName = createOssFileName(file)
    FetchOssTokenApi({ fileName }).then(async res => {
      const { } = res
      const client = new OSS({
        region: 'oss-cn-beijing', // 替换为你的region
        accessKeyId: 'your-accessKeyId', // 替换为你的AccessKeyId
        accessKeySecret: 'your-accessKeySecret', // 替换为你的AccessKeySecret
        bucket: 'your-bucket-name', // 替换为你的bucket名称
      })
      try {
        const result = await client.put(fileName, file, {
          progress: (p: number) => {
            onProgress({ percent: p * 100 })
          },
        });

        console.log('Upload success:', result)
        onSuccess(result) // 返回结果给组件
      } catch (err) {
        console.error('Upload failed:', err)
        onError({ err })
      }
    }).catch(err => onError(err))
  }

  useEffect(() => {
    if (visible) {
      FetchNoticeApi().then(res => {
        form.setFieldsValue(res)
      })
    }

    return () => {
      form.resetFields()
    }
  }, [visible])

  return <>
    {children(() => setVisible(true))}
    <Modal
      title="跑马灯/公告/分享图"
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
        <Form.Item label='公告' name='notice' rules={[{ required: true, message: '请输入' }]}>
          <Input.TextArea rows={4} placeholder='请输入' />
        </Form.Item>
        <Form.Item
          label="分享图"
          name='shareImg'
          valuePropName="shareImg"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传' }]}
        >
          <Upload
            accept='.png, .jpg, .jpeg'
            listType="picture-card"
            maxCount={1}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            itemRender={(_, file, fileList, actions) => {
              const { remove } = actions
              return <div className={Style.imgItem}>
                <Image src={file.thumbUrl} />
                <Button className={Style.deleteBtn} type='link' size='large' danger icon={<DeleteOutlined />} onClick={remove}></Button>
              </div>
            }}
          >
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Card title='跑马灯配置'>
          <Form.List name="data">
            {(fields, { add, remove }) => (
              <Row gutter={[0, 0]}>
                {fields.map(({ key, name, ...restField }) => (
                  <Col span={24} key={key} style={{ width: '100%', display: 'flex', gap: '10px' }}>
                    <Col span={20}>
                      <Form.Item
                        {...restField}
                        name={[name, 'msg']}
                        rules={[{ required: true, message: '请输入' }]}
                      >
                        <Input placeholder="请输入" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Col>
                ))}
                <Col span={24}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    新增跑马灯
                  </Button>
                </Col>
              </Row>
            )}
          </Form.List>
        </Card>
      </Form>
    </Modal>
  </>
}

export default NoticeConfig