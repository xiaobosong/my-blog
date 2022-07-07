import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapRoute from './routers/render';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'dayjs/locale/zh-cn';
moment.locale('zh-cn');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN}>
    <WrapRoute></WrapRoute>
  </ConfigProvider>
);

