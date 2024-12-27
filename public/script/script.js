$(document).ready(function () {
  
  setInterval(fnSlide, 4000); // 슬라이드 전환 간격을 3초로 설정

  function fnSlide() {
    
    const $currentImg = $("div#slideshow>img").eq(0);
    const $nextImg = $("div#slideshow>img").eq(1);

    $currentImg.fadeOut(2000);
    $nextImg.fadeIn(2000, function () {
      $currentImg.insertAfter("div#slideshow>img:last-child");
    });
  }
});
