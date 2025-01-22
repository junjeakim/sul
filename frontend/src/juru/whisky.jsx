import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../style/product.css' // 경로 수정

const WhiskyPage = () => {
   const [modalContent, setModalContent] = useState(null)
   const [products, setProducts] = useState([])
   const navigate = useNavigate() // useNavigate 훅을 사용하여 페이지 이동을 처리

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('http://localhost:8081/api/products?category=whisky')
            setProducts(response.data.filter((product) => product.category === 'whisky'))
            console.log('Whisky products:', response.data) // 디버깅 로그 추가
         } catch (error) {
            console.error('제품 목록을 불러오는 중 오류가 발생했습니다.', error)
         }
      }

      fetchProducts()
   }, [])

   const handleCardClick = (product) => {
      setModalContent(product)
   }

   const closeModal = () => {
      setModalContent(null)
   }

   const addToCart = async (productName, userId) => {
      try {
         const product = products.find((p) => p.subject === productName)
         if (product) {
            const response = await axios.post('http://localhost:8081/api/cart', {
               cpPrCode: product.id,
               cMemid: userId,
               cpQuantity: 1,
            })
            if (response.status === 200) {
               alert('장바구니에 추가되었습니다.')
               navigate('/cart') // 장바구니 페이지로 이동
            } else {
               alert('장바구니에 제품을 추가하는 중 오류가 발생했습니다.')
            }
         } else {
            alert('해당 제품을 찾을 수 없습니다.')
         }
      } catch (error) {
         alert('장바구니에 제품을 추가하는 중 오류가 발생했습니다.')
         console.error('Server Error:', error.response || error) // 오류 로그
      }
   }

   return (
      <div className="product-page">
         <img
            src={require('../images/whisky/main.jpg')} // 경로 수정
            alt="Main Product"
            className="product-image main-product-image"
         />
         <div className="title">
            <h1>- 임페리얼 -</h1>
         </div>
         <div className="product-list">
            {products.slice(0, 4).map((product) => (
               <div key={product.id} className="product-card" onClick={() => handleCardClick(product)}>
                  <img
                     src={`http://localhost:8081/images/${product.storedFilename}`} // 경로 수정
                     alt={product.subject}
                     className="product-image"
                  />
                  <div className="product-info">
                     <h2>{product.subject}</h2>
                     <p>{product.price}원</p>
                  </div>
               </div>
            ))}
         </div>
         <div className="title">
            <h1>- 패스포트 -</h1>
         </div>
         <div className="product-list">
            {products.slice(4).map((product) => (
               <div key={product.id} className="product-card" onClick={() => handleCardClick(product)}>
                  <img
                     src={`http://localhost:8081/images/${product.storedFilename}`} // 경로 수정
                     alt={product.subject}
                     className="product-image"
                  />
                  <div className="product-info">
                     <h2>{product.subject}</h2>
                     <p>{product.price}원</p>
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
                        <span className="original-price">{modalContent.originalPrice}원</span>
                        <span className="discount-price">{modalContent.price}원</span>
                     </p>
                     <p className="modal-description">{modalContent.content}</p>
                     <div className="modal-buttons">
                        <button className="modal-button">관심상품 등록</button>
                        <button className="modal-button" onClick={() => addToCart(modalContent.subject, 'userId')}>
                           장바구니 추가
                        </button>
                        <button className="modal-button">바로구매 하기</button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default WhiskyPage
