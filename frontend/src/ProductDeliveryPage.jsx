import React, { useState } from "react";
import "./style/delivery_style.css"; // 올바른 스타일 경로

const ProductDeliveryPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sections = [
    {
      title: "회원가입 안내",
      content:
        "본 사이트는 회원 가입을 해야만 제품 주문이 가능하며, 사이트 이용에 지장이 없습니다. 회원 가입 후 다양한 혜택을 누리실 수 있습니다.",
    },
    {
      title: "주문 안내",
      content:
        "[상품주문]은 회원 전용으로 제공되며, 비회원은 이용이 제한될 수 있습니다. 고객님께서 원하시는 상품을 검색하여 장바구니에 담으시거나 바로 구매하기를 클릭 후 주문서를 작성하시면 됩니다. 주문 내역은 확인 후 전화 연락드리며, 배송 마감 시간이 임박한 경우 선배송 후 연락드릴 수 있습니다.",
    },
    {
      title: "결제 안내",
      content:
        "수입 주류는 전통주를 제외하고 매장을 방문하셔야만 택배가 가능하며, 일반 식품과 달리 별도의 배송비가 부과됩니다. 가까운 주류점과 연계하여 직접 찾아오시지 않아도 가까운 주류 판매점에서 수령하실 수 있는 방법도 제공됩니다.",
    },
    {
      title: "배송 안내",
      content:
        "배송 방법: 로젠택배\n배송 비용: 50,000원 이상 무료, 미만 4,000원 (제주도 및 도서산간 제외)\n배송 기간: 1~2일\n단, 주류의 경우 현행 주류법상 매장을 방문하셔야 배송 접수가 가능합니다.",
    },
    {
      title: "교환/반품 안내",
      content:
        "상품을 공급 받으신 날로부터 7일 이내 교환 및 반품이 가능합니다. 상품이 훼손되었거나 시간이 경과한 경우 교환 및 반품이 불가능합니다.",
    },
    {
      title: "환불 안내",
      content:
        "환불은 반품 확인 후 3일 이내에 진행됩니다. 환불 전 반드시 고객센터로 연락 부탁드립니다.",
    },
    {
      title: "기타 안내",
      content:
        "주문으로 발생한 적립금은 배송 완료 후 14일이 지나야 사용 가능합니다. 적립금은 최종 발생일로부터 3년 동안 추가 적립이 없을 경우 소멸됩니다.",
    },
  ];

  return (
    <div className="delivery-container">
      <h1>이용안내</h1>
      <div className="accordion">
        {sections.map((section, index) => (
          <div key={index} className="accordion-item">
            <div
              className={`accordion-header ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {section.title}
            </div>
            <div
              className="accordion-content"
              style={{
                display: activeIndex === index ? "block" : "none",
              }}
            >
              {section.content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDeliveryPage;
