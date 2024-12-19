$(document).ready(function () {
   // 로그인 성공 후 리다이렉션 처리
   const handleSubmit = (e) => {
      e.preventDefault()
      const { userId, password } = formData // formData에서 password 값을 가져옵니다.
      if (userId === 'admin' && password === 'admin123') {
         alert('로그인 성공')
      } else {
         alert('아이디 또는 비밀번호가 잘못되었습니다.')
      }
   }

   // 다른 스크립트 내용
   $('#loginBtn').click(function () {
      location.href = '/member/Login.jsp'
   })

   $('#logoutBtn').click(function () {
      location.href = '/member/LogoutProc.jsp'
   })
})
