import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../api/user.api';
import dayjs from 'dayjs'
import './sign.scss';

export const SignIn: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const loginGoHome = async () => {
        const data = await form.validateFields();
        const res = await UserApi.findOneUser(data.username)

        const userInfo = {
            ...res.data,
            token: dayjs(res.data.created_time).valueOf()
        }
        window.localStorage.setItem('user', JSON.stringify(userInfo))
        window.localStorage.setItem('token', JSON.stringify(userInfo.token))
        if (res.code) {
            message.success('登录成功')
            navigate('/home', { replace: true });
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
                    <span className='title'>欢迎</span>
                </div>

                <div className='desc'>Welcome </div>

                <div className='main'>
                    <Form className='signin-form' form={form}>
                        <Form.Item name='username' rules={[{ required: true, message: '请输入姓名' }]}>
                            <Input
                                prefix={<UserOutlined className='signin-input-prefix' />}
                                placeholder='请输入账号'
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
                        <div style={{ display: 'flex' }}>
                            <Button type='primary' className='signin-submit-btn' onClick={loginGoHome}>
                                登 录
                            </Button>
                            <Button type='link' className='signin-submit-btn' onClick={() => {
                                navigate('/sign',);
                            }}>
                                注册?
                            </Button>
                        </div>


                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
