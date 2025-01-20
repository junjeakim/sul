import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../script/AuthContext' // 로그인 상태를 관리하는 AuthContext 사용

const CallbackPage = () => {
   const navigate = useNavigate()
   const { login } = useAuth()

   useEffect(() => {
      const handleNaverCallback = async () => {
         const url = new URL(window.location.href)
         const code = url.searchParams.get('code') // 네이버에서 전달된 code 파라미터
         const state = url.searchParams.get('state') // state 파라미터 (예시로 전달된 값)

         if (code) {
            try {
               const response = await fetch(`http://localhost:8081/api/naver/token?code=${code}&state=${state}`, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
               })

               if (!response.ok) throw new Error('Failed to fetch access token.')

               const data = await response.json()
               const accessToken = data.access_token

               if (accessToken) {
                  // 로그인 처리 (accessToken을 저장하고 로그인 상태를 관리)
                  localStorage.setItem('accessToken', accessToken)
                  login() // 로그인 상태 변경

                  // 로그인 후 홈으로 리다이렉트
                  navigate('/')
               } else {
                  throw new Error('Access token not found.')
               }
            } catch (error) {
               console.error('Naver login failed:', error)
               alert('로그인 실패. 다시 시도해주세요.')
               navigate('/login') // 실패 시 로그인 페이지로 리다이렉트
            }
         }
      }

      handleNaverCallback()
   }, [login, navigate])

   return <div>로그인 처리 중...</div> // 로그인 처리 중 표시할 내용
}

export default CallbackPage
