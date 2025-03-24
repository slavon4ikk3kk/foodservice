import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabinet from "./pages/cabinet/Cabinet";
import Dinners from "./pages/dinners/Dinners";


function App() {
  return (
    <div>
      <Router>
        
          
          <Routes>
            <Route path="/*" element={<Cabinet />} />
            <Route path="/dinners" element={<Dinners />} />
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;