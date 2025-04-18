import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { TbLogin2 } from "react-icons/tb";

function Login() {
  const { login, error, isLoading } = useAuth();
  const [email, setUemail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setFormError("");

      if (!email.trim() || !password.trim()) {
        setFormError("Both fields are required.");
        return;
      }

      await login(email, password);
    },
    [email, password, login]
  );

  return (
    <div className="login-container">
      <div className="login-inner">
        <div className="login-grid">
          <div className="login-welcome">
            <div className="login-header">
              <h1 className="login-title">Welcome Back!</h1>
            </div>

            <div className="login-subtitle">
              <p>Please login </p>
              <TbLogin2 size={26} />
            </div>
          </div>

          <div className="login-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
              {formError && (
                <p className="login-error" aria-live="polite">
                  {formError}
                </p>
              )}
              {error && (
                <p className="login-error" aria-live="polite">
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="login-input"
                  placeholder="Email"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setUemail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  className="login-input"
                  placeholder="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-button-container">
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading}
                >
                  OK{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
