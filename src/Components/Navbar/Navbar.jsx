import React from 'react'
import Toggle from '../Toggle/Toggle'
import './Navbar.css'
// import { Link } from 'react-scroll';
import { Link } from 'react-router-dom'; 

import Logo from '../../img/hanadiLogo.png'
import nameLogo from '../../img/nameLogo.png'

import { themeContext } from '../../Context'
import { useContext } from "react";
    
function Navbar() {

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

    return (
      <div className="n-wrapper" style = {{background:darkMode ? '#242D49' : '' }}>
        <div className="n-left">
          <img src={Logo} alt="logo" className="n-logo" />
          <img src={nameLogo} alt="namelogo" className="n-namelogo" />
          <Toggle />
        </div>
  
        <div className="n-right">
          <div className="n-list">
            <ul className="UL">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/experience">Experience</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          {/* <button className="button n-button">Contact</button> */}
        </div>
      </div>
    );
  }
  
  export default Navbar;