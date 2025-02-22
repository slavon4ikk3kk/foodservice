import React, { useState, useEffect } from "react";
import images from "../../assets/index.js";
import s from "./ShoppingcartItem.module.css";
const ShoppingcartItem = ({
  amount: storedAmount,
  currentDish,
  setProductsList,
}) => {
  const [amount, setAmount] = useState(storedAmount);
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
  useEffect(() => {
    setProductsList((prev) => {
      const newList = prev.map((bagItem) => {
        if (bagItem.id === currentDish.id) {
          return { id: bagItem.id, amount: amount };
        }
        return bagItem;
      });
      return newList;
    });
  }, [amount]);

  function onDelete() {
    setProductsList((prev) => {
      const newList = prev.filter((bagItem) => bagItem.id !== currentDish.id);
      return newList;
    });
  }
  //записати в productlist нове значення, без обєкта id якого співпадає з поточною карткою
  return (
    <li className={s.cartList}>
      <img src={currentDish.image} className={s.currentImg}></img>
      <div className={s.rightSide}>
        <div className={s.names}>
          <p>{currentDish.name}</p>
          <button onClick={onDelete} className={s.binButton}>
            <img src={images.bin} className={s.bin}></img>
          </button>
        </div>
        <p>{currentDish.price}₴</p>
        <div className={s.totalProducts}>
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
          <p>{currentDish.price * amount}</p>
        </div>
      </div>
    </li>
  );
};

export default ShoppingcartItem;
