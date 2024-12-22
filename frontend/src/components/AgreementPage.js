import React, { useState } from 'react'
import './../style/Agreement.css'
import Header from '../ind/header'
import Footer from '../ind/footer'

function AgreementPage({ history }) {
   const [agreement, setAgreement] = useState({
      terms: false,
      privacy: false,
   })

   const handleChange = (e) => {
      const { name, checked } = e.target
      setAgreement({ ...agreement, [name]: checked })
   }

   const handleNext = () => {
      if (agreement.terms && agreement.privacy) {
         history.push('/signup') // Navigate to the signup page
      } else {
         alert('약관과 개인정보 방침에 모두 동의해야 합니다.')
      }
   }

   return (
      <div id="agreement_check">
         <h2>회원가입 약관 동의</h2>
         <hr />

         <div>
            <h3>회원가입 약관</h3>
            <iframe src="/terms_of_service.html" title="terms" />
            <div id="chk">
               <label>
                  <input type="checkbox" name="terms" checked={agreement.terms} onChange={handleChange} />
                  회원가입 약관에 동의합니다.
               </label>
            </div>
         </div>

         <div>
            <h3>개인정보 취급 방침</h3>
            <iframe src="/privacy_policy.html" title="privacy" />
            <div id="chk">
               <label>
                  <input type="checkbox" name="privacy" checked={agreement.privacy} onChange={handleChange} />
                  개인정보 방침에 동의합니다.
               </label>
            </div>
         </div>

         <div id="chk">
            <button onClick={handleNext}>확인</button>
         </div>
      </div>
   )
}

export default AgreementPage
