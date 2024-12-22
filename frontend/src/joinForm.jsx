import React, { useState } from 'react'
import AgreementCheckbox from './AgreementCheckbox'
import './styles.css'

function JoinForm() {
   const [termsChecked, setTermsChecked] = useState(false)
   const [privacyChecked, setPrivacyChecked] = useState(false)

   const handleSubmit = () => {
      if (termsChecked && privacyChecked) {
         alert('가입 완료!')
         // 이동 처리
      } else {
         alert('모든 약관에 동의해야 합니다.')
      }
   }

   return (
      <div className="join-wrapper">
         <h2>회원가입 약관 동의</h2>

         <iframe src="/member/join/memberJoin_Agreement.jsp" width="600" height="400" />
         <AgreementCheckbox label="회원가입 약관에 동의합니다." checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />

         <iframe src="/member/join/Information_Agreement.jsp" width="600" height="400" />
         <AgreementCheckbox label="개인정보취급방침에 동의합니다." checked={privacyChecked} onChange={(e) => setPrivacyChecked(e.target.checked)} />

         <button onClick={handleSubmit}>확인</button>
      </div>
   )
}

export default JoinForm
