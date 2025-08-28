import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./../AdminAgent/AdminAgentDetails.css"
// import h5 from "../../Assests/Image/Admin/Dashboard/TotalProperty/h5.png";
import Admin_Sidebar from '../../Admin_Nav/Admin_Sidebar';
import Admin_Nav from '../../Admin_Nav/Admin_Nav';
import { getAgentUrl, getUserQueryUrl, getUserUrl } from '../../../User/Components/Api';
import axios from 'axios';

const User_Queries = () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [userQue, setUserQue] = useState([]);

	const getUser = async () => {
		try {
			const token = localStorage.getItem('admin');
			const tokenArray = JSON.parse(token);
			console.log(tokenArray);

			const response = await axios.get(getUserQueryUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log("response:", response.data);

			if (response.status === 200) {
				const data = response.data.data;
				console.log('data: ', data);
				setUserQue(data);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			getUser();
		}, 500)

	}, []);


	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day} -${month} -${year}`;
	};


	return (
		<>

			<Admin_Nav />

			<div className='sticky-sidebar'>
				<Admin_Sidebar className="" />
			</div>

			{loading ? (
				<div className="loader">
					<div class="spinner"></div>
				</div>
			) : (


				<>
					<div class="container-fluid" id="main-content">
						<div class="row">
							<div class="col-lg-10 ms-auto p-4 overfloe-hidden">
								<h3 class="mb-4 tw-text-2xl tw-font-semibold">USER QUERIES</h3>

								<div class="card border-0 shadow mb-4">
									<div class="card-body">

										{/* <div class="text-end mb-4">
											<input type="text" oninput="search_user(this.value)" class="form-control shadow-none w-25 ms-auto" placeholder="Type to search" />
										</div> */}

										<div class="table-responsive">
											<table class="table table-hover border text-center">
												<thead>
													<tr class="tw-bg-black tw-text-white" >
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>#</th>
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>Name</th>
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>Email</th>
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>Subject</th>
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>Message</th>
														<th scope="col" className=' tw-bg-black tw-text-white' style={{ padding: '14px' }}>Date</th>

													</tr>
												</thead>
												<tbody >
													{userQue.map((data, index) => (
														<tr style={{ alignItems: "center" }}>
															<td>{index + 1}</td>
															<td>{data.name}</td>
															<td>{data.email}</td>
															<td>{data.subject}</td>
															<td>{data.message}</td>
															<td>{formatDate(data.createdAt)}</td>
														</tr>
													))}


												</tbody>
											</table>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
				</>

			)
			}


		</>
	)
}

export default User_Queries;