import './App.css';
import { Route, useLocation } from 'react-router-dom';

import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Search from './components/SearchBar/Search';
import LogInTop from './components/LogIn/LogInTop';
import LogIn from './components/LogIn/LogInMain';
import Products from './components/Products/Products';
import Product_detail from './components/Product_detail/Product_detail';
import Cart from "./components/Cart/Cart";

export default function App() {
  const location = useLocation();
  
  if(location.pathname === '/LogIn'){
    return <Route exact path='/LogIn' component={LogIn} />
    
  }

	return (
		<div className='app'>
			<div className='appName'>Shop</div>
			<div className='top'>
				<div className='searchBar'>
					<Search />
				</div>
				<div className='login'>
					<LogInTop />
				</div>
			</div>
			<div className='left'>
				<Nav />
			</div>
			<div className='container'>
				<Route exact path='/AddNewProduct' component={AddNewProduct} />
				<Route exact path='/Products' component={Products} />
        <Route exact path='/Cart' component={Cart} />
        <Route exact path='/Detail/:id' component={Product_detail} />
				<Route exact path='/' component={Landing} />
			</div>
		</div>
	);
}
