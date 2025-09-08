/**
 * 商品配置
 */
import { type ActionType, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Switch } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { FetchProductListApi, SettingProductApi, UpdateProductApi } from '@/services/product'

interface ListItemType {
  describe: string
  gift: number
  id: number
  num: number
  price: number
  recommend: number
  type: number
}

interface ProductConfigProps {
  visible: boolean
  onClose: () => void
  refreshList: () => void
  info: ListItemType
}

const typeOptions = [
  {
    label: '房卡',
    value: 0
  },
  {
    label: '金币',
    value: 1
  }
]

// 商品配置
const ProductConfig: FC<ProductConfigProps> = ({ visible, onClose, refreshList, info }) => {

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    form.validateFields().then(formRes => {
      setLoading(true)
      const { recommend, ...reset } = formRes
      if (Object.keys(info).length) {
        UpdateProductApi({
          ...reset,
          recommend: Number(recommend),
          id: info.id || undefined
        }).then(res => {
          message.success(res.msg)
          onClose()
          refreshList()
        }).finally(() => setLoading(false))
      } else {
        SettingProductApi({
          ...reset,
          recommend: Number(recommend)
        }).then(res => {
          message.success(res.msg)
          onClose()
          refreshList()
        }).finally(() => setLoading(false))
      }
    }).catch(err => console.log(err, 'form表单校验失败'))
  }

  const afterClose = () => {
    setLoading(false)
    form.resetFields()
  }

  useEffect(() => {
    if (visible && info && Object.keys(info).length) {
      const { recommend, ...reset } = info
      form.setFieldsValue({
        ...reset,
        recommend: !!recommend
      })
    }
  }, [visible, info])

  return <Modal
    title="商品配置"
    closable={false}
    keyboard={false}
    maskClosable={false}
    destroyOnHidden={true}
    confirmLoading={loading}
    open={visible}
    onCancel={onClose}
    onOk={onSubmit}
    afterClose={afterClose}
  >
    <Form form={form}>
      <Form.Item label='商品名称' name='describe' rules={[
        {
          required: true,
          message: '请输入'
        }
      ]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label='赠送数量' name='gift' rules={[
        {
          required: true,
          message: '请输入'
        }
      ]}>
        <InputNumber placeholder="请输入" style={{ width: '100%' }} controls={false} />
      </Form.Item>
      <Form.Item label='购买获得数目' name='num' rules={[
        {
          required: true,
          message: '请输入'
        }
      ]}>
        <InputNumber placeholder="请输入" style={{ width: '100%' }} controls={false} />
      </Form.Item>
      <Form.Item label='价格(单位: 分)' name='price' rules={[
        {
          required: true,
          message: '请输入'
        }
      ]}>
        <InputNumber placeholder="请输入" style={{ width: '100%' }} controls={false} />
      </Form.Item>
      <Form.Item label='是否推荐' name='recommend' initialValue={true} valuePropName='checked' rules={[
        {
          required: true,
          message: '请选择'
        }
      ]}>
        <Switch checkedChildren='是' unCheckedChildren='否' />
      </Form.Item>
      <Form.Item label='类型' name='type' rules={[
        {
          required: true,
          message: '请选择'
        }
      ]}>
        <Select placeholder='请选择' options={typeOptions} />
      </Form.Item>
    </Form>
  </Modal>
}

const Page = () => {

  const actionRef = useRef<ActionType>()

  const [productConfigData, setProductConfigData] = useState({
    visible: false,
    info: {} as ListItemType
  })

  const columns: ProColumns<ListItemType>[] = [
    {
      title: '商品名称',
      dataIndex: 'describe',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '赠送数量',
      dataIndex: 'gift',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '购买获得数目',
      dataIndex: 'num',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '价格(单位: 分)',
      dataIndex: 'price',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '是否推荐',
      dataIndex: 'recommend',
      ellipsis: true,
      hideInSearch: true,
      renderText: (_, record) => {
        const { recommend } = record
        return recommend !== 0 ? '是' : '否'
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      valueType: 'select',
      request: async () => typeOptions
    },
    {
      title: '操作',
      dataIndex: 'options',
      hideInSearch: true,
      render: (_, record) => {

        return <Space wrap>
          <Button type='link' size='small' onClick={() => setProductConfigData({
            visible: true,
            info: record
          })}>编辑</Button>
        </Space>
      }
    }
  ]

  const refreshList = () => {
    actionRef.current?.reload()
  }

  return <>
    <ProTable<ListItemType>
      actionRef={actionRef}
      columns={columns}
      options={false}
      pagination={{
        pageSize: 10
      }}
      scroll={{
        x: true
      }}
      toolbar={{
        actions: [
          <Button type='primary' onClick={() => setProductConfigData(params => ({ ...params, visible: true }))}>添加商品</Button>
        ]
      }}
      rowKey={'id'}
      request={async (params) => {
        const { current, type, ...reset } = params
        const { data, totalCount } = await FetchProductListApi({
          ...reset,
          pageNum: current,
          type: Number(type)
        })
        return {
          data: data || [],
          success: true,
          total: totalCount || 0
        }
      }}
    ></ProTable>
    {/* 商品配置 */}
    <ProductConfig {...productConfigData} refreshList={refreshList} onClose={() => setProductConfigData(params => ({ ...params, visible: false, info: {} as ListItemType }))} />
  </>
}

export default Page