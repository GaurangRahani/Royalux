import React, { useState, useEffect } from "react";
import "./UserForgotPassword.css";
import backgroundImage from "../../Assests/Image/home3.avif";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import PasswordIcon from "@mui/icons-material/Password";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { verifyEmailUrl, verifyOtpUrl } from "../Components/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [response, setResponse] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const [emailErr, setEmailErr] = useState('');

	useEffect(() => {
		const { email } = location.state || {};
		console.log(email);
		if (email) {
			setEmail(email);
		}
	}, [location.state]);

	const handleEmail = (event) => {
		console.log("clicked");

		if (event.key === 'Enter') {
			console.log("enter clicked");
			handleVerifyEmail(event);
		};
	}


	const handleVerifyEmail = async () => {
		try {
			const reqData = {
				email: email,
			};

			const responseData = await axios.post(verifyEmailUrl, reqData);

			if (responseData.status === 200) {
				setResponse('success', 'success..')
				toast.success(responseData.data.message);
			}
		} catch (error) {
			toast.error("Error: " + error.message);
		}
	};


	const verifyOtp = async (e) => {
		try {
			e.preventDefault();

			const reqdata = {
				email: email,
				otp: otp,
			};

			const responseData = await axios.post(verifyOtpUrl, reqdata);

			if (responseData.status === 200) {
				// toast.success('Email verified successfully!');
				setResponse("success: ", responseData.data);
				navigate("/UserRegister", { state: { email: email } });
				console.log('verify email: ', email);
				console.log(responseData.data.message);
			}

			else {
				// console.log("else", responseData);
				// toast.error(responseData);
				// console.log("error");

			}
		} catch (error) {
			setResponse("error :", error.response.data);
			toast.error(error.response.data.message);
			console.log("catch", error.response.data.message);


		}
	};

	return (
		<div>
			<ToastContainer position='top-right' />

			<div className="msg">{response && <div>{response.message}</div>}</div>

			<div style={{ position: "relative", marginTop: "-80px" }}>
				<img
					class="tw-w-full md:tw-h-[100vh] tw-h-[100vh] "
					src={backgroundImage}
					alt="background"
					srcset=""
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
				<div>
					<div
						style={{
							color: "white",
							width: "100%",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							textAlign: "center",
						}}
					>
						<div class="tw-grid tw-place-content-center">
							<section className="tw-grid tw-content-center tw-bg-white tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">
								<div className="md:tw-p-10">
									<h3 class="tw-text-3xl tw-font-bold tw-text-black tw-mb-10">
										Register
									</h3>

									<form>
										<div>
											<div className="tw-flex">
												<label
													className="tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4"
													htmlFor="email"
												>
													<PersonIcon />
												</label>
												<input
													id="email"
													type="email"
													name="email"
													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-4 tw-text-black"
													placeholder="Email"
													value={email}
													readOnly
													onKeyDown={handleEmail}
													onChange={(e) => {
														console.log(e);
														setEmail(e.target.value);
													}}
												/>
												<p style={{ color: 'red', marginLeft: '45px', marginBottom: '20px' }}>{emailErr}</p>

											</div>
											<button
												type="button"
												class="tw-bg-black tw-mb-4 tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
												onClick={handleVerifyEmail}
											>
												Get OTP
											</button>
										</div>

										<div>
											<div className="tw-grid tw-place-content-center">
												<OtpInput
													value={otp}
													// onKeyDown={handleOtp}
													onChange={setOtp}
													numInputs={4}
													renderSeparator={
														<span class="tw-text-black tw-mb-6 tw-p-2 tw-text-2xl">
															-
														</span>
													}

													renderInput={(props) => (
														<input
															{...props}
															class="tw-border-2 tw-h-[48px] tw-mb-4 tw-w-[48px] tw-text-black"
														/>
													)}
												/>
											</div>
											<button
												type="button"
												class="tw-bg-black tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
												onClick={verifyOtp}
											>
												Register
											</button>
										</div>
									</form>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;

// import React, { useState, useEffect } from "react";
// import "./UserForgotPassword.css";
// import backgroundImage from "../../Assests/Image/home3.avif";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { Link, useNavigate } from "react-router-dom";
// import "animate.css";
// import PasswordIcon from "@mui/icons-material/Password";
// import OtpInput from "react-otp-input";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { verifyEmailUrl, verifyOtpUrl } from "../Components/Api";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VerifyEmail = () => {
// 	const [otp, setOtp] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [response, setResponse] = useState(null);
// 	const location = useLocation();
// 	const navigate = useNavigate();
// 	const [emailErr, setEmailErr] = useState('');

// 	useEffect(() => {
// 		const { email } = location.state || {};
// 		console.log(email);
// 		if (email) {
// 			setEmail(email);
// 		}
// 	}, [location.state]);

// 	const handleEmail = (event) => {
// 		console.log("clicked");

// 		if (event.key === 'Enter') {
// 			console.log("enter clicked");
// 			handleVerifyEmail(event);
// 		};
// 	}


// 	const handleVerifyEmail = async () => {
// 		try {
// 			const reqData = {
// 				email: email,
// 			};

// 			const responseData = await axios.post(verifyEmailUrl, reqData);

// 			if (responseData.status === 200) {
// 				setResponse('success', 'success..')
// 			}
// 		} catch (error) {

// 		}
// 	};


// 	const verifyOtp = async (e) => {
// 		try {
// 			e.preventDefault();

// 			const reqdata = {
// 				email: email,
// 				otp: otp,
// 			};

// 			const responseData = await axios.post(verifyOtpUrl, reqdata);

// 			if (responseData.status === 200) {
// 				// toast.success('Email verified successfully!');
// 				setResponse("success: ", responseData.data);
// 				navigate("/UserRegister", { state: { email: email } });
// 				console.log('verify email: ', email);
// 				console.log(responseData.data.message);
// 			}

// 			else {
// 				// console.log("else", responseData);
// 				// toast.error(responseData);
// 				// console.log("error");

// 			}
// 		} catch (error) {
// 			setResponse("error :", error.response.data);
// 			toast.error(error.response.data.message);
// 			console.log("catch", error.response.data.message);


// 		}
// 	};

// 	return (
// 		<div>
// 			<ToastContainer position='top-right' />

// 			<div className="msg">{response && <div>{response.message}</div>}</div>

// 			<div style={{ position: "relative", marginTop: "-80px" }}>
// 				<img
// 					class="tw-w-full md:tw-h-[800px] tw-h-[100vh] "
// 					src={backgroundImage}
// 					alt="background"
// 					srcset=""
// 				/>
// 				<div
// 					style={{
// 						position: "absolute",
// 						top: 0,
// 						left: 0,
// 						width: "100%",
// 						height: "100%",
// 						background: "rgba(0, 0, 0, 0.5)",
// 					}}
// 				></div>
// 				<div>
// 					<div
// 						style={{
// 							color: "white",
// 							width: "100%",
// 							position: "absolute",
// 							top: "50%",
// 							left: "50%",
// 							transform: "translate(-50%, -50%)",
// 							textAlign: "center",
// 						}}
// 					>
// 						<div class="tw-grid tw-place-content-center">
// 							<section className="tw-grid tw-content-center tw-bg-white tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">
// 								<div className="md:tw-p-10">
// 									<h3 class="tw-text-3xl tw-font-bold tw-text-black tw-mb-10">
// 										Register
// 									</h3>

// 									<form>
// 										<div>
// 											<div className="tw-flex">
// 												<label
// 													className="tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4"
// 													htmlFor="email"
// 												>
// 													<PersonIcon />
// 												</label>
// 												<input
// 													id="email"
// 													type="email"
// 													name="email"
// 													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-4 tw-text-black"
// 													placeholder="Email"
// 													value={email}
// 													readOnly
// 													onKeyDown={handleEmail}
// 													onChange={(e) => {
// 														console.log(e);
// 														setEmail(e.target.value);
// 													}}
// 												/>
// 												<p style={{ color: 'red', marginLeft: '45px', marginBottom: '20px' }}>{emailErr}</p>

// 											</div>
// 											<button
// 												type="button"
// 												class="tw-bg-black tw-mb-4 tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
// 												onClick={handleVerifyEmail}
// 											>
// 												Get OTP
// 											</button>
// 										</div>

// 										<div>
// 											<div className="tw-grid tw-place-content-center">
// 												<OtpInput
// 													value={otp}
// 													// onKeyDown={handleOtp}
// 													onChange={setOtp}
// 													numInputs={4}
// 													renderSeparator={
// 														<span class="tw-text-black tw-mb-6 tw-p-2 tw-text-2xl">
// 															-
// 														</span>
// 													}

// 													renderInput={(props) => (
// 														<input
// 															{...props}
// 															class="tw-border-2 tw-h-[48px] tw-mb-4 tw-w-[48px] tw-text-black"
// 														/>
// 													)}
// 												/>
// 											</div>
// 											<button
// 												type="button"
// 												class="tw-bg-black tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
// 												onClick={verifyOtp}
// 											>
// 												Register
// 											</button>
// 										</div>
// 									</form>
// 								</div>
// 							</section>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default VerifyEmail;