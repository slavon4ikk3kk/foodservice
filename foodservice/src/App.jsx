import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabinet from "./pages/cabinet/Cabinet";
import Dinners from "./pages/dinners/Dinners";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";

function App() {
  const [productsList, setProductsList] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });
  const [isDinner, setisDinner] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productsList));
  }, [productsList]);
  return (
    <div>
      <Header
        setisOpen={setisOpen}
        productsList={productsList}
        isOpen={isOpen}
        setProductsList={setProductsList}
        setisDinner={setisDinner}
      />
      {isDinner ? (
        <Dinners
          setProductsList={setProductsList}
          productsList={productsList}
        ></Dinners>
      ) : (
        <Cabinet
          setisOpen={setisOpen}
          isOpen={isOpen}
          setProductsList={setProductsList}
          productsList={productsList}
        />
      )}
    </div>
  );
}

export default App;
