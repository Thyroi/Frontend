import React from 'react';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import style from './Home.module.css';

function Home({ categories }) {
	return (
		<div className={style.container}>
			<div className={style.filters}>
				<Filters />
			</div>
			<div className={style.card}>
				{categories.map(({ id, img, name }) => {
					return <Card key={id} name={name} img={img} />;
				})}
			</div>
		</div>
	);
}

export default Home;
