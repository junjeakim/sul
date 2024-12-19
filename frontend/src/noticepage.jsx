import React, { useState } from "react";
import "./style/notice.css"; // 스타일 경로

const NoticePage = () => {
  const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항 상태 추가

  const notices = [
    {
      id: 1,
      title: "설날 배송 지연 안내",
      content:
        "설날 연휴 기간 동안 물류사정으로 인해 배송이 지연될 수 있습니다. 주문하신 상품의 배송이 평소보다 늦어질 수 있으니 양해 부탁드립니다. 급한 주문은 미리 계획해 주세요. 연휴 기간에도 고객 지원은 정상적으로 운영됩니다.",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "상품 매진 및 재입고 안내",
      content:
        "인기 상품들이 매진되었습니다. 매진된 상품은 2주 후에 재입고될 예정입니다. 재입고 알림을 설정해주시면 재입고 시 빠르게 알려드리겠습니다. 구매에 불편을 드려 죄송합니다.",
      date: "2024-01-15",
    },
    {
      id: 3,
      title: "다음달 새로운 상품 입고 예정",
      content:
        "다음달에는 새로운 상품들이 입고될 예정입니다. 최신 위스키와 와인 라인을 포함한 다양한 신상품이 준비되고 있습니다. 많은 관심 부탁드립니다. 구체적인 입고 일정은 추후 공지하겠습니다.",
      date: "2024-02-01",
    },
    {
      id: 4,
      title: "여름 휴가 시즌 배송 일정 안내",
      content:
        "여름 휴가 시즌 동안 배송 일정이 변경됩니다. 일부 지역의 경우 배송이 평소보다 늦어질 수 있습니다. 배송 지연을 최소화하기 위해 최선을 다하겠습니다. 상세 일정은 홈페이지를 참조해 주세요.",
      date: "2024-07-05",
    },
    {
      id: 5,
      title: "블랙프라이데이 할인 이벤트 안내",
      content:
        "블랙프라이데이를 맞아 다양한 상품들을 특별 할인가에 만나보실 수 있습니다. 이벤트 기간 동안 한정 수량으로 제공되며, 조기 품절될 수 있으니 서둘러 주세요. 상세 할인 정보는 이벤트 페이지에서 확인 가능합니다.",
      date: "2024-11-15",
    },
    {
      id: 6,
      title: "신규 회원 가입 혜택 안내",
      content:
        "신규 회원 가입 시 다양한 혜택을 제공합니다. 가입 후 첫 구매 시 즉시 사용 가능한 할인 쿠폰을 드립니다. 또한, 다양한 회원 전용 이벤트에 참여하실 수 있습니다. 지금 바로 가입해 보세요!",
      date: "2024-03-10",
    },
    {
      id: 7,
      title: "추석 맞이 특별 기획전 안내",
      content:
        "추석을 맞아 특별 기획전을 준비했습니다. 가족, 친구와 함께 즐길 수 있는 다양한 술과 기념품을 특별 할인가에 제공하오니 많은 관심 부탁드립니다. 기획전 관련 자세한 내용은 이벤트 페이지에서 확인해 주세요.",
      date: "2024-09-15",
    },
  ];

  return (
    <div className="board-page">
      <h1>공지사항</h1>
      <table className="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              style={{ cursor: "pointer" }}
            >
              <td>{notice.title}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedNotice && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedNotice.title}</h2>
            <div className="modal-body">
              <p>{selectedNotice.content}</p>
            </div>
            <div className="post-footer">작성일: {selectedNotice.date}</div>
            <button
              onClick={() => setSelectedNotice(null)}
              className="close-btn"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticePage;
