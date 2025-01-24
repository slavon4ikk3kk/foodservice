import React, { useState } from 'react'
import s from './Dish.module.css'
const Dish = ({name, ingredients, methodCooking, price}) => {
    const [amount, setAmount] = useState(0);
function HandleAmountChange(e){
    setAmount(e.target.value);
}
console.log(amount);
console.log(price);
  return (
    <div className={s.dishMain}>
      <p>{name}</p>
      <p>Склад: {ingredients}</p>
      <p>Спосіб приготування: {methodCooking}</p>
      <div className={s.dishCart}>
      <input type='number' step={0.5} onChange={HandleAmountChange} value={amount} min={0} className={s.input}></input>
      <p className={s.totalPrice}>{amount*price} ₴</p>
      <button className={s.purchaseButton} style={{font: 'initial'}}>додати до кошика</button>
      </div>
    </div>
  )
}

export default Dish;
