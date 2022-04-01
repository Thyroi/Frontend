import './App.css';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Filters from './components/Filters/Filters';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import { Route } from 'react-router-dom';

import Search from './components/SearchBar/Search';

export default function App() {
	return (
		<div className='app'>
			<div className='top'>
				<Search />
			</div>
			<div className='left'>
				<Nav />
			</div>
			<div className='filters'>
				<Filters />
			</div>
			<div className='container'>
				<Route exact path='/add'>
					<AddNewProduct />
				</Route>
				<Route exact path='/'>
					{/* <Landing /> */}
				</Route>
			</div>
		</div>
	);
}
