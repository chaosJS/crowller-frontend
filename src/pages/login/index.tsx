import React from 'react';
import { Form, Input, Button } from 'antd';
import './style.css';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 8 },
};
const Login: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values);
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
