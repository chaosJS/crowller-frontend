import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './style.css';
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
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
interface IData {
	[key: string]: Array<{ title: string; viewNum: number }>;
}
const Home: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [data, setData] = useState<IData>({});
	const [legendData, setLegndData] = useState<string[]>();
	const [timeData, setTimeData] = useState<string[]>();
	useEffect(() => {
		axios.get('/api/isLogin').then((res: AxiosResponse) => {
			if (!res.data?.data) {
				setIsLogin(false);
			}
		});
	}, []);
	useEffect(() => {
		axios.get('/api/showData').then((res: AxiosResponse) => {
			if (res.data?.data) {
				setData(formatData(res.data.data));
			}
		});
	}, []);
	const formatData = (data: IData): IData => {
		const firstTitles: string[] = [];
		data[Object.keys(data)[0]].map((res) => {
			firstTitles.push(res.title);
		});

		setLegndData(firstTitles);
		const timeArrs: string[] = [];
		for (const key in data) {
			timeArrs.push(key);
			data[key].map((res, index) => {
				res.title = firstTitles[index];
				res.viewNum = res.viewNum + (Math.floor(Math.random() * (100 - 1)) + 1);
			});
		}
		setTimeData(timeArrs);
		return data;
	};
	const handleLogout = () => {
		axios.get('/api/logout').then((res: AxiosResponse) => {
			if (res.data?.data) {
				setIsLogin(false);
				message.success('退出成功');
			}
		});
	};
	const handleCrowller = () => {
		axios.get('/api/getData').then((res: AxiosResponse) => {
			if (res.data?.data) {
				message.success('爬取成功');
			}
		});
	};
	const getOption = (): EChartsOption => {
		return {
			title: {
				text: '数据展示',
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: legendData,
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			toolbox: {
				feature: {
					saveAsImage: {},
				},
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: timeData,
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '邮件营销',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: '联盟广告',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310],
				},
				{
					name: '视频广告',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410],
				},
				{
					name: '直接访问',
					type: 'line',
					stack: '总量',
					data: [320, 332, 301, 334, 390, 330, 320],
				},
				{
					name: '搜索引擎',
					type: 'line',
					stack: '总量',
					data: [820, 932, 901, 934, 1290, 1330, 1320],
				},
			],
		};
	};
	return isLogin ? (
		<div className="home-page">
			<div className="btns">
				<Button type="primary" block onClick={handleCrowller}>
					爬取数据
				</Button>
				<Button block>展示数据</Button>
				<Button type="link" block onClick={handleLogout}>
					退出
				</Button>
			</div>

			<ReactECharts option={getOption()} />
		</div>
	) : (
		<Redirect to="/login" />
	);
};

export default Home;
