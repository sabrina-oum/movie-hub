import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuthContext();

  const sumbitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("The entered passwords have to be similar");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("Failed to signup");
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Create Account</h1>
        {error && <div className="alert">{error}</div>}
        <form className="auth-form" onSubmit={sumbitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <button disabled={loading} className="btn btn--primary" type="submit">
            Create Account
          </button>
        </form>
        <div className="auth__switch">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
