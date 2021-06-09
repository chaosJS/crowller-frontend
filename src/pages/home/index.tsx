import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

interface IData {
	[key: string]: Array<{ title: string; viewNum: number }>;
}
const Home: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [data, setData] = useState<IData>({});
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
				setData(res.data.data);
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
	const handleCrowller = () => {
		axios.get('/api/getData').then((res: AxiosResponse) => {
			if (res.data?.data) {
				message.success('爬取成功');
			}
		});
	};
	// 伪造清洗数据
	const forgeSeriesData = (data: IData): any => {
		const tempData = Object.values(data)
			.reduce((pre, item) => {
				return pre.concat(item);
			}, [])
			.reduce((pre: any, item: any) => {
				if (pre[item.title]) {
					pre[item.title].push(
						item.viewNum + (Math.floor(Math.random() * (1000 - 1)) + 1)
					);
				} else {
					pre[item.title] = [item.viewNum];
				}
				return pre;
			}, {});
		const result = Object.keys(tempData)
			.slice(0, 5)
			.map((name) => ({
				name: name.slice(0, 5),
				type: 'line',
				data: tempData[name],
			}));
		return result;
	};
	const getOption = (): EChartsOption => {
		let firstTitles: string[] = [];
		Object.keys(data).length &&
			data[Object.keys(data)[0]].forEach((res) => {
				firstTitles.push(res.title.slice(0, 5));
			});
		firstTitles = firstTitles.slice(0, 5);
		let timeArrs: string[] = [];
		for (const key in data) {
			timeArrs.push(dayjs(key).format('MM/DD HH: MM: ss'));
		}
		timeArrs = timeArrs.slice(0, 5);
		return {
			title: {
				text: '数据展示',
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: firstTitles,
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
				data: timeArrs,
			},
			yAxis: {
				type: 'value',
			},
			series: forgeSeriesData(data),
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
