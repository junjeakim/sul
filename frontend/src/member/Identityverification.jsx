import React, { useState } from "react";

const CertificationPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleSubmit = () => {
    if (isAgreed) {
      alert("인증이 완료되었습니다.");
    } else {
      alert("정보에 동의해야 인증을 진행할 수 있습니다.");
    }
  };

  const handleReset = () => {
    alert("메인으로 돌아갑니다.");
    // 메인 페이지로 돌아가는 로직 추가 필요
  };

  return (
    <div id="certification-container">
      <div className="certification-content">
        <h4>본인 인증 안내</h4>
        <p>
          서비스 이용을 위해 본인 명의의 휴대전화를 이용하여 인증을 진행합니다.
          <br />
          가입자의 개인정보는 본인 동의 없이 타인에게 제공되지 않으며
          개인정보보호 정책에 따라 안전하게 보호됩니다.
        </p>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          정보를 동의합니다
        </label>
        <div>
          <button type="button" onClick={handleSubmit}>
            인증하기
          </button>
          <button type="button" onClick={handleReset}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationPage;
