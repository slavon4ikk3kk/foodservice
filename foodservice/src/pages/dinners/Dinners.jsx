import React from "react";
import dinners from "../../Data/dinners";
import s from "./Dinners.module.css";
import { v4 as uuidv4 } from "uuid";
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
  const dateArray = [];
  const currentDay = new Date();
  currentDay.setMonth(9);
  // Визначаємо понеділок для поточного тижня
  const startDate = new Date(currentDay);

  // Якщо сьогодні субота (6) → додаємо 2 дні до понеділка
  // Якщо сьогодні неділя (0) → додаємо 1 день до понеділка
  if (currentDay.getDay() === 6) {
    startDate.setDate(startDate.getDate() + 2);
  } else if (currentDay.getDay() === 0) {
    startDate.setDate(startDate.getDate() + 1);
  } else {
    // Якщо сьогодні будній день → визначаємо понеділок поточного тижня
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
  }

  // Додаємо 5 робочих днів (понеділок – п’ятниця)
  for (let i = 0; i < 5; i++) {
    dateArray.push(new Date(startDate)); // Додаємо копію дати
    startDate.setDate(startDate.getDate() + 1); // Зсуваємо дату на 1 день
  }
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
  }
  return (
    <div className={s.dinnerContainer}>
      <h2 className={s.title}>Меню обідів</h2>
      <ul className={s.menuList}>
        {dinners.map((dinner, index) => (
          <li className={s.menuItem}>
            <form
              data-date={dates[index]}
              data-index={index}
              onSubmit={handleSubmit}
            >
              <h3 className={s.day} style={{ textAlign: "center" }}>
                {dates[index]}
              </h3>
              <ul className={s.itemList}>
                {dinner.items.map((item) => (
                  <li className={s.liItem}>
                    <label className={s.checkboxLabel}>
                      <input type="checkbox" className={s.checkbox} />
                      {item.name} - {item.price} грн
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
