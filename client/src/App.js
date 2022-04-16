import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { saveCart } from './utils/utils';

import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Main from './components/MercadoPago/Main';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Search from './components/SearchBar/Search';
import LogInTop from './components/LogIn/LogInTop';
import LogIn from './components/LogIn/LogInMain';
import Products from './components/Products/Products';
import Product_detail from './components/Product_detail/Product_detail';
import Cart from './components/Cart/Cart';
import Notification from './components/Notification/Notification';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import Form from './components/Form/Form';
import SignUp from './components/SignUp/SignUp';
import SignUpGoogle from './components/SignUp/SignUpGoogle';
import Alert from './components/Notification/Alert';
import iFrame from './components/iFrame/iFrame';
import ClientProfile from './components/Client_profile/Client_profile';
import OrderDetails from './components/AdminDashBoard/OrderDetails';
import Orders from './components/Orders/Orders';
import Wishlist from './components/WishList/WishList';


export default function App() {
	const location = useLocation();

	const cart = useSelector((state) => state?.cart);
	const client = useSelector((state) => state?.loggedInClient);
	useEffect(() => {
		saveCart(client?.phone, cart);
	}, [cart]);

	if (location.pathname === '/') {
		return <Landing />;
	}
	return (
		<Switch>
			<Route exact path='/login' component={LogIn} />
			<Route exact path='/alert' component={Alert} />
			<Route exact path='/iframe' component={iFrame} />

			<Route path='/'>
				<div className='app'>
					<div className='left'>
						<Nav />
					</div>

					<div className='top'>
						<Search />
						<LogInTop />
						<Notification />
					</div>

					<div className='container'>
						<Route
							exact
							path='/addnewproduct'
							component={AddNewProduct}
						/>

						<Route
							exact
							path='/admindashboard/:id'
							component={OrderDetails}
						/>
						<Route
							exact
							path='/admindashboard'
							component={AdminDashBoard}
						/>

						<Route exact path='/home' component={Products} />

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
            			<Route
            			  exact
            			  path='/orders'
            			  component={Orders}
            			/>
						<Route exact path='/lists/:id' component={Wishlist}/>

					</div>
				</div>
			</Route>

			<Redirect to='/home' />
		</Switch>
	);
}
