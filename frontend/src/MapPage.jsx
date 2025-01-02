import React, { useEffect } from "react";
import "./style/map_style.css"; // 스타일 경로

const MapPage = () => {
  useEffect(() => {
    // 페이지가 로드될 때 한 번 새로고침
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    const initMap = () => {
      const { naver } = window;

      if (!naver || !naver.maps) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      const mapOptions = {
        center: new naver.maps.LatLng(37.503020658492, 126.87920389031), // 서울특별시 구로구 경인로 557의 위도와 경도
        zoom: 15,
      };
      const map = new naver.maps.Map("map", mapOptions);

      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.503020658492, 126.87920389031), // 서울특별시 구로구 경인로 557의 위도와 경도
        map,
      });
    };

    const loadScript = () => {
      const existingScript = document.getElementById("naver-map-script");
      if (existingScript) {
        existingScript.remove(); // 기존 스크립트를 제거합니다.
      }

      const script = document.createElement("script");
      script.id = "naver-map-script";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    loadScript();

    // Cleanup: 맵 객체 초기화
    return () => {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = ""; // 기존 맵 객체 정리
      }
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map" className="map"></div>
      <div className="description-box">
        <h1>오시는길</h1>
        <br />
        <p>서울특별시 zzan 본점</p>
        <p>구로구 경인로 557 삼영빌딩 4층</p>
        <p>전화: 02-0000-0000</p>
        <br />
        <p>
          구로캠퍼스 오시는길 : 1호선 구로역 3번 출구 나오시면 바로
          구로광장입니다.
        </p>
        <p>
          왼쪽 대각선 방향 4거리 횡단보도 건너 신한은행 건물 4층 (도보 1분 거리)
        </p>
      </div>
    </div>
  );
};

export default MapPage;
