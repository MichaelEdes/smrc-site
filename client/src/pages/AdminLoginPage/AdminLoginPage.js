import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLoginPage.css";

function AdminLoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "pass1") {
      setIsLoggedIn(true);
      navigate("/AdminPage");
    } else {
      alert("Invalid username or password!");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/AdminPage");
    } else {
      navigate("/AdminLoginPage");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
