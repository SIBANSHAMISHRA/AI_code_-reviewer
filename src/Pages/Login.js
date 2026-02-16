import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../Services/api";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const response = await loginUser({
      email,
      password
    });

    navigate("/dashboard");

  } catch (error) {
    alert("Login failed");
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back </h2>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "350px",
    padding: "40px",
    borderRadius: "12px",
    background: "#020617",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center"
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
   width: "100%",          // ⭐ important for center alignment
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#fff",
    outline: "none",
    display: "block"

  },

  button: {
    width: "60%",           // ⭐ button center size
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "15px auto 0 auto",   // ⭐ centers button horizontally
    display: "block"
  },

  footerText: {
    color: "#94a3b8",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "600",
  },
};
