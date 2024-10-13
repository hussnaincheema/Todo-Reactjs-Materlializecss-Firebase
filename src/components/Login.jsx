import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      M.toast({ html: `Welcome ${result.user.email}`, classes: "green" });
      navigate("/");
    } catch (e) {
      M.toast({ html: e.message, classes: "red" });
    }
  };

  return (
    <div className="center container" style={{ maxWidth: "500px" }}>
      <h3>Please Login!</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="material-icons password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? (
                <i className="material-icons">visibility</i>
              ) : (
                "visibility_off"
              )}
            </span>
          </div>
        </div>
        <h6 style={{ fontSize: "16px", marginBottom: "20px", color: "black" }}>
          Don't have an Account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ color: "red", fontWeight: "800" }}
          >
            Sign Up
          </span>
        </h6>
        <button type="submit" className="btn red">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
