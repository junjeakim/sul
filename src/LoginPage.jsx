import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/LoginPage.css'
import Header from './ind/header' // Header 컴포넌트 추가
import Footer from './ind/footer' // Footer 컴포넌트 추가
import idImage from './images/ID이미지.jpg' // 이미지 import
import pwImage from './images/pwimg.jpg' // 이미지 import

const LoginPage = () => {
   const [formData, setFormData] = useState({
      userId: '',
      password: '',
   })

   const navigate = useNavigate()

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const { userId, password } = formData
      if (userId === 'admin' && password === 'admin123') {
         alert('로그인 성공')
         navigate('/dashboard')
      } else {
         alert('아이디 또는 비밀번호가 잘못되었습니다.')
      }
   }

   return (
      <div id="wrap">
         {/* Header 컴포넌트 추가 */}
         <Header />

         <div id="Login_wrap">
            <div className="logintop">
               <h2>LOGIN</h2>
               <p>불편하신 사항이 있으시면 고객센터로 문의하여 주시기 바랍니다.</p>
            </div>

            <form name="loginForm" onSubmit={handleSubmit} autoComplete="off">
               <div className="login_mid clfix">
                  <div className="login_con">
                     <div className="login_id">
                        <span>
                           <img src={idImage} alt="id로고" />
                        </span>
                        <input type="text" name="userId" id="userId" placeholder="아이디" aria-label="아이디" value={formData.userId} onChange={handleChange} required />
                     </div>

                     <div className="login_pw">
                        <span>
                           <img src={pwImage} alt="비밀번호 이미지" />
                        </span>
                        <input type="password" name="password" id="password" placeholder="비밀번호" aria-label="비밀번호" value={formData.password} onChange={handleChange} required />
                     </div>

                     <button type="submit">로그인</button>

                     <div className="login_bottom clfix">
                        <p>
                           <a href="/SignUpPage">회원가입</a> | <a href="/ForgotPage">아이디/비밀번호 찾기</a>
                        </p>
                     </div>
                  </div>
               </div>
            </form>
         </div>

         {/* Footer 컴포넌트 추가 */}
         <Footer />
      </div>
   )
}

export default LoginPage
