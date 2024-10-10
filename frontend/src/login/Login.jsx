import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";
import classes from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isLogin, setLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("jwtToken", token);
      console.log("Token saved:", token);
      navigate("/");
      setLogin(true);
    }
  }, [navigate]);

  function handleLogin() {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwtToken", data.token);
        setLogin(true);
        window.location.href = "http://localhost:3000/";
      });
  }
  function register() {
    window.location.href = "http://localhost:3000/register";
  }
  function googleLogin() {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

  function faceBookLogin() {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  }
  return (
    <div className={classes.body}>
      <img src="/image.png" alt="" className={classes.image} />
      <div className={classes.Login}>
        <h2>Đăng nhập</h2>
        <label className={classes.label}>Email</label>
        <input
          type="email"
          placeholder="Nhập email hoặc tài khoản"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className={classes.label}>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            id={classes.tickbox}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label id={classes.rememberMe}>Nhớ tài khoản</label>
        </div>
        <p id={classes.action}>
          <button className={classes.button} onClick={handleLogin}>
            Đăng nhập
          </button>
        </p>
        <div className={classes.divider}>
          <span>Hoặc đăng nhập với</span>
        </div>

        <div className={classes.additionButton}>
          <p id={classes.redirect}>
            <div className={classes.redirectButton} onClick={faceBookLogin}>
              <img className={classes.applogo} src="./facebook.png" alt="" />
              Facebook
            </div>
          </p>
          <p id={classes.redirect} className={classes.google}>
            <div className={classes.redirectButton} onClick={googleLogin}>
              <img className={classes.applogo} src="./google.png" alt="" />
              Google
            </div>
          </p>
        </div>

        <div className={classes.register}>
          Bạn chưa có tài khoản?
          <span className={classes.registerRedirect} onClick={register}>
            {" "}
            Đăng ký ngay
          </span>
        </div>
        {/* <p id={classes.action} onClick={faceBookLogin}>
          <button>Facebook</button>
        </p>
        <p id={classes.action} onClick={googleLogin}>
          <button>Google</button>
        </p> */}
      </div>
    </div>
  );
}
