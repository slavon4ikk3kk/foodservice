import React, { useEffect, useState } from "react";
import Dish from "../../components/Dish";
import s from "./Cabinet.module.css";
import Dishes from "../../Data/dishes.jsx";

const Cabinet = ({ setProductsList }) => {
  const [products, setProducts] = useState([]);
  const [dinners, setDinners] = useState([]);
  
  useEffect(() => {
    localStorage.setItem("sheetProducts", "sheetDinners", JSON.stringify(products, dinners));
  }, [products, dinners]);

   
 
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxqoFtUA_dQltE6iAdqL5ytSTvsdk2MahA4pUdGK2zyM_pQb6iouhBJjbXTTyhqHrG_/exec"
    )
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Помилка завантаження продуктів:", err));
  }, []);

  
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzQoltc2OQ5pTluvrxMxSBRrwW-Lb-oY-O_QnG58nCOuoWJmiRBK1e7KaNeEbpE7zCm/exec"
    )
      .then((res) => res.json())
      .then(setDinners)
      .catch((err) => console.error("Помилка завантаження обідів:", err));
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
