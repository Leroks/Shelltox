import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"
import Animation from "./Animation.js";
import LottieRelaxing from "./mr.json";

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };



  const handleUsername = (value) => {
    setUsername(value)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }


  const sendRequest = (path) => {
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    }).then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username)
        localStorage.setItem("firstName", result.firstName);
        localStorage.setItem("lastName", result.lastName);
        localStorage.setItem("title", result.title);
        localStorage.setItem("photo", result.photo);
        localStorage.setItem("about", result.about);
        localStorage.setItem("skills", result.skills);
        if (result.message === null) {
          navigate("/")
        }
        else {
          navigate("/home")
          setUsername("")
          setPassword("")
        }
      })
      .catch((err) => alert("Wrong Email or Password!"))
  }

  const handleButton = (path) => {
    sendRequest(path)
  }


  return (
    <div className="login">
      <div className="lottie">
        <Animation src={LottieRelaxing} />
      </div>
      <div className="loginWrapper">
        <div className="loginLeft">
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <span className="linkedhu"> <img src="logoyeni/linkedhu-alt1.svg" alt="linkedhu" height="135" width="300" ></img>
            </span>
            <input onChange={(i) => handleUsername(i.target.value)} placeholder="Email" className="loginInput1" />
            <div className="flexContainer">
              <input onChange={(i) => handlePassword(i.target.value)} type={passwordShown ? "text" : "password"} placeholder="Password" className="loginInput2" />
              <VisibilityIcon className="icon"
                onClick={togglePassword}>Show Password
              </VisibilityIcon>
            </div>
            <i className="bi bi-eye-slash" id="togglePassword"></i>
            <button onClick={() => handleButton("login")} className="loginButton">Sign in</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link className='link' to={{ pathname: '/register' }}><button className="RegisterButton">
              Join now

            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
