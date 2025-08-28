import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Buy.css';
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSellPropertyUrl, setLikePropertyUrl } from '../Components/Api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Buy = () => {

	const [showMore, setShowMore] = useState(false);
	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
	const [value, setValue] = useState([0, 100]);
	const [propertyData, setPropertyData] = useState([]);

	const navigate = useNavigate();
	const handleMoreDetail = (property) => {

		navigate('/Buy/BuyMoreDetails', { state: { propertyData: property } });
	};



	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
	};

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	function valuetext(value) {
		return `${value}°C`;
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// const handleMoreDetail = () => {
	// 	navigate('/Buy/ReadMoreDetails')
	// }

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
		getSellProperty();

	}, []);

	const getSellProperty = async () => {
		try {
			const token = localStorage.getItem('user');
			const tokenArray = JSON.parse(token);

			const response = await axios.get(getSellPropertyUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			if (response.status === 200) {
				const data = response.data.allProperty;
				console.log('data: ', data);
				setPropertyData(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	const likeProperty = async (id, isLiked) => {
		const propertyToUpdate = propertyData.find(property => property._id === id);
		if (propertyToUpdate) {
			propertyToUpdate.isLiked = !propertyToUpdate.isLiked;
			setPropertyData([...propertyData]);

			try {
				const reqdata = {
					id: id,
					isLike: isLiked
				};

				const token = localStorage.getItem("user");
				const tokenArray = JSON.parse(token);
				console.log('id: ', id);
				const data = await axios.put(setLikePropertyUrl, reqdata, {
					headers: {
						Authorization: `Bearer ${tokenArray[0]}`,
					}
				});
				getSellProperty();
				console.log("like", data.data);
				console.log('success');
			} catch (error) {
				console.log(error);
			}
		}
	};


	return (
		<>
			<Nav />
			<div className='mt-5 md:flex'>

				<div class="col-lg-11 col-md-12 px-4 tw-ml-16">

					{propertyData.map((property, index) => (
						<div class="card mb-4 border-0 shadow" key={index}>
							<div class="row g-0 p-3 align-items-center">
								<div class="col-md-4 mb-lg-0 mb-md-0 mb-3">

									<img src={property.propertyImage[0]} style={{ height: "290px", width: "100%", borderRadius: '6px' }} className=' tw-shadow-sm' />

								</div>

								<div class="col-md-8 px-lg-3 px-md-3 px-0">
									<h2 class=" font-semibold text-xl">₹ {validatePrice(property.price)}</h2>
									<h4 className=' font-semibold mb-4'>{property.address}</h4>
									<div className="border bg-light p-3 rounded mb-3">


										<div className="features">
											<div className='container '>
												<div className='row mb-3'>
													<div className='col-md-4'>
														<h5 className='font-semibold tw-mt-2'>Square.Ft</h5>
														{property.size} sq.ft
													</div>
													<div className='col-md-4'>
														<h5 className='font-semibold tw-mt-2'>Main Entrance Facing</h5>
														{property.faching}
													</div>
													<div className='col-md-4'>
														<h5 className='font-semibold tw-mt-2'>Locality</h5>
														{property.city}
													</div>
												</div>

												{showMore && (
													<>
														<div className='row mb-3'>
															<div className='col-md-4'>
																<h5 className='font-semibold tw-mt-2'>BHK</h5>
																{property.houseType}
															</div>
															<div className='col-md-4'>
																<h5 className='font-semibold tw-mt-2'>Type</h5>
																{property.propertyType}
															</div>
															<div className='col-md-4'>
																<h5 className='font-semibold tw-mt-2'>Furnishing</h5>
																{property.furnishing}
															</div>
														</div>
														<div className='row mb-3'>
															<div className='col-md-4'>
																<h5 className='font-semibold'>Facility</h5>
																<div className='tw-flex tw-mt-3'>
																	{property.facility.map((feature, index) => (
																		<h1 key={index} className='tw-mr-4 tw-border-2 tw-p-3l'>{feature} </h1>
																	))}
																</div>

															</div>

														</div>
													</>
												)}

												<button onClick={handleShowMore} className="show-more-button  tw-font-thin tw-bg-gray-200 tw-p-1 rounded-4">
													{showMore ? 'Show Less' : 'Show More'}
												</button>


											</div>
										</div>

									</div>
									<div className='d-flex'>
										<div className='flex-grow-1'>
											<div className="facilities tw-ml-1 tw-mt-4">
												<h6 className="mb-3 tw-text-lg tw-font-semibold">Available For : <span className='tw-text-sm tw-font-normal'>{property.type}</span></h6>
											</div>
										</div>



										<div className='tw-flex tw-mt-4'>

											{property.isLike ? (
												<FavoriteIcon
													style={{ color: '#d3a478', height: '30px', width: '30px', marginRight: '20px', marginTop: '5px', cursor: 'pointer' }}
													onClick={() => likeProperty(property._id, !property.isLike)}
													className='heart'
												/>
											) : (
												<FavoriteBorderIcon
													style={{ height: '30px', width: '30px', marginRight: '20px', marginTop: '5px', cursor: 'pointer' }}
													onClick={() => likeProperty(property._id, !property.isLike)}
													className='heart'
												/>
											)}
											<div className=' '>
												<button type="submit"
													className='tw-pl-2 tw-pr-2 tw-pt-[6px] tw-pb-[6px] tw-bg-white tw-text-black tw-border-2 hover:tw-bg-black hover:tw-text-white tw-border-black tw-font-semibold tw-mb-3 tw-rounded-md'
													onClick={() => handleMoreDetail(property)}>
													More Details
												</button>
											</div>
										</div>
									</div>
								</div>
							</div >
						</div >))}
				</div >
			</div >


			<br />
			<br />
			<Footer />



		</>
	)
}


export default Buy;