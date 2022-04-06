import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Quantity from "../Quantity/Quantity";

import style from "./Product_detail.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

import { selectImage, productColor, productSizes } from "../../utils/utils";

//Data
import { getById, addCart } from "../../actions/index";

// Waiting for routes and data to deploy it finally

export default function Product_detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.details);
  const { default_image, name, variants, brand, price, description } = product;

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch]);

  const cartProducts = useSelector((state) => state.cart);

  return (
    <div className={style.container}>
      <div className={style.containerImages}>
        <div className={style.containerMainImage}>
          <img
            className={style.mainImage}
            src={default_image}
            id="default_image"
          />
        </div>
        <div className={style.containerSecondImages}>
          {variants &&
            variants[0].ProductImages.map((image) => (
              <img
                key={image}
                className={style.secondImages}
                src={image}
                alt=""
                onClick={() => selectImage(image)}
              />
            ))}
        </div>
      </div>

      <div className={style.containerInf}>
        <div className={style.specificInf}>
          <h2 className={style.productName}>{name}</h2>
          <p className={style.collectionName}>{brand}</p>
          <p className={style.productPrice}>{`$${price}`}</p>
          <div className={style.containerPreferences}>
            <div className={style.containerSizePreference}>
              <h3 className={style.sizeHeader}>Size</h3>
              <div className={style.sizes}>
                {product.variants && productSizes(product).map((size) => (
                  <div key={size} className={style.size}>
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className={style.containerColorPreference}>
              <h3 className={style.colorHeader}>Color</h3>
              <div className={style.colors}>
                {product.variants && productColor(product).map((color) => (
                  <div key={color} className={style.color}>
                    {color}
                  </div>
                ))}
              </div>
            </div>

            <div className={style.containerAmountFavorite}>
              <Quantity />
              <div className={style.favorite}>
                <FontAwesomeIcon
                  className={style.favoriteIcon}
                  icon={faHeart}
                />
              </div>
            </div>

            <div className={style.containerBuyCart}>
              <button className={style.buyButton}>Buy</button>
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
                Available Units: <span className={style.units}></span>
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
