import React, { useState } from "react";
import "./style/style.css"; // CSS 파일 경로
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const MainPage = () => {
  const [modalContent, setModalContent] = useState(null); // 모달 내용 상태

  const products = [
    {
      name: "앱솔루트 (750ml)",
      price: "23,000원",
      originalPrice: "30,000원",
      image: require("./images/bodca/absolute.jpg"),
      description: `앱솔루트 보드카는 스웨덴에서 생산된 프리미엄 보드카로,
        순수한 물과 100% 천연 재료만을 사용하여 만들어졌습니다.
        강렬하면서도 부드러운 맛과 깔끔한 뒷맛이 특징입니다.`,
    },
    {
      name: "패스포트 위스키 (500ml)",
      price: "25,200원",
      originalPrice: "30,000원",
      image: require("./images/whisky/passport500.png"),
      description: `패스포트는 시바스 브라더스의 아이코닉 블렌디드 스카치 위스키로,
        스코틀랜드 스페이사이드 지역의 원액을 사용하며 누구든 부담 없이 즐길 수 있습니다.`,
    },
    {
      name: "임페리얼 17년 (500ml)",
      price: "120,000원",
      originalPrice: "180,000원",
      image: require("./images/whisky/Imperial17.jpg"),
      description: `임페리얼 17년은 최상급 스카치 위스키로,
        바닐라향과 과일맛의 균형 잡힌 부드러움을 느낄 수 있습니다.`,
    },
    {
      name: "그레이구스 (750ml)",
      price: "68,000원",
      originalPrice: "80,000원",
      image: require("./images/bodca/greygoose.png"),
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
    return (
      <div>
        <div id="mainImgSlideArea">
          <div id="slideshow">
            <img src={require("./images/slide/slide01.jpg")} alt="slideImg" />
            <img src={require("./images/slide/slide02.jpg")} alt="slideImg" />
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
                  src={product.image}
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
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="modal-left">
                <img
                  src={modalContent.image}
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
                  <span className="discount-price">{modalContent.price}</span>
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
  };

  return (
    <div id="wrap">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          level="h6"
          sx={{
            textTransform: "uppercase",
            mb: 2,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          
        </Typography>
        {renderContent()}
      </Box>
    </div>
  );
};

export default MainPage;
