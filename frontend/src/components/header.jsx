import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/header_style.css";
import Logo from "../images/Logo-removebg.png";

const Header = ({ userId, onMenuClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!userId);
  const navigate = useNavigate();

  return (
    <header id="header">
      <div id="h_top" className="dFlex">
        <div id="searchArea">
          <input type="text" id="searchKey" name="search" />
          &nbsp;<button id="searchButton">검색</button>
        </div>
        <Link to="/" onClick={() => onMenuClick("main")}>
          <img alt="Logo" src={Logo} />
        </Link>
        <div id="H_btnArea">
          {isLoggedIn ? (
            <>
              <button id="cart" aria-label="장바구니">
                장바구니
              </button>
              <button id="myPageBtn">마이페이지</button>
              <button id="logoutBtn" onClick={() => setIsLoggedIn(false)}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/SignUpPage">
                <button id="memRegBtn">회원가입</button>&nbsp;
              </Link>
              <Link to="/LoginPage">
                <button id="loginBtn">로그인</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div id="h_bottom" className="dFlex">
        <div id="mainMenus">
          <ul id="mainMenu" className="dFlex">
            <li className="whisky" onClick={() => navigate("/whisky")}>
              위스키
            </li>
            <li className="wine" onClick={() => navigate("/wine")}>
              와인
            </li>
            <li className="vodca" onClick={() => navigate("/vodca")}>
              보드카
            </li>
            <li
              className="traditional"
              onClick={() => navigate("/traditional")}
            >
              전통주
            </li>
            <li id="board" className="bbs">
              게시판
              <ul className="subMenus">
                <li className="notice" onClick={() => navigate("/noticepage")}>
                  공지사항
                </li>
                <li className="bbs" onClick={() => navigate("/inquirypage")}>
                  문의사항
                </li>
                <li className="free" onClick={() => navigate("/boardpage")}>
                  자유게시판
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
