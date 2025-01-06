import React, { useState, useEffect } from "react";
import "./style/pickup.css"; // 스타일 경로

const PickupStore = () => {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 메시지 관리

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=q198m36b6u&submodules=geocoder,places`;
      script.onload = () => {
        initMap();
      };
      script.onerror = () => {
        console.error("네이버 지도 API 로딩 실패");
        setError("네이버 지도 API 로딩에 실패했습니다.");
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      const { naver } = window;
      if (!naver.maps) {
        console.error("네이버 지도 객체가 없습니다.");
        setError("지도를 초기화하는 데 실패했습니다.");
        return;
      }

      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 15,
      };
      const mapInstance = new naver.maps.Map("map", mapOptions);
      setMap(mapInstance);
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

  const searchNearby = () => {
    const { naver } = window;

    if (!naver || !naver.maps || !map) {
      console.error(
        "네이버 지도 API가 로드되지 않았거나, 맵이 초기화되지 않았습니다."
      );
      setError("지도를 초기화하는 데 실패했습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    const geocoder = new naver.maps.Service();

    geocoder
      .geocode({ query: address }, (status, response) => {
        if (
          status !== naver.maps.Service.Status.OK ||
          response.v2.addresses.length === 0
        ) {
          setError("주소를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        const location = response.v2.addresses[0].location;
        const center = new naver.maps.LatLng(location.y, location.x);

        map.setCenter(center);

        const placesService = new naver.maps.Service();
        const searchOptions = {
          location: center,
          radius: 1000, // 반경 1km
          query: "주류 판매점",
        };

        placesService.search(searchOptions, (status, response) => {
          if (status !== naver.maps.Service.Status.OK || !response.items) {
            setError("주변에서 주류 판매점을 찾을 수 없습니다.");
            setLoading(false);
            return;
          }

          markers.forEach((marker) => marker.setMap(null));

          const newMarkers = response.items.map((place) => {
            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(place.point.y, place.point.x),
              map: map,
            });

            naver.maps.Event.addListener(marker, "click", () => {
              alert(`${place.title} 선택`);
            });

            return marker;
          });

          setMarkers(newMarkers);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("검색 중 오류 발생:", err);
        setError("검색 중 오류가 발생했습니다.");
        setLoading(false);
      });
  };

  return (
    <div className="pickup-store-page-wrap">
      <h1>픽업 매장 선택</h1>
      <p className="ta">매장 이름 또는 주소, 지하철 역으로 검색할 수 있어요!</p>
      <div className="pickup-store-map-container">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소 입력"
        />
        <button onClick={searchNearby}>검색</button>
        {loading && <div>검색 중입니다...</div>}
        {error && <div>{error}</div>}
        <br />
        <div id="map" className="pickup-store-map"></div>
      </div>
    </div>
  );
};

export default PickupStore;
