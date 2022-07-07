import React, { FC, useEffect, useState } from 'react';
import { Link, Outlet, PathMatch, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Space, Dropdown } from 'antd';
import IconFont from '../components/icon/IconFont';
import { getLocalUserData } from '../utils/data';
import menuData, { MenuData } from './base-menu';

import '../styles/layout.scss';

const { Header, Sider, Content } = Layout;

const deepMenuData = (
  menuDataDeep: MenuData[],
  matchResult: PathMatch<string> | null,
  menuSelectKeys: string[],
): void => {
  if (!matchResult) {
    return;
  }
  for (const menuDataItem of menuDataDeep) {
    if (Array.isArray(menuDataItem.children) && menuDataItem.children.length > 0) {
      deepMenuData(menuDataItem.children, matchResult, menuSelectKeys);
      if (menuSelectKeys.length > 0) {
        menuSelectKeys.unshift(menuDataItem.name);
        break;
      }
    }
    if (menuDataItem.path && menuDataItem.path === matchResult?.pathname) {
      menuSelectKeys.unshift(menuDataItem.name);
      break;
    }
  }
};

const BaseLayout: FC = () => {
  const userLocalInfo = getLocalUserData();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const matchResult = useMatch(location.pathname);
  console.log(userLocalInfo, 'userLocalInfouserLocalInfouserLocalInfo')
  useEffect(() => {
    if (!userLocalInfo) {
      navigate('/login', { replace: true });
    } else {
      getDefaultSelectAndOpenKeys();
    }
  }, []);

  const getDefaultSelectAndOpenKeys = (): void => {
    let defaultSelectKeys: string[] = ['首页'];
    let defaultOpenKeys: string[] = [];
    const menuSelectKeys: string[] = [];
    deepMenuData(menuData, matchResult, menuSelectKeys);
    if (menuSelectKeys.length > 0) {
      const currentSelectKey: string | undefined = menuSelectKeys.pop();
      if (currentSelectKey) {
        defaultSelectKeys = [currentSelectKey];
      }
      if (menuSelectKeys.length > 0) {
        defaultOpenKeys = menuSelectKeys;
      }
      setSelectKeys(defaultSelectKeys);
      setOpenKeys(defaultOpenKeys);
    }
  };
  const changeOpenKeys = (name: string): void => {
    const currentOpenKeys = [...openKeys];
    if (currentOpenKeys.includes(name)) {
      currentOpenKeys.splice(currentOpenKeys.indexOf(name), 1);
    } else {
      currentOpenKeys.push(name);
    }
    setOpenKeys(currentOpenKeys);
  };

  const changeSelectKeys = (name: string): void => {
    if (name === selectKeys[0]) {
      setSelectKeys([]);
    } else {
      setSelectKeys([name]);
    }
  };
  const loginOut = async () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    navigate('/login', { replace: true });
  }


  return (
    <Layout className='base-layout' style={{ height: '100vh' }}>
      <Header className='layout-header'>
        <div className='layout-header-logo'>
          <h1>个人博客</h1>
        </div>
        <div style={{ flex: 1 }} />

        <Space className=''>
          <div className='layout-header-action'>
            <IconFont style={{ color: '#fff' }} type='icon-info-circle' />
          </div>
          <div className='layout-header-action'>
            <IconFont style={{ color: '#fff' }} type='icon-bell' />
          </div>
          <Dropdown
            overlay={
              <Menu style={{ width: 160 }}>
                <Menu.Item icon={<IconFont type='icon-user' />}>个人信息</Menu.Item>
                <Menu.Item icon={<IconFont type='icon-setting' />}>系统设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<IconFont type='icon-log-out' />} onClick={loginOut}>退出登录</Menu.Item>
              </Menu>
            }
          >
            <div className='layout-header-action'>
              <Space>
                <Avatar
                  style={{ backgroundColor: '#f56a00', color: '#fff' }}
                  icon={<IconFont style={{ color: '#fff' }} type='icon-user' />}
                  size='small'
                />
                <span>用户名称</span>
              </Space>
            </div>
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sider className='layout-menu' theme='light' collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu mode='inline' selectedKeys={selectKeys} openKeys={openKeys}>
            {menuData.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <Menu.SubMenu
                    key={item.name}
                    title={item.name}
                    icon={item.icon ? <IconFont type={item.icon} /> : null}
                    onTitleClick={() => changeOpenKeys(item.name)}
                  >
                    {item.children.map((child) => {
                      return (
                        <Menu.Item key={child.name} icon={child.icon ? <IconFont type={child.icon} /> : null}>
                          <Link to={child.path as string} onClick={() => changeSelectKeys(child.name)}>
                            {child.name}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              }
              return (
                <Menu.Item key={item.name} icon={item.icon ? <IconFont type={item.icon} /> : null}>
                  <Link to={item.path as string} onClick={() => changeSelectKeys(item.name)}>
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        {/* 页面主要内容 */}
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
