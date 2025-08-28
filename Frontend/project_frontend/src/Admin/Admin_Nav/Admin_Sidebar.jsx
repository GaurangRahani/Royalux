import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Admin_Nav.css";
import "./Admin_Navbar.css";

const Admin_Sidebar = () => {
	const [isSidebar, setIsSidebar] = useState(true);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [smallScreen, setSmallScreen] = useState(false);


	const navigate = useNavigate();

	const handleSidebarToggle = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
		setIsSidebar(!isSidebar);
	};

	const logOut = () => {
		navigate('/Login');
	};

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 992) {
				setIsSidebar(true);
			} else {
				setIsSidebar(false);
			}
		};
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<div className=''>
				<div className="">
					<div id="sidebar" className={` d-flex justify-content-between border border-top border-3 border-secondary border-0 
					${isSidebar ? 'md:tw-h-[88.4vh] lg:tw-h-[88.4vh]' : 'tw-h-[11vh]'} 
					${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}
						style={{ background: '#191919', top: '0' }}>
						<div>
							<a className='text-decoration-none d-flex text-white align-items-center ms-3 mt-3'>
								<span className='ms-1 fs-4 fw-semibold'>ADMIN PANEL</span>
							</a>
							<button
								className="navbar-toggler float-end d-lg-none d-md-none"
								onClick={handleSidebarToggle}
								data-bs-toggle="collapse"
								data-bs-target="#showNavbar"
								aria-controls="showSidebar"
								aria-expanded={isSidebar}
								aria-label="Toggle sidebar"
								style={{ background: '#d3a478', marginTop: '-30px', marginRight: '10px' }}
							>
								<span className="navbar-toggler-icon"></span>
							</button>

							<hr className='tw-mt-4 tw-ml-2 tw-w-60 ' style={{ color: '#d3a478' }} />
							<div className={`collapse navbar-collapse ${isSidebar ? 'show' : ''}`} id="showNavbar">
								<ul className='nav nav-pills flex-column mt-2'>
									<NavLink to="/admin/Dashboard" className='text-white fs-5' aria-current='page'>
										<li className='nav-link text-white fs-5 my-1'>
											<span className='ms-3'>Dashboard</span>
										</li>
									</NavLink>

									<NavLink to="/admin/status" className=' text-white fs-5' aria-current='page'>
										<li className='nav-link  text-white fs-5 my-1'>
											<span className='ms-3'>Status</span>
										</li>
									</NavLink>

									<NavLink to="/admin/adminuserdetails" className=' text-white fs-5' aria-current='page'>
										<li className='nav-link text-white fs-5 my-1'>
											<span className='ms-3'>User</span>
										</li>
									</NavLink>

									<NavLink to="/admin/adminagentdetails" className=' text-white fs-5' aria-current='page'>
										<li className='nav-link text-white fs-5 my-1'>
											<span className='ms-3'>Agent</span>
										</li>
									</NavLink>

									<NavLink to="/admin/userqueries" className='text-white fs-5' aria-current='page'>
										<li className='nav-link text-white fs-5 my-1'>
											<span className='ms-3'>User Queries</span>
										</li>
									</NavLink>


								</ul>
							</div>
						</div>
					</div>
				</div>
			</div >


			{/* <div className=''>
				<div className="">
					<div id="sidebar" className={`col-auto col-md-2 col-12 d-flex justify-content-between flex-column border border-top border-3 border-secondary border-0 
					${isSidebar ? 'md:tw-h-[88.4vh] lg:tw-h-[88.4vh]' : 'tw-h-[11vh]'} 
					${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}
						style={{ background: '#191919', top: '0' }}>
						<div>
							<a className='text-decoration-none d-flex text-white align-items-center ms-3 mt-3'>
								<span className='ms-1 fs-4 fw-semibold'>ADMIN PANEL</span>
							</a>
							<button
								className="navbar-toggler float-end d-lg-none d-md-none"
								onClick={handleSidebarToggle}
								data-bs-toggle="collapse"
								data-bs-target="#showNavbar"
								aria-controls="showSidebar"
								aria-expanded={isSidebar}
								aria-label="Toggle sidebar"
								style={{ background: '#d3a478', marginTop: '-30px', marginRight: '10px' }}
							>
								<span className="navbar-toggler-icon"></span>
							</button>

							<hr className='mt-3' style={{ color: '#d3a478' }} />
							<div className={`collapse navbar-collapse ${isSidebar ? 'show' : ''}`} id="showNavbar">
								<ul className='nav nav-pills flex-column mt-2'>
									<li className='nav-link text-white fs-4 my-1'>
										<NavLink to="/Admin" className='text-white fs-5' aria-current='page'>
											<span className='ms-3'>Dashboard</span>
										</NavLink>
									</li>
									<li className='nav-link text-white fs-4 my-1'>
										<NavLink to="/Admin/Seller" className=' text-white fs-5' aria-current='page'>
											<span className='ms-3'>Seller</span>
										</NavLink>
									</li>
									<li className='nav-link  text-white fs-4 my-1'>
										<NavLink to="/Admin/Buyer" className=' text-white fs-5' aria-current='page'>
											<span className='ms-3'>Buyer</span>
										</NavLink>
									</li>
									<li className='nav-link text-white fs-4 my-1'>
										<NavLink to="/Admin/UserQueries" className='text-white fs-5' aria-current='page'>
											<span className='ms-3'>User Queries</span>
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div > */}



		</>
	);
};

export default Admin_Sidebar;





// import React, { useState } from 'react';
// // import './nav.css';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
// import { NavLink } from 'react-router-dom';


// const Admin_Sidebar = () => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	const Links = [
// 		{ name: 'Dashboard', link: '/' },
// 		{ name: 'Food', link: '/food' },
// 		{ name: 'Order', link: '/order' },
// 		{ name: 'User', link: '/user' },
// 		{ name: 'Feedback', link: '/feedback' },
// 	]

// 	return (
// 		<>
// 			<div className='shadow-md tw-w-20 h-10 fixed top-0 left-0'>
// 				<div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-white'>
// 					<div className='text-2xl cursor-pointer items-center'>
// 						<span className=' text-orange-400 font-bold ' style={{ fontFamily: 'Caveat,cursive' }}>
// 							FoodEase
// 						</span>
// 					</div>
// 					<div className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden' onClick={() => setIsOpen(!isOpen)}>
// 						{
// 							isOpen ? <XMarkIcon /> : <Bars3Icon />
// 						}

// 					</div>

// 					<ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
// 						{Links.map((link) => (
// 							<li key={link.name} className='md:ml-8 md:my-0 my-7 font-semibold'>
// 								<NavLink to={link.link} onClick={() => setIsOpen(false)} className='text-gray-800 hover:text-orange-400 duration-500'>
// 									{link.name}
// 								</NavLink>
// 							</li>
// 						))}
// 						<button className='bg-black text-white py-1 px-3 pb-2 md:ml-8 rounded md:static font-semibold duration-500'>Logout</button>
// 					</ul>

// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default Admin_Sidebar;



