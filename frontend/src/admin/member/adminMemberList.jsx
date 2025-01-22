import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../style/adminMemberList.css"; // 올바른 스타일 경로

const AdminMemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/members")
      .then((response) => {
        setMembers(response.data);  // 서버에서 반환하는 데이터가 올바른지 확인
      })
      .catch((error) => {
        console.error("There was an error fetching the member data!", error);
      });
  }, []);

  return (
    <div className="delivery-container">
      <h1>회원관리</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>회원 ID</th>
            <th>회원 비밀번호</th>
            <th>생년월일</th>
            <th>주소</th>
            <th>이메일</th>
            <th>핸드폰번호</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.mName}</td> {/* 서버에서 제공하는 데이터에 맞게 수정 */}
              <td>{member.mId}</td>
              <td>{member.mPw}</td>
              <td>{member.mBirthday}</td>
              <td>{member.mAddr}</td>
              <td>{member.mEmail}</td>
              <td>{member.mPhone}</td>
              <td>{member.regTM}</td> {/* 가입일 필드명을 확인 */}
              <td>
                <button onClick={() => alert("회원 정보 수정")}>수정</button>
                <button onClick={() => alert("회원 삭제")}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMemberList;
