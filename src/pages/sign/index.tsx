import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../api/user.api';
import { phoneReg } from '../../utils/reg';
import './sign.scss';

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const loginGoHome = async () => {
    setLoading(true)
    let data = await form.validateFields();
    delete data.password_secound
    const status = await UserApi.createUser(data);
    if (status?.code) {
      message.success('注册成功，即将回到登录页面')
      setLoading(false)
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1000)
    } else {
      setLoading(false)
    }

  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        loginGoHome();
      }
    });
  }, []);

  return (
    <div className='sign-container'>
      <div className='sign-content'>
        <div className='header'>
          <span className='title'>注册页面</span>
        </div>

        <div className='desc'>Welcome </div>

        <div className='main'>
          <Form className='signin-form' form={form}>
            <Form.Item name='user_name' rules={[{ required: true, message: '请输入姓名' }]}>
              <Input
                prefix={<UserOutlined className='signin-input-prefix' />}
                placeholder='请输入用户名'
                type='text'
                className='signin-input'
              />
            </Form.Item>
            <Form.Item name='phone' rules={[{ required: true, message: '请输入手机号' }, {
              pattern: new RegExp(phoneReg), message: '请输入正确的手机号'
            }]}>
              <Input
                prefix={<UserOutlined className='signin-input-prefix' />}
                placeholder='请输入手机号'
                type='text'
                className='signin-input'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password
                prefix={<LockOutlined className='signin-input-prefix' />}
                placeholder='请输入密码'
                type='password'
                className='signin-input'
              />
            </Form.Item>
            <Form.Item name='password_secound' rules={[{ required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致!'));
              },
            }),]}>
              <Input.Password
                prefix={<LockOutlined className='signin-input-prefix' />}
                placeholder='请再次输入密码'
                type='password'
                className='signin-input'
              />
            </Form.Item>
            <Button type='primary' className='signin-submit-btn' onClick={loginGoHome} loading={loading}>
              {/* <Button loading={loading} type='primary' className='signin-submit-btn' onClick={loginGoHome}> */}
              注册
            </Button>
          </Form>
        </div>
      </div>
    </div >
  );
};

export default SignIn;
