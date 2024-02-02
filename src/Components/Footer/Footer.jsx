import React from 'react'
import './Footer.css'
import Wave from '../../img/wave.png'
import Insta from '@iconscout/react-unicons/icons/uil-instagram';
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Github from '@iconscout/react-unicons/icons/uil-github'
import Logo from '../../img/hanadiLogo.png'
import { Link } from 'react-router-dom'; 
import { themeContext } from '../../Context'
import { useContext } from "react";
    
const Footer = () => {

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

  return (
    <div className="footer" style = {{background:darkMode ? '#242D49' : '' }}>
        {/* <img src={Wave} alt="wave" style={{width:'100%'}} /> */}
        <div className="f-content">
            <span>Hilal.bodon@hotmail.com</span>
            <div className="f-icons">
                {/* <Insta color='white' size='3rem'/>
                <Facebook color='white' size='3rem'/>
                <Github color='white' size='3rem'/> */}
             <Link to="/about">About</Link>

            </div>
            <img src={Logo} alt="hanadi logo" className='f-logo' />
            <span><b>Quad Digital Media</b> Copyright 2024 All rights reserved.</span>
        </div>
    </div>
    )
}

export default Footer