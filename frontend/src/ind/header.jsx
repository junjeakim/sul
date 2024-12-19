import React, { useState } from "react";
import "../style/header_style.css"; // 정확한 경로로 수정

const Header = ({ userId, onMenuClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!userId);

  return (
    <header id="header">
      <div id="h_top" className="dFlex">
        <div id="searchArea">
          <input type="text" id="searchKey" name="search" />
          <button>검색</button>
        </div>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onMenuClick("main");
          }}
        >
          <img alt="Logo" src={require("../images/Logo-removebg.png")} />
        </a>
        <div id="H_btnArea">
          {isLoggedIn ? (
            <>
              <button id="cart">장바구니</button>
              <button id="myPageBtn">마이페이지</button>
              <button id="logoutBtn" onClick={() => setIsLoggedIn(false)}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button id="memRegBtn">회원가입</button>
              <button id="loginBtn" onClick={() => setIsLoggedIn(true)}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
      <div id="h_bottom" className="dFlex">
        <div id="mainMenus">
          <ul id="mainMenu" className="dFlex">
            <li className="whisky" onClick={() => onMenuClick("whisky")}>
              위스키
              <ul className="subMenus"></ul>
            </li>
            <li className="wine" onClick={() => onMenuClick("wine")}>
              와인
              <ul className="subMenus"></ul>
            </li>
            <li className="vodca" onClick={() => onMenuClick("vodca")}>
              보드카
              <ul className="subMenus"></ul>
            </li>
            <li
              className="traditional"
              onClick={() => onMenuClick("traditional")}
            >
              전통주
              <ul className="subMenus"></ul>
            </li>
            <li id="board" className="bbs">
              게시판
              <ul className="subMenus">
                <li className="notice" onClick={() => onMenuClick("notice")}>
                  공지사항
                </li>
                <li className="bbs" onClick={() => onMenuClick("inquiry")}>
                  문의사항
                </li>
                <li className="free" onClick={() => onMenuClick("board")}>
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
