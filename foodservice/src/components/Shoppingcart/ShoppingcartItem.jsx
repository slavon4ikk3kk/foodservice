import React, { useState } from 'react'
import s from "./ShoppingcartItem.module.css"
const ShoppingcartItem = ({amount: storedAmount, currentDish}) => {
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
    
        return (
            
            <div className={s.inputWrap}>
                <p>{currentDish.name}</p>
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
        )
 
    }



    export default ShoppingcartItem;
