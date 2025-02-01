import React from "react";
import images from "../../assets/index";
import s from "./Header.module.css";
const Header = ({ productsList, setisOpen }) => {
  return (
    <header className={s.header}>
      <img src={images.shoppingBag} className={s.cartIcon}></img>
      <p className={s.count}
        onClick={() => {
          setisOpen(true);
        }}
      >
        {productsList.length}
      </p>
      <img className={s.burger} src={images.burger} alt="burger" />
    </header>
  );
};

export default Header;
