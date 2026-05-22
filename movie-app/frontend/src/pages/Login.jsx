import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        if (!email || !password) {
          setError("Vui lòng điền tất cả các trường");
          setLoading(false);
          return;
        }

        const result = await login(email, password);
        if (result.success) {
          navigate("/");
        } else {
          setError(result.message || "Đăng nhập thất bại");
        }
      } else {
        // Register
        if (!email || !password || !fullName) {
          setError("Vui lòng điền tất cả các trường");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("Mật khẩu phải có ít nhất 6 ký tự");
          setLoading(false);
          return;
        }

        const result = await register(email, password, fullName);
        if (result.success) {
          setError("");
          setEmail("");
          setPassword("");
          setFullName("");
          setIsLogin(true);
          setError("Đăng ký thành công! Vui lòng đăng nhập");
          setTimeout(() => setError(""), 3000);
        } else {
          setError(result.message || "Đăng ký thất bại");
        }
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFullName("");
    setError("");
  };

  return (
    <div className="login-page">
      <button 
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          background: "rgba(100,150,200,0.2)",
          border: "1px solid rgba(100,150,200,0.5)",
          borderRadius: "6px",
          color: "#0088ff",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "13px",
          transition: "all 0.3s ease",
          zIndex: "1000"
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(100,150,200,0.3)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(100,150,200,0.2)"}
      >
        ← Về Trang Chủ
      </button>
      <div className="login-container">
        <div className="login-header">
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/")} title="Về trang chủ">
            <h1 className="text-primary">MOON<span className="text-white">LIGHT</span></h1>
            <p className="text-white">Phim và chương trình yêu thích của bạn</p>
          </div>
        </div>

        {isAuthenticated && user ? (
          // Nếu đã đăng nhập
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
            <p className="success-message" style={{ margin: "0", padding: "15px", borderRadius: "6px", background: "rgba(68,204,68,0.1)", border: "1px solid rgba(68,204,68,0.5)", color: "#51cf66" }}>
              ✓ Bạn đã đăng nhập!
            </p>
            <p className="text-white" style={{ fontSize: "14px" }}>
              Xin chào, <strong>{user.fullName || user.email}</strong>!
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => navigate("/")}
                style={{
                  flex: 1,
                  padding: "12px 15px",
                  background: "linear-gradient(135deg, #0066cc, #0088ff)",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.3s ease"
                }}
              >
                Về Trang Chủ
              </button>
              <button 
                onClick={() => navigate("/profile")}
                style={{
                  flex: 1,
                  padding: "12px 15px",
                  background: "linear-gradient(135deg, #4caf50, #45a049)",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.3s ease"
                }}
              >
                Profile
              </button>
            </div>
            <button 
              onClick={handleLogout}
              style={{
                padding: "12px 15px",
                background: "rgba(244, 67, 54, 0.2)",
                border: "1px solid rgba(244, 67, 54, 0.5)",
                borderRadius: "6px",
                color: "#f44336",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
            >
              Đăng Xuất
            </button>
          </div>
        ) : (
          // Nếu chưa đăng nhập
          <>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-white">
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </h2>

          {error && (
            <p className={`error-message ${error.includes("thành công") ? "success-message" : ""}`}>
              {error}
            </p>
          )}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName" className="text-white">Tên của bạn</label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="text-white">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={loading}
            />
            {!isLogin && (
              <small className="text-secondary" style={{ marginTop: "-4px", fontSize: "12px" }}>
                Mật khẩu phải có ít nhất 6 ký tự
              </small>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? (isLogin ? "Đang đăng nhập..." : "Đang đăng ký...") : (isLogin ? "Đăng Nhập" : "Đăng Ký")}
          </button>
        </form>

        <div className="login-footer">
          <p className="text-white">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-primary toggle-btn"
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </p>
        </div>
          </>
        )}
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
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-header h1 {
          font-size: 28px;
          margin: 0 0 10px 0;
          font-weight: 700;
        }
        .login-header p {
          font-size: 13px;
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
          font-weight: 600;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-input {
          padding: 12px 15px;
          border: 1px solid rgba(100,150,200,0.3);
          border-radius: 6px;
          background: rgba(30,30,60,0.5);
          color: white;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(0,136,255,0.7);
          background: rgba(0,136,255,0.05);
          box-shadow: 0 0 8px rgba(0,136,255,0.3);
        }
        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .text-secondary {
          color: #b0b0b0;
        }
        .btn-login {
          padding: 12px 15px;
          background: linear-gradient(135deg, #0066cc, #0088ff);
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,136,255,0.4);
        }
        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error-message {
          background: rgba(255,68,68,0.1);
          border: 1px solid rgba(255,68,68,0.5);
          border-radius: 6px;
          color: #ff6b6b;
          padding: 12px 15px;
          font-size: 12px;
          text-align: center;
          margin: 0;
          animation: slideDown 0.3s ease;
        }
        .error-message.success-message {
          background: rgba(68,204,68,0.1);
          border-color: rgba(68,204,68,0.5);
          color: #51cf66;
        }
        .login-footer {
          text-align: center;
          border-top: 1px solid rgba(100,150,200,0.2);
          padding-top: 20px;
        }
        .login-footer p {
          margin: 0;
          font-size: 13px;
        }
        .toggle-btn {
          background: none;
          border: none;
          color: #0088ff;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.3s ease;
          padding: 0;
          font-size: inherit;
        }
        .toggle-btn:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
