import React from "react";
import "../style/footer_style.css"; // CSS 경로 확인
import { Link } from "react-router-dom";

const Footer = () => {
  const goAdmin = () => {
    alert("Admin 페이지로 이동합니다.");
  };

  return (
    <footer id="footer" className="dFlex">
      <hr />
      <div id="LogoArea">
        <img src={require("../images/Logo-removebg.png")} alt="Logo" />
      </div>
      <div id="footerTxtArea">
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
      <div id="adminArea">
        <Link to="/adminpage" onClick={goAdmin}>
          <img
            src={require("../images/goAdmin_200.jpg")}
            alt="관리자 페이지로 이동"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
