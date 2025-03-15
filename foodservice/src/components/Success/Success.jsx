import React from "react";
import s from "./Success.module.css";
import images from "../../assets/index";
import axios from "axios";
import dishes from "../../Data/dishes";
const botToken =
  process.env.REACT_APP_TELEGRAM_BOT_TOKEN ||
  import.meta.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chatId =
  process.env.REACT_APP_TELEGRAM_CHAT_ID ||
  import.meta.env.REACT_APP_TELEGRAM_CHAT_ID;

const Success = ({
  setSuccessModal,
  productsList,
  setProductsList,
  setisOpen,
  totalCost,
}) => {
  async function onSubmit() {
    let validMessage = `Зроблено замовлення: `;
    productsList.forEach((product) => {
      validMessage += `\n${
        dishes.find((dish) => {
          return product.id === dish.id;
        }).name
      }, Кількість товару: ${product.amount}`;
    });
    validMessage += `\nЗагальна ціна замовлення: ${totalCost} грн`;
    setSuccessModal(true);
    setProductsList([]);

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      await axios.post(apiUrl, {
        chat_id: chatId,
        text: validMessage,
      });
      console.log("Повідомлення надіслано!");
    } catch (error) {
      console.error("Помилка відправки:", error);
    }
  }
  return (
    <div className={s.successModal}>
      <div className={s.successModalWrap}>
        <button
          className={s.buttonClose}
          onClick={() => {
            setSuccessModal(false);
            setisOpen(false);
          }}
        >
          <img src={images.close} className={s.close}></img>
        </button>
        <p className={s.successModalText}>Замовлення було успішно прийняте!</p>
      </div>
    </div>
  );
};

export default Success;
