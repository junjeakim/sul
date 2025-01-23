import React, { useState } from "react";
import ProductPage from "../product list/ProductPage.jsx"; // ProductPage 컴포넌트 경로
import ProductForm from "../product list/ProductForm.jsx"; // ProductForm 컴포넌트 경로
import MemberList from "./member/adminMemberList.jsx"; // MemberList 컴포넌트 경로
import "../style/admin.css"; // 새로운 스타일 파일 경로

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState("main");

  const renderContent = () => {
    switch (currentPage) {
      case "productPage":
        return <ProductPage />;
      case "productForm":
        return <ProductForm />;
      case "memberList":
        return <MemberList />;
      default:
        return <div>관리할 내용을 선택해 주세요.</div>;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-buttons">
        <button onClick={() => setCurrentPage("memberList")}>회원관리</button>
        <button onClick={() => setCurrentPage("productPage")}>상품관리</button>
        <button onClick={() => setCurrentPage("productForm")}>상품등록</button>
      </div>
      <main id="main">{renderContent()}</main>
    </div>
  );
};

export default AdminPage;
