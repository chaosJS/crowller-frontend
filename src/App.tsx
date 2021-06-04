import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

export const App: React.FC = () => {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route path="/" exact component={Home}></Route>
					<Route path="/login" exact component={Login}></Route>
				</Switch>
			</HashRouter>
		</div>
	);
};
