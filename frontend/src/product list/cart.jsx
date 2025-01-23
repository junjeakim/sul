import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // useNavigate 훅을 사용합니다.
import '../style/cart.css' // 새로운 스타일 파일 경로

const CartPage = () => {
   const [cartItems, setCartItems] = useState([])
   const navigate = useNavigate() // useNavigate 훅을 사용하여 페이지 이동을 처리

   useEffect(() => {
      const fetchCartItems = async () => {
         try {
            const response = await axios.get('http://localhost:8081/api/cart?userId=test01')
            console.log('response data: ', response.data)
            setCartItems(response.data)
         } catch (error) {
            console.error(`장바구니 목록을 불러오는 중 오류가 발생했습니다.`, error)
            alert(`장바구니 항목을 불러오는 중 오류가 발생했습니다. (오류 코드: ${error.response?.status})`)
         }
      }

      fetchCartItems()
   }, [])

   const updateCartItemQuantity = async (id, quantity) => {
      try {
         const response = await axios.put(`http://localhost:8081/api/cart/${id}`, {
            cpQuantity: parseInt(quantity, 10), // 정수로 변환
         })
         if (response.status === 200) {
            const updatedItem = response.data
            setCartItems(cartItems.map((item) => (item.cpCode === id ? updatedItem : item)))
         }
      } catch (error) {
         console.error('장바구니 아이템 수량을 업데이트하는 중 오류가 발생했습니다.', error)
      }
   }

   const removeCartItem = async (id) => {
      try {
         const response = await axios.delete(`http://localhost:8081/api/cart/${id}`)
         if (response.status === 200) {
            setCartItems(cartItems.filter((item) => item.cpCode !== id))
         }
      } catch (error) {
         console.error('장바구니 아이템을 삭제하는 중 오류가 발생했습니다.', error)
      }
   }

   const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * parseInt(item.cpQuantity, 10), 0)
   }

   return (
      <div className="wrap">
         <div id="cartlist">
            <h2>장바구니</h2>
            <table>
               <thead>
                  <tr>
                     <th className="image-col">사진</th>
                     <th className="name-col">상품명</th>
                     <th className="quantity-col">총수량</th>
                     <th className="price-col">판매가</th>
                     <th className="total-col">합계</th>
                     <th className="delete-col">삭제</th>
                  </tr>
               </thead>
               <tbody>
                  {cartItems.map((item, index) => (
                     <tr key={index}>
                        <td className="image-col">
                           <img src={item.image} alt={item.subject} width="50" />
                        </td>
                        <td className="name-col">{item.subject}</td>
                        <td className="quantity-col">
                           <input type="number" value={item.cpQuantity} onChange={(e) => updateCartItemQuantity(item.cpCode, parseInt(e.target.value, 10))} />
                        </td>
                        <td className="price-col">{item.price}원</td>
                        <td className="total-col">{item.price * parseInt(item.cpQuantity, 10)}원</td>
                        <td className="delete-col">
                           <button onClick={() => removeCartItem(item.cpCode)}>삭제</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <h3>Total: {getTotalPrice()}원</h3>
            <footer className="footer">
               <button type="reset" onClick={() => navigate('/')}>
                  취소하기
               </button>
               <button type="button">즉시구매</button>
               <button type="button" onClick={() => navigate('/whisky')}>
                  계속 쇼핑하기
               </button>
            </footer>
         </div>
      </div>
   )
}

export default CartPage
