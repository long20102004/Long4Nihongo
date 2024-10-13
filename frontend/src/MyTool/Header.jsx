import classes from "./Header.module.css";
import { useAuth } from "../login/UseAuth";
import Dropdown from "./DropDown";
import { useEffect } from "react";
export default function Header(props) {
  const { isLogin, setLogin } = useAuth();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    fetch("http://localhost:8080/valid", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setLogin(false);
          // throw new Error("User is not valid");
        }
      })
      .then((data) => {
        console.log(data);
      });
  });
  function returnMainPage() {
    window.location.href = "http://localhost:3000";
  }
  function handleLogout() {
    fetch("http://localhost:8080/logoutt", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User is not valid");
        }
      })
      .then((data) => {
        console.log(data);
      });
  }
  function moveToLogin() {
    window.location.href = "http://localhost:3000/login";
  }
  function moveToSignup() {
    window.location.href = "http://localhost:3000/register";
  }
  function logOut() {
    handleLogout();
    setLogin(false);
  }
  return (
    <div className={classes.header}>
      <img
        className={classes.logo}
        onClick={returnMainPage}
        src="/app-icon.png"
        alt=""
      />
      <div className={classes.listItems}>
        <span onClick={returnMainPage}>Home</span>
        <span onClick={returnMainPage}>Courses</span>
        <span>Blog</span>
        <span>Social</span>
        <span>About us</span>
      </div>
      {isLogin && (
        <div className={classes.user}>
          <img className={classes.avatar} src="/avatar.png" alt="" />{" "}
          <span className={classes.name} onClick={logOut}>
            Logout
          </span>
        </div>
      )}
      {!isLogin && (
        <div className={classes.user}>
          <span className={classes.name} onClick={moveToLogin}>
            Login
          </span>
          <span className={classes.name} onClick={moveToSignup}>
            Sign Up
          </span>
        </div>
      )}
    </div>
  );
}
