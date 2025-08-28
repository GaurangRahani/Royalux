import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assests/Image/nav2.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { agentVerifyUrl, changeProfileUrl, deleteProfileUrl, userProfileUrl } from '../Components/Api';
import axios from 'axios';
import "./menu.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userRole, setUserRole] = useState('');
	const [userMobile, setUserMobile] = useState('');
	const [userImage, setUserImage] = useState({ image: null, isSet: false });
	const [isLogin, setIsLogin] = useState(false);
	const [open, setOpen] = useState(false);
	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
	const [isNavbarActive, setIsNavbarActive] = useState(false);
	const [email, setEmail] = useState('');
	const [response, setResponse] = useState('');
	const [newProfilePhoto, setNewProfilePhoto] = useState(null);
	const [deletePassword, setDeletePassword] = useState("");
	const [role, setRole] = useState('');
	const [token, setToken] = useState('');
	const [isUserDataFetched, setIsUserDataFetched] = useState(false);
	const isAuthenticated = token !== '';
	const navigate = useNavigate();

	const getUserData = async () => {
		try {
			const response = await axios.get(userProfileUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				const data = response.data;
				setUserName(data.userData.name);
				setUserImage({
					image: data.userData.profilePic, isSet: false,
				});
				setUserEmail(data.userData.email);
				setUserMobile(data.userData.mobileNo);
				setIsLogin(data.isLogin);
				setIsUserDataFetched(true);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
		setIsNavbarActive(!isNavbarActive);
	};

	useEffect(() => {
		const adminToken = localStorage.getItem('admin');
		const agentToken = localStorage.getItem('agent');
		const userToken = localStorage.getItem('user');
		if (adminToken) {
			setToken(JSON.parse(adminToken)[0]);
			setRole('admin');
		} else if (agentToken) {
			setToken(JSON.parse(agentToken)[0]);
			setRole('agent');
		} else if (userToken) {
			setToken(JSON.parse(userToken)[0]);
			setRole('user');
		}

		getUserData();
	}, [role]);

	const showLogin = () => {
		navigate("/login");
	}

	const showSignup = () => {
		navigate("/UserRegister");
	};

	const handleVerifyEmail = async (e) => {
		try {
			const reqData = {
				email: email,
			};
			const responseData = await axios.post(agentVerifyUrl, { email: reqData.email });
			if (responseData.data.statusCode === 201) {
				setResponse('success', 'success..');
				setEmail('');
			}
		} catch (error) {
			toast.error("Error: " + error.message);
		}
	};

	const handleShowProfile = async (popupState) => {
		popupState.close();
		if (!isUserDataFetched) {
			await getUserData();
		}

		window.handleCancelClick = () => {
			Swal.close();
		};

		window.handleImageChange = (event) => {
			const selectedFile = event.target.files[0];
			if (selectedFile) {
			}
		}

		window.profile = () => {
			Swal.fire({
				html: `
					<div class="profile-container" style="font-family: Arial, sans-serif; margin-top: 8px; padding: 20px;">
						<h1 style="color: #333; font-weight:bold; font-size:24px; color:grey;">Profile Picture</h1>
						<hr style="border-color: #333; margin-top:10px;" />
						<p style="color: #666; margin-top:5px; font-size:15px">A picture helps people recognize you and lets you know when you’re signed in to your account.</p>
						<div class="avatar-container" style="display: flex; justify-content: center; margin-top: 20px;">
							<img id="profileImage" src=${userImage.isSet ? URL.createObjectURL(userImage.image) : userImage.image} alt="User_Profile" style="height: 200px; width: 200px; border-radius: 50%;" />					
						</div>
						<div>
							<input id="imageInput" type='file' style="margin-bottom: 20px; margin-top: 20px; margin-left: 100px; outline: none; font-size:16px;" />
						</div>
						<div style="display: flex; justify-content: center; margin-top:10px">
							<button style="padding: 10px 20px; margin-right: 10px; background-color: #808080; color: #fff; border: none; cursor: pointer; border-radius: 5px;" onClick="handleCancelClick()">Cancel</button>
							<button id="editButton" style="margin-right: 10px; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Edit</button>
							<button id="deleteButton" style="margin-right: 10px; padding: 10px 20px; background-color: #FF0000; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Delete</button>
						</div>
					</div>
				`,
				showConfirmButton: false,
			});
			document.getElementById('editButton').onclick = editImage;
			document.getElementById('deleteButton').onclick = confirmDelete;
		};

		const editImage = async () => {
			try {
				const selectedImage = document.getElementById('imageInput').files[0];
				if (selectedImage) {
					const imageURL = URL.createObjectURL(selectedImage);
					document.getElementById('profileImage').src = imageURL;
				}

				const formData = new FormData();
				formData.append('profilePic', selectedImage);

				const response = await axios.post(changeProfileUrl, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.status === 200) {
					const data = response.data;
					setUserImage({ image: data.image, isSet: false });
					Swal.fire('Success!', 'Profile picture updated.', 'success');
				} else {
					throw new Error(`Failed to update profile picture: ${response.statusText}`);
				}
			} catch (error) {
				console.error('Error updating profile picture:', error);
				Swal.fire('Error', 'Failed to update profile picture.', 'error');
			}
		};

		const confirmDelete = () => {
			Swal.fire({
				html: `
					<div class="profile-container" style="font-family: Arial, sans-serif; margin-top: 8px; padding: 20px;">
						<h1 style="color: #333; font-weight:bold; font-size:24px; color:grey;">Delete Account</h1>
						<hr style="border-color: #333; margin-top:10px;" />
						<div style="margin-top:20px;">
						<lable style=" margin-left:-235px;">Enter Your Password : <br>
						<input type="password" id="passwordInput" style="padding:8px;width:410px; margin-top:5px; " />
						</lable></div>
						<div style="display: flex; justify-content: center; margin-top:30px">
							<button id="deleteButton" style="margin-right: 10px; padding: 10px 20px; background-color: #FF0000; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Delete</button>
						</div>
					</div>
				`,
				showConfirmButton: false,
			});

			document.getElementById('deleteButton').onclick = async () => {
				const password = document.getElementById('passwordInput').value;
				try {
					const response = await axios.delete(deleteProfileUrl, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
						data: { password },
					});

					if (response.status === 200) {
						localStorage.removeItem(role);
						Swal.fire('Success!', 'Your account has been deleted.', 'success');
					} else {
						Swal.fire('Error', 'Failed to delete your account.', 'error');
					}
				} catch (error) {
					console.error('Error deleting account:', error);
					Swal.fire('Error', 'Failed to delete your account.', 'error');
				}
			};
		};

		Swal.fire({
			title: role=="admin" ? "Admin Profile" : "User Profile",
			html: `
			<hr style="border-color: #333; margin-top:5px; margin-bottom:15px" />

				<div class="profile-container">
					<div class="avatar-container" style="display: flex; justify-content: center;">
						<img alt="Admin Image" id="profileImage" src=${userImage.isSet ? URL.createObjectURL(userImage.image) : userImage.image} style="cursor: pointer; margin-bottom:20px; height:150px; width:150px; border-radius: 50%; " onclick="profile()"  />

					</div>
					<div class="profile-details">
						<p style="font-weight: bold">Name: ${userName}</p>
						<p style="font-weight: bold">Email: ${userEmail}</p>
						<p style="font-weight: bold">Mobile: ${userMobile}</p>
						
					</div>
					<div style="display: flex; justify-content: center; margin-top:10px">
						<button id="deleteButton" style="margin-right: 10px; padding: 10px 20px; background-color: #FF0000; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Delete</button>
					</div>
				</div>
			`,
			showConfirmButton: false,
		});
		document.getElementById('deleteButton').onclick = confirmDelete;
	};

	const logOut = () => {
		localStorage.removeItem('admin');
		localStorage.removeItem('agent');
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<div>
			<div className="msg">{response && <div>{response.message}</div>}</div>

			<nav
				id="nav-bar"
				className="sticky_nav navbar navbar-expand-lg px-lg-3 py-lg-2 shadow-sm "
				style={{ background: '#191919' }}
			>
				<div className="container-fluid">
					<a className="navbar-brand ml-4 me-5 fw-bold fs-3 h-font">
						<img src={logo} alt="" height="80px" width="180px" />
					</a>

					<button
						className="navbar-toggler"
						onClick={handleNavbarToggle}
						aria-controls="showNavbar"
						aria-expanded={!isNavbarCollapsed}
						aria-label="Toggle navigation"
						style={{ background: '#d3a478' }}
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="showNavbar">
						<ul className="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
							<NavLink className="nav-link me-4 text-white " to="/">
								Home
							</NavLink>
							<NavLink className="nav-link me-4 text-white" to="/contact">
								Contact
							</NavLink>
							<NavLink className="nav-link me-4 text-white" to="/about">
								About
							</NavLink>
							<NavLink className="nav-link me-4 text-white" to="/propertyHistory">
								Status
							</NavLink>
							<NavLink className="nav-link text-white" to="/feedback">
								Feedback
							</NavLink>
						</ul>

						<form action="" method="post">
							<div className="d-flex">
								{(role == 'user' || !role) && (
									<Button variant="outlined" onClick={handleClickOpen} className='tw-text-white tw-border-2' style={{ border: "1px solid white" }}>
										Request as an agent
									</Button>
								)}
								<Dialog
									open={open}
									onClose={handleClose}
									PaperProps={{
										component: 'form',
										onSubmit: (event) => {
											event.preventDefault();
											const formData = new FormData(event.currentTarget);
											const formJson = Object.fromEntries(formData.entries());
											const email = formJson.email;
											handleClose();
										},
									}}
								>
									<DialogTitle>Verify Your Email</DialogTitle>
									<DialogContent>
										<DialogContentText>
											To register as an agent on this website, please enter your email address here. We will send updates occasionally.
										</DialogContentText>
										<label htmlFor="email" className='tw-mt-4 tw-text-lg'>Enter Your Email</label>
										<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className='tw-w-full tw-h-11 tw-border 2 tw-rounded-md tw-pl-3' style={{ cursor: "text", outline: "grey" }} />
									</DialogContent>
									<DialogActions>
										<button onClick={handleClose} className='tw-font-semibold tw-mr-3 tw-p-2 tw-text-white tw-bg-black tw-rounded-md' style={{ width: "100px" }}>Cancel</button>
										<button type="submit" className='tw-font-semibold tw-mr-4 tw-p-2  tw-text-white tw-bg-black tw-rounded-md' style={{ width: "100px" }} onClick={handleVerifyEmail}>Verify</button>
									</DialogActions>
								</Dialog>
								
								{!isAuthenticated && (
									<>
										<button
										type="button"
										className="btn shadow-none me-lg-3 me-3 ms-3"
										data-bs-toggle="modal"
										data-bs-target="#loginModal"
										onClick={showLogin}
										id='btnLogin'
										style={{ background: '#d3a478' }}
									>
										Login
									</button>
										<button
											type="button"
											className="btn shadow-none me-lg-3 me-3 ms-3"
											onClick={showSignup}
											id='btnSzignup'
											style={{ background: '#d3a478' }}
										>
											Signup
										</button>
									</>
								)}
								{isAuthenticated && (
									<PopupState variant="popover" popupId="demo-popup-menu">
										{(popupState) => (
											<>
												<AccountCircleIcon
													style={{ color: "#d3a478", height: "36px", width: "36px", marginRight: "10px", marginTop: '5px', cursor: 'pointer', overflowY: 'auto' }}
													variant="contained"
													{...bindTrigger(popupState)}
												>
												</AccountCircleIcon>
												<Menu {...bindMenu(popupState)} style={{ marginTop: '50px' }}>
													<MenuItem onClick={() => handleShowProfile(popupState)}>Profile</MenuItem>
													<MenuItem onClick={() => logOut(popupState)}>Logout</MenuItem>
												</Menu>
											</>
										)}
									</PopupState>
								)}
							</div>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;

