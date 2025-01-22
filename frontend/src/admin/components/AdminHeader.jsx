import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../script/AuthContext";
import "./../../style/adminheader_style.css";
import Logo from "./../../images/Logo-removebg.png";

const AdminHeader = ({ userId, onMenuClick }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header id="header">
      <div id="h_top" className="dFlex">
        <div id="searchArea">
          <input type="text" id="searchKey" name="search" />
          &nbsp;<button id="searchButton">검색</button>
        </div>
        <Link to="/admin/main" onClick={() => onMenuClick("main")}>
          <img alt="Logo" src={Logo} />
        </Link>
        <div id="H_btnArea">
          {isLoggedIn ? (
            <>
              <button
                id="logoutBtn"
                onClick={() => {
                  logout();
                }}
              >
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
      <div id="admin.h_bottom" className="dFlex">
        <div id="mainMenus">
          <ul id="headerMenu" className="dFlex">
            <li onClick={() => navigate("/admin/memberList")}>
              회원관리
            </li>
            <li onClick={() => navigate("/admin/memberList")}>
              상품관리
            </li>
            <li onClick={() => navigate("/admin/memberList")}>
              주문관리
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
