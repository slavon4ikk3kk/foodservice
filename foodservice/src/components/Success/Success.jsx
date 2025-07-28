import React, { useState } from "react";
import s from "./Success.module.css";
import images from "../../assets/index";
import axios from "axios";
// import dishes from "../../Data/dishes";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const botToken =
  process.env.REACT_APP_TELEGRAM_BOT_TOKEN ||
  import.meta.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chatId = [457867068, 509929185, 1305980352];
// const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
const XAPI = process.env.XKEY || import.meta.env.XKEY;
const BinId = process.env.BINID || import.meta.env.BINID;
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

  async function onSubmit(e) {
    e.preventDefault();
    fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
      headers: {
        "X-Master-Key": XAPI,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const count = data.record.orders;
        let validMessage = `Зроблено замовлення #${count}: `;
        productsList.forEach((product) => {
          console.log(product);
          if (product.isDinner === "dinner") {
            validMessage += `\n\n${product.date},${product.dishes.map(
              (dish) => {
                return `\n${dish.name}`;
              }
            )},\nЗагалом: ${product.dishes.reduce((acc, dish) => {
              return acc + dish.price;
            }, 0)}₴ `;
          } else if (product.isDinner === "catering") {
            validMessage += `\n\n${
              JSON.parse(localStorage.getItem("sheetCatering")).find((dish) => {
                console.log(dish);
                console.log(product);
                return product.name === dish.name;
              }).name
            }, Кількість товару: ${product.amount}`;
          } else {
            validMessage += `\n\n${
              JSON.parse(localStorage.getItem("sheetProducts")).find((dish) => {
                return product.id === dish.id;
              }).name
            }, Кількість товару: ${product.amount}`;
          }
        });

        validMessage += `\n\nЗагальна ціна замовлення: ${totalCost}₴`;
        validMessage += `\nІм'я: ${name} \nАдреса: ${address} \nТелефон: ${phone}`;
        chatId.forEach(async (chat_id) => {
          const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
          try {
            await axios.post(apiUrl, {
              chat_id: chat_id,
              text: validMessage,
            });
            Notify.success("Заявка успішно відправлена", {
              timeout: 3000,
            });
            setProductsList([]);
            setIsConfirmAddress(true);
          } catch (error) {
            console.log("помилка", error);
            Notify.failure("Сталася помилка", {
              timeout: 3000,
            });

            setIsConfirmAddress(false);
          }
        });
        fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": XAPI,
            "X-Bin-Versioning": "false",
          },
          body: JSON.stringify({
            orders: count + 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Успішно оновлено:", data);
          })
          .catch((error) => {
            console.error("Помилка:", error);
          });
      });
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
            <p>
              Ваш номер замовлення: №{count}
            </p>
            {/* <button className={`${s.buttonPayment} ${s.button}`}>
              <a target="_blank" rel="noopener noreferrer nofollow" href="#">
                Посилання на оплату
              </a>
            </button>
            */}
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
