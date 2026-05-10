import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

const login = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      username: username.trim(),
      password: password.trim(),
    });

    console.log("SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    nav("/dashboard");

  } catch (err) {
    console.log("ERROR:", err.response?.data);
    alert("Login failed");
  }
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;