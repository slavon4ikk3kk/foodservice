import React, { useState, useEffect } from "react";
import s from "./Catering.module.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const NAMES = {
  cold: "Холодні закуски",
  hot: "Гарячі страви",
  flour: "Страви з борошна",
  salad: "Салати",
  fastFood: "Фаст-фуд",
  other: [],
};

const Catering = ({setProductsList}) => {
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

  const [amount, setAmount] = useState(0);
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
  function handleSubmit(e) {
      e.preventDefault();
      if (amount === 0) {
        return;
      }
      setProductsList((prev) => {
        const isInCart = prev.some((dishObj) => {
          return dishObj.id === id;
        });
        if (isInCart) {
          return prev.map((dishObj) => {
            if (dishObj.id === id) {
              return {
                id,
                amount: amount + dishObj.amount,
                price: dishObj.price,
                isDinner: "catering",
                name: dishObj.name,
              };
            }
            return dishObj;
          });
        }
        return [...prev, { id, amount, price, isDinner: "catering", name }];
      });
      Notify.success("Товар доданий у кошик!", {
        timeout: 1000,
      });
      setAmount(0);
    }
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
  console.log(categories);
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
                  <form className={s.form} onSubmit={handleSubmit}>
                    <div className={s.dishCart}>
                      <div className={s.inputWrap}>
                        <button
                          onClick={handlePlus}
                          className={s.plus}
                          type="button"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="sTccf4a"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13,5 L13,12 L20,12 L20,13 L13,13 L13,20 L12,20 L11.999,13 L5,13 L5,12 L12,12 L12,5 L13,5 Z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          style={{ color: amount === 0 ? "gray" : "black" }}
                          onClick={handleMinus}
                          className={s.minus}
                          type="button"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="sTccf4a"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M20,12 L20,13 L5,13 L5,12 L20,12 Z"
                            ></path>
                          </svg>
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

                      <button type="submit" className={s.purchaseButton}>
                        додати до кошика
                      </button>
                    </div>
                  </form>
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
