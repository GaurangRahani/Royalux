// import React, { useEffect, useRef } from 'react';
// import './Contact.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import a1 from "../../Assests/Image/About/about_2.jpg"

// import ayushi from "../../Assests/Image/Contact/ayushi.jpg";
// import armisha from "../../Assests/Image/Contact/armisha2.jpeg";
// import pandu from "../../Assests/Image/Contact/pandu.jpg";
// import karan from "../../Assests/Image/Contact/karan.jpg";
// import pradip from "../../Assests/Image/Contact/pradip2.jpeg";
// import kenil from "../../Assests/Image/Contact/kenil.jpg";

// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import TwitterIcon from '@mui/icons-material/Twitter';


// import { Autoplay } from 'swiper/modules';
// import { Link } from 'react-router-dom';

// export const ContactSlide = () => {
// 	const swiperRef = useRef(null);


// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	})



// 	return (
// 		<>
// 			{/* <div className='tw-flex tw-justify-center'>
// 				<div className='tw-border-2 tw-border-white tw-mt-16 text-center slider-container'>
// 					<div className=' tw-items-center tw-justify-center'>
// 						<p className=' tw-font-[550] tw-grid tw-place-content-center' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>Our Exclusive Agetns</p>
// 						<p className='tw-grid tw-place-content-center'>Aliquam lacinia diam quis lacus euismod</p>

// 					</div>



// 				</div>
// 			</div> */}
// 			<div className="tw-flex tw-place-content-center md:tw-mb-[20px] md:tw-ml-[110px] md:tw-mr-[110px]  tw-p-10 ">
// 				<Swiper
// 					pagination
// 					className="demo-swiper-multiple mx-auto"
// 					spaceBetween={0}
// 					slidesPerView={3}

// 					breakpoints={{

// 						640: {
// 							slidesPerView: 3,
// 						},

// 						768: {
// 							slidesPerView: 3,
// 						},
// 					}}
// 					ref={swiperRef}
// 					autoplay={{
// 						delay: 1500,
// 						disableOnInteraction: false,
// 					}}

// 					modules={[Autoplay]}
// 				>


// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<img src={pradip} alt="instructor" style={{ height: "500px", width: '350px', marginBottom: '10px' }} />
// 						<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 							<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>
// 								<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 									Pradip Timbadiya
// 								</h3>
// 								<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>Node Js</span>
// 							</div>
// 							<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 								<ul className='tw-flex tw-mb-2'>
// 									<li className='tw-p-2'>
// 										<a href="https://github.com/ayudobariya" target='_blank'>
// 											<GitHubIcon />
// 										</a>
// 									</li>
// 									<li className='tw-p-2'>
// 										<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 											<LinkedInIcon />
// 										</a>
// 									</li>
// 								</ul>
// 							</div>

// 						</div>
// 					</SwiperSlide>




// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<div>
// 							<img src={karan} style={{ width: "350px", height: "500px", marginBottom: "10px" }} className='' alt="" />
// 							<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 								<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>

// 									<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 										Karan Uanagar
// 									</h3>
// 									<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>Node Js</span>
// 								</div>
// 								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 									<ul className='tw-flex tw-mb-2'>
// 										<li className='tw-p-2'>
// 											<a href="https://github.com/ayudobariya" target='_blank'>
// 												<GitHubIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 												<LinkedInIcon />
// 											</a>
// 										</li>
// 									</ul>
// 								</div>

// 							</div>
// 						</div>
// 					</SwiperSlide>

// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<div>
// 							<img src={kenil} style={{ width: "350px", height: "500px", marginBottom: "10px" }} className='' alt="" />
// 							<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 								<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>

// 									<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 										Kenil Sodavdiya
// 									</h3>
// 									<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>Fultter</span>
// 								</div>
// 								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 									<ul className='tw-flex tw-mb-2'>
// 										<li className='tw-p-2'>
// 											<a href="https://github.com/ayudobariya" target='_blank'>
// 												<GitHubIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 												<LinkedInIcon />
// 											</a>
// 										</li>
// 									</ul>
// 								</div>

// 							</div>
// 						</div>
// 					</SwiperSlide>

// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<div>
// 							<img src={armisha} style={{ width: "350px", height: "500px", marginBottom: "10px" }} className='' alt="" />
// 							<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 								<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>

// 									<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 										Armisha Dobariya
// 									</h3>
// 									<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>React Js</span>
// 								</div>
// 								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 									<ul className='tw-flex tw-mb-2'>
// 										<li className='tw-p-2'>
// 											<a href="https://github.com/ayudobariya" target='_blank'>
// 												<GitHubIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 												<LinkedInIcon />
// 											</a>
// 										</li>
// 									</ul>
// 								</div>

// 							</div>
// 						</div>
// 					</SwiperSlide>

// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<div>
// 							<img src={ayushi} style={{ width: "350px", height: "500px", marginBottom: "10px" }} className='' alt="" />
// 							<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 								<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>

// 									<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 										Ayushi Dobariya
// 									</h3>
// 									<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>React Js</span>
// 								</div>
// 								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 									<ul className='tw-flex tw-mb-2'>
// 										<li className='tw-p-2'>
// 											<a href="https://github.com/ayudobariya" target='_blank'>
// 												<GitHubIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 												<LinkedInIcon />
// 											</a>
// 										</li>
// 									</ul>
// 								</div>
// 							</div>
// 						</div>
// 					</SwiperSlide>

// 					<SwiperSlide className='md:tw-me-[2px] relative'>
// 						<div>
// 							<img src={pandu} style={{ width: "350px", height: "500px", marginBottom: "10px" }} className='' alt="" />
// 							<div className="tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
// 								<div className=' tw-bg-white tw-text-black tw-mt-30  tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl'>

// 									<h3 className='tw-mt-[-50px] tw-mb-2 tw-justify-center'>
// 										Ayushi Pansuriya
// 									</h3>
// 									<span className='tw-text-black tw-bg-white   tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded'>React Js</span>
// 								</div>
// 								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
// 									<ul className='tw-flex tw-mb-2'>
// 										<li className='tw-p-2'>
// 											<a href="https://github.com/ayudobariya" target='_blank'>
// 												<GitHubIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://www.linkedin.com/in/ayushi-dobariya-b73b00294/" target='_blank'>
// 												<LinkedInIcon />
// 											</a>
// 										</li>
// 									</ul>
// 								</div>

// 							</div>
// 						</div>
// 					</SwiperSlide>

// 				</Swiper>

// 				{/* <Swiper
// 					slidesPerView={3}
// 					centeredSlides={true}
// 					spaceBetween={10}
// 					// grabCursor={true}
// 					autoplay={{
// 						delay: 2500,
// 						disableOnInteraction: false,
// 					}}
// 					// pagination={{
// 					//     clickable: true,
// 					// }}
// 					navigation={true}
// 					modules={[Autoplay, Pagination, Navigation]}
// 					className="mySwiper"
// 				>
// 					<SwiperSlide><div className="col-lg-8 col-md-8  tw-flex tw-place-content-center">
// 						<div className="container">
// 							<img
// 								src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 								alt="Avatar"
// 								className="image"

// 							/>
// 							<div className="middle">
// 								<div className="text">
// 									<ul className=' tw-flex'>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>

// 									</ul>
// 									<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 									<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					</SwiperSlide>
// 					<SwiperSlide>
// 						<div className="col-lg-8 col-md-8  tw-flex tw-place-content-center">
// 							<div className="container">
// 								<img
// 									src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 									alt="Avatar"
// 									className="image"

// 								/>
// 								<div className="middle">
// 									<div className="text">
// 										<ul className=' tw-flex'>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<WhatsAppIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<WhatsAppIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<WhatsAppIcon />
// 												</a>
// 											</li>

// 										</ul>
// 										<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 										<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</SwiperSlide>
// 					<SwiperSlide><div className="col-lg-8 col-md-8 tw-flex tw-place-content-center">
// 						<div className="container">
// 							<img
// 								src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 								alt="Avatar"
// 								className="image"

// 							/>
// 							<div className="middle">
// 								<div className="text">
// 									<ul className=' tw-flex'>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>

// 									</ul>
// 									<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 									<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					</SwiperSlide>
// 					<SwiperSlide><div className="col-lg-8 col-md-8  tw-flex tw-place-content-center">
// 						<div className="container">
// 							<img
// 								src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 								alt="Avatar"
// 								className="image"

// 							/>
// 							<div className="middle">
// 								<div className="text">
// 									<ul className=' tw-flex'>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>
// 										<li className='tw-p-2'>
// 											<a href="https://web.whatsapp.com/">
// 												<WhatsAppIcon />
// 											</a>
// 										</li>

// 									</ul>
// 									<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 									<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					</SwiperSlide>
// 					<SwiperSlide>
// 						<div className="col-lg-8 col-md-8  ">
// 							<div className="container">
// 								<img
// 									src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 									alt="Avatar"
// 									className="image"

// 								/>
// 								<div className="middle">
// 									<div className="text">
// 										<ul className=' tw-flex'>
// 											<li className='tw-p-2'>
// 												<a href="https://github.com/">
// 													<GitHubIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<InstagramIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<LinkedInIcon />
// 												</a>
// 											</li>

// 										</ul>
// 										<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 										<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 									</div>
// 								</div>
// 							</div>

// 						</div>
// 					</SwiperSlide>
// 					<SwiperSlide>
// 						<div className="col-lg-8 col-md-8  ">
// 							<div className="container">
// 								<img
// 									src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"
// 									alt="Avatar"
// 									className="image"

// 								/>
// 								<div className="middle">
// 									<div className="text">
// 										<ul className=' tw-flex'>
// 											<li className='tw-p-2'>
// 												<a href="https://github.com/">
// 													<GitHubIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<InstagramIcon />
// 												</a>
// 											</li>
// 											<li className='tw-p-2'>
// 												<a href="https://web.whatsapp.com/">
// 													<LinkedInIcon />
// 												</a>
// 											</li>

// 										</ul>
// 										<h3 className=' tw-font-bold tw-text-2xl'> Demo</h3>
// 										<span className=' tw-text-lg tw-font-semibold'>Founder</span>
// 									</div>
// 								</div>
// 							</div>

// 						</div>
// 					</SwiperSlide>
// 				</Swiper> */}
// 			</div>
// 		</>
// 	)
// }


// export default ContactSlide;





import React, { useEffect, useRef } from "react";
import "./Contact.css";
import { Swiper, SwiperSlide } from "swiper/react";
import a1 from "../../Assests/Image/About/about_2.jpg";

import ayushi from "../../Assests/Image/Contact/ayushi.jpg";
import armisha from "../../Assests/Image/Contact/armisha2.jpeg";
import pandu from "../../Assests/Image/Contact/pandu.jpg";
import karan from "../../Assests/Image/Contact/karan.jpg";
import pradip from "../../Assests/Image/Contact/pradip2.jpeg";
import Ayush from "../../Assests/Image/Contact/ayush.jpg";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const ContactSlide = () => {
	const swiperRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const contacts = [
		{
			name: "Pradip Timbadiya",
			image: pradip,
			expertise: "Node Js",
			github: "https://github.com/ayudobariya",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
		{
			name: "Karan Unagar",
			image: karan,
			expertise: "Node Js",
			github: "https://github.com/ayudobariya",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
		{
			name: "Ayush Ramani",
			image: Ayush,
			expertise: "Full Stack Developer",
			github: "https://github.com/Ayush-Ramani",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
		{
			name: "Armisha Dobariya",
			image: armisha,
			expertise: "React Js",
			github: "https://github.com/ayudobariya",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
		{
			name: "Ayushi Dobariya",
			image: ayushi,
			expertise: "React Js",
			github: "https://github.com/ayudobariya",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
		{
			name: "Ayushi Pansuriya",
			image: pandu,
			expertise: "React Js",
			github: "https://github.com/ayudobariya",
			linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
		},
	];

	return (
		<div className="tw-flex tw-place-content-center md:tw-mb-[20px] md:tw-ml-[110px] md:tw-mr-[110px] tw-p-10 ">
			<Swiper
				pagination
				spaceBetween={0}
				slidesPerView={3}
				breakpoints={{
					640: { slidesPerView: 3 },
					768: { slidesPerView: 3 },
				}}
				ref={swiperRef}
				autoplay={{
					delay: 1500,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				className="demo-swiper-multiple mx-auto"
			>
				{contacts.map((contact, index) => (
					<SwiperSlide key={index} className="md:tw-me-[2px] relative z-1000">
						<div className="contact-slide">
							<img
								src={contact.image}
								alt={`Contact ${index}`}
								className="contact-image"
								style={{
									height: "500px",
									width: "350px",
									marginBottom: "70px",
								}}
							/>
							<div className="contact-details tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
								<div className="tw-bg-white tw-text-black tw-mt-30 tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl">
									<h3 className="tw-mt-[-50px] tw-mb-2 tw-justify-center">
										{contact.name}
									</h3>
									<span className="tw-text-black tw-bg-white tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded">
										{contact.expertise}
									</span>
								</div>
								<div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
									<ul className="tw-flex tw-mb-2">
										<li className="tw-p-2">
											<a
												href={contact.github}
												target="_blank"
												rel="noopener noreferrer"
											>
												<GitHubIcon />
											</a>
										</li>
										<li className="tw-p-2">
											<a
												href={contact.linkedin}
												target="_blank"
												rel="noopener noreferrer"
											>
												<LinkedInIcon />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ContactSlide;
// import React, { useEffect, useRef } from "react";
// import "./Contact.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import a1 from "../../Assests/Image/About/about_2.jpg";

// import ayushi from "../../Assests/Image/Contact/ayushi.jpg";
// import armisha from "../../Assests/Image/Contact/armisha2.jpeg";
// import pandu from "../../Assests/Image/Contact/pandu.jpg";
// import karan from "../../Assests/Image/Contact/karan.jpg";
// import pradip from "../../Assests/Image/Contact/pradip2.jpeg";
// import kenil from "../../Assests/Image/Contact/kenil.jpg";

// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import TwitterIcon from "@mui/icons-material/Twitter";

// import { Autoplay } from "swiper/modules";
// import { Link } from "react-router-dom";

// const ContactSlide = () => {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const contacts = [
//     {
//       name: "Pradip Timbadiya",
//       image: pradip,
//       expertise: "Node Js",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//     {
//       name: "Karan Unagar",
//       image: karan,
//       expertise: "Node Js",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//     {
//       name: "Kenil Sodvadiya",
//       image: kenil,
//       expertise: "Flutter",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//     {
//       name: "Armisha Dobariya",
//       image: armisha,
//       expertise: "React Js",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//     {
//       name: "Ayushi Dobariya",
//       image: ayushi,
//       expertise: "React Js",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//     {
//       name: "Ayushi Pansuriya",
//       image: pandu,
//       expertise: "React Js",
//       github: "https://github.com/ayudobariya",
//       linkedin: "https://www.linkedin.com/in/ayushi-dobariya-b73b00294/",
//     },
//   ];

//   return (
//     <div className="tw-flex tw-place-content-center md:tw-mb-[20px] md:tw-ml-[110px] md:tw-mr-[110px] tw-p-10 ">
//       <Swiper
//         pagination
//         spaceBetween={0}
//         slidesPerView={3}
//         breakpoints={{
//           640: { slidesPerView: 3 },
//           768: { slidesPerView: 3 },
//         }}
//         ref={swiperRef}
//         autoplay={{
//           delay: 15000000,
//           disableOnInteraction: false,
//         }}
//         modules={[Autoplay]}
//         className="demo-swiper-multiple mx-auto"
//       >
//         {contacts.map((contact, index) => (
//           <SwiperSlide key={index} className="md:tw-me-[2px] relative z-1000">
//             <div className="contact-slide">
//               <img
//                 src={contact.image}
//                 alt={Contact ${index}}
//                 className="contact-image"
//                 style={{
//                   height: "500px",
//                   width: "350px",
//                   marginBottom: "70px",
//                 }}
//               />
//               <div className="contact-details tw-absolute tw-mt-[-80px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
//                 <div className="tw-bg-white tw-text-black tw-mt-30 tw-w-[280px] tw-ml-7 tw-mr-6 tw-p-20 tw-shadow-2xl">
//                   <h3 className="tw-mt-[-50px] tw-mb-2 tw-justify-center">
//                     {contact.name}
//                   </h3>
//                   <span className="tw-text-black tw-bg-white tw-mb-2 tw-bg-opacity-50 tw-px-2 tw-py-1 rounded">
//                     {contact.expertise}
//                   </span>
//                 </div>
//                 <div className="tw-absolute tw-mt-20 tw-mb-0 tw-flex tw-justify-center tw-items-center tw-text-center tw-p-4">
//                   <ul className="tw-flex tw-mb-2">
//                     <li className="tw-p-2">
//                       <a
//                         href={contact.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <GitHubIcon />
//                       </a>
//                     </li>
//                     <li className="tw-p-2">
//                       <a
//                         href={contact.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <LinkedInIcon />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ContactSlide;