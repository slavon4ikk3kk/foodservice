import React from "react";
import s from "./Shoppingcart.module.css";
import images from "../../assets/index";
// import dishes from "../../Data/dishes.jsx";
import ShoppingcartItem from "./ShoppingcartItem";
import Success from "../Success/Success";
import DinnerItem from "./DinnerItem";
import { Loading } from "notiflix";
import CateringItem from "./CateringItem";

const ShoppingCart = ({
  setProductsList,
  productsList,
  setisOpen,
  setSuccessModal,
  successModal,
}) => {
  const totalCost = productsList.reduce((sum, product) => {
    if (product.isDinner === "dinner") {
      const sumDishes = product.dishes.reduce((acc, dish) => {
        console.log(dish.price);
        return acc + +dish.price;
      }, 0);
      return sum + +sumDishes;
    }
    if (product.isDinner === "catering") {
      return sum + product.amount * product.price;
    }
    const dishes = JSON.parse(localStorage.getItem("sheetProducts"));
    const currentPrice = dishes.find((dish) => {
      console.log(product);
      console.log(dishes);
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
        {[...productsList]
          .sort((a) => {
            if (a.isDinner === "dinner") {
              return -1;
            } else {
              return 1;
            }
          })
          .map((product) => {
            if (product.isDinner === "dinner") {
              return (
                <DinnerItem
                  dinner={product}
                  setProductsList={setProductsList}
                />
              );
            }
            if (product.isDinner === "catering") {
              return (
                <CateringItem
                  currentDish={product}
                  amount={product.amount}
                  setProductsList={setProductsList}
                />
              );
            }
            const lsItems = JSON.parse(localStorage.getItem("sheetProducts"));
            const currentDish = lsItems.find((dish) => {
              return product.id === dish.id;
            });
            if (!currentDish) {
              setProductsList((prev) => {
                const newList = prev.filter(
                  (bagItem) => bagItem.id !== product.id
                );
                return newList;
              });
              return;
            }
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
