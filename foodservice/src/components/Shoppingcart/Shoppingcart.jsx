import React from "react";
import s from "./Shoppingcart.module.css";
import images from "../../assets/index";
import dishes from "../../Data/dishes.jsx";
import ShoppingcartItem from "./ShoppingcartItem";

import Success from "../Success/Success";
import DinnerItem from "./DinnerItem";

const ShoppingCart = ({
  setProductsList,
  productsList,
  setisOpen,
  setSuccessModal,
  successModal,
}) => {
  const totalCost = productsList.reduce((sum, product) => {
    console.log(product);
    if (product.isDinner) {
      const sumDishes = product.dishes.reduce((acc, dish) => {
        return acc + dish.price;
      }, 0);
      return sum + sumDishes;
    }
    const currentPrice = dishes.find((dish) => {
      return product.id === dish.id;
    });
    return sum + product.amount * currentPrice.price;
  }, 0);

  function onSubmit() {
    setSuccessModal(true);
  }

  return (
    <div className={s.modal}>
      <div className={s.modalHead}>
        <h2>
          Кошик:{" "}
          <span className={s.span}>{productsList.length} товари(-ів)</span>
        </h2>
        <img
          onClick={() => {
            setisOpen(false);
          }}
          className={s.close}
          src={images.close}
          alt="close"
        />
      </div>
      <ul className={s.purchaseList}>
        {[...productsList].map((product) => {
          if (product.isDinner === true) {
            return <DinnerItem dinner={product} setProductsList={setProductsList} />;
          }
          const currentDish = dishes.find((dish) => {
            return product.id === dish.id;
          });

          return (
            <ShoppingcartItem
              currentDish={currentDish}
              amount={product.amount}
              setProductsList={setProductsList}
            />
          );
        })}
      </ul>
      <div className={s.totalCostContainer}>
        <div className={s.totalCost}>
          <p>Загальна ціна:</p>
          <span>{totalCost}₴</span>
        </div>
        <button className={s.button} onClick={onSubmit}>
          Зробити замовлення
        </button>
      </div>
      {successModal && (
        <Success
          setSuccessModal={setSuccessModal}
          productsList={productsList}
          setProductsList={setProductsList}
          setisOpen={setisOpen}
          totalCost={totalCost}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
