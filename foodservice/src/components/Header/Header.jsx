import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import images from "../../assets/index";
import s from "./Header.module.css";
import ShoppingCart from "../Shoppingcart/Shoppingcart";

const Header = ({
  productsList,
  setisOpen,
  isOpen,
  setProductsList,
  setisDinner,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <header className={s.header}>
      {isOpen && (
        <ShoppingCart
          setisOpen={setisOpen}
          productsList={productsList}
          setProductsList={setProductsList}
          setSuccessModal={setSuccessModal}
          successModal={successModal}
        />
      )}
      <div className={s.bagWrap}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="5.7 0 105.5 126.1"
          preserveAspectRatio="xMinYMax meet"
          data-hook="svg-icon-1"
          className={s.bagImg}
        >
          <path d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z"></path>
          <path d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z"></path>
        </svg>
        <p className={s.count} onClick={() => setisOpen(true)}>
          {productsList.length}
        </p>
      </div>
      <div className={s.centerContainer}>
      <p className={s.title}>Комунальне Підприємство "ФУДСЕРВІС"</p>
      </div>
      <button
        className={s.button}
        type="button"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        {openMenu ? (
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#0F1729"
            />
          </svg>
        ) : (
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        )}
      </button>
      {openMenu && (
        <div className={s.dropdownMenu}>
          <ul>
            <li
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              <p
                onClick={() => {
                  setisDinner("cabinet");
                }}
              >
                Напівфабрикати
              </p>
            </li>
            <li
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              <p
                onClick={() => {
                  setisDinner("dinner");
                }}
              >
                Комплексні обіди
              </p>
            </li>
            <li
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              <p
                onClick={() => {
                  setisDinner("catering");
                }}
              >
                Кейтерингове меню
              </p>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
