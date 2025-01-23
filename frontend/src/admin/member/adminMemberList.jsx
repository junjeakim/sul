import React, { useState, useEffect } from "react";
import "./../../style/adminMemberList.css"; // CSS 파일 경로

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // 멤버 목록을 가져오는 API 호출을 여기에 추가
    fetch("/api/members") // 예시 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error("API 응답이 배열이 아닙니다:", data);
        }
      });
  }, []);

  const deleteMember = (memberId) => {
    // 회원 삭제 API 호출
    fetch(`/api/members/${memberId}`, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== memberId));
      } else {
        console.error("회원 삭제 실패:", response);
      }
    });
  };

  return (
    <div className="admin-member-list-content">
      <h1>회원 목록</h1>
      <table className="admin-member-table">
        <thead>
          <tr>
            <th>사진</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>
                <img
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  className="member-photo"
                />
              </td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.joinDate}</td>
              <td>
                <button
                  onClick={() => deleteMember(member.id)}
                  className="admin-member-button"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
