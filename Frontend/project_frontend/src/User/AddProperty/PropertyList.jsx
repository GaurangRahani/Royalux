import React, { useState, useEffect } from 'react';
import img from "../../Assests/Image/Home1/reg_bg.jpeg";
import h1 from "../../Assests/Image/Admin/Dashboard/TotalProperty/home1.jpg";
import h2 from "../../Assests/Image/Admin/Dashboard/TotalProperty/h2.jpeg";
// import h3 from "../../Assests/Image/Admin/Dashboard/TotalProperty/h3.jpg";
// import h4 from "../../Assests/Image/Admin/Dashboard/TotalProperty/h4.jpg";
import h5 from "../../Assests/Image/Admin/Dashboard/TotalProperty/h5.png";
import "./../Common2.css";
import { useNavigate } from 'react-router-dom';
import { agentPropertyUrl, getUserAllPropertyUrl } from '../Components/Api';
import axios from 'axios';

const PropertyList = () => {

	const [showMore, setShowMore] = useState(false);
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);



	const navigate = useNavigate();

	const handleShowMore = () => {
		setShowMore(!showMore);
	};
	const handleMoreDetail = (property) => {

		navigate('/AddProperty/PropertyListMoreDetails', { state: { propertyData: property } });
	};



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

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			getAllProperty();
		}, 500)
	}, []);

	const getAllProperty = async () => {
		try {
			const token = localStorage.getItem('agent');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(agentPropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			if (response.status === 200) {
				const data = response.data.agentAllProperty;
				setProperties(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}


	return (
		<>


			<>
				<div>
					<div className='tw-flex tw-justify-center tw-items-center tw-mt-[50px]'>

						<h1 className='tw-font-semibold ' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '34px' }}>List Of Property</h1>
					</div>
					{loading ? (
						<div className="loader">
							<div class="spinner"></div>
						</div>
					) : (

						<div className=' tw-ml-10 tw-mr-20'>

							<div className='tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-1 tw-grid-cols-1'>

								{properties?.map((property, index) => (
									<div className=' tw-mt-10 '>
										<div class=" tw-w-[400px] tw-ml-[55px] tw-h-[800px] mb-4 border-0 tw-shadow-2xl tw-rounded-md">
											<div class="g-0 align-items-center">
												<div class="">
													<img src={property.propertyImage[0]} style={{ height: "250px", width: "100%" }} className=' tw-shadow-sm' />												</div>
											</div >

											<div class=" tw-ml-6 tw-mt-6 ">

												<h4 className=' tw-font-semibold tw-text-xl '>{property.address}</h4>
												<h2 class=" tw-font-semibold tw-text-lg tw-mb-4 tw-mt-1">₹ {validatePrice(property.price)}</h2>

												<div >
													<h2 className='tw-font-semibold tw-text-base tw-mt-5'>Facilities</h2>
												</div>
												<div className='tw-ml-2 tw-grid tw-grid-cols-3  '>
													{property.facility.map((feature, index) => (
														<h1 key={index} className='tw-mr-[20px] tw-text-sm tw-mt-3 tw-bg-gray-100 tw-rounded-xl tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[4px]'>{feature}</h1>
													))}

												</div>


												<div >
													<h2 className='tw-font-semibold tw-text-base tw-mt-5'>Details</h2>
												</div>
												<div className='tw-flex tw-ml-2'>

													<div className=" tw-me-[10px] tw-bg-gray-100  tw-pl-[6px] tw-pr-[8px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[150px]">
														<h5 className='tw-text-sm'><span className='tw-font-semibold tw-text-sm'>Square.Ft</span> -{property.size}sq.ft</h5>

													</div>
													<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[110px]">
														<h5 className='tw-text-sm'><span className='tw-font-semibold '>Locality</span> - {property.city}</h5>

													</div>
												</div>


												<div className='tw-flex tw-ml-2'>

													<div className=" tw-me-[10px] tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[99px]">
														<h5 className='tw-text-sm'><span className='tw-font-semibold '>BHK</span> -{property.houseType}</h5>

													</div>
													<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[144px]">
														<h5 className='tw-text-sm'><span className='tw-font-semibold '>Type</span> -{property.propertyType}</h5>

													</div>
												</div>

												<div className=" tw-bg-gray-100 tw-ml-2 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[191px]">
													<h5 className='tw-text-sm'><span className='tw-font-semibold '>Main Entrance Facing</span> -{property.faching}</h5>
												</div>





												<div className='tw-flex tw-mt-8'>
													{/* <div className=' '>
														<button type="submit" class="tw-p-2 tw-bg-custom-color tw-me-8 tw-ml-6  tw-text-white tw-font-semibold tw-mb-3 tw-rounded-md">
															Contact Seller</button>

													</div> */}
													<span>{property?.status}</span>
													<div className=' '>
														<button type="submit" className='tw-pl-2 tw-pr-2 tw-pt-[6px] tw-pb-[6px] tw-bg-white tw-text-black tw-border-2 hover:tw-bg-black hover:tw-text-white tw-border-black tw-font-semibold tw-mb-3 tw-rounded-md tw-ml-[200px]'
															onClick={() => handleMoreDetail(property)}>
															More Details
														</button>
													</div>
												</div>
											</div>

										</div >
									</div>
								))}
							</div >
						</div>

					)}
				</div >
			</>
		</>
	)
}

export default PropertyList
