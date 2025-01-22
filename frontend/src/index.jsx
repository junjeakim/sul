import React, { useEffect, useState } from 'react'
import './style/style.css' // CSS 파일 경로
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import axios from 'axios'

const MainPage = () => {
   const [modalContent, setModalContent] = useState(null)
   const [products, setProducts] = useState([])

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('http://localhost:8081/api/products?category=main')
            setProducts(response.data.filter((product) => product.category === 'main'))
            console.log('Main products:', response.data) // 디버깅 로그 추가
         } catch (error) {
            console.error('제품 목록을 불러오는 중 오류가 발생했습니다.', error)
         }
      }

      fetchProducts()
   }, [])

   // JWT 토큰이 만료되었는지 확인하는 함수
   const isTokenExpired = (token) => {
      if (!token || typeof token !== 'string') {
         console.error('토큰이 존재하지 않거나 올바르지 않은 형식입니다.')
         return true
      }

      try {
         const parts = token.split('.')
         if (parts.length !== 3) {
            console.error('올바르지 않은 토큰 형식입니다. JWT는 세 부분으로 구성되어야 합니다.')
            return true
         }

         const base64Url = parts[1] // JWT의 payload 부분
         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
         const decodedToken = JSON.parse(atob(base64))

         console.log('디코딩된 토큰:', decodedToken)

         const expirationTime = decodedToken.exp * 1000 // 만료 시간 (밀리초 단위)
         const currentTime = Date.now()

         if (currentTime >= expirationTime) {
            console.error('토큰이 만료되었습니다.')
            return true
         }

         return false
      } catch (e) {
         console.error('토큰 디코딩 오류:', e)
         return true
      }
   }

   const handlePayment = async (product) => {
      const amount = parseInt(product.price.replace(/,|원/g, ''), 10)
      const orderData = {
         orderId: `${Date.now()}`,
         orderName: product.name,
         amount,
      }

      let token = localStorage.getItem('authToken')

      if (!token || isTokenExpired(token)) {
         alert('로그인이 필요합니다. 다시 시도해주세요.')
         localStorage.removeItem('authToken') // 만약 토큰이 만료되었으면 로컬 저장소에서 토큰 삭제
         window.location.href = '/login' // 로그인 페이지로 리다이렉트
         return
      }

      try {
         const response = await axios.post('http://localhost:8081/api/payments/initiate', orderData, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })

         if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl
         } else {
            alert('결제 URL 생성에 실패했습니다.')
         }
      } catch (error) {
         if (error.response && error.response.status === 401) {
            // 401 오류가 발생하면 토큰 만료로 간주하고 로그아웃 처리
            alert('토큰이 만료되었습니다. 다시 로그인 해주세요.')
            localStorage.removeItem('authToken')
            window.location.href = '/login' // 로그인 화면으로 리다이렉트
         } else {
            console.error('결제 요청 중 오류:', error)
            alert('결제 요청 중 오류가 발생했습니다.')
         }
      }
   }

   const handleAddToCart = (product) => {
      alert(`${product.name}이(가) 장바구니에 추가되었습니다.`)
   }

   const handleAddToWishlist = (product) => {
      alert(`${product.name}이(가) 관심상품으로 등록되었습니다.`)
   }
   const handleCardClick = (product) => {
      setModalContent(product)
   }

   const closeModal = () => {
      setModalContent(null)
   }

   const renderContent = () => (
      <div>
         <div id="mainImgSlideArea">
            <div id="slideshow">
               <img src={require('./images/slide/slide01.jpg')} alt="slideImg" />
               <img src={require('./images/slide/slide02.jpg')} alt="slideImg" />
            </div>
         </div>
         <h2>Best List</h2>
         <div id="itemListArea" className="dFlex">
            {products.map((product, index) => (
               <div key={index} className="product-card-small" onClick={() => handleCardClick(product)}>
                  <div className="itemImgArea">
                     <img
                        src={`http://localhost:8081/images/${product.storedFilename}`} // 경로 수정
                        alt={product.subject}
                        className="product-image"
                     />
                  </div>
                  <div className="itemTxtArea product-info">
                     <span>{product.subject}</span>
                     <br />
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
                        <span className="original-price">{modalContent.originalPrice}원</span>
                        <span className="discount-price">{modalContent.price}원</span>
                     </p>
                     <p className="modal-description">{modalContent.content}</p>
                     <div className="modal-buttons">
                        <button className="modal-button" onClick={() => handleAddToWishlist(modalContent)}>
                           관심상품 등록
                        </button>
                        <button className="modal-button" onClick={() => handleAddToCart(modalContent)}>
                           장바구니 추가
                        </button>
                        <button className="modal-button" onClick={() => handlePayment(modalContent)}>
                           바로구매 하기
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )

   return (
      <div className="wrap">
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
               level="h6"
               sx={{
                  textTransform: 'uppercase',
                  mb: 2,
                  fontSize: '1.5rem',
                  textAlign: 'center',
               }}
            />
            {renderContent()}
         </Box>
      </div>
   )
}

export default MainPage
