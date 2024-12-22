import React, { useState } from 'react'
import './../style/Join.css'
import axios from 'axios'
import Header from './../ind/header' // Header 컴포넌트 추가
import Footer from './../ind/footer' // Footer 컴포넌트 추가

function RegisterForm() {
   const [formData, setFormData] = useState({
      mName: '',
      mId: '',
      mPw: '',
      mPw2: '',
      mEmail: '',
      mEmail2: '',
      mBirthday: '',
      mPhone: '',
      mAddr: '',
   })

   const [idCheck, setIdCheck] = useState(false) // ID 중복 확인 여부

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (formData.mPw !== formData.mPw2) {
         alert('비밀번호가 일치하지 않습니다.')
         return
      }
      try {
         const response = await axios.post('/api/member/join', formData)
         if (response.data.success) {
            alert('회원가입이 완료되었습니다!')
            window.location.href = '/login' // 로그인 페이지로 리디렉션
         } else {
            alert('회원가입 실패')
         }
      } catch (error) {
         console.error('Error:', error)
         alert('서버 오류가 발생했습니다.')
      }
   }

   const checkIdDuplicate = async () => {
      try {
         const response = await axios.post('/api/member/checkId', { mId: formData.mId })
         if (response.data.available) {
            setIdCheck(true)
            alert('사용 가능한 아이디입니다.')
         } else {
            alert('이미 사용 중인 아이디입니다.')
         }
      } catch (error) {
         console.error('ID 확인 에러: ', error)
         alert('ID 중복 확인 중 오류가 발생했습니다.')
      }
   }

   return (
      <div className="join_area">
         {/* Header 컴포넌트 추가 */}
         <Header />

         <form onSubmit={handleSubmit}>
            <h1>회원가입</h1>
            <h2>
               <span style={{ color: '#ff0000' }}>*</span>회원정보
            </h2>

            <table className="sample-table">
               <tbody>
                  <tr>
                     <td className="title">이름</td>
                     <td>
                        <input type="text" name="mName" placeholder="이름을 입력하세요" onChange={handleChange} required />
                     </td>
                  </tr>
                  <tr>
                     <td className="title">아이디</td>
                     <td>
                        <div className="input-container">
                           <input className="textArea" type="text" name="mId" maxLength="20" placeholder="대,소문자와 숫자만" onChange={handleChange} required />
                           <button type="button" className="textbtn" onClick={checkIdDuplicate}>
                              중복확인
                           </button>
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td className="title">비밀번호</td>
                     <td>
                        <input type="password" name="mPw" placeholder="비밀번호를 입력하세요" onChange={handleChange} required />
                     </td>
                  </tr>
                  <tr>
                     <td className="title">비밀번호 확인</td>
                     <td>
                        <input type="password" name="mPw2" placeholder="비밀번호를 다시 입력하세요" onChange={handleChange} required />
                     </td>
                  </tr>
                  <tr>
                     <td className="title">이메일</td>
                     <td>
                        <div className="email-container">
                           <input type="text" name="mEmail" placeholder="이메일" onChange={handleChange} required />
                           <i>@</i>
                           <select name="mEmail2" onChange={handleChange}>
                              <option value="">선택</option>
                              <option value="naver.com">naver.com</option>
                              <option value="gmail.com">gmail.com</option>
                              <option value="hanmail.net">hanmail.net</option>
                           </select>
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td className="title">생년월일</td>
                     <td>
                        <input type="date" name="mBirthday" onChange={handleChange} />
                     </td>
                  </tr>
                  <tr>
                     <td className="title">휴대전화</td>
                     <td>
                        <input type="text" name="mPhone" placeholder="010-1234-5678" onChange={handleChange} required />
                     </td>
                  </tr>
                  <tr>
                     <td className="title">주소</td>
                     <td>
                        <input type="text" name="mAddr" maxLength="100" size="50" placeholder="주소를 입력하세요" onChange={handleChange} />
                     </td>
                  </tr>
               </tbody>
            </table>
            <div id="btn">
               <button className="btnArea" type="submit">
                  확인
               </button>
               <button className="btnArea" type="reset">
                  취소
               </button>
            </div>
         </form>

         {/* Footer 컴포넌트 추가 */}
         <Footer />
      </div>
   )
}

export default RegisterForm
