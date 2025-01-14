import React, { useEffect } from 'react'

const NaverRedirect = () => {
   useEffect(() => {
      //URL에서 인증 코드를 추출
      const url = new URL(window.location.href)
      const searchParams = new URLSearchParams(url.search)
      const code = searchParams.get('code')
      if (code) {
         // 부모 창에 인증 코드 전달
         window.opener.postMessage({ code }, window.location.origin)
         window.close() // 팝업 창 닫기
      } else {
         console.error('인증 코드가 없습니다.')
         window.close()
      }
   }, [])

   return (
      <div>
         <p>네이버 인증 중...</p>
      </div>
   )
}

export default NaverRedirect

