import React, { useState } from "react";
import s from "./Dish.module.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const Dish = ({ name, id, price, image, setProductsList }) => {
  const [amount, setAmount] = useState(0);
  function HandleAmountChange(e) {
    setAmount(e.target.value);
  }
  function handlePlus() {
    setAmount(amount + 1);
  }
  function handleMinus() {
    if (amount === 0) {
      return;
    }
    setAmount(amount - 1);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (amount === 0) {
      return;
    }
    setProductsList((prev) => {
      const isInCart = prev.some((dishObj) => {
        return dishObj.id === id;
      });
      if (isInCart) {
        return prev.map((dishObj) => {
          if (dishObj.id === id) {
            return {
              id,
              amount: amount + dishObj.amount,
              price: dishObj.price,
              isDinner: false,
              name: dishObj.name,
            };
          }
          return dishObj;
        });
      }
      return [...prev, { id, amount, price, isDinner: false, name }];
    });
    Notify.success("Товар доданий у кошик!", {
      timeout: 1000,
    });
    setAmount(0);
  }
  return (
    <>
      <form className={s.dishMain} onSubmit={handleSubmit}>
        <img src={image} className={s.img}></img>
        <p className={s.name}>{name}</p>
        {/* <p>Склад: {ingredients}</p>
      <p>Спосіб приготування: {methodCooking}</p> */}
        <p className={s.totalPrice}>₴ {price}</p>
        <div className={s.dishCart}>
          <div className={s.inputWrap}>
            <button onClick={handlePlus} className={s.plus} type="button">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
                class="sTccf4a"
              >
                <path
                  fill-rule="evenodd"
                  d="M13,5 L13,12 L20,12 L20,13 L13,13 L13,20 L12,20 L11.999,13 L5,13 L5,12 L12,12 L12,5 L13,5 Z"
                ></path>
              </svg>
            </button>
            <button
              style={{ color: amount === 0 ? "gray" : "black" }}
              onClick={handleMinus}
              className={s.minus}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
                class="sTccf4a"
              >
                <path
                  fill-rule="evenodd"
                  d="M20,12 L20,13 L5,13 L5,12 L20,12 Z"
                ></path>
              </svg>
            </button>
            <input
              type="number"
              step={0.5}
              onChange={HandleAmountChange}
              value={amount}
              min={0}
              className={s.input}
            ></input>
          </div>

          <button type="submit" className={s.purchaseButton}>
            додати до кошика
          </button>
        </div>
      </form>
    </>
  );
};

export default Dish;
