import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "./../AdminAgent/AdminAgentDetails.css";
import "./Pagination.css";
import Admin_Sidebar from '../../Admin_Nav/Admin_Sidebar';
import Admin_Nav from '../../Admin_Nav/Admin_Nav';
import { getAgentUrl, getUserUrl } from '../../../User/Components/Api';
import axios from 'axios';

const AdminUserDetails = () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState([]);

	const [limit, setLimit] = useState([7]);
	const [page, setPage] = useState('');
	const currentPage = useRef();



	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			currentPage.current = 1;
			getUser();
		}, 500)

	}, []);

	const getUser = async () => {
		try {
			const token = localStorage.getItem('admin');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(`${getUserUrl}?page=${currentPage.current}&limit=${limit}`, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log("response:", response);

			if (response.status === 200) {
				const data = response.data.result.users;
				console.log('data: ', data);
				setUserData(data);
				const pageNo = response.data.result.pageCount;
				console.log('page', pageNo);
				setPage(pageNo);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	}

	const handlePageClick = (e) => {
		console.log(e);
		currentPage.current = e.selected + 1;
		getUser();
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
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
								<h3 class="mb-4 tw-text-2xl tw-font-semibold">USERS INFORMATION</h3>

								<div class="card border-0 shadow mb-4">
									<div class="card-body">

										{/* <div class="text-end mb-4">
                                            <input type="text" oninput="search_user(this.value)" class="form-control shadow-none w-25 ms-auto" placeholder="Type to search" />
                                        </div> */}

										<div class="table-responsive">
											<table className="table table-hover tw-border tw-text-center">
												<thead className=''>
													<tr className=' '>
														<th scope="col" className='tw-bg-black tw-text-white' style={{ padding: '14px' }}>Profile</th>
														<th scope="col" className='tw-bg-black tw-text-white' style={{ padding: '14px' }}>User_Id</th>
														<th scope="col" className='tw-bg-black tw-text-white' style={{ padding: '14px' }}>Name</th>
														<th scope="col" className='tw-bg-black tw-text-white' style={{ padding: '14px' }}>Email</th>
														<th scope="col" className='tw-bg-black tw-text-white' style={{ padding: '14px' }}>Created At</th>

													</tr>
												</thead>
												<tbody >
													{userData.map((data, index) => (
														<tr style={{ alignItems: "center" }}>
															<td><img src={data.profilePic} alt="" style={{ "borderRadius": "50%", height: "46px", width: "46px", marginLeft: '20px' }} /></td>
															<td>{data._id}</td>
															<td>{data.name}</td>
															<td>{data.email}</td>
															<td>{formatDate(data.createdAt)}</td>
														</tr>
													))}


												</tbody>
											</table>

											<ReactPaginate
												breakLabel="..."
												nextLabel="next >"
												onPageChange={handlePageClick}
												pageRangeDisplayed={5}
												pageCount={page}
												previousLabel="< previous"
												renderOnZeroPageCount={null}
												marginPagesDisplayed={2}
												containerClassName="pagination justify-content-center"
												pageClassName="page-item"
												pageLinkClassName="page-link"
												previousClassName="page-item"
												previousLinkClassName="page-link"
												nextClassName="page-item"
												nextLinkClassName="page-link"
												activeClassName="active"

											/>


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

export default AdminUserDetails;