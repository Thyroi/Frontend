import React from "react";
import style from "./Product_detail.module.css";

// Waiting for routes and data to deploy it finally

function Product_detail() {
  return (
    <div className={style.container}>
      <div className={style.containerImages}>
        <div className={style.containerMainImage}>
          <img className={style.mainImage} />
        </div>
        <div className={style.containerSecondImages}>
          <img className={style.secondImages} />
          <img className={style.secondImages} />
          <img className={style.secondImages} />
          <img className={style.secondImages} />
        </div>
      </div>

      <div className={style.containerInf}>
        <div className={style.specificInf}>
          <h2 className={style.productName}>Flannel Shirt Dark</h2>
          <p className={style.collectionName}>
            Charles Jeffrey LOVERBOY, Otoño-invierno 2017
          </p>
          <p className={style.productPrice}>$450</p>
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
              <h3 className={style.colorSize}>Color</h3>
              <div className={style.colors}>
                <div className={style.color}>blue</div>
                <div className={style.color}>red</div>
                <div className={style.color}>black</div>
                <div className={style.color}>green</div>
              </div>
            </div>

            <div className={style.containerAmountFavorite}>
              <div className="counterContainer">
                <button>-</button>
                <p>2</p>
                <button>+</button>
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
          <p className={style.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            dolores animi sint repellendus facere id, laudantium odio ullam, ea
            excepturi mollitia quos eius? Reiciendis qui fugiat laudantium,
            nobis beatae dicta.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product_detail;
