import React, { useState } from "react";
import "../style/product.css"; // 공용 스타일 파일 경로

const VodcaPage = () => {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const products = [
    {
      name: "앱솔루트 보드카 (750ml)",
      price: "23,000원",
      originalPrice: "30,000원",
      image: require("../images/bodca/absolute.png"),
      description: [
        "앱솔루트 보드카는 스웨덴에서 생산된 프리미엄 보드카로,<br>",
        "순수한 물과 100% 천연 재료만을 사용하여 만들어졌습니다.<br>",
        "강렬하면서도 부드러운 맛과 깔끔한 뒷맛이 특징입니다.",
      ].join(""),
    },
    {
      name: "앱솔루트 보드카(칵테일) (750ml)",
      price: "26,000원",
      originalPrice: "35,000원",
      image: require("../images/bodca/absolute_mandrin.png"),
      description: [
        "엡솔루트 보드카는 아마도 모든 사람이 알고 있을 것입니다.<br>",
        "126개국 이상에서 연간 9,700만 리터 이상을 판매하며 80,000톤 이상의<br>",
        "자체 생산 겨울 밀 을 사용합니다. 1리터 병을 채우는 데 1킬로그램 이상의<br>",
        "곡물이 사용됩니다. 엡솔루트 보드카는 유리병은 크고 오래된 약국 병처럼<br>",
        "생겼으며 모든 사람에게 다양한 취향을 제공할 수 있습니다.<br><br>",
        "엡솔루트 보드카는 상업용이든 주거용 이든 대부분의 바와 레스토랑에는<br>",
        "일반적으로 세계적으로 유명한 브랜드가 있습니다.<br>",
        "이 보드카는 또한 칵테일 만들기 실험을 즐기는 사람들을 위한<br>",
        "홈 바에 완벽하게 추가됩니다.",
      ].join(""),
    },
    {
      name: "그레이구스 보드카 (750ml)",
      price: "68,000원",
      originalPrice: "80,000원",
      image: require("../images/bodca/greygoose.png"),
      description: [
        "세계 최초의 프랑스산 리얼 프리미엄 보드카.<br>",
        "Gray Goose Vodka는 프랑스에서 매우 고품질의 재료로 생산됩니다.<br>",
        "피카르디(프랑스)의 겨울 밀과 Gensac-la-Pallue(프랑스)의 천연 및<br>",
        "순수한 샘물이 생산에 사용됩니다. 5회 증류 후 순수한 보드카를 40%<br>",
        "부피의 우아한 병에 채웁니다.",
      ].join(""),
    },
    {
      name: "아르키 보드카 (750ml)",
      price: "26,000원",
      originalPrice: "35,000원",
      image: require("../images/bodca/arkhi.png"),
      description: [
        "보드카 “Arkhi” – 독점적인 국가 몽골 음료.<br>",
        "Archi 보드카의 핵심은 엄선된 밀알로 만든 Alpha 클래스의 가장 순수한 알코올입니다.<br>",
        "알코올은 탄소, 석영, 은 필터를 통한 6단계 세척과 다이아몬드 필터를 통한<br>",
        "추가 세척을 거칩니다. 알코올은 179m 깊이에 위치한 회사 자체 우물에서<br>",
        "생산되는 순수한 샘물로 희석됩니다. 추가 여과를 통해 미량의 불순물을 제거하고<br>",
        "결과적으로 부드러운 맛과 탁월한 신선도를 얻을 수 있습니다.<br>",
        "보드카 “Arkhi”는 수많은 국제 전시회 및 대회의 참가자이자 우승자입니다.",
      ].join(""),
    },
    {
      name: "러시안 아이스 보드카 (500ml)",
      price: "23,000원",
      originalPrice: "30,000원",
      image: require("../images/bodca/russian_ice.png"),
      description: [
        "보드카 “러시안 아이스” 는 알코올 “럭스 ” 로 만들어졌으며<br>",
        "은과 금 필터를 사용한 특별한 다층 정화 시스템을 보유했습니다.<br>",
        "병에는 페이푸스 호수의 얼음 전투의 일부를 보여주는 독창적인 디자인이 있습니다.<br>",
        "보드카 “러시안 아이스”-정신이 강하고 고국을 열정적으로 사랑하는 진정한 남성을 위한 음료!<br><br>",
        "테스팅 노트<br>",
        "색상: 보드카 수정처럼 맑고 투명한 색상.<br>",
        "미각: 우리 보드카는 부드럽고 약간 달콤한 맛.<br>",
        "후각: 보드카에는 독특한 보드카 향이 있습니다.",
      ].join(""),
    },
    {
      name: "넵모이 (500ml)",
      price: "16,000원",
      originalPrice: "20,000원",
      image: require("../images/bodca/nepmoi.png"),
      description: [
        "재료: 새로운 찹쌀은 전분 곡물로 만들어집니다.<br>",
        "Halico는 베트남 사람들에 의해 여러 세대에 걸쳐 발견되고 전승된<br>",
        "효모를 기반으로 현대 최고의 효모를 성공적으로 연구하고 배양했습니다.<br><br>",
        "상태: 투명한 액체<br>",
        "색상: 무색<br>",
        "맛: 맛있고 투명하며 매운 맛이 마셨을 때 혀로 흡수됩니다.<br>",
        "또한 특유의 향이 다른 보드카와 확연히 다릅니다.<br>",
        "좋은 효모 덕분에 좋은 술은 우리 선조가 대대로 찾아 헤매고,<br>",
        "할리코가 보존, 연구, 개발하여 현재의 인간의 마음을 사로잡는<br>",
        "유형으로 변모시켰습니다.",
      ].join(""),
    },
    {
      name: "케텔원 보드카 (750ml)",
      price: "50,000원",
      originalPrice: "60,000원",
      image: require("../images/bodca/ketel_one.png"),
      description: [
        "Ketel One 보드카는 100% 밀로 증류되며<br>",
        "네덜란드 Schiedam에 있는 Nolet Distillery에서 만들어집니다.<br>",
        "구리 포트 스틸에서 증류되고 느슨한 목탄으로 여과되며<br>",
        "준비가 될 때까지 타일이 깔린 탱크에 보관됩니다.<br><br>",
        "Ketel One Vodka는 원래 구리 냄비의 이름을 따서 명명되었습니다.<br>",
        "증류기 케텔 #1. 소량으로 손수 제작됩니다.<br>",
        "전통과 품질에 대한 Nolet의 가족적 감각과 독특한 판촉 캠페인이 결합되어<br>",
        "네덜란드의 보드카가 세계를 강타하고 있음을 확신시켰습니다.<br>",
        "유럽에서 여전히 내부자들의 음료인 Ketel One은 이미 많은 미국 스타들,<br>",
        "예를 들어 성공적인 래퍼 Pitbull에게 깊은 인상을 남겼습니다.",
      ].join(""),
    },
    {
      name: "티토스 보드카 (750ml)",
      price: "40,000원",
      originalPrice: "50,000원",
      image: require("../images/bodca/titos.png"),
      description: [
        "Tito의 수제 보드카는 텍사스 주에 있는 미국에서 가장 오래된 양조장에서<br>",
        "세부 사항, 품질 및 진품에 세심한 주의를 기울여 생산됩니다.<br>",
        "소규모 파티는 시장에 출시되기 전에 테스트되고 시식됩니다.<br>",
        "증류는 전통적인 냄비 증류기에서 이루어집니다.<br><br>",
        "보드카의 맛과 향은 아무것도 남기지 않습니다.<br>",
        "그들은 중립면에서 더 일반적으로 발견되며 특별한 부드러움과 순수성을 부여합니다.<br>",
        "Tito의 수제 보드카는 롱 드링크와 칵테일을 혼합하는 데 사용할 수 있는<br>",
        "몇 안 되는 보드카 중 하나입니다.",
      ].join(""),
    },
  ];

  return (
    <div className="product-page">
      <img
        src={require("../images/bodca/Vodka Wyborowa Design.012 copy.jpg")}
        alt="Main Product"
        className="product-image main-product-image"
      />
      <div className="title">
        <h1>- 보드카 -</h1>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
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

export default VodcaPage;
