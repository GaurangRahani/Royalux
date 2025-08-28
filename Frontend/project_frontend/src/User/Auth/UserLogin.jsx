import React, { useState } from "react";
// import "./UserLogin.css";
import backgroundImage from "../../Assests/Image/home7.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { signInUrl, googleLoginUrl } from "../Components/Api";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { auth, provider } from "./config";
// import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState("");
	const [verificationResult, setVerificationResult] = useState("");
	const [value, setValue] = useState("");

	const navigate = useNavigate();

	const userLogin = async (e) => {
		try {
			e.preventDefault();
			const reqdata = {
				email: email,
				password: password,
			};
			const responseData = await axios.post(signInUrl, reqdata);
			console.log('responseData: ', responseData);

			console.log("login data :", responseData.data.role);
			if (responseData.status === 200) {
				if (responseData.data.data.role === "USER") {
					const data = [];
					const { token } = responseData.data;
					data[0] = token;
					data[1] = "USER";
					localStorage.setItem("user", JSON.stringify(data));
					navigate("/", { state: email });
				} else if (responseData.data.data.role === "ADMIN") {
					const data = [];
					const { token } = responseData.data;
					data[0] = token;
					data[1] = "ADMIN";
					console.log(data);
					console.log(responseData.data.data);

					localStorage.setItem("admin", JSON.stringify(data));
					navigate("/admin/Dashboard", { state: email });
				}
				else {
					const data = [];
					const { token } = responseData.data;
					data[0] = token;
					data[1] = "AGENT";
					localStorage.setItem("agent", JSON.stringify(data));
					navigate("/Agent/Property", { state: email });
				}
			}
			// else {
			// 	console.log(responseData.data.user.message);
			// 	toast.error(responseData.data.user.message);

			// }
		} catch (error) {
			setResponse("error", "error ...");
			console.log("error");
			toast.error(error.response.data.message);

			// setResponse(alert(response.data.message));
			// setResponse(alert(responseData.data.user.message));
		}
	};

	const handleKeyDown = (event) => {
		console.log("clicked");

		if (event.key === "Enter") {
			console.log("enter clicked");
			userLogin(event);
		}
	};

	const handleSubmit = (e) => {
		console.log("submitted");
		e.preventDefault();
		setEmail("");
		setPassword("");
	};

	const handleClick = () => {
		// signInWithPopup(auth, provider).then((data) => {
		// 	console.log(data.user);
		// 	setValue(data.user);
		// 	console.log(data.user.uid);
		// 	navigate("/");
		// })
	};

	return (
		<div>
			<ToastContainer position="top-right" />
			<div className="msg">{response && <div>{response.message}</div>}</div>
			<div style={{ position: "relative", marginTop: "-80px" }}>
				<img
					className="tw-w-full md:tw-h-[100vh] tw-h-[100vh] "
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
						background: "rgba(0, 0, 0, 0.3)",
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
						<div className="tw-grid tw-place-content-center">
							<section className="tw-grid tw-content-center tw-bg-white tw-rounded-sm tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">
								<form onSubmit={handleSubmit}>
									<div className="md:tw-p-10">
										<h3 className="tw-text-3xl tw-font-bold tw-text-black tw-mb-3 md:tw-mt-[2px] tw-mt-6">
											Log In
										</h3>
										<div className="tw-flex">
											<label
												className="tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4 tw-mt-4"
												htmlFor="email"
											>
												<PersonIcon />
											</label>
											<input
												id="email"
												type="email"
												name="email"
												className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-4 tw-text-black tw-mt-4"
												placeholder="Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>

										<h1>{verificationResult}</h1>
										<div className="tw-flex tw-mb-5">
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
												className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black"
												placeholder="Password"
												value={password}
												onKeyDown={handleKeyDown}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div>
											{/* <button
												id='password'
												type="password"
												name="password"
												className="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black"
												placeholder="Password"
												onClick={handleClick}

											><FcGoogle className=' tw-text-2xl tw-mt-[-1px] tw-ml-[90px]' /><p className=' tw-mt-[-24px] tw-ml-[40px]'>Continue With Google</p>
											</button> */}

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
										<div className="">
											{/* <input type="checkbox"
												id='remember'
												className='tw-h-3 tw-w-3 md:tw-ml-[-102px]  '
											/>
											<label className=' tw-text-gray-400 p-2 md:tw-ml-1  tw-mt-[10px] tw-mb-4 ' htmlFor='remember'>
												Remember me</label> */}
											<a
												href="/UserForgotPassword"
												className=" tw-text-gray-600 tw-float-right tw-mt-10 tw-mb-4"
											>
												Forget Your Password?
											</a>
											<Link
												className="text-slate-600  text-sm grid place-content-end mb-6 md:tw-mt-[-30px] tw-mt-[-20px] "
												style={{ textDecoration: "none" }}
												to="/UserForgotPassword"
											>
												Forgot Your Password?
											</Link>
										</div>
										<div></div>

										<button
											disabled={!email || !password}
											type="submit"
											className={`tw-w-full tw-text-center tw-text-lg tw-font-semibold tw-h-11
    												${!email || !password
													? "tw-bg-gray-300 tw-cursor-not-allowed tw-text-gray-600"
													: "tw-bg-black tw-hover:bg-green-400 tw-text-white"
												}`}
											onClick={userLogin}
										>
											Login
										</button>

										<div className=" tw-text-gray-400 tw-mt-4 ">
											{/* Don't have an Account? Create New Account */}
											<p>
												Don't have an account?{" "}
												<a href="/UserEmail" className=" tw-cursor-pointer ">
													<u> Create New Account</u>
												</a>
											</p>
										</div>
									</div>
								</form>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
