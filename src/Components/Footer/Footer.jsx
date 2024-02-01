import React from 'react'
import './Footer.css'
import Wave from '../../img/wave.png'
import Insta from '@iconscout/react-unicons/icons/uil-instagram';
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Github from '@iconscout/react-unicons/icons/uil-github'
import Logo from '../../img/hanadiLogo.png'
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <div className="footer">
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
        </div>
    </div>
    )
}

export default Footer