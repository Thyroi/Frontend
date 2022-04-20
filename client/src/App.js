import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { saveCart } from './utils/utils';
import AddCategory from './components/AddCategory/AddCategory';
import Offers from './components/Offers/Offers';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Main from './components/MercadoPago/Main';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Search from './components/SearchBar/Search';
import LogInTop from './components/LogIn/LogInTop';
import LogIn from './components/LogIn/LogInMain';
import LogInAdmin from './components/LogInAdmin/LogInAdmin';
import Products from './components/Products/Products';
import Product_detail from './components/Product_detail/Product_detail';
import Cart from './components/Cart/Cart';
import Notification from './components/Notification/Notification';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import Form from './components/Form/Form';
import SignUp from './components/SignUp/SignUp';
import SignUpGoogle from './components/SignUp/SignUpGoogle';
import ClientProfile from './components/Client_profile/Client_profile';
import OrderDetails from './components/AdminDashBoard/OrderDetails';
import Orders from './components/Orders/Orders';
import Wishlist from './components/WishList/WishList';
import AdminProfile from './components/AdminProfile/AdminProfile';
import Favorite from './components/Favorite/Favorite';
import Users from './components/Users/Users';
import UpdateProduct from './components/AddNewProduct/UpdateProduct';

export default function App() {
	const location = useLocation();

	var products = useSelector((state) => state.products);
	var allproducts = useSelector((state) => state.allproducts);
	var loggedInAdmin = useSelector((state) => state.loggedInAdmin);
	var [filtrado, setFiltrado] = useState('All');

	const cart = useSelector((state) => state?.cart);
	const client = useSelector((state) => state?.loggedInClient);
	const rememberMe = useSelector((state) => state.rememberMe);

	useEffect(() => {
		rememberMe
			? localStorage.setItem('loggedInClient', JSON.stringify(client))
			: localStorage.removeItem('loggedInClient');
	}, [client]);

	/* useEffect(() => {
		saveCart(client?.phone, cart);
	}, [cart]); */

	if (location.pathname === '/') {
		return <Landing />;
	}
	return (
		<Switch>
			<Route exact path='/login' component={LogIn} />
			<Route exact path='/loginadmin' component={LogInAdmin} />
			<Route
				exact
				path='/resetpassword/:phone'
				component={ResetPassword}
			/>

			<Route path='/'>
				<div className='app'>
					<div className='left'>
						<Nav />
					</div>

					<div className='top'>
						<div className='topSearch'>
							{location.pathname === '/home' && (
								<Search
									data={products}
									allData={allproducts}
									filtrado={filtrado}
								/>
							)}
						</div>
						<div className='topLogin'>
							<LogInTop />
							<Notification />
						</div>
					</div>

					<div className='container'>
						{loggedInAdmin.user_name && (
							<>
								<Route
									exact
									path='/addnewproduct'
									component={AddNewProduct}
								/>
								<Route
									exact
									path='/addnewproduct/addcategory'
									component={AddCategory}
								/>
								<Route
									exact
									path='/updateProducto/:id'
									component={UpdateProduct}
								/>
								
								<Route
									exact
									path='/admindashboard'
									component={AdminProfile}
								/>

								<Route
									exact
									path='/admindashboard/users'
									component={Users}
								/>
								<Route
									exact
									path='/admindashboard/orders'
									component={AdminDashBoard}
								/>

								<Route
									exact
									path='/admindashboard/orders/:id'
									component={OrderDetails}
								/>

								<Route
									exact
									path='/admindashboard/offers'
									component={Offers}
								/>
							</>
						)}
						<Route
							exact
							path='/home'
							component={() => (
								<Products
									filtrado={filtrado}
									filtradoOnChange={setFiltrado}
								/>
							)}
						/>

						<Route exact path='/cart' component={Cart} />
						<Route exact path='/cart/pay' component={Main} />
						<Route
							exact
							path='/products/:id'
							component={Product_detail}
						/>
						<Route exact path='/form' component={Form} />
						<Route exact path='/signup' component={SignUp} />
						<Route
							exact
							path='/signupgoogle'
							component={SignUpGoogle}
						/>
						<Route
							exact
							path='/client/profile'
							component={ClientProfile}
						/>

						<Route exact path='/orders' component={Orders} />
						<Route exact path='/lists/:id' component={Wishlist} />
						<Route exact path='/favorites' component={Favorite} />
					</div>
				</div>
			</Route>
		</Switch>
	);
}
