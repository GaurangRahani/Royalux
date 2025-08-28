import React from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DescriptionIcon from '@mui/icons-material/Description';
import HouseIcon from '@mui/icons-material/House';
import "./PropertyList.css";



export const PostDetails = () => {

	// const handleFileInputChange = (e) => {
	//     const files = e.target.files;
	//     // Handle the selected files as needed
	//     console.log('Selected files:', files);
	// };

	const descLeave = () => {
		document.getElementById('description').style.color = 'black';
		document.getElementById('circle-container').style.background = '#d3a478';
	};

	const descEnter = () => {
		document.getElementById('description').style.color = 'white';
		document.getElementById('circle-container').style.background = 'black';

	};


	const photoLeave = () => {
		document.getElementById('photo').style.color = 'black';
		document.getElementById('photo-container').style.background = '#d3a478';
	};

	const photoEnter = () => {
		document.getElementById('photo').style.color = 'white';
		document.getElementById('photo-container').style.background = 'black';

	};


	const homeLeave = () => {
		document.getElementById('house').style.color = 'black';
		document.getElementById('house-container').style.background = '#d3a478';
	};

	const homeEnter = () => {
		document.getElementById('house').style.color = 'white';
		document.getElementById('house-container').style.background = 'black';

	};
	return (
		<div>
			<div className='text-center'>
				<div className='tw-flex tw-items-center tw-justify-center tw-mt-24'>
					<div className='lg:tw-w-[240px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
					<h6 class="mb-2 tw-text-lg font-bold md:tw-mr-5 md:tw-ml-5" >HOW TO POST</h6>
					<div className='lg:tw-w-[240px] tw-w-20 tw-border-b-2' style={{ border: '0px solid #d3a478' }}></div>
				</div>
				<p className='tw-text-center tw-text-6xl-text-6xl mt-2 mb-5 ' style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px' }}>Post Your Property in 3 Simple Steps
				</p>
			</div>
			<div className="lg:tw-flex lg:tw-p-20">
				<div className="p-3 tw-justify-center m-3 lg:tw-ml-20 lg:tw-w-[500px]  tw-border tw-border-1 tw-border-grey sm:w-full tw-rounded-sm">
					<div
						id='circle-container'
						className='tw-mt-[-48px] tw-flex tw-justify-center tw-items-center tw-shadow-2xl tw-m-auto '
						style={{
							border: '6px solid white',
							borderRadius: '50%',
							height: '90px',
							width: '90px',
							background: '#d3a478',
							transition: 'background 0.3s',
						}}
						onMouseEnter={descEnter}
						onMouseLeave={descLeave}
					>
						<div>
							<DescriptionIcon
								id='description'
								className='tw-h-12 tw-w-10'
								style={{
									color: 'black',
									transition: 'color 0.3s',
									cursor: 'pointer',
								}}
							/>
						</div>
					</div>
					<h1 className='tw-mt-[30px] tw-mb-[20px] tw-font-semibold tw-text-2xl tw-text-center'>01.Add Details of your property</h1>
					<div className='tw-font-normal tw-text-md tw-text-center tw-mb-5 tw-text-gray-500'>Begin by telling us the few basic details about your property like your property type, location, No. of rooms etc</div>
				</div>


				<div className="p-3 tw-justify-center m-3 lg:tw-w-[500px]  tw-border tw-border-1 tw-border-grey sm:w-full tw-rounded-sm">

					<div
						id='photo-container'
						className='tw-mt-[-48px] tw-flex tw-justify-center tw-items-center tw-shadow-2xl tw-m-auto '
						style={{
							border: '6px solid white',
							borderRadius: '50%',
							height: '90px',
							width: '90px',
							background: '#d3a478',
							transition: 'background 0.3s',
						}}
						onMouseEnter={photoEnter}
						onMouseLeave={photoLeave}
					>
						<div>
							<AddAPhotoIcon
								id='photo'
								className='tw-h-12 tw-w-10'
								style={{
									color: 'black',
									transition: 'color 0.3s',
									cursor: 'pointer',


								}}
							/>
						</div>
					</div>

					<h1 className='tw-mt-[30px] tw-mb-[20px] tw-font-semibold tw-text-2xl tw-text-center'>02.Upload Photos & Videos</h1>
					<div className='tw-font-normal tw-text-md tw-text-gray-500 tw-text-center tw-mb-5'>Upload photos and videos of your property either via your desktop device or from your mobile phone</div>
				</div>

				<div className="p-3 tw-justify-center m-3 lg:tw-mr-20  lg:tw-w-[500px]  tw-border tw-border-1 tw-border-grey sm:w-full tw-rounded-sm">

					<div
						id='house-container'
						className='tw-mt-[-48px] tw-flex tw-justify-center tw-items-center tw-shadow-2xl tw-m-auto '
						style={{
							border: '6px solid white',
							borderRadius: '50%',
							height: '90px',
							width: '90px',
							background: '#d3a478',
							transition: 'background 0.3s',
						}}
						onMouseEnter={homeEnter}
						onMouseLeave={homeLeave}
					>
						<div>
							<HouseIcon
								id='house'
								className='tw-h-12 tw-w-10'
								style={{
									color: 'black',
									transition: 'color 0.3s',
									cursor: 'pointer',
								}}
							/>
						</div>
					</div>
					<h1 className='tw-mt-[30px] tw-mb-[20px] tw-font-semibold tw-text-2xl tw-text-center'>03.Add Pricing & Ownership</h1>
					<div className='tw-font-normal tw-text-md tw-text-gray-500 tw-text-center tw-mb-14'>Just update your property’s ownership details and your expected price and your property is ready for posting</div>
				</div>
			</div>

		</div>
	)
}