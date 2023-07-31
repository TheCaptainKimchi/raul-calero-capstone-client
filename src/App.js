import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component imports
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Feature from "./Pages/Feature/Feature";
import Results from "./Pages/Results/Results";
// Page imports
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import RegisterForm from "./Pages/RegisterForm/RegisterForm";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/feature/results" element={<Results />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
