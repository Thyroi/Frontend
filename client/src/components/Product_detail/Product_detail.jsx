import React from "react";
import style from "./Product_detail.module.css";

function Product_detail() {
  return (
    <div>
      <div>
        <div>
          <img />
        </div>
        <div>
          <img />
          <img />
          <img />
          <img />
        </div>
      </div>

      <div>
        <div>
          <h2>Flannel Shirt Dark</h2>
          <p>Charles Jeffrey LOVERBOY, Otoño-invierno 2017</p>
          <p>$450</p>
          <div>
            <h3>Size</h3>
            <div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
            </div>
            <div>
              <div>blue</div>
              <div>red</div>
              <div>black</div>
              <div>green</div>
            </div>
            <div>
              <div className="counterContainer">
                <button>-</button>
                <p>2</p>
                <button>+</button>
              </div>
              <div>
                <img src="" alt="favorite"/>
              </div>
            </div>
            <div>
              <button>Buy</button>
              <button><img src="" alt="" /></button>                
            </div>
            <div>
              <p>Available Units: <span>58</span></p>
            </div>
          </div>
        </div>

        <div>
          <h4>Description</h4>
          <hr />
          <p>
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
