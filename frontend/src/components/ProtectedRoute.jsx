// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/adminsuperadmin/get-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        localStorage.setItem("USER", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
        localStorage.removeItem("USER");
        localStorage.removeItem("TOKEN");
        setToken(null);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      setFetched(true);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
        Loading
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!fetched || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.administrateur.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
