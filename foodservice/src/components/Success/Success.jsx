import React, { useState } from "react";
import s from "./Success.module.css";
import images from "../../assets/index";
import axios from "axios";
import dishes from "../../Data/dishes";
import { Notify } from "notiflix/build/notiflix-notify-aio";
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
  const [isConfirmAddress, setIsConfirmAddress] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  console.log(window);

  async function onSubmit(e) {
    e.preventDefault();
    let validMessage = `Зроблено замовлення: `;
    productsList.forEach((product) => {
      validMessage += `\n${
        dishes.find((dish) => {
          return product.id === dish.id;
        }).name
      }, Кількість товару: ${product.amount}`;
    });
    validMessage += `\nЗагальна ціна замовлення: ${totalCost} грн`;
    validMessage += `\nІм'я: ${name} \nАдреса: ${address} \nТелефон: ${phone}`;
    // setSuccessModal(true);
    setIsConfirmAddress(true);
    setProductsList([]);

    const apiUrl = `https://api.telegram.org/bot${""}/sendMessage`;
    try {
      await axios.post(apiUrl, {
        chat_id: chatId,
        text: validMessage,
      });
      Notify.success("Заявка успішно відправлена", {
        timeout: 3000,
      })
    } catch (error) {
      Notify.failure("Сталася помилка", {
        timeout: 3000
      })
      setIsConfirmAddress(false)
    }
  }
  function HandleName(e) {
    setName(e.target.value);
  }
  function HandleAddress(e) {
    setAddress(e.target.value);
  }
  function HandlePhone(e) {
    setPhone(e.target.value);
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
        {isConfirmAddress ? (
          <>
            <p className={s.successModalText}>
              Замовлення було успішно прийняте!
            </p>
            <button className={`${s.buttonPayment} ${s.button}`}>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="#"
              >
                Посилання на оплату
              </a>
            </button>
          </>
        ) : (
          <form className={s.form}>
            <div className={s.inputWrap}>
              <label className={s.label}>Повне ім'я</label>
              <div className={s.inputContainer}>
                <img src={images.person} className={s.icon} />
                <input
                  className={s.input}
                  value={name}
                  onChange={HandleName}
                  pattern="[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+([-\s][A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+)*"
                  required
                />
              </div>
            </div>

            <div className={s.inputWrap}>
              <label className={s.label}>Адреса</label>
              <div className={s.inputContainer}>
                <img src={images.address} className={s.icon} />
                <input
                  className={s.input}
                  value={address}
                  onChange={HandleAddress}
                  pattern="[A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9\s,.-/]+"
                  required
                />
              </div>
            </div>

            <div className={s.inputWrap}>
              <label className={s.label}>Телефон</label>
              <div className={s.inputContainer}>
                <img src={images.phone} className={s.icon} />
                <input
                  className={s.input}
                  value={phone}
                  onChange={HandlePhone}
                  pattern="0\d{2}(-?\d{3})(-?\d{2})(-?\d{2})"
                  required
                />
              </div>
            </div>

            <button type="submit" onClick={onSubmit} className={s.button}>
              Підтвердити
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default Success;
