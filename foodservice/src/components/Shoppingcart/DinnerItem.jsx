import React from "react";
import s from "./DinnerItem.module.css";
import images from "../../assets/index.js";
const DinnerItem = ({ dinner, setProductsList }) => {
  function onDelete(name) {
    setProductsList((prev) => {
      return prev
        .filter((item) => {
          if (item.id === dinner.id) {
            if (item.dishes.length === 1) {
              return false;
            }
          }
          return true;
        })
        .map((item) => {
          if (item.id === dinner.id) {
            const newDishList = item.dishes.filter((dish) => {
              return dish.name !== name;
            });
            return { ...item, dishes: newDishList };
          }

          return item;
        });
    });
  }

  return (
    <div className={s.dinnerContainer}>
      <p className={s.title}>Обід</p>
      <p className={s.date}>{dinner.date}</p>
      <ul>
        {dinner.dishes.map((dish) => {
          return (
            <li className={s.dinnerList}>
              <p className={s.dishName}>{dish.name}</p>
              <div className={s.dinnerData}>
                <p>{dish.price ? dish.price + "₴" : "Безкоштовно"}</p>
                <button
                  onClick={() => {
                    onDelete(dish.name);
                  }}
                  className={s.binButton}
                >
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
