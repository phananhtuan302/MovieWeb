import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";
import "./css/Profile.css";

export default function Profile() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5062/api/users/${user.userId}/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data);
      setFormData({
        fullName: data.fullName || "",
        avatarUrl: data.avatarUrl || "",
      });
      setError("");
    } catch (err) {
      setError("Không thể tải dữ liệu hồ sơ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5062/api/users/${user.userId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess("Hồ sơ đã được cập nhật thành công!");
      setIsEditMode(false);
      await fetchProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Lỗi khi cập nhật hồ sơ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
      logout();
      navigate("/login");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="ticks">
        <div className="items_start">
          <Sidebar />
        </div>
        <div className="profile-page">
          <p className="text-white text-center" style={{ paddingTop: "20px" }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="ticks">
        <div className="items_start">
          <Sidebar />
        </div>
        <div className="profile-page">
          <p className="text-white text-center" style={{ paddingTop: "20px" }}>Không thể tải hồ sơ. Vui lòng thử lại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ticks">
      <div className="items_start">
        <Sidebar />
      </div>

      <div className="profile-page">
        <div className="profile-container">
          {/* Success/Error Messages */}
          {error && <div className="profile-alert error-message">{error}</div>}
          {success && <div className="profile-alert success-message">{success}</div>}

          {!isEditMode ? (
            <>
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-avatar-section">
                  <img 
                    src={profileData.avatarUrl || "https://via.placeholder.com/150"} 
                    alt={profileData.fullName} 
                    className="profile-avatar"
                  />
                </div>
                <div className="profile-header-info">
                  <h1 className="text-white profile-name">{profileData.fullName || "User"}</h1>
                  <p className="text-secondary profile-email">{profileData.email}</p>
                  <p className="text-secondary profile-member-since">
                    Thành viên từ {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              {/* Profile Info */}
              <div className="profile-info-section">
                <div className="info-grid">
                  <div className="info-card">
                    <label className="info-label">Email</label>
                    <p className="info-value text-white">{profileData.email}</p>
                  </div>
                  <div className="info-card">
                    <label className="info-label">Tên đầy đủ</label>
                    <p className="info-value text-white">{profileData.fullName || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="profile-actions">
                <button 
                  className="btn-edit-profile" 
                  onClick={() => setIsEditMode(true)}
                >
                  ✏️ Chỉnh sửa hồ sơ
                </button>
                <button 
                  className="btn-logout-profile" 
                  onClick={handleLogout}
                >
                  🚪 Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <div className="profile-edit-section">
                <h2 className="text-white edit-title">Chỉnh sửa hồ sơ</h2>

                <div className="edit-form">
                  <div className="form-group">
                    <label className="form-label">Tên đầy đủ</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">URL Avatar</label>
                    <input
                      type="url"
                      name="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://..."
                    />
                    {formData.avatarUrl && (
                      <div className="avatar-preview">
                        <img src={formData.avatarUrl} alt="preview" className="avatar-preview-img" />
                      </div>
                    )}
                  </div>

                  <div className="edit-buttons">
                    <button 
                      className="btn-save-profile" 
                      onClick={handleSaveProfile}
                      disabled={loading}
                    >
                      {loading ? "Đang lưu..." : "💾 Lưu thay đổi"}
                    </button>
                    <button 
                      className="btn-cancel-profile" 
                      onClick={() => setIsEditMode(false)}
                      disabled={loading}
                    >
                      ✕ Hủy
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
