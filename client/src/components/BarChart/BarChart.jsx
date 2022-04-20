import React from 'react';
import style from './BarChart.module.css';

function BarChart({ monthlyRev }) {
	return (
		<div className={style.container}>
			{monthlyRev?.map(({ month, revenue }) => {
				return (
					<div className={style.bar} key={month}>
						<span
							className={style.barRevTxt}>{`$${revenue}k`}</span>
						<span
							className={style.barRev}
							style={{
								height: `${revenue}px`,
							}}></span>
						<span className={style.barMon}>{month}</span>
					</div>
				);
			})}
		</div>
	);
}

export default BarChart;
