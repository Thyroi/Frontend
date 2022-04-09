import React, { useState } from 'react';
import styles from './ImgGallery.module.css';

export default function Slider({ images }) {
	const [stateIndex, setStateIndex] = useState(0);

	function nextSlide(e) {
		e.preventDefault();
		setStateIndex(stateIndex + 1);
	}
	function prevSlide(e) {
		e.preventDefault();
		setStateIndex(stateIndex - 1);
	}

	return (
		<div className={styles.container}>
			<div className={styles.prev}>
				<button
					
					onClick={(e) => prevSlide(e)}
					disabled={!stateIndex}>
					{'<<'}
				</button>
			</div>

			<div className={styles.imageContainer}>
				{images?.map((image, index) => {
					return (
						<div
							key={image?.id}
							className={
								stateIndex === index
									? styles.slide_active
									: styles.slide
							}>
							<img src={image?.image} alt='' />
						</div>
					);
				})}
			</div>

			<div className={styles.next}>
				<button
	
					onClick={(e) => nextSlide(e)}
					disabled={stateIndex === images?.length - 1}>
					{'>>'}
				</button>
			</div>
		</div>
	);
}
