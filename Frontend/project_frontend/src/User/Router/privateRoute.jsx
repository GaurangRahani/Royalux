import React from 'react'
import { Navigate } from 'react-router'


const privateRoute = ({ children }) => {

	const user = localStorage.getItem("token")
	console.log('user: ', user);

	if (user === null) {
		return <Navigate to="/UserLogin" />;
	}


	return (
		<div>
			{children}
		</div>
	);
}


export default privateRoute;