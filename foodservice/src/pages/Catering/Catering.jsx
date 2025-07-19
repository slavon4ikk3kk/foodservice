import React, { useState, useEffect } from "react";
import s from "./Catering.module.css";

const Catering = () => {
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
    fetch(
      "https://script.google.com/macros/s/AKfycby6Dw51AY84hUh2QHFN76XM3Jjj9jrCUe98dtzZI-lG_TWbBBOJpNbke_5zlwI37Ojx/exec"
    )
      .then((res) => res.json())
      .then(setCatering)
      .catch((err) => console.error("Помилка завантаження обідів:", err));
  }, []);
  if (catering.length > 0) {
    catering.forEach((dish) => {
      if (dish.category === "гарячі страви") {
        categories.hot.push(dish);
        return;
      }
      if (dish.category === "холодні закуски") {
        categories.cold.push(dish);
        return;
      }
      if (dish.category === "фастфуд") {
        categories.fastFood.push(dish);
        return;
      }
      if (dish.category === "страви з борошна") {
        categories.flour.push(dish);
        return;
      }
      if (dish.category === "салати") {
        categories.salad.push(dish);
        return;
      }

      categories.other.push(dish);
    });
  }
  console.log(categories);
  return (
    <div className={s.dinnerContainer}>
      <p>catering</p>
      {Object.keys(categories).map((categoryBlock) => {
        console.log(categoryBlock);
        if (categories[categoryBlock].length === 0) {
          return;
        }
        return (
          <>
            <p>{categoryBlock}</p>
            <ul>
              {categories[categoryBlock].map((dish) => {
                return (
                  <li>
                    <p>{dish.name}</p>
                    <p>{dish.weight}</p>
                    <p>{dish.price}</p>
                  </li>
                );
              })}
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default Catering;
