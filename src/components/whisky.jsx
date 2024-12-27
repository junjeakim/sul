import React, { useState } from "react";
import "../style/product.css"; // 공용 스타일 파일 경로

const WhiskyPage = () => {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const products = [
    {
      name: "임페리얼 17년 (500ml)",
      price: "120,000원",
      originalPrice: "180,000원",
      image: require("../images/whisky/Imperial17.jpg"),
      description: [
        "임페리얼 17년은 한층 더 부드러워진 맛과 향은<br>",
        "임페리얼 특유의 부드러운 바닐라향은 그대로 살리고<br>",
        "과일맛과 달콤한 토피의 조화가 최상급 스카치 위스키에서만<br>",
        "느낄 수 있는 균형잡힌 부드러움의 진수를 그대로 담아냈습니다.<br><br>",
        "캡을 한번 개봉하면 캡 상단에 옐로우 밴드가 나타나게 되어 쉽게 개봉 여부를 확인할 수 있으며<br>",
        "향상된 리필 방지 기능은 소비자가 더욱 안심하고 임페리얼 제품을 즐기실 수 있습니다.",
      ].join(""),
    },
    {
      name: "임페리얼 19년 (500ml)",
      price: "180,000원",
      originalPrice: "240,000원",
      image: require("../images/whisky/Imperial19.png"),
      description: [
        "임페리얼 19 퀀텀은 차별화된 디자인과 국내 최초 19년산 위스키로<br> 혁신적인 위스키의 대명사가 되었습니다.<br>",
        "국내 주류 브랜드 중 유일하게 ‘2011 코리아스타어워즈’ 에서<br> 지식경제부 장관상을 수상하였고<br>",
        "‘2012 월드스타 패키징 어워즈에서 월드스타위너로 선정되는 등<br>",
        "임페리얼 19 퀀텀의 가치는 국내뿐만 아니라<br> 세계가 인정하고 있는 제품입니다.<br>",
      ].join(""),
    },
    {
      name: "임페리얼 21년 (500ml)",
      price: "240,000원",
      originalPrice: "300,000원",
      image: require("../images/whisky/Imperial21.jpg"),
      description: [
        "21년 이상 숙성된 최고급 원액들만을 엄선해<br> 최상의 블렌딩으로 만들어낸 부드러움의 극치를<br> 모던과 혁신의 정점, 임페리얼 21을 통해 경험하게 될 것입니다.",
      ].join(""),
    },
    {
      name: "패스포트 위스키 (200ml)",
      price: "8,900원",
      originalPrice: "12,000원",
      image: require("../images/whisky/passport200.png"),
      description: [
        "패스포트는 시바스 브라더스의 아이코닉 블렌디드 스카치 위스키로 1965년 마스터 블렌더",
        "'지미 랭'에 의해 첫 출시되었다.<br><br>",
        "스코틀랜드 스페이사이드 지역의 글렌키스 증류소의<br>",
        "시그니쳐 위스키 숙성 원액을 사용하고 있다.<br><br>",
        "1984년 대한민국 최초 스카치 위스키로 출시되었고<br>",
        "1994년 국내 시장 점유율 49.3% 기록한 레전드 제품이다.<br>",
        "모던하고 트렌디한 패키지로 탈바꿈하며 전 세계적으로<br>",
        "매년 1백7십만 상자씩 판매되는 누구든지 가볍고 부담 없이<br>",
        "즐길 수 있는 캐주얼 위스키로 인기를 끌고 있다.<br><br>",
        "가볍고 휴대가 간편한 사이즈",
      ].join(""),
    },
    {
      name: "패스포트 위스키 (350ml)",
      price: "15,400원",
      originalPrice: "20,000원",
      image: require("../images/whisky/passport350.png"),
      description: [
        "패스포트는 시바스 브라더스의 아이코닉 블렌디드 스카치 위스키로 1965년 마스터 블렌더",
        "'지미 랭'에 의해 첫 출시되었다.<br><br>",
        "스코틀랜드 스페이사이드 지역의 글렌키스 증류소의<br>",
        "시그니쳐 위스키 숙성 원액을 사용하고 있다.<br><br>",
        "1984년 대한민국 최초 스카치 위스키로 출시되었고<br>",
        "1994년 국내 시장 점유율 49.3% 기록한 레전드 제품이다.<br>",
        "모던하고 트렌디한 패키지로 탈바꿈하며 전 세계적으로<br>",
        "매년 1백7십만 상자씩 판매되는 누구든지 가볍고 부담 없이<br>",
        "즐길 수 있는 캐주얼 위스키로 인기를 끌고 있다.<br><br>",
        "적당한 사이즈로 파티나 모임에서 즐기기 적합",
      ].join(""),
    },
    {
      name: "패스포트 위스키 (500ml)",
      price: "25,200원",
      originalPrice: "30,000원",
      image: require("../images/whisky/passport500.png"),
      description: [
        "패스포트는 시바스 브라더스의 아이코닉 블렌디드 스카치 위스키로 1965년 마스터 블렌더",
        "'지미 랭'에 의해 첫 출시되었다.<br><br>",
        "스코틀랜드 스페이사이드 지역의 글렌키스 증류소의<br>",
        "시그니쳐 위스키 숙성 원액을 사용하고 있다.<br><br>",
        "1984년 대한민국 최초 스카치 위스키로 출시되었고<br>",
        "1994년 국내 시장 점유율 49.3% 기록한 레전드 제품이다.<br>",
        "모던하고 트렌디한 패키지로 탈바꿈하며 전 세계적으로<br>",
        "매년 1백7십만 상자씩 판매되는 누구든지 가볍고 부담 없이<br>",
        "즐길 수 있는 캐주얼 위스키로 인기를 끌고 있다.<br><br>",
        "더 큰 사이즈로 집에서 두고두고 마시기 좋다",
      ].join(""),
    },
  ];

  return (
    <div className="product-page">
      <img
        src={require("../images/whisky/main.jpg")}
        alt="Main Product"
        className="product-image main-product-image"
      />
      <div className="title">
        <h1>- 임페리얼 -</h1>
      </div>
      <div className="product-list">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={product.image}
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
        <h1>- 패스포트 -</h1>
      </div>
      <div className="product-list">
        {products.slice(3).map((product, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={product.image}
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
                src={modalContent.image}
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

export default WhiskyPage;
