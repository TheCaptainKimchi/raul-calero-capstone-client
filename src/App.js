import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" />
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
