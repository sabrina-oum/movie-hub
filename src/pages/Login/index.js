import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const sumbitHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("Failed to signin");
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Login</h1>
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
          <button disabled={loading} className="btn btn--primary" type="submit">
            Login
          </button>
        </form>
        <div className="auth__switch">
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
