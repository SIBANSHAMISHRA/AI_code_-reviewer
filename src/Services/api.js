import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ NAMED EXPORT
export const reviewCode = async (code) => {
  const response = await api.post("/review", {
    code: code,
  });
  return response.data;
};

