import React, { useState, useEffect } from 'react';
import Admin_Nav from '../../Admin_Nav/Admin_Nav';
import "./TotalProperty.css";
import { useNavigate } from 'react-router-dom';
import Admin_Sidebar from '../../Admin_Nav/Admin_Sidebar';
// import "./Common.css";
import "./../AdminDashboard/Common.css";
import { getAdminAllPropertyUrl } from '../../../User/Components/Api';
import axios from 'axios';

const TotalProperty = () => {

	const [showMore, setShowMore] = useState(false);
	const [loading, setLoading] = useState(true);
	const [propertyData, setPropertyData] = useState([]);

	const navigate = useNavigate();

	const handleMoreDetail = (property) => {

		navigate('/Admin/MoreDetails', { state: { propertyData: property } });
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


	// const moreDetail = () => {
	// 	navigate('/Admin/MoreDetails')
	// }


	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const getProperty = async () => {
		try {
			const token = localStorage.getItem('admin');
			const tokenArray = JSON.parse(token);
			console.log(tokenArray[0]);
			const response = await axios.get(getAdminAllPropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log("response:", response.data.data);

			if (response.status === 200) {
				const data = response.data.allProperty;
				console.log('data: ', data);
				setPropertyData(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			getProperty();
		}, 500)

	}, []);

	return (
		<>
			<Admin_Nav />
			<div>


				<div className='sticky-sidebar'>
					<Admin_Sidebar className="" />
				</div>

				{loading ? (
					<div className="loader">
						<div class="spinner"></div>
					</div>
				) : (



					<div className='tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-1 tw-grid-cols-1 tw-mr-[20px] tw-ml-[260px] '>

						{propertyData.map((property, index) => (
							<div className=' tw-mt-10' key={index}>
								<div class=" tw-w-[360px] tw-ml-[55px] tw-h-[800px] mb-4 border-0 tw-shadow-2xl tw-rounded-md tw-me-10 ">
									<div class="g-0 align-items-center">
										<div class="">
											<img src={property.propertyImage[0]} style={{ height: "250px", width: "100%" }} className=' tw-shadow-sm' />										</div>
									</div >
									<div class=" tw-ml-6 tw-mt-6 ">

										<h4 className=' tw-font-semibold tw-text-xl '>{property.address}</h4>
										<h2 class=" tw-font-semibold tw-text-lg tw-mb-4 tw-mt-1">₹ {validatePrice(property.price)}</h2>
										<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[150px]">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Property For</span>  - {property.type}</h5>

										</div>
										<div >
											<h2 className='tw-font-semibold tw-text-base tw-mt-5 tw-mb-1'>Facilities</h2>
										</div>

										<div className='tw-ml-2 tw-grid tw-grid-cols-3 '>
											{property.facility.map((feature, index) => (
												<h1 key={index} className='tw-mr-[20px] tw-text-sm tw-mt-2 tw-bg-gray-100 tw-rounded-xl tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[4px]'>{feature}</h1>
											))}

										</div>

										<div >
											<h2 className='tw-font-semibold tw-text-base tw-mt-5'>Property Details</h2>
										</div>
										<div className='tw-flex tw-ml-2'>

											<div className=" tw-me-[10px] tw-bg-gray-100  tw-pl-[6px] tw-pr-[8px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[170px]">
												<h5 className='tw-text-sm'><span className='tw-font-semibold tw-text-sm'>Square.Ft</span> - {property.size} sq.ft</h5>

											</div>
											<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[150px]">
												<h5 className='tw-text-sm'><span className='tw-font-semibold '>Locality</span> -{property.city}</h5>

											</div>
										</div>


										<div className='tw-flex tw-ml-2'>

											<div className=" tw-me-[10px] tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[99px]">
												<h5 className='tw-text-sm'><span className='tw-font-semibold '>BHK</span> -{property.houseType}</h5>

											</div>
											<div className=" tw-bg-gray-100 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[144px]">
												<h5 className='tw-text-sm'><span className='tw-font-semibold '>Type</span> - {property.propertyType}</h5>

											</div>
										</div>

										<div className=" tw-bg-gray-100 tw-ml-2 tw-pl-[7px] tw-pr-[5px] tw-pt-[2px] tw-pb-[2px] tw-rounded-2xl tw-text-sm tw-mb-3 tw-mt-4 tw-w-[200px] tw-h-[30px]">
											<h5 className='tw-text-sm'><span className='tw-font-semibold '>Main Entrance Facing</span> - {property.faching}</h5>
										</div>


										{/* <div className='flex-grow-1'>
											<div className="facilities tw-ml-1">
												<h6 className="tw-mb-3 tw-mt-5 tw-font-semibold">Owner Name</h6>
											</div>
										</div> */}

										<div className='tw-flex tw-mt-8'>
											{/* <div className=' '>
												<button type="submit" class="tw-p-2 tw-bg-custom-color tw-me-8 tw-ml-6  tw-text-white tw-font-semibold tw-mb-3 tw-rounded-md">
													Contact Seller</button>

											</div> */}
											<div className=' '>
												<button type="submit"
													className='tw-pl-2 tw-pr-2 tw-pt-[6px] tw-ml-[200px] tw-pb-[6px] tw-bg-white tw-text-black tw-border-2 hover:tw-bg-black hover:tw-text-white tw-border-black tw-font-semibold  tw-rounded-md'
													onClick={() => handleMoreDetail(property)}>
													More Details
												</button>
											</div>
										</div>

									</div>

								</div >
							</div >

						))}

					</div>
				)}
			</div >

		</>
	)
}

export default TotalProperty