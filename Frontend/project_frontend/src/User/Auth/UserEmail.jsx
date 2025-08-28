import React, { useState } from "react";
import "./VerifyEmail.css";
import img2 from "../../Assests/Image/home5.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";

const UserEmail = () => {
	// const [isHovered, setHovered] = useState(false);

	const [email, setEmail] = useState("");
	const [emailErr, setEmailErr] = useState('');

	const navigate = useNavigate();


	const validateEmail = (email) => {
		if (email === '') {
			setEmailErr('Email is required');
			return false
		} else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
			setEmailErr('Invalid email address');
			return false
		}

		setEmailErr('');
		return true

	}
	const handleSubmit = (e) => {
		if (validateEmail(email) === true) {

			navigate("/VerifyEmail", { state: { email } });
			console.log("submitted");
			e.preventDefault();
			setEmail("");
		}

	};


	const handleKeyDown = (event) => {

		if (validateEmail(email)) {

			if (event.key === 'Enter') {
				console.log("enter clicked");
				handleSubmit(event);
			};
		}
	}


	return (
		<div>

			<div style={{ position: 'relative', marginTop: '-80px' }}>
				<img class="tw-w-full md:tw-h-[100vh		] tw-h-[100vh] " src={img2} alt="background" srcset="" />
				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
				</div>
				<div >
					<div style={{ color: 'white', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
						<div class="tw-grid tw-place-content-center">
							<section className="tw-grid tw-content-center tw-bg-white tw-text-center tw-border-2 md:tw-w-[500px] tw-h-auto tw-p-2 tw-m-3 tw-shadow-md ">

								<div className=" md:tw-p-[30px]">
									<h3 class="tw-text-3xl tw-font-bold  tw-text-black tw-mb-10">
										Verify Email
									</h3>

									<form>
										<div>
											<div className="tw-flex">
												<label className='tw-border-2 tw-mr-[2px] tw-text-black tw-p-2 tw-mb-4'>
													<PersonIcon />
												</label>
												<input
													type="email"
													name="email"
													class="tw-w-full tw-border-2 tw-h-12 tw-p-3 tw-mb-4 tw-text-black"
													placeholder="Email"
													value={email}
													onKeyDown={handleKeyDown}
													onChange={(e) => {
														setEmail(e.target.value)
														validateEmail(e.target.value);

													}}
													required

												/>

											</div>
											<p style={{ color: 'red', marginBottom: '20px' }}>{emailErr}</p>

											<button type="button" class="tw-bg-black tw-mb-4 tw-w-full tw-text-center tw-text-white tw-text-lg tw-font-semibold tw-h-11"
												onClick={handleSubmit} >
												Verify Email
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
};

export default UserEmail;