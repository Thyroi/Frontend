import './App.css';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import { Route } from 'react-router-dom';
import Search from './components/SearchBar/Search';
import Home from './components/Home/Home';

export default function App() {
	return (
		<div className='app'>
			<div className='appName'>Shop</div>
			<div className='top'>
				<div className='searchBar'>
					<Search />
				</div>
				<div className='login'>
					{/*Acá va <Login/>, cuando esté. Revisar hoja de estilos  */}
				</div>
			</div>
			<div className='left'>
				<Nav />
			</div>
			<div className='container'>
				<Home />
				<Route exact path='/AddNewProduct'>

					<AddNewProduct />
				</Route>
				<Route exact path='/'>
					<Landing />
				</Route>
			</div>
		</div>
	);
}
