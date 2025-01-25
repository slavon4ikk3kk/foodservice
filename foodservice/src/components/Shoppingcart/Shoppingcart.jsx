import React from "react";
import s from "./Shoppingcart.module.css";
import images from "../../assets/index";
const ShoppingCart = ({ setProductsList, productsList, setisOpen }) => {
  return (
    <div className={s.modal}>
      <div>
        <h2>Кошик({productsList.length} товарів)</h2>
        <img
          onClick={() => {
            setisOpen(false);
          }}
          className={s.close}
          src={images.close}
          alt="close"
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
