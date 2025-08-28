import React, { useState, useEffect } from "react";
import PropertyList from "./PropertyList";
import "./radio.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PostDetails } from "./PostDetails";
import jsonData from "./Cityname.json";
import "./PropertyList.css";
import Nav from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import { addPropertyUrl, userProfileUrl } from "../Components/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddProperty = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [selectedState, setSelectedState] = useState("");
	const [selectedCity, setSelectedCity] = useState("");
	// const [selectedFileName, setSelectedFileName] = useState("");

	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	// const [response, setResponse] = useState("");
	// const navigate = useNavigate();

	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [propertyImage, setPropertyImage] = useState([]);
	const [address, setAddress] = useState("");
	const [size, setSize] = useState("");
	const [price, setPrice] = useState("");
	const [age, setAge] = useState("");
	const [propertyType, setPropertyType] = useState("");
	const [face, setFace] = useState("");
	const [houseType, setHouseType] = useState("");
	const [facilities, setFacilities] = useState("");
	const [furnishing, setFurnishing] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [email, setEmail] = useState("");
	const [descErr, setDescErr] = useState("");
	const [typeErr, setTypeErr] = useState("");
	const [sizeError, setSizeError] = useState("");
	const [priceError, setPriceError] = useState("");
	const [ageError, setAgeError] = useState("");
	const [mobileNoError, setMobileNoError] = useState("");
	const [addressErr, setAddressErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [propertyTypeErr, setPropertyTypeErr] = useState("");
	const [faceErr, setFaceErr] = useState("");
	const [houseTypeErr, setHouseTypeErr] = useState("");
	const [furnishingErr, setFurnishingErr] = useState("");
	const [userData, setUserData] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		const token = localStorage.getItem("agent");
		if (token) {
			const tokenArray = JSON.parse(token);
			const userRole = tokenArray[1];
			if (userRole !== "AGENT") {
				navigate("/");
			}
		} else {
			navigate("/");
		}
		setStates(jsonData.states);
		getUserData();
	}, []);

	const handleStateChange = (e) => {
		const stateName = e.target.value;
		setSelectedState(stateName);
		const selectedStateData = jsonData.states.find(
			(state) => state.name === stateName
		);
		setCities(selectedStateData ? selectedStateData.cities : []);
	};

	const handleCityChange = (e) => {
		setSelectedCity(e.target.value);
	};

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		if (checked) {
			setFacilities([...facilities, name]);
		} else {
			setFacilities(facilities.filter((item) => item !== name));
		}
	};

	const validateDesc = (desc) => {
		if (!desc.trim()) {
			setDescErr("Description is required.");
			return;
		}
		setDescErr("");
	};
	const validateType = (type) => {
		console.log(type);
		if (type === "") {
			setTypeErr("Please Select Any One Option..");
			return;
		} else {
			setTypeErr("");
		}
	};
	const validateAddress = (address) => {
		if (!address.trim()) {
			setAddressErr("Address is required.");
			return;
		}
		setAddressErr("");
	};

	const handleImage = (e) => {
		const files = e.target.files;
		const fileNames = [];
		console.log(files);

		console.log("fileNames: ", fileNames);
		for (let i = 0; i < files.length; i++) {
			fileNames.push(files[i].name);
		}
		setPropertyImage((pre) => {
			console.log([...files]);
			return [...files];
		});
		setSelectedFiles(fileNames);

		const allowedExtensions = /\.(jpg|jpeg|png)$/i;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const fileName = file.name;

			if (!allowedExtensions.test(fileName)) {
				alert("Please select files with .jpg, .jpeg, or .png extensions only.");
				e.target.value = "";
				setSelectedFiles([]);
				return;
			}

		}
	};

	const validateSize = (size) => {
		if (!size.trim()) {
			setSizeError("Size is required");
		} else if (!/^\d+$/.test(size)) {
			setSizeError("Size must be a number");
		} else {
			setSizeError("");
		}
	};

	const validatePrice = (price) => {
		if (!price.trim()) {
			setPriceError("Price is required");
		} else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
			setPriceError("Price must be a valid number");
		} else {
			setPriceError("");
		}
	};
	const validateAge = (age) => {
		setAge(age);

		if (!age.trim()) {
			setAgeError("Age is required");
		} else if (!/^\d+(\.\d{1,2})?$/.test(age)) {
			setAgeError("Age must be a in  number");
		} else {
			setAgeError("");
		}
	};
	const validateMno = (mno) => {
		if (!mno.trim()) {
			setMobileNoError("Contact No. is required");
			return false;
		} else if (!/^\d{10}$/.test(mno)) {
			setMobileNoError("Contact No. must be a 10-digit number");
			return false;
		} else {
			setMobileNoError("");
			return true;
		}
	};

	const validateEmail = (email) => {
		if (email === "") {
			setEmailErr("Email is required");
			return false;
		} else if (
			!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
		) {
			setEmailErr("Invalid email address");
			return false;
		}
		setEmailErr("");
		return true;
	};

	const validatePropertyType = (propertyType) => {
		console.log(propertyType);
		if (!propertyType || propertyType === "") {
			setPropertyTypeErr("Please select property type");
		} else {
			setPropertyTypeErr("");
		}
	};
	const validateFace = (face) => {
		console.log(face);
		if (!face || face === "") {
			setFaceErr("Please select property face");
		} else {
			setFaceErr("");
		}
	};
	const validateHouseType = (houseType) => {
		console.log(houseType);
		if (!houseType || houseType === "") {
			setHouseTypeErr("Please select House Type");
		} else {
			setHouseTypeErr("");
		}
	};
	const validateFurnishing = (furnishing) => {
		console.log(furnishing);
		if (furnishing === "") {
			setFurnishingErr("Please Select Furnishing Type");
			return;
		} else {
			setFurnishingErr("");
		}
	};


	const handleNext = () => {
		let canMoveToNextTab = true;

		switch (activeTabIndex) {
			case 0:
				if (type === "") {
					setTypeErr("Please Select Any One Option.");
					canMoveToNextTab = false;
				}
				if (!description.trim()) {
					setDescErr("Description is required.");
					canMoveToNextTab = false;
				}
				break;
			case 1:
				if (selectedFiles.length === 0) {
					alert("Please upload at least one image.");
					canMoveToNextTab = false;
				}
				break;
			case 2:
				if (!address.trim()) {
					setAddressErr("Address is required.");

					canMoveToNextTab = false;
				}
				if (!selectedState) {
					alert("Please select a state.");
					canMoveToNextTab = false;
				}
				if (!selectedCity) {
					alert("Please select a city.");
					canMoveToNextTab = false;
				}
				break;

			default:
				break;
		}

		if (canMoveToNextTab) {
			setActiveTabIndex(activeTabIndex + 1);
		}
	};

	const getUserData = async (e) => {
		try {
			const token = localStorage.getItem("user");
			const tokenArray = JSON.parse(token);
			const response = await axios.get(userProfileUrl, {
				headers: {
					Authorization: `Bearer ${tokenArray[0]}`,
				},
			});

			if (response.status === 200) {
				const data = response.data;

				setUserData(data.userData);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	};




	const addPropertyData = async () => {
		try {
			validateSize(size);
			validatePrice(price);
			validateAge(age);
			validatePropertyType(propertyType);
			validateFace(face);
			validateHouseType(houseType);
			validateFurnishing(furnishing);
			const isMobileNoValid = validateMno(mobileNo);
			const isEmailValid = validateEmail(email);

			if (
				!sizeError &&
				!priceError &&
				!ageError &&
				!propertyTypeErr &&
				!faceErr &&
				!houseTypeErr &&
				!furnishingErr &&
				isMobileNoValid &&
				isEmailValid
			) {
				const formData = new FormData();
				for (let i = 0; i < propertyImage.length; i++) {
					formData.append("propertyImage", propertyImage[i]);
				}
				formData.append("propertyType", propertyType);
				formData.append("type", type);
				formData.append("description", description);
				formData.append("address", address);
				formData.append("state", selectedState);
				formData.append("city", selectedCity);
				formData.append("size", size);
				formData.append("price", price);
				formData.append("propertyAge", age);
				formData.append("faching", face);
				formData.append("houseType", houseType);
				formData.append("facility", facilities);
				formData.append("furnishing", furnishing);
				formData.append("mobileNo", mobileNo);
				formData.append("email", email);

				const token = localStorage.getItem("agent");
				const tokenArray = JSON.parse(token);
				const responseData = await axios.post(addPropertyUrl, formData, {
					headers: {
						Authorization: `Bearer ${tokenArray[0]}`,
						"Content-Type": "multipart/form-data",
					},
				});

				if (responseData.status === 201) {
					console.log(responseData.data);
					toast.success(responseData.data.message);
					// setStates('');
					// setCities('');
					// setType('');
					// setDescription('');
					// setPropertyImage('');
					// setAddress('');
					// setSize('');
					// setPrice('');
					// setAge('');
					// setPropertyType('')
					// setFace('');
					// setHouseType('');
					// setFacilities('');
					// setFurnishing('');


					// navigate('/');
				}
			}
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) {
				toast.error(error.response.data.message);
			} else {
				toast.error("An error occurred. Please try again.");
			}
		}
	};

	const handleRadioChange = (e) => {
		setType(e.target.value);
		validateType(e.target.value);
	};

	const handleFurnisherType = (e) => {
		setFurnishing(e.target.value);
		validateFurnishing(e.target.value);
	};

	const handlePropertyTypeChange = (event) => {
		setPropertyType(event.target.value);
		validatePropertyType(event.target.value);
	};

	const handleFacing = (event) => {
		setFace(event.target.value);
		validateFace(event.target.value);
	};

	const handleBhkType = (event) => {
		setHouseType(event.target.value);
		validateHouseType(event.target.value);
	};

	return (
		<>
			<Nav />
			<PropertyList />
			<PostDetails />

			<ToastContainer position='top-right' />
			<div>
				<div
					className=" tw-h-full  tw-pb-20 lg:tw-m-16 tw-rounded-3"
					style={{ backgroundColor: "#f7f7f7" }}
				>
					<div className=" tw-mb-10 tw-p-5">
						<h1 className=" tw-text-3xl tw-font-bold tw-pl-12 tw-mt-10">
							Add New Property
						</h1>
						<p className=" tw-pl-12 tw-mt-3">We are glad to see you again!</p>
					</div>
					<div className=" tw-flex tw-place-content-center">
						<div
							className="col-lg-8 tw-shadow-lg tw-rounded-3 tw-p-4 tw-h-full lg:tw-w-[1270px] md:tw-w-full"
							style={{ backgroundColor: "#fff" }}
						>
							<div className="col-md-12 tw-mb-4">
								<nav>
									<div className="nav nav-tabs" id="nav-tab2" role="tablist">
										<button
											className={`nav-link tw-text-black ms-3 ${activeTabIndex === 0 ? "active" : ""
												}`}
											onClick={() => setActiveTabIndex(0)}
											type="button"
											data-bs-toggle="tab"
											data-bs-target="#nav-item1"
										>
											1. Description
										</button>
										<button
											className={`nav-link tw-text-black ${activeTabIndex === 1 ? "active" : ""
												}`}
											onClick={() => setActiveTabIndex(1)}
											type="button"
											data-bs-toggle="tab"
											data-bs-target="#nav-item2"
										>
											2. Media
										</button>
										<button
											className={`nav-link tw-text-black ${activeTabIndex === 2 ? "active" : ""
												}`}
											onClick={() => setActiveTabIndex(2)}
											type="button"
											data-bs-toggle="tab"
											data-bs-target="#nav-item3"
										>
											3. Location
										</button>
										<button
											className={`nav-link tw-text-black ${activeTabIndex === 3 ? "active" : ""
												}`}
											onClick={() => setActiveTabIndex(3)}
											type="button"
											data-bs-toggle="tab"
											data-bs-target="#nav-item4"
										>
											4. Detail
										</button>
									</div>
								</nav>
								{activeTabIndex === 0 && (
									<div>
										<div>
											<div>
												<h1 className=" tw-mt-8 tw-text-lg tw-font-semibold">
													Property For
												</h1>

												<div className="row tw-mt-3 tw-flex tw-gap-5 tw-p-3">
													<div className=" col-2 tw-border-2 tw-p-2 tw-rounded-2 ">
														<input
															class="form-check-input"
															type="radio"
															name="why"
															id="exampleRadios1"
															value="Sell"
															checked={type === "Sell"}
															onChange={handleRadioChange}
														/>
														<label
															class="form-check-label tw-mr-6"
															for="exampleRadios1"
														>
															Sell
														</label>
													</div>
													<div class=" col-2 tw-border-2 tw-p-2 tw-rounded-2">
														<input
															class="form-check-input"
															type="radio"
															name="why"
															id="exampleRadios2"
															value="Rent"
															checked={type === "Rent"}
															onChange={handleRadioChange}
														/>
														<label
															class="form-check-label"
															for="exampleRadios2"
														>
															Rent
														</label>
													</div>
													<p style={{ color: "red", marginBottom: "20px" }}>
														{typeErr}
													</p>
												</div>
											</div>

											<h1 className=" tw-mt-4 tw-text-lg tw-font-semibold">
												Property Description
											</h1>
											<div className=" tw-grid">
												<label className=" tw-mt-8 tw-font-semibold ">
													Description
												</label>
												<textarea
													className="tw-border-2 tw-rounded-2  tw-mt-2 tw-p-2 tw-h-56"
													value={description}
													onChange={(e) => {
														setDescription(e.target.value);
														validateDesc(e.target.value);
													}}
													placeholder="There are many variations of passages."
													required
												/>
												<p style={{ color: "red", marginBottom: "20px" }}>
													{descErr}
												</p>
											</div>
											<div className=" tw-flex tw-justify-end tw-mt-10"></div>
										</div>
									</div>
								)}
								{activeTabIndex === 1 && (
									<div>
										<div>
											<div>
												<h1 className="tw-mt-8 tw-text-lg tw-font-semibold">
													Upload photos of your property
												</h1>
												<input
													type="file"
													id="file"
													style={{ display: "none" }}
													onChange={handleImage}
													multiple
													required
												/>
												<label
													htmlFor="file"
													className="tw-place-content-center grid p-5 tw-h-full tw-w-full tw-mt-4 rounded-3"
													style={{
														color: "#de0611",
														border: "1px dashed #de0611",
													}}
												>
													<h1 className="tw-place-content-center tw-grid">
														{" "}
														<FileUploadIcon
															style={{
																height: "90px",
																width: "100px",
																color: "#ddd",
															}}
															className="border-2 rounded-3"
														/>
													</h1>
													<h1 className="tw-font-bold tw-text-lg tw-mt-3 tw-place-content-center tw-grid tw-text-black">
														Upload your Images Here
													</h1>
													{selectedFiles.map((fileName, index) => (
														<h1
															key={index}
															style={{
																color: "black",
																fontWeight: "600",
																marginLeft: "150px",
																marginTop: "5px",
															}}
														>
															{fileName}
														</h1>
													))}
													<h1
														className="tw-place-content-center tw-grid tw-font-semibold tw-mt-4"
														style={{ color: "#aaa" }}
													>
														Photos must be JPEG or PNG format and at least
														2048x768
													</h1>
													<div className="tw-place-content-center tw-grid tw-mt-8">
														<h1 className="tw-font-bold tw-border-1 tw-p-2 tw-w-40 col-2 tw-h-11 tw-text-lg tw-rounded-2 tw-text-black tw-place-content-center tw-grid">
															Browse Files
														</h1>
													</div>
												</label>
												<div className="tw-flex tw-justify-end tw-mt-10 tw-gap-3"></div>
											</div>
										</div>
									</div>
								)}
								{activeTabIndex === 2 && (
									<div>
										<div>
											<div>
												<h1 className=" tw-mt-8 tw-text-lg tw-font-semibold">
													Listing Location{" "}
												</h1>
												<div className=" tw-grid row">
													<div className=" col-md-12 tw-grid">
														<label
															htmlFor="address"
															className=" tw-mt-5 tw-font-semibold"
														>
															Address
														</label>
														<input
															type="text"
															id="address"
															className="tw-border-2 tw-p-3 tw-rounded-2  tw-mt-2 tw-h-12 tw-w-full "
															onChange={(e) => {
																setAddress(e.target.value);
																validateAddress(e.target.value);
															}}
															placeholder="Address of your proprerty"
															required
														/>
														<p style={{ color: "red", marginBottom: "20px" }}>
															{addressErr}
														</p>
													</div>
												</div>
												<div className=" row">
													<div className=" col-md-6 tw-grid">
														<label
															htmlFor="address"
															className=" tw-mt-5 tw-font-semibold"
														>
															State
														</label>
														<select
															value={selectedState}
															onChange={handleStateChange}
															className=" tw-h-12 tw-border-2 tw-rounded-2 tw-p-2 tw-mt-2"
														>
															<option value="">Select a state</option>
															{states.map((state) => (
																<option key={state.name} value={state.name}>
																	{state.name}
																</option>
															))}
														</select>
													</div>
													<div className=" col-md-6 tw-grid">
														<label
															htmlFor="address"
															className=" tw-mt-5 tw-font-semibold"
														>
															City
														</label>
														<select
															value={selectedCity}
															onChange={handleCityChange}
															className=" tw-h-12 tw-border-2 tw-rounded-2 tw-p-2 tw-mt-2"
														>
															<option value="">Select a city</option>
															{cities.map((city) => (
																<option key={city} value={city}>
																	{city}
																</option>
															))}
														</select>
													</div>
													<div className=" tw-mt-8">
														<iframe
															src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238133.18800756568!2d72.65748445425247!3d21.159120355995483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1705687115050!5m2!1sen!2sin"
															allowfullscreen=""
															loading="lazy"
															referrerpolicy="no-referrer-when-downgrade"
															className=" tw-w-full"
															style={{ height: "300px" }}
														></iframe>
													</div>
													<div className=" tw-flex tw-justify-end tw-mt-10 tw-gap-3">

													</div>
												</div>
											</div>
										</div>
									</div>
								)}
								{activeTabIndex === 3 && (
									<div>
										<div>
											<div>
												<h1 className=" tw-mt-8 tw-text-lg tw-font-semibold">
													Listing details
												</h1>
											</div>
											<div className="row tw-mt-5">
												<div className="col-lg-4 tw-grid">
													<label htmlFor="sqft" className="tw-font-semibold">
														Square feet
													</label>
													<input
														type="text"
														id="sqft"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2"
														placeholder="Size in ft. ex:370"
														value={size}
														onChange={(e) => {
															setSize(e.target.value);
															validateSize(e.target.value);
														}}
													/>
													<p style={{ color: "red" }}>{sizeError}</p>
												</div>
												<div className="col-lg-4 tw-grid">
													<label htmlFor="price" className="tw-font-semibold">
														Price
													</label>
													<input
														type="text"
														id="price"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2"
														placeholder="Enter the price"
														value={price}
														onChange={(e) => {
															setPrice(e.target.value);
															validatePrice(e.target.value);
														}}
													/>
													<p style={{ color: "red" }}>{priceError}</p>
												</div>

												<div className="col-lg-4 tw-grid">
													<label htmlFor="age" className="tw-font-semibold">
														Age
													</label>
													<input
														type="text"
														id="age"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2"
														placeholder="Enter the price"
														value={age}
														onChange={(e) => {
															setAge(e.target.value);
															validateAge(e.target.value);
														}}
													/>
													<p style={{ color: "red" }}>{ageError}</p>
												</div>
											</div>

											<div className="row tw-mt-5">
												<div className="col-lg-4 tw-grid">
													<label
														htmlFor="propertyType"
														className="tw-font-semibold"
													>
														Property Type
													</label>
													<select
														id="propertyType"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2 tw-w-full"
														required=""
														data-error="Please select property type"
														value={propertyType}
														onChange={handlePropertyTypeChange}
													>
														<option value="" disabled>
															Select Property Type
														</option>
														<option value="Independent House">
															Independent House
														</option>
														<option value="Villa">Villa</option>
														<option value="Appartment">Apartment</option>
														<option value="Affordable House">
															Affordable House
														</option>
													</select>
													<p style={{ color: "red" }}>{propertyTypeErr}</p>
												</div>
												<div className="col-lg-4 tw-grid">
													<label htmlFor="facing" className="tw-font-semibold">
														Facing
													</label>
													<select
														id="facing"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2 tw-w-full"
														required=""
														data-error="Please select property face"
														value={face}
														onChange={handleFacing}
													>
														<option value="" selected disabled>
															Select Property Facing
														</option>
														<option value="East">East</option>
														<option value="West">West</option>
														<option value="North">North</option>
														<option value="South">South</option>
													</select>
													<p style={{ color: "red" }}>{faceErr}</p>
												</div>
												<div className="col-lg-4 tw-grid">
													<label
														htmlFor="bhk_type"
														className="tw-font-semibold"
													>
														BHK_Type
													</label>
													<select
														id="bhk_type"
														className="tw-border-2 tw-rounded-2 tw-h-11 tw-p-2 tw-mt-2 tw-w-full"
														required=""
														data-error="Please select property type"
														value={houseType}
														onChange={handleBhkType}
													>
														<option value="" selected disabled>
															Select BHK_Type
														</option>
														<option value="1 BHK">1 BHK</option>
														<option value="2 BHK">2 BHK</option>
														<option value="3 BHK">3 BHK</option>
														<option value="3+ BHK">3+ BHK</option>
													</select>
													<p style={{ color: "red" }}>{houseTypeErr}</p>
												</div>
											</div>

											<div className="row tw-mt-10">
												<h1 className="tw-font-semibold">Facilities</h1>
											</div>
											<div className="row tw-grid  md:tw-flex tw-space-y-5 tw-p-3 tw-justify-evenly">
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2 tw-pl-7 md:tw-mt-5">
													<input
														className="form-check-input"
														type="checkbox"
														name="parking"
														id="parking"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="parking"
													>
														Parking
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2  tw-pl-7 ">
													<input
														className="form-check-input"
														type="checkbox"
														name="lift"
														id="lift"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="lift"
													>
														Lift
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2  tw-pl-7">
													<input
														className="form-check-input"
														type="checkbox"
														name="gas-pipeline"
														id="gas-pipeline"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="gas-pipeline"
													>
														Gas Pipeline
													</label>
												</div>
											</div>
											<div className="row  tw-grid  md:tw-flex tw-space-y-5 tw-p-3 tw-justify-evenly">
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2 tw-pl-7 md:tw-mt-5">
													<input
														className="form-check-input"
														type="checkbox"
														name="garden"
														id="garden"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="garden"
													>
														Garden
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2  tw-pl-7">
													<input
														className="form-check-input"
														type="checkbox"
														name="security"
														id="security"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="security"
													>
														24x7 Security
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2  tw-pl-7">
													<input
														className="form-check-input"
														type="checkbox"
														name="inverter"
														id="inverter"
														onChange={handleCheckboxChange}
													/>
													<label
														className="form-check-label tw-pl-3"
														htmlFor="inverter"
													>
														Inverter
													</label>
												</div>
											</div>

											<div className="row tw-mt-10">
												<h1 className=" tw-font-semibold">Furnishing</h1>
											</div>
											<div className="row  tw-grid  md:tw-flex tw-space-y-4 tw-p-3 tw-justify-evenly  ">
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2 tw-pl-5 md:tw-mt-5">
													<input
														className="form-check-input"
														type="radio"
														name="amenity"
														id="parking"
														value="Unfurnished"
														checked={furnishing === "Unfurnished"}
														onChange={handleFurnisherType}
													/>

													<label
														className="form-check-label tw-pl-2"
														htmlFor="parking"
													>
														Un-Furnished
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2 tw-pl-5">
													<input
														className="form-check-input"
														type="radio"
														name="amenity"
														id="lift"
														value="Semi Furnished"
														checked={furnishing === "Semi Furnished"}
														onChange={handleFurnisherType}
													/>
													<label
														className="form-check-label tw-pl-2"
														htmlFor="lift"
													>
														Semi-Furnished
													</label>
												</div>
												<div className="tw-border-2 tw-p-2 tw-rounded-2 col-md-2 tw-pl-5">
													<input
														className="form-check-input"
														type="radio"
														name="amenity"
														id="gas-pipeline"
														value="Full Furnished"
														checked={furnishing === "Full Furnished"}
														onChange={handleFurnisherType}
													/>
													<label
														className="form-check-label tw-pl-2"
														htmlFor="gas-pipeline"
													>
														Full-Furnished
													</label>
												</div>
											</div>
											<p style={{ color: "red" }}>{furnishingErr}</p>

											<div className="row tw-mt-3">
												<div className="col-md-6 tw-grid">
													<label htmlFor="contact" className="tw-font-semibold">
														Contact No.
													</label>


													<input
														type="text"
														name="mobileNo"
														id="mobileNo"
														className="form-control"
														value={mobileNo}
														onChange={(e) => {
															setMobileNo(e.target.value);
															validateMno(e.target.value);
														}}
														placeholder="Contact No."
														required
													/>
													<p style={{ color: "red" }}>{mobileNoError}</p>

												</div>
												<div className="col-md-6 tw-grid">
													<label htmlFor="email" className=" tw-font-semibold">
														Email
													</label>

													<input
														type="email"
														name="email"
														id="email"
														className="form-control"
														value={email}
														onChange={(e) => {
															setEmail(e.target.value);
															validateEmail(e.target.value);
														}}
														placeholder="Email"
														required
													/>
													<p style={{ color: "red" }}>{emailErr}</p>

												</div>
											</div>
											<div className=" tw-flex tw-justify-end tw-mt-10 gap-3"></div>
										</div>
									</div>
								)}
								<div className=" tw-flex tw-justify-end tw-mt-10 gap-3">
									{activeTabIndex > 0 && (
										<button
											className=" tw-font-semibold tw-bg-black tw-text-white tw-p-2 tw-w-40 col-2 tw-h-11 tw-text-lg tw-rounded-1"
											onClick={() => setActiveTabIndex(activeTabIndex - 1)}
										>
											Previous
										</button>
									)}
									{activeTabIndex < 3 && (
										<button
											className=" tw-font-semibold tw-bg-black tw-text-white tw-p-2 tw-w-40 col-2 tw-h-11 tw-text-lg tw-rounded-1"
											onClick={handleNext}
										>
											Next
										</button>
									)}
									{activeTabIndex === 3 && (
										<button
											className=" tw-font-semibold tw-bg-black tw-text-white tw-p-2 tw-w-40 col-2 tw-h-11 tw-text-lg tw-rounded-1"
											onClick={addPropertyData}
										>
											Add
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
