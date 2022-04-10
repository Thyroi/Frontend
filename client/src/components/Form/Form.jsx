import React, { useEffect } from "react";
import style from "./Form.module.scss";
import { Link } from "react-router-dom";

import { saveSendingData } from "../../actions/index";

function Form() {
  useEffect(() => {
    document.querySelector("#sendDataButton").addEventListener("click", () => {
      saveSendingData();
    });
  });

  return (
    <div className={style.background}>
      <div className={style.containerInputs}>
        <label className={style.label} id="name">
          Nombre{" "}
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu nombre"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="lastname">
          Apellido
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu nombre"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="email">
          Correo electrónico
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu cor"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="phone">
          Teléfono
        </label>
        <input
          className={style.input}
          type="number"
          placeholder="Escribe tu phone"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="calle">
          Calle
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu calle"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="city">
          Ciudad
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu ciudad"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="zip_code">
          Zip code
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu zip code"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="state">
          Departamento/Provincia
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Escribe tu departamento o provincia"
        />
      </div>

      <div className={style.containerInputs}>
        <label className={style.label} id="others">
          Otros
        </label>
        <input
          className={style.input}
          type="text"
          placeholder="Casa, apartamento..."
        />
      </div>

      <div className={style.containerInputs}>
        <input
          className={style.input}
          type="submit"
          value="Save data"
          id="saveNewData"
        />
      </div>

      <div className={style.containerInputs}>
        <Link to="/cart/pay">
          <input
            className={style.input}
            type="submit"
            value="Confirmar datos de envío"
            id="sendDataButton"
          />
        </Link>
      </div>
    </div>
  );
}

export default Form;
