import React from 'react';
import style from './Products.module.css';
import Filters from '../Filters/Filters';
import data from '../../Assets/Products.json';
import Card from '../Card/Card';

function Products() {
	return (
		<div className={style.container}>
			<div className={style.filters}>
				<Filters />
			</div>
			<div className={style.cards}>
				{data.map((d) => {
					return (
						<div key={d.id_product}>
							<Card data={d} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Products;
