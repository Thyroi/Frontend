import './App.css';
import { Route } from 'react-router-dom';
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

export default function App() {
	return (
		<div className='app'>
			<Route exact path='/LogIn' component={LogIn} />
			<Route path='/'>
				<div className='appName'></div>

				<div className='top'>
					<Search />
					<LogInTop />
					<Notification />
				</div>
				<div className='left'>
					<Nav />
				</div>
				<div className='container'>
					<Route exact path='/' component={Landing} />
					<Route exact path='/add' component={AddNewProduct} />
					<Route exact path='/products' component={Products} />
					<Route exact path='/AdminDashBoard' component={AdminDashBoard} />
					<Route
						exact
						path='/products/:id'
						component={Product_detail}
					/>
					<Route exact path='/cart' component={Cart} />
					<Route exact path='/cart/pay' component={Main} />
				</div>
			</Route>
		</div>
	);
}