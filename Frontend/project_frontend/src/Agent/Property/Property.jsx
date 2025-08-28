import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import img from "../../Assests/Image/Home1/reg_bg.jpeg";
import '../AgentRegister.css';
import { useNavigate } from 'react-router-dom';
import AgentNav from '../AgentNav/AgentNav';
import axios from 'axios';
import { agentPropertyUrl } from '../../User/Components/Api';

const Property = () => {

	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
	const [propertyData, setPropertyData] = useState([]);
	const [showModal, setShowModal] = useState(false);



	const navigate = useNavigate();


	const getProperty = async () => {
		try {
			const token = localStorage.getItem('agent');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(agentPropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});

			if (response.status === 200) {
				const data = response.data.
					agentAllProperty;
				console.log('data: ', data);
				setPropertyData(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	useEffect(() => {
		getProperty();
	}, []);

	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
	};


	const handleMoreDetail = (property) => {
		navigate('/Agent/Property/ReadMore', { state: { propertyData: property } })

	}


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
				return `${(number / 10000000).toFixed(1)}Crore`;
			}
		} catch (e) {
			console.log(e)
		}
		return currentBalance;

	}
	return (
		<>

			<AgentNav />


			<div className="modal" tabIndex="-1" style={{ display: showModal ? "block" : "none" }}>
				<div className="modal-dialog tw-bg-slate-200 max-w-[550px]" style={{ backgroundColor: "#ffffff" }}>
					{propertyData.map((property, index) => (

						<div className="modal-content" style={{ backgroundColor: "#ffffff", width: "550px", marginTop: '150px' }} key={index}>
							<div className="modal-header">
								<h5 className="modal-title tw-text-xl tw-font-semibold">
									Owener Details
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
									{property.userId.name}
								</p>
								<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
									<label htmlFor="" className=' tw-font-bold tw-mr-2'>Email :  </label>{property.userId.email}
								</p>
								<p className="tw-text-lg  tw-font-semibold tw-text-gray-500  tw-mt-4">
									<label htmlFor="" className=' tw-font-bold tw-mr-2'>Contact No : </label>{property.userId.mobileNo}
								</p>


							</div>
							<div className="modal-footer">

								{/* <div className=' tw-mt-[-10px]'>
								<button type="submit" class="tw-p-2 tw-w-full tw-cursor-pointer tw-bg-custom-color tw-text-white tw-font-semibold tw-mb-3 tw-rounded-md">
									Pay for Rent</button>
							</div> */}


								<button
									type="button"
									className="btn btn-primary "
									style={{ backgroundColor: "black", border: "none", marginTop: '-7px' }}
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
							</div>
						</div>
					))}
				</div>
			</div>


			<div className=' lg:tw-p-10'>
				<div className='tw-grid  shadow-lg lg:tw-p-5 tw-rounded-md '>

					<div className=' md:flex'>
						<div className="col-lg-12 col-md-12 px-4">

							{propertyData.map((property, index) => (
								<div className="card mb-4 border-0 shadow" key={index}>
									<div className="row g-0 p-3 align-items-center">
										<div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
											<img src={property.propertyImage[0]} style={{ height: "290px", width: "100%", borderRadius: '6px' }} className=' tw-shadow-sm' />										</div>

										<div className="col-md-8 px-lg-3 px-md-3 px-0">
											<h2 className="font-semibold text-xl">₹ {validatePrice(property.price)}</h2>
											<h4 className='font-semibold mb-4'>{property.address}</h4>
											<div className="border bg-light p-3 rounded mb-3">

												<div className="features">
													<div className='container '>
														<div className='row mb-3'>
															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Property For</h5>
																{property.type}
															</div>
															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Square.Ft</h5>
																{property.size}sq.ft
															</div>

															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Locality</h5>
																{property.city}
															</div>
															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>BHK</h5>
																{property.houseType}
															</div>
														</div>


														<div className='row mb-3'>

															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Type</h5>
																{property.propertyType}
															</div>

															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Main Entrance Facing</h5>
																{property.faching}
															</div>
															<div className='col-md-3'>
																<h5 className='font-semibold tw-mt-2'>Furnishing</h5>
																{property.furnishing}
															</div>
															<div className='col-md-3'>
																<h5 className='font-semibold'>Property Age</h5>
																{property.propertyAge} year old
															</div>

														</div>
													</div>
												</div>

											</div>
											<div className='d-flex'>
												<div className='flex-grow-1'>
													{/* <div className="facilities tw-ml-1">
														<h6 className="mb-3 tw-font-semibold">Owner Name</h6>
														<p className="mb-0">{property.userId.name}</p>
													</div> */}
												</div>

												<div className='tw-flex tw-mt-8'>


													<div className=' '>
														<button type="submit" className='tw-pl-2 tw-pr-2 tw-pt-[6px] tw-pb-[6px] tw-bg-white tw-text-black tw-border-2 hover:tw-bg-black hover:tw-text-white tw-border-black tw-font-semibold tw-mb-3 tw-rounded-md' onClick={() => handleMoreDetail(property)}>
															More Details
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>




					<br />
					<br />
					{/* <Footer /> */}

				</div>
			</div>
		</>

	)
}


export default Property;
