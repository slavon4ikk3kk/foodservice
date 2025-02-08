import React, { useState } from "react";
import s from "./Dish.module.css";
const Dish = ({
  name,
  id,
  ingredients,
  methodCooking,
  price,
  image,
  setProductsList,
}) => {
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
      return [...prev, { id, amount }];
    });
    setAmount(0);
  }
  return (
    <form className={s.dishMain} onSubmit={handleSubmit}>
      <img src={image} className={s.img}></img>
      <p>{name}</p>
      <p>Склад: {ingredients}</p>
      <p>Спосіб приготування: {methodCooking}</p>
      <div className={s.dishCart}>
        <div className={s.inputWrap}>
          <button onClick={handlePlus} className={s.plus} type="button">
            +
          </button>
          <button
            style={{ color: amount === 0 ? "gray" : "black" }}
            onClick={handleMinus}
            className={s.minus}
            type="button"
          >
            -
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
        <p className={s.totalPrice}>{amount * price} ₴</p>
        <button type="submit" className={s.purchaseButton}>
          додати до кошика
        </button>
      </div>
    </form>
  );
};

export default Dish;
