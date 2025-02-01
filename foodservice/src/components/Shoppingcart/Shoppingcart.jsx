import React from "react";
import s from "./Shoppingcart.module.css";
import images from "../../assets/index";
import dishes from "../../Data/dishes";
import ShoppingcartItem from "./ShoppingcartItem";

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
      <ul>
        {productsList.map((product) => {
          const currentDish = dishes.find((dish) => {
            return product.id === dish.id;
          });
          console.log(currentDish);

          return (
            <ShoppingcartItem
              currentDish={currentDish}
              amount={product.amount}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ShoppingCart;
