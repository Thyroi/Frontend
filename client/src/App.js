import './App.css';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Filters from './components/Filters/Filters';

import Search from './components/SearchBar/Search';

export default function App() {
	return (
		<div className='app'>
			<div className='top'><Search/></div>
			<div className='left'>Nav</div>
			<div className='container'>
				<Filters/>
				<AddNewProduct/>
			</div>
		</div>
	);
}
