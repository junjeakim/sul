import React, { useState, useEffect } from "react";
import "./style/inquiry.css"; // CSS 파일 경로

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState(""); // 작성자 이름 상태 추가
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiryType, setInquiryType] = useState(""); // 문의내용 타입 상태 추가
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 선택된 문의사항 상태 추가

  // 로컬 저장소에서 문의사항을 불러오는 함수
  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
    setInquiries(storedInquiries);
  }, []);

  // 문의사항이 변경될 때마다 로컬 저장소에 저장하는 함수
  useEffect(() => {
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // 글쓰기 버튼 클릭 시 글쓰기 폼 표시
  const handleWriteClick = () => {
    setIsWriting(true);
  };

  // 취소 버튼 클릭 시 글쓰기 폼 숨기기
  const handleCancelClick = () => {
    setIsWriting(false);
    setAuthor(""); // 작성자 이름 초기화
    setTitle("");
    setContent("");
    setInquiryType("");
  };

  // 글쓰기 폼 제출 시 새로운 문의사항 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInquiry = {
      id: Date.now(),
      author, // 작성자 이름 추가
      title,
      content,
      inquiryType,
      date: new Date().toLocaleString(),
    };
    setInquiries([...inquiries, newInquiry]);
    setIsWriting(false);
    setAuthor(""); // 작성자 이름 초기화
    setTitle("");
    setContent("");
    setInquiryType("");
  };

  // 문의사항 삭제 함수
  const handleDelete = (id) => {
    const updatedInquiries = inquiries.filter((inquiry) => inquiry.id !== id);
    setInquiries(updatedInquiries);
  };

  return (
    <div className="inquiry-board-page">
      <h1>문의사항</h1>
      <table className="inquiry-post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>문의내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td
                onClick={() => setSelectedInquiry(inquiry)}
                style={{ cursor: "pointer" }}
              >
                {inquiry.title}
              </td>
              <td>{inquiry.author}</td>
              <td>{inquiry.date}</td>
              <td>{inquiry.inquiryType}</td>
              <td>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="inquiry-delete-btn"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 선택된 문의사항 내용 표시 */}
      {selectedInquiry && (
        <div className="inquiry-modal">
          <div className="inquiry-modal-content">
            <h2>{selectedInquiry.title}</h2>
            <div className="inquiry-modal-body">
              <p>{selectedInquiry.content}</p>
            </div>
            <div className="inquiry-post-footer">
              {selectedInquiry.author} | {selectedInquiry.date}
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="inquiry-close-btn"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      {isWriting && (
        <form onSubmit={handleSubmit} className="inquiry-write-form">
          <select
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            required
          >
            <option value="" disabled>
              문의내용 선택
            </option>
            <option value="배송문의">배송문의</option>
            <option value="제품문의">제품문의</option>
            <option value="환불문의">환불문의</option>
            <option value="기타문의">기타문의</option>
          </select>
          <input
            type="text"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className="inquiry-form-buttons">
            <button type="submit">등록</button>
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          </div>
        </form>
      )}
      {!isWriting && (
        <button onClick={handleWriteClick} className="inquiry-write-btn">
          글쓰기
        </button>
      )}
    </div>
  );
};

export default InquiryPage;
