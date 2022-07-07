import React, { FC } from "react";
import { Layout, Menu, Tabs, Card } from 'antd'
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const Home: FC = () => {

    return (
        <Card title='欢迎来到我的留言板'>欢迎来到我的留言板</Card>
    )

}
export default Home