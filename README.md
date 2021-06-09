1. useEffect 时遇到的问题

```javascript
function demoComponent() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetchList().then((res) => {
			setTodos(res.data);
		});
	}, []);

	return (
		<ul>
			{todos.map((todo) => (
				<li>{todo}</li>
			))}
		</ul>
	);
}
// 看上去没问题，但是在某些情况，比如组件unmount之后fetchList才resolve过来，就会导致setTodos去设置一个不存在的state，有可能导致内存泄漏
// 最好是设置一个变量来判断是否要setState,在useEffect中返回的函数中反转
function demoComponent() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		fetchList().then((res) => {
			if (isSubscribed) {
				setTodos(res.data);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	return (
		<ul>
			{todos.map((todo) => (
				<li>{todo}</li>
			))}
		</ul>
	);
}
```

2.  添加 echarts 展示爬取的数据
3.  相关文档和学习网站
    1.  [ts 官网](https://www.tslang.cn/)
    2.  [ts ast 实时编译](https://ts-ast-viewer.com/#)
