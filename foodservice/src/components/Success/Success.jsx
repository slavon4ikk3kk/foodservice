import React, {useState} from "react";
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
  const [isConfirmAddress, setIsConfirmAddress] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  async function onSubmit() {
    let validMessage = `Зроблено замовлення: `;
    productsList.forEach((product) => {
      validMessage += `\n${dishes.find((dish) => {
        return product.id === dish.id;
      }).name
        }, Кількість товару: ${product.amount}`;
    });
    validMessage += `\nЗагальна ціна замовлення: ${totalCost} грн`;
    validMessage += `\nІм'я: ${name} \nАдреса: ${address} \nТелефон: ${phone}`;
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
  function HandleName(e){
         setName(e.target.value);
  }
  function HandleAddress(e){
    setAddress(e.target.value);
  }
  function HandlePhone(e){
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
        {isConfirmAddress ?  <p className={s.successModalText}>Замовлення було успішно прийняте!</p> : 
        <form className={s.form}>
        <div className={s.inputWrap}>
          <label className={s.label}>Повне ім'я</label>
          <div className={s.inputContainer}>
            <img src={images.person} className={s.icon} />
            <input 
              className={s.input} 
              value={name} 
              onChange={HandleName} 
              pattern="[A-Za-z ]{1,32}" 
               
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
              pattern="(?=\S*\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d)[a-zA-Z\d\s',.#/-]*$" 
             
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
               
            />
          </div>
        </div>
      
        <button type="submit" onClick={onSubmit} className={s.button}>Підтвердити</button>
      </form>
      }
       
      </div>
    </div>
  );
};

export default Success;
