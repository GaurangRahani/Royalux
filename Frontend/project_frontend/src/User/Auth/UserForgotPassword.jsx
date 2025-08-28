import React, { useState } from "react";
import "./UserForgotPassword.css";
import backgroundImage from "../../Assests/Image/home3.avif";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";

import "animate.css";
import OtpInput from "react-otp-input";
import axios from "axios";
import { forgetPasswordUrl, verifyOtpUrl } from "../Components/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState(null);
  const location = useLocation();
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleEmail = async () => {
    try {
      const reqdata = {
        email: email,
      };

      const responseData = await axios.post(forgetPasswordUrl, reqdata);
      if (responseData.status === 200) {
        toggleForm();
      } else {
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setResponse("error", "Email not found");
      } else {
        toast.error(error.response.data.message);

        setResponse("error", "An unexpected error occurred");
      }
    }
  };

  const toggleForm = () => {
    setShowOtp(!showOtp);
  };

  const handleOtp = async (e) => {
    try {
      const reqdata = {
        email: email,
        otp: otp,
      };
      console.log("forgot reqdata: ", reqdata.email);

      const responseData = await axios.post(verifyOtpUrl, reqdata);
      console.log("forgot email: ", responseData);

      if (responseData.status === 200) {
        setResponse("success: ", responseData.data);
        navigate("/UserResetPassword", { state: { email: email } });
        console.log("verify email: ", email);
      } else {
        console.log("error");
        toast.error(responseData.data.message);
        console.log("responseData.data.message: ", responseData.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
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
                <div className=" md:tw-p-[30px]">
                  <h3 class="tw-text-3xl tw-font-bold  tw-text-black tw-mb-10">
                    Forgot Password
                  </h3>

                  <form>
                    <div>
                      <div className="tw-flex">
                        <label className="tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4">
                          <PersonIcon />
                        </label>
                        <input
                          type="email"
                          name="email"
                          class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-4 tw-text-black"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      {!showOtp && (
                        <button
                          type="button"
                          class="tw-bg-black tw-mb-4 tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
                          onClick={handleEmail}
                        >
                          Get Otp
                        </button>
                      )}
                    </div>

                    <div>
                      {showOtp && (
                        <>
                          <div className="tw-grid tw-place-content-center">
                            <OtpInput
                              value={otp}
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
                                  class=" tw-border-2 tw-h-[48px] tw-mb-4 tw-w-[48px] tw-text-black"
                                />
                              )}
                            />
                          </div>
                          <button
                            type="button"
                            class="tw-bg-black tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
                            onClick={handleOtp}
                          >
                            Reset Password
                          </button>
                        </>
                      )}
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

export default UserForgotPassword;

// import React, { useState } from 'react';
// import "./UserForgotPassword.css";
// import backgroundImage from '../../Assests/Image/home3.avif';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import PersonIcon from '@mui/icons-material/Person';

// import 'animate.css';
// import OtpInput from 'react-otp-input';
// import axios from 'axios';
// import { forgetPasswordUrl, verifyOtpUrl } from '../Components/Api';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserForgotPassword = () => {

// 	const [email, setEmail] = useState('');
// 	const [otp, setOtp] = useState('');
// 	const [response, setResponse] = useState(null);
// 	const location = useLocation();
// 	const [showOtp, setShowOtp] = useState(false);
// 	const navigate = useNavigate();

// 	const handleEmail = async () => {
// 		try {
// 			const reqdata = {
// 				email: email,
// 			};

// 			const responseData = await axios.post(forgetPasswordUrl, reqdata);
// 			if (responseData.status === 200) {

// 				toggleForm();
// 			}
// 			else {

// 			}
// 		}
// 		catch (error) {
// 			if (error.response && error.response.status === 404) {
// 				setResponse('error', "Email not found");
// 			} else {
// 				toast.error(error.response.data.message);

// 				setResponse('error', "An unexpected error occurred");
// 			}
// 		}
// 	}

// 	const toggleForm = () => {
// 		setShowOtp(!showOtp);

// 	}

// 	const handleOtp = async (e) => {
// 		try {

// 			const reqdata = {
// 				email: email,
// 				otp: otp,
// 			};
// 			console.log('forgot reqdata: ', reqdata.email);

// 			const responseData = await axios.post(verifyOtpUrl, reqdata);
// 			console.log('forgot email: ', responseData);

// 			if (responseData.status === 200) {

// 				setResponse("success: ", responseData.data);
// 				navigate("/UserResetPassword", { state: { email: email } });
// 				console.log('verify email: ', email);
// 			}
// 			else {
// 				console.log("error");
// 				toast.error(responseData.data.message);
// 				console.log('responseData.data.message: ', responseData.data.message);

// 			}
// 		} catch (error) {

// 			if (error.response && error.response.data && error.response.data.message) {
// 				toast.error(error.response.data.message);
// 			} else {
// 				toast.error("An unexpected error occurred");
// 			}
// 			console.error("Error:", error);
// 		}
// 	}

// 	return (
// 		<div>
// 			<ToastContainer position='top-right' />
// 			<div className='msg'>
// 				{response && <div>{response.message}</div>}
// 			</div>

// 			<div style={{ position: 'relative', marginTop: '-80px' }}>
// 				<img class="tw-w-full md:tw-h-[800px] tw-h-[100vh] " src={backgroundImage} alt="background" srcset="" />
// 				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
// 				</div>
// 				<div >
// 					<div style={{ color: 'white', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
// 						<div class="tw-grid tw-place-content-center">
// 							<section className="tw-grid tw-content-center tw-bg-white tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">

// 								<div className=" md:tw-p-[30px]">
// 									<h3 class="tw-text-3xl tw-font-bold  tw-text-black tw-mb-10">
// 										Forgot Password
// 									</h3>

// 									<form>
// 										<div>
// 											<div className="tw-flex">
// 												<label className='tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4'>
// 													<PersonIcon />
// 												</label>
// 												<input
// 													type="email"
// 													name="email"
// 													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-4 tw-text-black"
// 													placeholder="Email"
// 													value={email}
// 													onChange={(e) => { setEmail(e.target.value) }}

// 												/>
// 											</div>
// 											{
// 												!showOtp &&

// 												<button type="button" class="tw-bg-black tw-mb-4 tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
// 													onClick={handleEmail} >
// 													Get Otp
// 												</button>
// 											}

// 										</div>

// 										<div>
// 											{
// 												showOtp &&
// 												<>

// 													<div className="tw-grid tw-place-content-center">

// 														<OtpInput
// 															value={otp}
// 															onChange={setOtp}
// 															numInputs={4}

// 															renderSeparator={
// 																<span class="tw-text-black tw-mb-6 tw-p-2 tw-text-2xl">-</span>
// 															}
// 															renderInput={(props) =>
// 																<input {...props}
// 																	class=" tw-border-2 tw-h-[48px] tw-mb-4 tw-w-[48px] tw-text-black"

// 																/>}
// 														/>

// 													</div>
// 													<button type="button" class="tw-bg-black tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
// 														onClick={handleOtp}>
// 														Reset Password
// 													</button>
// 												</>
// 											}

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

// export default UserForgotPassword;
