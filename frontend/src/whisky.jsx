import React, { useState } from 'react'
import axios from 'axios'
import './style/product.css'

const WhiskyPage = () => {
   const [modalContent, setModalContent] = useState(null)
   const [status, setStatus] = useState(null) // 결제 상태 ('success', 'fail', null)

   const handleCardClick = (product) => {
      setModalContent(product)
   }

   const closeModal = () => {
      setModalContent(null)
   }

   const handlePurchase = async () => {
      try {
         const response = await axios.post('http://localhost:8081/api/payments/initiate', {
            orderId: `order-${new Date().getTime()}`, // 고유한 주문 ID
            orderName: modalContent.name, // 상품 이름
            amount: parseInt(modalContent.price.replace(/[^0-9]/g, '')), // 가격 숫자 변환
         })

         const paymentUrl = response.data.paymentPageUrl // 결제 페이지 URL
         window.location.href = paymentUrl // 결제 페이지로 리다이렉트
      } catch (error) {
         console.error('결제 요청 실패:', error)
         alert('결제 요청 중 문제가 발생했습니다. 다시 시도해주세요.')
      }
   }

   const products = [
      {
         name: '임페리얼 12년 (500ml)',
         price: '69,000원',
         originalPrice: '85,000원',
         image: './images/whisky/Imperial12.png',
         description: '임페리얼 12년은 최상급 원액만을 사용하여 엄선된 블렌딩을 통해 부드러운 맛과 향을 자랑합니다.',
      },
      {
         name: '임페리얼 17년 (500ml)',
         price: '120,000원',
         originalPrice: '180,000원',
         image: './images/whisky/Imperial17.jpg',
         description: '임페리얼 17년은 한층 더 부드러워진 맛과 향을 자랑합니다.',
      },
   ]

   return (
      <div className="product-page">
         <img src={require('./images/whisky/main.jpg')} alt="Main Product" className="product-image main-product-image" />
         <div className="title">
            <h1>- 임페리얼 -</h1>
         </div>
         <div className="product-list">
            {products.map((product, index) => (
               <div key={index} className="product-card" onClick={() => handleCardClick(product)}>
                  <img src={require(`${product.image}`)} alt={product.name} className="product-image" />
                  <div className="product-info">
                     <h2>{product.name}</h2>
                     <p>{product.price}</p>
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
                     <img src={require(`${modalContent.image}`)} alt={modalContent.name} className="modal-image" />
                  </div>
                  <div className="modal-right">
                     <h2 className="modal-title">{modalContent.name}</h2>
                     <p className="modal-price">
                        <span className="original-price">{modalContent.originalPrice}</span>
                        <span className="discount-price">{modalContent.price}</span>
                     </p>
                     <p className="modal-description">{modalContent.description}</p>
                     <button className="modal-button" onClick={handlePurchase}>
                        바로 구매
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default WhiskyPage
