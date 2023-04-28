import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme'
import './styles/globals.css'


// axios.defaults.baseURL = 'http://localhost:1337/';

import App from './App';

console.log("==============> : ", theme);

const rootNode = document.getElementById('root');
// const rootNode = document.querySelector('body');
ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ReduxProvider>
	</React.StrictMode>
	, rootNode);
