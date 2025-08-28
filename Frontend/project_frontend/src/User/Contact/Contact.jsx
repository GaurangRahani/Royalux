import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import './Swiper.css';
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import ContactImg from "../../Assests/Image/Contact/contact.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import { Footer } from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import ContactSlide from "./ContactSlide";
import { addUserQueryUrl, userProfileUrl } from "../Components/Api";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [userData, setUserData] = useState({ name: "", email: "" });

	const sendUserQuery = async () => {
		try {
			const token = localStorage.getItem("user");
			if (!token) {
				toast.error("Please log in to submit your query.");
				return;
			}

			const tokenArray = JSON.parse(token);
			const reqData = {
				name: userData.name,
				email: userData.email,
				subject: subject,
				message: message,
			};

			const responseData = await axios.post(addUserQueryUrl, reqData, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
					"Content-Type": "application/json",
				},
			});

			if (responseData.status === 200) {
				setSubject("");
				setMessage("");
				toast.success(responseData.data.message);
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		}
	};

	const getUserData = async () => {
		try {
			const token = localStorage.getItem("user");
			const tokenArray = JSON.parse(token);

			const response = await axios.get(userProfileUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});

			if (response.status === 200) {
				setUserData(response.data.userData);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	const navigate = useNavigate();
	return (
		<>
			<Nav />
			<ToastContainer position="top-right" />

			<div className="tw-relative tw-mb-10">
				<div className="" style={{ position: "relative" }}>
					<img
						className=" tw-bg-cover tw-w-full  md:tw-h-full"
						src={ContactImg}
						alt=""
					/>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							background: "rgba(0, 0, 0, 0.5)",
						}}
					></div>
				</div>
				<div className=" tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-cover  tw-text-center tw-text-white tw-grid tw-place-content-center ">
					<h2 className=" tw-text-3xl tw-mt-[10px] tw-font-bold ">Contact</h2>
					<h5 class=" tw-justify-center tw-flex tw-text-2xl tw-font-semibold"><h4 className='tw-cursor-pointer' onClick={() => navigate('/')}>Home </h4>
						<span class=" tw-ml-[5px] tw-mr-[2px]">  {' >>'} </span>
						<h4 className=' tw-cursor-pointer' onClick={() => navigate('/contact')}>Contact</h4>
					</h5>
				</div>
			</div>

			<div className=" tw-flex tw-place-content-center ">
				<div className="faq-contact tw-m-5 shadow tw-p-10 tw-bg-white tw-rounded-md md:tw-w-[700px] md:tw-top-18 ">
					<h3 className=" tw-text-2xl tw-font-bold tw-text-center">
						Ask Your Question
					</h3>
					<form
						id="contactForm"
						onSubmit={(e) => {
							e.preventDefault();
							sendUserQuery();
						}}
					>
						<div className="row tw-mt-4">
							<div className="col-lg-6 col-md-12">
								<div className="form-group">
									<input
										type="text"
										name="name"
										id="name"
										className="form-control"
										required
										placeholder="Name"
										value={userData.name}
										onChange={(e) =>
											setUserData({ ...userData, name: e.target.value })
										}
									/>

									<br />
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-6 col-md-12">
								<div className="form-group">
									<input
										type="email"
										name="email"
										id="email"
										className="form-control"
										required
										placeholder="Email"
										value={userData.email}
										onChange={(e) =>
											setUserData({ ...userData, email: e.target.value })
										}
									/>
									<br />
									<div className="help-block with-errors" />
								</div>
							</div>

							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<input
										type="text"
										required
										className="form-control"
										placeholder="Subject"
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
									/>
									<br />
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-12 col-md-12 tw-mt-4 tw-mb-4">
								<div className="form-group">
									<textarea
										name="message"
										className="form-control"
										id="message"
										cols={30}
										rows={6}
										required
										placeholder="Your Message"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									<div className="help-block with-errors" />
								</div>
							</div>

							<div className="col-lg-12 col-md-12">
								<button
									type="submit"
									className="  tw-border-2 tw-p-2 tw-bg-black tw-text-white tw-font-semibold"
								>
									Send Message
								</button>
								<div id="msgSubmit" className="h3 tw-text-center tw-hidden" />
								<div className="clearfix" />
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Contact;