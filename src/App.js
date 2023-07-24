import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Feature from "./Pages/Feature/Feature";
import Results from "./Pages/Results/Results";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/about" />
          <Route path="/feature" element={<Feature />} />
          <Route path="/feature/results" element={<Results />} />
          <Route path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
