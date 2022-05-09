import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './styles/index.scss';
moment.locale('zh-cn');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN}>
    <Home />
  </ConfigProvider>
);

