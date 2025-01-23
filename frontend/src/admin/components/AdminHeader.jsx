import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './../../script/AuthContext'
import './../../style/adminheader_style.css' // 수정된 스타일 파일
import Logo from './../../images/Logo-removebg.png'

const AdminHeader = ({ userId, onMenuClick }) => {
   const { isLoggedIn, logout } = useAuth()

   return (
      <header className="admin-header">
         <div className="admin-h_top dFlex">
            <div className="admin-searchArea">
               <input type="text" className="admin-searchKey" name="search" />
               &nbsp;<button className="admin-searchButton">검색</button>
            </div>
            <Link to="/admin/main" onClick={() => onMenuClick('main')}>
               <img alt="Logo" src={Logo} className="admin-headerLogo" />
            </Link>
            <div className="admin-H_btnArea">
               {isLoggedIn ? (
                  <button
                     id="logoutBtn"
                     onClick={() => {
                        logout()
                     }}
                  >
                     로그아웃
                  </button>
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
      </header>
   )
}

export default AdminHeader
