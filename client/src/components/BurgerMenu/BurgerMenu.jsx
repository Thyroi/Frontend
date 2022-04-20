import React, { useEffect, useState } from "react";

import Nav from "./Nav";
import Popup from "reactjs-popup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import style from "./BurgerMenu.module.scss";
import "reactjs-popup/dist/index.css";

import "./stylesPop.css";

const BurgerMenu = () => {

  return (
    <div className={style.container}>
      <Popup
        trigger={<FontAwesomeIcon icon={faBars} className={style.burgerMenu} id="menuBar" />}
        nested
        position="right top"
        on="click"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "0px", border: "none" }}
        arrow={false}
      >
        {(close) => (
          <div
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            <Nav />
          </div>
        )}
      </Popup>
    </div>
  );
};

export default BurgerMenu;
