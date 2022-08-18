import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./signup.css"
const Signup =()=>{
   
  let navigate=useNavigate()

    const [data, setdata]=useState({
        email:"",
        password:"",
        cpassword:""
    })

    const handlesubmit = (e) => {
        e.preventDefault()
        axios({
            method:"POST",
            url:'https://contact-manager-server-10x.herokuapp.com/signup',
            data:data
        }).then((user)=> {
                window.alert(user.data)
                navigate("/")
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
          <div className="logo-1">
            LOGO
          </div>
          <div className="tittle-1">
            Create New Account
          </div>
          <input type="email" placeholder="User Id" className="email-1" onChange={(e)=> {setdata({...data, email: e.target.value})}} ></input>
          <input type="password" placeholder="password" className="form-control" onChange={(e)=> {setdata({...data, password: e.target.value})}}  ></input>
          <input type="password" placeholder="confrim-password" className="confrim-password" id="confrim-password-1" onChange={(e)=> {
                    setdata({...data,cpassword:e.target.value})
                }} ></input>

          <button className="signin-1" onClick={handlesubmit} >Sign in</button>
        </div>
    </div>
    </>
    
  );
}
export default Signup;