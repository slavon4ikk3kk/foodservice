import React from "react";
import dinners from "../../Data/dinners";
import s from "./Dinners.module.css";
import { v4 as uuidv4 } from "uuid";
import { Notify } from "notiflix";

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const days = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П’ятниця",
  "Субота",
];

const Dinners = ({ setProductsList }) => {
  const generateWorkingDays = () => {
    const result = [];
    const today = new Date();
    let start = new Date(today);
    const dayOfWeek = today.getDay();

    // Якщо субота або неділя → починаємо з наступного понеділка
    if (dayOfWeek === 6) {
      start.setDate(start.getDate() + 2);
    } else if (dayOfWeek === 0) {
      start.setDate(start.getDate() + 1);
    } else {
      // Інакше — понеділок–п’ятниця → з понеділка цього тижня
      start.setDate(start.getDate() - (dayOfWeek - 1));
    }

    // Додаємо 5 робочих днів (Пн–Пт)
    while (result.length < 5) {
      const current = new Date(start);
      const currentDay = current.getDay();
      if (currentDay >= 1 && currentDay <= 5) {
        result.push(current);
      }
      start.setDate(start.getDate() + 1);
    }

    return result;
  };

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
    const dayIndex = e.target.dataset.index;
    const dayDate = e.target.dataset.date;
    const pickedDayItems = dinners[dayIndex].items;

    const userCard = [];
    const inputs = e.target.elements;
    for (const [index, el] of [...inputs].entries()) {
      if (el.checked) {
        userCard.push(pickedDayItems[index]);
        el.checked = false;
      }
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
        {dinners.map((dinner, index) => (
          <li className={s.menuItem} key={index}>
            <form
              data-date={dates[index]}
              data-index={index}
              onSubmit={handleSubmit}
            >
              <h3 className={s.day} style={{ textAlign: "center" }}>
                {dates[index]}
              </h3>
              <ul className={s.itemList}>
                {dinner.items.map((item, itemIndex) => (
                  <li className={s.liItem} key={itemIndex}>
                    <label className={s.checkboxLabel}>
                      <input type="checkbox" className={s.checkbox} />
                      {item.name} -{" "}
                      {item.price ? item.price + "₴" : "безкоштовно"}
                    </label>
                  </li>
                ))}
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
