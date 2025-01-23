import React from "react";
import "./../../style/adminfooter_style.css"; // 수정된 스타일 파일
import { Link } from "react-router-dom";

const AdminFooter = () => {
  const goAdmin = () => {
    alert("사용자 페이지로 이동합니다.");
  };

  return (
    <footer className="admin-footer dFlex">
      <hr />
      <div className="admin-LogoArea">
        <img src={require("./../../images/Logo-removebg.png")} alt="Logo" />
      </div>
      <div className="admin-footerTxtArea">
        <address>
          서울특별시 구로구 구로동 하이미디어
          <br />
          통신판매등록번호 : 제0000-서울서초-2222호 | 사업자등록번호 :
          1111111111 | 대표자 : 김준재
          <br />
          TEL : 02-999-8888 | FAX : 02-555-4321 | Email : zzanzzan@zzan.com
        </address>
        <p>COPYRIGHT BY DRINKS INTERNATIONAL. All Rights Reserved.</p>
      </div>
      <div className="admin-adminArea">
        <Link to="/" onClick={goAdmin}>
          <img
            src={require("./../../images/goAdmin_200.jpg")}
            alt="사용자 페이지로 이동"
          />
        </Link>
      </div>
    </footer>
  );
};

export default AdminFooter;
