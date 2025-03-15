import React from "react";
import s from "./Success.module.css";
import images from "../../assets/index";
const Success = ({ setSuccessModal }) => {
  return (
    <div className={s.successModal}>
      <div className={s.successModalWrap}>
        <button
          className={s.buttonClose}
          onClick={() => {
            setSuccessModal(false);
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
