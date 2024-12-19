import React, { useState } from 'react'
import './style/Forgot.css'

const ForgotPage = () => {
   // 상태와 이벤트 핸들러 스크립트 영역
   const [findType, setFindType] = useState('아이디')

   const handleRadioChange = (e) => {
      setFindType(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      alert(`${findType} 찾기 요청이 제출되었습니다.`)
   }

   // UI 반환 (JSX 영역)
   const renderForm = () => (
      <form onSubmit={handleSubmit}>
         <div id="findTypeArea">
            <label>
               <input type="radio" name="findType" value="아이디" checked={findType === '아이디'} onChange={handleRadioChange} />
               아이디 찾기
            </label>
            <label>
               <input type="radio" name="findType" value="비밀번호" checked={findType === '비밀번호'} onChange={handleRadioChange} />
               비밀번호 찾기    
            </label>
            <hr />
         </div>

         <div id="inputArea">
            <div className="input-row">
               <label htmlFor="name">이름</label>
               <input type="text" id="name" placeholder="이름을 입력하세요" required />
            </div>
            <div className="input-row">
               <label htmlFor="email">이메일주소</label>
               <input type="email" id="email1" placeholder="이메일 입력" required />@
               <input type="email" id="email2" placeholder="도메인 입력" required />
            </div>
            <hr />
         </div>

         <div id="btnArea">
            <button type="submit">확인하기</button>
         </div>
      </form>
   )

   // 최종 반환값
   return (
      <div id="forgot-wrap">
         <h2>아이디/비밀번호 찾기</h2>
         {renderForm()}
         <p id="infoText">
            아이디가 고객님의 가입하신 <span className="highlight">이메일로 발송</span>됩니다.
         </p>
      </div>
   )
}

export default ForgotPage
