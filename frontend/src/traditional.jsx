import React, { useState } from "react";
import "./style/product.css"; // 공용 스타일 파일 경로

const TraditionalPage = () => {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const products = [
    {
      name: "고운 달 백자 (500ml)",
      price: "324,000원",
      originalPrice: "400,000원",
      image: "./images/traditional/goundal_white.jpg",
      description: [
        "고운 달 백자는 고급스러운 맛과 향을<br>",
        "자랑하는 전통주입니다. 특유의 부드러운 맛과<br>",
        "깊고 복합적인 향이 특징입니다.",
      ].join(""),
    },
    {
      name: "고운달 오크 (500ml)",
      price: "324,000원",
      originalPrice: "400,000원",
      image: "./images/traditional/houndal_oak.jpg",
      description: [
        "고운달 오크는 오크 통에서 숙성된 독특한 향과 맛을<br>",
        "자랑하는 전통주입니다. 부드러운 텍스처와 깊은 향이<br>",
        "특징입니다.",
      ].join(""),
    },
    {
      name: "진도 홍주 (375ml)",
      price: "15,000원",
      originalPrice: "20,000원",
      image: "./images/traditional/hongju.png",
      description: [
        "진도 홍주는 진도에서 생산된 고급 전통주로,<br>",
        "특유의 달콤한 맛과 향이 특징입니다.",
      ].join(""),
    },
    {
      name: "한산소곡주 (750ml)",
      price: "13,000원",
      originalPrice: "16,000원",
      image: "./images/traditional/hansan.png",
      description: [
        "한산소곡주는 한산에서 전통 방법으로 만들어진 전통주로,<br>",
        "고유의 깊은 맛과 향을 자랑합니다.",
      ].join(""),
    },
  ];

  return (
    <div className="product-page">
      <img
        src={require("./images/traditional/main.jpg")}
        alt="Main Product"
        className="product-image main-product-image"
      />
      <div className="title">
        <h1>- 전통주 -</h1>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={require(`${product.image}`)}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
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
                src={require(`${modalContent.image}`)}
                alt={modalContent.name}
                className="modal-image"
              />
            </div>
            <div className="modal-right">
              <h2 className="modal-title">{modalContent.name}</h2>
              <hr className="custom-divider" /> {/* 수평선 추가 */}
              <p className="modal-price">
                <span className="original-price">
                  {modalContent.originalPrice}
                </span>
                <span className="discount-price">{modalContent.price}</span>
              </p>
              <p
                className="modal-description"
                dangerouslySetInnerHTML={{ __html: modalContent.description }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraditionalPage;
