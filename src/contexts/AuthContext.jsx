import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Set up auth persistence and state listener on component mount
  useEffect(() => {
    // First, ensure persistence is set to local
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Auth persistence set to local");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    // Then set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      setAuthInitialized(true);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Handle route protection separately
  useEffect(() => {
    const protectedRoutes = ["/"];

    // Only redirect if auth is initialized and not loading
    if (authInitialized && !isLoading) {
      if (!user && protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [user, isLoading, authInitialized, location.pathname, navigate]);

  const contextValue = {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
    authInitialized,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
