import React from 'react'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
import vector_1 from "../asserts/Vectorpng.png"
import vector_2 from "../asserts/Vectorvector-1.png"
import vector_3 from "../asserts/Vector-1.png"
import vector_4 from "../asserts/Vector.png"
const Sidebar = () => {

    const navigate = useNavigate()
    const logout=()=> {
        localStorage.clear()
        window.history.forward()
        navigate("/")
    }

  return (
    <div className="sidebar">
    <div className="logo-7">
      LOGO
    </div>
    <div className="Dashboard">
      <img src={vector_1} alt="alt" className="vector"></img>
      <div className="Dashboard-1">Dashboard</div>
    </div>
    <div className="Total-contacts">
      <img src={vector_2} alt = "vector-1" className="vector-1"></img>
      <div className="Total-contacts-1">Total Contacts</div>
      <img src={vector_3} alt ="vector-2" className="vector-2"></img>

    </div>
    <div className="Logout">
      <img src={vector_4} alt="Logout" className="Logout-1"></img>
      <button className="Logout-2" onClick={logout}>Logout</button>
    </div>

  </div>
    
  )
}

export default Sidebar