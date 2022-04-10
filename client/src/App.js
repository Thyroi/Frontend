import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

export default function App() {
	const location = useLocation();
	if (location.pathname === '/') {
		return <Landing />;
	}
	return (
		<Switch>
			<Route exact path='/LogIn' component={LogIn} />

			<Route path='/'>
				<div className='app'>
					{/* <div className="appName">Shop</div> */}
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
							path='/AddNewProduct'
							component={AddNewProduct}
						/>
						{/* <Route exact path='/products' component={Products} /> */}
						<Route exact path='/home' component={Products} />
						{/* //para que funcione el home */}
						<Route
							exact
							path='/AdminDashBoard'
							component={AdminDashBoard}
						/>
						<Route exact path='/Cart' component={Cart} />
						<Route exact path='/cart/pay' component={Main} />
						<Route
							exact
							path='/products/:id'
							component={Product_detail}
						/>
						<Route exact path='/Form' component={Form} />
						{/* <Route exact path="/" component={Landing} /> */}
						<Route exact path='/signup' component={SignUp} />
						<Route
							exact
							path='/signupgoogle'
							component={SignUpGoogle}
						/>
					</div>
				</div>
			</Route>
			<Redirect to='/home' />
		</Switch>
	);
}
