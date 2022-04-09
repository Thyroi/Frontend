import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import styles from './AddNewProduct.module.css'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../Assets/firebase";
import { v4 } from "uuid";


export default function AddNewProduct() {
 
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);


	const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
    	variants: [{ ColorName: "Blanco", Stocks: {L: 'a ver', M: 'a ver'}}] 
    }
});
  	const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "variants"
    }
  );
  const onSubmit = (data) => {
    data.collection = parseInt(data.collection);
    data.price = parseInt(data.price);
    for(let i = 0; i < imageUrls.length; i++){
      data.variants[i].SwatchImage = imageUrls[i];
    }
    console.log({product : data, collection: data.coleccion, categories: data.categories});
  };



  const uploadFile = (e) => {
    e.preventDefault(e)
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  console.log(imageUrls)
  return (
    <div className={styles.AddProductContainer}>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
      <div className={styles.name}>
        	<input type="text" name="name" autoComplete='off' placeholder='Name' ref={register({required: true})} />
            	{errors.name && <span className={styles.error}>This field is required</span>}
    	</div>
    	<div className={styles.brand}>
        	<input type="text" name="brand" autoComplete='off' placeholder='Brand' ref={register({required: true, typeOf: 'number'})} />
            	{errors.brand && <span className={styles.error}>This field is required</span>}
    	</div>
    	<div className={styles.category}>
			<select name="categories" ref={register({required: true, })}>
				<option value="">Select categories</option>
				<option value="Pantalones">Pantalones</option>
				<option value="Camisetas">Camisetas</option>
				<option value="Zapatos">Zapatos</option>
			</select>
      {errors.categories && <span className={styles.error}>This field is required</span>}
      
        </div>
            	<div className={styles.category}>
			<select name="categories" ref={register({required: true, })}>
				<option value="">Select categories</option>
				<option value="Pantalones">Pantalones</option>
				<option value="Camisetas">Camisetas</option>
				<option value="Zapatos">Zapatos</option>
			</select>
      {errors.categories && <span className={styles.error}>This field is required</span>}
      
        </div>
		<div className={styles.gender}>
			<select name="gender" ref={register({required: true})}>
				<option value="">Select Gender</option>
				<option value="Mujer">Mujer</option>
				<option value="Hombre">Hombre</option>
				<option value="Niños">Niños</option>
			</select>
			{errors.gender && <span className={styles.error}> This field is required</span>}
		</div>
		<div className={styles.collection}>
			<select name='collection' ref={register({required: true})}>
				<option value=''>Select Collection</option>
				<option value='1'>Verano</option>
				<option value='2'>Invierno</option>
				<option value='3'>Otoño</option>
				<option value='4'>Primavera</option>
			</select>
		{errors.collection && <span className={styles.error}>This field is required</span>}
		</div>
		<div className={styles.price}>
			<input type="number" name="price"  autoComplete='off' placeholder='Price' ref={register({required: true})} />
			{errors.price && <span className={styles.error}>This field is required</span>}
		</div>
		<div className={styles.offer}>
			<label htmlFor="is_offer">On Sale?</label>
			<input type="checkbox" name="is_offer" ref={register} />
		</div>
    </div>
		<div>
			<textarea name="description" placeholder='description' ref={register({required: true})} />
		</div>
            
    <ul>
        {fields.map((item, index) => {
        return (
            <li key={item.id}>
              <select ref={register()} name={`variants[${index}].ColorName`}>
                <option value=''> Select Color</option>
                <option value={'Blanco'}>Blanco</option>
                <option value={'Rojo'}>Rojo</option>	
                <option value={'Azul'}>Azul</option>
              </select>
            <Controller
                as={<input />}
                name={`variants[${index}].Stocks.S`}
                control={control}
                defaultValue=''
                placeholder="Select Stock for Size S"
              />
                <Controller
                as={<input />}
                name={`variants[${index}].Stocks.M`}
                control={control}
                defaultValue=''
                placeholder="Select Stocks for Size M"
                />
              <Controller
                as={<input />}
                name={`variants[${index}].Stocks.L`}
                control={control}
                defaultValue=""
                placeholder="Select Stocks for Size L"
              />
              <Controller
                as={<input />}
                name={`variants[${index}].Stocks.XL`}
                control={control}
                defaultValue=""
                placeholder="Select Stocks for Size XL"
              />
              <input
                  type="file"
                  name={`variants[${index}].SwatchImage`}
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
              <button onClick={uploadFile}> Upload Image</button>
              <button type="button" onClick={() => remove(index)}>
                Eliminar
              </button>
            
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ color: "Select Color", Stocks: "SelectStocks" });
          }}
        >
          Agregar color
        </button>

      
      </section>

      <input type="submit" />
    </form>
    {imageUrls.map((url) => {
        return <img src={url} alt={url}/>;
      })}
    </div>
  );
}

