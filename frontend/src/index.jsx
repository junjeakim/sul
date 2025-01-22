import React, { useState, useEffect } from "react";
import "./style/style.css"; // CSS 파일 경로
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import axios from "axios";

const MainPage = () => {
  const [modalContent, setModalContent] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/products?category=main"
        );
        setProducts(
          response.data.filter((product) => product.category === "main")
        );
        console.log("Main products:", response.data); // 디버깅 로그 추가
      } catch (error) {
        console.error("제품 목록을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setModalContent(product);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handlePayment = async (product) => {
    const amount = parseInt(product.price.replace(/,|원/g, ""), 10); // 콤마와 "원" 제거 후 숫자로 변환
    const orderData = {
      orderId: `${Date.now()}`, // 고유 주문 ID 생성
      orderName: product.name,
      amount,
    };

    const token = localStorage.getItem("authToken"); // 'authToken'은 저장된 토큰의 키

    if (!token || !isTokenValid(token)) {
      alert("유효한 토큰이 없습니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/payments/initiate",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 올바른 템플릿 리터럴 사용
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // 결제 페이지로 이동
      } else {
        alert("결제 URL을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("결제 요청 중 오류가 발생했습니다.");
      console.error("결제 오류:", error.response?.data || error.message);
    }
  };

  const handleAddToCart = (product) => {
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  const handleAddToWishlist = (product) => {
    alert(`${product.name}이(가) 관심상품으로 등록되었습니다.`);
  };

  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("디코딩된 토큰:", decodedToken); // 디코딩된 토큰 출력
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      return currentTime < expirationTime;
    } catch (e) {
      console.error("토큰 디코딩 오류:", e);
      return false;
    }
  };

  const renderContent = () => (
    <div>
      <div id="mainImgSlideArea">
        <div id="slideshow">
          <img src={require("./images/slide/slide01.jpg")} alt="slideImg" />
          <img src={require("./images/slide/slide02.jpg")} alt="slideImg" />
        </div>
      </div>
      <h2>Best List</h2>
      <div id="itemListArea" className="dFlex">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card-small"
            onClick={() => handleCardClick(product)}
          >
            <div className="itemImgArea">
              <img
                src={`http://localhost:8081/images/${product.storedFilename}`} // 경로 수정
                alt={product.subject}
                className="product-image"
              />
            </div>
            <div className="itemTxtArea product-info">
              <span>{product.subject}</span>
              <br/>
              <span>{product.price}원</span>
            </div>
          </div>
        ))}
      </div>

      {modalContent && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-left">
              <img
                src={`http://localhost:8081/images/${modalContent.storedFilename}`} // 경로 수정
                alt={modalContent.subject}
                className="modal-image"
              />
            </div>
            <div className="modal-right">
              <h2 className="modal-title">{modalContent.subject}</h2>
              <hr className="custom-divider" /> {/* 수평선 추가 */}
              <p className="modal-price">
                <span className="original-price">
                  {modalContent.originalPrice}원
                </span>
                <span className="discount-price">{modalContent.price}원</span>
              </p>
              <p className="modal-description">{modalContent.content}</p>
              <div className="modal-buttons">
                <button
                  className="modal-button"
                  onClick={() => handleAddToWishlist(modalContent)}
                >
                  관심상품 등록
                </button>
                <button
                  className="modal-button"
                  onClick={() => handleAddToCart(modalContent)}
                >
                  장바구니 추가
                </button>
                <button
                  className="modal-button"
                  onClick={() => handlePayment(modalContent)}
                >
                  바로구매 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="wrap">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          level="h6"
          sx={{
            textTransform: "uppercase",
            mb: 2,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        />
        {renderContent()}
      </Box>
    </div>
  );
};

export default MainPage;
