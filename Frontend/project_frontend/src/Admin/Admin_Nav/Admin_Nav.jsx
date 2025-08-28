// import React from 'react';
import logo from "../../Assests/Image/nav2.svg";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Admin_Nav.css";
import "./Admin_Navbar.css";
import Swal from "sweetalert2";
import React, { useState } from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import createSvgIcon from "@material-ui/core/utils/createSvgIcon";
import Nav from "../../User/Nav/Nav";

const Admin_Nav = () => {
  // const navigate = useNavigate();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const handleShowProfile = (popupState) => {
  //   popupState.close();
  //   Swal.fire({
  //     title: "Admin Profile",
  //     html: `
	// 		<hr style="border-color: #333; margin-top:5px; margin-bottom:15px" />

	// 			<div class="profile-container">
	// 				<div class="avatar-container" style="display: flex; justify-content: center;">
	// 					<img alt="Admin Image" id="profileImage" src="https://res.cloudinary.com/dliioswvx/image/upload/v1702384770/profile_pic/a_tqmqce.png" style="cursor: pointer; margin-bottom:20px; height:150px; width:150px; border-radius: 50%; " onclick="profile()"  />

	// 				</div>
	// 				<div class="profile-details">
	// 					<p style="font-weight: bold">Name: Admin</p>
	// 					<p style="font-weight: bold">Email: admin@gmail.com</p>
						
	// 				</div>
	// 			</div>
	// 		`,
  //     showCancelButton: true,
  //     showConfirmButton: false,
  //     cancelButtonText: "Close",
  //   });
  // };
  // const logOut = () => {
  //   localStorage.removeItem("admin");
  //   console.log("remove", localStorage.removeItem("admin"));
  //   Swal.fire("Success!", "Admin Logout.", "success");
  //   navigate("/login");
  // };

  // return (
  //   <>
  //     <div
  //       className="container-fluid navbar navbar-expand-lg shadow-sm px-lg-3 py-lg-2 text-light justify-content-between sticky-top"
  //       style={{ background: "#191919", marginTop: "-80px" }}
  //     >
  //       <a className="navbar-brand  tw-ml-[28px] fw-bold fs-3 h-font custom-margin-left">
  //         <img src={logo} alt="" height="80px" width="180px" />
  //       </a>

  //       <PopupState variant="popover" popupId="demo-popup-menu">
  //         {(popupState) => (
  //           <>
  //             <AccountCircleIcon
  //               style={{
  //                 color: "#d3a478",
  //                 height: "36px",
  //                 width: "36px",
  //                 marginRight: "20px",
  //                 marginTop: "5px",
  //                 cursor: "pointer",
  //                 overflowY: "auto",
  //               }}
  //               variant="contained"
  //               {...bindTrigger(popupState)}
  //             ></AccountCircleIcon>
  //             <Menu {...bindMenu(popupState)} style={{ marginTop: "50px" }}>
  //               <MenuItem onClick={() => handleShowProfile(popupState)}>
  //                 Profile
  //               </MenuItem>
  //               <MenuItem onClick={() => logOut(popupState)}>Logout</MenuItem>
  //             </Menu>
  //           </>
  //         )}
  //       </PopupState>
  //     </div>
  //   </>
  // );
  return <Nav />
};

export default Admin_Nav;
