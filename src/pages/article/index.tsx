import React, { FC, useState, useEffect } from "react";
import { Table, Card, Row, Col, Input, Popconfirm, Form, Button, Drawer, Space, message, DatePicker, PageHeader } from 'antd'
import { ArticleItem, SearchParams } from "../../types/article.type";
import { ArticleApi } from "../api/article.api";
import dayjs from 'dayjs'
const Home: FC = () => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>(false)
    const [drawerTitle, setDrawerTitle] = useState<string>('新增')
    const [articleInfo, setArticleInfo] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [dataList, setDataList] = useState<ArticleItem[]>([])
    const [pageInfo, setPageInfo] = useState<any>({
        total: 0,
        current: 0
    })
    const [searchParams, setSearchParams] = useState<SearchParams>({
        page: 1,
        pageSize: 10,
        title: '',
        start_time: '',
        end_time: ''
    })
    const columns: any = [
        { title: '文章标题', key: 'title', dataIndex: 'title' },
        { title: '文章内容', key: 'content', dataIndex: 'content' },
        { title: '浏览量', key: 'browse_count', dataIndex: 'browse_count' },
        // { title: '标签', key: 'remark', dataIndex: 'remark' },
        {
            title: '创建时间', align: 'center', key: 'created_time', dataIndex: 'created_time',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (row: ArticleItem) => <div>
                <Button type="link" onClick={() => { handleEdit(row, '编辑') }}>编辑</Button>
                <Button type="primary" style={{ marginRight: 20 }} onClick={() => { handleEdit(row, '查看') }}>查看</Button>
                <Popconfirm
                    title="确定删除?"
                    onConfirm={() => { handleDelete(row) }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="primary" danger>删除</Button>
                </Popconfirm>
            </div>
        },
    ]
    const handleDelete = async (row: ArticleItem) => {
        const res = await ArticleApi.deleteItem(row.id)
        if (res?.code) {
            message.success('删除成功')
            handleSearch()
        }
    }
    const handleEdit = (data: any, type: string) => {
        setDrawerTitle(type)
        setArticleInfo(data)
        form.setFieldsValue({
            ...data
        })
        setVisible(true)
    }
    const onClose = () => {
        setArticleInfo({})
        setVisible(false)
        form.resetFields()
    }
    const submit = async () => {
        const data = await form.validateFields();
        let res = null
        let params = {
            ...data
        }
        if (articleInfo && articleInfo.id) {
            params.id = articleInfo.id
            res = await ArticleApi.editItem(params)
        } else {
            res = await ArticleApi.createArticle(data)
        }
        if (res?.code) {
            message.success(`${articleInfo.id ? '编辑' : '新增'}成功`)
            setArticleInfo({})
            form.resetFields()
            setVisible(false)
            handleSearch(1)
        }
    }
    useEffect(() => {
        handleSearch(1)
    }, [])
    const timeChange = (data: any) => {
        const time = data ? [dayjs(data[0]).format('YYYY-MM-DD'), dayjs(data[1]).format('YYYY-MM-DD')] : '';
        setSearchParams({
            ...searchParams,
            start_time: time[0],
            end_time: time[1]
        })
    }
    const handleSearch = async (page?: number) => {
        setLoading(true)
        const list = await ArticleApi.getList(searchParams)
        setLoading(false)
        if (list?.code) {
            message.success('请求成功')
            setPageInfo({
                current: list.data.currentPage,
                total: list.data.total
            })
            setDataList(list?.data?.list)
        }
    }
    const pageChange = (page: number) => {
        handleSearch(page)
    }
    return (
        <Card >
            <PageHeader
                title='文章管理'
                extra={
                    <Button type="primary" onClick={() => { setVisible(true) }}>添加</Button>
                }
            ></PageHeader>
            <Row gutter={16}>
                <Col span={5}>
                    <Form.Item label='名称'>
                        <Input onChange={(e) => {
                            setSearchParams({
                                ...searchParams,
                                title: e.target.value
                            })
                        }} style={{ width: 120 }} ></Input>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label='创建时间'>
                        <RangePicker onChange={timeChange} style={{ width: 240 }} />
                    </Form.Item>
                </Col>
                <Col >
                    <Button type="primary" style={{ marginRight: '20px' }} onClick={() => { handleSearch(1) }}>搜索</Button>
                </Col>
            </Row>
            <Table columns={columns}
                dataSource={dataList}
                loading={loading}
                rowKey='id'
                pagination={{
                    total: pageInfo.total,
                    pageSize: 10,
                    current: pageInfo.current,
                    onChange: pageChange
                }}></Table>
            <Drawer title={`${drawerTitle}文章`} placement="right" onClose={onClose} width={720} visible={visible} extra={
                <Space>
                    <Button onClick={() => { setVisible(false) }}>取消</Button>
                    <Button type="primary" onClick={submit} hidden={drawerTitle === '查看'}>
                        确定
                    </Button>
                </Space>
            }>
                <Form form={form}>
                    <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
                        <Input style={{ width: 240 }} disabled={drawerTitle === '查看'}></Input>
                    </Form.Item>
                    <Form.Item label='内容' name='content' rules={[{ required: true, message: '请输入内容' }]}>
                        <Input.TextArea rows={6} disabled={drawerTitle === '查看'}></Input.TextArea>
                    </Form.Item>
                    {/* <Form.Item label='标签' name='remark'>
                        <Input></Input>
                    </Form.Item> */}
                </Form>
            </Drawer>
        </Card >
    )

}
export default Home