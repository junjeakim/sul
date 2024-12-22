import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Link import 추가
import '../style/header_style.css' // 정확한 경로로 수정

const Header = ({ userId }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(!!userId)

   return (
      <header id="header">
         <div id="h_top" className="dFlex">
            <div id="searchArea">
               <input type="text" id="searchKey" name="search" />
               <button>검색</button>
            </div>
            <a href="/">
               <img alt="Logo" src={require('../images/Logo-removebg.png')} />
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
                     {/* 회원가입 버튼을 Link로 감싸서 경로 변경 */}
                     <Link to="/SignUpPage">
                        <button id="memRegBtn">회원가입</button>
                     </Link>
                     {/* 로그인 버튼을 Link로 감싸서 경로 변경 */}
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
                  <li className="whisky">
                     위스키
                     <ul className="subMenus">
                        <li className="whisky">임페리얼</li>
                        <li className="whisky">패스포트</li>
                     </ul>
                  </li>
                  <li className="wine">
                     와인
                     <ul className="subMenus">
                        <li className="wine">무똥까네</li>
                     </ul>
                  </li>
                  <li className="bodca">
                     보드카
                     <ul className="subMenus">
                        <li className="bodca">앱솔루트</li>
                     </ul>
                  </li>
                  <li className="traditional">
                     전통주
                     <ul className="subMenus">
                        <li className="traditional">고운달</li>
                        <li className="traditional">문배</li>
                     </ul>
                  </li>
                  <li id="board" className="bbs">
                     게시판
                     <ul className="subMenus">
                        <li className="notice">공지사항</li>
                        <li className="bbs">문의사항</li>
                     </ul>
                  </li>
               </ul>
            </div>
         </div>
      </header>
   )
}

export default Header
