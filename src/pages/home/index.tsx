import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './style.css';
import { Button, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
// const Home: React.FC = () => {
// 	// const [isLogin, setIsLogin] = useState<boolean>(false);
// 	const history = useHistory();
// 	useEffect(() => {
// 		axios.get('/api/isLogin').then((res: AxiosResponse) => {
// 			if (!res.data?.data) {
// 				history.push('/login');
// 			}
// 		});
// 	}, []);
// 	return (
// 		<div className="home-page">
// 			<Button type="primary" block>
// 				爬取数据
// 			</Button>
// 			<Button block>展示数据</Button>
// 			<Button type="link" block>
// 				退出
// 			</Button>
// 		</div>
// 	);
// };

// export default Home;

const Home: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	useEffect(() => {
		axios.get('/api/isLogin').then((res: AxiosResponse) => {
			if (!res.data?.data) {
				setIsLogin(false);
			}
		});
	}, []);
	const handleLogout = () => {
		axios.get('/api/logout').then((res: AxiosResponse) => {
			if (res.data?.data) {
				setIsLogin(false);
				message.success('退出成功');
			}
		});
	};
	return isLogin ? (
		<div className="home-page">
			<Button type="primary" block>
				爬取数据
			</Button>
			<Button block>展示数据</Button>
			<Button type="link" block onClick={handleLogout}>
				退出
			</Button>
		</div>
	) : (
		<Redirect to="/login" />
	);
};

export default Home;
