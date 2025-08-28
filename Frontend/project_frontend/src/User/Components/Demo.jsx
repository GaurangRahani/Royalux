import React from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import img1 from '../../Assests/Image/Admin/Dashboard/TotalProperty/h5.png';
import img2 from '../../Assests/Image/Admin/Dashboard/TotalProperty/h2.jpeg';
import img3 from '../../Assests/Image/Admin/Dashboard/TotalProperty/h5.png';
import img4 from "../../Assests/Image/home2.jpg";
import img5 from "../../Assests/Image/home3.avif";
import img6 from '../../Assests/Image/Admin/Dashboard/TotalProperty/home1.jpg';
import img7 from "../../Assests/Image/villa1.jpg";
import img8 from "../../Assests/Image/Admin/Dashboard/TotalProperty/home1(1).jpg"
import img9 from "../../Assests/Image/home6.jpg";



const Demo = () => {
	return (
		<div>
			<ReactSwiper
				slidesPerView={1}
				centeredSlides={true}
				spaceBetween={10}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
				style={{ width: '700px', height: '400px' }} // Adjust dimensions to match img tag
			>
				<SwiperSlide><img src={img1} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img2} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img3} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img4} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img5} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img6} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img7} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img8} alt="" height='400px' width='700px' /></SwiperSlide>
				<SwiperSlide><img src={img9} alt="" height='400px' width='700px' /></SwiperSlide>
			</ReactSwiper>
		</div>
	)
}


export default Demo
