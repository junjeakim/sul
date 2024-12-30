import $ from "jquery";

$(function () {
  const formData = {
    userId: "",
    password: "",
  };

  // 로그인 성공 후 리다이렉션 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = formData; // formData에서 password 값을 가져옵니다.
    if (userId === "admin" && password === "admin123") {
      alert("로그인 성공");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  // 로그인 버튼 클릭 이벤트 핸들러
  $("#loginBtn").on("click", function () {
    window.location.href = "/member/Login.jsp";
  });

  // 로그아웃 버튼 클릭 이벤트 핸들러
  $("#logoutBtn").on("click", function () {
    window.location.href = "/member/LogoutProc.jsp";
  });

  // handleSubmit 호출 추가
  $("form").on("submit", handleSubmit);
});
