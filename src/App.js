import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import MainPage from "./components/MainPage";
import BoardPage from "./components/boardpage";
import InquiryPage from "./components/inquirypage";
import NoticePage from "./components/noticepage";
import MyComponent from "./components/MyComponent";
import VodcaPage from "./components/vodca";
import WinePage from "./components/wine";
import WhiskyPage from "./components/whisky";
import TraditionalPage from "./components/traditional";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/data" element={<MyComponent />} />
            <Route path="/vodca" element={<VodcaPage />} />
            <Route path="/wine" element={<WinePage />} />
            <Route path="/whisky" element={<WhiskyPage />} />
            <Route path="/traditional" element={<TraditionalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
