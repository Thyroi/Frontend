import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import styles from './AddNewProduct.module.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getSelectorsCat, addProduct, getInfo } from '../../actions';
import { storage } from '../../Assets/firebase';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

export default function AddNewProduct() {
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const dispatch = useDispatch();
	const categorias = useSelector((state) => state.categories);
	const productos = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getSelectorsCat());
		dispatch(getInfo());
	}, [dispatch]);

	let mujeres = categorias?.women;
	let hombres = categorias?.men;

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		
	} = useForm({
		defaultValues: {
			variants: [
				{ ColorName: 'Blanco', Stocks: { L: 'a ver', M: 'a ver' } },
			],
		},
		mode: 'all',
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'variants',
	});
	const onSubmit = (data) => {
		data.collection = parseInt(data.collection);
		data.price = parseFloat(data.price);
		data.categories = [data.categories];
		data.default_image = imageUrls[0];
		data.id_product = productos.length + 1;
		data.variants[0].ProductImages = [imageUrls[0]];
		data.variants[0].Stocks.L = parseInt(data.variants[0].Stocks.L);
		data.variants[0].Stocks.M = parseInt(data.variants[0].Stocks.M);
		data.variants[0].Stocks.S = parseInt(data.variants[0].Stocks.S);
		data.variants[0].Stocks.XL = parseInt(data.variants[0].Stocks.XL);

		for (let i = 0; i < imageUrls.length; i++) {
			data.variants[i].SwatchImage = imageUrls[i];
		}
		dispatch(addProduct({ product: data }));
		//console.log({product: data})
		reset();
	};

	const uploadFile = (e) => {
		e.preventDefault(e);
		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});
	};
	//console.log(errors)
	return (
		<div className={styles.AddProductContainer}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.left}>
					<input
						type='text'
						name='name'
						autoComplete='off'
						placeholder='Name'
						ref={register({
							required: true,
							pattern: {
								value: /^[^0-9]+$/,
							}
						  })}
					/>
					{errors.name && (
						<span className={styles.error}>
							This field is mandatory and can only contain letters
						</span>
					)}

					<input
						type='text'
						name='brand'
						autoComplete='off'
						placeholder='Brand'
						ref={register({ required: true, typeOf: 'number' })}
					/>
					{errors.brand && (
						<span className={styles.error}>
							This field is mandatory
						</span>
					)}

					<select
						name='categories'
						ref={register({ required: true })}>
						<option value=''>Select categories</option>
						{mujeres?.map((c) => (
							<option key={c.id} value={c.name}>
								{c.name}
							</option>
						))}
						{hombres?.map((c) => (
							<option key={c.id} value={c.name}>
								{c.name}
							</option>
						))}
					</select>
					{errors.categories && (
						<span className={styles.error}>
							You should select a category
						</span>
					)}

					<select
						className={styles.collection}
						name='collection'
						ref={register({ required: true })}>
						<option value=''>Select Collection</option>
						<option value='1'>Summer</option>
						<option value='2'>Winter</option>
						<option value='3'>Autumn</option>
						<option value='4'>Spring</option>
					</select>
					{errors.collection && (
						<span className={styles.error}>
							This should select a collection
						</span>
					)}

					<input
						type='text'
						name='price'
						autoComplete='off'
						placeholder='Price'
						ref={register({
							required: true,
							pattern: {
								value: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
							}
						  })}
						onKeyPress={(e) => {
							if (e.key === "e" || e.key === "-") {
							  e.preventDefault();
							}
						  }}
					/>
					{errors.price && (
						<span className={styles.error}>
							This field is required
						</span>
					)}
					<div className={styles.offer}>
						<span htmlFor='is_offer'>On Sale?</span>
						<input
							style={{ width: '1rem' }}
							type='checkbox'
							name='is_offer'
							ref={register}
						/>
					</div>

					<textarea
						name='description'
						placeholder='Description'
						ref={register({ required: true })}
					/>
				</div>
						{errors.description && (
						<span className={styles.error}>
							This field is required
						</span>
						)}
				<div className={styles.center}>
					<ul>
						{fields.map((item, index) => {
							return (
								<li key={item.id}>
									<input
										ref={register({
											required: true,
											pattern: {
												value: /^[^0-9]+$/,
											}
										  })}
										placeholder='Color'
										name={`variants[${index}].ColorName`}

									/>
									{errors.variants && (
										<span className={styles.error}>
											This field is required and can contain only letters
										</span>
									)}

									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.S`}
										control={control}
										defaultValue=''
										placeholder='Select Stock for Size S'
										
									/>
										
									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.M`}
										control={control}
										defaultValue=''
										placeholder='Select Stocks for Size M'
									/>
									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.L`}
										control={control}
										defaultValue=''
										placeholder='Select Stocks for Size L'
									/>
									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.XL`}
										control={control}
										defaultValue=''
										placeholder='Select Stocks for Size XL'
									/>

									<input
										type='file'
										name={`variants[${index}].SwatchImage`}
										onChange={(event) => {
											setImageUpload(
												event.target.files[0]
											);
										}}
									/>
									<button onClick={uploadFile}>
										Upload Image
									</button>
									<button
										type='button'
										onClick={() => remove(index)}>
										Delete
									</button>
								</li>
							);
						})}
					</ul>
					<section>
						<button
							type='button'
							onClick={() => {
								append({
									color: 'Select Color',
									Stocks: 'SelectStocks',
								});
							}}>
							Add color
						</button>
					</section>
				</div>

				<div className={styles.right}>
					{imageUrls.map((url) => {
						return <img key={url} src={url} alt={url} />;
					})}
				</div>
				<div className={styles.bottom}>
					<input type='submit' />
				</div>
			</form>
		</div>
	);
}
