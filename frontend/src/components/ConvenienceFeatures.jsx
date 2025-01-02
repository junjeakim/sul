import React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const ConvenienceFeatures = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "calc(66% - 20px)", // 가로 길이를 3분의 2로 조정
          maxWidth: 267,
          pl: "20px",
          pr: "20px",
          pt: "10px",
          pb: "20px",
          position: "fixed",
          left: "20px", // 왼쪽에서 20px 떨어지게 조정
          top: "150px",
          overflowY: "auto", // 스크롤 추가
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          level="h6"
          sx={{
            textTransform: "uppercase",
            mb: 2,
            fontSize: "1.5rem",
            textAlign: "left",
          }}
        >
          편의기능
        </Typography>
        <List
          size="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px", // 항목 간격 추가
          }}
        >
          <ListItemButton
            onClick={() => navigate("/map")}
            sx={{
              fontSize: "1.2rem", // 글자 크기 조정
              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              border: "1px solid transparent",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <LocationOnIcon sx={{ mr: 1 }} /> {/* 아이콘 추가 */}
            오시는길
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/product-delivery")}
            sx={{
              fontSize: "1.2rem", // 글자 크기 조정
              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              border: "1px solid transparent",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <ShoppingCartIcon sx={{ mr: 1 }} /> {/* 아이콘 추가 */}
            이용안내
          </ListItemButton>
          <ListItemButton
            sx={{
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              border: "1px solid transparent",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <StarIcon sx={{ mr: 1 }} /> {/* 아이콘 추가 */}
            이달의 추천(AI)
          </ListItemButton>
          <ListItemButton
            sx={{
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              border: "1px solid transparent",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <LocalMallIcon sx={{ mr: 1 }} /> {/* 아이콘 추가 */}
            관심상품
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default ConvenienceFeatures;
