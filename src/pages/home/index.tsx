import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';
import { Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
const Home: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	useEffect(() => {
		let isSubscribed = true;
		axios.get('/api/isLogin').then((res: AxiosResponse) => {
			if (res.data?.data) {
				if (isSubscribed) {
					setIsLogin(true);
				}
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);
	return isLogin ? (
		<div className="home-page">
			<Button type="primary" block>
				爬取数据
			</Button>
			<Button block>展示数据</Button>
			<Button type="link" block>
				退出
			</Button>
		</div>
	) : (
		<Redirect to="/login" />
	);
};

export default Home;
