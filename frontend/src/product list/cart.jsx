import React, { useState } from "react";
import "./../style/cart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const item = {
      id: 1,
      name: "테스트1",
      price: 1,
      quantity: quantity,
      image: "", // 기본 이미지 URL
    };
    setCart([...cart, item]);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // 문자열을 숫자로 변환
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <div id="cartlist">
        <h2>장바구니</h2>
        <table>
          <thead>
            <tr>
              <th>사진</th>
              <th>상품명</th>
              <th>수량</th>
              <th>상품금액</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    onClick={() => setCart(cart.filter((_, i) => i !== index))}
                  >
                    삭제
                  </button>
                </td>
                <td>
                  <img src={item.image} alt={item.name} width="50" />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}원</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total: {getTotalPrice()}원</h3>
      </div>
      <footer className="footer">
        <button type="reset">취소하기</button>
        <button type="button">즉시구매</button>
        <button type="button">계속 쇼핑하기</button>
      </footer>
    </div>
  );
};

export default ShoppingCart;
