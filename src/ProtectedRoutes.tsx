import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { config } from "./config/config";

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");
  console.log("protected routes token:" , token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const URL = config.url;
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          console.log("No token available.");
          setIsLoading(false);
          return;
        }
    
        const response = await fetch(`${URL}/check-auth`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.authenticated) {
            setIsAuthenticated(true);
          }
        } else {
          console.log("Authentication failed:", response.status);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [token, URL]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
