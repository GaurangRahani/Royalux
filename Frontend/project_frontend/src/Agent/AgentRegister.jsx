import React, { useState, useEffect } from "react";
import logo from "../Assests/Image/nav2.svg";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./AgentRegister.css";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { agentAddUrl } from "../User/Components/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const steps = [
	"Personal Information",
	"Personal Information",
	"Bank Related Information",
];

export const AgentRegister = () => {
	const [step, setStep] = useState(1);
	const totalSteps = 3;
	const navigate = useNavigate()
	const [agentName, setAgentName] = useState("");
	const [agentEmail, setAgentEmail] = useState("");
	const [agentContact, setAgentContact] = useState("");
	const [agentPassword, setAgentPassword] = useState("");
	const [agentAge, setAgentAge] = useState("");
	const [agentGender, setAgentGender] = useState("");
	const [agentCity, setAgentCity] = useState("");
	const [agentState, setAgentState] = useState("");
	const [agentAddress, setAgentAddress] = useState("");
	const [agentBankName, setAgentBankName] = useState("");
	const [agentBankAcc, setAgentBankAcc] = useState("");
	const [agentIfscNo, setAgentIfscNo] = useState("");

	const [adharCardFront, setAdharCardFront] = useState("");
	const [adharCardBack, setAdharCardBack] = useState("");
	const [panCard, setPanCard] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [nameErr, setNameErr] = useState("");
	const [mobileError, setMobileError] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [IFSCError, setIFSCError] = useState("");
	const [accountNumberError, setAccountNumberError] = useState("");
	const location = useLocation();


	useEffect(() => {
		const { email } = location.state || {};
		console.log(email);
		if (email) {
			setAgentEmail(email);
		}
	}, [location.state]);

	const validateName = (name) => {
		const allowAlphabet = /^[a-zA-Z]+$/;

		if (name.length <= 2 || !allowAlphabet.test(name)) {
			setNameErr("Name must be contain more than two Alphabets..");
			return false;
		}
		setNameErr("");
		return true;
	};

	const validateMno = (contact) => {
		const mobileRegex = /^\d{10}$/;
		if (!mobileRegex.test(contact)) {
			setMobileError("Please enter a valid 10-digit mobile number");
			return false;
		}
		setMobileError("");
		return true;
	};

	const validateIFSC = (ifscCode) => {
		console.log(ifscCode);
		const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

		if (!ifscRegex.test(ifscCode)) {
			setIFSCError("Invalid IFSC code format");
			return false;
		}
		setIFSCError("");
		return true;
	};

	const validateAccountNumber = (accountNumber) => {
		const accountNumberRegex = /^[0-9]{9,18}$/;

		if (!accountNumber.trim()) {
			setAccountNumberError("Account number is required");
		} else if (!accountNumberRegex.test(accountNumber)) {
			setAccountNumberError("Invalid account number format");
		} else {
			setAccountNumberError("");
		}
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
		}
	};

	const addAgentData = async (e) => {
		e.preventDefault();
		// console.log('hello');
		try {
			const formData = new FormData();

			formData.append("name", agentName);
			formData.append("email", agentEmail);
			formData.append("mobileNo", agentContact);
			formData.append("password", agentPassword);
			formData.append("age", agentAge);
			formData.append("gender", agentGender);
			formData.append("city", agentCity);
			formData.append("state", agentState);
			formData.append("address", agentAddress);
			formData.append("bankName", agentBankName);
			formData.append("bankAccountNo", agentBankAcc);
			formData.append("ifscCode", agentIfscNo);

			adharCardFront.forEach((image) =>
				formData.append(`adharCardFront`, image, image.name)
			);
			console.log(adharCardFront);

			adharCardBack.forEach((image) =>
				formData.append(`adharCardBack`, image, image.name)
			);
			panCard.forEach((image) => formData.append(`panCard`, image, image.name));

			const token = localStorage.getItem("token");

			const responseData = await axios.post(agentAddUrl, formData, {
				headers: {
					Authorization: ` Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			if (responseData.status === 201) {
				console.log(responseData.data);
				toast.success(responseData.data.message);
				setShowModal(true);
				navigate("/");
				// setAgentName('');
				// setAgentEmail('');
				// setAgentContact('');
				// setAgentPassword('');
				// setAgentAge('');
				// setAgentGender('');
				// setAgentCity('');
				// setAgentState('');
				// setAgentAddress('');
				// setAgentBankName('');
				// setAgentBankAcc('');
				// setAgentIfscNo('');
				// setAdharCardBack('');
				// setAdharCardFront('');
				// setPanCard('');
			}
		} catch (error) {
			console.log(error, "err");
			toast.error(error.response.data.message);
		}
	};

	const nextStep = () => {
		if (step < totalSteps) {
			setStep((prevStep) => prevStep + 1);
		}
	};

	const prevStep = () => {
		if (step > 1) {
			setStep((prevStep) => prevStep - 1);
		}
	};

	const handleAgentGender = (e) => {
		setAgentGender(e.target.value);
	};

	const handleImage = (event, type) => {
		const files = event.target.files;
		const images = [];
		for (let i = 0; i < files.length; i++) {
			images.push(files[i]);
		}
		switch (type) {
			case "adharCardFront":
				setAdharCardFront((prevState) => [...prevState, ...images]);
				break;
			case "adharCardBack":
				setAdharCardBack((prevState) => [...prevState, ...images]);
				break;
			case "panCard":
				setPanCard((prevState) => [...prevState, ...images]);
				break;
		}
	};

	return (
		<>
			<div className="tw-grid tw-place-content-center tw-h-screen ">
				<div
					className=" tw-p-10 tw-w-full tw-rounded-2xl"
					style={{ backgroundColor: "#f7f7f7" }}
				>
					<div
						className="modal"
						tabIndex="-1"
						style={{ display: showModal ? "block" : "none" }}
					>
						<div
							className="modal-dialog tw-bg-slate-200 max-w-[550px]"
							style={{ backgroundColor: "#ffffff" }}
						>
							<div
								className="modal-content"
								style={{ backgroundColor: "#ffffff", width: "550px" }}
							>
								<div className="modal-header">
									<h5 className="modal-title tw-text-xl tw-font-semibold">
										Message
									</h5>
									<button
										type="button"
										className="btn-close"
										onClick={() => setShowModal(false)}
									></button>
								</div>
								<div
									className="modal-body tw-mt-14 "
									style={{ margin: "auto", textAlign: "center" }}
								>
									<p className="tw-text-xl tw-font-semibold tw-text-gray-500">
										Thank you for register Your self as an Agent to our website!
									</p>
									<p className="tw-text-xl  tw-font-semibold tw-text-gray-500  tw-mt-4">
										For further Process we will send you mail on your registerd
										email address..
									</p>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-primary "
										style={{ backgroundColor: "black", border: "none" }}
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className=" tw-mb-2 tw-p-2">
						<h1 className=" tw-text-3xl tw-font-bold ">
							Register Your self as an Agent
						</h1>
						<p className="  tw-mt-3">
							complete your profile to following steps!
						</p>
					</div>
					<div
						className=" p-4 tw-border rounded-md tw-shadow-md tw-overflow-hidden tw-text-black"
						style={{ backgroundColor: "white" }}
					>
						<div className="sm:tw-col-span-2 md:tw-col-span-2">
							<Box sx={{ width: "100%" }}>
								<Stepper activeStep={step - 1} alternativeLabel>
									{steps.map((label) => (
										<Step key={label}>
											<StepLabel>{label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</Box>
							<form>
								{step === 1 && (
									<div>
										<div className="tw-grid">
											<label htmlFor="name" className="tw-font-semibold">
												Name
											</label>
											<input
												type="text"
												id="name"
												className="tw-border-2 rounded-2 tw-w-full tw-h-11 tw-p-2"
												value={agentName}
												onChange={(e) => {
													setAgentName(e.target.value);
													validateName(e.target.value);
												}}
												required
											/>

											<p style={{ color: "red", marginBottom: "20px" }}>
												{nameErr}
											</p>
										</div>
										<div className="tw-grid tw-mt-3">
											<label htmlFor="email" className="tw-font-semibold">
												Email
											</label>
											<input
												type="text"
												id="email"
												className="tw-border-2 rounded-2 tw-h-11 tw-p-2 tw-mt-1 "
												value={agentEmail}
												onChange={(e) => {
													setAgentEmail(e.target.value);
												}}
											/>
										</div>
										<div className="tw-grid tw-mt-3">
											<label htmlFor="contact" className="tw-font-semibold">
												Contact No.
											</label>
											<input
												type="text"
												id="contact"
												className="tw-border-2 rounded-2 tw-h-11 tw-p-2 tw-mt-1"
												value={agentContact}
												onChange={(e) => {
													setAgentContact(e.target.value);
													validateMno(e.target.value);
												}}
											/>
											<p style={{ color: "red", marginBottom: "20px" }}>
												{mobileError}
											</p>
										</div>
										<div className="tw-grid tw-mt-3">
											<label htmlFor="password" className="tw-font-semibold">
												Password
											</label>
											<input
												type="password"
												id="password"
												className="tw-border-2 rounded-2 tw-h-11 tw-p-2 tw-mt-1"
												value={agentPassword}
												onChange={(e) => {
													setAgentPassword(e.target.value);
													validatePassword(e.target.value);
												}}
											/>
											<p style={{ color: "red", marginBottom: "20px" }}>
												{passwordErr}
											</p>
										</div>
									</div>
								)}
								{step === 2 && (
									<div>
										<div className="tw-grid">
											<label htmlFor="age" className="tw-font-semibold">
												Age
											</label>
											<input
												type="text"
												id="age"
												className="tw-border-2 rounded-2 tw-h-11 tw-pl-2 "
												value={agentAge}
												onChange={(e) => {
													setAgentAge(e.target.value);
												}}
												style={{ width: "49%" }}
												required
											/>
										</div>
										<label
											htmlFor="gender"
											className=" tw-font-semibold tw-mt-2"
										>
											Gender
										</label>
										<div className=" flex gap-3">
											<div className=" tw-flex tw-border-2 tw-p-2 rounded-2 tw-w-full ">
												<input
													className="form-check-input"
													type="radio"
													name="amenity"
													id="gender"
													value="Male"
													checked={agentGender === "Male"}
													onChange={handleAgentGender}
												/>
												<label
													className="form-check-label tw-pl-1"
													htmlFor="parking"
												>
													Male
												</label>
											</div>
											<div className=" tw-flex  tw-border-2 tw-p-2 rounded-2 tw-w-full">
												<input
													className="form-check-input"
													type="radio"
													name="amenity"
													id="gender"
													value="Female"
													checked={agentGender === "Female"}
													onChange={handleAgentGender}
												/>
												<label
													className="form-check-label tw-pl-2"
													htmlFor="lift"
												>
													Female
												</label>
											</div>
										</div>
										<div className="tw-flex">
											<div className="tw-grid tw-w-full tw-mt-2">
												<label htmlFor="name" className="tw-font-semibold">
													City
												</label>
												<input
													type="text"
													id="name"
													className="tw-border-2 rounded-2 tw-h-11 tw-p-2"
													value={agentCity}
													onChange={(e) => {
														setAgentCity(e.target.value);
													}}
													required
												/>
											</div>
											<div className="tw-grid tw-ml-3 tw-w-full tw-mt-2">
												<label htmlFor="email" className="tw-font-semibold">
													State
												</label>
												<input
													type="text"
													id="email"
													className="tw-border-2 rounded-2 tw-h-11 tw-p-2 tw-mt-1"
													value={agentState}
													onChange={(e) => {
														setAgentState(e.target.value);
													}}
													required
												/>
											</div>
										</div>
										<div className=" tw-grid tw-mt-2">
											<label htmlFor="email" className=" tw-font-semibold">
												Address
											</label>
											<input
												type="text"
												id="email"
												className=" tw-border-2 rounded-2 tw-h-11 tw-p-2 tw-mt-1"
												value={agentAddress}
												onChange={(e) => {
													setAgentAddress(e.target.value);
												}}
											/>
										</div>
									</div>
								)}
								{step === 3 && (
									<div>
										<div className=" tw-grid tw-mt-3 ">
											<label htmlFor="email" className=" tw-font-semibold">
												Bank Name
											</label>
											<input
												type="text"
												id="email"
												className=" tw-border-2 rounded-2 tw-h-10 tw-p-2 tw-mt-1"
												value={agentBankName}
												onChange={(e) => {
													setAgentBankName(e.target.value);
												}}
											/>
										</div>

										<div className="tw-flex">
											<div className="tw-grid tw-w-full tw-mt-2">
												<label htmlFor="name" className="tw-font-semibold">
													Bank Acc No.
												</label>
												<input
													type="text"
													id="name"
													className="tw-border-2 rounded-2 tw-h-10 tw-p-2"
													value={agentBankAcc}
													onChange={(e) => {
														setAgentBankAcc(e.target.value);
														validateAccountNumber(e.target.value);
													}}
													required
												/>
												<p style={{ color: "red", marginBottom: "20px" }}>
													{accountNumberError}
												</p>
											</div>
											<div className="tw-grid tw-ml-3 tw-w-full tw-mt-2">
												<label htmlFor="email" className="tw-font-semibold">
													IFSC No.
												</label>
												<input
													type="text"
													id="email"
													className="tw-border-2 rounded-2 tw-h-10 tw-p-2 tw-mt-1"
													value={agentIfscNo}
													onChange={(e) => {
														setAgentIfscNo(e.target.value);
														validateIFSC(e.target.value);
													}}
													required
												/>
												<p style={{ color: "red", marginBottom: "20px" }}>
													{IFSCError}
												</p>
											</div>
										</div>

										<div>
											<label
												htmlFor="card"
												className=" tw-font-semibold tw-mt-3"
											>
												Adhar card
											</label>
											<div className=" tw-gtid tw-gap-2">
												<input
													type="file"
													id="adharFrontFile"
													placeholder="Front side of adhar"
													style={{
														display: "none",
														width: "100%",
														height: "40px",
													}} // Increase the height here
													onChange={(e) => handleImage(e, "adharCardFront")}
													multiple
												/>
												<label htmlFor="front">Front side of Adhar</label>
												<label
													htmlFor="adharFrontFile"
													placeholder="Front side of adhar"
													className="tw-place-content-center tw-flex tw-gap-3 tw-p-1 tw-h-11 tw-w-full tw-mt-1 rounded-3"
													style={{
														color: "#de0611",
														border: "1px dashed black",
														width: "100%",
														height: "40px",
														padding: "5px",
													}}
												>
													{adharCardFront &&
														adharCardFront.map((image, index) => (
															<h1
																key={index}
																style={{ color: "black", fontWeight: "500" }}
															>
																{image.name}
															</h1>
														))}
												</label>

												<div className=" tw-w-full">
													<input
														type="file"
														id="adharBackFile"
														placeholder="back side od adhar"
														style={{ display: "none" }}
														onChange={(e) => handleImage(e, "adharCardBack")}
														multiple
													/>
													<label htmlFor="front">Back side of Adhar</label>

													<label
														htmlFor="adharBackFile"
														className="tw-place-content-center tw-flex tw-gap-3 tw-p-1 tw-h-11 tw-w-full tw-mt-1 rounded-3"
														style={{
															color: "#de0611",
															border: "1px dashed black",
														}}
													>
														{adharCardBack &&
															adharCardBack.map((image, index) => (
																<h1
																	key={index}
																	style={{ color: "black", fontWeight: "500" }}
																>
																	{image.name}
																</h1>
															))}
													</label>
												</div>
											</div>
										</div>

										<div>
											<label
												htmlFor="card"
												className=" tw-font-semibold tw-mt-3"
											>
												Pan card
											</label>
											<div className=" tw-flex tw-gap-4 ">
												<div className=" tw-w-full">
													<input
														type="file"
														id="panFrontFile"
														style={{ display: "none" }}
														onChange={(e) => handleImage(e, "panCard")}
														multiple
													/>
													<label
														htmlFor="panFrontFile"
														placeholder="pan card"
														className="tw-place-content-center tw-flex tw-gap-3 tw-p-1 tw-h-11 tw-w-full tw-mt-1 rounded-3"
														style={{
															color: "#de0611",
															border: "1px dashed black",
														}}
													>
														{panCard &&
															panCard.map((image, index) => (
																<h1
																	key={index}
																	style={{ color: "black", fontWeight: "500" }}
																>
																	{image.name}
																</h1>
															))}
													</label>
												</div>
											</div>
										</div>
									</div>
								)}
								<div className="tw-mt-4 tw-flex tw-gap-4 tw-justify-end">
									{step > 1 && (
										<button
											type="button"
											className=" tw-font-semibold tw-bg-black tw-text-white tw-px-4 tw-py-2 rounded"
											onClick={prevStep}
										>
											Previous
										</button>
									)}
									{step < totalSteps ? (
										<button
											className="tw-font-semibold tw-text-white tw-bg-black tw-p-2 tw-w-40 tw-col-2 tw-h-11 tw-text-lg rounded-1"
											onClick={nextStep}
										>
											Save & Next
										</button>
									) : (
										<button
											className="tw-font-semibold tw-bg-black tw-text-white tw-p-2 tw-w-40 tw-col-2 tw-h-11 tw-text-lg rounded-1"
											onClick={addAgentData}
										>
											Submit
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};