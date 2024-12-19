import React, { useState, useEffect } from "react";
import Header from "./ind/header.jsx"; // Header 컴포넌트 경로
import Footer from "./ind/footer.jsx"; // Footer 컴포넌트 경로
import WhiskyPage from "./whisky.jsx"; // WhiskyPage 컴포넌트 경로
import WinePage from "./wine.jsx"; // WinePage 컴포넌트 경로
import VodcaPage from "./vodca.jsx"; // VodcaPage 컴포넌트 경로
import TraditionalPage from "./traditional.jsx"; // TraditionalPage 컴포넌트 경로
import "./style/style.css"; // CSS 파일 경로

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState("main"); // 현재 페이지 상태
  const uId_Session = sessionStorage.getItem("userId"); // 세션에서 userId 가져오기

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript(`${process.env.PUBLIC_URL}/script/jquery-3.7.1.min.js`); // jQuery 스크립트 로드
        await loadScript(`${process.env.PUBLIC_URL}/script/script.js`); // 슬라이드 스크립트 로드
      } catch (error) {
        console.error("Failed to load scripts", error);
      }
    };

    loadScripts();

    return () => {
      document.querySelectorAll("script[src*='/script/']").forEach(script => {
        document.body.removeChild(script);
      });
    };
  }, []);

  const renderPage = () => {
    if (currentPage === "whisky") {
      return <WhiskyPage />;
    }
    if (currentPage === "wine") {
      return <WinePage />;
    }
    if (currentPage === "vodca") {
      return <VodcaPage />;
    }
    if (currentPage === "traditional") {
      return <TraditionalPage />;
    }
    return (
      <div>
        <div id="mainImgSlideArea">
          <div id="slideshow">
            <img src={require("./images/slide/slide01.jpg")} alt="slideImg" /> {/* 슬라이드 이미지 1 */}
            <img src={require("./images/slide/slide02.jpg")} alt="slideImg" /> {/* 슬라이드 이미지 2 */}
          </div>
        </div>
        <h2 style={{ display: 'none' }}>Best List</h2> {/* 텍스트를 감싸는 요소에 display: none; 스타일 적용 */}
        <div id="itemListArea" className="dFlex">
          <div id="item">
            <div className="itemImgArea">
              <img src={require("./images/whisky/Imperial17.jpg")} alt="itemImg" /> {/* 상품 이미지 1 */}
            </div>
            <div className="itemTxtarea">
              <span>임페리얼 17년</span> <span>120000원</span> {/* 상품 설명 */}
            </div>
          </div>
          <div id="item">
            <div className="itemImgArea">
              <img src={require("./images/whisky/Imperial17.jpg")} alt="itemImg" /> {/* 상품 이미지 2 */}
            </div>
            <div className="itemTxtarea">
              <span>임페리얼 17년</span> <span>120000원</span> {/* 상품 설명 */}
            </div>
          </div>
          <div id="item">
            <div className="itemImgArea">
              <img src={require("./images/whisky/Imperial19.png")} alt="itemImg" /> {/* 상품 이미지 3 */}
            </div>
            <div className="itemTxtarea">
              <span>임페리얼 19년</span> <span>180000원</span> {/* 상품 설명 */}
            </div>
          </div>
          <div id="item">
            <div className="itemImgArea">
              <img src={require("./images/whisky/Imperial21.jpg")} alt="itemImg" /> {/* 상품 이미지 4 */}
            </div>
            <div className="itemTxtarea">
              <span>임페리얼 21년</span> <span>240000원</span> {/* 상품 설명 */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="wrap">
      <Header userId={uId_Session} onMenuClick={setCurrentPage} /> {/* Header 컴포넌트 */}
      <main id="main">{renderPage()}</main> {/* Main Content */}
      <Footer /> {/* Footer 컴포넌트 */}
    </div>
  );
};

export default MainPage;
