import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/DB_product.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        setProducts(response.data);
        console.log("Products fetched successfully:", response.data); // 디버깅 로그 추가
      } catch (error) {
        console.error("제품 목록을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log("삭제 시도 ID:", id);
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/products/${id}`
      );
      console.log("삭제 요청에 대한 응답:", response); // 삭제 후 응답 로그 추가
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
        setShowModal(false);
        alert("제품이 삭제되었습니다.");
      } else {
        alert("제품 삭제 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("제품 삭제 중 오류가 발생했습니다.", error);
      alert("제품 삭제 중 오류가 발생했습니다.");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-wrap">
      <h1>제품 관리창고</h1>
      <div className="product-pages">
        {products.length ? (
          products.map((product) => (
            <div key={product.id} className="product-page-card-custom">
              <img
                src={`http://localhost:8081/images/${product.storedFilename}`}
                alt={product.subject}
              />
              <br/>
              <div>{product.subject}</div>
              <div>{product.price}</div>
              <div>{product.category}</div>
              <button
                className="delete-button"
                onClick={() => openModal(product)}
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p>제품이 없습니다.</p>
        )}
      </div>

      {showModal && selectedProduct && (
        <div className="product-modal">
          <div className="product-modal-content">
            <span className="product-close" onClick={closeModal}>
              &times;
            </span>
            <p>정말로 {selectedProduct.subject}를 삭제하시겠습니까?</p>
            <button
              className="product-confirm-delete"
              onClick={() => handleDelete(selectedProduct.id)}
            >
              삭제 확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
