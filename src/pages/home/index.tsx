import React, { FC, useState, useEffect } from "react";
import { Card, Row, Col, Popover } from 'antd'
import { ArticleApi } from "../api/article.api";
;
const Home: FC = () => {
    const [articleList, setArticleList] = useState<any[]>([])
    const cardList = (data: any) => {
        return data.map((item: any) => (
            <Col key={item.id} span={6}>
                <Card>
                    <div
                        style={{ cursor: 'pointer' }}
                    >
                        <h3>{item.title}</h3>
                        {item.content && item.content.length > 12 ? (
                            <Popover content={item.content}>{`${item.content.slice(0, 12)}...`}</Popover>
                        ) : (
                            <div>{item.content || '/'}</div>
                        )}
                    </div>
                </Card>
            </Col>
        ));
    }
    useEffect(() => {
        getArticleList()
    }, [])
    const getArticleList = async () => {
        const result = await ArticleApi.getList()
        if (result?.code) {
            setArticleList(result?.data?.list)
        }
    }
    return (
        <div>
            <Card title='文章列表'>
                <Row gutter={[16, 24]}>{cardList(articleList)}</Row>

            </Card>
        </div>
    )

}



export default Home