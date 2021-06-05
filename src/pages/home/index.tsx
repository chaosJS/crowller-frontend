import React, { useEffect } from 'react';
import './style.css';
import { Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
const Home: React.FC = () => {
	useEffect(() => {
		axios.get('/api/isLogin').then((res: AxiosResponse) => {
			console.log(res);
		});
	});
	return (
		<div className="home-page">
			<Button type="primary" block>
				爬取数据
			</Button>
			<Button block>展示数据</Button>
			<Button type="link" block>
				退出
			</Button>
		</div>
	);
};

export default Home;
