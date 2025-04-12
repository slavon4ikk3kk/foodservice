import React from "react";

const DinnerItem = ({ dinner }) => {
  return (
    <div>
      <ul>
        {dinner.dishes.map((dish) => {
          return (
            <li>
              <p>{dish.name}</p>
              <p>{dish.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DinnerItem;
