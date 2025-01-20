import React, { useState, useEffect } from 'react'
import '../style/MyPage.css'
import myPageImage from '../images/mypage_main.png' // 이미지 경로 수정

const MyPage = () => {
   const [userInfo, setUserInfo] = useState({
      userName: '',
      registrationDate: '',
      lastLoginDate: '',
      email: '',
      contact: '',
      points: '',
      address: '',
   })
   const [orderHistory, setOrderHistory] = useState([])
   const [currentView, setCurrentView] = useState('home')

   useEffect(() => {
      // 여기에 사용자 정보를 불러오는 API 호출을 추가하세요.
      // fetch('/api/userinfo')
      //   .then(response => response.json())
      //   .then(data => setUserInfo(data));
      // 여기에 주문 내역을 불러오는 API 호출을 추가하세요.
      // fetch('/api/orderhistory')
      //   .then(response => response.json())
      //   .then(data => setOrderHistory(data));
   }, [])

   const renderContent = () => {
      switch (currentView) {
         case 'home':
            return (
               <div className="myPageHome" style={{ backgroundColor: '#fff' }}>
                  <div className="profile-section">
                     <div className="profile-image">프로필 이미지</div>
                     <div className="name-section">
                        <span>이름: {userInfo.userName}</span>
                        <button className="fix-button">내 정보, 회원정보 수정</button>
                     </div>
                  </div>
                  <div className="user-info">
                     <div className="user-info-item">회원가입일: {userInfo.registrationDate}</div>
                     <div className="user-info-item">최종접속일시: {userInfo.lastLoginDate}</div>
                     <div className="user-info-item">이메일: {userInfo.email}</div>
                     <div className="user-info-item">연락처: {userInfo.contact}</div>
                     <div className="user-info-item">보유포인트: {userInfo.points}</div>
                     <div className="user-info-item">주소: {userInfo.address}</div>
                  </div>
               </div>
            )
         case 'couponHistory':
            return (
               <div className="user-info">
                  <p>쿠폰 내역이 여기에 표시됩니다.</p>
               </div>
            )
         case 'couponRegistration':
            return (
               <div className="user-info">
                  <p>쿠폰 등록이 여기에 표시됩니다.</p>
               </div>
            )
         case 'orderHistory':
            return (
               <div className="recent-orders">
                  <h3>최근주문내역</h3>
                  <table>
                     <thead>
                        <tr>
                           <th>주문서 번호</th>
                           <th>주문상품명</th>
                           <th>주문일시</th>
                           <th>상품수</th>
                           <th>주문금액</th>
                           <th>취소금액</th>
                           <th>미입금액</th>
                           <th>상태</th>
                        </tr>
                     </thead>
                     <tbody>
                        {orderHistory.map((order, index) => (
                           <tr key={index}>
                              <td>{order.orderNumber}</td>
                              <td>{order.productName}</td>
                              <td>{order.orderDate}</td>
                              <td>{order.productCount}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.cancelPrice}</td>
                              <td>{order.unpaidAmount}</td>
                              <td>{order.status}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )
         case 'logout':
            return (
               <div className="user-info">
                  <p>회원 탈퇴가 여기에 표시됩니다.</p>
               </div>
            )
         default:
            return null
      }
   }

   return (
      <div className="my-page">
         <div className="main-content">
            <div className="my-page-photo">
               <img src={myPageImage} alt="My Page Main" />
            </div>

            <div className="my-page-buttons">
               <button className="home-button" onClick={() => setCurrentView('home')}>
                  마이페이지홈
               </button>
               <button className="coupon-history" onClick={() => setCurrentView('couponHistory')}>
                  쿠폰내역
               </button>
               <button className="coupon-registration" onClick={() => setCurrentView('couponRegistration')}>
                  쿠폰등록
               </button>
               <button className="order-history" onClick={() => setCurrentView('orderHistory')}>
                  주문내역
               </button>
               <button className="logout-button" onClick={() => setCurrentView('logout')}>
                  탈퇴
               </button>
            </div>

            {renderContent()}
         </div>
      </div>
   )
}

export default MyPage
