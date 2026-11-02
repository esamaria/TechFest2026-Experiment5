import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await API.post("/auth/register", form);
      setMessage(response.data.message);
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="page">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          minLength="8"
          maxLength="72"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p className="error-msg">{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
