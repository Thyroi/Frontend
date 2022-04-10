import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "../../hooks/useMercadoPago";

import { createGuestClient, purchaseOrder } from "../../../../utils/utils";
import { clearCart } from "../../../../actions/index";

import style from "./MercadoPagoForm.module.scss";

const init = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};

export default function MercadoPagoForm(params) {
  const [state, setState] = useState(init);
  const resultPayment = useMercadoPago(); //custom hook
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  useEffect(() => {
    if (resultPayment && resultPayment.status === "approved") {
      // localStorage.removeItem("cart");
      // dispatch(clearCart());

      const element = document.querySelector("#cardState");

      if (resultPayment.status === "approved") {
        element.classList.remove(style.containerResponseRejected);
        element.classList.remove(style.containerResponsePending);
        element.classList.add(style.containerResponseApproved);
      }
    }

    if (resultPayment && resultPayment.status === "rejected") {
      // localStorage.removeItem("cart");
      // dispatch(clearCart());

      const header = "Your order is rejected";
      const text =
        "Hi, sr who does not wanna live, your order and payment has been rejected. Check your email to solve this problem.";

      const element = document.querySelector("#cardState");

      if (resultPayment.status === "rejected") {
        element.classList.remove(style.containerResponseApproved);
        element.classList.remove(style.containerResponsePending);
        element.classList.add(style.containerResponseRejected);

        document.querySelector("#header").textContent = header;
        document.querySelector("#text").textContent = text;
      }
    }
  }, resultPayment);

  return (
    <div className="cont">
      <div className="card">
        <Card
          cvc={state.cvc}
          expiry={state.cardExpirationMonth + state.cardExpirationYear}
          name={state.cardholderName}
          number={state.cardNumber}
          focused={state.focus}
          brand={state.issuer}
        />
      </div>

      <form id="form-checkout">
        <div className="form-control">
          <input
            className="cardNum"
            type="tel"
            name="cardNumber"
            id="form-checkout__cardNumber"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="expiration">
            <input
              className="expM"
              type="tel"
              name="cardExpirationMonth"
              id="form-checkout__cardExpirationMonth"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {" / "}
            <input
              className="expY"
              type="tel"
              name="cardExpirationYear"
              id="form-checkout__cardExpirationYear"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <input
            className="sCode"
            type="tel"
            name="cvc"
            id="form-checkout__securityCode"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

          <input
            className="cName"
            type="text"
            name="cardholderName"
            id="form-checkout__cardholderName"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            className="email"
            type="email"
            name="cardholderEmail"
            id="form-checkout__cardholderEmail"
            onFocus={handleInputFocus}
          />

          <select
            name="issuer"
            id="form-checkout__issuer"
            className="bank"
          ></select>
          <select
            name="identificationType"
            id="form-checkout__identificationType"
            className="idType"
          ></select>

          <input
            type="text"
            name="identificationNumber"
            id="form-checkout__identificationNumber"
            className="idNum"
          />

          <select
            name="installments"
            id="form-checkout__installments"
            className="inst"
          ></select>
          <button
            type="submit"
            id="form-checkout__submit"
            className="pay"
            onClick={() => {
              const button = document.querySelector("#form-checkout__submit");
              if (button && button.id === "form-checkout__submit") {
                createGuestClient();
                purchaseOrder();
                document.querySelector("#form-checkout__submit").textContent =
                  "Go back";
                document.querySelector("#form-checkout__submit").id = "back";
                return;
              }

              localStorage.removeItem("cart");
              dispatch(clearCart());
              history.push("/home");
            }}
          >
            Pay
          </button>
        </div>
      </form>
      {resultPayment && (
        <div className="response">
          <div className={style.containerResponseApproved} id="cardState">
            <h2 className={style.headerResponse} id="header">
              Your order is confirmed
            </h2>
            <div className={style.line}></div>
            <p className={style.textResponse} id="text">
              Hi, sr who does not wanna live, your order and payment has been
              confirm. Check your email to track your products
            </p>
            <h3 className={style.subHeader}>Status of payment</h3>
            <ul className={style.listInfo}>
              <li className={style.listItems}>{`Status: ${JSON.stringify(
                resultPayment.status
              )}`}</li>
              <li className={style.listItems}>{`Status detail: ${JSON.stringify(
                resultPayment.status_detail
              )}`}</li>
              <li className={style.listItems}>{`Payment id: ${JSON.stringify(
                resultPayment.id
              )}`}</li>
            </ul>
            {}
          </div>
        </div>
      )}
    </div>
  );
}
