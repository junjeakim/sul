import React from "react";
import { Routes, Route } from "react-router-dom";

// 전역 컴포넌트
import Header from "./components/header"; // 헤더 컴포넌트 경로
import Footer from "./components/footer"; // 푸터 컴포넌트 경로
import ConvenienceFeatures from "./components/ConvenienceFeatures.jsx"; // 편의기능 컴포넌트 경로

// 페이지 컴포넌트
import MainPage from "./index.jsx"; // 메인 페이지 컴포넌트
import RegisterForm from "./member/RegisterForm.jsx"; // 회원가입 폼 컴포넌트
import AgreementPage from "./member/AgreementPage.jsx"; // 동의 페이지 컴포넌트
import CertificationPage from "./member/Identityverification"; // 본인인증 페이지 컴포넌트
import LoginPage from "./member/LoginPage.jsx"; // 로그인 페이지 컴포넌트
import ForgotPage from "./member/ForgotPage.jsx"; // 비밀번호 찾기 페이지 컴포넌트
import BoardPage from "./boardpage.jsx"; // 게시판 페이지 컴포넌트
import InquiryPage from "./inquirypage.jsx"; // 문의 페이지 컴포넌트
import NoticePage from "./noticepage.jsx"; // 공지사항 페이지 컴포넌트
import AdminPage from "./admin/adminpage.jsx"; // 관리자 페이지 컴포넌트
import WhiskyPage from "./whisky.jsx"; // Whisky 페이지 컴포넌트
import WinePage from "./wine.jsx"; // Wine 페이지 컴포넌트
import VodcaPage from "./vodca.jsx"; // Vodca 페이지 컴포넌트
import TraditionalPage from "./traditional.jsx"; // Traditional 페이지 컴포넌트
import MapPage from "./MapPage.jsx"; // 오시는길 페이지 컴포넌트
import ProductDeliveryPage from "./ProductDeliveryPage.jsx"; // 상품 받는법 페이지 컴포넌트
import PickupStore from "./PickupStore.jsx"; // 픽업 매장 선택 페이지 컴포넌트
import MyPage from "./member/MyPage.jsx"; // 마이페이지 컴포넌트 추가
import CartPage from "./product list/CartPage.jsx"; // 장바구니 페이지 컴포넌트 추가
import ProductPage from "./product list/ProductPage.jsx"; // 제품 페이지 컴포넌트 추가
import ProductForm from "./product list/ProductForm.jsx"; // 제품 등록 페이지 컴포넌트 추가

// 인증 관련
import { AuthProvider } from "./script/AuthContext.js"; // AuthContext 경로

function App() {
  const handleMenuClick = (menu) => {
    console.log(`Menu clicked: ${menu}`);
  };

  return (
    <AuthProvider>
      <div>
        {/* 헤더 컴포넌트 */}
        <Header onMenuClick={handleMenuClick} />

        <div style={{ display: "flex" }}>
          {/* 편의기능 컴포넌트 */}
          <ConvenienceFeatures />

          <div style={{ flex: 1 }}>
            <Routes>
              {/* 메인 페이지 경로 */}
              <Route path="/" element={<MainPage />} />
              {/* 회원 관련 경로 */}
              <Route path="/SignUpPage" element={<RegisterForm />} />
              <Route path="/AgreementPage" element={<AgreementPage />} />
              <Route
                path="/CertificationPage"
                element={<CertificationPage />}
              />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/ForgotPage" element={<ForgotPage />} />
              {/* 게시판 및 공지사항 경로 */}
              <Route path="/boardpage" element={<BoardPage />} />
              <Route path="/noticepage" element={<NoticePage />} />
              <Route path="/inquirypage" element={<InquiryPage />} />
              {/* 관리자 페이지 경로 */}
              <Route path="/adminpage" element={<AdminPage />} />
              {/* 제품 관련 경로 */}
              <Route path="/whisky" element={<WhiskyPage />} />
              <Route path="/wine" element={<WinePage />} />
              <Route path="/vodca" element={<VodcaPage />} />
              <Route path="/traditional" element={<TraditionalPage />} />
              {/* 기타 페이지 경로 */}
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/product-delivery"
                element={<ProductDeliveryPage />}
              />
              <Route path="/pickup-store" element={<PickupStore />} />
              <Route path="/mypage" element={<MyPage />} />
              {/* 마이페이지 경로 추가 */}
              <Route path="/cart" element={<CartPage />} />
              {/* 장바구니 페이지 경로 추가 */}
              <Route path="/productPage" element={<ProductPage />} />
              {/* 제품 페이지 경로 추가 */}
              <Route path="/ProductForm" element={<ProductForm />} />
              {/* 제품 등록 페이지 경로 추가 */}
            </Routes>
          </div>
        </div>

        {/* 전역 Footer 컴포넌트 */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
