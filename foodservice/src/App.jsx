import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabinet from "./pages/cabinet/Cabinet";
import Dinners from "./pages/dinners/Dinners";
import { useState } from "react";
import Header from "./components/Header/Header";

function App() {
  const [productsList, setProductsList] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });
  const [isOpen, setisOpen] = useState(false);

  return (
    <Router>
      <div>
        <Header setisOpen={setisOpen} productsList={productsList} />

        <Routes>
          <Route
            path="/*"
            element={
              <Cabinet
                setisOpen={setisOpen}
                isOpen={isOpen}
                setProductsList={setProductsList}
                productsList={productsList}
              />
            }
          />
          <Route
            path="/dinners"
            element={
              <Dinners
                setProductsList={setProductsList}
                productsList={productsList}
              ></Dinners>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
