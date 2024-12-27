import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/header_style.css"; // 정확한 경로로 수정

const Header = ({ userId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!userId);
  const navigate = useNavigate();

  return (
    <header id="header">
      <div id="h_top" className="dFlex">
        <div id="searchArea">
          <input
            type="text"
            id="searchKey"
            name="search"
            placeholder="검색어 입력"
          />
          <button>검색</button>
        </div>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img alt="로고" src={require("../images/Logo-removebg.png")} />
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
            <li className="whisky" onClick={() => navigate("/whisky")}>
              위스키
              {/*<ul className="subMenus"></ul> */}
            </li>
            <li className="wine" onClick={() => navigate("/wine")}>
              와인
              {/*<ul className="subMenus"></ul> */}
            </li>
            <li className="vodca" onClick={() => navigate("/vodca")}>
              보드카
              {/*<ul className="subMenus"></ul> */}
            </li>
            <li
              className="traditional"
              onClick={() => navigate("/traditional")}
            >
              전통주
              {/*<ul className="subMenus"></ul> */}
            </li>
            <li id="board" className="bbs">
              게시판
              <ul className="subMenus">
                <li className="notice" onClick={() => navigate("/notice")}>
                  공지사항
                </li>
                <li className="bbs" onClick={() => navigate("/inquiry")}>
                  문의사항
                </li>
                <li className="free" onClick={() => navigate("/board")}>
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
