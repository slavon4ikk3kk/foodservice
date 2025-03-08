import React from "react";
import s from "./Shoppingcart.module.css";
import images from "../../assets/index";
import dishes from "../../Data/dishes.jsx";
import ShoppingcartItem from "./ShoppingcartItem";
import axios from "axios";
import dotenv from "dotenv";



const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;


const ShoppingCart = ({ setProductsList, productsList, setisOpen, setSuccessModal }) => {
  const totalCost = productsList.reduce((sum, product) => {
    const currentPrice = dishes.find((dish) => {
      return product.id === dish.id;
    });
    return sum + product.amount * currentPrice.price;
  }, 0);

  async function onSubmit() {
    setSuccessModal(true);
    setProductsList([]);
    setisOpen(false);
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await axios.post(apiUrl, {
        chat_id: TELEGRAM_CHAT_ID,
        text: "відправка",
      });
      console.log("Повідомлення надіслано!");
    } catch (error) {
      console.error("Помилка відправки:", error);
    }

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
        {productsList.map((product) => {
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
        <button className={s.button} onClick={onSubmit}>Зробити замовлення</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
