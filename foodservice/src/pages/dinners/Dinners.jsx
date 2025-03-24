import React from "react";
import dinners from "../../Data/dinners";
import s from "./Dinners.module.css";

const Dinners = () => {
   
    
return (
        <div className={s.dinnerContainer}>
            <h2 className={s.title}>Меню обідів</h2>
            <ul className={s.menuList}>
                {dinners.map((dinner) => (
                    <li className={s.menuItem}>
                        <h3 className={s.day} style={{textAlign: "center"}}>{dinner.day}</h3>
                        <ul className={s.itemList}>
                            {dinner.items.map((item) => (
                                <li className={s.liItem}>
                                    <label className={s.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            className={s.checkbox}
                                        />
                                        {item.name} - {item.price} грн
                                    </label>
                                    
                                </li>
                                
                            ))}
                            <button type="submit" className={s.purchaseButton}>
                                        додати до кошика
                                    </button>
                        </ul>
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default Dinners;
