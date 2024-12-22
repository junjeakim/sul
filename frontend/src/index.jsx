import React from 'react'
import Header from './ind/header.jsx' // Header 컴포넌트
import Footer from './ind/footer.jsx' // Footer 컴포넌트
import './style/style.css' // CSS 파일

const MainPage = () => {
   const uId_Session = sessionStorage.getItem('userId') // 세션에서 userId 가져오기

   return (
      <div id="wrap">
         {/* Header 컴포넌트 */}
         <Header userId={uId_Session} />

         {/* Main Content */}
         <main id="main">
            <div id="mainImgSlideArea">
               <div id="slideshow">
                  <img src={require('./images/slide/slide01.jpg')} alt="slideImg" />
                  <img src={require('./images/slide/slide02.jpg')} alt="slideImg" />
               </div>
            </div>
            <h2>Best List</h2>
            <div id="itemListArea" className="dFlex">
               <div id="item">
                  <div className="itemImgArea">
                     <img src={require('./images/whisky/Imperial17.jpg')} alt="itemImg" />
                  </div>
                  <div className="itemTxtarea">
                     <span>임페리얼 17년</span> <span>120000원</span>
                  </div>
               </div>
               <div id="item">
                  <div className="itemImgArea">
                     <img src={require('./images/whisky/Imperial17.jpg')} alt="itemImg" />
                  </div>
                  <div className="itemTxtarea">
                     <span>임페리얼 17년</span> <span>120000원</span>
                  </div>
               </div>
               <div id="item">
                  <div className="itemImgArea">
                     <img src={require('./images/whisky/Imperial19.png')} alt="itemImg" />
                  </div>
                  <div className="itemTxtarea">
                     <span>임페리얼 19년</span> <span>180000원</span>
                  </div>
               </div>
               <div id="item">
                  <div className="itemImgArea">
                     <img src={require('./images/whisky/Imperial21.jpg')} alt="itemImg" />
                  </div>
                  <div className="itemTxtarea">
                     <span>임페리얼 21년</span> <span>240000원</span>
                  </div>
               </div>
            </div>
         </main>

         {/* Footer 컴포넌트 */}
         <Footer />
      </div>
   )
}

export default MainPage
