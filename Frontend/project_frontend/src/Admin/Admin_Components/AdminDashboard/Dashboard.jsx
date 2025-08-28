import React, { useState, useEffect } from 'react';
import Admin_Nav from '../../Admin_Nav/Admin_Nav';
import Admin_Sidebar from '../../Admin_Nav/Admin_Sidebar';
import './Dash.css';
import { Card, CardContent, Typography, Grid } from "@mui/material";
// import home from "../../Assests/Image/Admin/house1.png";
import home from "../../../Assests/Image/Admin/house1.png"
// import comment from "../../Assests/Image/Admin/comment.png";
import comment from "../../../Assests/Image/Admin/comment.png"
import view from "../../../Assests/Image/Admin/eye.png"
import book from "../../../Assests/Image/Admin/heart.png"
// import view from "../../Assests/Image/Admin/eye.png";
// import book from "../../Assests/Image/Admin/heart.png";
// import close from "../../Assests/Image/Admin/down-arrow.png";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Dasboard.css";
import StarIcon from '@mui/icons-material/Star';

import map from "../../../Assests/Image/Admin/map.png";
import { useNavigate } from 'react-router-dom';
// import "./Common.css";
import "../AdminDashboard/Common.css";
import { getFeedbackUrl, getRecentPropertyUrl, totalAgentCountUrl, totalPropertyCountUrl, totalRentCountUrl, totalSellCountUrl, totalUserCountUrl } from '../../../User/Components/Api';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { BiUpArrow } from "react-icons/bi";


const Dashboard = () => {
	const [isCardOpen1, setIsCardOpen1] = useState(true);
	const [isCardOpen2, setIsCardOpen2] = useState(true);
	const [isCardOpen3, setIsCardOpen3] = useState(true);
	const [isCardOpen4, setIsCardOpen4] = useState(true);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState([])
	const [recentPropertyData, setRecentPropertyData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [countData,setCountData]=useState();

	const toggleCard1 = () => {
		console.log("hello");
		setIsCardOpen1(!isCardOpen1);
	}

	const toggleCard2 = () => {
		console.log("hello");
		setIsCardOpen2(!isCardOpen2);
	}
	const toggleCard3 = () => {
		console.log("hello");
		setIsCardOpen3(!isCardOpen3);
	}
	const toggleCard4 = () => {
		console.log("hello");
		setIsCardOpen4(!isCardOpen4);
	}

	const handleTotalProperty = () => {
		navigate('/Admin/TotalProperty');
	}
	const handleRentProperty = () => {
		navigate('/Admin/TotalRentProperty');
	}

	const handleSellProperty = () => {
		navigate('/Admin/TotalSellProperty');
	}
	const handleUserDetails = () => {
		navigate('/Admin/AdminUserDetails');
	}
	const handleAgentDetails = () => {
		navigate('/Admin/AdminAgentDetails');
	}


	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true)
		}
		else if (scrolled <= 300) {
			setVisible(false)
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'

		});
	};

	window.addEventListener('scroll', toggleVisible);


	const getAnalyticsData = async () => {
		try {
			const token = localStorage.getItem('admin');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(getRecentPropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log("response:", response.data.data);

			if (response.status === 200) {
				const data = response.data;
				console.log('data: ', data);
				setCountData(response.data.data)
				// setRecentPropertyData(0);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day} -${month} -${year}`;
	};

	useEffect(() => {
		
			setLoading(false);
			// totalPropertyCount();
			// totalRentCount();
			// totalSellCount();
			// totalUserCount();
			// totalAgentCount();
			// getFeedbacks();
			getAnalyticsData();
	}, []);

	return (
		<>
			<Admin_Nav />


			<div >
				<div className='sticky-sidebar'>
					<Admin_Sidebar className="" />
				</div>

				{visible &&
					<div className='arrow-up'
						style={{
							width: '45px',
							height: '45px',
							borderRadius: '100%',
							animation: 'ripple 0.7s linear infinite',
							padding: '11px',
							position: 'fixed',
							bottom: '20px',
							right: '20px',
							cursor: 'pointer',
							zIndex: '999',
						}}>
						<BiUpArrow onClick={scrollToTop}
							style={{ fontSize: '25px', marginTop: '-8px', color: '#d3a478', display: visible ? 'inline' : 'none' }} />
					</div >
				}
				{loading ? (
					<div className="loader">
						<div class="spinner"></div>
					</div>
				) : (


					<div className='tw-ml-[250px] md:tw-mt-[-1100px] tw-mt-[-520px] p-3'>
						{/* <div className=' tw-ml-[250px] md:tw-mt-[-1000px] tw-mt-[-500px] p-3 '> */}
						<div className="cart-content">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6} md={6}>
									<Card className="cancleCard">
										<CardContent className=' tw-cursor-pointer' onClick={handleTotalProperty}>
											<Typography variant="h6 dashCardText" >Available Property</Typography>
											<Typography variant="h4">{countData?.totalProperties}</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<Card className="penddingPayment">
										<CardContent className=' tw-cursor-pointer' onClick={handleRentProperty}>
											<Typography variant="h6 dashCardText">Property For Rent</Typography>
											<Typography variant="h4">{countData?.propertiesForRent}</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<Card className="completePayment">
										<CardContent className=' tw-cursor-pointer' onClick={handleSellProperty}>
											<Typography variant="h6 dashCardText">Property For Sale</Typography>
											<Typography variant="h4">{countData?.propertiesForSale}</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<Card className="users">
										<CardContent>
											<Typography variant="h6 dashCardText">Total Earning</Typography>
											<Typography variant="h5" className=' tw-font-medium tw-mt-[5px] '>₹ 4.60 Crore/-</Typography>										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<Card className="cancleCard">
										<CardContent className=' tw-cursor-pointer' onClick={handleUserDetails}>
											<Typography variant="h6 dashCardText" >Total User</Typography>
											<Typography variant="h4">{countData?.totalUsers}</Typography>
										</CardContent>
									</Card>
								</Grid>

								<Grid item xs={12} sm={6} md={6}>
									<Card className="users">
										<CardContent className=' tw-cursor-pointer' onClick={handleAgentDetails}>
											<Typography variant="h6 dashCardText">Total Agent</Typography>
											<Typography variant="h4">{countData?.totalAgents}</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</div>

						<div className='user_info'>

							<div className=''>
								<div className='profile_overview'>
									<Grid container spacing={3} marginTop={5}>
										<Grid item xs={12} sm={12} md={6}>
											<Card className={`shadow-lg`}>
												<CardContent>
													<div className='flex'>
														<Typography variant="h6" className='tw-mt-[15px] tw-ml-[12px] tw-mr-[355px] '>
															Profile Overview
														</Typography>
														<div className='tw-mt-[15px] tw-cursor-pointer'>
															<KeyboardArrowDownIcon style={{ cursor: 'pointer' }} onClick={toggleCard1} />
														</div>
													</div>
													{isCardOpen1 && (
														<div>
															<div className='tw-mt-[45px] tw-mb-10'>
																<div className='flex'>
																	<div className='flex items-center ml-4'>
																		<Typography variant="h4" className='mr-2'>
																			<img src={home} alt="" height='50px' width='50px' />
																		</Typography>
																		<div className='ml-4'>
																			<Typography variant="h5" style={{ color: 'grey', fontWeight: '500' }}>580</Typography>
																			<p variant="h10" style={{ color: 'grey' }}>Property Deals</p>
																		</div>
																	</div>

																	<div className='flex items-center tw-ml-[90px]'>
																		<Typography variant="h2" className='mr-2'>
																			<img src={comment} alt="" height='50px' width='50px' />
																		</Typography>
																		<div className='ml-4'>
																			<Typography variant="h5" style={{ color: 'grey', fontWeight: '500' }}>365</Typography>
																			<p variant="h10" style={{ color: 'grey' }}>Total Public Comments</p>
																		</div>
																	</div>
																</div>
																<div className='flex tw-mt-[50px]'>
																	<div className='flex items-center ml-4'>
																		<Typography variant="h4" className='mr-2'>
																			<img src={view} alt="" height='50px' width='50px' />
																		</Typography>
																		<div className='ml-4'>
																			<Typography variant="h6">1245</Typography>
																			<p variant="h10">Property Views
																			</p>
																		</div>
																	</div>

																	<div className='flex items-center tw-ml-[90px]'>
																		<Typography variant="h2" className='mr-2'>
																			<img src={book} alt="" height='50px' width='50px' />
																		</Typography>
																		<div className='ml-4'>
																			<Typography variant="h6">54</Typography>
																			<p variant="h10">Bookmarked Property
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													)}
												</CardContent>
											</Card>
										</Grid>
										<Grid item xs={12} sm={12} md={6} className={isCardOpen1 ? 'md:tw-ml-[610px] lg:tw-mt-[-358px]' : ''}>
											<Card className={`shadow-lg`}>
												<CardContent>
													<div className='flex'>
														<Typography variant="h6" className='tw-mt-[15px] tw-ml-[12px] tw-mr-[370px] '>
															Recent Activity
														</Typography>
														<div className='tw-mt-[15px]'>
															<KeyboardArrowDownIcon style={{ cursor: 'pointer' }} onClick={toggleCard2} />
														</div>
													</div>
													{isCardOpen2 && (
														<div>
															<div className='tw-mt-[30px] tw-mb-4'>
																<div className=''>
																	<div className='ml-4'>
																		<p className='' style={{ fontSize: '14px' }} > <span style={{ color: 'grey' }}> Dec 27th, 10:12 am</span> - Get new message from custome on city tradecenter.
																		</p>
																	</div>
																	<br />
																	<div className='ml-4'>
																		<p style={{ fontSize: '14px' }}><span style={{ color: 'grey' }}>Dec 21th, 09:12 pm </span> - New property approve for Rent by homex.
																		</p>
																	</div>
																	<br />
																</div>
																<div className='ml-4'>
																	<p style={{ fontSize: '14px' }}><span style={{ color: 'grey' }}>Dec 18th, 12:12 pm </span>- Booking request for Nirala Appartment
																	</p>
																</div>
																<br />
																<div className='ml-4'>
																	<p style={{ fontSize: '14px' }}><span style={{ color: 'grey' }}>Dec 15th, 05:45 pm</span> - Payment receive from customer invoice no 2319891
																	</p>
																</div>
																<br />

																<div className='ml-4'>
																	<p style={{ fontSize: '14px' }}><span style={{ color: 'grey' }}>Dec 15th, 03:32 pm</span> - Comments replay by admin in Apolo Family Appartment
																	</p>
																</div>
															</div>
														</div>
													)}
												</CardContent>
											</Card>
										</Grid>
									</Grid>
								</div>
							</div>

							<div>
								<div className='recent_properties'>
									<Grid container spacing={3} marginTop={1}>
										<Grid item xs={12} sm={12} md={12}>
											<Card className={`shadow-lg`}>
												<CardContent>
													<div className='flex'>
														<Typography variant="h6" className='tw-mt-[15px] tw-ml-[12px] tw-me-[950px]'>
															Recent Properties
														</Typography>
														<div className='tw-mt-[15px]'>
															<KeyboardArrowDownIcon className=' tw-cursor-pointer' onClick={toggleCard3} />
														</div>
													</div>


													{/* {isCardOpen3 && (
														<div>
															<div className='tw-mt-[45px] tw-mb-6'>
																<div className='tw-flex tw-ml-[15px] tw-mt-[50px] '>
																	<img src={p1} alt="" style={{ height: '150px', width: "150px" }} />
																	<div className=' tw-ml-7 tw-mt-[20px] tw-font-semibold'>
																		<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >Apolo Family Appartment</h2>
																	</div>
																	<div className=''>
																		<img src={map} alt="" height='20px' width='20px' className='tw-mt-16 tw-ms-[-260px] ' />
																		<p className=' tw-mt-[-22px] tw-ml-[-230px]' style={{ color: 'gray' }}> Avenue South Burlington, Los Angles.</p>
																	</div>

																</div>
																<div className=' tw-ml-[200px] tw-mt-[-54px] ' style={{ color: 'gray' }}>
																	<p>24th Jan, 2024</p>
																</div>
															</div>

															<div className='tw-mt-[45px] tw-mb-6'>
																<div className='tw-flex tw-ml-[15px] tw-mt-[65px] '>
																	<img src={p2} alt="" style={{ height: '150px', width: "150px" }} />
																	<div className=' tw-ml-7 tw-mt-[20px] tw-font-semibold'>
																		<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >Apolo Family Appartment</h2>
																	</div>
																	<div className=''>
																		<img src={map} alt="" height='20px' width='20px' className='tw-mt-16 tw-ms-[-260px] ' />
																		<p className=' tw-mt-[-22px] tw-ml-[-230px]' style={{ color: 'gray' }}> Avenue South Burlington, Los Angles.</p>
																	</div>

																</div>
																<div className=' tw-ml-[200px] tw-mt-[-54px] ' style={{ color: 'gray' }}>
																	<p>24th Jan, 2024</p>
																</div>
															</div>

															<div className='tw-mt-[45px] tw-mb-6'>
																<div className='tw-flex tw-ml-[15px] tw-mt-[65px] '>
																	<img src={p3} alt="" style={{ height: '150px', width: "150px" }} />
																	<div className=' tw-ml-7 tw-mt-[20px] tw-font-semibold'>
																		<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >Apolo Family Appartment</h2>
																	</div>
																	<div className=''>
																		<img src={map} alt="" height='20px' width='20px' className='tw-mt-16 tw-ms-[-260px] ' />
																		<p className=' tw-mt-[-22px] tw-ml-[-230px]' style={{ color: 'gray' }}> Avenue South Burlington, Los Angles.</p>
																	</div>

																</div>
																<div className=' tw-ml-[200px] tw-mt-[-54px] ' style={{ color: 'gray' }}>
																	<p>24th Jan, 2024</p>
																</div>
															</div>

															<div className='tw-mt-[45px] tw-mb-6'>
																<div className='tw-flex tw-ml-[15px] tw-mt-[65px] '>
																	<img src={p4} alt="" style={{ height: '150px', width: "150px" }} />
																	<div className=' tw-ml-7 tw-mt-[20px] tw-font-semibold'>
																		<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >Apolo Family Appartment</h2>
																	</div>
																	<div className=''>
																		<img src={map} alt="" height='20px' width='20px' className='tw-mt-16 tw-ms-[-260px] ' />
																		<p className=' tw-mt-[-22px] tw-ml-[-230px]' style={{ color: 'gray' }}> Avenue South Burlington, Los Angles.</p>
																	</div>

																</div>
																<div className=' tw-ml-[200px] tw-mt-[-54px] ' style={{ color: 'gray' }}>
																	<p>24th Jan, 2024</p>
																</div>
															</div>
														</div>
													)} */}


													{isCardOpen3 && (
														<div>
															{recentPropertyData.map((slide, index) => (
																<div className='tw-mt-[45px] tw-mb-6'>
																	<div className='tw-flex tw-ml-[15px] tw-mt-[50px] '>
																		<img src={slide.propertyImage[0]} alt="" style={{ height: '150px', width: "170px" }} />
																		<div>
																			<div className=' tw-ml-7 tw-mt-[20px] tw-font-semibold'>
																				<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >{slide.address}</h2>
																			</div>
																			<div className=''>
																				<img src={map} alt="" height='20px' width='20px' className='tw-mt-4 tw-ml-6 ' />
																				<p className=' tw-mt-[-22px] tw-ml-[50px]' style={{ color: 'gray' }}>{slide.city} ,{slide.state}</p>
																			</div>
																			<div className='tw-flex'>
																				<CalendarMonthIcon style={{ color: '#d3a478', height: '20px', width: '20px' }} className='tw-mt-4 tw-ml-6 tw-font-[#d3a478]' />
																				<p className='tw-ml-3 tw-mt-4' style={{ color: 'gray' }}>{formatDate(slide.createdAt)}</p>
																			</div>
																		</div>


																	</div>

																</div>

															))}
														</div>
													)}
												</CardContent>
											</Card>
										</Grid>
									</Grid>
								</div>
							</div>
							<div>

								<div className='recent_comment'>
									<Grid container spacing={3} marginTop={1}>
										<Grid item xs={12} sm={12} md={12}>
											<Card className={`shadow-lg`}>
												<CardContent>
													<div className='flex'>
														<Typography variant="h6" className='tw-mt-[15px] tw-ml-[12px] tw-me-[950px]'>
															Recent Comment
														</Typography>
														<div className='tw-mt-[15px] tw-cursor-pointer tw-text-xs'>
															<KeyboardArrowDownIcon onClick={toggleCard4} />
														</div>

													</div>


													{isCardOpen4 && (
														<div>
															{feedback.map((slide, index) => (
																<div className='tw-mt-[45px] tw-mb-6'>
																	<div className='tw-flex tw-ml-[15px] tw-mt-[50px] '>
																		<img src={slide.profilePic} alt="" style={{ height: '80px', width: "80px", borderRadius: '50%' }} />
																		<div className=' tw-ml-7 tw-font-semibold'>
																			<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '25px' }} >{slide.name}</h2>
																		</div>
																	</div>

																	<div className=' md:tw-mt-[-40px] tw-mt-[-10px] tw-ml-[122px]'>
																		<div>
																			{[...Array(slide.rating)].map((value) => (
																				<StarIcon
																					key={value}
																					className=''
																					style={{ height: "20px", width: "20px", color: "#d3a478", marginRight: '-3px' }}

																				/>
																			))}
																		</div>
																	</div>
																	<div className='tw-ml-[122px] tw-mt-4 md:tw-mr-14 tw-mr-10'>
																		<p style={{ color: 'gray' }}>{slide.message}</p>
																	</div>

																	<div className=' tw-mt-7 tw-w-[1132px] tw-ml-4'>
																		<hr />
																	</div>
																</div>




															))}



														</div>
													)}
												</CardContent>
											</Card>
										</Grid>
									</Grid>
								</div>
							</div>
						</div>



					</div>
				)}
			</div >




		</>
	);
};

export default Dashboard;
