import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5062/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Login failed" };
      }

      const userData = await response.json();
      const userObj = {
        userId: userData.userId,
        email: userData.email,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
      };

      setUser(userObj);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userObj));
      return { success: true, message: "Login successful" };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "An error occurred during login" };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, fullName) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5062/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Registration failed" };
      }

      const data = await response.json();
      return { success: true, message: "Registration successful", userId: data.userId };
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, message: "An error occurred during registration" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5062/api/users/${user.userId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        return { success: false, message: "Failed to update profile" };
      }

      const updatedUser = {
        ...user,
        fullName: profileData.fullName || user.fullName,
        avatarUrl: profileData.avatarUrl || user.avatarUrl,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, message: "Profile updated successfully" };
    } catch (err) {
      console.error("Profile update error:", err);
      return { success: false, message: "An error occurred while updating profile" };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
