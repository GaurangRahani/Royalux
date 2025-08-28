// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';


// ReactDOM.render(
// 	<>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 	</>,
// 	document.getElementById('root')
// );



// At the root level of your application (e.g., index.js or App.js)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
	<>
		<BrowserRouter>

			<App />
		</BrowserRouter>
		<ToastContainer />
		</> ,
	document.getElementById('root')
);
