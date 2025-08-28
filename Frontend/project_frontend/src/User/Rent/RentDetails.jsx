import React, { useEffect, useState } from 'react';
import "./Rent.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Demo from '../Components/Demo';
import { useLocation } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useRazorpay from "react-razorpay";
import { setPropertyPaymentFullfield, userProfileUrl } from '../Components/Api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RentDetails = () => {

	const { state } = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [userData, setUserData] = useState([]);

	const [Razorpay] = useRazorpay();

	const propertyData = state?.propertyData;
	const navigate = useNavigate();
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

	const getAgentDetails = () => {
		setShowModal(true);
	}

	const getUserData = async (e) => {
		try {
			const token = localStorage.getItem("user");
			const tokenArray = JSON.parse(token);
			const response = await axios.get(userProfileUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});

			if (response.status === 200) {
				const data = response.data;
				// console.log('data: ', data);
				setUserData(data.userData);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	};



	const handlePayment = async () => {
		// setPaymentLoading(true);

		const validatedPrice = propertyData.price;


		const razorpayOptions = {
			key: "rzp_test_nmBMFvlwlFLjLG",
			amount: validatedPrice * 100, // Example: 10000 = ₹100
			currency: 'INR',
			name: 'HomeHubMarket',
			description: 'Payment for Rent Property',
			handler: async function (response) {
				// alert(response.razorpay_payment_id);
				toast.success('Payment successfully ...');
				paymentSuccess(propertyData._id);

			},
			prefill: {
				name: userData.name,
				email: userData.email,
				contact: userData.mobileNo,
			},
			theme: {
				color: '#3399cc',
			},
		};

		const rzp = new Razorpay(razorpayOptions);
		rzp.open();

	};


	const paymentSuccess = async (id) => {
		try {
			const reqdata = {
				id: id,
				isPayment: true
			};

			const token = localStorage.getItem("user");
			const tokenArray = JSON.parse(token);
			console.log('id: ', id);
			await axios.put(setPropertyPaymentFullfield, reqdata, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				}
			});
			console.log('success');
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserData();
	},[])


	return (
		<>

			<Nav />
			<ToastContainer position='top-right' />


			<div
				className="modal"
				tabIndex="-1"
				style={{ display: showModal ? "block" : "none" }}
			>
				<div
					className="modal-dialog tw-bg-slate-200 max-w-[550px]"
					style={{ backgroundColor: "#ffffff" }}
				>
					<div
						className="modal-content"
						style={{ backgroundColor: "#ffffff", width: "550px", marginTop: '150px' }}
					>
						<div className="modal-header">
							<h5 className="modal-title tw-text-xl tw-font-semibold">
								Agent Details
							</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => setShowModal(false)}
							></button>
						</div>
						<div
							className="modal-body "
							style={{ marginLeft: '20px' }}
						>
							<p className="tw-text-lg tw-font-semibold tw-text-gray-500">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>Name :  </label>
								{propertyData.agentId.name}
							</p>
							<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>Email :  </label>

								{propertyData.agentId.email}
							</p>
							<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>Contact No : </label>

								{propertyData.agentId.mobileNo}
							</p>
							<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>Address : </label>

								{propertyData.agentId.address}
							</p>
							<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>City : </label>

								{propertyData.agentId.city}
							</p>
							<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
								<label htmlFor="" className=' tw-font-bold tw-mr-2'>State : </label>

								{propertyData.agentId.state}
							</p>

						</div>
						<div className="modal-footer">

							<div className=' tw-mt-[-10px]'>
								<button type="submit" class="tw-p-2 tw-w-full tw-cursor-pointer tw-bg-custom-color tw-text-white tw-font-semibold tw-mb-3 tw-rounded-md" onClick={handlePayment}>
									Pay for Rent</button>
							</div>


							<button
								type="button"
								className="btn btn-primary "
								style={{ backgroundColor: "black", border: "none", marginTop: '-20px' }}
								onClick={() => setShowModal(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='container tw-flex tw-place-content-center tw-mt-4'>
				<div className='tw-p-4'>
					<div className="row">
						<h1 className=' tw-font-bold text-3xl' >{propertyData.propertyType}</h1>
						<div className='tw-mt-4'>

							<h5 class=" tw-text-gray-500 tw-flex"><h4 className='tw-cursor-pointer' onClick={() => navigate('/')}>Home </h4>
								<span class="tw-text-gray-500 tw-ml-[5px] tw-mr-[2px]">  {' >'} </span>
								<h4 className=' tw-cursor-pointer' onClick={() => navigate('/Rent')}>Rent</h4>
							</h5>
						</div>
					</div>

					<div className='row tw-mt-10 '>

						<div className="col-lg-7">
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


						<div className="col-lg-5 md:w-full shadow-lg tw-p-6 tw-flex  tw-place-content-center tw-rounded-sm">
							<div className=' tw-ml-3 place-content-center'>
								<h1 className='tw-font-semibold text-2xl mt-2'>₹ {validatePrice(propertyData.price)}</h1>
								<div className="col-sm-3">
									<h1 className='border-1 w-full flex items-center justify-center p-2 rounded-2 mt-3 tw-font-semibold tw-border-black'>For Rent</h1>
								</div>
								<div className="row tw-mt-4">
									<div className='tw-flex'>
										<LocationOnIcon style={{ color: "gray", height: "30px", width: "40px" }} />
										<div className='tw-font-semibold tw-text-lg tw-ml-2'>{propertyData.address}</div>
									</div>
									<div className='row tw-mt-6 tw-ml-[1px] tw-justify-evenly'>
										<h1 className='tw-text-lg font-semibold tw-mb-4 tw-mt-1'>Facilities</h1>

										<div className="tw-ml-[-18px] tw-grid tw-grid-cols-3">
											{propertyData.facility.map((feature, index) => (

												<h1 key={index} className='tw-mr-4 tw-border-2  tw-mt-2 tw-p-3 tw-text-[16px]'>{feature} </h1>
											))}
										</div>
									</div>
									<div className='tw-mt-6'>
										<button type="submit" class="tw-p-2 tw-w-full tw-cursor-pointer tw-bg-custom-color tw-text-white tw-font-semibold tw-mb-3 tw-rounded-md" onClick={getAgentDetails}>
											Contact Agent</button>
									</div>
								</div>
							</div>
						</div>


					</div>

					<div className="row shadow-lg tw-ml-2 tw-mt-20 tw-p-6 tw-mb-20">
						<h1 className=' tw-font-semibold tw-text-xl'>Description</h1>
						<p className='  tw-mt-3'>{propertyData.description}
						</p>
					</div>
				</div>
			</div >



			<Footer />
		</>
	)
}

export default RentDetails;