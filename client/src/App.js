import './App.css';
import { Route, Switch } from 'react-router-dom';

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

export default function App() {
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
						<Route exact path='/Products' component={Products} />
						<Route exact path='/Cart' component={Cart} />
						<Route
							exact
							path='/Detail/:id'
							component={Product_detail}
						/>
						<Route exact path='/pay' component={Main} />
						<Route exact path='/' component={Landing} />
					</div>
				</div>
			</Route>
		</Switch>
	);
}
