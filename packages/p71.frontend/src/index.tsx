import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// cd packages/p71.frontend;rm -rf dist;yarn install;tsc;cd ../..

// cd packages/p71.frontend;rm -rf dist;tsc;cd ../..

// cd packages/p71.frontend;yarn start;cd ../..
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
