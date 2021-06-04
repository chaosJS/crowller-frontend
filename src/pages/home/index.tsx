import React, { useEffect } from 'react';
import './style.css';
import { Button } from 'antd';
const Home: React.FC = () => {
	useEffect(() => {});
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
