import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { baseUrl } from './BaseUrl/BaseUrl';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

const demo = () => {
	let config = {
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		}
	}

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);


	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
		aggree: false,
	});
	console.log('formData', formData)

	function onChangeHandler(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	console.log(formData);

	// async function onClickHandler(e) {
	//   let email_pattern =
	//     /^[A-Za-z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
	//   // let password_pattern =
	//   //   /^(?=.[A-Z])(?=.[1@#$&])(?=.[0-9])(?=.*[a-z]).{8}$/;
	//   let number_pattern = /^\d{10}$/;

	//   if (formData.name === "") {
	//     toast.error("please enter name !", { position: "top-center" });
	//   }
	//   //email
	//   else if (email_pattern.test(formData.email) === false) {
	//     toast.error("please enter valid email", { position: "top-center" });
	//   }
	//   //Mobile Number
	//   else if (
	//     formData.phone === "" ||
	//     number_pattern.test(formData.phone) === false
	//   ) {
	//     toast.error("mobile number must have 10 digit.", {
	//       position: "top-center",
	//     });

	//   } else {
	//     console.log("called btn");
	//     const configOptions = {
	//       method: "POST",
	//       body: JSON.stringify(formData),
	//       headers: {
	//         "Content-Type": "application/json",
	//       },
	//     };
	//     const response = await fetch(
	//       "http://localhost:8000/contact",
	//       configOptions
	//     );
	//     const result = await response.json();
	//     if ((result.status = 1)) {
	//       toast.success("Register Successfully !");

	//     }
	//   }
	//   alert('form submitted');
	//   e.preventDefault();
	//   navigate("/")
	//   setFormData('');

	// }


	const onClickHandler = async () => {
		if (formData?.aggree) {
			if (formData?.name && formData?.email && formData?.subject && formData?.phone && formData?.message) {
				if (formData?.phone?.toString().length !== 10) {
					toast.error("please enter a valid phone number")
				} else {

					let body = {
						name: formData?.name,
						email: formData?.email,
						subject: formData?.subject,
						phone: formData?.phone,
						message: formData?.message,
					}
					await axios.post(baseUrl + "contact/addContact", body, config).then((res) => {
						console.log('res', res)
						setFormData({
							name: "",
							email: "",
							phone: "",
							subject: "",
							message: "",
							aggree: false,
						})
						toast.success(res?.data?.message)
						setErrMsg(false)
						// navigate("/allproduct")
					}).catch((err) => {
						console.log('err', err)
						toast.error(err?.response?.data.message)
					})
				}
			} else {
				setErrMsg(true)
			}
		} else {
			toast.error("Please agree to the tearms and privacy!")
		}
	}

	return (
		<div>

			<>



				{/* Start Page Title Area */}
				<div className="page-title-area bg5 jarallax" data-jarallax='{"speed": 0.2}'>
					<div className="container">
						<div className="page-title-content">
							<h1>Contact</h1>
							<ul>
								<li>
									<a href="/">Home</a>
								</li>
								<li>Contact</li>
							</ul>
						</div>
					</div>
				</div>
				{/* End Page Title Area */}


				{/* Start Instructor Area */}
				<section className="instructor-area ptb-80">
					<div className="container">
						<div className="section-title">
							<span>Team</span>
							<h2>Meet Our Team</h2>

						</div>
						<div className="row">
							<Swiper
								slidesPerView={3}
								spaceBetween={30}
								pagination={{
									clickable: true,
								}}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								modules={[Pagination, Autoplay]}
								className="mySwiper"
							>
								<SwiperSlide><div className="col-lg-12 col-md-12">
									<div className="single-instructor">
										<img src="assets/img/abhi.jpg" alt="instructor" />
										<div className="instructor-content">
											<h3> Abhi Desai</h3>
											<span>Founder</span>
										</div>
										<div className="social">
											<ul>
												{/* <li>
                          <Link to="#" target="_blank">
                            <i className="icofont-facebook" />
                          </Link>
                        </li> */}
												<li>
													<Link to="https://twitter.com/abhidesa1?t=3sGZqSmnU0guojR0PEtBqQ&s=09" target="_blank">
														<i className="icofont-twitter" />
													</Link>
												</li>
												<li>
													<Link to="https://instagram.com/mr.abhi_desai?igshid=NmE0MzVhZDY=" target="_blank">
														<i className="icofont-instagram" />
													</Link>
												</li>
												<li>
													<Link to="https://www.linkedin.com/in/abhi-desai-60b8aa214" target="_blank">
														<i className="icofont-linkedin" />
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div></SwiperSlide>
								<SwiperSlide><div className="col-lg-12 col-md-12">
									<div className="single-instructor">
										<img src="assets/img/jetal.jpg" alt="instructor" />
										<div className="instructor-content">
											<h3>Jetal Savani</h3>
											<span>Founder</span>
										</div>
										<div className="social">
											<ul>
												{/* <li>
                          <Link to="#" target="_blank">
                            <i className="icofont-facebook" />
                          </Link>
                        </li> */}
												<li>
													<Link to="https://twitter.com/SavaniJetal?t=ezrCzVzYWAjSwqnD7Vey5Q&s=09" target="_blank">
														<i className="icofont-twitter" />
													</Link>
												</li>
												<li>
													<Link to="https://www.instagram.com/jetal_savani_/" target="_blank">
														<i className="icofont-instagram" />
													</Link>
												</li>
												<li>
													<Link to="https://www.linkedin.com/in/jetal-savani-1b5391226" target="_blank">
														<i className="icofont-linkedin" />
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div></SwiperSlide>
								<SwiperSlide><div className="col-lg-12 col-md-12">
									<div className="single-instructor">
										<img src="assets/img/ayush2.jpg" alt="instructor" style={{ height: "560px" }} />
										<div className="instructor-content">
											<h3>Ayush Donda</h3>
											<span>Founder</span>
										</div>
										<div className="social">
											<ul>
												{/* <li>
                          <Link to="#" target="_blank">
                            <i className="icofont-facebook" />
                          </Link>
                        </li> */}
												<li>
													<Link to="https://twitter.com/DondaAyush?t=lSgO_gXT1oWd0HQbO-IXww&s=09" target="_blank">
														<i className="icofont-twitter" />
													</Link>
												</li>
												<li>
													<Link to="https://instagram.com/ll._ayush.donda_.ll?igshid=NTE5MzUyOTU=" target="_blank">
														<i className="icofont-instagram" />
													</Link>
												</li>
												<li>
													<Link to="https://www.linkedin.com/in/ayush-donda-190480248" target="_blank">
														<i className="icofont-linkedin" />
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div></SwiperSlide>
								<SwiperSlide><div className="col-lg-12 col-md-12">
									<div className="single-instructor">
										<img src="assets/img/yash1.heic" alt="instructor" />
										<div className="instructor-content">
											<h3>Yash Kheni</h3>
											<span>Founder</span>
										</div>
										<div className="social">
											<ul>
												{/* <li>
                          <Link to="#" target="_blank">
                            <i className="icofont-facebook" />
                          </Link>
                        </li> */}
												<li>
													<Link to="https://twitter.com/Yash_Kheni_777?t=JdOa0ASbDmzFVnLH1wKBow&s=09" target="_blank">
														<i className="icofont-twitter" />
													</Link>
												</li>
												<li>
													<Link to="https://instagram.com/_yash_kheni?igshid=NTE5MzUyOTU=" target="_blank">
														<i className="icofont-instagram" />
													</Link>
												</li>
												<li>
													<Link to="https://www.linkedin.com/in/yash-kheni-20591124b" target="_blank">
														<i className="icofont-linkedin" />
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div></SwiperSlide>
							</Swiper>
						</div>
					</div>
				</section>
				{/* End Instructor Area */}

				<div className="faq-contact">
					<h3>Ask Your Question</h3>
					<form id="contactForm">
						<div className="row">
							<div className="col-lg-6 col-md-12">
								<div className="form-group">
									<input
										type="text"
										name="name"
										id="name"
										className="form-control"
										required=""
										data-error="Please enter your name"
										placeholder="Name"
										value={formData?.name}
										onChange={(e) => onChangeHandler(e)}
									/>
									{errMsg && !formData?.name && <div className="text-danger">Name is required!</div>}
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
										required=""
										data-error="Please enter your email"
										placeholder="Email"
										value={formData?.email}
										onChange={(e) => onChangeHandler(e)}
									/>
									{errMsg && !formData?.email && <div className="text-danger">Email is required!</div>}
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<input
										type="number"
										name="phone"
										id="phone_number"
										required=""
										value={formData?.phone}
										data-error="Please enter your number"
										className="form-control"
										placeholder="Phone"
										onChange={(e) => onChangeHandler(e)}
									/>
									{errMsg && !formData?.phone && <div className="text-danger">Phone is required!</div>}
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<select
										name="subject"
										id="phone_number"
										required=""
										value={formData?.subject}
										data-error="Please enter your number"
										className="form-control"
										placeholder="Phone"
										onChange={(e) => onChangeHandler(e)}
									>
										<option value="" disabled>Subject</option>
										<option value="Issue" >Issue</option>
										<option value="Service" >Service</option>
										<option value="Other" >Other</option>
									</select>
									{errMsg && !formData?.subject && <div className="text-danger">subject is required!</div>}
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<textarea
										name="message"
										className="form-control"
										id="message"
										value={formData?.message}
										cols={30}
										rows={6}
										required=""
										data-error="Write your message"
										placeholder="Your Message"
										defaultValue={""}
										onChange={(e) => onChangeHandler(e)}
									/>
									{errMsg && !formData?.message && <div className="text-danger">Messsage is required!</div>}
									<div className="help-block with-errors" />
								</div>
							</div>
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<div className="form-check">
										<input
											name="gridCheck"
											defaultValue="I agree to the terms and privacy policy."
											className="form-check-input"
											type="checkbox"
											id="gridCheck"
											checked={formData?.aggree}
											required=""
											onChange={(e) => setFormData({ ...formData, ['aggree']: e.target.checked })}
										/>
										<label className="form-check-label" htmlFor="gridCheck">
											I agree to the <a href="#">terms</a> and{" "}
											<a href="#">privacy policy</a>
										</label>
										<div className="help-block with-errors gridCheck-error" />
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-md-12">
								<button type="button"
									onClick={(e) => onClickHandler(e)}
									className="btn btn-primary">
									Send Message
								</button>
								<div id="msgSubmit" className="h3 text-center hidden" />
								<div className="clearfix" />
							</div>
						</div>
					</form>
				</div>
			</>
		</div>
	)
}

export default demo;