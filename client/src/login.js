import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import { useState } from "react";
import axios from "axios";
import "./login.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
const Login =()=>{
  const navigate=useNavigate()
  const Signup=()=>{
    navigate("/signup")
  }
    const [data, setdata]=useState({
        email:"",
        password:"",
    })

    useEffect(()=> {
        
        const auth=localStorage.getItem('user')
        if (auth) {
            navigate("/dashboard")
        }
    })

    const handlesubmit = (e) => {
        e.preventDefault()
        axios({
            method:'POST',
            headers:{
                // auth: localStorage.setItem('user')
            },
            url:"https://contact-manager-server-10x.herokuapp.com/login",
            data:data
        }).then((token)=> {
            console.log('Hello',token.data)
            localStorage.setItem("user",token.data)
            navigate("/dashboard")
        }).catch((err)=> {
            window.alert(err.response.data)
        })
    }
    return(
    <>
     <div className="container">
        <img src={Logo} alt="elipse-up" className="elipse-up"></img>
        <img src={logo} alt="elipse-down" className="elipse-down"></img>
        <div className="container-2">
          <img src={Box} alt="box" className="box-down"></img>
          <img src={Box} alt="box" className="box-up"></img>
          <div className="logo">
            LOGO
          </div>
          <div className="tittle">
            Enter your credientials to access your account
          </div>
          <input type="email" placeholder="User Id" className="email"onChange={(e)=> {setdata({...data, email: e.target.value})}} ></input>
          <input type="password" placeholder="password" className="password" onChange={(e)=> {setdata({...data, password: e.target.value})}} ></input>
          <button className="signin" onClick={handlesubmit}>Sign in</button>
          <a href={"./signup"} className="signup" onClick={Signup}>Sign Up</a>
        </div>
    </div>
    </>
    
  );
}
export default Login;