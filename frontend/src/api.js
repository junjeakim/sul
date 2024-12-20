import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api"; // 수정된 포트 번호를 반영

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
