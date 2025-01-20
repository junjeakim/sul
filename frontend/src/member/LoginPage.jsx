import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../script/AuthContext'
import '../style/LoginPage.css'
import idImage from './../images/ID이미지.jpg'
import pwImage from './../images/pwimg.jpg'
import kakaoLoginImage from './../images/kakao_login_medium_narrow.png'
import axios from 'axios'

const LoginPage = () => {
   const [formData, setFormData] = useState({ userId: '', password: '' })
   const { login } = useAuth()
   const navigate = useNavigate()

   // Initialize Kakao SDK
   useEffect(() => {
      const loadKakaoSDK = () => {
         if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
               console.log('Initializing Kakao SDK...')
               window.Kakao.init('ed0242863785c5895aa99910e1dc3f1a')
               console.log('Kakao SDK Initialized: ', window.Kakao.isInitialized())
            } else {
               console.log('Kakao SDK already initialized.')
            }
         } else {
            console.error('Kakao SDK not loaded.')
         }
      }

      if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', loadKakaoSDK)
      } else {
         loadKakaoSDK()
      }
   }, [])

   // 카카오 로그인 처리
   const handleKakaoLogin = () => {
      if (window.Kakao && window.Kakao.isInitialized()) {
         window.Kakao.Auth.login({
            scope: 'profile_nickname,profile_image',
            success: (authObj) => {
               console.log('카카오 로그인 성공:', authObj)
               // 카카오 로그인 후 사용자 정보 추출
               const kakaoUser = {
                  userId: authObj.id,
                  nickname: authObj.profile.nickname,
                  profileImage: authObj.profile.profile_image,
               }
               login(kakaoUser) // 카카오 로그인 사용자 정보 저장
               navigate('/') // 로그인 후 리다이렉트
            },
            fail: (error) => {
               console.error('카카오 로그인 실패:', error)
               alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.')
            },
         })
      } else {
         alert('Kakao SDK가 초기화되지 않았습니다.')
      }
   }

   // 로그인 폼 제출 처리
   const handleSubmit = (e) => {
      e.preventDefault()
      const { userId, password } = formData

      if (userId === '' || password === '') {
         alert('아이디 또는 비밀번호를 입력해 주세요.')
         return
      }

      loginUser() // 로그인 API 호출
   }

   // 로그인 버튼 클릭 시 호출되는 함수 (로그인 로직 추가)
   const loginUser = () => {
      const { userId, password } = formData

      // 실제 로그인 API 호출
      axios
         .post('http://localhost:8081/api/member/login', { userId, password })
         .then((response) => {
            const userData = response.data
            login(userData) // 서버로부터 받은 사용자 데이터로 로그인 처리
            navigate('/') // 로그인 후 리다이렉트
         })
         .catch((error) => {
            alert('아이디 또는 비밀번호가 잘못되었습니다.')
         })
   }

   // 입력값 변경 시 처리
   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   return (
      <div id="wrap">
         <div id="Login_wrap">
            <div className="logintop">
               <h2>LOGIN</h2>
               <p>불편하신 사항이 있으신 고객센터로 문의하시기 바랍니다.</p>
            </div>
            <form name="loginForm" onSubmit={handleSubmit} autoComplete="off">
               <div className="login_mid clfix">
                  <div className="login_con">
                     <div className="login_id">
                        <span>
                           <img src={idImage} alt="ID 로고" />
                        </span>
                        <input type="text" name="userId" id="userId" placeholder="아이디" value={formData.userId} onChange={handleInputChange} required />
                     </div>
                     <div className="login_pw">
                        <span>
                           <img src={pwImage} alt="비밀번호 이미지" />
                        </span>
                        <input type="password" name="password" id="password" placeholder="비밀번호" value={formData.password} onChange={handleInputChange} required />
                     </div>
                     <button type="submit" className="login-btn">
                        로그인
                     </button>
                     <button type="button" className="kakao-btn" onClick={handleKakaoLogin}>
                        <img src={kakaoLoginImage} alt="카카오 로그인" />
                     </button>
                     <div className="login_bottom clfix">
                        <p>
                           <a href="/SignUpPage">회원가입</a> | <a href="/ForgotPage">아이디/비밀번호 찾기</a>
                        </p>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default LoginPage
