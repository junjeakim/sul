import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../script/AuthContext";

// 네이버 로그인 전용 콜백 페이지

const CallbackPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverCallback = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (code) {
        try {
          const response = await fetch(
            `http://localhost:8081/api/naver/token?code=${code}&state=${state}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          const accessToken = data.access_token;

          if (accessToken) {
            const loginResponse = await fetch(
              "http://localhost:8081/api/naver/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken }),
              }
            );
            const loginData = await loginResponse.json();
            console.log("네이버 로그인 성공:", loginData);

            login(); // 로그인 함수 호출
            window.history.replaceState(null, null, "/"); // URL에서 'code'와 'state' 파라미터 제거
            navigate("/"); // 메인 페이지로 리디렉션
          }
        } catch (error) {
          console.error("네이버 로그인 실패:", error);
        }
      }
    };

    handleNaverCallback();
  }, [login, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default CallbackPage;
