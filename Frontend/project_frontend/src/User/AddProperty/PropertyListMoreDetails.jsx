import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';


import { useLocation } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';




const PropertyListMoreDetails = () => {

	const navigate = useNavigate();
	const { state } = useLocation();
	const propertyData = state?.propertyData;


	const validatePrice = (currentBalance) => {
		try {
			// suffix = {' ', 'k', 'M', 'B', 'T', 'P', 'E'};
			let number = currentBalance;

			if (number < 1000) {
				return number.toString();
			} else if (number < 1000000) {
				return `${(number / 1000).toFixed(1)} K`;
			} else if (number < 10000000) {
				return `${(number / 100000).toFixed(1)} Lakh`;
			} else {
				return `${(number / 10000000).toFixed(1)} Crore`;
			}
		} catch (e) {
			console.log(e)
		}
		return currentBalance;

	}



	return (
		<>
			<Nav />

			<div>
				<div class=" tw-my-5 tw-mb-4 tw-px-4 tw-ml-[90px]">

					<h1 className='tw-text-3xl tw-font-bold tw-mt-14 tw-ml-[40px]'>{propertyData.address}</h1>
					<div className=' tw-mt-4'>
						<h5 class=" tw-text-gray-500 tw-ml-[40px] tw-flex"><h4 className='tw-cursor-pointer' onClick={() => navigate('/')}>Home</h4>
							<span class="tw-text-gray-500 tw-ml-[5px] tw-mr-[2px]">  {' >'} </span>
							<h4 className=' tw-cursor-pointer' onClick={() => navigate('/AddProperty')}>Sell</h4>
						</h5>

						<div className=' tw-flex'>
							<div className=' tw-mt-10 tw-ml-[40px] tw-me-10'>
								{/* <img src={h5} className=' tw-w-[730px] tw-h-[400px] tw-rounded-sm' alt="" /> */}

								<Swiper
									slidesPerView={1}
									centeredSlides={true}
									spaceBetween={10}
									autoplay={{
										delay: 2500,
										disableOnInteraction: false,
									}}
									modules={[Autoplay, Pagination, Navigation]}
									className="mySwiper"
									style={{ width: '700px', height: '400px' }}
								>


									{propertyData.propertyImage.map((image) => (
										<SwiperSlide>
											<img src={image} height='400px' width='700px' />
										</SwiperSlide>
									))}


								</Swiper>
							</div>


							<div className=" tw-w-[530px]">
								<div className=" tw-p-3  tw-mt-6 tw-me-10 tw-mb-0 tw-border-0  tw-shadow-lg tw-rounded-md">
									<div className="">
										<h1 className=' tw-font-semibold tw-text-2xl tw-mt-4 tw-ml-4'>₹ {validatePrice(propertyData.price)}</h1>
									</div>

									<div >
										<h2 className='tw-font-semibold tw-text-base tw-mt-2 tw-ml-4'>Facility</h2>
									</div>
									<div className='tw-ml-2 tw-grid tw-grid-cols-3  '>
										{propertyData.facility.map((feature, index) => (
											<h1 key={index} className='tw-mr-[20px] tw-text-sm tw-mt-2 tw-bg-gray-100 tw-rounded-xl tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[4px]'>{feature}</h1>
										))}

									</div>



									<div >
										<h2 className='tw-font-semibold tw-text-base tw-mt-3 tw-ml-4'>Details</h2>
									</div>
									<div className='tw-grid tw-grid-cols-3  tw-ml-4'>
										<div className=" tw-bg-gray-100 tw-me-[10px] tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Locality</span> -{propertyData.city}</h5>
										</div>
										<div className="  tw-bg-gray-100 tw-me-[10px] tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>State</span> - {propertyData.state}</h5>
										</div>
										<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Type</span> - {propertyData.propertyType}</h5>
										</div>
									</div>
									<div className='tw-grid tw-grid-cols-2 tw-ml-4'>
										<div className=" tw-bg-gray-100 tw-pl-[7px] tw-me-[10px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Main Entrance Facing</span> - {propertyData.faching}</h5>
										</div>

										<div className=" tw-bg-gray-100  tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Furnishing</span> - {propertyData.furnishing}</h5>
										</div>
									</div>
									<div className='tw-grid tw-grid-cols-3 tw-ml-4 tw-mb-10'>
										<div className=" tw-bg-gray-100 tw-pl-[7px] tw-me-[10px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Square.Ft</span> - {propertyData.size} sq.ft</h5>
										</div>
										<div className=" tw-bg-gray-100  tw-pl-[7px] tw-me-[10px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>BHK</span> - {propertyData.houseType}</h5>
										</div>
										<div className=" tw-bg-gray-100 tw-pl-[7px] tw-me-[10px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 ">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Property Age</span>  - {propertyData.propertyAge} year</h5>
										</div>
									</div>

								</div>
							</div>
						</div>

						<div className="row shadow-lg tw-ml-5 tw-mt-10 tw-p-6 tw-mb-20 tw-w-[1200px]">
							<h1 className=' tw-font-semibold tw-text-xl'>Description</h1>
							<p className='  tw-mt-3'>{propertyData.description}
							</p>
						</div>
					</div>

				</div>

			</div>
			<Footer />
		</>

	)
}

export default PropertyListMoreDetails;


