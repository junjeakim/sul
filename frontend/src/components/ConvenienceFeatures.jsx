import React, { useEffect } from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StoreIcon from "@mui/icons-material/Store"; // 매장 아이콘 추가
import "../style/convenience_features_style.css"; // 스타일 경로

const ConvenienceFeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".convenience-features");
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      element.style.transform = `translateX(-${scrollLeft}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box className="convenience-features">
      <Typography level="h6" className="convenience-title">
        편의기능
      </Typography>
      <List className="convenience-list">
        <ListItemButton
          onClick={() => navigate("/map")}
          className="feature-item"
        >
          <LocationOnIcon className="feature-icon" />
          오시는길
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/product-delivery")}
          className="feature-item"
        >
          <ShoppingCartIcon className="feature-icon" />
          이용안내
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/pickup-store")}
          className="feature-item"
        >
          <StoreIcon className="feature-icon" />
          픽업 매장 선택
        </ListItemButton>
        <ListItemButton className="feature-item">
          <StarIcon className="feature-icon" />
          이달의 추천(AI)
        </ListItemButton>
        <ListItemButton className="feature-item">
          <LocalMallIcon className="feature-icon" />
          관심상품
        </ListItemButton>
      </List>
    </Box>
  );
};

export default ConvenienceFeatures;
