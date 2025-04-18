import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QuizProvider } from "./contexts/QuizContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <QuizProvider>
        <AppRouter />
      </QuizProvider>
    </AuthProvider>
  </BrowserRouter>
);
