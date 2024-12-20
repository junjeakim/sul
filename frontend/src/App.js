import React, { useState } from "react";
import MainPage from "./index.jsx"; // MainPage 컴포넌트를 index.jsx에서 import
import BoardPage from "./boardpage.jsx"; // 자유게시판 컴포넌트를 import
import InquiryPage from "./inquirypage.jsx"; // 문의사항 페이지를 import
import NoticePage from "./noticepage.jsx"; // 공지사항 페이지를 import
import "./App.css"; // 기존 스타일을 유지하고 싶을 때 사용
import MyComponent from "./components/MyComponent"; // MyComponent를 import

const App = () => {
  const [currentPage, setCurrentPage] = useState("main"); // 현재 페이지 상태

  const renderPage = () => {
    switch (currentPage) {
      case "board":
        return <BoardPage />;
      case "inquiry":
        return <InquiryPage />;
      case "notice":
        return <NoticePage />;
      case "data": // 새로운 페이지 추가
        return <MyComponent />;
      default:
        return <MainPage setCurrentPage={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;
