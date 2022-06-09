import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, Link } from 'react-router-dom';
import "./Register.css"
import Animation from "./Animation.js";
import LottieRelaxing from "./mr.json";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



function Register() {





  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

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

  const handleFirstName = (value) => {
    setFirstName(value)
  }
  const handleLastName = (value) => {
    setLastName(value)
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
        firstName: firstName,
        lastName: lastName,
        title: role
      }),
    }).then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser",result.userId);
        localStorage.setItem("userName", username);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("title", role)
        alert(result.successMessage)
      })
      .catch((err) => console.log(err))
  }

  const handleButton = (path) => {
    sendRequest(path)
    setUsername("")
    setPassword("")
    setFirstName("")
    setLastName("")
    navigate("/")
  }

  return (

    <div className="login">
      <div className="lottie2">
        <Animation src={LottieRelaxing} />
      </div>
      <div className="loginWrapper">
        <div className="loginLeft">
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <span className="linkedhu"> <img src="logoyeni/linkedhu-alt1.svg" alt="linkedhu" height="135" width="300" ></img> </span>
            <span className="account">Create new account </span>
            <input onChange={(i) => handleFirstName(i.target.value)} placeholder="First Name" className="firstname" />
            <input onChange={(i) => handleLastName(i.target.value)} placeholder="Last Name" className="lastname" />
            <input onChange={(i) => handleUsername(i.target.value)} placeholder="Email" className="loginInput" />
            <Box  className="role-box" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel className='role' id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Academician"}>Academician</MenuItem>
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Graduate"}>Graduate</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <input onChange={(i) => handlePassword(i.target.value)} type={passwordShown ? "text" : "password"} placeholder="Password" className="loginInput" />
            <VisibilityIcon className="icon-register"
              onClick={togglePassword}>Show Password
            </VisibilityIcon>
            <i className="bi bi-eye-slash" id="togglePassword"></i>
            <button onClick={() => handleButton("register")} className="loginButton">Sign up</button>
            <Link to={{ pathname: '/' }} ><span className="haveaccount">Already have an account?</span></Link>
          </div>
        </div>
      </div>
    </div>

    //     <FormControl>
    //         <InputLabel>Username</InputLabel>
    //         <Input onChange = {(i) => handleUsername(i.target.value)}/>
    //         <InputLabel style={{ top: 80 }}>Password</InputLabel>
    //         <Input style={{ top: 40 }} 
    //         onChange = {(i) => handlePassword(i.target.value)}/>
    //         <Button variant='contained'
    //             style={{
    //                 marginTop: 60,
    //                 background: "purple",
    //                 color: "white"
    //             }}
    //             onClick={()=>handleButton("register")}>Register</Button>
    //         <FormHelperText style={{margin:20}}>Already registered?</FormHelperText>
    //         <Button variant='contained'
    //             style={{
    //                 background: "purple",
    //                 color: "white"
    //             }}
    //             onClick={()=>handleButton("login")}>Login</Button>
    // </FormControl>
  )
}

export default Register