import React, { FC } from "react";
import { Layout, Menu, Tabs, Card } from 'antd'
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const Home: FC = () => {

    return (
        <Card title='欢迎来到我的视频页'>欢迎来到我的视频页</Card>
    )

}
export default Home