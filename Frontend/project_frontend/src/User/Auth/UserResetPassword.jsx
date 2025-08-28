import React, { useState } from 'react';
import "./UserResetPassword.css";
import backgroundImage from '../../Assests/Image/home8.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { resetPasswordUrl } from '../Components/Api';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserResetPassword = () => {

	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');
	const [response, setResponse] = useState(null);
	const location = useLocation();
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

	const email = location.state;
	console.log(location.state);
	if (email === null) {
		return <Navigate to='/UserForgotPassword' />
	}

	// const validatePassword = (password, cf) => {

	// 	if (!password || password.trim() === "" && !`/[A-Z]/`.test(password) && !`/[a-z]/`.test(password) && !`/[!@#$%^&*(),.?":{}|<>]/`.test(password) && !`/\d/`.test(password) && password.length < 8) {
	// 		setPasswordError('Password must be between 8 characters');

	// 		return false;
	// 	}
	// 	else if (password !== cf) {
	// 		setPasswordError('Password and confirm password is not same');
	// 		return false;
	// 	}
	// 	setPasswordError('');
	// 	return true;


	// };

	const validatePassword = (password) => {
		if (!password || password.trim() === "") {
			setPasswordError("Enter Password");
		} else if (!/[A-Z]/.test(password)) {
			setPasswordError("At least one uppercase letter");
		} else if (!/[a-z]/.test(password)) {
			setPasswordError("At least one lowercase letter");
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			setPasswordError("At least one special character");
		} else if (!/\d/.test(password)) {
			setPasswordError("At least one digit");
		} else if (password.length < 8) {
			setPasswordError("Minimum 8 characters");
		} else {
			setPasswordError("");
			return true;
			// setisValidPass(true);
		}
	};



	const resetPassword = async (e) => {
		try {
			e.preventDefault();

			if (validatePassword(password) && password === cpassword) {
				const email = location.state;

				console.log(email);
				const reqdata = {
					email: email.email,
					newPassword: password,
				};
				const responseData = await axios.post(resetPasswordUrl, reqdata);

				if (responseData.status === 200) {

					setResponse("success: ", 'success');
					setResponse(() => { navigate("/UserLogin") });
				}
				else {
					// toast.error(responseData.data.message);

				}
			}
			else {
				toast.error("Please Enter Correct Password and Confirm Password");
			}
		}
		catch (error) {



			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("An unexpected error occurred");
			}
			console.error("Error:", error);


		}
	}

	const handleKeyDown = (event) => {
		console.log("clicked");

		if (event.key === 'Enter') {
			console.log("enter clicked");
			resetPassword(event);
		};
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setPassword('');
		setCpassword('');
	}
	return (
		<div>
			<ToastContainer position='top-right' />
			<div className="msg">
				{response && <div>{response.message}</div>}
			</div>
			<div style={{ position: 'relative', marginTop: '-80px' }}>
				<img class="tw-w-full md:tw-h-[100vh] tw-h-[100vh] " src={backgroundImage} alt="background" srcset="" />
				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
				</div>
				<div >
					<div style={{ color: 'white', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
						<div class="tw-grid tw-place-content-center">
							<section className="tw-grid tw-content-center tw-bg-white tw-rounded-sm tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">

								<div className=" md:tw-p-5">
									<h3 class="tw-text-3xl tw-font-bold  tw-text-black tw-mb-10">
										Reset Password
									</h3>

									<form onSubmit={handleSubmit}>

										<div className="tw-flex tw-mb-4">
											<label className='tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 ' htmlFor='password'>
												<LockIcon />
											</label>
											<input
												id='password'
												name="password"
												class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black "
												placeholder="Password"
												value={password}
												onChange={(e) => {
													setPassword(e.target.value);
													validatePassword(e.target.value);
												}}
												type={showPassword ? 'text' : 'password'}

											/>
										</div>
										<p style={{ color: 'red' }}>{passwordError}</p>

										<div>
											<div className="tw-flex tw-mb-4">
												<label className='tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 ' htmlFor='cpassword'>
													<LockIcon />
												</label>
												<input
													id='cpassword'
													name="password"
													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black"
													placeholder="Confirm Password"
													value={cpassword}
													onKeyDown={handleKeyDown}
													onChange={(e) => setCpassword(e.target.value)}
													type={showConfirmPassword ? 'text' : 'password'}
												/>
											</div>
											<button
												disabled={!password || !cpassword}
												type="submit"
												className={`tw-w-full tw-text-center tw-text-lg tw-font-semibold tw-h-11
    												${(!password || !cpassword) ? 'tw-bg-gray-300 tw-cursor-not-allowed tw-text-gray-600' : 'tw-bg-black tw-hover:bg-green-400 tw-text-white'}`

												}
												onClick={resetPassword}
											>
												Reset My Password
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
	)
}


// import React, { useState } from 'react';
// import "./UserResetPassword.css";
// import backgroundImage from '../../Assests/Image/home8.jpg';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import LockIcon from '@mui/icons-material/Lock';
// import { Link } from 'react-router-dom';
// import { useNavigate, useLocation, Navigate } from 'react-router-dom';
// import { resetPasswordUrl } from '../Components/Api';
// import axios from 'axios';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const UserResetPassword = () => {

// 	const [password, setPassword] = useState('');
// 	const [cpassword, setCpassword] = useState('');
// 	const [response, setResponse] = useState(null);
// 	const location = useLocation();
// 	const [passwordError, setPasswordError] = useState('');
// 	const navigate = useNavigate();

// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

// 	const email = location.state;
// 	console.log(location.state);
// 	if (email === null) {
// 		return <Navigate to='/UserForgotPassword' />
// 	}

// 	const validatePassword = (p, cf) => {

// 		if (p.length < 8) {
// 			setPasswordError('Password must be between 8 characters');

// 			return false;
// 		}
// 		else if (p !== cf) {
// 			setPasswordError('Password and confirm password is not same');
// 			return false;
// 		}
// 		setPasswordError('');
// 		return true;
// 	};


// 	const resetPassword = async (e) => {
// 		try {
// 			e.preventDefault();

// 			if (validatePassword(password, cpassword)) {
// 				const email = location.state;

// 				console.log(email);
// 				const reqdata = {
// 					email: email.email,
// 					newPassword: password,
// 				};
// 				const responseData = await axios.post(resetPasswordUrl, reqdata);

// 				if (responseData.status === 200) {

// 					setResponse("success: ", 'success');
// 					setResponse(() => { navigate("/UserLogin") });
// 				}
// 				else {
// 					// toast.error(responseData.data.message);

// 				}
// 			}
// 		}
// 		catch (error) {



// 			if (error.response && error.response.data && error.response.data.message) {
// 				toast.error(error.response.data.message);
// 			} else {
// 				toast.error("An unexpected error occurred");
// 			}
// 			console.error("Error:", error);


// 		}
// 	}

// 	const handleKeyDown = (event) => {
// 		console.log("clicked");

// 		if (event.key === 'Enter') {
// 			console.log("enter clicked");
// 			resetPassword(event);
// 		};
// 	}

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setPassword('');
// 		setCpassword('');
// 	}
// 	return (
// 		<div>
// 			<ToastContainer position='top-right' />
// 			<div className="msg">
// 				{response && <div>{response.message}</div>}
// 			</div>
// 			<div style={{ position: 'relative', marginTop: '-80px' }}>
// 				<img class="tw-w-full md:tw-h-[800px] tw-h-[100vh] " src={backgroundImage} alt="background" srcset="" />
// 				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
// 				</div>
// 				<div >
// 					<div style={{ color: 'white', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
// 						<div class="tw-grid tw-place-content-center">
// 							<section className="tw-grid tw-content-center tw-bg-white tw-rounded-sm tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">

// 								<div className=" md:tw-p-5">
// 									<h3 class="tw-text-3xl tw-font-bold  tw-text-black tw-mb-10">
// 										Reset Password
// 									</h3>

// 									<form onSubmit={handleSubmit}>

// 										<div className="tw-flex tw-mb-4">
// 											<label className='tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 ' htmlFor='password'>
// 												<LockIcon />
// 											</label>
// 											<input
// 												id='password'
// 												name="password"
// 												class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black "
// 												placeholder="Password"
// 												value={password}
// 												onChange={(e) => setPassword(e.target.value)}
// 												type={showPassword ? 'text' : 'password'}

// 											/>
// 										</div>
// 										<p style={{ color: 'red' }}>{passwordError}</p>

// 										<div>
// 											<div className="tw-flex tw-mb-4">
// 												<label className='tw-border-2 tw-mr-[2px]  tw-text-black tw-p-2 tw-mb-1 ' htmlFor='cpassword'>
// 													<LockIcon />
// 												</label>
// 												<input
// 													id='cpassword'
// 													name="password"
// 													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-1 tw-text-black"
// 													placeholder="Confirm Password"
// 													value={cpassword}
// 													onKeyDown={handleKeyDown}
// 													onChange={(e) => setCpassword(e.target.value)}
// 													type={showConfirmPassword ? 'text' : 'password'}
// 												/>
// 											</div>
// 											<button
// 												disabled={!password || !cpassword}
// 												type="submit"
// 												className={`tw-w-full tw-text-center tw-text-lg tw-font-semibold tw-h-11
//     												${(!password || !cpassword) ? 'tw-bg-gray-300 tw-cursor-not-allowed tw-text-gray-600' : 'tw-bg-black tw-hover:bg-green-400 tw-text-white'}`

// 												}
// 												onClick={resetPassword}
// 											>
// 												Reset My Password
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
// 	)
// }