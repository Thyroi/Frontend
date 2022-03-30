import React, { useEffect, useState } from 'react'
import styles from './AddNewProduct.module.css'

function AddNewProduct() {

  const [error, setError] = useState({})    
  const [ input, setInput ] = useState({
    brand: '',
    type: '',
    collection: '',
    stock: '',
    price: '',
    img: 'https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg',
    description: ''
});


const validation = (input) => {
        
  let error = {};

  if (!input.brand) {
      error.brand = "This field is mandatory";
  }
  if (!input.type) {
      error.type = 'This field is mandatory'
  }
  if (!input.collection ) {
      error.collection = 'This field is mandatory'
  }
  if (input.stock < 1 ) {
      error.stock = 'You need more than one'
  }
  if (input.price < 1) {
      error.price = 'It should be more expensive'
  }
  if (!input.description ) {
    error.price = 'This field is mandatory'
}

  return error
};

useEffect(() => {
  setError(validation(input))
}, [input])

const handleChange = (e) => {
    
  setInput({
      ...input,
      [e.target.name]: e.target.value,
  });

};

  return (
    <div className={styles.AddProductContainer}>
      <form className={styles.formProduct}>
        <div>
        <label>Branch</label> 
        <input
        type='text'
        value={input.brand}
        name="brand"
        placeholder='Set Brand Name'
        autoComplete="off"
        className={styles.inputStyle}
        onChange={e => handleChange(e)}
        />
        {error.brand && (<p className={styles.error}>{error.brand}</p>)}
        <label>Clothe Type</label> 
        <input
        type='text'
        value={input.type}
        name="type"
        placeholder='Set Type'
        autoComplete="off"
        className={styles.inputStyle}
        onChange={e => handleChange(e)}
        />
        {error.type && (<p className={styles.error}>{error.type}</p>)}
        <select>
                <option value="all">Sort by Gender</option>
                <option value="Female">Female</option>
                <option value="Man">Man</option>
                <option value="none">Non Gender</option>
        </select>

        <select>
                <option value="all">Sort by Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
        </select>

        <label>Collection</label> 
        <input
        type='text'
        value={input.collection}
        name="collection"
        placeholder='Set Collection'
        autoComplete="off"
        className={styles.inputStyle}
        onChange={e => handleChange(e)}
        ></input>
        {error.collection && (<p className={styles.error}>{error.collection}</p>)}
        <select>
                <option value="all">Sort by Color</option>
                <option value="white">white</option>
                <option value="black">black</option>
                <option value="Pink">Pink</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
        </select>

        <label>Stock</label> {/*input */}
        <input
            type='number'
            value={input.stock}
            name="stock"
            placeholder='Set Stock'
            autoComplete="off"
            className={styles.inputStyle}
            onChange={e => handleChange(e)}
            ></input>
          {error.stock && (<p className={styles.error}>{error.stock}</p>)}
        <label>Price</label> 
        <input
          type='number'
          value={input.price}
          name="price"
          placeholder='Set Price'
          autoComplete="off"
          onChange={e => handleChange(e)}
          className={styles.inputStyle}
        ></input>
        {error.price && (<p className={styles.error}>{error.price}</p>)}
        <label>Offer Of</label>
        <input
        type="checkbox"
        ></input>
        </div>
      <div>
        <img src={input.img} alt='img'/>
        <textarea   onChange={e => handleChange(e)} className={styles.textDescription} value={input.description}  rows="4" cols="50" name='description'></textarea>
        {error.description && (<p className={styles.error}>{error.description}</p>)}
        <button type='submit'>Add Product</button>
      </div> 
      </form>
    </div>
  )
}

export default AddNewProduct