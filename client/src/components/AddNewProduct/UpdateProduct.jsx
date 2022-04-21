import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import styles from './AddNewProduct.module.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getSelectorsCat, updateProduct, getInfo, getById } from '../../actions';
import { storage } from '../../Assets/firebase';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    const {id} = useParams()
    
    const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const [copyUrls, setCopyUrls] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();
	const categorias = useSelector((state) => state.categories);
    const product = useSelector((state) => state.details)
	const productos = useSelector((state) => state.products);
	const nested = useSelector((state) => state.nested)

	useEffect(() => {
		dispatch(getSelectorsCat());
		dispatch(getInfo(nested));
        dispatch(getById(product))
	}, [dispatch]);

   
	// let mujeres = categorias?.women;
	// let hombres = categorias?.men;

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
        data.id_product = parseInt(product?.id_product)
		data.price = parseFloat(data?.price);
		//data.variants[0].ProductImages = product?.variants[0]?.ProductImages
		data.variants[0].SwatchImage  = product?.variants[0]?.SwatchImage
		data.default_image = product?.default_image
		if(imageUrls.length > 0){
			data.variants[0].ProductImages = imageUrls
		}
		for (let i = 0; i < imageUrls.length; i++) {
			//data.variants[i].SwatchImage = imageUrls[i];

			//data.variants[i].ProductImages = product?.variants[i].ProductImages
			//data.variants[i].SwatchImage  = product?.variants[i].SwatchImage
			data.variants[i].Stocks.L = parseInt(data.variants[i].Stocks.L);
			data.variants[i].Stocks.M = parseInt(data.variants[i].Stocks.M);
			data.variants[i].Stocks.S = parseInt(data.variants[i].Stocks.S);
			data.variants[i].Stocks.XL = parseInt(data.variants[i].Stocks.XL);
		}
		dispatch(updateProduct({ updatedProduct: data }));
		console.log({updatedProduct: data})
		//reset();
		setImageUrls([]);
		history.push('/admindashboard');
		//dispatch(getById(id))
	};

	const uploadFile = (e) => {
		e.preventDefault(e);
		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
				setCopyUrls((prev) => [...prev, url]);
			});
		});
	};

	return (
		<div className={styles.AddProductContainer}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.left}>
             
					{/* <select

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
					)} */}

					{/* <select
						className={styles.collection}
						name='collection'
						ref={register({ required: true })}>
						<option value={product?.collection}>Select Collection</option>
						<option value='1'>Summer</option>
						<option value='2'>Winter</option>
						<option value='3'>Autumn</option>
						<option value='4'>Spring</option>
					</select> */}
					{/* {errors.collection && (
						<span className={styles.error}>
							This should select a collection
						</span>
					)} */}
					<input
						type='text'
						name='name'
						autoComplete='off'
                        defaultValue={product?.name}
						placeholder='Name'
						ref={register({
							required: true,
							pattern: {
								value: /^[^0-9]+$/,
							},
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
                        defaultValue={product?.brand}
						autoComplete='off'
						placeholder='Brand'
						ref={register({ required: true, typeOf: 'number' })}
					/>
					{errors.brand && (
						<span className={styles.error}>
							This field is mandatory
						</span>
					)}

					<input
						type='text'
						name='price'
                        defaultValue={product?.price}
						autoComplete='off'
						placeholder='Price'
						ref={register({
							required: true,
							pattern: {
								value: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
							},
						})}
						onKeyPress={(e) => {
							if (e.key === 'e' || e.key === '-') {
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
                            {...(product?.is_offer ? { defaultChecked: true } : {})}
							ref={register}
						/>
					</div>

					<textarea
						name='description'
                        defaultValue={product?.description}
						placeholder='Description'
						ref={register({ required: true })}
					/>
				</div>
				{errors.description && (
					<span className={styles.error}>This field is required</span>
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
											},
										})}
										placeholder='Color'
                                        defaultValue={product?.variants[index]?.ColorName }
										name={`variants[${index}].ColorName`}
									/>
									{errors.variants && (
										<span className={styles.error}>
											This field is required and can
											contain only letters
										</span>
									)}

									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.S`}
										control={control}
										defaultValue={product?.variants[index]?.Stocks.S  || 0}
										placeholder='Select Stock for Size S'
										onKeyPress={(e) => {
											if (
												e.key === 'e' ||
												e.key === '-'
											) {
												e.preventDefault();
											}
										}}
									/>

									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.M`}
										control={control}
										defaultValue={product?.variants[index]?.Stocks.M  || 0}
										placeholder='Select Stocks for Size M'
										onKeyPress={(e) => {
											if (
												e.key === 'e' ||
												e.key === '-'
											) {
												e.preventDefault();
											}
										}}
									/>
									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.L`}
                                        defaultValue={product?.variants[index]?.Stocks.M || 0}
										control={control}
										placeholder='Select Stocks for Size L'
										onKeyPress={(e) => {
											if (
												e.key === 'e' ||
												e.key === '-'
											) {
												e.preventDefault();
											}
										}}
									/>
									<Controller
										as={<input />}
										type='number'
										name={`variants[${index}].Stocks.XL`}
										control={control}
										defaultValue={product?.variants[index]?.Stocks.XL || 0}
										placeholder='Select Stocks for Size XL'
										onKeyPress={(e) => {
											if (
												e.key === 'e' ||
												e.key === '-'
											) {
												e.preventDefault();
											}
										}}
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
					<section>
						<button
							type='button'
							onClick={() => {
								history.push('/addnewproduct/addcategory');
							}}>
							Add category
						</button>
					</section>
				</div>

				<div className={styles.right}>
					<img src={product?.default_image} alt={product?.name} />;
                    {imageUrls?.map((url) => {
						return <img key={url} src={url} alt={url} />;
					})}
					
				</div>
				<div className={styles.bottom}>
					<input type='submit' value='Update' />
					<button className={styles.deletB}>Delete</button>
				</div>
				
			</form>
		</div>
	);
}
