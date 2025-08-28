// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminAgentDetails.css";
// import ReactPaginate from 'react-paginate';
// import Admin_Sidebar from "../../Admin_Nav/Admin_Sidebar";
// import Admin_Nav from "../../Admin_Nav/Admin_Nav";
// import {
// 	approveAgentUrl,
// 	cancleAgentUrl,
// 	getAgentUrl,
// 	getUserUrl,
// 	setMeetingUrl,
// } from "../../../User/Components/Api";
// import axios from "axios";
// import CloseIcon from "@mui/icons-material/Close";

// const AdminAgentDetails = () => {
// 	const navigate = useNavigate();
// 	const [loading, setLoading] = useState(true);
// 	const [agentData, setAgentData] = useState([]);
// 	const [agentDataForModal, setAgentDataForModal] = useState([]);
// 	const [meetingDate, setMeetingDate] = useState("");
// 	const [meetingTime, setMeetingTime] = useState("");
// 	const [meetingLink, setMeetingLink] = useState("");
// 	const [showModal, setShowModal] = useState(false);

// 	const [limit, setLimit] = useState([2]);
// 	const [page, setPage] = useState('');
// 	const currentPage = useRef();

// 	const handlePopUp = (data) => {
// 		setShowModal(true);
// 		setAgentDataForModal(data);
// 		console.log(agentDataForModal);
// 	};
// 	const getAgent = async () => {
// 		try {
// 			const token = localStorage.getItem("admin");
// 			const tokenArray = JSON.parse(token);

// 			const response = await axios.get(`${getAgentUrl}?page=${currentPage.current}&limit=${limit}`, {
// 				headers: {
// 					Authorization: `Bearer ${tokenArray[0]}`,
// 				},
// 			});
// 			console.log("agent", response);

// 			if (response.status === 200) {
// 				const data = response.data.result.agents;
// 				console.log("data: ", data);
// 				setAgentData(data);
// 				const pageNo = response.data.result.pageCount;
// 				console.log('page', pageNo);
// 				setPage(pageNo);
// 			}
// 		} catch (error) {
// 			console.error("fetch all property:", error.message);
// 		}
// 	};

// 	const setMeeting = (name, email) => async () => {
// 		try {
// 			const token = localStorage.getItem("token");

// 			const sendData = {
// 				name: name,
// 				email: email,
// 				date: meetingDate,
// 				time: meetingTime,
// 				link: meetingLink,
// 			};
// 			console.log(sendData);

// 			const response = await axios.post(setMeetingUrl, sendData, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});

// 			if (response.status === 200) {
// 				// getProperty();
// 				setShowModal(false);
// 				console.log("success....!");
// 			}
// 		} catch (error) {
// 			console.error("Error:", error.message);
// 		}
// 	};

// 	const approveAgent = (AgentId) => async () => {
// 		try {
// 			const token = localStorage.getItem("admin");
// 			const tokenArray = JSON.parse(token);

// 			const approvedata = {
// 				id: AgentId,
// 			};
// 			console.log(approvedata.id);

// 			const response = await axios.post(approveAgentUrl, approvedata, {
// 				headers: {
// 					Authorization: `Bearer ${tokenArray[0]}`,
// 				},
// 			});

// 			if (response.status === 200) {
// 				getAgent();
// 			}
// 		} catch (error) {
// 			console.error("Error:", error.message);
// 		}
// 	};
// 	const cancleAgent = (AgentId) => async () => {
// 		try {
// 			const token = localStorage.getItem("admin");
// 			const tokenArray = JSON.parse(token);

// 			const cancledata = {
// 				id: AgentId,
// 			};

// 			const response = await axios.post(cancleAgentUrl, cancledata, {
// 				headers: {
// 					Authorization: `Bearer ${tokenArray[0]}`,
// 				},
// 			});
// 			console.log(response);
// 			if (response.status === 200) {
// 				getAgent();
// 			}
// 		} catch (error) {
// 			console.error("Error:", error.message);
// 		}
// 	};

// 	useEffect(() => {
// 		setTimeout(() => {
// 			currentPage.current = 1;
// 			setLoading(false);
// 			getAgent();
// 		}, 500);
// 	}, []);

// 	const handlePageClick = (e) => {
// 		console.log(e);
// 		currentPage.current = e.selected + 1;
// 		getAgent();
// 	}

// 	const formatDate = (dateString) => {
// 		const date = new Date(dateString);
// 		const day = date.getDate().toString().padStart(2, "0");
// 		const month = (date.getMonth() + 1).toString().padStart(2, "0");
// 		const year = date.getFullYear();
// 		return `${day} -${month} -${year}`;
// 	};

// 	return (
// 		<>
// 			<Admin_Nav />

// 			<div className="sticky-sidebar">
// 				<Admin_Sidebar className="" />
// 			</div>

// 			{loading ? (
// 				<div className="loader">
// 					<div class="spinner"></div>
// 				</div>
// 			) : (
// 				<>
// 					<div class="container-fluid" id="main-content">
// 						<div class="row">
// 							<div class="col-lg-10 ms-auto p-4 overfloe-hidden">
// 								<h3 class="mb-4 tw-text-xl tw-font-semibold">AGENTS</h3>

// 								<div class="card border-0 shadow mb-4">
// 									<div class="card-body">
// 										{/* <div class="text-end mb-4">
// 											<input type="text" oninput="search_user(this.value)" class="form-control shadow-none w-25 ms-auto" placeholder="Type to search" />
// 										</div> */}

// 										<div class="table-responsive">
// 											<table class="table table-hover border text-center">
// 												<thead>
// 													<tr
// 														class="bg-dark text-light"
// 														style={{ backgroundColor: "black", color: "white" }}
// 													>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Profile</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Details</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Personal Info</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Location</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Bank Details</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Proof</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Meeting</th>
// 														<th scope="col" className=" tw-bg-black tw-text-white">Status</th>
// 													</tr>
// 												</thead>
// 												<tbody>
// 													{agentData.map((data, index) => (
// 														<>
// 															<tr>
// 																<td>
// 																	<img
// 																		src={data.profilePic}
// 																		style={{
// 																			borderRadius: "50%",
// 																			height: "50px",
// 																			width: "60px",
// 																		}}
// 																		alt=""
// 																	/>
// 																</td>
// 																<td>
// 																	<td style={{ display: "block" }}>
// 																		{data.name}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		{data.email}
// 																	</td>
// 																	<td style={{ display: "inline-block" }}>
// 																		+91 {data.mobileNo}
// 																	</td>
// 																</td>

// 																<td>
// 																	<td style={{ display: "block" }}>
// 																		Age:{data.age}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		Gender:{data.gender}
// 																	</td>
// 																</td>
// 																<td>
// 																	<td style={{ display: "block" }}>
// 																		{data.address}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		{data.city}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		{data.state}
// 																	</td>
// 																</td>
// 																<td>
// 																	<td style={{ display: "block" }}>
// 																		{" "}
// 																		Bank Name: {data.bankName}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		{" "}
// 																		Ac: {data.bankAccountNo}
// 																	</td>
// 																	<td style={{ display: "block" }}>
// 																		{" "}
// 																		IFSC: {data.ifscCode}
// 																	</td>
// 																</td>
// 																<td>
// 																	<tr style={{ marginBottom: "10px" }}>
// 																		<td style={{ display: "block" }}>
// 																			<span>Adhar Card:</span>
// 																		</td>
// 																		<td
// 																			style={{
// 																				paddingRight: "15px",
// 																				paddingBottom: "10px",
// 																			}}
// 																		>
// 																			<img
// 																				src={data.adharCardFront}
// 																				style={{
// 																					height: "60px",
// 																					width: "300px",
// 																				}}
// 																				className="rounded"
// 																				alt=""
// 																			/>
// 																		</td>
// 																		<td>
// 																			<img
// 																				src={data.adharCardBack}
// 																				style={{
// 																					height: "60px",
// 																					width: "300px",
// 																				}}
// 																				className="rounded"
// 																				alt=""
// 																			/>
// 																		</td>
// 																	</tr>
// 																	<tr style={{ marginTop: "10px" }}>
// 																		<td style={{ display: "block" }}>
// 																			<span>
// 																				Pan <br /> Card:
// 																			</span>
// 																		</td>
// 																		<td style={{ paddingLeft: "5px" }}>
// 																			<img
// 																				src={data.panCard}
// 																				style={{
// 																					height: "60px",
// 																					width: "80px",
// 																				}}
// 																				className="rounded"
// 																				alt=""
// 																			/>
// 																		</td>
// 																	</tr>
// 																</td>
// 																<td style={{ paddingLeft: "20px" }}>
// 																	<button
// 																		className="bg-black text-white py-1 px-3 pb-2 md:ml-8 rounded md:static font-semibold duration-500 tw-mt-6"
// 																		onClick={() => handlePopUp(data)}
// 																	>
// 																		Set-Meeting
// 																	</button>
// 																</td>
// 																<td style={{ paddingLeft: "20px" }}>
// 																	<p className="tw-border-2 tw-rounded-lg py-1 px-1 pb-1 tw-mb-2">
// 																		{data.status}
// 																	</p>
// 																	<button
// 																		className="bg-black text-white py-1 px-3 pb-2 md:ml-8 rounded md:static font-semibold duration-500"
// 																		onClick={approveAgent(data._id)}
// 																	>
// 																		Approve
// 																	</button>
// 																	<button
// 																		className="bg-black text-white py-1 px-4 pb-2 md:ml-8 rounded md:static font-semibold duration-500 tw-mt-4"
// 																		onClick={cancleAgent(data._id)}
// 																	>
// 																		Cancle
// 																	</button>
// 																</td>
// 															</tr>
// 														</>
// 													))}

// 													<div
// 														className="modal"
// 														tabIndex="-1"
// 														style={{
// 															display: showModal ? "block" : "none",
// 															backgroundColor: "transparent",
// 															boxShadow: "none",
// 															position: "fixed",
// 															top: 65,
// 															left: 10,
// 															right: 0,
// 															bottom: 0,
// 														}}
// 													>
// 														<div
// 															className="modal-dialog "
// 															style={{
// 																maxWidth: "500px",
// 																maxHeight: "600px",
// 																width: "100%",
// 																backgroundColor: "#ffffff",
// 															}}
// 														>
// 															<div
// 																className="modal-content"
// 																style={{
// 																	backgroundColor: "#ffffff",
// 																	height: "550px",
// 																	maxWidth: "500px",
// 																	width: "100%",
// 																}}
// 															>
// 																<div className="modal-header">
// 																	<h5 className="modal-title tw-text-xl tw-font-semibold">
// 																		Meeting Deatils
// 																	</h5>
// 																	<button
// 																		type="button"
// 																		className="btn-close"
// 																		onClick={() => setShowModal(false)}
// 																	>
// 																		<CloseIcon className="tw-mt-[-5px] tw-mr-[20px]" />
// 																	</button>
// 																</div>
// 																<div
// 																	className="modal-body "
// 																	style={{ textAlign: "left", padding: "20px" }}
// 																>
// 																	<div>
// 																		<label
// 																			htmlFor=""
// 																			className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
// 																		>
// 																			Name{" "}
// 																		</label>
// 																		<h1 className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2">
// 																			{agentDataForModal.name}
// 																		</h1>
// 																	</div>
// 																	<div>
// 																		<label
// 																			htmlFor=""
// 																			className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
// 																		>
// 																			Email{" "}
// 																		</label>
// 																		<h1 className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2">
// 																			{agentDataForModal.email}
// 																		</h1>
// 																	</div>
// 																	<div className="tw-flex">
// 																		<div className="tw-mr-3">
// 																			<label
// 																				htmlFor=""
// 																				className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
// 																			>
// 																				Date{" "}
// 																			</label>
// 																			<input
// 																				type="date"
// 																				className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
// 																				onChange={(e) => {
// 																					setMeetingDate(e.target.value);
// 																				}}
// 																			/>
// 																		</div>
// 																		<div>
// 																			<label
// 																				htmlFor=""
// 																				className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
// 																			>
// 																				Time{" "}
// 																			</label>
// 																			<input
// 																				type="time"
// 																				className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
// 																				onChange={(e) => {
// 																					setMeetingTime(e.target.value);
// 																				}}
// 																			/>
// 																		</div>
// 																	</div>
// 																	<div>
// 																		<label
// 																			htmlFor=""
// 																			className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
// 																		>
// 																			Meeting Link{" "}
// 																		</label>
// 																		<input
// 																			type="text"
// 																			className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
// 																			onChange={(e) => {
// 																				setMeetingLink(e.target.value);
// 																			}}
// 																		/>
// 																	</div>
// 																</div>

// 																<div className="modal-footer">
// 																	<button
// 																		type="button"
// 																		className="btn btn-primary "
// 																		style={{
// 																			backgroundColor: "black",
// 																			border: "none",
// 																		}}
// 																		onClick={() => setShowModal(false)}
// 																	>
// 																		Close
// 																	</button>
// 																	<button
// 																		type="button"
// 																		className="btn btn-primary "
// 																		style={{
// 																			backgroundColor: "black",
// 																			border: "none",
// 																		}}
// 																		onClick={setMeeting(
// 																			agentDataForModal.name,
// 																			agentDataForModal.email
// 																		)}
// 																	>
// 																		Send
// 																	</button>
// 																</div>
// 															</div>
// 														</div>
// 													</div>
// 												</tbody>
// 											</table>

// 											<ReactPaginate
// 												breakLabel="..."
// 												nextLabel="next >"
// 												onPageChange={handlePageClick}
// 												pageRangeDisplayed={5}
// 												pageCount={page}
// 												previousLabel="< previous"
// 												renderOnZeroPageCount={null}
// 												marginPagesDisplayed={2}
// 												containerClassName="pagination justify-content-center"
// 												pageClassName="page-item"
// 												pageLinkClassName="page-link"
// 												previousClassName="page-item"
// 												previousLinkClassName="page-link"
// 												nextClassName="page-item"
// 												nextLinkClassName="page-link"
// 												activeClassName="active"

// 											/>

// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default AdminAgentDetails;




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAgentDetails.css";
import ReactPaginate from 'react-paginate';
import Admin_Sidebar from "../../Admin_Nav/Admin_Sidebar";
import Admin_Nav from "../../Admin_Nav/Admin_Nav";
import "../../Admin_Components/AdminUser/Pagination.css";
import {
	approveAgentUrl,
	cancleAgentUrl,
	getAgentUrl,

	setMeetingUrl,
} from "../../../User/Components/Api";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const AdminAgentDetails = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [agentData, setAgentData] = useState([]);
	const [agentDataForModal, setAgentDataForModal] = useState([]);
	const [meetingDate, setMeetingDate] = useState("");
	const [meetingTime, setMeetingTime] = useState("");
	const [meetingLink, setMeetingLink] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [limit, setLimit] = useState([3]);
	const [page, setPage] = useState('');
	const currentPage = useRef();

	const handlePopUp = (data) => {
		setShowModal(true);
		setAgentDataForModal(data);
		console.log(agentDataForModal);
	};

	const getAgent = async () => {
		try {
			const token = localStorage.getItem("admin");
			const tokenArray = JSON.parse(token);

			const response = await axios.get(`${getAgentUrl}?page=${currentPage.current}&limit=${limit}`, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log("agent", response);

			if (response.status === 200) {
				const data = response.data.result.agents;
				console.log("data: ", data);
				setAgentData(data);
				const pageNo = response.data.result.pageCount;
				console.log('page', pageNo);
				setPage(pageNo);
			}
		} catch (error) {
			console.error("fetch all property:", error.message);
		}
	};

	const setMeeting = (name, email) => async () => {
		try {
			const token = localStorage.getItem("token");

			const sendData = {
				name: name,
				email: email,
				date: meetingDate,
				time: meetingTime,
				link: meetingLink,
			};
			console.log(sendData);

			const response = await axios.post(setMeetingUrl, sendData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				setShowModal(false);
				console.log("success....!");
			}
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	const approveAgent = (AgentId) => async () => {
		try {
			const token = localStorage.getItem("admin");
			const tokenArray = JSON.parse(token);

			const approvedata = {
				id: AgentId,
			};
			console.log(approvedata.id);

			const response = await axios.post(approveAgentUrl, approvedata, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});

			if (response.status === 200) {
				getAgent();
			}
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	const cancleAgent = (AgentId) => async () => {
		try {
			const token = localStorage.getItem("admin");
			const tokenArray = JSON.parse(token);

			const cancledata = {
				id: AgentId,
			};

			const response = await axios.post(cancleAgentUrl, cancledata, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});
			console.log(response);
			if (response.status === 200) {
				getAgent();
			}
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			currentPage.current = 1;
			setLoading(false);
			getAgent();
		}, 500);
	}, []);

	const handlePageClick = (e) => {
		console.log(e);
		currentPage.current = e.selected + 1;
		getAgent();
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day} -${month} -${year}`;
	};

	return (
		<>
			<Admin_Nav />

			<div className="sticky-sidebar">
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
								<h3 class="mb-4 tw-text-xl tw-font-semibold">AGENTS</h3>

								<div class="card border-0 shadow mb-4">
									<div class="card-body">

										<div className='tw-grid md:tw-grid-cols-3 tw-grid-cols-1 tw-place-content-center gap-5'>
											<>
												{agentData.map((data, index) => (
													<>
														<div className=' tw-mt-2 tw-w-full' >
															<div class=" tw-w-[360px] tw-h-[720px] mb-4 border-0 tw-shadow-2xl tw-rounded-md tw-me-10 ">
																<div className=" tw-flex tw-place-content-center">
																	<img src={data.profilePic} height='80px' width='80px' className=' tw-mt-8' style={{ borderRadius: "50%" }} />
																</div >
																<div class=" tw-p-2 tw-mt-6 ">

																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Name :</h2>
																		<h2 className=" tw-p-2">{data.name}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Email :</h2>
																		<h2 className=" tw-p-2"> {data.email}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Mobile :</h2>
																		<h2 className=" tw-p-2">+91 {data.mobileNo}</h2>
																	</div>

																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Age :</h2>
																		<h2 className=" tw-p-2">{data.age}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Gender :</h2>
																		<h2 className=" tw-p-2">{data.gender}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Address :</h2>
																		<h2 className=" tw-p-2">{data.address}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Bank :</h2>
																		<h2 className=" tw-p-2">{data.bankName}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Ac No. :</h2>
																		<h2 className=" tw-p-2">{data.bankAccountNo}</h2>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">IFSC :</h2>
																		<h2 className=" tw-p-2">{data.ifscCode}</h2>
																	</div>


																	<div className="tw-flex tw-mt-3 gap-3">
																		<div className="tw-w-full">
																			<label htmlFor="Adhar front" className="tw-font-semibold">Adhar front</label>
																			<img src={data.adharCardFront} height='60px' width='100px' className=' tw-mt-2' />
																		</div>
																		<div className="tw-w-full">
																			<label htmlFor="Adhar front" className="tw-font-semibold">Adhar Back</label>
																			<img src={data.adharCardBack} height='60px' width='100px' className=' tw-mt-2' />
																		</div>
																		<div className="tw-w-full">
																			<label htmlFor="Adhar front" className="tw-font-semibold">Pan Card</label>
																			<img src={data.panCard} height='60px' width='100px' className=' tw-mt-2' />
																		</div>
																	</div>
																	<div className="tw-flex tw-h-10  shadow-sm  align-content-center tw-mt-3">
																		<h2 className="tw-font-semibold tw-text-base tw-p-2">Status :</h2>
																		<h2 className=" tw-p-2">{data.status}</h2>
																	</div>

																	<div className="tw-flex gap-3 tw-mt-4">
																		{data.status === 'pending' && (
																			<>
																				<button className="tw-bg-black tw-text-white tw-p-2 tw-rounded tw-w-full" onClick={() => handlePopUp(data)}>set-Metting</button>
																				<button className="tw-bg-black tw-text-white tw-p-2 tw-rounded tw-w-full" onClick={approveAgent(data._id)}>Approve</button>
																				<button className="tw-bg-black tw-text-white tw-p-2 tw-rounded tw-w-full" onClick={cancleAgent(data._id)}>Cancle</button>
																			</>
																		)}
																	</div>

																</div>

															</div >
														</div >
													</>
												))}
												<div
													className="modal"
													tabIndex="-1"
													style={{
														display: showModal ? "block" : "none",
														backgroundColor: "transparent",
														boxShadow: "none",
														position: "fixed",
														top: 65,
														left: 10,
														right: 0,
														bottom: 0,
													}}
												>
													<div
														className="modal-dialog "
														style={{
															maxWidth: "500px",
															maxHeight: "600px",
															width: "100%",
															backgroundColor: "#ffffff",
														}}
													>
														<div
															className="modal-content"
															style={{
																backgroundColor: "#ffffff",
																height: "550px",
																maxWidth: "500px",
																width: "100%",
															}}
														>
															<div className="modal-header">
																<h5 className="modal-title tw-text-xl tw-font-semibold">
																	Meeting Deatils
																</h5>
																<button
																	type="button"
																	className="btn-close"
																	onClick={() => setShowModal(false)}
																>
																	<CloseIcon className="tw-mt-[-5px] tw-mr-[20px]" />
																</button>
															</div>
															<div
																className="modal-body "
																style={{ textAlign: "left", padding: "20px" }}
															>
																<div>
																	<label
																		htmlFor=""
																		className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
																	>
																		Name{" "}
																	</label>
																	<h1 className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2">
																		{agentDataForModal.name}
																	</h1>
																</div>
																<div>
																	<label
																		htmlFor=""
																		className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
																	>
																		Email{" "}
																	</label>
																	<h1 className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2">
																		{agentDataForModal.email}
																	</h1>
																</div>
																<div className="tw-flex">
																	<div className="tw-mr-3">
																		<label
																			htmlFor=""
																			className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
																		>
																			Date{" "}
																		</label>
																		<input
																			type="date"
																			className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
																			onChange={(e) => {
																				setMeetingDate(e.target.value);
																			}}
																		/>
																	</div>
																	<div>
																		<label
																			htmlFor=""
																			className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
																		>
																			Time{" "}
																		</label>
																		<input
																			type="time"
																			className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
																			onChange={(e) => {
																				setMeetingTime(e.target.value);
																			}}
																		/>
																	</div>
																</div>
																<div>
																	<label
																		htmlFor=""
																		className="tw-text-[18px] tw-font-semibold tw-text-gray-500 tw-mr-3 "
																	>
																		Meeting Link{" "}
																	</label>
																	<input
																		type="text"
																		className="tw-w-full tw-border-2 tw-h-10 tw-p-3 tw-mb-4 tw-text-black tw-mt-2"
																		onChange={(e) => {
																			setMeetingLink(e.target.value);
																		}}
																	/>
																</div>
															</div>

															<div className="modal-footer">
																<button
																	type="button"
																	className="btn btn-primary "
																	style={{
																		backgroundColor: "black",
																		border: "none",
																	}}
																	onClick={() => setShowModal(false)}
																>
																	Close
																</button>
																<button
																	type="button"
																	className="btn btn-primary "
																	style={{
																		backgroundColor: "black",
																		border: "none",
																	}}
																	onClick={setMeeting(
																		agentDataForModal.name,
																		agentDataForModal.email
																	)}
																>
																	Send
																</button>
															</div>
														</div>
													</div>
												</div>
											</>


										</div>

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

										{/* </div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AdminAgentDetails;