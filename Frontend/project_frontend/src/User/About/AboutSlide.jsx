import React, { useEffect, useRef } from 'react';
import './AboutSlide.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

import { Autoplay } from 'swiper/modules';
import { getLikePropertyUrl } from '../Components/Api';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';




export const AboutSlide = () => {
	const swiperRef = useRef(null);
	const [propertyData, setPropertyData] = useState([]);

	const getLikeProperty = async () => {
		try {
			const token = localStorage.getItem('user');
			const tokenArray = JSON.parse(token);

			const response = await axios.get(getLikePropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});


			if (response.status === 200) {
				console.log('like response: ', response.data.property);
				const data = response.data.property;
				console.log('data: ', data);

				setPropertyData(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}


	useEffect(() => {
		getLikeProperty();
	}, []);

	return (
		<>
			<div className='tw-flex tw-justify-center'>
				<div className='tw-border-2 tw-border-white tw-mt-16 text-center slider-container'>
					<div className=' tw-items-center tw-justify-center'>
						<p className=' tw-font-[550] tw-grid tw-place-content-center' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>Favorite Property</p>
						<p className='tw-grid tw-place-content-center'>Aliquam lacinia diam quis lacus euismod</p>

					</div>
				</div>
			</div>
			<div className="tw-flex tw-place-content-center md:tw-mb-[20px] md:tw-ml-[110px] md:tw-mr-[110px]  tw-p-10 ">

				<Swiper
					pagination
					className="demo-swiper-multiple mx-auto"
					spaceBetween={0}
					slidesPerView={2}

					breakpoints={{

						640: {
							slidesPerView: 3,
						},

						768: {
							slidesPerView: 5,
						},
					}}
					ref={swiperRef}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
				// style={{ width: '700px', height: '400px' }}
				>

					{propertyData.map((property) => (
						<SwiperSlide className='md:tw-me-[2px] md:tw-mb-10'>
							<div>
								<img src={property.propertyImage[0]}
									style={{ width: "230px", height: "260px", marginBottom: "10px" }}
									className='rounded-4' alt="" />
								<FavoriteIcon
									style={{ color: '#d3a478', height: '30px', width: '30px', marginRight: '20px', marginTop: '5px' }}
								/>
								<div className="middle">
									<div className="text">

										<h3 className=' tw-font-bold tw-text-lg'>{property.city},{property.state}</h3>
										<span className='text-font-[500px]'>{property.type}</span>
									</div>
								</div>
							</div>

						</SwiperSlide>))}
				</Swiper>

			</div>
		</>
	)
}


export default AboutSlide;