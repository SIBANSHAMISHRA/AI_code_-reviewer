import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ NAMED EXPORT
export const reviewCode = async (code, language) => {
  const response = await api.post("/review", {
    code,
    language,
  });
  return response.data;
};

export const getSuggestion = async (code, type) => {
  const response = await api.post("/suggest", {
    code,
    type,
  });
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};
