import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/admin_style.css'

const AdminLoginPage = () => {
   const [formData, setFormData] = useState({ id: '', pw: '' })
   const [errorMessage, setErrorMessage] = useState('')
   const navigate = useNavigate()

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const response = await fetch('/admin/ad_LoginProc.jsp', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData),
         })

         const result = await response.text() // 서버 응답 확인 (JSON이 아니라 JSP 처리 결과로 가정)

         if (response.ok && result.includes('success')) {
            navigate('/showcase/productList?productType=')
         } else {
            setErrorMessage('비밀번호가 틀렸습니다.')
         }
      } catch (error) {
         setErrorMessage('로그인 요청 중 오류가 발생했습니다.')
         console.error(error)
      }
   }

   return (
      <div id="wrap" className="adminLogin">
         <h1>Login</h1>
         <hr />
         <div id="adminFormArea">
            <form onSubmit={handleSubmit}>
               <label>
                  <input type="text" name="id" placeholder="ID를 입력하세요." value={formData.id} onChange={handleChange} autoFocus />
               </label>
               <label>
                  <input type="password" name="pw" placeholder="비밀번호를 입력하세요." value={formData.pw} onChange={handleChange} />
               </label>
               {errorMessage && <p className="error-message">{errorMessage}</p>}
               <div id="btnArea">
                  <button type="submit">로그인</button>
                  <button type="button" onClick={() => navigate(-1)}>
                     돌아가기
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default AdminLoginPage
