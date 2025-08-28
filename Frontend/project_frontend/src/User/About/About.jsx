import React, { useState, useEffect } from 'react';
import "./About.css";
import backgroundImage from "../../Assests/Image/About/bg-1.jpg";
import about from "../../Assests/Image/About/about (1).jpg";

import about2 from "../../Assests/Image/About/about_2.jpg"
import 'animate.css';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AboutSlide from './AboutSlide';

const About = () => {

	const navigate = useNavigate();

	return (
		<>

			<Nav />


			<div>
				<div style={{ position: 'relative' }}>
					<img class="tw-w-full tw-h-[320px]" src={backgroundImage} alt="background" srcset="" />
					<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
					</div>
					<div >
						<div style={{ color: 'white', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
							<h1 class="tw-text-white tw-text-4xl tw-font-semibold">About Us</h1>
							<div className='tw-mt-2 tw-text-[18px]'>
								<h5 class=" tw-justify-center tw-flex tw-text-2xl tw-font-semibold"><h4 className='tw-cursor-pointer' onClick={() => navigate('/')}>Home </h4>
									<span class=" tw-ml-[5px] tw-mr-[2px]">  {' >>'} </span>
									<h4 className=' tw-cursor-pointer' onClick={() => navigate('/about')}>About</h4>
								</h5>
							</div>
						</div>
					</div>
				</div>


				<div className=' animate_animated animate_zoomIn tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-p-12 md:tw-p-0'>
					<div className=' md:tw-ml-32  md:tw-mr-16 md:tw-mt-20 tw-mb-6 md:tw-pl-5 md:tw-pr-5'>
						<h1 className='tw-text-[34px] tw-font-[700] md:tw-tracking-wide md:tw-leading-normal'>We're on a Mission to Change
							View of Real Estate Field.</h1>
					</div>
					<div className='md:tw-mr-32  md:tw-ml-12 md:tw-mt-20 tw-text-[17px]'>
						<p className='tw-mb-7'>Welcome to Royalux, where we understand the challenges of main taining a tidy living
							space, especially when children are involved. We provide the perfect solution for families
							seeking a harmonious balance between organization and a playful environment.
						</p>

						<p>Immerse yourself in the comfort of a Royalux rental house, where we prioritize
							both functionality and style. Our thoughtfully designed space cater
							to the needs of families, ensuring that every member can
							enjoy their surroundings without sacrificing order.
						</p>
						<div className='tw-grid md:tw-grid-cols-2 tw-mt-11  '>
							<div className='tw-mb-7'>

								<div className="tw-mb-4">
									<HolidayVillageOutlinedIcon className=" tw-rounded-full tw-p-[18px] tw-w-[70px] tw-h-[70px] tw-shadow-lg tw-text-gray-600 tw-bg-gray-100 hover:tw-bg-[#d3a478] hover:tw-text-white" />
								</div>
								<p className='tw-font-semibold tw-text-[19px] '>Modern Villa</p>
								<p className='tw-text-[16px] '>Luxurious Amenities</p>
								<p className='tw-text-[16px]'>Open Spaces</p>
							</div>
							<div>
								<div className="tw-mb-4 ">
									<CreditScoreOutlinedIcon className=" tw-rounded-full tw-p-[19px] tw-w-[70px] tw-h-[70px] tw-shadow-lg  tw-text-gray-600 tw-bg-gray-100 hover:tw-bg-[#d3a478] hover:tw-text-white" />
								</div>
								<p className='tw-font-semibold tw-text-[19px]'>Secure Payment</p>
								<p className='tw-text-[16px]'>Payment Gateways</p>
								<p className='tw-text-[16px]'>Privacy Policies</p>
							</div>
						</div>
					</div>


				</div>

				<div className=' tw-grid tw-place-content-center md:tw-mt-16 tw-m-5 tw-mt-[-5px]'>
					<img src={about} alt="" className='tw-w-[1200px]' />
				</div>

				<div className='animate_animated animate_rubberBand tw-grid md:tw-grid-cols-3 tw-grid-cols-1 tw-justify-items-center tw-mt-12 md:tw-ml-36  md:tw-mt-20 md:tw-mr-36'>
					<div className='tw-text-center tw-mb-2'>
						<p className='tw-text-[40px] tw-font-bold'>1M</p>
						<p className='tw-text-[17px]'>Awward Winning</p>
					</div>
					<div className='tw-text-center tw-mb-2'>
						<p className='tw-text-[40px] tw-font-bold'>4K</p>
						<p>Property Ready</p>
					</div>
					<div className='tw-text-center  tw-mb-2'>
						<p className='tw-text-[40px] tw-font-bold'>30K</p>
						<p>Happy Customer</p>
					</div>
				</div>

				<div className='tw-flex shadow-lg tw-rounded-2xl
            max-sm:tw-m-6 
             md:tw-mt-14  md:tw-mb-0 md:tw-mr-5 md:tw-ml-5
             lg:tw-mt-14  lg:tw-mb-0 lg:tw-mr-10 lg:tw-ml-10'>
					<div className='lg:tw-pl-40 lg:tw-pt-24 lg:tw-pr-44 
                 sm:tw-pl-20 sm:tw-pt-10 sm:tw-pb-8 
                 max-sm:tw-pl-14 max-sm:tw-pt-8 max-sm:tw-pb-8  
                 md:tw-p-12  '>

						<h1 className=' tw-text-3xl tw-font-[680] md:tw-tracking-wide md:tw-leading-normal max-sm:tw-tracking-normal ' >
							Let’s Find The Right
							Selling Option For You
						</h1>
						<div className='tw-flex tw-pt-9 tw-pb-9'>
							<div>
								<GppGoodOutlinedIcon className=" tw-rounded-full tw-p-[18px] tw-w-[70px] tw-h-[70px] tw-shadow-lg  tw-text-black-600 tw-bg-[#f8ecdf] hover:tw-bg-[#d3a478] hover:tw-text-white" />
							</div>
							<div className='tw-pl-5'>
								<p className='tw-font-[650] tw-tracking-wide tw-text-[17px] tw-mb-1'>Property Management</p>
								<p className=''>Experience unparalleled elegance and comfort with our exclusive Property Management services at Royalux.</p>
							</div>

						</div>

						<div className='tw-flex tw-pb-9 '>
							<div>
								<VpnKeyOutlinedIcon className=" tw-rounded-full tw-p-[18px] tw-w-[70px] tw-h-[70px] tw-shadow-lg  tw-text-black tw-bg-[#f8ecdf] hover:tw-bg-[#d3a478] hover:tw-text-white" />
							</div>
							<div className='tw-pl-5'>
								<p className='tw-font-[650] tw-tracking-wide tw-text-[17px] tw-mb-1'>Mortgage Services</p>
								<p>Unlock the door to your dream home with our com prehensive Mortgage Services at Royalux.</p>
							</div>

						</div>

						<div className='tw-flex'>
							<div>
								<CurrencyExchangeOutlinedIcon className="tw-rounded-full  tw-p-[19px] tw-w-[70px] tw-h-[70px] tw-shadow-lg  tw-text-black tw-bg-[#f8ecdf] hover:tw-bg-[#d3a478] hover:tw-text-white" />
							</div>
							<div className='tw-pl-5 '>
								<p className='tw-font-[650] tw-tracking-wide tw-text-[17px] tw-mb-1'>Currency Services</p>
								<p>Seamless international transactions are just a step away with Royalux Currency Services.</p>
							</div>

						</div>



					</div>
					<div className='sm:tw-invisible max-sm:tw-invisible md:tw-visible lg:tw-visible tw-p-5'>
						<img src={about2} className='lg:tw-h-[70vh] lg:tw-w-[500px]  md:tw-h-[67vh] md:tw-w-[60vh]  tw-rounded-3xl tw-mt-1 ' alt="" />
					</div>
				</div>

				<div className='tw-mt-[60px]'>
					<AboutSlide />
				</div>

				<div className='tw-bg-[#f7f7f7] lg:tw-grid lg:tw-grid-cols-2  tw-grid-cols-1  lg:tw-p-24  md:tw-p-20 max-md:tw-p-20 
             lg:tw-mt-16  lg:tw-mb-16 lg:tw-ml-0 lg:tw-mr-0 md:tw-mt-10 md:tw-mb-10 md:tw-m-5  max-md:tw-m-7 tw-rounded-xl '>
					<div className='animate_animated animate_fadeInLeft' >
						<p className='tw-text-[32px] tw-font-[650] 
                    lg:tw-tracking-wide lg:tw-leading-normal 
                    md:tw-tracking-normal md:tw-leading-normal
                    max-sm:tw-tracking-tight 
                    tracking-normal tw-leading-10'  >
							Need help? Talk to our expert.
						</p>
						<p className='tw-mt-[7px]'>Talk to our experts or Browse through more properties.</p>

					</div>
					<div className='animate_animated animate_fadeInRight lg:tw-ml-56 lg:tw-mr-0 md:tw-mt-4 max-sm:tw-mt-6 max-md:tw-mt-4  '>

						<button className='tw-text-wrap tw-border tw-border-black tw-rounded-xl 
                     tw-h-[57px]
                    lg:tw-w-[180px] 
                    
                    md:tw-w-[180px] 
                    max-md:tw-w-[180px]
                    max-sm:tw-w-full 
                    tw-w-full
                    tw-tracking-wide tw-text-[17px] tw-font-[650] hover:tw-border-none hover:tw-bg-[#d3a478] hover:tw-text-white'>
							Contact Us
							<NorthEastIcon className='tw-w-8 ' />
						</button>

						<button className='tw-text-wrap tw-rounded-xl tw-mt-6 lg:tw-ml-6 max-md:tw-ml-6 md:tw-ml-6 max-sm:tw-ml-0 
                     tw-h-[57px] 
                    lg:tw-w-[180px]
                    md:tw-w-[180px] 
                    max-md:tw-w-[180px]
                    max-sm:tw-w-full 
                    tw-w-full 
                     tw-bg-black tw-text-white  tw-tracking-wide tw-text-[17px] tw-font-[650]  hover:tw-bg-[#d3a478]'>
							{/* <EmailOutlinedIcon className='tw-pr-2 tw-w-8' />
                        royalux@gmail.com royalux@gmail.com */}
							<PhoneOutlinedIcon className='tw-pr-2 tw-w-8' />
							910 879 7682
						</button>

					</div>
				</div>



			</div>

			<Footer />
		</>
	)
}

export default About;