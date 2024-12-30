import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header"; // 헤더 컴포넌트 경로
import Footer from "./components/footer"; // 푸터 컴포넌트 경로
import MainPage from "./index.jsx"; // 메인 페이지 컴포넌트
import RegisterForm from "./member/RegisterForm.jsx"; // 회원가입 폼 컴포넌트
import AgreementPage from "./member/AgreementPage.jsx"; // 동의 페이지 컴포넌트
import CertificationPage from "./member/Identityverification";
import LoginPage from "./member/LoginPage.jsx"; // 로그인 페이지 컴포넌트
import BoardPage from "./boardpage.jsx";
import ForgotPage from "./member/ForgotPage.jsx";
import InquiryPage from "./inquirypage.jsx";
import NoticePage from "./noticepage.jsx";
import AdminPage from "./admin/adminpage.jsx";
import WhiskyPage from "./whisky.jsx"; // Whisky 페이지 컴포넌트
import WinePage from "./wine.jsx"; // Wine 페이지 컴포넌트
import VodcaPage from "./vodca.jsx"; // Vodca 페이지 컴포넌트
import TraditionalPage from "./traditional.jsx"; // Traditional 페이지 컴포넌트

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUpPage" element={<RegisterForm />} />
        <Route path="/AgreementPage" element={<AgreementPage />} />
        <Route path="/CertificationPage" element={<CertificationPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ForgotPage" element={<ForgotPage />} />
        <Route path="/boardpage" element={<BoardPage />} />
        <Route path="/noticepage" element={<NoticePage />} />
        <Route path="/inquirypage" element={<InquiryPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/whisky" element={<WhiskyPage />} />{" "}
        {/* Whisky 페이지 라우트 */}
        <Route path="/wine" element={<WinePage />} /> {/* Wine 페이지 라우트 */}
        <Route path="/vodca" element={<VodcaPage />} />{" "}
        {/* Vodca 페이지 라우트 */}
        <Route path="/traditional" element={<TraditionalPage />} />{" "}
        {/* Traditional 페이지 라우트 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
