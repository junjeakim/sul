import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../script/AuthContext";
import "../style/LoginPage.css";
import idImage from "./../images/ID이미지.jpg";
import pwImage from "./../images/pwimg.jpg";
import kakaoLoginImage from "./../images/kakao_login_medium_narrow.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadKakaoSDK = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("ed0242863785c5895aa99910e1dc3f1a");
        }
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadKakaoSDK);
    } else {
      loadKakaoSDK();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = formData;

    if (userId === "" || password === "") {
      alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
      return;
    }

    alert("아이디 또는 비밀번호가 잘못되었습니다.");
  };

  const handleKakaoLogin = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Auth.login({
        scope: "profile_nickname,profile_image",
        success: (authObj) => {
          login(); // Assuming login is a function from AuthContext
          navigate("/"); // 성공 후 메인 페이지로 리디렉션
        },
        fail: (error) => {
          alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
        },
      });
    } else {
      alert("Kakao SDK가 초기화되지 않았습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div id="wrap">
      <div id="Login_wrap">
        <div className="logintop">
          <h2>LOGIN</h2>
          <p>불편하신 사항이 있으신 고객센터로 문의하시기 바랍니다.</p>
        </div>
        <form name="loginForm" onSubmit={handleSubmit} autoComplete="off">
          <div className="login_mid clfix">
            <div className="login_con">
              <div className="login_id">
                <span>
                  <img src={idImage} alt="ID 로고" />
                </span>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="아이디"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="login_pw">
                <span>
                  <img src={pwImage} alt="비밀번호 이미지" />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                로그인
              </button>
              <button
                type="button"
                className="kakao-btn"
                onClick={handleKakaoLogin}
              >
                <img src={kakaoLoginImage} alt="카카오 로그인" />
              </button>
              <div className="login_bottom clfix">
                <p>
                  <a href="/SignUpPage">회원가입</a> |{" "}
                  <a href="/ForgotPage">아이디/비밀번호 찾기</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
