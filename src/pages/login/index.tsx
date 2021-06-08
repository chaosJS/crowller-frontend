import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';

import qs from 'qs';
import './style.css';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 8 },
};
const Login: React.FC = () => {
	const history = useHistory();
	const onFinish = (values: any) => {
		console.log('Success:', values);
		// 提交密码给后台 post 发送表单
		axios
			.post(
				'/api/login',
				qs.stringify({
					password: values.password,
				}),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			.then((res: AxiosResponse) => {
				if (res.data?.data) {
					history.push('/');
				} else {
					message.error(res.data?.errMsg);
				}
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className="login-page">
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
export default Login;
