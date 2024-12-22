import React, { useState } from 'react'
import './style/Agreement.css'

function Agreement() {
   // useState로 privacyAgreed 상태와 setter 함수를 선언
   const [privacyAgreed, setPrivacyAgreed] = useState(false)

   // 동의 상태를 토글하는 함수
   const handleAgreement = () => {
      setPrivacyAgreed(!privacyAgreed)
   }

   return (
      <div>
         <h2>개인정보 수집 동의</h2>
         <input type="checkbox" checked={privacyAgreed} onChange={handleAgreement} />
         <label>개인정보 수집에 동의합니다.</label>
         <button
            onClick={() => {
               if (privacyAgreed) {
                  alert('동의하셨습니다!')
               } else {
                  alert('동의해 주세요.')
               }
            }}
         >
            확인
         </button>
      </div>
   )
}

export default Agreement
