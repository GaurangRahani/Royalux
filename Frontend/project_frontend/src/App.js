import React from 'react'
import Nav from './User/Nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './User/Home/Home'
// import Features from './User/Components/Features'
import Contact from './User/Contact/Contact'
import About from './User/About/About'
// import Feedback from './User/Components/Feedback'
import UserRegister from './User/Auth/UserRegister'
import UserLogin from './User/Auth/UserLogin'
import UserForgotPassword from './User/Auth/UserForgotPassword'
import { Footer } from './User/Footer/Footer'
import { UserResetPassword } from './User/Auth/UserResetPassword'
import Dashboard from './Admin/Admin_Components/AdminDashboard/Dashboard'
// import Seller from './Admin/Admin_Components/Seller'
// import Buyer from './Admin/Admin_Components/Buyer'
import User_Queries from './Admin/Admin_Components/AdminUserQueries/User_Queries'
import HomeSlide from './User/Home/HomeSlide'
import TotalProperty from './Admin/Admin_Components/AdminTotalProperty/TotalProperty'
import MoreDetails from './Admin/Admin_Components/AdminTotalProperty/MoreDetails'
// import { PropertyList } from './User/AddProperty/PropertyList'
// import { PostDetails } from './User/AddProperty/PostDetails'
import { AddProperty } from './User/AddProperty/AddProperty'
// import ReadMoreDetails from './User/Buy/ReadMoreDetails'
import Buy from './User/Buy/Buy';
import Feedback from './User/Feedback/Feedback';
// import AdminLogin from './Admin/Auth/AdminLogin'
// import Demo from './User/Components/Demo'
import VerifyEmail from './User/Auth/VerifyEmail'
import { PropertyHistory } from './User/Status/PropertyHistory'
import UserEmail from './User/Auth/UserEmail'
import { AgentRegister } from './Agent/AgentRegister'
import Rent from './User/Rent/Rent'
import AdminStatus from './Admin/Admin_Components/AdminStatus/AdminStatus'
import PrivateRoute from './User/Router/privateRoute'
// import { TotalAgent } from './Admin/Admin_Components/TotalAgent'
import Property from './Agent/Property/Property'
// import MoreDetail from './Agent/Property/ReadMore'
import ReadMore from './Agent/Property/ReadMore'
import AdminUserDetails from './Admin/Admin_Components/AdminUser/AdminUserDetails'
import AdminAgentDetails from './Admin/Admin_Components/AdminAgent/AdminAgentDetails'
import TotalRentProperty from './Admin/Admin_Components/AdminRent/TotalRentProperty'
import TotalSellProperty from './Admin/Admin_Components/AdminSell/TotalSellProperty'
import PropertyListMoreDetails from './User/AddProperty/PropertyListMoreDetails'
import BuyMoreDetails from './User/Buy/BuyMoreDetails'
import SellMoreDetails from './Admin/Admin_Components/AdminSell/SellMoreDetails'
import RentDetails from './User/Rent/RentDetails'
import RentMoreDetails from './Admin/Admin_Components/AdminRent/RentMoreDetails'


const App = () => {
	return (
		<div>

			<Routes>
				<Route exact path='/' element={
					// <PrivateRoute>
					<Home />
					// </PrivateRoute>
				}></Route>
				<Route exact path='/Buy' element={<Buy />} />
				<Route exact path='/Rent' element={<Rent />} />
				<Route exact path='/AddProperty' element={<AddProperty />} />
				<Route exact path='/Buy/BuyMoreDetails' element={<BuyMoreDetails />} />
				<Route exact path='/Rent/RentDetails' element={<RentDetails />} />
				<Route exact path='/AddProperty/PropertyListMoreDetails' element={<PropertyListMoreDetails />} />

				<Route exact path='/PropertyHistory' element={<PropertyHistory />}></Route>
				<Route exact path='/Contact' element={<Contact />}></Route>
				<Route exact path='/About' element={<About />}></Route>
				<Route exact path='/Feedback' element={<Feedback />}></Route>

				<Route exact path='/UserEmail' element={<UserEmail />}></Route>
				<Route exact path='/UserRegister' element={<UserRegister
				/>}></Route>
				<Route exact path='/VerifyEmail' element={<VerifyEmail
				/>}></Route>
				<Route exact path='/login' element={<UserLogin />}></Route>
				<Route exact path='/UserForgotPassword' element={<UserForgotPassword />}></Route>
				<Route exact path='/UserResetPassword' element={<UserResetPassword />}></Route>

				{/* <Route exact path='/Admin/' element={<UserLogin />}></Route> */}
				<Route exact path='/Admin/Dashboard' element={<Dashboard />}></Route>

				<Route exact path='/Admin/TotalProperty' element={<TotalProperty />}></Route>
				<Route exact path='/Admin/MoreDetails' element={<MoreDetails />}></Route>

				<Route exact path='/Admin/TotalRentProperty' element={<TotalRentProperty />}></Route>
				<Route exact path='/Admin/RentMoreDetails' element={<RentMoreDetails />}></Route>

				<Route exact path='/Admin/TotalSellProperty' element={<TotalSellProperty />}></Route>
				<Route exact path='/Admin/SellMoreDetails' element={<SellMoreDetails />}></Route>

				<Route exact path='/Admin/Status' element={<AdminStatus />}></Route>

				<Route exact path='/Admin/UserQueries' element={<User_Queries />}></Route>

				<Route exact path='/Admin/AdminUserDetails' element={<AdminUserDetails />}></Route>

				<Route exact path='/Admin/AdminAgentDetails' element={<AdminAgentDetails />}></Route>


				<Route exact path='/Agent' element={<AgentRegister />}></Route>
				<Route exact path='/Agent/Property' element={<AddProperty />}></Route>
				{/* <Route exact path='/Agent/Property' element={<Property />}></Route> */}
				<Route exact path='/agent/Property/ReadMore' element={<ReadMore />} />

			</Routes>



		</div>
	)
}

export default App;