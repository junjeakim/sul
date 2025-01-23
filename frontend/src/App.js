import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 전역 컴포넌트
import Header from "./components/header"; // 헤더 컴포넌트 경로
import Footer from "./components/footer"; // 푸터 컴포넌트 경로
import ConvenienceFeatures from "./components/ConvenienceFeatures.jsx"; // 편의기능 컴포넌트 경로

// 페이지 컴포넌트
import MainPage from "./index.jsx"; // 메인 페이지 컴포넌트
import AgreementPage from "./member/AgreementPage.jsx"; // 동의 페이지 컴퍼넌트
import RegisterForm from "./member/RegisterForm.jsx"; // 회원가입 폼 컴퍼넌트
import LoginPage from "./member/LoginPage.jsx"; // 로그인 페이지 컴퍼넌트
import ForgotPage from "./member/ForgotPage.jsx"; // 아이디, 비밀번호 찾기 페이지 컴퍼넌트
import WhiskyPage from "./juru/whisky.jsx"; // Whisky 페이지 컴퍼넌트
import WinePage from "./juru/wine.jsx"; // Wine 페이지 컴퍼넌트
import VodcaPage from "./juru/vodca.jsx"; // Vodca 페이지 컴퍼넌트
import TraditionalPage from "./juru/traditional.jsx"; // Traditional 페이지 컴퍼넌트
import BoardPage from "./notice board/boardpage.jsx"; // 자유게시판 페이지 컴퍼넌트
import InquiryPage from "./notice board/inquirypage.jsx"; // 문의사항 페이지 컴퍼넌트
import NoticePage from "./notice board/noticepage.jsx"; // 공지사항 페이지 컴퍼넌트
import MapPage from "./MapPage.jsx"; // 오시는길 페이지 컴퍼넌트
import ProductDeliveryPage from "./ProductDeliveryPage.jsx"; // 상품 받는법 페이지 컴퍼넌트
import PickupStore from "./PickupStore.jsx"; // 픽업 매장 선택 페이지 컴퍼넌트
import CartPage from "./product list/cart.jsx"; // 장바구니 페이지 컴퍼넌트 추가
import ProductPage from "./product list/ProductPage.jsx"; // 제품 페이지 컴퍼넌트 추가
import ProductForm from "./product list/ProductForm.jsx"; // 제품 등록 페이지 컴퍼넌트 추가
import MyPage from "./member/MyPage.jsx"; // 마이페이지 컴포넌트 추가

//관리자 컴포넌트
import AdminPage from "./admin/adminpage.jsx"; // 관리자 페이지 컴퍼넌트
import AdminHeader from "./admin/components/AdminHeader.jsx"; // 관리자 헤더 컴포넌트 경로
import AdminFooter from "./admin/components/AdminFooter.jsx"; // 관리자 푸터 컴포넌트 경로
import AdminConvenienceFeatures from "./admin/components/AdminConvenienceFeatures.jsx"; // 관리자 편의기능 컴포넌트 경로
import AdminMemberList from "./admin/member/adminMemberList.jsx";

// 인증 관련
import { AuthProvider } from "./script/AuthContext.js"; // AuthContext 경로

function App() {
  const location = useLocation(); // 현재 경로 가져오기

  const isAdminPage = location.pathname.startsWith("/admin"); // admin일 경우

  return (
    <AuthProvider>
      <div>
        {/* AdminPage가 아닐 경우에만 Header와 Footer, 편의기능 표시 */}
        {!isAdminPage && <Header />}
        {!isAdminPage && <ConvenienceFeatures />}
        {isAdminPage && <AdminHeader />}
        {/*{isAdminPage && <AdminConvenienceFeatures />}*/}

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Routes>
              {/* 메인 페이지 경로 */}
              <Route path="/" element={<MainPage />} />
              {/* 회원 관련 경로 */}
              <Route path="/SignUpPage" element={<RegisterForm />} />
              <Route path="/AgreementPage" element={<AgreementPage />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/ForgotPage" element={<ForgotPage />} />
              {/* 게시판 및 공지사항 경로 */}
              <Route path="/boardpage" element={<BoardPage />} />
              <Route path="/noticepage" element={<NoticePage />} />
              <Route path="/inquirypage" element={<InquiryPage />} />
              {/* 관리자 페이지 메인 경로 */}
              <Route path="/admin/main" element={<AdminPage />} />
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
              {/* 마이페이지 경로 추가 */}
              <Route path="/mypage" element={<MyPage />} />
              {/* 장바구니 페이지 경로 추가 */}
              <Route path="/cart" element={<CartPage />} />
              {/* 제품 페이지 경로 추가 */}
              <Route path="/productPage" element={<ProductPage />} />
              {/* 제품 등록 페이지 경로 추가 */}
              <Route path="/ProductForm" element={<ProductForm />} />
              {/* 관리자 페이지 경로 */}
              <Route path="/admin/memberList" element={<AdminMemberList />} />
            </Routes>
          </div>
        </div>

        {/* AdminPage가 아닐 경우에만 Footer 표시 */}
        {!isAdminPage && <Footer />}
        {isAdminPage && <AdminFooter />}
      </div>
    </AuthProvider>
  );
}

export default App;
