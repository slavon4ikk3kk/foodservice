import React, { useEffect } from "react";
import Dish from "../../components/Dish";
import s from "./Cabinet.module.css";
import Dishes from "../../Data/dishes.jsx";


const Cabinet = ({setProductsList }) => {
  return (
    <div style={{ padding: "90px 0" }} className="container">
      <ul className={s.list}>
        {Dishes.map((dish) => {
          return (
            <li>
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
