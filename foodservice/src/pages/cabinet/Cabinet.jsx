import React, { useState } from "react";
import Dish from "../../components/Dish";
import s from "./Cabinet.module.css";
import Header from "../../components/Header/Header";
import Dishes from "../../Data/dishes";
import ShoppingCart from "../../components/Shoppingcart/Shoppingcart";

const Cabinet = () => {
  const [productsList, setProductsList] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });
  const [isOpen, setisOpen] = useState(false);

  return (
    <div style={{ padding: "90px 0" }} className="container">
      <Header setisOpen={setisOpen} productsList={productsList} />
      {isOpen && (
        <ShoppingCart
          setisOpen={setisOpen}
          productsList={productsList}
          setProductsList={setProductsList}
        />
      )}
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
