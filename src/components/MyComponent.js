import React, { useEffect, useState } from "react";
import { fetchData } from "../api"; // 상대 경로를 사용하여 api 모듈을 가져옵니다.

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요."
        );
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Spring Boot API로부터 가져온 데이터</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
