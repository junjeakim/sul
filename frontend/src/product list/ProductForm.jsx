import React, { useState } from "react";
import axios from "axios";
import "../style/product_form.css";

const ProductForm = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("category", category);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("제품이 성공적으로 추가되었습니다.");
    } catch (error) {
      alert("제품 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="wrap">
      <h1>제품 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제품명:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>설명:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>가격:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>카테고리:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>이미지 파일:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit">제품 등록</button>
      </form>
    </div>
  );
};

export default ProductForm;
