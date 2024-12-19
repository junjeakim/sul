import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './index.jsx' // 메인 페이지 컴포넌트
import RegisterForm from './components/RegisterForm.js' // 회원가입 폼 컴포넌트
import AgreementPage from './components/AgreementPage.js' // 동의 페이지 컴포넌트
import LoginPage from './LoginPage.jsx' // 로그인 페이지 컴포넌트
import ForgotPage from './ForgotPage.jsx' // 아이디/비밀번호 찾기 페이지 컴포넌트 추가

function App() {
   return (
      <div>
         <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />

            {/* 회원가입 관련 페이지 */}
            <Route path="/SignUpPage" element={<RegisterForm />} />
            <Route path="/AgreementPage" element={<AgreementPage />} />

            {/* 로그인 페이지 */}
            <Route path="/LoginPage" element={<LoginPage />} />

            {/* 아이디/비밀번호 찾기 페이지 */}
            <Route path="/ForgotPage" element={<ForgotPage />} />
         </Routes>
      </div>
   )
}

export default App
