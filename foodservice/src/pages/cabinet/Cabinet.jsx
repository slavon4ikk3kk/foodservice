import React, { useEffect, useState } from "react";
import Dish from "../../components/Dish";
import s from "./Cabinet.module.css";
import Dishes from "../../Data/dishes.jsx";

const Cabinet = ({ setProductsList }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    localStorage.setItem("sheetProducts", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Помилка завантаження:", err));
  }, []);
  return (
    <div style={{ padding: "90px 0" }} className="container">
      <ul className={s.list}>
        {products.map((dish) => {
          return (
            <li className={s.item}>
              <Dish
                setProductsList={setProductsList}
                name={dish.name}
                ingredients={dish.ingredients}
                methodCooking={dish.methodCooking}
                price={dish.price}
                id={dish.id}
                image={dish.image}
              ></Dish>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cabinet;
