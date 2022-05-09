import React, { FC } from "react";
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout;
import './home.scss'
const Home: FC = () => {
    return (
        <Layout style={{ height: '100vh' }} className='layout_style'>
            <Header className="layout_header">
                <Menu mode="horizontal" >
                    <Menu.Item>111</Menu.Item>
                    <Menu.Item>1111</Menu.Item>
                    <Menu.Item>1111</Menu.Item>
                </Menu>
            </Header>
            <Content>

            </Content>
        </Layout>

    )

}
export default Home