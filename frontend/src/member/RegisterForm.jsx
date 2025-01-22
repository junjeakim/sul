import React, { useState, useEffect } from "react";
import "./../style/Join.css";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState(() => {
    // 새로고침 시 저장된 데이터 복원
    const savedData = JSON.parse(localStorage.getItem("formData")) || {
      mName: "",
      mId: "",
      mPw: "",
      mPw2: "",
      mEmail: "",
      mEmail2: "",
      mBirthday: "",
      mPhone: "",
      mAddr: "",
    };
    return savedData;
  });
  const [idCheck, setIdCheck] = useState(
    () => JSON.parse(localStorage.getItem("idCheck")) || false
  );
  const [customEmail, setCustomEmail] = useState(false);

  useEffect(() => {
    // formData와 idCheck 상태를 localStorage에 저장
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("idCheck", JSON.stringify(idCheck));
  }, [formData, idCheck]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mPw !== formData.mPw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!idCheck) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:8081/api/member/join",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        alert("회원가입이 완료되었습니다!");
        localStorage.removeItem("formData"); // 성공 시 저장된 데이터를 삭제
        localStorage.removeItem("idCheck");
        window.location.href = "/login";
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const checkIdDuplicate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/member/id-check",
        {
          params: { mId: formData.mId },
        }
      );
      if (response.data.success && response.data.isAvailable) {
        setIdCheck(true);
        alert("사용 가능한 아이디입니다.");
      } else {
        setIdCheck(false);
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("ID 확인 에러: ", error);
      alert("ID 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const toggleCustomEmail = (e) => {
    const isCustom = e.target.value === "custom";
    setCustomEmail(isCustom);
    if (!isCustom) {
      setFormData({ ...formData, mEmail2: e.target.value });
    } else {
      setFormData({ ...formData, mEmail2: "" });
    }
  };

  const handleEmailCustomChange = (e) => {
    setFormData({ ...formData, mEmail2: e.target.value });
  };

  return (
    <div className="join_area">
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <h2>
          <span style={{ color: "#ff0000" }}>*</span>회원정보
        </h2>

        <table className="sample-table">
          <tbody>
            <tr>
              <td className="title">이름</td>
              <td>
                <input
                  type="text"
                  name="mName"
                  placeholder="이름을 입력하세요"
                  value={formData.mName}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="title">아이디</td>
              <td>
                <div className="input-container">
                  <input
                    className="textArea"
                    type="text"
                    name="mId"
                    maxLength="20"
                    placeholder="대,소문자와 숫자만"
                    value={formData.mId}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="textbtn"
                    onClick={checkIdDuplicate}
                  >
                    중복확인
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title">비밀번호</td>
              <td>
                <input
                  type="password"
                  name="mPw"
                  placeholder="영문, 숫자 포함 8자리 이상"
                  value={formData.mPw}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="title">비밀번호 확인</td>
              <td>
                <input
                  type="password"
                  name="mPw2"
                  placeholder="비밀번호 확인"
                  value={formData.mPw2}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="title">이메일</td>
              <td>
                <div className="email-container">
                  <input
                    type="text"
                    name="mEmail"
                    placeholder="이메일"
                    value={formData.mEmail}
                    onChange={handleChange}
                    required
                  />
                  <i>@&nbsp;</i>
                  {!customEmail ? (
                    <select
                      name="mEmail2"
                      onChange={toggleCustomEmail}
                      value={formData.mEmail2}
                    >
                      <option value="">선택</option>
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="custom">직접입력</option>
                    </select>
                  ) : (
                    <input
                      className="direct-input"
                      type="text"
                      name="mEmail2"
                      placeholder="도메인을 입력하세요"
                      value={formData.mEmail2}
                      onChange={handleEmailCustomChange}
                      required
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="title">생년월일</td>
              <td>
                <input
                  type="date"
                  name="mBirthday"
                  value={formData.mBirthday}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="title">전화번호</td>
              <td>
                <input
                  type="text"
                  name="mPhone"
                  placeholder="전화번호"
                  value={formData.mPhone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="title">주소</td>
              <td>
                <input
                  type="text"
                  name="mAddr"
                  placeholder="주소"
                  value={formData.mAddr}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div id="btn">
          <button className="btnArea" type="submit">
            확인
          </button>
          &nbsp;&nbsp;
          <button
            className="btnArea"
            type="reset"
            onClick={() => {
              localStorage.removeItem("formData"); // 초기화 시 저장 데이터 삭제
              localStorage.removeItem("idCheck");
              setFormData({
                mName: "",
                mId: "",
                mPw: "",
                mPw2: "",
                mEmail: "",
                mEmail2: "",
                mBirthday: "",
                mPhone: "",
                mAddr: "",
              });
              setIdCheck(false); // 중복 확인 상태도 초기화
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
