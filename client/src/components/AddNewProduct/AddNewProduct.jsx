import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import styles from './AddNewProduct.module.css'


export default function Trying() {
	const { register, control, handleSubmit, reset, errors } = useForm({
    defaultValues: {
    	validations: [{ color: "Blanco", Stock: {L: 'a ver', M: 'a ver'} }]
    }
});
  	const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "validations"
    }
  );

  const onSubmit = (data) => console.log( data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    	<div className={styles.valueInput}>
        	<input type="text" name="brand" autoComplete='off' placeholder='Brand' ref={register({required: true})} />
            	{errors.brand && <span className={styles.error}>This field is required</span>}
    	</div>
    	<div className={styles.valueInput}>
			<select name="category" ref={register({required: true})}>
				<option value="">Select Category</option>
				<option value="Pantalones">Pantalones</option>
				<option value="Camisetas">Camisetas</option>
				<option value="Zapatos">Zapatos</option>
			</select>
			{errors.category && <span className={styles.error}>This field is required</span>}
        </div>
		<div className={styles.valueInput}>
			<select name="gender" ref={register({required: true})}>
				<option value="">Select Gender</option>
				<option value="Mujer">Mujer</option>
				<option value="Hombre">Hombre</option>
				<option value="Niños">Niños</option>
			</select>
			{errors.gender && <span className={styles.error}> This field is required</span>}
		</div>
		<div className={styles.valueInput}>
			<select name='collection' ref={register({required: true})}>
				<option value=''>Select Collection</option>
				<option value='Verano'>Verano</option>
				<option value='Invierno'>Invierno</option>
				<option value='Otoño'>Otoño</option>
				<option value='Primavera'>Primavera</option>
			</select>
		{errors.collection && <span className={styles.error}>This field is required</span>}
		</div>
		<div className={styles.valueInput}>
			<input type="number" name="price"  autoComplete='off' placeholder='Price' ref={register({required: true})} />
			{errors.price && <span className={styles.error}>This field is required</span>}
		</div>
		<div className={styles.valueInput}>
			<label htmlFor="is_offer">On Sale?</label>
			<input type="checkbox" name="is_offer" ref={register} />
		</div>
		<div>
			<textarea name="description" placeholder='Description' ref={register({required: true})} />
		</div>
            
    <ul>
        {fields.map((item, index) => {
        return (
            <li key={item.id}>
            	<input
                name={`validations[${index}].color`}
                // defaultValue={`${item.color}`} 
                ref={register()}
                placeholder="Select Color"/>
            <Controller
                as={<input />}
                name={`validations[${index}].Stock.S`}
                control={control}
                defaultValue=''
                placeholder="Select Stock for Size S"
              />
                <Controller
                 as={<input />}
                 name={`validations[${index}].Stock.M`}
                 control={control}
                 defaultValue='' 
                 placeholder="Select Stock for Size M"
               />
              <Controller
                as={<input />}
                name={`validations[${index}].Stock.L`}
                control={control}
                defaultValue=""
                placeholder="Select Stock for Size L"
              />
              <Controller
                as={<input />}
                name={`validations[${index}].Stock.XL`}
                control={control}
                defaultValue=""
                placeholder="Select Stock for Size XL"
              />
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
            append({ color: "Select Color", Stock: "SelectStock" });
          }}
        >
          Agregar color
        </button>

      
      </section>

      <input type="submit" />
    </form>
  );
}

