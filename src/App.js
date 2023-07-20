import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component imports
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Page imports
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" />
          <Route path="/feature" />
          <Route path="/feature/results" />
          <Route path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
