import React, { useState } from "react";
import "./style/product.css"; // 공용 스타일 파일 경로

const WinePage = () => {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const products = [
    {
      name: "무똥 까데 리저브 마고 (750ml)",
      price: "116,000원",
      originalPrice: "150,000원",
      image: "./images/wine/moutoncadet_re.png",
      description: [
        "무똥 까데 리저브 마고는 부드러운 탄닌과 함께<br>",
        "과일의 풍미가 조화를 이루는 최고급 와인입니다.<br>",
        "프랑스 보르도 지역의 전통적인 방법으로 만들어졌으며<br>",
        "깊고 복합적인 맛이 특징입니다.",
      ].join(""),
    },
    {
      name: "무똥 까데 헤리티지 (750ml)",
      price: "36,000원",
      originalPrice: "45,000원",
      image: "./images/wine/moutoncadet_heretigi.png",
      description: [
        "무똥 까데 헤리티지는 고급스러운 맛과 향을<br>",
        "자랑하는 와인으로, 레드 베리와 스파이스 향이<br>",
        "어우러져 깊은 맛을 제공합니다.",
      ].join(""),
    },
    {
      name: "무똥 까데 소비뇽 블랑 (750ml)",
      price: "24,500원",
      originalPrice: "30,000원",
      image: "./images/wine/moutoncadet_sauvignon.png",
      description: [
        "무똥 까데 소비뇽 블랑은 상쾌하고 신선한 맛이<br>",
        "특징인 화이트 와인입니다.<br>",
        "잘 익은 과일과 시트러스의 풍미가 입안을 가득 채웁니다.",
      ].join(""),
    },
    {
      name: "무똥 까데 리저브 쏘테른 (375ml)",
      price: "76,000원",
      originalPrice: "90,000원",
      image: "./images/wine/moutoncadet_sauternes.png",
      description: [
        "무똥 까데 리저브 쏘테른은 달콤하고<br>",
        "우아한 맛을 자랑하는 디저트 와인입니다.<br>",
        "벌꿀과 말린 과일의 풍부한 향이 입안을 감싸며,<br>",
        "섬세하고 균형 잡힌 맛을 제공합니다.",
      ].join(""),
    },
    {
      name: "차구알 까베르네 소비뇽 (750ml)",
      price: "35,000원",
      originalPrice: "40,000원",
      image: "./images/wine/los_vascos.png",
      description: [
        "로스 바스코스 차구알 까베르네 소비뇽은<br>",
        "풍부한 과일 향과 함께 부드러운 탄닌이<br>",
        "조화를 이루는 고급 와인입니다.",
      ].join(""),
    },
    {
      name: "차구알 소비뇽 블랑 (750ml)",
      price: "35,000원",
      originalPrice: "40,000원",
      image: "./images/wine/los_vascos_blang.png",
      description: [
        "로스 바스코스 차구알 소비뇽 블랑은<br>",
        "신선하고 상쾌한 맛이 특징인 화이트 와인입니다.<br>",
        "잘 익은 과일과 시트러스의 풍미가 입안을 가득 채웁니다.",
      ].join(""),
    },
    {
      name: "로스 바스코스 샤도네이 (750ml)",
      price: "21,000원",
      originalPrice: "25,000원",
      image: "./images/wine/los_vascos_thato.png",
      description: [
        "로스 바스코스 샤도네이는<br>",
        "신선하고 상쾌한 맛과 함께<br>",
        "부드러운 텍스처를 자랑하는 화이트 와인입니다.",
      ].join(""),
    },
    {
      name: "로스 바스코스 로제 (750ml)",
      price: "21,000원",
      originalPrice: "25,000원",
      image: "./images/wine/los_vascos_rose.png",
      description: [
        "로스 바스코스 로제는 프레시하고<br>",
        "과일의 향이 가득한 로제 와인입니다.<br>",
        "붉은 베리와 시트러스 향이 조화를 이루며,<br>",
        "부드럽고 상쾌한 마무리를 자랑합니다.",
      ].join(""),
    },
  ];

  return (
    <div className="product-page">
      <img
        src={require("./images/wine/main.jpg")}
        alt="Main Product"
        className="product-image main-product-image"
      />
      <div className="title">
        <h1>- 무똥까데 -</h1>
      </div>
      <div className="product-list">
        {products.slice(0, 4).map((product, index) => (
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
      <div className="title">
        <h1>- 로스 바스코스 -</h1>
      </div>
      <div className="product-list">
        {products.slice(4).map((product, index) => (
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
              <div className="modal-buttons">
                <button className="modal-button">관심상품 등록</button>
                <button className="modal-button">장바구니 추가</button>
                <button className="modal-button">바로구매 하기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinePage;
