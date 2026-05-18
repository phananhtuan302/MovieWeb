import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Mock login — replace with actual API call
    if (email && password.length >= 6) {
      // Simulate successful login
      // In real app: call API, store token, redirect
      console.log("Login successful:", email);
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="text-primary">MOON<span className="text-white">LIGHT</span></h1>
          <p className="text-white">Your favorite movies and shows in one place</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <h2 className="text-white">Sign In</h2>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="text-white">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-login">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p className="text-white">
            Don't have an account?{" "}
            <a href="#" className="text-primary">
              Sign Up
            </a>
          </p>
          <p className="text-white">
            <a href="#" className="text-primary">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,30,60,0.9));
          padding: 20px;
        }
        .login-container {
          width: 100%;
          max-width: 400px;
          background: rgba(20,20,40,0.8);
          border: 1px solid rgba(100,150,200,0.3);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-header h1 {
          font-size: 28px;
          margin: 0 0 10px 0;
        }
        .login-header p {
          font-size: 12px;
          margin: 0;
          opacity: 0.8;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-form h2 {
          margin: 0;
          font-size: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 500;
        }
        .form-input {
          padding: 12px;
          border: 1px solid rgba(100,150,200,0.3);
          border-radius: 6px;
          background: rgba(30,30,60,0.5);
          color: white;
          font-size: 14px;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(100,150,200,0.7);
          box-shadow: 0 0 8px rgba(100,150,200,0.3);
        }
        .btn-login {
          padding: 12px;
          background: linear-gradient(90deg, #0066cc, #0088ff);
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: opacity 0.2s;
        }
        .btn-login:hover {
          opacity: 0.9;
        }
        .error-message {
          color: #ff4444;
          font-size: 12px;
          text-align: center;
          margin: 0;
        }
        .login-footer {
          text-align: center;
          border-top: 1px solid rgba(100,150,200,0.2);
          padding-top: 20px;
        }
        .login-footer p {
          margin: 8px 0;
          font-size: 12px;
        }
        .login-footer a {
          color: #0088ff;
          text-decoration: none;
        }
        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
