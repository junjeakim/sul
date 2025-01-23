import React, { useEffect } from "react"; // useEffect import 추가
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "./../../style/convenience_features_style.css"; // 스타일 경로

const AdminConvenienceFeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".convenience-features");
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      element.style.transform = `translateX(-${scrollLeft}px)`; // 스크롤 시 이동
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 클린업 함수
  }, []);

  return (
    <Box className="convenience-features">
      <List className="convenience-list">
        <ListItemButton
          onClick={() => navigate("/admin/memberList")}
          className="feature-item"
        >
          <PersonIcon className="feature-icon" />
          회원관리
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/admin/memberList")}
          className="feature-item"
        >
          <ShoppingCartIcon className="feature-icon" />
          상품관리
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/admin/memberList")}
          className="feature-item"
        >
          <ReceiptIcon className="feature-icon" />
          주문관리
        </ListItemButton>
      </List>
    </Box>
  );
};

export default AdminConvenienceFeatures;
