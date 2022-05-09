import React,{FC} from "react";
import {Form,Input} from 'antd'
const Home :FC=()=>{
    return   <Form>
        <Form.Item label='用户名'>
<Input></Input>
        </Form.Item>
        <Form.Item label='密码'>
<Input></Input>
        </Form.Item>
    </Form>
  
}
export default Home