import React from "react";
import s from "./DinnerItem.module.css";
import images from "../../assets/index.js"
const DinnerItem = ({ dinner, setProductsList }) => {
   function onDelete(){
     setProductsList((prev) =>{
      return prev.map(()=>{
        
      })
     })
   }
  return (
    <div>
      <p className={s.title}>Обід</p>
      <p className={s.date}>{dinner.date}</p>
      <ul>
        {dinner.dishes.map((dish) => {
          return (
            <li className={s.dinnerList}>
              <p>{dish.name}</p>
              <div className={s.dinnerData}>
                <p>{dish.price}₴</p>
                <button className={s.binButton}>
                  <img src={images.bin} className={s.bin}></img>
                </button>
              </div>
            </li>


          );
        })}
      </ul>
    </div>
  );
};

export default DinnerItem;
