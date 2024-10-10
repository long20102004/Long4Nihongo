import React, { useState } from "react";
import classes from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function register() {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      });
  }
  function googleLogin() {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }
  function loginRedirect() {
    window.location.href = "http://localhost:3000/login";
  }

  function faceBookLogin() {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  }
  return (
    <div className={classes.body}>
      <img src="/image.png" alt="" className={classes.image} />
      <div className={classes.Login}>
        <h2>Đăng ký</h2>
        <label className={classes.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className={classes.label}>Mật khẩu</label>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={classes.label}>Nhập lại mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
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
          <label id={classes.rememberMe}>
            Tôi đồng ý với điều khoản và chính sách
          </label>
        </div>
        <p id={classes.action}>
          <button className={classes.button} onClick={register}>
            Đăng ký
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
          Bạn đã có tài khoản?
          <span className={classes.registerRedirect} onClick={loginRedirect}>
            {" "}
            Đăng nhập ngay
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
