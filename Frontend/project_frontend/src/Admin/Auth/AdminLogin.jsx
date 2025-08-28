import React from 'react';
import './AdminLogin.css';
import logo from "../../Assests/Image/Admin/Dashboard/logo.svg";
const AdminLogin = () => {
	return (
		<>
			<div className=' tw-h-screen tw-place-content-center tw-mt-[-90px] tw-grid'>
				<div className='tw-p-4 sm:tw-w-full md:tw-w-[400px] tw-bg-black tw-rounded-2xl'>
					<div className='tw-flex tw-flex-col tw-justify-center'>
						<div className=' tw-place-content-center tw-flex tw-mb-10 tw-mt-10'>
							<img src={logo} alt="" height="100px" width="260px" className=' tw-place-content-center' />
						</div>

						<h1 className='tw-text-3xl tw-font-bold tw-mb-2  tw-grid tw-place-content-center' style={{ color: "#d3a478" }}>Sign Up</h1>
						<p className='text-gray-600 tw-text-purple-100 tw-grid tw-place-content-center'>Enter your credentials</p>
					</div>
					<div className='tw-flex tw-flex-col'>
						<input type="text" className='tw-w-full  tw-h-12 tw-p-3 tw-mb-3 tw-rounded-2 tw-mt-10 tw-text-white' placeholder='Email' style={{ backgroundColor: "#27292B" }} />
						<input type="text" className='tw-w-full  tw-h-12 tw-p-3 tw-mb-3 tw-rounded-2 tw-mt-2 tw-text-white' placeholder='Password' style={{ backgroundColor: "#27292B" }} />
						<button className=' tw-px-4 tw-mb-4 tw-py-2 tw-rounded-md tw-text-lg tw-font-bold tw-mt-3' style={{ backgroundColor: "#d3a478" }}>Log In</button>
					</div>
				</div>
			</div>

		</>
	)
}


export default AdminLogin;