import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const res = await axios.post(endpoint, { username, password });
      onLogin && onLogin(res.data.user);
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <h2>{isRegister ? "Create Account" : "Welcome Microblog"}</h2>
        <p className="subtitle">
          {isRegister ? "Register to start posting" : "Login to your account"}
        </p>

        <form onSubmit={submit}>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="switch-link"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "New here? Register"}
        </p>
      </div>
    </div>
  );
}
