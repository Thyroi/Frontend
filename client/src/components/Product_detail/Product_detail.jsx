import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Quantity from "../Quantity/Quantity";

import style from "./Product_detail.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  selectImage,
  productColor,
  productSizes,
  selectVariant,
  selectSize,
  prepareProduct,
  formattingProduct,
} from "../../utils/utils";

//Data
import {
  getById,
  addCart,
  selectingProduct,
  cleanProducts,
} from "../../actions/index";

export default function Product_detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const templateProduct = useSelector((state) => state.details);
  let product = useSelector((state) => state.detailEdited);

  const cartProducts = useSelector((state) => state.cart);

  const { name, brand, price, description } = product;

  const [state, setState] = useState();

  useEffect(() => {
    dispatch(cleanProducts());
    dispatch(getById(id));
  }, []);

  useEffect(() => {
    // Auto selecting details
    // if (product.variants) {
    //   
    // }
    if (product.variants) {
      console.log("sss")
      const newProduct = Object.assign({},formattingProduct(product, templateProduct));
      dispatch(selectingProduct(newProduct));
    }
  }, [product.price]);

  if (!product.variants) return <div>Loading</div>;

  console.log(product);

  return (
    <div className={style.container}>
      <div className={style.containerImages}>
        <div className={style.containerMainImage}>
          <img
            className={style.mainImage}
            src={product.variants && product.variants[0].ProductImages[0]}
            id="default_image"
          />
        </div>
        <div className={style.containerSecondImages}>
          {product.variants &&
            product.variants[0].ProductImages.map((image) => (
              <img
                key={image}
                className={style.secondImages}
                src={image}
                alt=""
                onClick={() => {
                  selectImage(image);
                  console.log(product);
                }}
              />
            ))}
        </div>
      </div>

      <div className={style.containerInf}>
        <div className={style.specificInf}>
          <h2 className={style.productName}>{name}</h2>
          <p className={style.collectionName}>{brand}</p>
          <p
            className={style.productPrice}
            id="individualProductPrice"
          >{`$${product.totalPrice || product.price}`}</p>

          <div className={style.containerPreferences}>
            <div className={style.containerSizePreference}>
              <h3 className={style.sizeHeader}>Size</h3>
              <div className={style.sizes} id="sizes">
                {product.variants &&
                  productSizes(templateProduct).map((size) => (
                    <div
                      id={size}
                      key={size}
                      className={style.size}
                      onClick={() => {
                        const result = Object.assign({}, selectSize(templateProduct, product, size));
                        dispatch(selectingProduct(result));
                        setState(size);
                      }}
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>

            <div className={style.containerColorPreference}>
              <h3 className={style.colorHeader}>Color</h3>
              <div className={style.colors} id="colors">
                {productColor(templateProduct).map((color) => (
                  <div
                    id={color}
                    key={color}
                    className={style.color}
                    onClick={() => {
                      const result = Object.assign({}, selectVariant(templateProduct, product, color));
                      dispatch(selectingProduct(result));
                      setState(color);
                    }}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>

            <div className={style.containerAmountFavorite}>
              <Quantity product={product} />
              <div className={style.favorite}>
                <FontAwesomeIcon
                  className={style.favoriteIcon}
                  icon={faHeart}
                />
              </div>
            </div>

            <div className={style.containerBuyCart}>
              <Link to="/Form" onClick={() => prepareProduct(product)}>
                <button className={style.buyButton}>Buy</button>
              </Link>
              <button
                className={style.cartButton}
                id="addCartButton"
                onClick={() => {
                  addCart(cartProducts, product, dispatch);
                }}
              >
                <FontAwesomeIcon
                  className={style.cartIcon}
                  icon={faCartShopping}
                />
              </button>
            </div>
            <div className={style.containerUnits}>
              <p className={style.infoUnits}>
                Available Units:{" "}
                <span className={style.units}>
                  {product.variants[0].leftUnits}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={style.generalInformation}>
          <h4 className={style.headerDescription}>Description</h4>
          <hr className={style.line} />
          <p className={style.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
