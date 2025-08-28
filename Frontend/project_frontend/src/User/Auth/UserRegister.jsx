import React, { useState, useEffect } from "react";
import "./UserRegister.css";
import img2 from "../../Assests/Image/home6.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { signUpUrl } from "../Components/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { googleLoginUrl } from "../Components/Api";

const UserRegister = () => {
	// const [isHovered, setHovered] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [response, setResponse] = useState("");
	const [nameErr, setNameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [mobileErr, setMobileErr] = useState("");
	const [isValidPass, setisValidPass] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const { email } = location.state || {};
		console.log(email);
		if (email) {
			setEmail(email);
		}
	}, [location.state]);

	const validateName = (name) => {
		const allowAlphabet = /^[a-zA-Z]+$/;

		if (name.length <= 2 || !allowAlphabet.test(name)) {
			setNameErr("Name must be contain mote than two Alphabets..");
			return false;
		}
		setNameErr("");
		return true;
	};

	const validatePassword = (password) => {
		if (!password || password.trim() === "") {
			setPasswordErr("Enter Password");
		} else if (!/[A-Z]/.test(password)) {
			setPasswordErr("At least one uppercase letter");
		} else if (!/[a-z]/.test(password)) {
			setPasswordErr("At least one lowercase letter");
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			setPasswordErr("At least one special character");
		} else if (!/\d/.test(password)) {
			setPasswordErr("At least one digit");
		} else if (password.length < 8) {
			setPasswordErr("Minimum 8 characters");
		} else {
			setPasswordErr("");
			return true;
			// setisValidPass(true);
		}
	};

	const validateMobileNumber = (mobileNumber) => {
		const mobileRegex = /^[0-9]{10}$/;
		if (!mobileRegex.test(mobileNumber)) {
			setMobileErr("Mobile number does not match the required format");
			return false; // Mobile number does not match the required format
		}
		setMobileErr("");
		return true; // Mobile number is valid
	};

	const handleKeyDown = (event) => {
		console.log("clicked");

		if (event.key === "Enter") {
			console.log("enter clicked");
			UserRegister(event);
		}
	};

	const UserRegister = async (e) => {
		try {
			e.preventDefault();

			if (validatePassword(password) && validateName(name)) {
				const reqdata = {
					email: email,
					name: name,
					password: password,
					mobileNo: mobileNo,
				};
				const responseData = await axios.post(signUpUrl, reqdata);

				if (responseData.status === 201) {
					const data = [];
					const { token } = responseData.data;
					data[0] = token;
					data[1] = "USER";
					localStorage.setItem("user", JSON.stringify(data));
					// localStorage.setItem("token", token);
					setResponse("success", "success ...");
					navigate("/");
					// toast.success(responseData.data.message);
				} else {
					// console.log(responseData.data.message);
					// toast.error(responseData.data.message);
				}
			}
		} catch (error) {
			setResponse("error", "error...");
			toast.error(error.response.data.message);

			// setResponse(alert(error.response.message))
		}
	};

	// const handleOtp = () => {
	// 	navigate("/VerifyEmail", { state: email });
	// };

	const handleSubmit = (e) => {
		console.log("submitted");
		e.preventDefault();
		setName("");
		setEmail("");
		setPassword("");
		setCpassword("");
		setMobileNo("");
	};



	return (
		<>
			<ToastContainer position='top-right' />
			<div className="msg">{response && <div> {response}</div>}</div>
			<div className="relative">
				<div style={{ position: "relative", marginTop: "-80px" }}>
					<img className="h-[100vh] bg-cover w-full" src={img2} alt="" />
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
				<div className="absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-cover  tw-grid tw-items-center tw-justify-center">

					<div
						className="tw-shadow-sm tw-mb-16 tw-mt-10 tw-pt-10 tw-pb-11  tw-rounded-md md:tw-w-[700px] "
						style={{ backgroundColor: "white" }}
					>
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="user-actions">
									<i className="icofont-login" />
									<span></span>
								</div>
							</div>
						</div>
						<div className="row tw-justify-center">
							<div className="col-lg-10 col-md-10 col-10">
								<form onSubmit={handleSubmit}>
									<div className="billing-details">
										<h3 className="title tw-mb-7 tw-text-2xl tw-font-semibold tw-text-center">
											Register Details
										</h3>
										<div className="row">
											<div className="col-md-12">
												<div className="tw-flex">
													<label
														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1"
														htmlFor="email"
													>
														<EmailIcon />
													</label>
													<input
														id="email"
														type="email"
														name="email"
														className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
														placeholder="Email"
														value={email}
														onChange={(e) => {
															setEmail(e.target.value);
														}}
													/>
												</div>
											</div>

											<div className="col-md-12">
												<div className="tw-flex tw-mb-4 tw-mt-4">
													<label
														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1"
														htmlFor="name"
													>
														<PersonIcon />
													</label>
													<input
														id="name"
														type="name"
														name="name"
														// pattern="/^[A-Za-z]+$/"
														className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
														placeholder="Name"
														required
														value={name}
														onChange={(e) => {
															setName(e.target.value);
															validateName(e.target.value);
														}}
													/>
												</div>
												<p
													style={{
														color: "red",
														marginLeft: "45px",
														marginBottom: "20px",
													}}
												>
													{nameErr}
												</p>
											</div>

											<div className="col-md-12  mb-4">
												<div className="tw-flex ">
													<label
														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 "
														htmlFor="password"
													>
														<LockIcon />
													</label>
													<input
														id="password"
														type="password"
														name="password"
														class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
														placeholder="Password"
														required
														value={password}
														onChange={(e) => {
															setPassword(e.target.value);
															validatePassword(e.target.value);
														}}
													/>
												</div>
												<p style={{ color: "red", marginLeft: "45px" }}>
													{passwordErr}
												</p>
											</div>

											<div className="col-md-12  mb-4">
												<div className="tw-flex">
													<label
														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 "
														htmlFor="phn"
													>
														<PhoneIcon />
													</label>
													<input
														id="phn"
														type="number"
														name="phone"
														class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
														placeholder="Phone"
														required
														value={mobileNo}
														onKeyDown={handleKeyDown}
														onChange={(e) => {
															setMobileNo(e.target.value);
															validateMobileNumber(e.target.value);
														}}
													/>
												</div>
												<p style={{ color: "red", marginLeft: "45px" }}>
													{mobileErr}
												</p>
											</div>
											<div className="" style={{ maxWidth: "100%" }}>
												{/* <GoogleOAuthProvider>
													<GoogleLogin />
												</GoogleOAuthProvider> */}

												{/* <GoogleOAuthProvider clientId="295805594505-sq8l6g2m1dlgnlepvim7h03gmo48gco3.apps.googleusercontent.com" >
													<GoogleLogin

														style={{
															backgroundColor: 'black',
															color: 'white',
															width: '700px',
															padding: '10px',
															borderRadius: '5px',
															cursor: 'pointer',
														}}

														onSuccess={async (credentialResponse) => {
															try {
																console.log(credentialResponse);
																const data = jwtDecode(credentialResponse.credential)
																console.log(data)

																const token = credentialResponse.credential;
																const response = await axios.post(googleLoginUrl, {
																	"token": token,
																});

																if (response.status === 200) {

																	const { token } = response.data;
																	localStorage.setItem("token", token);
																	navigate("/");
																}
																console.log('Google Login Response:', response.data);
															} catch (error) {
																console.error('Error:', error.message);
															}
														}}
														onError={() => {
															console.log('Login Failed');
														}}

													/>
												</GoogleOAuthProvider> */}
											</div>
											<div className="col-md-12 ">
												<div className="relative group tw-mt-6">
													{/* <button
                                                        type="button"
                                                        className={w-full bg-black text-white h-11 rounded-md button ${isHovered ? 'cursor-pointer' : ''}}
                                                        onMouseEnter={() => setHovered(true)}
                                                        onMouseLeave={() => setHovered(false)}
                                                    >
                                                        Submit

                                                        {isHovered && (
                                                            <span className="absolute inset-0 bg-green-500 opacity-50 transition-all ease-in-out duration-100 group-hover:opacity-100 z-[-1]"></span>
                                                        )}
                                                    </button> */}
												</div>
												{/* <button type="button" class="tw-bg-black hover:bg-green-400 hover:text-black  tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
													onClick={UserRegister} >
													Register
												</button> */}
												<button
													disabled={!name || !email || !password || !mobileNo}
													type="submit"
													className={`tw-w-full tw-text-center tw-text-lg tw-font-semibold tw-h-11
    												${!name || !email || !password || !mobileNo
															? "tw-bg-gray-300 tw-cursor-not-allowed tw-text-gray-600"
															: "tw-bg-black hover:bg-green-400 tw-text-white"
														}`}
													onClick={UserRegister}
												>
													Register
												</button>
												<br /> <br />
												<div className="col-lg-12 tw-bg-white tw-h-12 tw-text-green-700  tw-font-semibold tw-text-lg   tw-p-2">
													<ReadMoreIcon /> Returning Customer?
													<a
														href="/UserLogin"
														className=" tw-text-sm tw-text-black  tw-text-center"
													>
														Click here to login
													</a>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


export default UserRegister;

// import React, { useState, useEffect } from "react";
// import "./UserRegister.css";
// import img2 from "../../Assests/Image/home6.jpg";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import ReadMoreIcon from "@mui/icons-material/ReadMore";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import PhoneIcon from "@mui/icons-material/Phone";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { signUpUrl } from "../Components/Api";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { jwtDecode } from 'jwt-decode';
// import { googleLoginUrl } from '../Components/Api';

// const UserRegister = () => {
// 	// const [isHovered, setHovered] = useState(false);

// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [cpassword, setCpassword] = useState("");
// 	const [mobileNo, setMobileNo] = useState("");
// 	const [response, setResponse] = useState("");
// 	const [nameErr, setNameErr] = useState('');
// 	const [passwordErr, setPasswordErr] = useState('');
// 	const [emailErr, setEmailErr] = useState('');
// 	const navigate = useNavigate();
// 	const location = useLocation();

// 	useEffect(() => {
// 		const { email } = location.state || {};
// 		console.log(email);
// 		if (email) {
// 			setEmail(email);
// 		}
// 	}, [location.state]);

// 	const validateName = (name) => {
// 		const allowAlphabet = /^[a-zA-Z]+$/;

// 		if (name.length <= 2 || !allowAlphabet.test(name)) {
// 			setNameErr('Name must be contain mote than two Alphabets..');
// 			return false;
// 		}
// 		setNameErr('');
// 		return true;
// 	}

// 	const validatePassword = (pass) => {
// 		if (pass.length < 8) {
// 			setPasswordErr('Password must be between 8 characters');
// 			return false;
// 		}
// 		setPasswordErr('');
// 		return true;
// 	}

// 	const handleKeyDown = (event) => {
// 		console.log("clicked");

// 		if (event.key === 'Enter') {
// 			console.log("enter clicked");
// 			UserRegister(event);
// 		};
// 	}

// 	const UserRegister = async (e) => {
// 		try {
// 			e.preventDefault();

// 			if (validatePassword(password) && validateName(name)) {

// 				const reqdata = {
// 					email: email,
// 					name: name,
// 					password: password,
// 					mobileNo: mobileNo,
// 				};

// 				console.log(email);

// 				const responseData = await axios.post(signUpUrl, reqdata);

// 				if (responseData.status === 201) {

// 					const { token } = responseData.data;
// 					console.log('token: ', token);
// 					localStorage.setItem("token", token);
// 					console.log('responseData: ', responseData);
// 					setResponse("success", "success ...");
// 					navigate('/');
// 					console.log("register email: ", email);
// 					// toast.success(responseData.data.message);

// 				}
// 				else {
// 					// console.log(responseData.data.message);
// 					// toast.error(responseData.data.message);
// 				}
// 			}
// 		} catch (error) {
// 			setResponse("error", "error...");
// 			toast.error(error.response.data.message);

// 			// setResponse(alert(error.response.message))
// 		}
// 	};

// 	// const handleOtp = () => {
// 	// 	navigate("/VerifyEmail", { state: email });
// 	// };

// 	const handleSubmit = (e) => {
// 		console.log("submitted");
// 		e.preventDefault();
// 		setName("");
// 		setEmail("");
// 		setPassword("");
// 		setCpassword("");
// 		setMobileNo("");
// 	};

// 	return (
// 		<>
// 			<ToastContainer position='top-right' />
// 			<div className="msg">{response && <div> {response}</div>}</div>
// 			<div className="relative">
// 				<div style={{ position: "relative", marginTop: "-80px" }}>
// 					<img className="h-[130vh] bg-cover w-full" src={img2} alt="" />
// 					<div
// 						style={{
// 							position: "absolute",
// 							top: 0,
// 							left: 0,
// 							width: "100%",
// 							height: "100%",
// 							background: "rgba(0, 0, 0, 0.5)",
// 						}}
// 					></div>
// 				</div>
// 				<div className="absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-cover  tw-grid tw-items-center tw-justify-center">
// 					<h5 className=" tw-text-center tw-text-white tw-text-2xl tw-font-semibold">
// 						<Link to="/">{`Home >> Register`}</Link>
// 					</h5>
// 					<div
// 						className="tw-shadow-sm tw-mb-16 tw-m-3 tw-pt-10 tw-pb-11  tw-rounded-md md:tw-w-[700px] "
// 						style={{ backgroundColor: "white" }}
// 					>
// 						<div className="row">
// 							<div className="col-lg-12 col-md-12">
// 								<div className="user-actions">
// 									<i className="icofont-login" />
// 									<span></span>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="row tw-justify-center">
// 							<div className="col-lg-10 col-md-10 col-10">
// 								<form onSubmit={handleSubmit}>
// 									<div className="billing-details">
// 										<h3 className="title tw-mb-7 tw-text-2xl tw-font-semibold tw-text-center">
// 											Register Details
// 										</h3>
// 										<div className="row">
// 											<div className="col-md-12">
// 												<div className="tw-flex">
// 													<label
// 														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1"
// 														htmlFor="email"
// 													>
// 														<EmailIcon />
// 													</label>
// 													<input
// 														id="email"
// 														type="email"
// 														name="email"
// 														class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
// 														placeholder="Email"
// 														value={email}
// 														readOnly
// 														onChange={(e) => {
// 															setEmail(e.target.value);
// 														}}
// 													/>
// 												</div>
// 											</div>

// 											<div className="col-md-12">
// 												<div className="tw-flex tw-mb-4 tw-mt-4">
// 													<label
// 														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1"
// 														htmlFor="name"
// 													>
// 														<PersonIcon />
// 													</label>
// 													<input
// 														id="name"
// 														type="name"
// 														name="name"
// 														// pattern="/^[A-Za-z]+$/"
// 														className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
// 														placeholder="Name"
// 														required
// 														value={name}
// 														onChange={(e) => {
// 															setName(e.target.value)
// 															validateName(e.target.value)
// 														}}
// 													/>
// 												</div>
// 												<p style={{ color: 'red', marginLeft: '45px', marginBottom: '20px' }}>{nameErr}</p>
// 											</div>

// 											<div className="col-md-12  mb-4">
// 												<div className="tw-flex ">
// 													<label
// 														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 "
// 														htmlFor="password"
// 													>
// 														<LockIcon />
// 													</label>
// 													<input
// 														id="password"
// 														type="password"
// 														name="password"
// 														class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
// 														placeholder="Password"
// 														required
// 														value={password}
// 														onChange={(e) => {
// 															setPassword(e.target.value)
// 															validatePassword(e.target.value);
// 														}
// 														}
// 													/>
// 												</div>
// 												<p style={{ color: 'red', marginLeft: '45px' }}>{passwordErr}</p>

// 											</div>

// 											<div className="col-md-12  mb-4">
// 												<div className="tw-flex">
// 													<label
// 														className="tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 "
// 														htmlFor="phn"
// 													>
// 														<PhoneIcon />
// 													</label>
// 													<input
// 														id="phn"
// 														type="number"
// 														name="phone"
// 														class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 "
// 														placeholder="Phone"
// 														required
// 														value={mobileNo}
// 														onKeyDown={handleKeyDown}

// 														onChange={(e) => setMobileNo(e.target.value)}
// 													/>
// 												</div>
// 											</div>
// 											<div className="" style={{ maxWidth: '100%' }}>
// 												{/* <GoogleOAuthProvider>
// 													<GoogleLogin />
// 												</GoogleOAuthProvider> */}

// 												<GoogleOAuthProvider clientId="295805594505-sq8l6g2m1dlgnlepvim7h03gmo48gco3.apps.googleusercontent.com" >
// 													<GoogleLogin

// 														style={{
// 															backgroundColor: 'black',
// 															color: 'white',
// 															width: '700px',
// 															padding: '10px',
// 															borderRadius: '5px',
// 															cursor: 'pointer',
// 														}}

// 														onSuccess={async (credentialResponse) => {
// 															try {
// 																console.log(credentialResponse);
// 																const data = jwtDecode(credentialResponse.credential)
// 																console.log(data)

// 																const token = credentialResponse.credential;
// 																const response = await axios.post(googleLoginUrl, {
// 																	"token": token,
// 																});

// 																if (response.status === 200) {

// 																	const { token } = response.data;
// 																	localStorage.setItem("token", token);
// 																	navigate("/");
// 																}
// 																console.log('Google Login Response:', response.data);
// 															} catch (error) {
// 																console.error('Error:', error.message);
// 															}
// 														}}
// 														onError={() => {
// 															console.log('Login Failed');
// 														}}

// 													/>
// 												</GoogleOAuthProvider>
// 											</div>
// 											<div className="col-md-12 ">
// 												<div className="relative group tw-mt-6">
// 													{/* <button
//                                                         type="button"
//                                                         className={w-full bg-black text-white h-11 rounded-md button ${isHovered ? 'cursor-pointer' : ''}}
//                                                         onMouseEnter={() => setHovered(true)}
//                                                         onMouseLeave={() => setHovered(false)}
//                                                     >
//                                                         Submit

//                                                         {isHovered && (
//                                                             <span className="absolute inset-0 bg-green-500 opacity-50 transition-all ease-in-out duration-100 group-hover:opacity-100 z-[-1]"></span>
//                                                         )}
//                                                     </button> */}
// 												</div>
// 												{/* <button type="button" class="tw-bg-black hover:bg-green-400 hover:text-black  tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
// 													onClick={UserRegister} >
// 													Register
// 												</button> */}
// 												<button
// 													disabled={
// 														!name || !email || !password || !mobileNo
// 													}
// 													type="submit"
// 													className={`tw-w-full tw-text-center tw-text-lg tw-font-semibold tw-h-11
//     												${!name ||
// 															!email ||
// 															!password ||
// 															!mobileNo
// 															? "tw-bg-gray-300 tw-cursor-not-allowed tw-text-gray-600"
// 															: "tw-bg-black hover:bg-green-400 tw-text-white"
// 														}`}
// 													onClick={UserRegister}
// 												>
// 													Register
// 												</button>
// 												<br /> <br />
// 												<div className="col-lg-12 tw-bg-white tw-h-12 tw-text-green-700  tw-font-semibold tw-text-lg   tw-p-2">
// 													<ReadMoreIcon /> Returning Customer?
// 													<a
// 														href="/UserLogin"
// 														className=" tw-text-sm tw-text-black  tw-text-center"
// 													>
// 														Click here to login
// 													</a>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default UserRegister;