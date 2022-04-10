import React from 'react';
import style from './Dropdown.module.css';

//options=[{id:"id", name:"name"},{id:"id", name:"name"},{id:"id", name:"name"},...]

export default function Dropdown({ placeHolder, options, handler }) {
	return (
		<div className={style.dropdown}>
			<button
				className={style.dropdown_button}
				onClick={(e) => {
					e.preventDefault();
				}}>
				{placeHolder}
			</button>
			<div className={style.dropdown_content}>
				{options.map(({ id, name }) => {
					return (
						<button
							key={id}
							name={placeHolder.toLowerCase()}
							value={id}
							onClick={handler}>
							{name.split('_').join(' ')[0].toUpperCase()+name.split('_').join(' ').slice(1)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
