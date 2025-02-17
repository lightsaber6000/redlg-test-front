import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import userApi from '../api/user/user.api';
import logoutApi from '../api/auth/logout.api';
import loginApi from '../api/auth/login.api';
import csrfApi from '../api/auth/csrf.api';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const response = await userApi();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      await csrfApi();
      const response = await loginApi(credentials);
      setUser(response.data);
    } catch (result) {
      if (result.status === 401) {
          return (result.response?.data?.errors);
      }
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      navigate("/auth");
    } catch (result) {
      alert('Что-то пошло не так');
    }
  };

  return (
    <AuthContext.Provider value={{ loading, user, logout, login }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
