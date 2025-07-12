import React, { useState, useEffect } from "react";
// import dinners from "../../Data/dinners";
import kyrylicNames from "../../helpers/kyrylicNames.js";
import generateWorkingDays from "../../helpers/generateWorkingDays";
import s from "./Dinners.module.css";
import { v4 as uuidv4 } from "uuid";
import { Notify } from "notiflix";

const { days, months } = kyrylicNames;
const Dinners = ({ setProductsList }) => {
  const [dinners, setDinners] = useState(() => {
    const LS = JSON.parse(localStorage.getItem("sheetDinners"));
    if (LS) {
      return LS;
    }
    return [];
  });

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzQoltc2OQ5pTluvrxMxSBRrwW-Lb-oY-O_QnG58nCOuoWJmiRBK1e7KaNeEbpE7zCm/exec"
    )
      .then((res) => res.json())
      .then(setDinners)
      .catch((err) => console.error("Помилка завантаження обідів:", err));
  }, []);

  useEffect(() => {
    if (!dinners || dinners.length === 0) {
      return;
    }
    const productsLs = JSON.parse(localStorage.getItem("products"));

    const filteredProducts = productsLs
      .map((product) => {
        if (product.isDinner) {
          const filterArr = product.dishes.filter((dinnerInLs) => {
            const indexInArray = dinners.find((actualDinner) => {
              return (
                actualDinner.name === dinnerInLs.name &&
                actualDinner.day === dinnerInLs.day
              );
            });

            if (indexInArray === undefined) {
              return false;
            }
            return true;
          });

          return { ...product, dishes: filterArr };
        }

        return product;
      })
      .filter((product) => {
        if (product.isDinner) {
          if (product.dishes.length === 0) {
            return false;
          }
          return true;
        }
        return product;
      });
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    localStorage.setItem("sheetDinners", JSON.stringify(dinners));
  }, [dinners]);

  const dateArray = generateWorkingDays();

  const dates = dateArray.map((someDate) => {
    return (
      days[someDate.getDay()] +
      " " +
      "(" +
      someDate.getDate() +
      " " +
      months[someDate.getMonth()] +
      " " +
      someDate.getFullYear() +
      ")"
    );
  });

  function handleSubmit(e) {
    e.preventDefault();

    const dayIndex = +e.target.dataset.index;

    const dayDate = e.target.dataset.date;

    const pickedDayItems = dinners.filter((dinner) => {
      return dinner.day === dayIndex;
    });
    const userCard = [];
    const inputs = e.target.elements;
    for (const [index, el] of [...inputs].entries()) {
      if (el.checked) {
        userCard.push(pickedDayItems[index]);
        el.checked = false;
      }
    }
    if (userCard.length === 0) {
      Notify.info("Оберіть хоча б один товар!", {
        timeout: 1000,
      });
      return;
    }
    setProductsList((prev) => {
      return [
        ...prev,
        { isDinner: true, dishes: userCard, date: dayDate, id: uuidv4() },
      ];
    });
    Notify.success("Обід доданий у кошик!", {
      timeout: 1000,
    });
  }

  return (
    <div className={s.dinnerContainer}>
      <h2 className={s.title}>Меню обідів</h2>
      <ul className={s.menuList}>
        {dates.map((data, index) => (
          <li className={s.menuItem} key={index}>
            <form
              data-date={data}
              data-index={index + 1}
              onSubmit={handleSubmit}
            >
              <h3 className={s.day} style={{ textAlign: "center" }}>
                {dates[index]}
              </h3>
              <ul className={s.itemList}>
                {dinners
                  .filter((dinner) => {
                    return dinner.day === index + 1;
                  })
                  .map((item, itemIndex) => (
                    <li className={s.liItem} key={itemIndex}>
                      <label className={s.checkboxLabel}>
                        <input type="checkbox" className={s.checkbox} />
                        {item.name} -{" "}
                        {item.price ? item.price + "₴" : "безкоштовно"}
                      </label>
                    </li>
                  ))}

                {/* {dinner.items.map((item, itemIndex) => (
                  <li className={s.liItem} key={itemIndex}>
                    <label className={s.checkboxLabel}>
                      <input type="checkbox" className={s.checkbox} />
                      {item.name} -{" "}
                      {item.price ? item.price + "₴" : "безкоштовно"}
                    </label>
                  </li>
                ))} */}
                <button type="submit" className={s.purchaseButton}>
                  додати до кошика
                </button>
              </ul>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dinners;
