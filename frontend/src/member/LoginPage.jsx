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
   const [welcomeMessage, setWelcomeMessage] = useState('')
   const [userProfile, setUserProfile] = useState(null)
   const { login } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
         window.Kakao.init('ed0242863785c5895aa99910e1dc3f1a')
         console.log('Kakao SDK Initialized: ', window.Kakao.isInitialized())
      }
   }, [])

   const handleKakaoLogin = () => {
      if (window.Kakao && window.Kakao.isInitialized()) {
         window.Kakao.Auth.login({
            scope: 'profile_nickname,profile_image',
            success: (authObj) => {
               console.log('카카오 로그인 성공:', authObj)
               const accessToken = authObj.access_token

               window.Kakao.API.request({
                  url: '/v2/user/me',
                  success: (response) => {
                     console.log('카카오 사용자 정보:', response)
                     const nickname = response?.properties?.nickname || '회원님'
                     const profileImage = response?.properties?.profile_image || ''

                     axios
                        .post('http://localhost:8081/api/kakao/login', { accessToken })
                        .then((res) => {
                           const { token, user } = res.data
                           console.log('서버 응답:', res.data)

                           if (token) {
                              localStorage.setItem('authToken', token)
                              localStorage.setItem('user', JSON.stringify(user))
                           }

                           setUserProfile({ nickname: user?.nickname || nickname, profile_image: user?.profile_image || profileImage })
                           setWelcomeMessage(`${user?.mName || nickname} 어서오세요!`)
                           login(user)
                           navigate('/')
                        })
                        .catch((err) => {
                           console.error('카카오 로그인 서버 요청 실패:', err)
                           alert('카카오 로그인 처리 중 오류가 발생했습니다.')
                        })
                  },
                  fail: (error) => {
                     console.error('사용자 정보 요청 실패:', error)
                     alert('사용자 정보를 불러오는 데 실패했습니다.')
                  },
               })
            },
            fail: (error) => {
               console.error('카카오 로그인 실패:', error)
               alert('카카오 로그인에 실패했습니다. 에러 메시지: ' + error.message)
            },
         })
      } else {
         alert('Kakao SDK가 초기화되지 않았습니다.')
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const { userId, password } = formData

      if (userId === '' || password === '') {
         alert('아이디 또는 비밀번호를 입력해 주세요.')
         return
      }

      loginUser()
   }
   // 로컬스토리지 저장
   const loginUser = async () => {
      const { userId, password } = formData

      console.log('로그인 요청 아이디:', userId) // 확인용 로그
      console.log('로그인 요청 비밀번호:', password) // 확인용 로그

      try {
         // 서버로 로그인 요청
         const res = await axios.post('http://localhost:8081/api/member/login', { mId: userId, mPw: password })
         console.log('로그인 응답:', res.data)

         const { token, user } = res.data
         if (token) {
            localStorage.setItem('authToken', token)
            localStorage.setItem('user', JSON.stringify(user))
         }

         setWelcomeMessage(`${user?.mName || userId}님 어서오세요!`)
         login(user)
         navigate('/')
      } catch (error) {
         console.error('로그인 실패:', error.response?.data || error.message)
         alert('아이디 또는 비밀번호가 잘못되었습니다.')
      }
   }


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
            <form onSubmit={handleSubmit} autoComplete="off">
               <div className="login_mid clfix">
                  <div className="login_con">
                     <div className="login_id">
                        <span>
                           <img src={idImage} alt="ID 로고" />
                        </span>
                        <input type="text" name="userId" placeholder="아이디" value={formData.userId} onChange={handleInputChange} required />
                     </div>
                     <div className="login_pw">
                        <span>
                           <img src={pwImage} alt="비밀번호 이미지" />
                        </span>
                        <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleInputChange} required />
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
            {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
            {userProfile && (
               <div className="user-profile">
                  <img src={userProfile.profile_image} alt="User Profile" className="profile-image" />
                  <p>{userProfile.nickname}</p>
               </div>
            )}
         </div>
      </div>
   )
}

export default LoginPage
