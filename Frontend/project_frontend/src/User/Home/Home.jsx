import React, { useEffect, useState } from 'react';
import './Home.css';
import hotel from '../../Assests/Image/Home1/b1.svg';
import './style.css';
import back from "../../Assests/Image/h1-transformed1.png";
import 'animate.css';
import villa from "../../Assests/Image/Home1/ihouse.jpg"
import lux from "../../Assests/Image/Home1/luxury.avif"
import apar from "../../Assests/Image/Home1/apar.jpeg"
import aroom from "../../Assests/Image/Home1/room2.jpg"
import test from "../../Assests/Image/Home1/back.png"
import done from "../../Assests/Image/Home1/h19.jpg"
import fed from "../../Assests/Image/Home1/fed.png"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import me from "../../Assests/Image/Home1/4me.jpeg";
import armisha from "../../Assests/Image/Home1/armisha.jpeg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import s1 from "../../Assests/Image/Home1/s1.svg";
import s2 from "../../Assests/Image/Home1/s2.svg";
import s3 from "../../Assests/Image/Home1/s3.svg";
// import serviceback from "../../Assests/Image/Home1/sback.svg"
import serviceback from "../../Assests/Image/Home1/serviceback.png"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { BiUpArrow } from "react-icons/bi";
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import HomeSlide from './HomeSlide';
import axios from 'axios';
import { getFeedbackUrl, deleteProfileUrl } from '../Components/Api';

const Home = () => {

	const [currentSlide, setCurrentSlide] = useState(0);
	const [currentFeedback, setCurrentFeedback] = useState(0);
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [feedback, setFeedback] = useState([]);

	const getFeedbacks = async () => {
		try {
			const token = localStorage.getItem('user');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(getFeedbackUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			if (response.status === 200) {
				console.log("response:", response.data.data);
				const data = response.data.data;
				console.log('data: ', data);
				setFeedback(data);
			}

		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	useEffect(() => {
		getFeedbacks()
	}, [])




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

	const showModal = () => {
		setModalVisible(true);
	};

	const handleBuyClick = () => {
		navigate('/buy');
	};

	const handleSellClick = () => {
		navigate('/AddProperty');
	};

	const handleRentClick = () => {
		navigate('/Rent');
	}

	const toggleVideo = () => {
		setModalVisible(!modalVisible);
	}



	const handleForwardArrowClick = () => {
		if (currentFeedback < feedback.length - 1) {
			setCurrentFeedback((prevSlide) => prevSlide + 1);
		}
	};

	const handleBackArrowClick = () => {
		if (currentFeedback > 0) {
			setCurrentFeedback((prevSlide) => prevSlide - 1);
		}
	};

	const handleMouseLeave = () => {
		document.getElementById('play-arrow').style.color = 'black';
		document.getElementById('circle-container').style.background = '#d3a478';
	};

	const handleMouseEnter = () => {
		document.getElementById('play-arrow').style.color = 'white';
		document.getElementById('circle-container').style.background = 'black';
	};

	const handleBackArrowLeave = () => {
		document.getElementById('back-arrow').style.color = 'black';
		document.getElementById('back-container').style.background = '';
		document.getElementById('back-container').style.border = '';
	};

	const handleBackArrowEnter = () => {
		document.getElementById('back-arrow').style.color = 'white';
		document.getElementById('back-container').style.background = '#d3a478';
		document.getElementById('back-container').style.border = '#d3a478';
	};

	const handleForwardArrowEnter = () => {
		document.getElementById('forword-arrow').style.color = 'white';
		document.getElementById('forword-container').style.background = '#d3a478';
		document.getElementById('forword-container').style.border = '#d3a478';
	};

	const handleForwardArrowLeave = () => {
		document.getElementById('forword-arrow').style.color = 'black';
		document.getElementById('forword-container').style.background = '';
		document.getElementById('forword-container').style.border = '';
	};

	return (
		<>
			<Nav />
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

			<div className=''>
				<div style={{ position: 'relative' }}>
					<img className='md:h-[100%] h-[120vh] bg-cover w-full' src={back} alt="" />
					<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)' }}>
						<div className="tw-grid tw-place-content-center tw-mt-40 ">
							<div className='md:tw-ml-[173px] lg:tw-ml-[180px] tw-ml-[130px]'>
								<img className='animate__animated animate__backInDown animate__delay-1s' src={hotel} alt="" height="85px" width="70px" />
							</div>
							<div className='tw-flex tw-items-center'>
								<div className='animate__animated animate__backInDown lg:tw-w-[100px] tw-w-20 tw-border-b-2 tw-border-white'></div>
								<h1 class="animate__animated animate__backInDown tw-m-6 tw-text-white tw-text-center tw-text-2xl ">Distinct Dwellings</h1>

								<div className=' animate__animated animate__backInDown lg:tw-w-[100px] tw-w-20 tw-border-b-2 tw-border-white'></div>
							</div>
						</div>
						<div className='tw-grid tw-place-content-center'>
							<h1 class="animate__animated animate__backInDown tw-text-white tw-text-center tw-text-3xl">Unlock the Door to Your Perfect Home with <span className='tw-font-semibold'>ROUALUX!</span> </h1>
						</div>

						<div className=' md:tw-flex tw-flex-wrap tw-item-center tw-text-center tw-justify-center tw-p-12  tw-text-white'>
							<div class="tw-flex tw-flex-wrap tw-justify-around">
								<button className='tw-h-[70px] tw-w-[100px] tw-rounded-2xl tw-mb-4 tw-text-2xl tw-font-semibold tw-mr-7 tw-text-center tw-text-white '
									style={{
										border: '2px solid #d3a478',
										transition: 'background-color 0.3s ease',
									}}
									onClick={handleSellClick}
									onMouseOver={(e) => (e.target.style.backgroundColor = '#d3a478')}
									onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
								>SELL</button>
							</div>
							<div class="tw-flex tw-flex-wrap tw-justify-around">
								<button className='tw-h-[70px] tw-w-[100px] tw-rounded-2xl tw-mb-4 tw-text-2xl tw-font-semibold tw-mr-7 tw-text-center tw-text-white'
									style={{
										border: '2px solid #d3a478',
										transition: 'background-color 0.3s ease',
									}}
									onClick={handleRentClick}
									onMouseOver={(e) => (e.target.style.backgroundColor = '#d3a478')}
									onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
								>RENT</button>
							</div>
							<div class="tw-flex tw-flex-wrap tw-justify-around 	">
								<button className='tw-h-[70px] tw-w-[100px] tw-rounded-2xl tw-text-2xl tw-font-semibold tw-mr-7 tw-text-center tw-text-white'
									style={{
										border: '2px solid #d3a478',
										transition: 'background-color 0.3s ease',
									}}
									onClick={handleBuyClick}
									onMouseOver={(e) => (e.target.style.backgroundColor = '#d3a478')}
									onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
								>BUY</button>
							</div>
						</div>

					</div>
				</div>

				{/* Feacture Collections */}



				<HomeSlide />

				{/* TESTIMONIALS  */}

				<div className=''>
					<div>
						<div style={{ position: 'relative' }}>
							<img className='tw-h-[200vh] md:tw-h-[130vh] bg-cover w-full' src={test} alt="" />
							<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
								<div className="tw-grid tw-place-content-center">
									<div className='md:tw-ml-[173px] lg:tw-ml-[180px] tw-ml-[130px]'>
									</div>
									<div className='tw-flex tw-items-center tw-justify-center tw-mt-20'>
										<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
										<h2 class='tw-text-lg tw-mb-3 tw-mr-8 tw-ml-8 tw-font-bold'>TESTIMONIALS AND OPINIONS</h2>
										<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
									</div>
									<p className='tw-text-center tw-text-6xl-text-6xl' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>What Our Customers Say
									</p>
								</div>
								<div className='md:tw-flex md:tw-place-content-center '>
									<div className='tw-mt-10 tw-items-center tw-flex tw-flex-col'>
										<img src={done} alt="" className=' shadow-lg md:tw-w-[600px] tw-w-auto md:tw-h-[650px] tw-h-[300px]' style={{ border: '12px solid white ' }} />
										<div
											id='circle-container'
											className='tw-mt-[-48px] tw-flex tw-justify-center tw-items-center'
											style={{
												border: '5px solid white',
												borderRadius: '50%',
												height: '100px',
												width: '100px',
												background: '#d3a478',
												transition: 'background 0.3s',
											}}
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
											// onClick={toggleVideo}
											onClick={showModal}
										>
											<div>
												<PlayArrowIcon
													id='play-arrow'
													className='tw-h-10 tw-w-10'
													style={{
														color: 'black',
														transition: 'color 0.3s',
														cursor: 'pointer',

													}}
												/>
											</div>
										</div>
										<div className=''>
											{modalVisible && (
												<div className="modal" >
													<div className="modal-content" onClick={(e) => e.stopPropagation()}>
														{/* <span className="close" onClick={hideModal}>&times;</span> */}
														<video width="700" height="315" muted loop autoPlay controls>
															<source src={require('../../Assests/Image/Home1/hero-video.mp4')} type="video/mp4" />
														</video>
														<button
															onClick={toggleVideo}
															style={{
																position: 'absolute',
																top: '10px',
																right: '-5px',
																background: 'transparent',
																border: 'none',
																cursor: 'pointer',
															}}
														>
															<CloseIcon className='tw-text-white tw-mt-[-82px] ' />
														</button>
													</div>
												</div>
											)}
										</div>

										{/* {video && (
											<div className="popup" style={{ position: 'relative' }}>

												<video width="560" height="315" muted loop autoPlay controls>
													<source src={require('../../Assests/Image/Home1/hero-video.mp4')} type="video/mp4" />
												</video>
												<button
													onClick={toggleVideo}
													style={{
														position: 'absolute',
														top: '10px',
														right: '10px',
														background: 'transparent',
														border: 'none',
														cursor: 'pointer',

													}}
												>
													<CloseIcon style={{ fontWeight: 'bold' }} />
												</button>
											</div>
										)} */}

									</div>

									<div className=' md:tw-mt-[170px] md:tw-ml-[-120px]  tw-mt-[20px] shadow-lg md:tw-h-[400px] tw-h-[460px] md:tw-w-[650px] tw-w-auto ' style={{ border: '2px solid rgb(235, 232, 232)', background: 'rgb(235, 232, 232)', position: 'relative' }}>
										<img src={fed} alt="" className='' height="150px" width='150px' style={{ position: 'absolute', bottom: '0', right: '0' }} />
										<div className='tw-ml-[-29px] md:tw-ml-[5px]'>
											<div className='slider'>
												<div
													className='slider-inner'
													style={{
														transform: `translateX(-${currentFeedback * 100}%)`,
														transition: 'transform 0.3s ease-in-out',
													}}
												>
													{feedback.map((slide, index) => (
														<div className='slider-item' key={index}>
															<div className='tw-flex tw-ml-[65px] tw-mt-[70px] '>
																<img src={slide.profilePic} alt="" style={{ height: '100px', width: "100px", borderRadius: '50%' }} />
																<div className='tw-mt-4 tw-ml-6 tw-font-semibold'>
																	<h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '35px' }} >{slide.name}</h2>
																	<p>{slide.message}</p>
																</div>
															</div>
															<div className='slider-caption'>
																<div className='tw-ml-16 tw-mt-10 md:tw-mr-14 tw-mr-10'>
																	<p style={{ color: 'gray' }}>{slide.feedback}</p>
																</div>
																<p className='tw-mt-[-2px] tw-mb-[5px] tw-text-white tw-ml-[-980px]'>{slide.date}</p>
																<div className=' tw-mt-5 tw-ml-14'>
																	<div>
																		{[...Array(slide.rating)].map((value) => (
																			<StarIcon
																				key={value}
																				className=''
																				style={{ height: "35px", width: "35px", color: "#d3a478", marginRight: '-3px' }}
																			/>
																		))}
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>


									<div className=''>
										<div className='md:tw-flex md:tw-ml-[-460px] md:tw-mt-[560px] '>
											<div className='tw-flex tw-ml-[120px] tw-mt-[50px]'>

												<div className=' tw-flex tw-justify-center tw-items-center tw-h-16 tw-w-16 tw-border-2 tw-me-4 tw-cursor-pointer '
													id='back-container'
													onClick={handleBackArrowClick}

													onMouseEnter={handleBackArrowEnter}
													onMouseLeave={handleBackArrowLeave}>
													<ArrowBackIcon
														id='back-arrow'

													// style={{
													// 	cursor: 'pointer',
													// }}
													/>
												</div>

												<div className=' tw-flex tw-justify-center tw-items-center tw-h-16 tw-w-16 tw-border-2 tw-cursor-pointer '
													id='forword-container'
													onClick={handleForwardArrowClick}

													onMouseEnter={handleForwardArrowEnter}
													onMouseLeave={handleForwardArrowLeave}>
													<ArrowForwardIcon
														id='forword-arrow'

													// style={{
													// 	cursor: 'pointer',
													// }}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
				</div >

				{/* Services */}

				< div style={{ position: 'relative', marginTop: '30px' }
				}>
					<img className='tw-h-[230vh] md:tw-h-[800px] bg-cover w-full  md:tw-m-auto' src={serviceback} alt="" />
					<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
						<div className="tw-grid tw-place-content-center">
							<div className='md:tw-ml-[173px] lg:tw-ml-[180px] tw-ml-[130px]'>
							</div>
							<div className='tw-flex tw-items-center tw-justify-center tw-mt-20'>
								<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
								<h2 class='tw-text-lg tw-mb-3 tw-mr-8 tw-ml-8 tw-font-bold'>FAST AND ECONOMICAL</h2>
								<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
							</div>
							<p className='tw-text-center tw-text-6xl-text-6xl' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>Our Services
							</p>
							<div className='md:tw-flex tw-mt-[80px] md:tw-items-center md:tw-justify-center'>
								<div className='md:tw-h-[360px] md:tw-w-[290px] tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl md:tw-shadow-2xl tw-m-auto md:tw-ml-[20px]  tw-mb-[40px]'>
									<img src={s1} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 md:tw-ml-10 tw-mt-10 tw-ml-[30px] ' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg '>India's Insights derived from
										<br />over 10 lakh listings
									</h2>
								</div>
								<div className='md:tw-h-[360px] md:tw-w-[290px] tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl md:tw-ml-[100px]  md:tw-shadow-2xl tw-m-auto tw-mb-[40px]'>
									<img src={s2} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 md:tw-ml-[50px] tw-mt-10 tw-ml-[30px]   ' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg md:tw-ml-[-10px] '>Exhaustive data-backed
										<br />repository of rates and
										<br />trends
									</h2>
								</div>
								<div className='md:tw-h-[320px] md:tw-w-[290px] tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl md:tw-shadow-2xl tw-m-auto md:tw-mr-[-50px] md:tw-ml-[100px]'>
									<img src={s3} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 tw-mt-2 md:tw-ml-[40px] tw-ml-[20px]' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg '>Trusted by over 1.5 cr
										<br /> buyers, sellers and partners
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div >

				{/* <div>
					<div className='md:tw-m-auto tw-shadow-2xl md:tw-rounded-full md:tw-mt-16 tw-mt-16 md:tw-h-[250px] md:tw-w-[1300px] tw-w-[300px] tw-ml-26'>
						<div className='md:tw-m-auto tw-shadow-2xl md:tw-mt-16 tw-mt-16 md:tw-h-[500px] tw-h-[1300px] md:tw-w-[1300px] tw-w-[900px] tw-ml-26'>
							<img src={serviceback} alt="" />

						</div>
						<div className='md:tw-mt-[-500px] md:tw-mb-[100px] tw-mt-[-1400px] tw-mb-[100px] ' >
							<div className='tw-flex tw-items-center tw-justify-center tw-mt-8'>
								<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
								<h2 class='tw-text-lg tw-mb-3 tw-mr-8 tw-ml-8 tw-font-bold'>FAST AND ECONOMICAL</h2>
								<div className='lg:tw-w-[200px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
							</div>
							<p className='tw-text-center tw-text-6xl-text-6xl' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>Our Services
							</p>
							<div className='md:tw-flex tw-mt-[100px] md:tw-items-center md:tw-justify-center'>
								<div className='md:tw-h-[290px] md:tw-w-[390px] tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl md:tw-shadow-sm tw-m-auto md:tw-ml-[150px]  tw-mb-[40px]'>
									<img src={s1} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 md:tw-ml-20 tw-ml-[30px] ' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg '>India's Insights derived from
										<br />over 10 lakh listings
									</h2>
								</div>
								<div className='md:tw-h-[290px] md:tw-w-[240px] tw-border-2 tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl  md:tw-shadow-sm tw-m-auto tw-mb-[40px]'>
									<img src={s2} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 md:tw-ml-[-40px] tw-ml-[30px]   ' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg md:tw-ml-[-120px] '>Exhaustive data-backed
										<br />repository of rates and
										<br />trends
									</h2>
								</div>
								<div className='md:tw-h-[290px] md:tw-w-[240px] tw-border-2 tw-h-[300px] tw-w-[250px] tw-border-white tw-shadow-2xl md:tw-shadow-sm tw-m-auto md:tw-mr-[200px]'>
									<img src={s3} alt="" className='tw-h-[190px] tw-w-[190px] tw-mb-2 tw-mt-[-7px]' />
									<h2 className='tw-text-center tw-font-semibold tw-text-lg '>Trusted by over 1.5 cr
										<br /> buyers, sellers and partners
									</h2>
								</div>
							</div>
						</div>



					</div>
				</div> */}




			</div >
			<Footer />

		</>
	);
};


export default Home;



