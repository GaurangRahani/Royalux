import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import text from '../../Assests/Image/nest.jpg';
import logo from '../../Assests/Image/nav2.svg';
// import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { NavLink, useNavigate } from 'react-router-dom';
import "./menu.css";
import "../AgentRegister.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import createSvgIcon from '@material-ui/core/utils/createSvgIcon';

import { agentProfileUrl, agentEditProfileUrl, agentDeleteProfileUrl } from '../../User/Components/Api';
import axios from 'axios';

const style = {
	position: 'absolute',
	top: '20%',
	left: '20%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
};

const AgentNav = () => {



	const [agentName, setAgentName] = useState('');
	const [agentEmail, setAgentEmail] = useState(false);
	const [agentRole, setAgentRole] = useState(false);
	const [agentImage, setAgentImage] = useState({ image: null, isSet: false });
	const [agentMobile, setAgentMobile] = useState(false);
	const [isLogin, setIsLogin] = useState(false);


	const getAgentData = async () => {
		try {
			const token = localStorage.getItem('agent');
			const tokenArray = JSON.parse(token);
			const response = await axios.get(agentProfileUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},

			});
			if (response.status === 200) {
				console.log('success');
				const data = response.data;
				console.log(data);
				setAgentName(data.data.name);
				console.log(data.data.name);

				setAgentImage((pre) => {
					const image = {
						image: data.data.profilePic, isSet: false,
					};
					console.log(image);
					return image
				});

				console.log(data.data.email);
				console.log(data.data.role);

				setAgentEmail(data.data.email);

				setIsLogin(data.data.isLogin);
				setAgentRole(data.data.role);
				setAgentMobile(data.data.mobileNo);
				console.log(data.isLogin);
				console.log(data);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	}


	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
	const [isNavbarActive, setIsNavbarActive] = useState(false);

	const navigate = useNavigate();


	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
		setIsNavbarActive(!isNavbarActive);

	};

	useEffect(() => {
		getAgentData();
	}, []);



	const showLogin = () => {
		navigate("/UserLogin");
	}


	const logOut = () => {
		localStorage.removeItem("agent");
		console.log("remove", localStorage.removeItem("agent"));
		Swal.fire("Success!", "Agent Logout.", "success");
		navigate("/login");
	};


	const handleShowProfile = async (popupState) => {
		popupState.close();
		getAgentData();


		window.handleImageChange = (event) => {
			const selectedFile = event.target.files[0];
			if (selectedFile) {
				console.log('Selected File:', selectedFile.name);
			}
		}
		window.deleteProfile = async () => {
			try {
				const token = localStorage.getItem('agent');
				const tokenArray = JSON.parse(token);
				const response = await axios.delete(agentDeleteProfileUrl, {
					headers: {
						Authorization: `Bearer ${tokenArray[0]}`,
					},
				});

				if (response.status === 200) {
					// If the profile picture is deleted successfully
					setAgentImage({ image: null, isSet: false }); // Reset user image state
					Swal.fire('Success!', 'Profile picture deleted.', 'success');
				} else {
					throw new Error(`Failed to delete profile picture: ${response.statusText}`);
				}
			} catch (error) {
				console.error('Error deleting profile picture:', error);
				Swal.fire('Error', 'Failed to delete profile picture.', 'error');
			}
		};

		window.profile = () => {

			Swal.fire({
				html: `


					<div class="profile-container" style="font-family: Arial, sans-serif; margin-top: 8px; padding: 20px;">
						<h1 style="color: #333; font-weight:bold; font-size:24px; color:grey;">Profile Picture</h1>

						<hr style="border-color: #333; margin-top:10px;" />
						<p style="color: #666; margin-top:5px; font-size:15px">A picture helps people recognize you and lets you know when you’re signed in to your account.</p>
						<div class="avatar-container" style="display: flex; justify-content: center; margin-top: 20px;">
							<img id="profileImage" src=${agentImage.isSet ? URL.createObjectURL(agentImage.image) : agentImage.image} alt="Agent_Profile" style="height: 200px; width: 200px; border-radius: 50%;" />					
						</div>
						<div>
							<input id="imageInput" type='file' style="margin-bottom: 20px; margin-top: 20px; margin-left: 100px; outline: none; font-size:16px;" />
						</div>
						<div style="display: flex; justify-content: center; margin-top:10px">
							<button style="padding: 10px 20px; margin-right: 10px; background-color: #808080; color: #fff; border: none; cursor: pointer; border-radius: 5px;" onclick="handleCancelClick()">Cancel</button>
							<button id="editButton" style="margin-right: 10px; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Edit</button>
							<button id="editButton" style="margin-right: 10px; padding: 10px 20px; background-color: #FF0000; color: #fff; border: none; cursor: pointer; border-radius: 5px;" onclick="deleteProfile() ">Delete</button>
						</div>
					</div>
				`,
				showConfirmButton: false,
			});


			document.getElementById('editButton').onclick = editImage;
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

				const token = localStorage.getItem('agent');
				const tokenArray = JSON.parse(token);


				const response = await axios.post(agentEditProfileUrl, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${tokenArray[0]}`,
					},
				});

				if (response.status === 200) {
					const data = response.data;
					console.log(data);
					setAgentImage({ image: data.profilePic, isSet: false });
					Swal.fire('Success!', 'Profile picture updated.', 'success');
					// Swal.close();
				} else {
					throw new Error(`Failed to update profile picture: ${response.statusText}`);
				}
			} catch (error) {
				console.error('Error updating profile picture:', error);
				Swal.fire('Error', 'Failed to update profile picture.', 'error');
			}
		};

		Swal.fire({
			title: "Profile",
			html: `
			<hr style="border-color: #333; margin-top:5px; margin-bottom:15px" />

				<div class="profile-container">
					<div class="avatar-container" style="display: flex; justify-content: center;">
						<img alt="Admin Image" id="profileImage" src=${agentImage.isSet ? URL.createObjectURL(agentImage.image) : agentImage.image} style="cursor: pointer; margin-bottom:20px; height:150px; width:150px; border-radius: 50%; " onclick="profile()"  />

					</div>
					<div class="profile-details">
						<p style="font-weight: bold">Name: ${agentName}</p>
						<p style="font-weight: bold">Email: ${agentEmail}</p>
						<p style="font-weight: bold">Mobile: ${agentMobile}</p>
						
					</div>
				</div>
			`,
			showCancelButton: true,
			showConfirmButton: false,
			cancelButtonText: "Close",
		});


	};



	return (
		<div>
			<nav
				id="nav-bar"
				className="navbar navbar-expand-lg px-lg-3 py-lg-2 shadow-sm sticky_nav"
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

					<div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="showNavbar" >
						<ul className="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
							<NavLink className="nav-link me-4 text-white " to="/agent/Property">
								Property
							</NavLink>

						</ul>
						<form action="" method="post">
							<div className="d-flex">

								{/* <button
									type="button"
									className="btn shadow-none me-lg-3 me-3 ms-3"
									data-bs-toggle="modal"
									data-bs-target="#loginModal"
									onClick={showLogin}
									id='btnLogin'
									style={{ background: '#d3a478' }}
								>
									Login
								</button> */}

								<PopupState variant="popover" popupId="demo-popup-menu">
									{(popupState) => (
										<>
											<AccountCircleIcon
												style={{ color: "#d3a478", height: "36px", width: "36px", marginRight: "20px", marginTop: '5px', cursor: 'pointer', overflowY: 'auto' }}
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



							</div>
						</form>
					</div>
				</div >
			</nav >
		</div >
	);
};

export default AgentNav;