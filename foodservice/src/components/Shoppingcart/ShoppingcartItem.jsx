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
          return { id: bagItem.id, amount: amount, isDinner: bagItem.isDinner };
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

  return (
    <li className={s.cartList}>
      {currentDish ? (
        <>
          <img src={currentDish.image} className={s.currentImg}></img>
          <div className={s.rightSide}>
            <div className={s.names}>
              <p className={s.currentDish}>{currentDish.name}</p>
              <button onClick={onDelete} className={s.binButton}>
                <img src={images.bin} className={s.bin}></img>
              </button>
            </div>
            <p>{currentDish.price}₴</p>
            <div className={s.totalProducts}>
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
              <p>{currentDish.price * amount}₴</p>
            </div>
          </div>
        </>
      ) : (
        "dinner"
      )}
    </li>
  );
};

export default ShoppingcartItem;
