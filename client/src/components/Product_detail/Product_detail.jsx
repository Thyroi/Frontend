import React from "react";
import { useParams } from "react-router-dom";

import style from "./Product_detail.module.scss";

//Data
import data from "../../Assets/Products.json";

// Waiting for routes and data to deploy it finally

function Product_detail() {
  const { id } = useParams();
  const product = data.find((p) => p.id_product == id);
  const { default_image, variants, name, brand, price, description } = product;
  console.log(product);

  return (
    <div className={style.container}>
      <div className={style.containerImages}>
        <div className={style.containerMainImage}>
          <img className={style.mainImage} src={default_image} />
        </div>
        <div className={style.containerSecondImages}>
          {variants[0].ProductImages.map((image) => (
            <img className={style.secondImages} src={image} />
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
                <div className={style.size}>S</div>
                <div className={style.size}>M</div>
                <div className={style.size}>L</div>
                <div className={style.size}>xL</div>
              </div>
            </div>

            <div className={style.containerColorPreference}>
              <h3 className={style.colorHeader}>Color</h3>
              <div className={style.colors}>
                <div className={style.color}>blue</div>
                <div className={style.color}>red</div>
                <div className={style.color}>black</div>
                <div className={style.color}>green</div>
              </div>
            </div>

            <div className={style.containerAmountFavorite}>
              <div className={style.counterContainer}>
                <button className={style.counterButton}>-</button>
                <p className={style.counterNumber}>2</p>
                <button className={style.counterButton}>+</button>
              </div>
              <div className={style.favorite}>
                <img className={style.favoriteImg} src="" alt="favorite" />
              </div>
            </div>

            <div className={style.containerBuyCart}>
              <button className={style.buyButton}>Buy</button>
              <button className={style.cartButton}>
                <img src="" alt="" />
              </button>
            </div>
            <div className={style.containerUnits}>
              <p className={style.infoUnits}>
                Available Units: <span className={style.units}>58</span>
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

export default Product_detail;