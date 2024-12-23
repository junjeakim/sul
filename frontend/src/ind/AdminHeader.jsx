import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/admin_header_style.css'

const AdminHeader = ({ userId }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(!!userId)

   return (
      <header id="adminHeader">
         <div id="topBar" className="dFlex">
            <div id="adminTitle">
               <h1>Admin</h1>
            </div>
            <div id="logoArea">
               <a href="/">
                  <img alt="Logo" src={require('../images/Logo-removebg.png')} />
               </a>
            </div>
            <div id="buttonArea">
               {isLoggedIn ? (
                  <>
                     <button id="memberManage">회원관리</button>
                     <button id="orderManage">주문관리</button>
                     <button id="logoutBtn" onClick={() => setIsLoggedIn(false)}>
                        로그아웃
                     </button>
                  </>
               ) : (
                  <>
                     <Link to="/LoginPage">
                        <button id="loginBtn">로그인</button>
                     </Link>
                  </>
               )}
            </div>
         </div>
         <div id="menuBar" className="dFlex">
            <ul id="menuList" className="dFlex">
               <li className="menuItem">위스키</li>
               <li className="menuItem">와인</li>
               <li className="menuItem">보드카</li>
               <li className="menuItem">전통주</li>
               <li className="menuItem">공지사항</li>
               <li className="menuItem">AI 관리</li>
               <li className="menuItem">제품목록</li>
            </ul>
         </div>
      </header>
   )
}

export default AdminHeader
