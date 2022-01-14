import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// cd packages/p81.frontend;rm -rf dist;yarn install;tsc;cd ../..

// 

/**
cd packages/p61.react.common;rm -rf dist;yarn install;tsc;yarn install;cd ../..

cd packages/p81.frontend;rm -rf dist;tsc;yarn install;cd ../..
cd packages/p81.frontend;rm -rf dist;yarn install;tsc;yarn start;cd ../..
cd packages/p81.frontend;yarn start;cd ../..
 */

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
