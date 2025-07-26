import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabinet from "./pages/cabinet/Cabinet";
import Dinners from "./pages/dinners/Dinners";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Catering from "./pages/Catering/Catering";

function App() {
  const [productsList, setProductsList] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });
  const [page, setPage] = useState("dinner");
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
        setPage={setPage}
      />
      {page === "dinner" && (
        <Dinners
          setProductsList={setProductsList}
          productsList={productsList}
        ></Dinners>
      )}
      {page === "cabinet" && (
        <Cabinet
          setisOpen={setisOpen}
          isOpen={isOpen}
          setProductsList={setProductsList}
          productsList={productsList}
        />
      )}
      {page === "catering" && (
        <Catering
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
