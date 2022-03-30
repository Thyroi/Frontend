import './App.css';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Filters from './components/Filters/Filters';
import Nav from './components/Nav/Nav';

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
				<AddNewProduct />
			</div>
		</div>
	);
}
