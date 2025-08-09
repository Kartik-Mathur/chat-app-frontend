import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      await signup(form.username, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const styles = {
    container: {
      minHeight: "85vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
      padding: "2rem",
      fontFamily: "'Segoe UI', sans-serif",
    },
    form: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      width: "100%",
      maxWidth: "400px",
    },
    input: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#007bff",
    },
    button: {
      padding: "12px",
      fontSize: "1rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    heading: {
      marginBottom: "1rem",
      textAlign: "center",
      fontSize: "1.5rem",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create an Account</h2>
        <input
          value={form.username}
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="Enter Username"
          style={styles.input}
          required
        />
        <input
          value={form.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          required
        />
        <input
          value={form.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
