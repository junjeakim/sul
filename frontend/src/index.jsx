import React, { useState, useEffect } from "react";
import Header from "./ind/header.jsx"; // Header 컴포넌트 경로
import Footer from "./ind/footer.jsx"; // Footer 컴포넌트 경로
import WhiskyPage from "./whisky.jsx"; // WhiskyPage 컴포넌트 경로
import WinePage from "./wine.jsx"; // WinePage 컴포넌트 경로
import VodcaPage from "./vodca.jsx"; // VodcaPage 컴포넌트 경로
import TraditionalPage from "./traditional.jsx"; // TraditionalPage 컴포넌트 경로
import BoardPage from "./boardpage.jsx"; // BoardPage 컴포넌트 경로
import InquiryPage from "./inquirypage.jsx"; // InquiryPage 컴포넌트 경로
import NoticePage from "./noticepage.jsx"; // NoticePage 컴포넌트 경로
import "./style/style.css"; // CSS 파일 경로

const MainPage = ({ setCurrentPage }) => {
  const [currentPage, setCurrentPageState] = useState("main"); // 현재 페이지 상태
  const [modalContent, setModalContent] = useState(null); // 모달 내용 상태
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
        await loadScript(
          `${process.env.PUBLIC_URL}/script/jquery-3.7.1.min.js`
        ); // jQuery 스크립트 로드
        await loadScript(`${process.env.PUBLIC_URL}/script/script.js`); // 슬라이드 스크립트 로드
      } catch (error) {
        console.error("Failed to load scripts", error);
      }
    };

    loadScripts();

    return () => {
      document.querySelectorAll("script[src*='/script/']").forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

  const products = [
    {
      name: "앱솔루트 (750ml)",
      price: "23,000원",
      originalPrice: "30,000원",
      image: "./images/bodca/absolute.png",
      description: `앱솔루트 보드카는 스웨덴에서 생산된 프리미엄 보드카로,
        순수한 물과 100% 천연 재료만을 사용하여 만들어졌습니다.
        강렬하면서도 부드러운 맛과 깔끔한 뒷맛이 특징입니다.`,
    },
    {
      name: "패스포트 위스키 (500ml)",
      price: "25,200원",
      originalPrice: "30,000원",
      image: "./images/whisky/passport500.png",
      description: `패스포트는 시바스 브라더스의 아이코닉 블렌디드 스카치 위스키로,
        스코틀랜드 스페이사이드 지역의 원액을 사용하며 누구든 부담 없이 즐길 수 있습니다.`,
    },
    {
      name: "임페리얼 17년 (500ml)",
      price: "120,000원",
      originalPrice: "180,000원",
      image: "./images/whisky/Imperial17.jpg",
      description: `임페리얼 17년은 최상급 스카치 위스키로,
        바닐라향과 과일맛의 균형 잡힌 부드러움을 느낄 수 있습니다.`,
    },
    {
      name: "그레이구스 (750ml)",
      price: "68,000원",
      originalPrice: "80,000원",
      image: "./images/bodca/greygoose.png",
      description: `세계 최초의 프랑스산 프리미엄 보드카로,
        고품질 재료와 5회 증류 과정을 거쳐 생산됩니다.`,
    },
  ];

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "whisky":
        return <WhiskyPage />;
      case "wine":
        return <WinePage />;
      case "vodca":
        return <VodcaPage />;
      case "traditional":
        return <TraditionalPage />;
      case "board":
        return <BoardPage userId={uId_Session} />;
      case "inquiry":
        return <InquiryPage />;
      case "notice":
        return <NoticePage />;
      default:
        return (
          <div>
            <div id="mainImgSlideArea">
              <div id="slideshow">
                <img
                  src={require("./images/slide/slide01.jpg")}
                  alt="slideImg"
                />
                <img
                  src={require("./images/slide/slide02.jpg")}
                  alt="slideImg"
                />
              </div>
            </div>
            <h2>Best List</h2>
            <div id="itemListArea" className="dFlex">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="product-card-small"
                  onClick={() => handleCardClick(product)}
                >
                  <div className="itemImgArea">
                    <img
                      src={require(`${product.image}`)}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="itemTxtarea product-info">
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            {modalContent && (
              <div className="modal" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="modal-left">
                    <img
                      src={require(`${modalContent.image}`)}
                      alt={modalContent.name}
                      className="modal-image"
                    />
                  </div>
                  <div className="modal-right">
                    <h2 className="modal-title">{modalContent.name}</h2>
                    <hr className="custom-divider" />
                    <p className="modal-price">
                      <span className="original-price">
                        {modalContent.originalPrice}
                      </span>{" "}
                      <span className="discount-price">
                        {modalContent.price}
                      </span>
                    </p>
                    <p
                      className="modal-description"
                      dangerouslySetInnerHTML={{
                        __html: modalContent.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div id="wrap">
      <Header userId={uId_Session} onMenuClick={setCurrentPageState} />
      <main id="main">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default MainPage;
