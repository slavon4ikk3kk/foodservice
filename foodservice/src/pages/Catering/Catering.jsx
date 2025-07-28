import React, { useState, useEffect } from "react";
import s from "./Catering.module.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Api from "../../API/Api";
import Controls from "./Controls";

const NAMES = {
  cold: "Холодні закуски",
  hot: "Гарячі страви",
  flour: "Страви з борошна",
  salad: "Салати",
  fastFood: "Фаст-фуд",
  other: [],
};

const Catering = ({ setProductsList }) => {
  const [catering, setCatering] = useState(() => {
    return [];
  });
  const categories = {
    cold: [],
    hot: [],
    flour: [],
    salad: [],
    fastFood: [],
    other: [],
  };

  useEffect(() => {
    fetch(Api.catering)
      .then((res) => res.json())
      .then(setCatering)
      .catch((err) => console.error("Помилка завантаження обідів:", err));
  }, []);
  if (catering.length > 0) {
    catering.forEach((dish) => {
      if (dish.category === NAMES.hot) {
        categories.hot.push(dish);
        return;
      }
      if (dish.category === NAMES.cold) {
        categories.cold.push(dish);
        return;
      }
      if (dish.category === NAMES.fastFood) {
        categories.fastFood.push(dish);
        return;
      }
      if (dish.category === NAMES.flour) {
        categories.flour.push(dish);
        return;
      }
      if (dish.category === NAMES.salad) {
        categories.salad.push(dish);
        return;
      }

      categories.other.push(dish);
    });
  }

  useEffect(() => {
    localStorage.setItem("sheetCatering", JSON.stringify(catering));
  }, [catering]);
  return (
    <div className={s.dinnerContainer}>
      <p className={s.h1}>Меню 05.2025</p>
      {Object.keys(categories).map((categoryKey) => {
        const dishes = categories[categoryKey];
        if (dishes.length === 0) return null;

        return (
          <React.Fragment key={categoryKey}>
            <p className={s.categoryTitle}>{NAMES[categoryKey]}</p>
            <ul className={s.list}>
              {dishes.map((dish, index) => (
                <li className={s.li} key={index}>
                  <span className={s.name}>{dish.name}</span>
                  <Controls dish={dish} setProductsList={setProductsList} />
                  <div className={s.data}>
                    <p>
                      <strong>Вихід:</strong> {dish.weight}
                    </p>
                    <p>
                      <strong>Ціна:</strong> {dish.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Catering;
