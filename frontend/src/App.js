import React from "react";
import MainPage from "./index.jsx"; // MainPage 컴포넌트를 index.jsx에서 import
import "./App.css"; // 기존 스타일을 유지하고 싶을 때 사용

function App() {
  return (
    <div className="App">
      <MainPage /> 
    </div>
  );
}

export default App;
