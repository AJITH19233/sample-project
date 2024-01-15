import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../style1.css';
import { AppContext } from "./AppContext";

const Home = () => {
  const {enrolled}=useContext(AppContext)
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="Work">About</Link></li>
          <li><Link to="/Studentdash">Internship</Link></li>
          {!enrolled?(<> <li><Link to="/Login">Login</Link></li>
          <li><Link to="/SignUp">SignUp</Link></li>
          </>
           ):(<li>Enrolled Courses</li> )}
          
         

        </ul>
        <h1 className="logo">Internship Portal</h1>
      </div>
    </nav>
  );
};

export default Home;