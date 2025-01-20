import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const navigate = useNavigate();

  const login = () => {
    console.log("login 함수 호출됨"); // 로그인 함수 호출 로그 추가
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    navigate("/"); // 로그인 후 메인 페이지로 리디렉션
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    navigate("/LoginPage"); // 로그아웃 후 로그인 페이지로 리디렉션
  };

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = () => {
      const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
      setIsLoggedIn(loggedIn || false);
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있는 커스텀 훅
export const useAuth = () => useContext(AuthContext);
