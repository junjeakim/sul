import React from 'react'
import '../style/MyPage.css'

const MyPage = () => {
   return (
      <div className="my-page">
         <div className="main-content">
            <div className="my-page-photo">My페이지 사진</div>

            <div className="buttons">
               <button className="home-button">마이페이지홈</button>
               <button className="coupon-history">쿠폰내역</button>
               <button className="coupon-registration">쿠폰등록</button>
               <button className="order-history">주문내역</button>
               <button className="logout-button">탈퇴</button>
            </div>

            <div className="user-info-buttons">
               <button className="edit-info-button">내 정보, 회원정보 수정</button>
            </div>

            <div className="recent-orders">최근주문내역</div>
         </div>
      </div>
   )
}

export default MyPage
